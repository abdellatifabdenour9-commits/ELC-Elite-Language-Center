import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Course, Lesson, Assignment, Submission, 
  Payment, Announcement, Channel, Message, Role, SchoolStats 
} from './types';
import { 
  mockUsers, mockCourses, mockLessons, mockAssignments, 
  mockSubmissions, mockPayments, mockAnnouncements, 
  mockChannels, mockMessages, initialStats 
} from './data';
import { Language, translations } from './translations';

interface AppContextType {
  // Current logged in user context
  currentUser: User | null;
  currentRole: Role;
  login: (email: string) => boolean;
  logout: () => void;
  signUp: (name: string, email: string, role: Role) => void;
  switchRole: (role: Role) => void;
  
  // App state
  users: User[];
  courses: Course[];
  lessons: Lesson[];
  assignments: Assignment[];
  submissions: Submission[];
  payments: Payment[];
  announcements: Announcement[];
  channels: Channel[];
  messages: Message[];
  stats: SchoolStats;
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Language translation support
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  // Actions
  enrollInCourse: (courseId: string) => void;
  addCourse: (course: Omit<Course, 'id' | 'enrolledStudentsCount'>) => void;
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  addAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  submitAssignment: (submission: Omit<Submission, 'id' | 'studentId' | 'studentName' | 'submittedAt' | 'status'>) => void;
  gradeSubmission: (submissionId: string, points: number, feedback: string) => void;
  sendChatMessage: (channelId: string, text: string, file?: Message['file']) => void;
  createChannel: (name: string, type: 'group' | 'direct', participants: string[], courseId?: string) => void;
  addAnnouncement: (title: string, content: string, type: Announcement['type']) => void;
  processPayment: (courseId: string, amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Automatic localStorage migration: Clear stale database keys if we detect outdated categories or outdated pricing
  const savedCoursesCheck = localStorage.getItem('elc_courses');
  if (savedCoursesCheck) {
    try {
      const parsed = JSON.parse(savedCoursesCheck) as Course[];
      const hasOldCategoryOrOutdatedPrice = parsed.some(c => 
        !['languages', 'special', 'academic', 'educational'].includes(c.category) || 
        c.price !== 10000
      );
      if (hasOldCategoryOrOutdatedPrice) {
        const keysToClear = [
          'elc_courses', 'elc_lessons', 'elc_assignments', 'elc_submissions', 
          'elc_payments', 'elc_announcements', 'elc_channels', 'elc_messages', 
          'elc_stats', 'elc_users', 'elc_current_user', 'elc_current_role'
        ];
        keysToClear.forEach(key => localStorage.removeItem(key));
      }
    } catch (e) {
      console.error('Error during store migration:', e);
    }
  }

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('elc_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Current logged-in user
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('elc_current_user');
    return saved ? JSON.parse(saved) : mockUsers.find(u => u.role === 'admin') || null; // default to u-admin-1 for demonstration
  });

  const [currentRole, setCurrentRole] = useState<Role>(() => {
    const saved = localStorage.getItem('elc_current_role');
    return (saved as Role) || 'admin';
  });

  // Database States
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('elc_users');
    return saved ? JSON.parse(saved) : mockUsers;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('elc_courses');
    return saved ? JSON.parse(saved) : mockCourses;
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('elc_lessons');
    return saved ? JSON.parse(saved) : mockLessons;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('elc_assignments');
    return saved ? JSON.parse(saved) : mockAssignments;
  });

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem('elc_submissions');
    return saved ? JSON.parse(saved) : mockSubmissions;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('elc_payments');
    return saved ? JSON.parse(saved) : mockPayments;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('elc_announcements');
    return saved ? JSON.parse(saved) : mockAnnouncements;
  });

  const [channels, setChannels] = useState<Channel[]>(() => {
    const saved = localStorage.getItem('elc_channels');
    return saved ? JSON.parse(saved) : mockChannels;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('elc_messages');
    return saved ? JSON.parse(saved) : mockMessages;
  });

  const [stats, setStats] = useState<SchoolStats>(() => {
    const saved = localStorage.getItem('elc_stats');
    return saved ? JSON.parse(saved) : initialStats;
  });

  // Persist states to LocalStorage
  useEffect(() => {
    localStorage.setItem('elc_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('elc_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('elc_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('elc_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('elc_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('elc_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('elc_lessons', JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem('elc_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('elc_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('elc_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('elc_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('elc_channels', JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem('elc_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('elc_stats', JSON.stringify(stats));
  }, [stats]);

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('elc_language');
    return (saved as Language) || 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('elc_language', lang);
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['ar']?.[key] || key;
  };

  // Helper: toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Auth Operations
  const login = (email: string): boolean => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      setCurrentRole(foundUser.role);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('guest');
  };

  const signUp = (name: string, email: string, role: Role) => {
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      verified: true,
      registeredAt: new Date().toISOString().split('T')[0],
      avatar: `https://images.unsplash.com/photo-${role === 'teacher' ? '1573496359142-b8d87734a5a2' : '1534528741775-53994a69daeb'}?w=150`
    };
    
    // Add default specialization for mock sign up
    if (role === 'teacher') {
      newUser.specialization = 'معلم لغات معتمد';
      newUser.bio = 'عضو جديد في الطاقم التعليمي المتميز لمركز Elite Language Center.';
    }

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentRole(role);

    // Update students count if registering as a student
    if (role === 'student') {
      setStats(prev => ({ ...prev, studentsCount: prev.studentsCount + 1 }));
    } else if (role === 'teacher') {
      setStats(prev => ({ ...prev, teachersCount: prev.teachersCount + 1 }));
    }
  };

  const switchRole = (role: Role) => {
    setCurrentRole(role);
    // Find first user with this role to simulate switching accounts
    const match = users.find(u => u.role === role);
    if (match) {
      setCurrentUser(match);
    } else {
      // Create a temporary placeholder if none exists
      const tempUser: User = {
        id: `u-temp-${role}`,
        name: role === 'admin' ? 'المدير العام التجريبي' : role === 'teacher' ? 'الأستاذ التجريبي' : 'الطالب التجريبي',
        email: `${role}@elc.edu`,
        role: role,
        verified: true,
        registeredAt: new Date().toISOString().split('T')[0],
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
      };
      setUsers(prev => [...prev, tempUser]);
      setCurrentUser(tempUser);
    }
  };

  // Student Actions
  const enrollInCourse = (courseId: string) => {
    if (!currentUser) return;
    
    // Check if already paid or has payment
    const alreadyPaid = payments.some(p => p.studentId === currentUser.id && p.courseId === courseId && p.status === 'completed');
    if (!alreadyPaid) {
      // Trigger a simulation of standard successful payment
      processPayment(courseId, courses.find(c => c.id === courseId)?.price || 100);
    }

    // Update enrolled students counter
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolledStudentsCount: c.enrolledStudentsCount + 1 };
      }
      return c;
    }));
  };

  const processPayment = (courseId: string, amount: number) => {
    if (!currentUser) return;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      courseId,
      courseTitle: course.title,
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };

    setPayments(prev => [newPayment, ...prev]);
  };

  const submitAssignment = (submission: Omit<Submission, 'id' | 'studentId' | 'studentName' | 'submittedAt' | 'status'>) => {
    if (!currentUser) return;

    const newSubmission: Submission = {
      ...submission,
      id: `sub-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'pending'
    };

    setSubmissions(prev => [newSubmission, ...prev]);
  };

  // Teacher Actions
  const gradeSubmission = (submissionId: string, points: number, feedback: string) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          points,
          feedback,
          status: 'graded' as const
        };
      }
      return sub;
    }));
  };

  const addCourse = (courseData: Omit<Course, 'id' | 'enrolledStudentsCount'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `c-${Date.now()}`,
      enrolledStudentsCount: 0
    };
    
    setCourses(prev => [...prev, newCourse]);
    setStats(prev => ({ ...prev, coursesCount: prev.coursesCount + 1 }));
  };

  const addLesson = (lessonData: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: `l-${Date.now()}`
    };
    setLessons(prev => [...prev, newLesson]);
  };

  const addAssignment = (assignmentData: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: `a-${Date.now()}`
    };
    setAssignments(prev => [...prev, newAssignment]);
  };

  // Admin Actions
  const addAnnouncement = (title: string, content: string, type: Announcement['type']) => {
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      type
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  // Chat System Operations
  const sendChatMessage = (channelId: string, text: string, file?: Message['file']) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      file
    };

    setMessages(prev => [...prev, newMessage]);

    // Update last message in channel
    setChannels(prev => prev.map(ch => {
      if (ch.id === channelId) {
        return {
          ...ch,
          lastMessageText: text || (file ? `📎 مرفق: ${file.name}` : ''),
          lastMessageTime: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        };
      }
      return ch;
    }));
  };

  const createChannel = (name: string, type: 'group' | 'direct', participants: string[], courseId?: string) => {
    const newChannel: Channel = {
      id: `ch-${Date.now()}`,
      name,
      type,
      participants,
      courseId,
      lastMessageText: 'لا توجد رسائل بعد',
      lastMessageTime: '--:--'
    };
    setChannels(prev => [newChannel, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      currentRole,
      login,
      logout,
      signUp,
      switchRole,
      users,
      courses,
      lessons,
      assignments,
      submissions,
      payments,
      announcements,
      channels,
      messages,
      stats,
      theme,
      toggleTheme,
      language,
      setLanguage,
      t,
      enrollInCourse,
      addCourse,
      addLesson,
      addAssignment,
      submitAssignment,
      gradeSubmission,
      sendChatMessage,
      createChannel,
      addAnnouncement,
      processPayment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
