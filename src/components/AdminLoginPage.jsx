import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../api/authAPI';
import Logo from './Logo';

export default function AdminLoginPage({ onLoginSuccess }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!adminId.trim()) {
      setErrorMsg('Please enter your Admin ID or Username.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginAdmin(adminId, password);
      if (response && response.success) {
        onLoginSuccess(response.user, 'admin');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Admin login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Brand Header */}
        <div className="login-brand-header">
          <Logo size="lg" />
        </div>

        <div className="login-header">
          <p className="login-welcome-subtitle">
            Enter your administrative credentials to access the directory management
          </p>
        </div>

        {/* Validation Error Alert */}
        {errorMsg && (
          <div className="login-error-alert" role="alert">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Admin Login Form */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="adminId">
              Admin ID / Username
            </label>
            <div className="input-field-wrapper">
              <div className="input-left-icon">
                <ShieldCheck size={18} />
              </div>
              <input
                id="adminId"
                type="text"
                className="form-input"
                placeholder="Enter your admin ID"
                value={adminId}
                onChange={(e) => {
                  setAdminId(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-field-wrapper">
              <div className="input-left-icon">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In as Admin'}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-text">
            Computer Science & Engineering • Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
}
