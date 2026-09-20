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
import AdminDashboard from './components/AdminDashboard';
import AdminFacultyManagement from './components/AdminFacultyManagement';
import AdminTimetableManagement from './components/AdminTimetableManagement';
import { getFacultyList } from './api/facultyAPI';
import { mockAdminFaculty, mockTimetableEntries } from './mock/adminData';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(window.localStorage.getItem('findmyfaculty_admin_token')) || Boolean(window.localStorage.getItem('findmyfaculty_student_token'));
  });
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('findmyfaculty_user');
    if (!savedUser) return null;
    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });
  const [userRole, setUserRole] = useState(() => {
    if (typeof window === 'undefined') return 'student';
    const adminToken = window.localStorage.getItem('findmyfaculty_admin_token');
    return adminToken ? 'admin' : 'student';
  });
  const [facultyList, setFacultyList] = useState([]);
  const [adminFacultyList, setAdminFacultyList] = useState(mockAdminFaculty);
  const [adminTimetableEntries, setAdminTimetableEntries] = useState(mockTimetableEntries);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStudentLogin, setShowStudentLogin] = useState(false);
  const [activeAdminView, setActiveAdminView] = useState('dashboard');

  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    if (isAuthenticated && userRole === 'student') {
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
  }, [isAuthenticated, userRole]);

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

  const setPath = (path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
  };

  const handleLoginSuccess = (userData, role = 'student', token = null) => {
    const normalizedUser = userData ? { ...userData, role } : { role };
    setCurrentUser(normalizedUser);
    setUserRole(role);
    setIsAuthenticated(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('findmyfaculty_user', JSON.stringify(normalizedUser));
      if (role === 'admin') {
        localStorage.setItem('findmyfaculty_admin_token', token || 'mock-jwt-token-admin');
        localStorage.removeItem('findmyfaculty_student_token');
        setActiveAdminView('dashboard');
        setPath('/admin');
      } else {
        localStorage.setItem('findmyfaculty_student_token', token || 'mock-jwt-token-cse-2026');
        localStorage.removeItem('findmyfaculty_admin_token');
        setPath('/');
      }
    }
  };

  const handleGoHome = () => {
    setSelectedFaculty(null);
    setSearchQuery('');
    if (userRole === 'admin') {
      setActiveAdminView('dashboard');
      setPath('/admin');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserRole('student');
    setSelectedFaculty(null);
    setSearchQuery('');
    setShowStudentLogin(false);
    setActiveAdminView('dashboard');

    if (typeof window !== 'undefined') {
      localStorage.removeItem('findmyfaculty_user');
      localStorage.removeItem('findmyfaculty_admin_token');
      localStorage.removeItem('findmyfaculty_student_token');
    }

    setPath('/');
  };

  const handleAdminNavigate = (view) => {
    setActiveAdminView(view);
    if (view === 'dashboard') {
      setPath('/admin');
    } else {
      setPath(`/admin/${view}`);
    }
  };

  const handleAddFaculty = (faculty) => {
    const newFaculty = {
      ...faculty,
      id: faculty.id || `F${String(adminFacultyList.length + 1).padStart(2, '0')}`,
      image_url: faculty.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
    };

    setAdminFacultyList((prev) => [newFaculty, ...prev]);
  };

  const handleUpdateFaculty = (facultyId, faculty) => {
    setAdminFacultyList((prev) =>
      prev.map((item) => (item.id === facultyId ? { ...item, ...faculty } : item))
    );
  };

  const handleDeleteFaculty = (facultyId) => {
    setAdminFacultyList((prev) => prev.filter((faculty) => faculty.id !== facultyId));
  };

  const handleUploadTimetable = () => {
    const message = 'Mock timetable upload ready. Connect this action to /admin/upload-timetable when the FastAPI endpoint is wired in.';
    window.alert(message);
  };

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

  if (userRole === 'admin') {
    return (
      <div className="app-container">
        <Navbar
          onGoHome={handleGoHome}
          onLogout={handleLogout}
          userRole={userRole}
          currentUser={currentUser}
        />

        <main className="main-content admin-main-content">
          {activeAdminView === 'faculty' ? (
            <AdminFacultyManagement
              facultyList={adminFacultyList}
              onAddFaculty={handleAddFaculty}
              onUpdateFaculty={handleUpdateFaculty}
              onDeleteFaculty={handleDeleteFaculty}
            />
          ) : activeAdminView === 'timetable' ? (
            <AdminTimetableManagement
              facultyList={adminFacultyList}
              timetableEntries={adminTimetableEntries}
              onUploadTimetable={handleUploadTimetable}
            />
          ) : (
            <AdminDashboard
              currentUser={currentUser}
              onNavigate={handleAdminNavigate}
              activeView={activeAdminView}
            />
          )}
        </main>

        <footer className="footer">
          <p className="footer-text">
            © FindMyFaculty • CSE Administrative Portal
          </p>
        </footer>
      </div>
    );
  }

  const isSearching = searchQuery.trim() !== '';

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
          <FacultyDetails
            faculty={selectedFaculty}
            onBack={() => setSelectedFaculty(null)}
          />
        ) : (
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
                <EmptyState onReset={() => setSearchQuery('')} />
              )
            ) : (
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
