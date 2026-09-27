// Faculty API connected to FastAPI backend

const BACKEND_BASE_URL = 'http://localhost:8000';

export function getFacultyAvatarUrl(name = 'Faculty') {
  const cleanName = encodeURIComponent((name || 'Faculty').trim());
  return `https://ui-avatars.com/api/?name=${cleanName}&background=0f172a&color=38bdf8&size=256&bold=true&font-size=0.38`;
}

function getAuthHeaders() {
  const token = (typeof window !== 'undefined')
    ? (localStorage.getItem('findmyfaculty_student_token') || localStorage.getItem('findmyfaculty_admin_token'))
    : null;

  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token.trim()}`;
  }

  return headers;
}

export function normalizeFaculty(item) {
  if (!item) return null;
  const name = item.name || 'Faculty Member';
  const imageUrl = item.image_url && item.image_url.trim() ? item.image_url.trim() : null;

  let directions = [];
  if (Array.isArray(item.directions) && item.directions.length > 0) {
    directions = item.directions;
  } else if (item.cabin_directions && typeof item.cabin_directions === 'string') {
    directions = item.cabin_directions
      .split(/(?:➔|->|\n|\r\n)/)
      .map((d) => d.trim())
      .filter(Boolean);
    if (directions.length === 0) {
      directions = [item.cabin_directions.trim()];
    }
  } else {
    const cabinText = item.cabin && item.cabin !== '-' ? item.cabin : 'the designated cabin';
    directions = [
      "Enter CSE Academic Block via Main Entrance Lobby.",
      "Take Central Elevator or Stairs to the faculty floor.",
      `Locate ${cabinText} along the main corridor.`
    ];
  }

  const cabinStr = item.cabin && item.cabin.trim() && item.cabin !== '-' ? item.cabin.trim() : 'CSE Department';
  const currentLocationStr = `CSE Academic Block • ${cabinStr}`;

  return {
    id: item.id || name,
    name: name,
    image_url: imageUrl,
    image: imageUrl || getFacultyAvatarUrl(name),
    cabin: cabinStr,
    cabin_directions: item.cabin_directions || null,
    directions: directions,
    currentLocation: currentLocationStr,
    locationStatus: 'In Cabin (Available)',
    department: 'Computer Science & Engineering',
    designation: item.designation || 'Faculty Member, CSE',
    email: `${name.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.')}@cse.psgtech.ac.in`,
    todayTimetable: []
  };
}

export async function getFacultyList() {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/faculty`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeFaculty);
      }
    }
  } catch (err) {
    console.warn('Backend /faculty fetch failed:', err);
  }

  return [];
}

export async function getFacultyById(id) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/faculty/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      const data = await response.json();
      return normalizeFaculty(data);
    }
  } catch (err) {
    console.warn('Backend getFacultyById failed:', err);
  }
  return null;
}

export async function getFacultyDetails(id) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/faculty/${id}/details`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Backend getFacultyDetails failed:', err);
  }
  return null;
}

export async function getFacultyLocation(id) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/faculty/${id}/location`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Backend getFacultyLocation failed:', err);
  }
  return null;
}

export async function getFacultyDayTimetable(id, day = null) {
  try {
    const url = day
      ? `${BACKEND_BASE_URL}/faculty/${id}/timetable?day=${encodeURIComponent(day)}`
      : `${BACKEND_BASE_URL}/faculty/${id}/timetable`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Backend getFacultyDayTimetable failed:', err);
  }
  return null;
}

export async function getFacultyUpcoming(id) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/faculty/${id}/upcoming`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Backend getFacultyUpcoming failed:', err);
  }
  return [];
}

export async function searchFaculty(query) {
  if (!query || !query.trim()) {
    return getFacultyList();
  }

  const cleanQuery = query.trim();

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/faculty/search?name=${encodeURIComponent(cleanQuery)}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return data.map(normalizeFaculty);
      }
    }
  } catch (err) {
    console.warn('Backend /faculty/search failed:', err);
  }

  // Fallback to local filter of full list
  const list = await getFacultyList();
  const q = cleanQuery.toLowerCase();
  return list.filter((f) => f.name.toLowerCase().includes(q));
}
