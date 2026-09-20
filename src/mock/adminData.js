export const mockAdminFaculty = [
  {
    id: 'F01',
    name: 'Dr. Sarah Jenkins',
    cabin: 'Cabin 401',
    cabin_directions: 'Enter CSE Academic Block, take elevator to Floor 4, turn left at the Senior Faculty corridor.',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'F02',
    name: 'Prof. David Chen',
    cabin: 'Cabin 312',
    cabin_directions: 'Take the main elevator to Floor 3, continue straight to the Systems Lab wing.',
    image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'F03',
    name: 'Dr. Elena Rostova',
    cabin: 'Cabin 508',
    cabin_directions: 'Use Elevator B to Floor 5, turn right toward the Research Corridor and follow the signs.',
    image_url: 'https://images.unsplash.com/photo-1580894732413-802c6b4122d6?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'F04',
    name: 'Dr. Marcus Vance',
    cabin: 'Cabin 210',
    cabin_directions: 'Walk to the Hardware Engineering Wing on Floor 2 and take the first corridor on the right.',
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
  }
];

export const mockTimetableEntries = [
  { facultyId: 'F01', facultyName: 'Dr. Sarah Jenkins', day: 'Mon', periodNo: 1, subject: 'AI Lecture', room: 'Hall B' },
  { facultyId: 'F01', facultyName: 'Dr. Sarah Jenkins', day: 'Mon', periodNo: 3, subject: 'HOD Review', room: 'Conference Room 1' },
  { facultyId: 'F02', facultyName: 'Prof. David Chen', day: 'Tue', periodNo: 2, subject: 'Cloud Lab', room: 'Systems Lab 2' },
  { facultyId: 'F03', facultyName: 'Dr. Elena Rostova', day: 'Wed', periodNo: 4, subject: 'Cryptography', room: 'Hall C' },
  { facultyId: 'F04', facultyName: 'Dr. Marcus Vance', day: 'Thu', periodNo: 5, subject: 'Hardware Lab', room: 'Embedded Lab' }
];
