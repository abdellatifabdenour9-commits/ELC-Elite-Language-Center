import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, CartesianGrid, Legend 
} from 'recharts';
import { 
  Users, BookOpen, DollarSign, Award, Plus, Trash2, 
  CheckCircle, AlertTriangle, ShieldCheck, Mail, Calendar, Sparkles, UserCheck 
} from 'lucide-react';
import { useApp } from '../store';
import { Course, User, Announcement } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, currentRole, users, courses, payments, 
    announcements, stats, addCourse, addAnnouncement 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'accounts' | 'courses' | 'payments' | 'announcements'>('analytics');
  
  // Forms states
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: 'languages' as Course['category'],
    level: 'مبتدئ (A1 - A2)',
    duration: '3 أشهر (36 ساعة)',
    teacherId: '',
    price: 300,
    syllabusInput: ''
  });

  const [showAnnModal, setShowAnnModal] = useState(false);
  const [annForm, setAnnForm] = useState({
    title: '',
    content: '',
    type: 'info' as Announcement['type']
  });

  const [userFilter, setUserFilter] = useState<'all' | 'student' | 'teacher'>('all');

  // RBAC Access Control Protection Check
  if (currentRole !== 'admin') {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/20 text-[#800000] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-10 h-10 animate-bounce" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#002B5B] dark:text-slate-100">غير مصرح بالوصول!</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          عذراً، لوحة التحكم الإدارية مخفية بالكامل ومحمية بنظام الصلاحيات (RBAC). يرجى تغيير دورك الأكاديمي الحالي من شريط الأدوات العلوي للمعاينة.
        </p>
      </div>
    );
  }

  // Analytics Chart datasets
  const enrollmentData = [
    { name: 'اللغة الإنجليزية', الطلاب: 680, الدورات: 12 },
    { name: 'اللغة الفرنسية', الطلاب: 340, الدورات: 6 },
    { name: 'اللغة العربية', الطلاب: 230, الدورات: 4 },
    { name: 'المحادثة الحرة', الطلاب: 410, الدورات: 8 }
  ];

  const revenueData = [
    { month: 'يناير', الإيرادات: 18500 },
    { month: 'فبراير', الإيرادات: 24200 },
    { month: 'مارس', الإيرادات: 31800 },
    { month: 'أبريل', الإيرادات: 29400 },
    { month: 'مايو', الإيرادات: 38900 },
    { month: 'يونيو', الإيرادات: 45200 }
  ];

  // Teachers options for course creators
  const teachersList = users.filter(u => u.role === 'teacher');

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.teacherId) return;

    const teacher = teachersList.find(t => t.id === courseForm.teacherId);
    
    addCourse({
      title: courseForm.title,
      description: courseForm.description,
      category: courseForm.category,
      level: courseForm.level,
      duration: courseForm.duration,
      teacherId: courseForm.teacherId,
      teacherName: teacher ? teacher.name : 'أستاذ معتمد',
      price: Number(courseForm.price),
      syllabus: courseForm.syllabusInput.split('\n').filter(line => line.trim() !== ''),
      image: courseForm.category === 'languages' 
        ? 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600'
        : courseForm.category === 'special'
          ? 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600'
          : courseForm.category === 'academic'
            ? 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600'
            : 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600'
    });

    alert(`تم بنجاح إضافة برنامج لغوي جديد: "${courseForm.title}" واعتماده في الكتالوج العام.`);
    setShowCourseModal(false);
    setCourseForm({
      title: '',
      description: '',
      category: 'languages',
      level: 'مبتدئ (A1 - A2)',
      duration: '3 أشهر (36 ساعة)',
      teacherId: '',
      price: 300,
      syllabusInput: ''
    });
  };

  const handleAnnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annForm.title || !annForm.content) return;

    addAnnouncement(annForm.title, annForm.content, annForm.type);
    alert('تم نشر وتعميم الإعلان الإداري لجميع مستخدمي المنصة بنجاح.');
    setShowAnnModal(false);
    setAnnForm({ title: '', content: '', type: 'info' });
  };

  // Filter user accounts
  const filteredUsers = users.filter(u => {
    if (userFilter === 'all') return u.role !== 'admin';
    return u.role === userFilter;
  });

  return (
    <div className="py-6 md:py-12 max-w-7xl mx-auto px-4 text-right space-y-8 md:space-y-10">
      {/* Admin Title Board */}
      <div className="bg-[#002B5B] text-white p-5 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row-reverse justify-between items-center gap-6 border-b-4 border-[#800000]">
        <div className="text-right space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#800000] text-rose-100">
            🔐 لوحة تحكم الإدارة العليا (صلاحيات كاملة)
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">إدارة منظومة مدرسة اللغات ELC</h1>
          <p className="text-xs text-slate-300">مرحباً بك {currentUser?.name}. تحكم بالحسابات والمدفوعات والمناهج والدورات في لوحة موحدة.</p>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <button 
            onClick={() => setShowCourseModal(true)}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold rounded-lg transition flex items-center gap-2"
            id="admin-create-course-btn"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة دورة جديدة</span>
          </button>
          <button 
            onClick={() => setShowAnnModal(true)}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition"
            id="admin-create-ann-btn"
          >
            نشر إعلان عام
          </button>
        </div>
      </div>

      {/* Sub Tabs control bar */}
      <div className="flex flex-wrap flex-row-reverse justify-center md:justify-start gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        {[
          { id: 'analytics', label: 'الرؤى الإحصائية والتحليلات' },
          { id: 'accounts', label: 'إدارة حسابات المنتسبين' },
          { id: 'courses', label: 'إدارة البرامج والمناهج' },
          { id: 'payments', label: 'الحركة والعمليات المالية' },
          { id: 'announcements', label: 'إصدار التنويهات والإعلانات' }
        ].map((subTab) => (
          <button
            key={subTab.id}
            onClick={() => setActiveSubTab(subTab.id as any)}
            className={`px-3 sm:px-5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === subTab.id 
                ? 'bg-[#002B5B] text-white shadow' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
            id={`subtab-btn-${subTab.id}`}
          >
            {subTab.label}
          </button>
        ))}
      </div>

      {/* Interactive area */}
      <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-4 sm:p-8 rounded-2xl shadow-md min-h-[400px]">
        
        {/* ANALYTICS TAB */}
        {activeSubTab === 'analytics' && (
          <div className="space-y-8">
            <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100">إحصاءات ونسب التحصيل العام لعام 2026</h3>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'إجمالي الحسابات المسجلة', value: users.length, change: '+12% هذا الشهر', icon: Users, color: 'text-indigo-600 bg-indigo-50' },
                { label: 'عدد المناهج المفعلة', value: courses.length, change: 'تحديث مستمر', icon: BookOpen, color: 'text-[#800000] bg-rose-50' },
                { label: 'إيرادات الاشتراكات الإجمالية', value: `${payments.reduce((acc, p) => acc + p.amount, 0).toLocaleString()} د.ج`, change: 'نمو مستمر', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'متوسط علامات النجاح', value: '98.4%', change: 'مستوى متميز', icon: Award, color: 'text-amber-600 bg-amber-50' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-right">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-medium">{item.label}</p>
                      <p className="text-xl font-extrabold text-[#002B5B] dark:text-slate-100">{item.value}</p>
                      <p className="text-[9px] text-slate-500 font-semibold">{item.change}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recharts visualizations */}
            <div className="grid md:grid-cols-2 gap-8 pt-4">
              {/* Chart 1: Enrollment stats by language */}
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                <p className="font-bold text-xs text-slate-500">حجم تسجيل الطلاب والبرامج حسب كل قسم لغوي</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} />
                      <YAxis stroke="#888888" fontSize={10} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="الطلاب" fill="#800000" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Revenue streams growth */}
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                <p className="font-bold text-xs text-slate-500 font-medium">نمو الإيرادات المالية للفصل الدراسي الحالي (د.ج)</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" stroke="#888888" fontSize={10} tickLine={false} />
                      <YAxis stroke="#888888" fontSize={10} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="الإيرادات" stroke="#002B5B" fill="#002B5B" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ACCOUNTS MANAGEMENT TAB */}
        {activeSubTab === 'accounts' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100">قائمة الطواقم التعليمية والطلاب المنتسبين</h3>
              
              {/* User filter buttons */}
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'الجميع' },
                  { id: 'teacher', label: 'الأساتذة' },
                  { id: 'student', label: 'الطلاب' }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setUserFilter(btn.id as any)}
                    className={`px-3 py-1 rounded text-xs ${
                      userFilter === btn.id 
                        ? 'bg-[#800000] text-white' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Users grid list */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`تم تفعيل حساب "${user.name}" بنجاح وتوثيق وثائقه الأكاديمية.`)}
                      className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded text-[10px] font-bold"
                      title="توثيق الحساب"
                    >
                      <UserCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert(`تم تعليق حساب "${user.name}" مؤقتاً لأسباب إدارية.`)}
                      className="p-1.5 bg-rose-50 text-[#800000] hover:bg-rose-100 rounded text-[10px] font-bold"
                      title="تعليق الحساب"
                    >
                      تعليق
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{user.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{user.email}</p>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        user.role === 'teacher' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'teacher' ? 'أستاذ المادة' : 'طالب'}
                      </span>
                    </div>
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMINISTER COURSES CATALOG */}
        {activeSubTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <button
                onClick={() => setShowCourseModal(true)}
                className="px-4 py-2 bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold rounded-lg transition"
              >
                إضافة منهج أو برنامج دراسي جديد
              </button>
              <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100">الكتالوج الأكاديمي الحالي لمدرسة ELC</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4">
                  <div className="text-left font-bold text-[#800000] text-sm shrink-0">
                    {course.price.toLocaleString()} د.ج
                  </div>
                  
                  <div className="text-right space-y-1">
                    <p className="font-bold text-sm text-[#002B5B] dark:text-slate-100">{course.title}</p>
                    <p className="text-xs text-slate-500">مستوى الدورة: {course.level}</p>
                    <p className="text-[10px] text-slate-400">الأستاذ المسؤول: <span className="font-semibold text-slate-600 dark:text-slate-300">{course.teacherName}</span></p>
                    <p className="text-[10px] text-slate-400">عدد المنتسبين: <span className="font-bold text-slate-700 dark:text-slate-200">{course.enrolledStudentsCount} طلاب</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAYMENTS LEDGER TAB */}
        {activeSubTab === 'payments' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4">الحركة المالية ومتحصلات رسوم الاشتراك</h3>

            <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="p-4">حالة الدفعة</th>
                    <th className="p-4">تاريخ المعاملة</th>
                    <th className="p-4">المبلغ (د.ج)</th>
                    <th className="p-4">البرنامج / الدورة</th>
                    <th className="p-4">اسم الطالب الكريم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                  {payments.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {p.status === 'completed' ? 'تم الدفع والاعتماد' : 'قيد التدقيق والانتظار'}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-400">{p.date}</td>
                      <td className="p-4 font-extrabold text-slate-800 dark:text-slate-200">{p.amount.toLocaleString()} د.ج</td>
                      <td className="p-4 font-semibold text-slate-500 truncate max-w-[200px]">{p.courseTitle}</td>
                      <td className="p-4 font-bold">{p.studentName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS MANAGER TAB */}
        {activeSubTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <button
                onClick={() => setShowAnnModal(true)}
                className="px-4 py-2 bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold rounded-lg transition"
              >
                إصدار ونشر إعلان جديد
              </button>
              <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100">التنويهات والإعلانات العامة النشطة</h3>
            </div>

            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex justify-between items-start gap-4">
                  <div className="text-left text-[10px] text-slate-400 font-semibold shrink-0">
                    {ann.date}
                  </div>
                  
                  <div className="text-right space-y-1">
                    <p className="font-bold text-sm text-[#002B5B] dark:text-slate-100 flex items-center justify-end gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        ann.type === 'success' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : ann.type === 'warning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {ann.type === 'success' ? 'خصومات وعروض' : ann.type === 'warning' ? 'تنويه تقني' : 'إعلان إداري'}
                      </span>
                      <span>{ann.title}</span>
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">{ann.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD COURSE FORM */}
      <AnimatePresence>
        {showCourseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl max-w-md w-full text-right relative space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <button 
                  onClick={() => setShowCourseModal(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
                >
                  ❌
                </button>
                <h3 className="text-base font-bold text-[#002B5B] dark:text-slate-100">إضافة منهج أو برنامج لغوي جديد</h3>
              </div>

              <form onSubmit={handleCourseSubmit} className="space-y-4 text-xs">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">اسم المنهج / الدورة الأكاديمية <span className="text-[#800000]">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="مثال: الإنجليزية للأعمال والمفاوضات الدولية"
                    id="new-course-title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">القسم اللغوي الرئيسي</label>
                    <select
                      value={courseForm.category}
                      onChange={(e) => setCourseForm(p => ({ ...p, category: e.target.value as any }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right appearance-none"
                    >
                      <option value="languages">دورات اللغات</option>
                      <option value="special">البرامج الخاصة</option>
                      <option value="academic">دورات أكاديمية</option>
                      <option value="educational">محتوى تعليمي</option>
                    </select>
                  </div>
                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">سعر الدورة (د.ج)</label>
                    <input 
                      type="number"
                      required
                      value={courseForm.price}
                      onChange={(e) => setCourseForm(p => ({ ...p, price: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Level */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">المستويات المستهدفة</label>
                    <input 
                      type="text"
                      required
                      value={courseForm.level}
                      onChange={(e) => setCourseForm(p => ({ ...p, level: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                      placeholder="Intermediate (B2)"
                    />
                  </div>
                  {/* Duration */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">المدة والعدد التدريبي</label>
                    <input 
                      type="text"
                      required
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm(p => ({ ...p, duration: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                      placeholder="3 أشهر (36 ساعة)"
                    />
                  </div>
                </div>

                {/* Professor */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">أستاذ المادة المسؤول <span className="text-[#800000]">*</span></label>
                  <select
                    required
                    value={courseForm.teacherId}
                    onChange={(e) => setCourseForm(p => ({ ...p, teacherId: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right appearance-none"
                    id="new-course-teacher"
                  >
                    <option value="">حدد معلماً للبرنامج</option>
                    {teachersList.map((t) => (
                      <option key={t.id} value={t.id}>{t.name} ({t.specialization?.split(' ')[0]})</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">وصف موجز للمحتوى</label>
                  <textarea 
                    rows={2}
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(p => ({ ...p, description: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="اكتب نبذة شاملة عن محتوى البرنامج والأهداف ليتسنى للطلاب القراءة والتحمس للحجز..."
                  />
                </div>

                {/* Syllabus bullet list */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">مواضيع خطة العمل بالتفصيل (سطر لكل نقطة) <span className="text-[#800000]">*</span></label>
                  <textarea 
                    required
                    rows={3}
                    value={courseForm.syllabusInput}
                    onChange={(e) => setCourseForm(p => ({ ...p, syllabusInput: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="كتابة البريد المهني بطرق احترافية&#10;قيادة الاجتماعات المهنية&#10;إجراء المقابلات وإعداد السيرة الذاتية"
                    id="new-course-syllabus"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#800000] hover:bg-[#600000] text-white font-bold rounded-xl transition shadow"
                  >
                    تأكيد اعتماد المنهج ونشره
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD ANNOUNCEMENT */}
      <AnimatePresence>
        {showAnnModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl max-w-md w-full text-right relative space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <button 
                  onClick={() => setShowAnnModal(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
                >
                  ❌
                </button>
                <h3 className="text-base font-bold text-[#002B5B] dark:text-slate-100">إصدار ونشر إعلان إداري جديد</h3>
              </div>

              <form onSubmit={handleAnnSubmit} className="space-y-4 text-xs">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">عنوان التنويه أو الإعلان <span className="text-[#800000]">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={annForm.title}
                    onChange={(e) => setAnnForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="مثال: خصم خاص لطلاب المجموعات بمناسبة الصيف"
                    id="new-ann-title"
                  />
                </div>

                {/* Type */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">نوع وهدف الإعلان</label>
                  <select
                    value={annForm.type}
                    onChange={(e) => setAnnForm(p => ({ ...p, type: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right appearance-none"
                  >
                    <option value="info">إرشادي عام (أزرق)</option>
                    <option value="success">عروض وتخفيضات (أخضر)</option>
                    <option value="warning">تنويه صيانة أو هام (أصفر/برتقالي)</option>
                  </select>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">تفاصيل ونص البيان الإداري <span className="text-[#800000]">*</span></label>
                  <textarea 
                    required
                    rows={4}
                    value={annForm.content}
                    onChange={(e) => setAnnForm(p => ({ ...p, content: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="اكتب محتوى الإعلان هنا ليتم تعميمه فوراً لجميع طواقم التدريس والطلاب..."
                    id="new-ann-content"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#800000] hover:bg-[#600000] text-white font-bold rounded-xl transition shadow"
                  >
                    تعميم ونشر الإعلان فوراً
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
