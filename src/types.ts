export type Role = 'admin' | 'teacher' | 'student' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  verified: boolean;
  registeredAt: string;
  specialization?: string; // for teachers
  bio?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'languages' | 'special' | 'academic' | 'educational';
  level: string; // e.g. "A1", "B2", "Intermediate"
  duration: string; // e.g. "3 أشهر (36 ساعة)"
  teacherId: string;
  teacherName: string;
  price: number;
  image: string;
  syllabus: string[];
  enrolledStudentsCount: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration: string;
  resources?: { name: string; size: string; url: string }[];
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  instructions: string;
  dueDate: string;
  maxPoints: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  courseId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  fileUrl: string;
  fileName: string;
  points?: number;
  feedback?: string;
  status: 'pending' | 'graded';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  text: string;
  timestamp: string;
  file?: {
    name: string;
    type: 'image' | 'file';
    url: string;
  };
}

export interface Channel {
  id: string;
  name: string;
  type: 'group' | 'direct';
  participants: string[]; // userIds
  courseId?: string; // if tied to a specific course group
  lastMessageText?: string;
  lastMessageTime?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'success';
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

export interface SchoolStats {
  studentsCount: number;
  teachersCount: number;
  coursesCount: number;
  successRate: number;
}
