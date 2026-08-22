import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import FacultyGrid from './components/FacultyGrid';
import FacultySearchResult from './components/FacultySearchResult';
import FacultyDetails from './components/FacultyDetails';
import EmptyState from './components/EmptyState';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminLoginPage from './components/AdminLoginPage';
import { getFacultyList } from './api/facultyAPI';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('student');
  const [facultyList, setFacultyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStudentLogin, setShowStudentLogin] = useState(false);

  // URL path tracking for dedicated Admin Login (/admin or /admin-login)
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

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

  // Filter faculty members based on search query
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

  const handleLoginSuccess = (userData, role = 'student') => {
    setCurrentUser(userData);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleGoHome = () => {
    setSelectedFaculty(null);
    setSearchQuery('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserRole('student');
    setSelectedFaculty(null);
    setSearchQuery('');
    setShowStudentLogin(false);
  };

  // 1. PRE-LOGIN VIEWS: Landing Page / Student Login / Admin Login (strictly via /admin URL)
  if (!isAuthenticated) {
    const isAdminRoute = currentPath.startsWith('/admin') || window.location.search.includes('admin=true');

    if (isAdminRoute) {
      return <AdminLoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    if (showStudentLogin) {
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={() => setShowStudentLogin(false)}
        />
      );
    }

    return <LandingPage onOpenStudentLogin={() => setShowStudentLogin(true)} />;
  }

  const isSearching = searchQuery.trim() !== '';

  // 2. MAIN SCREEN: Faculty Search / Details Dashboard after login
  return (
    <div className="app-container">
      <Navbar
        onGoHome={handleGoHome}
        onLogout={handleLogout}
        userRole={userRole}
        currentUser={currentUser}
      />

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
              /* Search Query View */
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
              /* Grid View */
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
          © FindMyFaculty • CSE Academic Directory System
        </p>
      </footer>
    </div>
  );
}
