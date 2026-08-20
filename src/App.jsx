import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import FacultyGrid from './components/FacultyGrid';
import FacultySearchResult from './components/FacultySearchResult';
import FacultyDetails from './components/FacultyDetails';
import EmptyState from './components/EmptyState';
import LoginPage from './components/LoginPage';
import { getFacultyList } from './api/facultyAPI';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load faculty list from API layer upon login
  useEffect(() => {
    if (isAuthenticated) {
      async function loadData() {
        setLoading(true);
        try {
          const data = await getFacultyList();
          setFacultyList(data);
        } catch (err) {
          console.error('Failed to load faculty data:', err);
        } finally {
          setLoading(false);
        }
      }
      loadData();
    }
  }, [isAuthenticated]);

  // Filter faculty members based on search query (case-insensitive search by name)
  const filteredFaculty = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return facultyList;
    }
    const q = searchQuery.toLowerCase().trim();
    return facultyList.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.department.toLowerCase().includes(q) ||
        f.designation.toLowerCase().includes(q)
    );
  }, [facultyList, searchQuery]);

  const handleLoginSuccess = (studentData) => {
    setCurrentStudent(studentData);
    setIsAuthenticated(true);
  };

  const handleGoHome = () => {
    setSelectedFaculty(null);
    setSearchQuery('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentStudent(null);
    setSelectedFaculty(null);
    setSearchQuery('');
  };

  // 1. FIRST SCREEN: Student Login Page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  const isSearching = searchQuery.trim() !== '';

  // 2. MAIN SCREEN: Faculty Search / Details View after login
  return (
    <div className="app-container">
      <Navbar onGoHome={handleGoHome} onLogout={handleLogout} />

      <main className="main-content">
        {selectedFaculty ? (
          /* Faculty Details Page View */
          <FacultyDetails
            faculty={selectedFaculty}
            onBack={() => setSelectedFaculty(null)}
          />
        ) : (
          /* Main Search & Grid / Results View */
          <>
            {/* Instagram-Inspired Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              resultCount={filteredFaculty.length}
            />

            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                Loading CSE faculty directory...
              </div>
            ) : isSearching ? (
              /* Search Query View: Vertical stack of Horizontal Result Cards */
              filteredFaculty.length > 0 ? (
                <div className="search-results-list">
                  {filteredFaculty.map((faculty) => (
                    <FacultySearchResult
                      key={faculty.id}
                      faculty={faculty}
                      onClick={setSelectedFaculty}
                    />
                  ))}
                </div>
              ) : (
                /* Empty state when no matches are found */
                <EmptyState onReset={() => setSearchQuery('')} />
              )
            ) : (
              /* Grid View (When Search Query is Empty): Strict 4/3/2/1 Responsive Grid */
              <FacultyGrid
                facultyList={filteredFaculty}
                onSelectFaculty={setSelectedFaculty}
              />
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <p className="footer-text">
          © {new Date().getFullYear()} FindMyFaculty • CSE Academic Directory System
        </p>
      </footer>
    </div>
  );
}
