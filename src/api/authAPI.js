// Student auth is connected to the real FastAPI OAuth2 form login.
// Admin auth is connected to the real FastAPI OAuth2 form login.

export async function loginStudent(rollNumber, password) {
  if (!rollNumber || !rollNumber.trim()) {
    throw new Error('Please enter your roll number.');
  }

  if (!password || !password.trim()) {
    throw new Error('Please enter your password.');
  }

  const cleanRoll = rollNumber.trim();
  const trimmedPassword = password.trim();
  const formBody = new URLSearchParams({
    username: cleanRoll,
    password: trimmedPassword
  });

  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody.toString()
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = typeof data?.detail === 'string' ? data.detail : '';

    if (response.status === 403) {
      throw new Error(detail || 'Sorry, access is currently limited to CSE department students.');
    }

    if (response.status === 401) {
      throw new Error(detail || 'Invalid roll number or password');
    }

    throw new Error('Login failed. Please try again.');
  }

  const accessToken = data.access_token;
  if (!accessToken) {
    throw new Error('Login failed. No access token was returned.');
  }

  return {
    success: true,
    student: {
      rollNumber: cleanRoll,
      name: `Student (${cleanRoll})`,
      department: 'Computer Science & Engineering'
    },
    token: accessToken
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

export async function updateFaculty(originalFacultyName, facultyPayload) {
  const token = getStoredAdminToken();
  if (!token) {
    throw new Error('Admin authentication is required.');
  }

  const encodedName = encodeURIComponent(originalFacultyName);
  const response = await fetch(`http://localhost:8000/admin/faculty/${encodedName}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify({
      name: facultyPayload.name,
      cabin: facultyPayload.cabin,
      cabin_directions: facultyPayload.cabin_directions
    })
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.detail || 'Faculty could not be updated.';
    throw new Error(typeof message === 'string' ? message : 'Faculty could not be updated.');
  }

  return data;
}

export async function deleteFaculty(originalFacultyName) {
  const token = getStoredAdminToken();
  if (!token) {
    throw new Error('Admin authentication is required.');
  }

  const encodedName = encodeURIComponent(originalFacultyName);
  const response = await fetch(`http://localhost:8000/admin/faculty/${encodedName}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token)
  });

  if (!response.ok) {
    let message = 'Faculty could not be deleted.';
    try {
      const data = await response.json();
      message = data?.detail || message;
    } catch {
      // Ignore JSON parse failures and use the default message.
    }

    throw new Error(typeof message === 'string' ? message : 'Faculty could not be deleted.');
  }

  return true;
}

