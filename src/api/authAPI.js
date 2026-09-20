// Student auth remains mock-only for the current app.
// Admin auth is connected to the real FastAPI OAuth2 form login.

export async function loginStudent(rollNumber, password) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!rollNumber || !rollNumber.trim()) {
    throw new Error('Please enter your roll number.');
  }

  if (!password || !password.trim()) {
    throw new Error('Please enter your password.');
  }

  const cleanRoll = rollNumber.trim().toUpperCase();

  return {
    success: true,
    student: {
      rollNumber: cleanRoll,
      name: `Student (${cleanRoll})`,
      department: 'Computer Science & Engineering'
    },
    token: 'mock-jwt-token-cse-2026'
  };
}

function getStoredAdminToken() {
  if (typeof window === 'undefined') {
    return '';
  }
  return localStorage.getItem('findmyfaculty_admin_token') || '';
}

function getAuthHeaders(tokenOverride = getStoredAdminToken()) {
  const authToken = tokenOverride?.trim();
  const headers = {
    'Content-Type': 'application/json'
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return headers;
}

export async function loginAdmin(adminId, password) {
  if (!adminId || !adminId.trim()) {
    throw new Error('Please enter your Admin ID or Username.');
  }

  if (!password || !password.trim()) {
    throw new Error('Please enter your password.');
  }

  const cleanAdminId = adminId.trim();
  const formBody = new URLSearchParams({
    username: cleanAdminId,
    password: password.trim()
  });

  const response = await fetch('http://localhost:8000/login/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody.toString()
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.detail || 'Admin login failed. Please check your credentials.';
    throw new Error(typeof message === 'string' ? message : 'Admin login failed. Please check your credentials.');
  }

  const accessToken = data.access_token;
  if (!accessToken) {
    throw new Error('Admin login failed. No access token was returned.');
  }

  return {
    success: true,
    user: {
      adminId: cleanAdminId,
      name: `Administrator (${cleanAdminId})`,
      department: 'CSE Administrative Portal',
      role: 'admin'
    },
    token: accessToken,
    access_token: accessToken,
    token_type: data.token_type || 'bearer'
  };
}

export async function getFacultyList() {
  const token = getStoredAdminToken();
  if (!token) {
    throw new Error('Admin authentication is required.');
  }

  const response = await fetch('http://localhost:8000/faculty', {
    method: 'GET',
    headers: getAuthHeaders(token)
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.detail || 'Unable to load faculty list.';
    throw new Error(typeof message === 'string' ? message : 'Unable to load faculty list.');
  }

  return Array.isArray(data) ? data : [];
}

export async function createFaculty(facultyPayload) {
  const token = getStoredAdminToken();
  if (!token) {
    throw new Error('Admin authentication is required.');
  }

  const response = await fetch('http://localhost:8000/admin/faculty', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({
      name: facultyPayload.name,
      cabin: facultyPayload.cabin,
      cabin_directions: facultyPayload.cabin_directions
    })
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.detail || 'Faculty could not be created.';
    throw new Error(typeof message === 'string' ? message : 'Faculty could not be created.');
  }

  return data;
}

