import React, { useState } from 'react';
import { Eye, EyeOff, Lock, UserCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { loginStudent } from '../api/authAPI';
import Logo from './Logo';

export default function LoginPage({ onLoginSuccess, onBackToHome }) {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!rollNumber.trim()) {
      setErrorMsg('Please enter your roll number.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginStudent(rollNumber, password);
      if (response && response.success) {
        onLoginSuccess(response.student, 'student', response.token);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {onBackToHome && (
          <button
            type="button"
            className="login-back-btn"
            onClick={onBackToHome}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        )}

        {/* Brand Header */}
        <div className="login-brand-header">
          <Logo size="lg" />
        </div>

        <div className="login-header">
          <p className="login-welcome-subtitle">
            Enter your Ecampus credentials to know where your faculty is
          </p>
        </div>

        {/* Validation Error Alert */}
        {errorMsg && (
          <div className="login-error-alert" role="alert">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="rollNumber">
              Roll Number
            </label>
            <div className="input-field-wrapper">
              <div className="input-left-icon">
                <UserCheck size={18} />
              </div>
              <input
                id="rollNumber"
                type="text"
                className="form-input"
                placeholder="Enter your roll number"
                value={rollNumber}
                onChange={(e) => {
                  setRollNumber(e.target.value);
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
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-text">
            Computer Science & Engineering
          </p>
        </div>
      </div>
    </div>
  );
}
