// CSE Department Faculty Data Layer

export const MOCK_FACULTY_DATA = [
  {
    id: "cse-101",
    name: "Dr. Sarah Jenkins",
    designation: "Professor & Head of CSE",
    department: "Computer Science & Engineering",
    email: "s.jenkins@cse.edu",
    phone: "+1 (555) 019-2831",
    office: "CSE Block, Room 401",
    officeHours: "Mon & Wed 2:00 PM - 4:00 PM",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Sarah Jenkins leads the Computer Science & Engineering department. Her research focuses on Artificial Intelligence, Machine Learning Algorithms, and Neural Architecture Design.",
    courses: ["CSE 401: Advanced Artificial Intelligence", "CSE 520: Deep Learning Systems"]
  },
  {
    id: "cse-102",
    name: "Prof. David Chen",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    email: "d.chen@cse.edu",
    phone: "+1 (555) 019-4820",
    office: "CSE Block, Room 312",
    officeHours: "Tue & Thu 10:00 AM - 12:00 PM",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    bio: "Prof. David Chen specializes in Distributed Systems, Operating Systems Kernel Development, and High-Performance Cloud Computing Architecture.",
    courses: ["CSE 350: Distributed Operating Systems", "CSE 210: Data Structures & Algorithms"]
  },
  {
    id: "cse-103",
    name: "Dr. Elena Rostova",
    designation: "Professor",
    department: "Computer Science & Engineering",
    email: "e.rostova@cse.edu",
    phone: "+1 (555) 019-3921",
    office: "CSE Block, Room 508",
    officeHours: "Mon & Fri 1:00 PM - 3:00 PM",
    image: "https://images.unsplash.com/photo-1580894732413-802c6b4122d6?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Elena Rostova focuses on Algorithmic Graph Theory, Computational Complexity, and Cryptography Protocols for Distributed Networks.",
    courses: ["CSE 415: Cryptography & Network Security", "CSE 302: Design & Analysis of Algorithms"]
  },
  {
    id: "cse-104",
    name: "Dr. Marcus Vance",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    email: "m.vance@cse.edu",
    phone: "+1 (555) 019-5829",
    office: "CSE Block, Room 210",
    officeHours: "Wed 11:00 AM - 2:00 PM",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Marcus Vance researches Computer Architecture, Microprocessor Engineering, and Hardware Acceleration for Embedded Systems.",
    courses: ["CSE 310: Computer Organization & Architecture", "CSE 450: Embedded Systems"]
  },
  {
    id: "cse-105",
    name: "Dr. Priya Patel",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    email: "p.patel@cse.edu",
    phone: "+1 (555) 019-6721",
    office: "CSE Block, Room 612",
    officeHours: "Tue & Thu 3:00 PM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Priya Patel works on Database Management Systems, Large-Scale Data Warehousing, and Information Retrieval Engines.",
    courses: ["CSE 330: Database Management Systems", "CSE 501: Big Data Infrastructure"]
  },
  {
    id: "cse-106",
    name: "Prof. Robert Thorne",
    designation: "Senior Lecturer",
    department: "Computer Science & Engineering",
    email: "r.thorne@cse.edu",
    phone: "+1 (555) 019-7128",
    office: "CSE Block, Room 104",
    officeHours: "Mon & Thu 9:00 AM - 11:00 AM",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    bio: "Prof. Robert Thorne teaches introductory programming, Software Engineering principles, and Object-Oriented Software Design Patterns.",
    courses: ["CSE 101: Fundamentals of Computer Programming", "CSE 240: Software Engineering"]
  },
  {
    id: "cse-107",
    name: "Dr. Aisha Al-Mansoor",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    email: "a.almansoor@cse.edu",
    phone: "+1 (555) 019-8234",
    office: "CSE Block, Room 305",
    officeHours: "Wed & Fri 10:00 AM - 12:00 PM",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Aisha Al-Mansoor specializes in Computer Vision, Image Processing, Robotics Control, and Human-Computer Interaction.",
    courses: ["CSE 420: Computer Vision", "CSE 380: Human-Computer Interaction"]
  },
  {
    id: "cse-108",
    name: "Dr. Jonathan Hayes",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    email: "j.hayes@cse.edu",
    phone: "+1 (555) 019-9102",
    office: "CSE Block, Room 520",
    officeHours: "Tue 1:00 PM - 4:00 PM",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Jonathan Hayes researches Computer Networks, Wireless Communication Protocols, and Edge Computing Security.",
    courses: ["CSE 360: Computer Networks", "CSE 470: Wireless & Mobile Security"]
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
