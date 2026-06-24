import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Users, BookOpen, Trophy, CheckCircle, ArrowLeft, Star, Quote, ChevronDown } from 'lucide-react';
import { useApp } from '../store';

interface HomeProps {
  onNavigate: (view: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { stats, t, language } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const localizedFeatures = {
    ar: [
      { title: 'أساتذة مؤهلون', desc: 'فريق من الأساتذة المتخصصين في تعليم اللغات بمناهج حديثة وتفاعلية.', icon: GraduationCap, color: 'text-[#800000] bg-rose-50 dark:bg-rose-950/20' },
      { title: 'متابعة مستمرة', desc: 'متابعة دورية لمستوى كل طالب مع تقارير تقييم منتظمة.', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' },
      { title: 'مجموعات صغيرة', desc: 'عدد محدود من الطلاب داخل القسم لضمان جودة التعلم.', icon: Users, color: 'text-[#002B5B] bg-blue-50 dark:bg-blue-950/20' },
      { title: 'شهادات معتمدة', desc: 'شهادات إتمام البرامج التعليمية عند نهاية كل مستوى.', icon: Trophy, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20' }
    ],
    en: [
      { title: 'Qualified Teachers', desc: 'A dedicated team of expert instructors teaching languages through interactive, modern methods.', icon: GraduationCap, color: 'text-[#800000] bg-rose-50 dark:bg-rose-950/20' },
      { title: 'Continuous Follow-up', desc: 'Regular monitoring of student progress with personalized reports and feedback.', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' },
      { title: 'Small Groups', desc: 'Limited class sizes to guarantee individual attention and maximum engagement.', icon: Users, color: 'text-[#002B5B] bg-blue-50 dark:bg-blue-950/20' },
      { title: 'Certified Diplomas', desc: 'Acquire accredited achievement certificates at the completion of each program level.', icon: Trophy, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20' }
    ],
    fr: [
      { title: 'Enseignants Qualifiés', desc: 'Une équipe dévouée d\'enseignants experts transmettant les langues avec des méthodes interactives modernes.', icon: GraduationCap, color: 'text-[#800000] bg-rose-50 dark:bg-rose-950/20' },
      { title: 'Suivi Continu', desc: 'Suivi rigoureux et régulier des progrès de chaque élève avec des bilans périodiques.', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' },
      { title: 'Petits Groupes', desc: 'Effectifs limités par classe pour garantir un encadrement personnalisé optimal.', icon: Users, color: 'text-[#002B5B] bg-blue-50 dark:bg-blue-950/20' },
      { title: 'Certificats Reconnus', desc: 'Certificats de compétence linguistique délivrés à la réussite de chaque cycle.', icon: Trophy, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20' }
    ]
  };

  const localizedTracks = {
    ar: [
      'قسم الإنجليزية الشاملة وتحضير الـ IELTS و TOEFL الأكاديمي',
      'قسم الفرنسية المنهجية وتحضير DELF/DALF بمتحدثين أصليين',
      'قسم العربية للناطقين بغيرها والخط العربي وتجويد النطق',
      'ورش عمل متخصصة بالكامل للمحادثة الطليقة وكسر رهبة التحدث'
    ],
    en: [
      'Comprehensive English tracks & academic preparation for IELTS and TOEFL',
      'Systematic French curriculum & prep for DELF/DALF with native speakers',
      'Arabic for non-native speakers, elegant calligraphy & phonetics training',
      'Fully dedicated speaking workshops to gain fluency and break communication fear'
    ],
    fr: [
      'Parcours d\'anglais général et préparation académique à l\'IELTS & TOEFL',
      'Cursus structuré de français et préparation au DELF/DALF par des natifs',
      'L\'arabe pour non-arabophones, calligraphie & amélioration de l\'élocution',
      'Ateliers intensifs de communication orale pour libérer la parole et vaincre le trac'
    ]
  };

  const localizedFaqs = {
    ar: [
      { q: 'هل يمكن التسجيل دون معرفة مسبقة باللغة؟', a: 'نعم، لدينا مستويات مخصصة للمبتدئين بالكامل.' },
      { q: 'هل يوجد اختبار تحديد مستوى؟', a: 'نعم، يتم إجراء اختبار مجاني قبل التسجيل.' },
      { q: 'هل يمكن الدراسة حضورياً وعن بعد؟', a: 'نعم، نوفر الخيارين حسب البرنامج المتاح.' },
      { q: 'هل أحصل على شهادة؟', a: 'نعم، يحصل الطالب على شهادة إتمام بعد اجتياز البرنامج.' }
    ],
    en: [
      { q: 'Can I register without prior knowledge of the language?', a: 'Yes, we have specialized introductory levels designed from scratch for absolute beginners.' },
      { q: 'Is there a placement test?', a: 'Yes, a free interactive assessment test is administered prior to final course registration.' },
      { q: 'Can I study both in-person and remotely?', a: 'Yes, we provide flexible hybrid, in-class, and fully remote options depending on the course.' },
      { q: 'Will I receive a graduation certificate?', a: 'Yes, successful students receive an accredited certificate of achievement upon passing the final level exams.' }
    ],
    fr: [
      { q: 'Puis-je m\'inscrire sans aucune connaissance préalable ?', a: 'Oui, nous proposons des niveaux d\'initiation entièrement adaptés aux grands débutants.' },
      { q: 'Y a-t-il un test de niveau ?', a: 'Oui, un test d\'évaluation gratuit et obligatoire est effectué avant chaque inscription.' },
      { q: 'Les cours sont-ils dispensés en présentiel ou en ligne ?', a: 'Oui, nous offrons les deux formules (présentiel ou distanciel) selon le programme choisi.' },
      { q: 'Est-ce que je recevrai un certificat ?', a: 'Oui, un certificat de fin d\'études est délivré après réussite des épreuves d\'évaluation du niveau.' }
    ]
  };

  const currentFeatures = localizedFeatures[language] || localizedFeatures['ar'];
  const currentTracks = localizedTracks[language] || localizedTracks['ar'];
  const currentFaqs = localizedFaqs[language] || localizedFaqs['ar'];

  return (
    <div className="space-y-12 md:space-y-24 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-[#002B5B] via-[#001F42] to-[#001530] text-white pt-24 pb-12 md:py-20 px-4">
        {/* Background Decorative Circles */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#800000]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-start space-y-4 md:space-y-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-semibold bg-[#800000] text-rose-100 border border-[#800000]/30 tracking-wide uppercase">
              {t('home.badge')}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              {t('home.hero_title_1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-rose-300 via-rose-100 to-white text-xl sm:text-3xl lg:text-5xl">
                {t('home.hero_title_2')}
              </span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed">
              {t('home.hero_desc')}
            </p>
            <div className="flex flex-wrap gap-3 pt-2 md:pt-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 md:px-8 md:py-3.5 bg-[#800000] hover:bg-[#600000] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 text-xs md:text-sm"
                id="btn-hero-register"
              >
                <span>{t('home.btn_contact')}</span>
              </button>
              <button
                onClick={() => onNavigate('courses')}
                className="px-5 py-3 md:px-8 md:py-3.5 bg-transparent border border-slate-400 hover:border-white hover:bg-white/5 text-slate-200 hover:text-white font-medium rounded-lg transition duration-300 text-xs md:text-sm"
                id="btn-hero-courses"
              >
                {t('home.btn_courses')}
              </button>
            </div>
          </motion.div>

          {/* Hero Image / Badge Dashboard Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center w-full"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" 
                alt="Elite Language Center students" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
              
              {/* Overlay card */}
              <div className="absolute bottom-4 right-4 left-4 md:bottom-6 md:right-6 md:left-6 bg-[#002B5B]/90 backdrop-blur-md border border-slate-700/50 p-4 md:p-5 rounded-xl flex items-center justify-between">
                <div className="space-y-1 text-start">
                  <div className="text-amber-400 flex items-center gap-0.5">
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400" />
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400" />
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400" />
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400" />
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400" />
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-300 font-medium">
                    {language === 'ar' ? 'تقييم الطلاب وأولياء الأمور' : language === 'en' ? 'Ratings by students & parents' : 'Évaluations des étudiants & parents'}
                  </p>
                  <p className="font-semibold text-white text-xs md:text-sm">
                    {language === 'ar' ? 'المركز الأول أكاديمياً لعام 2026' : language === 'en' ? 'Ranked #1 Academically in 2026' : 'Classé #1 Académiquement en 2026'}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-[#800000] rounded-lg">
                  <Trophy className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-20 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-5 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="text-center space-y-1 p-2 md:border-r border-slate-100 dark:border-slate-800">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002B5B] dark:text-slate-100">+{stats.studentsCount}</p>
            <p className="text-[11px] md:text-sm font-medium text-slate-500 dark:text-slate-400">{t('home.stats_students')}</p>
          </div>
          <div className="text-center space-y-1 p-2 md:border-r border-slate-100 dark:border-slate-800">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#800000]">+{stats.teachersCount}</p>
            <p className="text-[11px] md:text-sm font-medium text-slate-500 dark:text-slate-400">{t('home.stats_teachers')}</p>
          </div>
          <div className="text-center space-y-1 p-2 md:border-r border-slate-100 dark:border-slate-800">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002B5B] dark:text-slate-100">+{stats.coursesCount}</p>
            <p className="text-[11px] md:text-sm font-medium text-slate-500 dark:text-slate-400">{t('home.stats_courses')}</p>
          </div>
          <div className="text-center space-y-1 p-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-600">%{stats.successRate}</p>
            <p className="text-[11px] md:text-sm font-medium text-slate-500 dark:text-slate-400">{t('home.stats_success')}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4 mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002B5B] dark:text-slate-100">{t('home.why_choose')}</h2>
          <div className="h-1 w-20 bg-[#800000] mx-auto rounded-full" />
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
            {t('home.why_desc')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {currentFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-50 dark:border-slate-800 text-start space-y-3 md:space-y-4 transition duration-300"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${feature.color}`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#002B5B] dark:text-slate-100">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs md:text-sm">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Languages Track */}
      <section className="bg-slate-50 dark:bg-slate-950/40 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 text-start">
            <h2 className="text-2xl md:text-3xl font-bold text-[#002B5B] dark:text-slate-100">
              {language === 'ar' 
                ? 'مسارات لغوية مخصصة لجميع الغايات' 
                : language === 'en'
                ? 'Tailored language pathways for all goals'
                : 'Parcours linguistiques sur mesure pour tous les objectifs'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'سواء كنت تسعى للقبول الجامعي الدولي، الترقية في وظيفتك، الهجرة والسفر، أو التأسيس الصحيح للأطفال؛ نوفر مناهج تخصصية تتناسب بدقة مع احتياجاتك الشخصية والمهنية.'
                : language === 'en'
                ? 'Whether you are aiming for international university admission, corporate promotion, travel and immigration, or children education; we offer certified specialty programs aligned with CEFR standards.'
                : 'Que vous visiez une admission universitaire internationale, une promotion, l\'expatriation, ou l\'éveil linguistique des enfants, nous offrons des programmes spécialisés de premier ordre.'}
            </p>
            <div className="space-y-3">
              {currentTracks.map((track, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#800000]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{track}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button
                onClick={() => onNavigate('courses')}
                className="px-6 py-3 bg-[#002B5B] hover:bg-[#001F42] text-white rounded-lg font-medium transition duration-300 flex items-center gap-2"
              >
                <span>
                  {language === 'ar' ? 'تصفح المسارات والدورات' : language === 'en' ? 'Browse Pathways & Courses' : 'Découvrir les Programmes'}
                </span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-48 rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=400" alt="Track English" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="h-64 rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400" alt="Track French" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="h-64 rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400" alt="Track Arabic" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="h-48 rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" alt="Online lessons" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002B5B] dark:text-slate-100">
            {language === 'ar' ? 'آراء وتجارب طلابنا' : language === 'en' ? 'Student Reviews' : 'Témoignages de nos Étudiants'}
          </h2>
          <div className="h-1 w-20 bg-[#800000] mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-300">
            {language === 'ar'
              ? 'يسعدنا مشاركة تقييمات طلابنا الحقيقية والموثقة على خرائط Google لمركز Elite Language Center.'
              : language === 'en'
              ? 'We are delighted to share the verified, authentic student feedback from Google Maps for Elite Language Center.'
              : 'Nous sommes ravis de partager les véritables avis de nos étudiants publiés sur Google Maps pour Elite Language Center.'}
          </p>
        </div>

        {/* Google Maps Business Rating Widget */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 mb-12 max-w-xl mx-auto text-center space-y-4 shadow-sm">
          <div className="flex justify-center items-center gap-2">
            <span className="px-2.5 py-1 bg-[#800000] text-white text-[10px] font-bold rounded-lg">Google Maps</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
              {language === 'ar' ? 'المركز التعليمي المعتمد في غرداية' : language === 'en' ? 'Accredited Center in Ghardaia' : 'Centre Agrée à Ghardaïa'}
            </span>
          </div>
          <h3 className="text-xl font-black text-[#002B5B] dark:text-slate-100">Elite Language Center</h3>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">5.0</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-500" />)}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ar' ? 'التقييم العام الموثق (3 مراجعات)' : language === 'en' ? 'Global Rating (3 reviews)' : 'Note Globale (3 avis)'}
            </p>
          </div>
          <div className="pt-3 flex justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
            <div>
              <span className="font-bold text-[#800000]">{language === 'ar' ? 'الموقع:' : language === 'en' ? 'Location:' : 'Lieu:'}</span> غرداية، الجزائر
            </div>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800" />
            <div>
              <span className="font-bold text-[#800000]">{language === 'ar' ? 'الهاتف:' : language === 'en' ? 'Phone:' : 'Tel:'}</span> 0549 66 02 76
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Ahmed Hadjsaid',
              role: language === 'ar' ? 'قبل 4 أشهر • تقييم Google' : language === 'en' ? '4 months ago • Google Review' : 'Il y a 4 mois • Avis Google',
              text: language === 'ar' ? 'ماشاءالله دقة ومصداقية في التعليم والمتابعة.' : language === 'en' ? 'Excellent precision, credibility, and high-quality educational follow-up.' : 'MachaAllah, précision et rigueur dans l\'enseignement et le suivi.',
              avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100'
            },
            {
              name: 'Âmēl Bø',
              role: language === 'ar' ? 'قبل سنة • تقييم Google' : language === 'en' ? '1 year ago • Google Review' : 'Il y a 1 an • Avis Google',
              text: language === 'ar' ? 'مركز متميز جداً، طاقم تدريس محترف وتأطير راقٍ جداً لجميع المستويات واللغات.' : language === 'en' ? 'Outstanding center. Highly professional teaching staff and superb mentorship for all proficiency levels.' : 'Centre très distingué, personnel enseignant professionnel et excellent encadrement pour tous les niveaux.',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
            },
            {
              name: 'Rachid Chikh salah',
              role: language === 'ar' ? 'قبل سنتين • تقييم Google' : language === 'en' ? '2 years ago • Google Review' : 'Il y a 2 ans • Avis Google',
              text: language === 'ar' ? 'من أفضل مدارس تعليم اللغات، جودة واحترافية عالية في التدريس والمعاملة الطيبة.' : language === 'en' ? 'Undoubtedly one of the finest language schools, providing exceptional pedagogical quality and top hospitality.' : 'L\'une des meilleures écoles de langues, haute qualité d\'enseignement et accueil formidable.',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-md relative text-start flex flex-col justify-between">
              <div className="absolute top-4 left-4 md:top-6 md:left-6 text-slate-200 dark:text-slate-800">
                <Quote className="w-8 h-8 md:w-10 md:h-10 fill-current" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm italic">
                  "{item.text}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold text-[#002B5B] dark:text-slate-100 text-sm">{item.name}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-none mt-1">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-8 md:py-12 border-t border-slate-100 dark:border-slate-800">
        <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002B5B] dark:text-slate-100">{t('home.faq_title')}</h2>
          <div className="h-1 w-20 bg-[#800000] mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-300">
            {t('home.faq_subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {currentFaqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-start flex justify-between items-center gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                >
                  <span className="font-bold text-[#002B5B] dark:text-slate-100 text-sm md:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#800000] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <div className="p-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50/20 dark:bg-slate-950/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
