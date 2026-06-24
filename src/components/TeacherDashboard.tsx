import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Video, FileText, CheckSquare, Plus, Check, 
  Users, Trash2, ArrowLeft, Send, Award, AlertCircle, Sparkles, FolderPlus 
} from 'lucide-react';
import { useApp } from '../store';
import { Course, Lesson, Assignment, Submission } from '../types';

export const TeacherDashboard: React.FC = () => {
  const { 
    currentUser, courses, lessons, assignments, 
    submissions, gradeSubmission, addLesson, addAssignment, payments 
  } = useApp();

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Tab control
  const [activeTab, setActiveTab] = useState<'lessons' | 'assignments' | 'grading' | 'roster'>('lessons');

  // Modal forms
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState<Submission | null>(null);

  // Form states
  const [lessonForm, setLessonForm] = useState({
    title: '',
    content: '',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '45 دقيقة'
  });

  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    instructions: '',
    dueDate: '2026-07-15',
    maxPoints: 10
  });

  const [gradeForm, setGradeForm] = useState({
    points: 10,
    feedback: ''
  });

  if (!currentUser) {
    return (
      <div className="py-20 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-[#800000] mx-auto" />
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">الرجاء تسجيل الدخول أولاً</h2>
        <p className="text-slate-500">يجب تسجيل الدخول كأستاذ لاستعراض هذه الصفحة.</p>
      </div>
    );
  }

  // Filter courses taught by this teacher
  const teacherCourses = courses.filter(c => c.teacherId === currentUser.id);

  // Automatically select the first course on load if none selected
  if (!selectedCourse && teacherCourses.length > 0) {
    setSelectedCourse(teacherCourses[0]);
  }

  // Handle forms submit
  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !lessonForm.title || !lessonForm.content) return;

    addLesson({
      courseId: selectedCourse.id,
      title: lessonForm.title,
      content: lessonForm.content,
      videoUrl: lessonForm.videoUrl,
      duration: lessonForm.duration,
      resources: [
        { name: 'ملف الشرح والمصطلحات الأكاديمية.pdf', size: '1.2 MB', url: '#' },
        { name: 'بنك أسئلة المحادثة وكسر الرهبة.pdf', size: '850 KB', url: '#' }
      ]
    });

    alert(`تم بنجاح إضافة الدرس الأكاديمي الجديد: "${lessonForm.title}" ونشره لجميع الطلاب!`);
    setShowLessonForm(false);
    setLessonForm({
      title: '',
      content: '',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '45 دقيقة'
    });
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !assignmentForm.title || !assignmentForm.instructions) return;

    addAssignment({
      courseId: selectedCourse.id,
      title: assignmentForm.title,
      instructions: assignmentForm.instructions,
      dueDate: assignmentForm.dueDate,
      maxPoints: Number(assignmentForm.maxPoints)
    });

    alert(`تم نشر وتعميم التكليف الدراسي الجديد: "${assignmentForm.title}" بنجاح!`);
    setShowAssignmentForm(false);
    setAssignmentForm({
      title: '',
      instructions: '',
      dueDate: '2026-07-15',
      maxPoints: 10
    });
  };

  const handleGradingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubmission) return;

    gradeSubmission(gradingSubmission.id, Number(gradeForm.points), gradeForm.feedback);

    alert(`تم تصحيح واجب الطالب "${gradingSubmission.studentName}" وحفظ التقييم والدرجة الممنوحة بنجاح.`);
    setGradingSubmission(null);
    setGradeForm({ points: 10, feedback: '' });
  };

  // Submissions for this course
  const courseSubmissions = submissions.filter(s => s.courseId === selectedCourse?.id);
  const pendingSubmissions = courseSubmissions.filter(s => s.status === 'pending');

  // Enrolled students roster for this course
  const enrolledStudentNames = payments
    .filter(p => p.courseId === selectedCourse?.id && p.status === 'completed')
    .map(p => ({
      name: p.studentName,
      date: p.date,
      studentId: p.studentId
    }));

  return (
    <div className="py-6 md:py-12 max-w-7xl mx-auto px-4 text-right space-y-8 md:space-y-12">
      {/* Teacher Welcome Banner */}
      <div className="bg-gradient-to-l from-[#002B5B] to-[#001F42] text-white p-5 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row-reverse justify-between items-center gap-6">
        <div className="flex items-center justify-end gap-3 sm:gap-4 flex-row-reverse md:flex-row">
          <div className="text-right space-y-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-rose-200 bg-white/10 px-2 py-0.5 rounded-full">بوابة الأساتذة والتقييم الأكاديمي</span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">أهلاً بك، {currentUser.name} 🎓</h1>
            <p className="text-xs text-rose-100">{currentUser.specialization}</p>
          </div>
          <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="bg-white/10 p-3.5 sm:p-4 rounded-xl text-center space-y-1 text-xs text-rose-100 border border-white/10 shrink-0">
          <p>عدد واجبات قيد الانتظار للتصحيح</p>
          <p className="text-base sm:text-lg font-bold text-white">{submissions.filter(s => s.status === 'pending').length} واجبات</p>
        </div>
      </div>

      {/* Course Selector Dropdown Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-md flex flex-col md:flex-row-reverse justify-between items-center gap-6">
        <div className="text-right space-y-1">
          <h3 className="font-bold text-[#002B5B] dark:text-slate-100">حدد الدورة لإدارتها:</h3>
          <p className="text-xs text-slate-400">تحكم بالدروس والواجبات المنزلية وقوائم الحضور لهذه الدورة.</p>
        </div>
        <div className="flex flex-wrap flex-row-reverse justify-center gap-2">
          {teacherCourses.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCourse(c)}
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition ${
                selectedCourse?.id === c.id 
                  ? 'bg-[#002B5B] text-white shadow' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              id={`teacher-sel-course-${c.id}`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
          {/* Dashboard Control Tab lists */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-md space-y-2">
              {[
                { id: 'lessons', label: 'إدارة الدروس المنهجية', count: lessons.filter(l => l.courseId === selectedCourse.id).length, icon: Video },
                { id: 'assignments', label: 'الواجبات والتكليفات المنزلية', count: assignments.filter(a => a.courseId === selectedCourse.id).length, icon: FileText },
                { id: 'grading', label: 'تصحيح واجبات الطلاب', count: pendingSubmissions.length, icon: CheckSquare, badgeColor: 'bg-[#800000] text-white' },
                { id: 'roster', label: 'سجل الطلاب والمنتسبين', count: enrolledStudentNames.length, icon: Users }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full p-3.5 rounded-xl text-right text-xs font-bold transition flex flex-row-reverse items-center justify-between gap-3 ${
                      activeTab === tab.id
                        ? 'bg-[#800000] text-white'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    id={`tab-btn-${tab.id}`}
                  >
                    <div className="flex items-center gap-2 flex-row-reverse">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] ${tab.badgeColor || 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Workspace Area based on selected Tab */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-8 rounded-2xl shadow-md min-h-[400px]">
              
              {/* LESSONS TAB */}
              {activeTab === 'lessons' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <button
                      onClick={() => setShowLessonForm(true)}
                      className="px-4 py-2 bg-[#002B5B] hover:bg-[#001F42] text-white text-xs font-bold rounded-lg transition flex items-center gap-2"
                      id="add-lesson-trigger-btn"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة درس منهجي جديد</span>
                    </button>
                    <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100">الدروس الحالية للمادة</h3>
                  </div>

                  <div className="grid gap-4">
                    {lessons.filter(l => l.courseId === selectedCourse.id).length === 0 ? (
                      <p className="text-slate-400 text-sm py-12 text-center">لا توجد دروس مضافة لهذه الدورة بعد. ابدأ بإضافة درسك الأول.</p>
                    ) : (
                      lessons.filter(l => l.courseId === selectedCourse.id).map((lesson, idx) => (
                        <div key={lesson.id} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                          <span className="text-xs font-medium text-slate-400">المدة الزمنية: {lesson.duration}</span>
                          <div className="text-right space-y-1">
                            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">الدرس {idx + 1}: {lesson.title.split(': ')[1] || lesson.title}</p>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-xl truncate">{lesson.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* ASSIGNMENTS TAB */}
              {activeTab === 'assignments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <button
                      onClick={() => setShowAssignmentForm(true)}
                      className="px-4 py-2 bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold rounded-lg transition flex items-center gap-2"
                      id="add-assignment-trigger-btn"
                    >
                      <Plus className="w-4 h-4" />
                      <span>نشر تكليف دراسي جديد</span>
                    </button>
                    <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100">التكليفات والواجبات المفتوحة</h3>
                  </div>

                  <div className="grid gap-4">
                    {assignments.filter(a => a.courseId === selectedCourse.id).length === 0 ? (
                      <p className="text-slate-400 text-sm py-12 text-center">لا توجد تكليفات نشطة ومستمرة في هذه الدورة.</p>
                    ) : (
                      assignments.filter(a => a.courseId === selectedCourse.id).map((asg) => (
                        <div key={asg.id} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-3">
                          <div className="text-right space-y-1">
                            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{asg.title}</p>
                            <p className="text-xs text-slate-500 leading-relaxed">{asg.instructions}</p>
                          </div>
                          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-2 text-xs font-semibold text-slate-400">
                            <span>العلامة القصوى: {asg.maxPoints} نقطة</span>
                            <span>تاريخ التسليم النهائي: {asg.dueDate}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* GRADING TAB */}
              {activeTab === 'grading' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4">واجبات الطلاب المعلقة للتصحيح</h3>
                  
                  {pendingSubmissions.length === 0 ? (
                    <div className="py-16 text-center text-emerald-600 dark:text-emerald-400 space-y-2">
                      <Check className="w-12 h-12 mx-auto bg-emerald-100 rounded-full p-2" />
                      <p className="font-bold text-sm">أداء رائع! لا توجد واجبات معلقة للتصحيح حالياً.</p>
                      <p className="text-xs text-slate-400">جميع تسليمات الطلاب قد جرى تدقيقها بالكامل.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {pendingSubmissions.map((sub) => (
                        <div key={sub.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex flex-col md:flex-row-reverse justify-between items-center gap-4">
                          <div className="text-right space-y-1 flex-1">
                            <div className="flex items-center justify-end gap-2 flex-row-reverse">
                              <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded">طالب</span>
                              <p className="font-bold text-sm text-[#002B5B] dark:text-slate-100">{sub.studentName}</p>
                            </div>
                            <p className="text-xs text-slate-500">التكليف: <span className="font-semibold text-slate-700 dark:text-slate-300">{sub.assignmentTitle}</span></p>
                            <p className="text-[10px] text-slate-400">تم التسليم في: {sub.submittedAt}</p>
                            <p className="text-xs font-semibold text-rose-800 dark:text-rose-400 flex items-center justify-end gap-1">
                              <span>مستند الحل: {sub.fileName}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setGradingSubmission(sub);
                              setGradeForm({ points: 10, feedback: '' });
                            }}
                            className="px-4 py-2 bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold rounded-lg transition"
                            id={`grading-action-btn-${sub.id}`}
                          >
                            تصحيح وتقييم الواجب
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ROSTER TAB */}
              {activeTab === 'roster' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4">رول الطلاب المسجلين بالدورة</h3>

                  {enrolledStudentNames.length === 0 ? (
                    <p className="text-slate-400 text-sm py-12 text-center">لا يوجد طلاب مسجلون في هذه الدورة حتى اللحظة.</p>
                  ) : (
                    <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-right text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
                          <tr>
                            <th className="p-4">تاريخ الانتساب</th>
                            <th className="p-4">حالة الاتصال</th>
                            <th className="p-4">اسم الطالب الكريم</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                          {enrolledStudentNames.map((student, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                              <td className="p-4 font-mono text-slate-400">{student.date}</td>
                              <td className="p-4">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  متصل الآن
                                </span>
                              </td>
                              <td className="p-4 font-bold">{student.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD LESSON FORM */}
      <AnimatePresence>
        {showLessonForm && selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl max-w-md w-full text-right relative space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <button 
                  onClick={() => setShowLessonForm(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
                >
                  ❌
                </button>
                <h3 className="text-base font-bold text-[#002B5B] dark:text-slate-100">إضافة درس منهجي جديد</h3>
              </div>

              <form onSubmit={handleLessonSubmit} className="space-y-4 text-xs">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">عنوان الدرس الأكاديمي <span className="text-[#800000]">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="مثال: الدرس الثالث: شرح قاعدة الماضي التام"
                    id="new-lesson-title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Duration */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">مدة الشرح / الحصة</label>
                    <input 
                      type="text"
                      value={lessonForm.duration}
                      onChange={(e) => setLessonForm(p => ({ ...p, duration: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                      placeholder="مثال: 45 دقيقة"
                    />
                  </div>
                  {/* Video URL */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">رابط الفيديو (mp4)</label>
                    <input 
                      type="text"
                      value={lessonForm.videoUrl}
                      onChange={(e) => setLessonForm(p => ({ ...p, videoUrl: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-left"
                      style={{ direction: 'ltr' }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">تفاصيل الشرح الأكاديمي والملخص <span className="text-[#800000]">*</span></label>
                  <textarea 
                    required
                    rows={4}
                    value={lessonForm.content}
                    onChange={(e) => setLessonForm(p => ({ ...p, content: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="اكتب خلاصة موضوع الدرس والأهداف اللغوية والملاحظات الهامة للطلاب..."
                    id="new-lesson-content"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#002B5B] hover:bg-[#001F42] text-white font-bold rounded-xl transition shadow"
                  >
                    تأكيد الإضافة والنشر النهائي
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD ASSIGNMENT FORM */}
      <AnimatePresence>
        {showAssignmentForm && selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl max-w-md w-full text-right relative space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <button 
                  onClick={() => setShowAssignmentForm(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
                >
                  ❌
                </button>
                <h3 className="text-base font-bold text-[#002B5B] dark:text-slate-100">نشر تكليف دراسي جديد</h3>
              </div>

              <form onSubmit={handleAssignmentSubmit} className="space-y-4 text-xs">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">عنوان التكليف / الواجب <span className="text-[#800000]">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={assignmentForm.title}
                    onChange={(e) => setAssignmentForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="مثال: الواجب الثالث: كتابة موضوع تعبير بالفرنسية"
                    id="new-asg-title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Max Points */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">العلامة القصوى للتقييم</label>
                    <input 
                      type="number"
                      required
                      value={assignmentForm.maxPoints}
                      onChange={(e) => setAssignmentForm(p => ({ ...p, maxPoints: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    />
                  </div>
                  {/* Due Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">تاريخ التسليم الأقصى</label>
                    <input 
                      type="date"
                      required
                      value={assignmentForm.dueDate}
                      onChange={(e) => setAssignmentForm(p => ({ ...p, dueDate: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right font-mono"
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">إرشادات وأسئلة الواجب بالتفصيل <span className="text-[#800000]">*</span></label>
                  <textarea 
                    required
                    rows={4}
                    value={assignmentForm.instructions}
                    onChange={(e) => setAssignmentForm(p => ({ ...p, instructions: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="اكتب تفاصيل الأسئلة المحددة وصيغة التسليم المطلوبة لطلابك..."
                    id="new-asg-instructions"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#800000] hover:bg-[#600000] text-white font-bold rounded-xl transition shadow"
                  >
                    نشر وتعميم التكليف فوراً
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: GRADING SUBMISSION WINDOW */}
      <AnimatePresence>
        {gradingSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl max-w-md w-full text-right relative space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <button 
                  onClick={() => setGradingSubmission(null)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
                >
                  ❌
                </button>
                <h3 className="text-base font-bold text-[#002B5B] dark:text-slate-100">تقييم وتدقيق واجب الطالب</h3>
              </div>

              <div className="space-y-1.5 p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-400">الطالب المستلم: <span className="font-bold text-slate-800 dark:text-slate-200">{gradingSubmission.studentName}</span></p>
                <p className="text-xs font-semibold text-slate-400">التكليف: <span className="font-bold text-slate-800 dark:text-slate-200">{gradingSubmission.assignmentTitle}</span></p>
                <p className="text-xs font-semibold text-slate-400">ملف الإجابة المرفوع: <span className="font-mono text-[#800000]">{gradingSubmission.fileName}</span></p>
              </div>

              <form onSubmit={handleGradingSubmit} className="space-y-4 text-xs">
                {/* Points input */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">الدرجة الممنوحة للطالب</label>
                  <input 
                    type="number" 
                    required
                    step="0.5"
                    value={gradeForm.points}
                    onChange={(e) => setGradeForm(p => ({ ...p, points: Number(e.target.value) }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right font-bold text-sm"
                    placeholder="ادخل الدرجة"
                    id="grading-points-input"
                  />
                </div>

                {/* Written Feedback */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">ملاحظات والتغذية الراجعة للأستاذ <span className="text-[#800000]">*</span></label>
                  <textarea 
                    required
                    rows={4}
                    value={gradeForm.feedback}
                    onChange={(e) => setGradeForm(p => ({ ...p, feedback: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-right"
                    placeholder="اكتب التقييم والتعليق البناء ونقاط القوة والضعف للطالب لمساعدته على التطوير لغوياً..."
                    id="grading-feedback-input"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#800000] hover:bg-[#600000] text-white font-bold rounded-xl transition shadow"
                  >
                    حفظ التقييم وإرسال الدرجة للطالب
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
