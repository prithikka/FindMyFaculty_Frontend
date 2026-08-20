// Mock Student Authentication API
// Structured for seamless integration with backend endpoint (POST /api/auth/login)

export async function loginStudent(rollNumber, password) {
  // Simulate API network request delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!rollNumber || !rollNumber.trim()) {
    throw new Error('Please enter your roll number.');
  }

  if (!password || !password.trim()) {
    throw new Error('Please enter your password.');
  }

  // Basic mock validation (accepts any non-empty roll number and password for dev flexibility)
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
