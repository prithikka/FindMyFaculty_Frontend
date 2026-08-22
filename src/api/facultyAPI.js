// CSE Department Faculty Data Layer

export const MOCK_FACULTY_DATA = [
  {
    id: "cse-101",
    name: "Dr. Sarah Jenkins",
    designation: "Professor & Head of CSE",
    department: "Computer Science & Engineering",
    email: "s.jenkins@cse.edu",
    phone: "+1 (555) 019-2831",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    currentLocation: "CSE Academic Block • Floor 4, Cabin 401",
    locationStatus: "In Cabin (Available)",
    directions: [
      "Enter CSE Academic Block via Main Entrance Lobby.",
      "Take Central Elevator or North Stairs to Floor 4.",
      "Turn Left into the Senior Faculty Corridor.",
      "Cabin 401 is the 3rd door on your right."
    ],
    todayTimetable: [
      { time: "09:00 AM - 10:30 AM", activity: "CSE 401: Advanced AI Lecture", venue: "Lecture Hall B", status: "Completed" },
      { time: "11:00 AM - 12:30 PM", activity: "Department HOD Review Meeting", venue: "Conference Room 1", status: "Completed" },
      { time: "02:00 PM - 04:00 PM", activity: "Faculty Office & Student Consultation Hours", venue: "Cabin 401", status: "Ongoing" },
      { time: "04:15 PM - 05:30 PM", activity: "Deep Learning Research Lab Session", venue: "AI Research Lab", status: "Upcoming" }
    ]
  },
  {
    id: "cse-102",
    name: "Prof. David Chen",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    email: "d.chen@cse.edu",
    phone: "+1 (555) 019-4820",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    currentLocation: "CSE Academic Block • Floor 3, Cabin 312",
    locationStatus: "In Cabin (Available)",
    directions: [
      "Enter CSE Academic Block via Main Entrance.",
      "Take Elevator or Stairs to Floor 3.",
      "Walk straight down the Main Corridor towards Room 312.",
      "Cabin 312 is located next to the Systems Lab."
    ],
    todayTimetable: [
      { time: "09:30 AM - 11:00 AM", activity: "CSE 210: Data Structures Lecture", venue: "Hall 3", status: "Completed" },
      { time: "11:30 AM - 01:00 PM", activity: "Cloud Computing Lab Supervision", venue: "Systems Lab 2", status: "Completed" },
      { time: "02:00 PM - 03:30 PM", activity: "Office Consultation Hours", venue: "Cabin 312", status: "Ongoing" },
      { time: "03:45 PM - 05:00 PM", activity: "Distributed Systems Project Mentoring", venue: "Cabin 312", status: "Upcoming" }
    ]
  },
  {
    id: "cse-103",
    name: "Dr. Elena Rostova",
    designation: "Professor",
    department: "Computer Science & Engineering",
    email: "e.rostova@cse.edu",
    phone: "+1 (555) 019-3921",
    image: "https://images.unsplash.com/photo-1580894732413-802c6b4122d6?auto=format&fit=crop&q=80&w=600",
    currentLocation: "CSE Academic Block • Floor 5, Cabin 508",
    locationStatus: "In Lecture (Hall C)",
    directions: [
      "Enter CSE Academic Block via East Wing Entrance.",
      "Take Elevator B directly to Floor 5.",
      "Turn Right at the Research Corridor.",
      "Cabin 508 is on the left side."
    ],
    todayTimetable: [
      { time: "10:00 AM - 11:30 AM", activity: "CSE 302: Design of Algorithms", venue: "Hall A", status: "Completed" },
      { time: "01:30 PM - 03:00 PM", activity: "CSE 415: Cryptography Lecture", venue: "Hall C", status: "Ongoing" },
      { time: "03:15 PM - 04:30 PM", activity: "Algorithm Research Group Meeting", venue: "Cabin 508", status: "Upcoming" }
    ]
  },
  {
    id: "cse-104",
    name: "Dr. Marcus Vance",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    email: "m.vance@cse.edu",
    phone: "+1 (555) 019-5829",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    currentLocation: "CSE Academic Block • Floor 2, Cabin 210",
    locationStatus: "In Cabin (Available)",
    directions: [
      "Enter CSE Academic Block via West Entrance.",
      "Walk up 1 flight of stairs to Floor 2.",
      "Turn Right down the Hardware Engineering Wing.",
      "Cabin 210 is opposite the Microprocessor Lab."
    ],
    todayTimetable: [
      { time: "09:00 AM - 10:30 AM", activity: "CSE 310: Computer Organization", venue: "Hall D", status: "Completed" },
      { time: "11:00 AM - 01:00 PM", activity: "Hardware Lab Session", venue: "Embedded Lab", status: "Completed" },
      { time: "02:00 PM - 04:00 PM", activity: "Office Hours & Student Advisory", venue: "Cabin 210", status: "Ongoing" }
    ]
  },
  {
    id: "cse-105",
    name: "Dr. Priya Patel",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    email: "p.patel@cse.edu",
    phone: "+1 (555) 019-6721",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
    currentLocation: "CSE Academic Block • Floor 6, Cabin 612",
    locationStatus: "In Cabin (Available)",
    directions: [
      "Enter CSE Academic Block via Main Entrance.",
      "Take High-Speed Elevator to Floor 6.",
      "Turn Left towards Data Systems Wing.",
      "Cabin 612 is at the end of the hall on the right."
    ],
    todayTimetable: [
      { time: "10:30 AM - 12:00 PM", activity: "CSE 330: Database Management", venue: "Hall B", status: "Completed" },
      { time: "01:30 PM - 03:00 PM", activity: "Big Data Research Review", venue: "Cabin 612", status: "Completed" },
      { time: "03:00 PM - 05:00 PM", activity: "Student Office Consultation Hours", venue: "Cabin 612", status: "Ongoing" }
    ]
  },
  {
    id: "cse-106",
    name: "Prof. Robert Thorne",
    designation: "Senior Lecturer",
    department: "Computer Science & Engineering",
    email: "r.thorne@cse.edu",
    phone: "+1 (555) 019-7128",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    currentLocation: "CSE Academic Block • Floor 1, Cabin 104",
    locationStatus: "In Cabin (Available)",
    directions: [
      "Enter CSE Academic Block via Main Lobby.",
      "Stay on Ground Floor Level 1.",
      "Walk straight past the Student Info Desk.",
      "Cabin 104 is on the left corridor."
    ],
    todayTimetable: [
      { time: "09:00 AM - 11:00 AM", activity: "CSE 101: Fundamental Programming", venue: "Main Auditorium", status: "Completed" },
      { time: "11:30 AM - 01:00 PM", activity: "Software Engineering Lab", venue: "Software Lab 1", status: "Completed" },
      { time: "02:00 PM - 03:30 PM", activity: "Student Hours", venue: "Cabin 104", status: "Ongoing" }
    ]
  },
  {
    id: "cse-107",
    name: "Dr. Aisha Al-Mansoor",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    email: "a.almansoor@cse.edu",
    phone: "+1 (555) 019-8234",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&q=80&w=600",
    currentLocation: "CSE Academic Block • Floor 3, Cabin 305",
    locationStatus: "In Vision Lab",
    directions: [
      "Enter CSE Academic Block via South Entrance.",
      "Take Elevator A to Floor 3.",
      "Turn Right towards Robotics & Vision Corridor.",
      "Cabin 305 is the second door on the left."
    ],
    todayTimetable: [
      { time: "10:00 AM - 12:00 PM", activity: "CSE 420: Computer Vision Lecture", venue: "Hall C", status: "Completed" },
      { time: "01:30 PM - 03:30 PM", activity: "Robotics & HCI Lab Session", venue: "Vision Lab", status: "Ongoing" },
      { time: "03:45 PM - 05:00 PM", activity: "Office Consultation Hours", venue: "Cabin 305", status: "Upcoming" }
    ]
  },
  {
    id: "cse-108",
    name: "Dr. Jonathan Hayes",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    email: "j.hayes@cse.edu",
    phone: "+1 (555) 019-9102",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    currentLocation: "CSE Academic Block • Floor 5, Cabin 520",
    locationStatus: "In Cabin (Available)",
    directions: [
      "Enter CSE Academic Block via Main Entrance.",
      "Take Elevator B to Floor 5.",
      "Turn Right down the Networks & Telecom Wing.",
      "Cabin 520 is located at the far right corner."
    ],
    todayTimetable: [
      { time: "11:00 AM - 12:30 PM", activity: "CSE 360: Computer Networks", venue: "Hall A", status: "Completed" },
      { time: "01:00 PM - 04:00 PM", activity: "Faculty Office & Research Hours", venue: "Cabin 520", status: "Ongoing" },
      { time: "04:15 PM - 05:30 PM", activity: "Mobile Security Lab", venue: "Network Lab", status: "Upcoming" }
    ]
  }
];

export async function getFacultyList() {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return MOCK_FACULTY_DATA;
}

export async function getFacultyById(id) {
  await new Promise((resolve) => setTimeout(resolve, 20));
  return MOCK_FACULTY_DATA.find((item) => item.id === id) || null;
}

export async function searchFaculty(query) {
  await new Promise((resolve) => setTimeout(resolve, 20));
  if (!query || query.trim() === '') {
    return MOCK_FACULTY_DATA;
  }
  const cleanQuery = query.toLowerCase().trim();
  return MOCK_FACULTY_DATA.filter((faculty) =>
    faculty.name.toLowerCase().includes(cleanQuery)
  );
}
