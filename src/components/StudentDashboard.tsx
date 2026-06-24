import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Video, Award, Clock, FileText, Send, 
  CheckCircle, AlertCircle, Sparkles, Printer, ChevronLeft, Download, Paperclip 
} from 'lucide-react';
import { useApp } from '../store';
import { Course, Lesson, Assignment, Submission } from '../types';

interface StudentDashboardProps {
  onNavigate: (view: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { 
    currentUser, payments, courses, lessons, assignments, 
    submissions, submitAssignment, announcements 
  } = useApp();

  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [showCertificate, setShowCertificate] = useState<Course | null>(null);

  if (!currentUser) {
    return (
      <div className="py-20 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-[#800000] mx-auto" />
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">الرجاء تسجيل الدخول أولاً</h2>
        <p className="text-slate-500">يجب تسجيل الدخول كطالب لاستعراض هذه الصفحة.</p>
      </div>
    );
  }

  // Get enrolled courses IDs from payments
  const enrolledCourseIds = payments
    .filter(p => p.studentId === currentUser.id && p.status === 'completed')
    .map(p => p.courseId);

  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  // Handle fake file select for assignments uploader
  const handleFakeFileSelect = () => {
    const fileNames = ['اجابة_الواجب_الاكاديمي_ايلتس.pdf', 'حل_تمارين_القراءة_المكثفة.docx', 'فرنسية_تعبير_شفهي_صوتي.mp3', 'العربية_كتابة_مقال_يومي.pdf'];
    const randomName = fileNames[Math.floor(Math.random() * fileNames.length)];
    setFileDetails({
      name: randomName,
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`
    });
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment || !fileDetails) return;

    submitAssignment({
      assignmentId: selectedAssignment.id,
      assignmentTitle: selectedAssignment.title,
      courseId: selectedAssignment.courseId,
      fileName: fileDetails.name,
      fileUrl: '#'
    });

    alert('تم رفع وإرسال حل الواجب بنجاح! سيقوم أستاذ المادة بتدقيقه ووضع نتيجتك قريباً.');
    setSelectedAssignment(null);
    setFileDetails(null);
  };

  // Check if student qualifies for a certificate (has at least one graded assignment in that course)
  const canDownloadCertificate = (courseId: string) => {
    return submissions.some(s => s.courseId === courseId && s.studentId === currentUser.id && s.status === 'graded');
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="py-6 md:py-12 max-w-7xl mx-auto px-4 text-right space-y-8 md:space-y-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-l from-[#002B5B] to-[#001F42] text-white p-5 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row-reverse justify-between items-center gap-6">
        <div className="flex items-center justify-end gap-3 sm:gap-4 flex-row-reverse md:flex-row">
          <div className="text-right space-y-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-rose-300 bg-white/10 px-2 py-0.5 rounded-full">بوابة الطالب الأكاديمية</span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">أهلاً بك، {currentUser.name} 👋</h1>
            <p className="text-xs text-slate-300">مرحباً بك مجدداً في ELC! نتمنى لك يوماً دراسياً موفقاً وحافلاً بالإنجاز.</p>
          </div>
          <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#800000] object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="flex gap-3 sm:gap-4">
          <button 
            onClick={() => onNavigate('courses')}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold rounded-xl transition shadow"
            id="student-enroll-more"
          >
            سجل في دورة إضافية
          </button>
          <button 
            onClick={() => onNavigate('chat')}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition"
            id="student-goto-chat"
          >
            الدردشة مع المعلمين
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Enrolled Courses sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-md space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[#002B5B] dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-end gap-2">
              <span>دوراتي المسجل بها ({enrolledCourses.length})</span>
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#800000]" />
            </h3>

            {enrolledCourses.length === 0 ? (
              <div className="py-6 text-center text-slate-400 text-sm">
                لم تسجل في أي دورة بعد. تصفح كتالوج الدورات وابدأ فوراً!
              </div>
            ) : (
              <div className="space-y-3">
                {enrolledCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => {
                      setActiveCourse(course);
                      setActiveLesson(null);
                      setSelectedAssignment(null);
                    }}
                    className={`w-full p-4 rounded-xl text-right border transition flex flex-row-reverse justify-between items-center gap-3 ${
                      activeCourse?.id === course.id
                        ? 'border-[#800000] bg-rose-50/50 dark:bg-rose-950/20'
                        : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                    id={`student-course-${course.id}`}
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{course.title}</p>
                      <p className="text-[10px] text-slate-400">الأستاذ: {course.teacherName}</p>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Certificates Center widget */}
          {enrolledCourses.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-6 rounded-2xl shadow-md space-y-4">
              <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-end gap-2">
                <span>مركز الشهادات المعتمدة</span>
                <Award className="w-5 h-5 text-[#800000]" />
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">تُمنح الشهادة بمجرد اجتيازك للاختبارات وتقديم واجب دراسي مصحح بنجاح.</p>
              
              <div className="space-y-3">
                {enrolledCourses.map((course) => {
                  const qualified = canDownloadCertificate(course.id);
                  return (
                    <div key={course.id} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl flex items-center justify-between">
                      {qualified ? (
                        <button
                          onClick={() => setShowCertificate(course)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold rounded-lg transition flex items-center gap-1"
                          id={`cert-download-${course.id}`}
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>عرض وطباعة</span>
                        </button>
                      ) : (
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">قيد الدراسة</span>
                      )}
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 max-w-[150px] truncate">{course.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Main Interactive Area */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {activeCourse ? (
              <motion.div
                key={activeCourse.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Back button */}
                <button
                  onClick={() => setActiveCourse(null)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1 hover:bg-slate-200 mr-auto"
                >
                  <ChevronLeft className="w-4 h-4 transform rotate-180" />
                  <span>رجوع للرئيسية</span>
                </button>

                {/* Course Header */}
                <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#800000]">{activeCourse.level}</span>
                  <h2 className="text-xl font-bold text-[#002B5B] dark:text-slate-100">{activeCourse.title}</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">{activeCourse.description}</p>
                </div>

                {/* Lessons list / lecture Player */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Left: Lessons list */}
                  <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-3">
                    <p className="font-bold text-sm text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5">الدروس والمحتويات</p>
                    <div className="space-y-2">
                      {lessons.filter(l => l.courseId === activeCourse.id).map((lesson, idx) => (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full p-2.5 rounded-lg text-right text-xs transition border ${
                            activeLesson?.id === lesson.id
                              ? 'border-[#800000] bg-rose-50/20 text-[#800000]'
                              : 'border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                          id={`lesson-item-${lesson.id}`}
                        >
                          <div className="font-semibold text-slate-700 dark:text-slate-200">الدرس {idx + 1}: {lesson.title.split(': ')[1] || lesson.title}</div>
                          <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1 mt-1">
                            <span>{lesson.duration}</span>
                            <Clock className="w-3 h-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Lecture Player */}
                  <div className="md:col-span-2 space-y-4">
                    {activeLesson ? (
                      <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
                        <h4 className="font-bold text-[#002B5B] dark:text-slate-100 flex items-center justify-end gap-2 text-base">
                          <span>{activeLesson.title}</span>
                          <Video className="w-5 h-5 text-[#800000]" />
                        </h4>
                        
                        {/* Video Mock Player */}
                        {activeLesson.videoUrl ? (
                          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                            <video 
                              src={activeLesson.videoUrl} 
                              controls 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center text-center p-6 border border-slate-200 dark:border-slate-800">
                            <Video className="w-12 h-12 text-slate-300 mb-2" />
                            <p className="text-xs text-slate-500 font-semibold">بث مسجل قريباً لهذا الدرس</p>
                            <p className="text-[10px] text-slate-400">تابع مع الأستاذ في البث المباشر القادم</p>
                          </div>
                        )}

                        {/* Lesson text content */}
                        <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                          <p className="text-xs font-bold text-slate-400">شرح وتفاصيل الأستاذ:</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">{activeLesson.content}</p>
                        </div>

                        {/* Resources download links */}
                        {activeLesson.resources && activeLesson.resources.length > 0 && (
                          <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                            <p className="text-xs font-bold text-slate-400">الملفات والمرفقات الدراسية:</p>
                            <div className="grid gap-2">
                              {activeLesson.resources.map((res, i) => (
                                <a
                                  key={i}
                                  href={res.url}
                                  className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg flex items-center justify-between text-xs hover:bg-[#800000]/5 transition"
                                >
                                  <span className="text-[10px] text-slate-400">{res.size}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{res.name}</span>
                                    <Download className="w-4 h-4 text-[#800000]" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-8 rounded-2xl shadow-sm text-center py-16 text-slate-400 space-y-2">
                        <Video className="w-12 h-12 text-slate-300 mx-auto" />
                        <p className="font-bold text-sm">حدد درساً من القائمة لبدء التلقي والدراسة</p>
                        <p className="text-[11px]">شاهد الفيديوهات الأكاديمية وحمل مستندات وملخصات الدروس مباشرة.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Assignments & Grading Table */}
                <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-6 rounded-2xl shadow-md space-y-4">
                  <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-end gap-2">
                    <span>الواجبات والتكليفات المنزلية</span>
                    <FileText className="w-5 h-5 text-[#800000]" />
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* List of assignments */}
                    <div className="space-y-3">
                      <p className="font-bold text-xs text-slate-400">الواجبات المطلوبة في هذه الدورة:</p>
                      {assignments.filter(a => a.courseId === activeCourse.id).length === 0 ? (
                        <p className="text-xs text-slate-400">لا توجد واجبات معلنة حالياً لهذه الدورة.</p>
                      ) : (
                        assignments.filter(a => a.courseId === activeCourse.id).map((asg) => {
                          const userSub = submissions.find(s => s.assignmentId === asg.id && s.studentId === currentUser.id);
                          return (
                            <div key={asg.id} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-3">
                              <div className="space-y-1">
                                <p className="font-bold text-xs text-slate-800 dark:text-slate-200">{asg.title}</p>
                                <p className="text-[11px] text-slate-500 leading-relaxed">{asg.instructions}</p>
                              </div>
                              <div className="flex items-center justify-between text-[11px] border-t border-slate-200 dark:border-slate-800 pt-2 font-semibold">
                                <div className="text-right">
                                  {userSub ? (
                                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                                      userSub.status === 'graded' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                    }`}>
                                      {userSub.status === 'graded' ? `تم التصحيح: ${userSub.points}/${asg.maxPoints}` : 'بانتظار التصحيح'}
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setSelectedAssignment(asg);
                                        setFileDetails(null);
                                      }}
                                      className="px-3 py-1 bg-[#800000] text-white rounded text-[10px]"
                                      id={`asg-submit-btn-${asg.id}`}
                                    >
                                      تقديم الحل
                                    </button>
                                  )}
                                </div>
                                <span className="text-slate-400">تاريخ التسليم الأقصى: {asg.dueDate}</span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Solutions Feedback Log */}
                    <div className="space-y-3 border-r border-slate-100 dark:border-slate-800 pr-6">
                      <p className="font-bold text-xs text-slate-400">ملاحظات وتقييمات المعلم:</p>
                      {submissions.filter(s => s.courseId === activeCourse.id && s.studentId === currentUser.id).length === 0 ? (
                        <p className="text-xs text-slate-400">لم تقم بتسليم أي واجبات بعد لتلقي التقييم.</p>
                      ) : (
                        submissions.filter(s => s.courseId === activeCourse.id && s.studentId === currentUser.id).map((sub) => (
                          <div key={sub.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                            <div className="flex items-center justify-between">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                sub.status === 'graded' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {sub.status === 'graded' ? 'مكتمل' : 'قيد التدقيق'}
                              </span>
                              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[180px]">{sub.assignmentTitle}</p>
                            </div>
                            {sub.points !== undefined && (
                              <p className="text-xs font-extrabold text-[#800000]">الدرجة الممنوحة: {sub.points} نقطة</p>
                            )}
                            {sub.feedback && (
                              <p className="text-[11px] text-slate-500 italic leading-relaxed bg-slate-50 dark:bg-slate-950 p-2.5 rounded">
                                " {sub.feedback} "
                              </p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Course Unselected: Main stats overview & school Announcements */
              <div className="space-y-8">
                {/* School Announcements */}
                <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-6 rounded-2xl shadow-md space-y-4">
                  <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-end gap-2">
                    <span>إعلانات وتنويهات الإدارة الأكاديمية</span>
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </h3>
                  
                  <div className="space-y-4">
                    {announcements.map((ann) => (
                      <div 
                        key={ann.id} 
                        className={`p-4 rounded-xl border flex flex-col md:flex-row-reverse justify-between gap-4 ${
                          ann.type === 'success' 
                            ? 'border-emerald-100 bg-emerald-50/20 text-emerald-800' 
                            : ann.type === 'warning'
                              ? 'border-amber-100 bg-amber-50/20 text-amber-800'
                              : 'border-blue-100 bg-blue-50/20 text-blue-800'
                        }`}
                      >
                        <div className="space-y-1 flex-1">
                          <p className="font-bold text-sm">{ann.title}</p>
                          <p className="text-xs leading-relaxed opacity-90">{ann.content}</p>
                        </div>
                        <div className="text-[10px] font-semibold flex items-center justify-end text-slate-400 shrink-0">
                          {ann.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Empty courses callout */}
                {enrolledCourses.length === 0 && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-8 rounded-2xl shadow-md text-center space-y-4">
                    <BookOpen className="w-16 h-16 text-slate-200 mx-auto" />
                    <h3 className="text-xl font-bold text-[#002B5B] dark:text-slate-100">سجل في دورتك الأولى اليوم!</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      ابدأ دراستك للإنجليزية، الفرنسية، أو العربية. تفاعل مع المعلمين واستلم شهادات النخبة المعتمدة فور التخرج والنجاح.
                    </p>
                    <button
                      onClick={() => onNavigate('courses')}
                      className="px-6 py-2.5 bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold rounded-lg shadow-md"
                    >
                      استكشف جميع الدورات المتاحة
                    </button>
                  </div>
                )}

                {/* Instruction help card */}
                {enrolledCourses.length > 0 && (
                  <div className="bg-[#002B5B] text-white p-6 rounded-2xl shadow-md flex items-center justify-between gap-4">
                    <div className="space-y-1 text-right">
                      <h4 className="font-bold text-sm">بدء دراسة المحاضرات 🖥️</h4>
                      <p className="text-xs text-slate-300">انقر على أي دورة من القائمة الجانبية اليمنى لبدء تشغيل الدروس، تنزيل ملخصات الأساتذة، وتقديم الواجبات المدرسية.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Assignment Submission popup modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl max-w-md w-full text-right relative space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <button 
                  onClick={() => {
                    setSelectedAssignment(null);
                    setFileDetails(null);
                  }}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
                >
                  ❌
                </button>
                <h3 className="text-base font-bold text-[#002B5B] dark:text-slate-100">تسليم وإرسال الواجب</h3>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400">عنوان الواجب:</p>
                <p className="text-xs font-bold text-[#800000]">{selectedAssignment.title}</p>
                <p className="text-[10px] text-slate-500 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg leading-relaxed">{selectedAssignment.instructions}</p>
              </div>

              <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                {/* Simulated drag-drop uploader */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500">مستند الإجابة (مرفق الواجب):</p>
                  
                  {fileDetails ? (
                    <div className="p-4 border border-emerald-100 bg-emerald-50/20 rounded-xl flex items-center justify-between text-xs">
                      <button 
                        type="button" 
                        onClick={() => setFileDetails(null)}
                        className="text-rose-600 hover:text-rose-800 font-bold"
                      >
                        إلغاء
                      </button>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="font-bold text-slate-700 dark:text-slate-200">{fileDetails.name}</p>
                          <p className="text-[10px] text-slate-400">{fileDetails.size}</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleFakeFileSelect}
                      className="w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition flex flex-col items-center justify-center text-slate-400 p-4 space-y-1"
                      id="fake-file-select-btn"
                    >
                      <Paperclip className="w-8 h-8 text-[#800000] animate-pulse" />
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300">انقر هنا لتحديد ملف الإجابة</p>
                      <p className="text-[10px] text-slate-400">يدعم صيغ PDF, DOCX, MP3, ZIP بحد أقصى 10 ميغابايت</p>
                    </button>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!fileDetails}
                    className={`w-full py-2.5 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition ${
                      fileDetails 
                        ? 'bg-[#800000] hover:bg-[#600000] text-white shadow-md' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>تأكيد الإرسال والتسليم النهائي</span>
                    <Send className="w-3.5 h-3.5 transform rotate-180" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Graduation Certificate Download Modal */}
      <AnimatePresence>
        {showCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="relative max-w-4xl w-full p-4">
              {/* Close button */}
              <button 
                onClick={() => setShowCertificate(null)}
                className="absolute top-8 left-8 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
              >
                ❌
              </button>

              {/* Certificate Template Canvas Layout */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white text-[#002B5B] p-8 md:p-16 rounded-2xl border-8 border-double border-amber-600 text-center relative shadow-2xl space-y-8 select-none"
                style={{ fontFamily: 'Georgia, serif' }}
                id="printable-certificate"
              >
                {/* Luxury borders */}
                <div className="absolute top-4 bottom-4 left-4 right-4 border-2 border-amber-500/50 pointer-events-none" />
                <div className="absolute top-6 bottom-6 left-6 right-6 border border-amber-400/20 pointer-events-none" />

                {/* Corner ornaments */}
                <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-amber-500" />
                <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-amber-500" />
                <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-amber-500" />
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-amber-500" />

                {/* Certificate Header */}
                <div className="space-y-2">
                  <p className="text-[#800000] font-extrabold tracking-widest text-lg">ELITE LANGUAGE CENTER</p>
                  <p className="text-[10px] tracking-wide text-slate-400">مدرسة النخبة المعتمدة لتدريس اللغات</p>
                  <div className="w-16 h-1 bg-amber-500 mx-auto my-3" />
                  <h2 className="text-3xl md:text-5xl font-serif text-[#002B5B] font-extrabold tracking-tight">شهادة إتمام وتخرج</h2>
                </div>

                {/* Certificate Content */}
                <div className="space-y-6 my-8 max-w-2xl mx-auto">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">تشهد إدارة مركز النخبة الأكاديمي بأن الطالب / الطالبة:</p>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-[#800000] underline decoration-amber-500 decoration-wavy underline-offset-8">
                    {currentUser.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
                    قد اجتاز بنجاح وتفوق متطلبات البرنامج الدراسي الكامل واختبارات التقييم المنهجية المقننة لـ:
                  </p>
                  <h4 className="text-xl md:text-2xl font-bold text-[#002B5B]">
                    « {showCertificate.title} »
                  </h4>
                  <p className="text-xs text-slate-500">
                    بمستوى يعادل <span className="font-bold text-slate-800">{showCertificate.level}</span> وفق الإطار الأوروبي للغات CEFR، <br />
                    وذلك بمدة دراسية بلغت <span className="font-bold text-slate-800">{showCertificate.duration}</span>.
                  </p>
                </div>

                {/* Certificate Signatures / Seal */}
                <div className="grid grid-cols-3 gap-6 pt-8 items-center max-w-3xl mx-auto">
                  {/* Left: Academic Director signature */}
                  <div className="space-y-1 text-center">
                    <p className="text-[10px] text-slate-400">المدير الأكاديمي للمركز</p>
                    <p className="font-bold text-xs font-serif text-slate-700">أ. د. عبد الرحمن الماجد</p>
                    <div className="h-0.5 w-20 bg-slate-300 mx-auto" />
                    <p className="text-[9px] text-slate-300 italic font-serif">Al-Majed, Ph.D.</p>
                  </div>

                  {/* Center: Gold official Seal */}
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg border-4 border-double border-white relative">
                      <div className="absolute inset-2 border border-white/40 rounded-full" />
                      <Award className="w-10 h-10 text-[#002B5B] animate-pulse" />
                    </div>
                  </div>

                  {/* Right: Instructor signature */}
                  <div className="space-y-1 text-center">
                    <p className="text-[10px] text-slate-400">أستاذ المادة والدورة</p>
                    <p className="font-bold text-xs text-slate-700">{showCertificate.teacherName}</p>
                    <div className="h-0.5 w-20 bg-slate-300 mx-auto" />
                    <p className="text-[9px] text-slate-300 italic">Official Signature</p>
                  </div>
                </div>

                {/* Certificate Footer Meta */}
                <div className="flex justify-between text-[9px] text-slate-400 pt-6 border-t border-slate-100">
                  <p>رقم الشهادة المعتمدة: ELC-2026-{showCertificate.id.split('-')[2] || '9827'}</p>
                  <p>تاريخ الاعتماد: {new Date().toISOString().split('T')[0]}</p>
                </div>

                {/* Action panel to Print (hidden in media print style) */}
                <div className="pt-8 flex justify-center gap-4 print:hidden">
                  <button
                    onClick={handlePrintCertificate}
                    className="px-6 py-2.5 bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة المستند الرسمي</span>
                  </button>
                  <button
                    onClick={() => {
                      alert('تم البدء في تحميل ملف الشهادة بصيغة PDF عالية الدقة على جهازك.');
                    }}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>تنزيل كـ PDF</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
