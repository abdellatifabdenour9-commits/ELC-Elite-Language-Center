import { Course, Lesson, Assignment, Submission, User, Announcement, Payment, Channel, Message } from './types';

// Local images from the pictures/ folder
import avatar1 from '../pictures/Home/Speak Languages Fluently/download (6).jfif';
import avatar2 from '../pictures/Home/Speak Languages Fluently/download (7).jfif';
import avatar3 from '../pictures/Home/Tailored language pathways for all goals/photo-1516321318423-f06f85e504b3.jfif';
import logoImg from '../pictures/logo/logo.png';

import imgGeneralEnglish from '../pictures/Courses/General English Program.jfif';
import imgGeneralFrench from '../pictures/Courses/General French Program.jfif';
import imgGermanA1 from '../pictures/Courses/German Language — Level A1.jfif';
import imgSpanish from '../pictures/Courses/Foundational Spanish.jfif';
import imgKids from '../pictures/Courses/English for Kids (Conversation).jfif';
import imgKidsCamp from '../pictures/Courses/Kids Camp.jfif';
import imgSummerCamp from '../pictures/Courses/Summer Camp 2026 (Teens).jfif';
import imgSpeakingClub from '../pictures/Courses/Speaking Club — English Conversation.jfif';
import imgOnlineClasses from '../pictures/Courses/Online English Classes.jfif';
import imgElcSpeaking from '../pictures/Courses/ELC Speaking Class.jfif';
import imgLtBooster from '../pictures/Courses/LT Booster Suite.jfif';
import imgBacPrep from '../pictures/Courses/Baccalaureate Exam Preparation.jfif';
import imgAccounting from '../pictures/Courses/Accounting & Finance Essentials.jfif';
import imgSummerAcademic from '../pictures/Courses/Summer Academic Formations 2025.jfif';
import imgIdioms from '../pictures/Courses/English Idioms & Slang.jfif';
import imgGrammar from '../pictures/Courses/Grammar Word Types & Punctuation.jfif';
import imgQuotes from '../pictures/Courses/Inspirational English Quotes.jfif';

// Pre-loaded users
export const mockUsers: User[] = [
  {
    id: 'u-admin-1',
    name: 'أ. د. عبد الرحمن الماجد',
    email: 'admin@elc.edu',
    role: 'admin',
    avatar: avatar1,
    verified: true,
    registeredAt: '2025-01-10',
    bio: 'المدير الأكاديمي والمشرف العام على مدرسة ELC. خبرة أكثر من 20 عاماً في الإدارة التعليمية وتطوير المناهج.'
  },
  {
    id: 'u-teacher-1',
    name: 'د. سارة سميث (Sarah Smith)',
    email: 'sarah.smith@elc.edu',
    role: 'teacher',
    avatar: avatar2,
    verified: true,
    registeredAt: '2025-02-15',
    specialization: 'اللغة الإنجليزية والتحضير للامتحانات (IELTS / TOEFL)',
    bio: 'أستاذة معتمدة من جامعة كامبريدج خبرة 12 سنة في تدريس اللغة الإنجليزية كلغة ثانية.'
  },
  {
    id: 'u-teacher-2',
    name: 'أ. جان رينو (Jean Reno)',
    email: 'jean.reno@elc.edu',
    role: 'teacher',
    avatar: avatar3,
    verified: true,
    registeredAt: '2025-03-01',
    specialization: 'اللغة الفرنسية والمحادثة المتقدمة (DELF/DALF)',
    bio: 'متحدث أصلي للغة الفرنسية، متخصص في تدريس المستويات المتقدمة والتحضير للاختبارات الرسمية.'
  },
  {
    id: 'u-teacher-3',
    name: 'أ. يوسف الشافعي',
    email: 'youssef.shaf@elc.edu',
    role: 'teacher',
    avatar: logoImg,
    verified: true,
    registeredAt: '2025-01-20',
    specialization: 'اللغة العربية للناطقين بغيرها والخط العربي',
    bio: 'ماجستير في اللغة العربية وآدابها، خبرة طويلة في تعليم العربية لثقافات متعددة بأساليب حديثة.'
  },
  {
    id: 'u-student-1',
    name: 'أحمد العتيبي',
    email: 'ahmed@gmail.com',
    role: 'student',
    avatar: avatar1,
    verified: true,
    registeredAt: '2026-01-15'
  },
  {
    id: 'u-student-2',
    name: 'لينا كمال',
    email: 'lina@gmail.com',
    role: 'student',
    avatar: avatar2,
    verified: true,
    registeredAt: '2026-02-10'
  }
];

// Pre-loaded Courses
export const mockCourses: Course[] = [
  // 1. Languages
  {
    id: 'c-english-gen',
    title: 'اللغة الإنجليزية العامة',
    description: 'برنامج تدريبي شامل لتطوير المهارات الأربعة للغة الإنجليزية طبقاً للإطار المرجعي الأوروبي المشترك للغات CEFR.',
    category: 'languages',
    level: 'بالمستويات: A1 - A2 - B1 - B2 - C1',
    duration: '3 أشهر',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgGeneralEnglish,
    enrolledStudentsCount: 42,
    syllabus: [
      'تطوير مهارات الاستماع والفهم واستيعاب اللهجات المختلفة',
      'بناء الثقة والتحدث بطلاقة في المحادثات الاجتماعية واليومية',
      'تطوير القراءة التحليلية وصياغة المقالات ورسائل البريد الإلكتروني',
      'مراجعة شاملة للقواعد النحوية ومفردات التواصل التخصصي'
    ]
  },
  {
    id: 'c-french-gen',
    title: 'اللغة الفرنسية العامة',
    description: 'أتقن اللغة الفرنسية من خلال منهجنا التفاعلي المصمم لتطوير النطق، والمحادثة، وفهم النصوص اليومية والأكاديمية.',
    category: 'languages',
    level: 'بالمستويات: A1 - A2 - B1 - B2 - C',
    duration: '3 أشهر',
    teacherId: 'u-teacher-2',
    teacherName: 'أ. جان رينو',
    price: 10000,
    image: imgGeneralFrench,
    enrolledStudentsCount: 29,
    syllabus: [
      'النطق السليم للأصوات الفرنسية ومخارج الحروف الصحيحة',
      'صياغة التعبيرات الشائعة للتعامل مع الحياة اليومية والعملية',
      'القواعد الأساسية والأزمنة (المضارع، الماضي، المستقبل)',
      'استراتيجيات المحادثة لكسر حاجز الخوف والحديث بطلاقة'
    ]
  },
  {
    id: 'c-german-a1',
    title: 'اللغة الألمانية - المستوى الأول A1',
    description: 'خطوتك الأولى لتعلم الألمانية! اكتسب المهارات الأساسية للتواصل اليومي والتعارف، وفهم الجمل البسيطة.',
    category: 'languages',
    level: 'المستوى الأول A1 - Anfänger',
    duration: 'شهران',
    teacherId: 'u-teacher-3',
    teacherName: 'أ. يوسف الشافعي',
    price: 10000,
    image: imgGermanA1,
    enrolledStudentsCount: 18,
    syllabus: [
      'الحروف وقواعد النطق الألمانية الخاصة ومخارج الحروف',
      'التحيات، التعريف بالنفس وبالآخرين، السؤال عن الحال والمهن',
      'تركيب الجمل البسيطة واستخدام الأفعال الشائعة والضمائر',
      'الأرقام، الوقت، فصول السنة، والتعامل في المواقف اليومية'
    ]
  },
  {
    id: 'c-spanish-open',
    title: 'اللغة الإسبانية التأسيسية',
    description: 'ابدأ رحلتك في تعلم إحدى أكثر لغات العالم انتشاراً بطرق شيقة وتفاعلية من الصفر.',
    category: 'languages',
    level: 'مفتوحة',
    duration: 'شهران',
    teacherId: 'u-teacher-2',
    teacherName: 'أ. جان رينو',
    price: 10000,
    image: imgSpanish,
    enrolledStudentsCount: 15,
    syllabus: [
      'الأبجدية الإسبانية وقواعد النطق واللكنة الإسبانية الصحيحة',
      'تقديم النفس، العائلة، الألوان، والأرقام باللغة الإسبانية',
      'تركيب الجمل الأساسية واستخدام أفعال الكينونة والتملك',
      'مهارات التفاعل والمحادثة في المطعم، السفر والشارع'
    ]
  },
  {
    id: 'c-english-kids',
    title: 'الإنجليزية للأطفال (English for Kids)',
    description: 'English for Kids / قسم المحادثة للأطفال. دروس تفاعلية ممتعة للأطفال تركز على تعليم المحادثة، المفردات اليومية، وبناء الثقة اللغوية من خلال الألعاب والأغاني.',
    category: 'languages',
    level: 'قسم المحادثة للأطفال',
    duration: 'شهران',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgKids,
    enrolledStudentsCount: 34,
    syllabus: [
      'تعلم الحروف والأصوات الإنجليزية Phonics بطرق تفاعلية',
      'الكلمات والمفردات الأساسية: الحيوانات، الفواكه، الأشكال، الألعاب',
      'التعبير عن النفس والاحتياجات اليومية بجمل بسيطة',
      'أنشطة تفاعلية وقصص قصيرة لبناء الطلاقة اللغوية المبكرة'
    ]
  },

  // 2. Special Programs
  {
    id: 'c-smart-kids',
    title: 'Smart Kids Camp 2026',
    description: 'مخيم صيفي للأطفال. مخيم صيفي ترفيهي تعليمي مخصص للأطفال، يدمج بين الأنشطة التفاعلية، الابتكار، وتعلم الإنجليزية بذكاء.',
    category: 'special',
    level: 'مخيم صيفي للأطفال',
    duration: 'شهر واحد',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgKidsCamp,
    enrolledStudentsCount: 28,
    syllabus: [
      'أنشطة الذكاء والتفكير النقدي وحل المشكلات للأطفال',
      'المحادثة الإنجليزية اليومية والقصص التفاعلية المصورة',
      'الأشغال اليدوية، الرسم، والتعبير الإبداعي باللغات',
      'ألعاب جماعية ومسابقات لتنمية المهارات الاجتماعية والقيادية'
    ]
  },
  {
    id: 'c-summer-camp',
    title: 'Summer Camp 2026',
    description: 'برنامج صيفي مكثف يجمع بين التطوير الأكاديمي، الأنشطة اللامنهجية، والمحادثة المكثفة لبناء لغة قوية.',
    category: 'special',
    level: 'المخيم الصيفي للأعمار المتوسطة',
    duration: 'شهر واحد',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgSummerCamp,
    enrolledStudentsCount: 25,
    syllabus: [
      'مهارات الخطابة والإلقاء باللغة الإنجليزية للأعمار المتوسطة',
      'ورش عمل في الابتكار، المشاريع التفاعلية، والبحث الصغير',
      'الألعاب اللغوية الجماعية والدراما والتمثيل المسرحي التعليمي',
      'تطوير المفردات الحية للمواضيع المعاصرة والذكاء الاصطناعي'
    ]
  },
  {
    id: 'c-speaking-club',
    title: 'Speaking Club — نادي المحادثة الإنجليزية',
    description: 'البيئة المثالية لكسر حاجز الخوف وممارسة الإنجليزية مع زملاء ومعلمين في مواضيع حية ومثيرة للاهتمام.',
    category: 'special',
    level: 'نادي المحادثة الإنجليزية',
    duration: 'شهران',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgSpeakingClub,
    enrolledStudentsCount: 50,
    syllabus: [
      'نقاشات حية ومفتوحة حول مواضيع متنوعة وعالمية معاصرة',
      'العروض التقديمية الفردية والمناظرات الجماعية لتقوية الحجة',
      'تصحيح الأخطاء الشائعة في النطق والتركيب اللغوي بشكل ودي',
      'تعلم المفردات الدارجة Idioms وتعبيرات الشارع اليومية'
    ]
  },
  {
    id: 'c-online-classes',
    title: 'Online English Classes',
    description: 'دورات أونلاين (دوام أول / دوام ثاني). مرونة كاملة في التعلم من منزلك مع أساتذتنا المتميزين بجدولين صباحي ومسائي يناسب جميع الالتزامات.',
    category: 'special',
    level: 'دوام أول / دوام ثاني',
    duration: '3 أشهر',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgOnlineClasses,
    enrolledStudentsCount: 30,
    syllabus: [
      'تفاعل مباشر بالصوت والصورة مع الأساتذة ومجموعات تفاعلية',
      'استخدام منصة ELC الأكاديمية لمتابعة الدروس والتكاليف',
      'حصص محادثة مخصصة ومنظمة لتغطية مهارات التواصل الأساسية',
      'متابعة دورية واختبارات قياس مستوى دورية عبر الإنترنت'
    ]
  },
  {
    id: 'c-elc-speaking',
    title: 'ELC Speaking Class',
    description: 'قسم المحادثة الاجتماعية. تطوير مهارات التواصل الاجتماعي الفعال وبناء علاقات قوية باللغة الإنجليزية في مختلف السياقات المهنية والشخصية.',
    category: 'special',
    level: 'قسم المحادثة الاجتماعية',
    duration: 'شهران',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgElcSpeaking,
    enrolledStudentsCount: 22,
    syllabus: [
      'لغة الجسد وآداب الحديث والنقاش في المجتمعات الراقية',
      'إدارة الحوارات القصيرة والمطولة وبناء الثقة في التواصل',
      'تعابير اللطف، الشكر، الاعتذار، والمفاوضة الاجتماعية الحية',
      'التعامل مع الثقافات المختلفة وفهم التنوع الاجتماعي'
    ]
  },
  {
    id: 'c-lt-booster',
    title: 'LT Booster Suite',
    description: 'برنامج لمعلمي الإنجليزية. برنامج تخصصي لتأهيل وتطوير معلمي اللغة الإنجليزية وتزويدهم بأحدث استراتيجيات التدريس الحديثة والإدارة الصفية.',
    category: 'special',
    level: 'برنامج لمعلمي الإنجليزية',
    duration: 'شهران',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgLtBooster,
    enrolledStudentsCount: 12,
    syllabus: [
      'أحدث نظريات ومنهجيات تدريس اللغات كلغة ثانية ESL',
      'تصميم الحصص الدراسية التفاعلية وصناعة الوسائل التعليمية',
      'استخدام التكنولوجيا والذكاء الاصطناعي في الفصول الدراسية',
      'استراتيجيات التقييم والتعامل مع مستويات الطلاب المتباينة'
    ]
  },

  // 3. Academic Courses
  {
    id: 'c-bac-prep',
    title: 'البكالوريا — تأهيل لامتحانات الباكالوريا',
    description: 'برنامج مكثف مصمم خصيصاً لتلاميذ النهائي (Bac) لمراجعة شاملة وحل مواضيع ونماذج الامتحانات الرسمية بذكاء لضمان العلامة الكاملة.',
    category: 'academic',
    level: 'البكالوريا',
    duration: '3 أشهر',
    teacherId: 'u-teacher-3',
    teacherName: 'أ. يوسف الشافعي',
    price: 10000,
    image: imgBacPrep,
    enrolledStudentsCount: 65,
    syllabus: [
      'مراجعة شاملة لجميع وحدات المقرر الدراسي للغات الأجنبية',
      'منهجية الإجابة الصحيحة وتفكيك الأسئلة الشائعة في البكالوريا',
      'التدريب على حل مواضيع البكالوريا الرسمية للسنوات السابقة',
      'نصائح إرشادية لتجاوز القلق وإدارة الوقت بكفاءة في الامتحان'
    ]
  },
  {
    id: 'c-accounting',
    title: 'المحاسبة — تعليم المحاسبة والمال',
    description: 'اكتسب المهارات الأساسية والمتقدمة في المحاسبة المالية وإعداد الموازنات للشركات بطرق عملية مبسطة.',
    category: 'academic',
    level: 'المحاسبة والمال',
    duration: '3 أشهر',
    teacherId: 'u-teacher-3',
    teacherName: 'أ. يوسف الشافعي',
    price: 10000,
    image: imgAccounting,
    enrolledStudentsCount: 19,
    syllabus: [
      'مبادئ المحاسبة العامة والمصطلحات المالية الأساسية',
      'تسجيل العمليات المالية اليومية في دفاتر اليومية العامة والاستاذ',
      'إعداد القوائم المالية الأساسية: الميزانية، قائمة الدخل والتدفقات',
      'تطبيقات المحاسبة الإلكترونية على البرامج المحاسبية الشهيرة'
    ]
  },
  {
    id: 'c-summer-school-2025',
    title: 'التكوينات الصيفية 2025',
    description: 'للمستويات الابتدائي، المتوسط، الثانوي (إنجليزية وفرنسية). استثمر الصيف لتقوية مستواك الدراسي في اللغتين الإنجليزية والفرنسية والاستعداد للعام الجديد بثقة تامة.',
    category: 'academic',
    level: 'الابتدائي، المتوسط، الثانوي',
    duration: 'شهران',
    teacherId: 'u-teacher-2',
    teacherName: 'أ. جان رينو',
    price: 10000,
    image: imgSummerAcademic,
    enrolledStudentsCount: 40,
    syllabus: [
      'سد الثغرات التعليمية المكتشفة في العام الدراسي الماضي',
      'شرح وتبسيط القواعد النحوية ومفردات المقرر الدراسي القادم',
      'حصص مراجعة وتطبيق مكثفة لبناء مهارات التعبير والكتابة الصحيحة',
      'أنشطة تفاعلية لتعزيز الفهم السريع للمواد الأساسية'
    ]
  },

  // 4. Educational Content
  {
    id: 'c-english-idioms',
    title: 'English Idioms — تعابير إنجليزية',
    description: 'تعلم أشهر التعابير والمصطلحات الاصطلاحية المستخدمة من قبل المتحدثين الأصليين لتجعل حديثك يبدو طبيعياً وأكثر بلاغة.',
    category: 'educational',
    level: 'محتوى تعليمي وتعبيري',
    duration: 'مستمر',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgIdioms,
    enrolledStudentsCount: 120,
    syllabus: [
      'مفهوم التعبيرات الاصطلاحية وتأثيرها في التحدث اليومي',
      'أشهر تعابير المشاعر، النجاح، الوقت، والطقس في الإنجليزية',
      'كيفية دمج المصطلحات في الجمل وتجنب الترجمة الحرفية',
      'تدريبات تفاعلية ومحاكاة لمواقف تواصل حقيقية'
    ]
  },
  {
    id: 'c-grammar-rules',
    title: 'Grammar (قواعد) — Types of Word & Punctuation',
    description: 'مرجع شامل ومبسط لأقسام الكلام (Nouns, Verbs, Adjectives) وعلامات الترقيم الصحيحة لضمان سلامة كتابتك.',
    category: 'educational',
    level: 'قواعد ولغة',
    duration: 'مستمر',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgGrammar,
    enrolledStudentsCount: 95,
    syllabus: [
      'أقسام الكلام الثمانية وتحديد دور الكلمات في الجمل',
      'دراسة تفصيلية للأسماء والأفعال والصفات وكيفية اشتقاقها',
      'استخدام علامات الترقيم (الفاصلة، النقطة، الأقواس) بشكل سليم',
      'مراجعة الأخطاء الشائعة في صياغة الجمل والكتابة الأكاديمية'
    ]
  },
  {
    id: 'c-quotes-inspire',
    title: 'Quotes — اقتباسات تحفيزية بالإنجليزية',
    description: 'مجموعة من الاقتباسات والأقوال التحفيزية الملهمة باللغة الإنجليزية مع ترجمتها وشرح معانيها لتطوير لغتك ودعم شغفك.',
    category: 'educational',
    level: 'محتوى تحفيزي وثقافي',
    duration: 'مستمر',
    teacherId: 'u-teacher-1',
    teacherName: 'د. سارة سميث',
    price: 10000,
    image: imgQuotes,
    enrolledStudentsCount: 150,
    syllabus: [
      'تحليل الاقتباسات وتفكيك تراكيبها النحوية الراقية',
      'تعلم مفردات وكلمات جديدة تحمل معاني بلاغية وعميقة',
      'توظيف الاقتباسات المؤثرة في مقالاتك وعروضك التقديمية',
      'مناقشة العبر المستخلصة وتطوير مهارة التفكير الإيجابي'
    ]
  }
];

// Pre-loaded Lessons
export const mockLessons: Lesson[] = [
  // Lessons for English Course
  {
    id: 'l-ielts-1',
    courseId: 'c-english-gen',
    title: 'الدرس الأول: مدخل إلى الأبجدية الإنجليزية وقواعد النطق الأساسية',
    content: 'في هذا الدرس سنتعرف على الحروف الأبجدية باللغة الإنجليزية وقواعد نطقها السليمة ومخارج الأصوات الأساسية مع أمثلة عملية ومبسطة.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '45 دقيقة',
    resources: [
      { name: 'دليل النطق والأبجدية PDF', size: '1.4 MB', url: '#' },
      { name: 'تمارين كتابة وتدريب يومي', size: '350 KB', url: '#' }
    ]
  },
  {
    id: 'l-ielts-2',
    courseId: 'c-english-gen',
    title: 'الدرس الثاني: بناء الجمل البسيطة واستخدام الضمائر والأفعال المساعدة',
    content: 'سنتعلم كيفية تكوين جمل صحيحة من الفاعل والفعل والمفعول به، واستخدام ضمائر الفاعل والملكية، بالإضافة إلى أفعال الكينونة الأساسية to be.',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    duration: '50 دقيقة',
    resources: [
      { name: 'ورقة عمل صياغة الجمل البسيطة مع الحل', size: '1.0 MB', url: '#' }
    ]
  },
  {
    id: 'l-ielts-3',
    courseId: 'c-english-gen',
    title: 'الدرس الثالث: المفردات اليومية الأساسية والتواصل الأولي للتعارف',
    content: 'يركز هذا الدرس على أهم المفردات اليومية كالأرقام والألوان والعائلة والتعابير الشائعة لتقديم نفسك والآخرين بشكل مريح وبسيط.',
    duration: '60 دقيقة',
    resources: [
      { name: 'كتيب المحادثات اليومية التأسيسية', size: '2.1 MB', url: '#' }
    ]
  },

  // Lessons for French Course
  {
    id: 'l-french-1',
    courseId: 'c-french-gen',
    title: 'الدرس الأول: مخارج الأصوات والحروف والتهجئة الصحيحة بالفرنسية',
    content: 'سنركز اليوم على الأبجدية الفرنسية ومخارج الأصوات والحروف الصامتة والأنفية الصعبة لتتمكن من القراءة والنطق بشكل صحيح وتجنب الأخطاء الشائعة.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '40 دقيقة',
    resources: [
      { name: 'جدول الأصوات والرموز الفونيتيكية للفرنسية', size: '980 KB', url: '#' }
    ]
  },
  {
    id: 'l-french-2',
    courseId: 'c-french-gen',
    title: 'الدرس الثاني: التحيات والتقديم والتعريف بالنفس والغير',
    content: 'تطبيق عملي لمفردات وصيغ السؤال والترحيب والتعريف بالاسم والجنسية ومكان السكن لكسر حاجز البدايات واكتساب الثقة.',
    duration: '45 دقيقة',
    resources: [
      { name: 'سيناريوهات المحادثة والتعارف البسيطة بالفرنسية', size: '750 KB', url: '#' }
    ]
  }
];

// Pre-loaded Assignments
export const mockAssignments: Assignment[] = [
  {
    id: 'a-ielts-1',
    courseId: 'c-english-gen',
    title: 'الواجب الأول: تركيب جمل بسيطة باللغة الإنجليزية',
    instructions: 'اكتب خمس جمل بسيطة باللغة الإنجليزية تقدم فيها نفسك وتذكر عمرك واهتماماتك الأساسية مع مراعاة قواعد الصياغة الصحيحة التي درسناها.',
    dueDate: '2026-07-02',
    maxPoints: 10
  },
  {
    id: 'a-ielts-2',
    courseId: 'c-english-gen',
    title: 'الواجب الثاني: تسجيل مقطع صوتي لتقديم النفس باللغة الإنجليزية',
    instructions: 'قم بتسجيل صوتك وأنت تقرأ فقرتك التعريفية لتدريب مخارج الحروف والتأكد من النطق الصحيح للكلمات (مدة التسجيل دقيقة واحدة تقريباً).',
    dueDate: '2026-07-10',
    maxPoints: 20
  },
  {
    id: 'a-french-1',
    courseId: 'c-french-gen',
    title: 'الواجب الأول: تقديم النفس بالفرنسية',
    instructions: 'اكتب فقرة من 4 إلى 6 أسطر باللغة الفرنسية تقدم فيها اسمك وعمرك ومدينتك وسبب رغبتك في تعلم اللغة الفرنسية.',
    dueDate: '2026-07-05',
    maxPoints: 15
  }
];

// Pre-loaded Submissions
export const mockSubmissions: Submission[] = [
  {
    id: 's-sub-1',
    assignmentId: 'a-ielts-1',
    assignmentTitle: 'الواجب الأول: تركيب جمل بسيطة باللغة الإنجليزية',
    courseId: 'c-english-gen',
    studentId: 'u-student-1',
    studentName: 'أحمد العتيبي',
    submittedAt: '2026-06-20 18:32',
    fileUrl: '#',
    fileName: 'ahmed_sentences_intro.pdf',
    points: 8.5,
    feedback: 'عمل ممتاز جداً يا أحمد! صياغة الجمل سليمة وتركيب الضمائر ممتاز. انتبه فقط لحروف الجر مع المدن والأماكن، ركز فيها في الدروس القادمة.',
    status: 'graded'
  },
  {
    id: 's-sub-2',
    assignmentId: 'a-ielts-2',
    assignmentTitle: 'الواجب الثاني: تسجيل مقطع صوتي لتقديم النفس باللغة الإنجليزية',
    courseId: 'c-english-gen',
    studentId: 'u-student-1',
    studentName: 'أحمد العتيبي',
    submittedAt: '2026-06-22 14:15',
    fileUrl: '#',
    fileName: 'ahmed_speaking_intro.mp3',
    status: 'pending'
  },
  {
    id: 's-sub-3',
    assignmentId: 'a-french-1',
    assignmentTitle: 'الواجب الأول: تقديم النفس بالفرنسية',
    courseId: 'c-french-gen',
    studentId: 'u-student-2',
    studentName: 'لينا كمال',
    submittedAt: '2026-06-21 21:05',
    fileUrl: '#',
    fileName: 'lina_presentation.docx',
    points: 14,
    feedback: 'Très bien, Lina! Votre écriture est fluide et claire. Attention à l\'accord de quelques adjectifs féminins.',
    status: 'graded'
  }
];

// Pre-loaded Payments
export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    studentId: 'u-student-1',
    studentName: 'أحمد العتيبي',
    courseId: 'c-english-gen',
    courseTitle: 'اللغة الإنجليزية العامة',
    amount: 6500,
    date: '2026-06-12',
    status: 'completed'
  },
  {
    id: 'pay-2',
    studentId: 'u-student-2',
    studentName: 'لينا كمال',
    courseId: 'c-french-gen',
    courseTitle: 'اللغة الفرنسية العامة',
    amount: 6000,
    date: '2026-06-14',
    status: 'completed'
  },
  {
    id: 'pay-3',
    studentId: 'u-student-1',
    studentName: 'أحمد العتيبي',
    courseId: 'c-bac-prep',
    courseTitle: 'تأهيل امتحانات الباكالوريا',
    amount: 4500,
    date: '2026-06-22',
    status: 'pending'
  }
];

// Pre-loaded Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'بدء التسجيل لدورة اللغة الإنجليزية مستوى A1',
    content: 'يبدأ التسجيل لدورة اللغة الإنجليزية مستوى A1 بتاريخ 15 سبتمبر.',
    date: '2026-09-01',
    type: 'success'
  },
  {
    id: 'ann-2',
    title: 'اختبارات تحديد المستوى الأسبوعية',
    content: 'تتوفر اختبارات تحديد المستوى كل يوم سبت ابتداءً من الساعة 09:00 صباحاً.',
    date: '2026-06-23',
    type: 'info'
  }
];

// Pre-loaded Channels
export const mockChannels: Channel[] = [
  {
    id: 'ch-direct-sarah-ahmed',
    name: 'د. سارة سميث (محادثة خاصة)',
    type: 'direct',
    participants: ['u-teacher-1', 'u-student-1'],
    lastMessageText: 'أهلاً أحمد، تم تصحيح الواجب الأول الخاص بك، وبانتظار تسجيلك الصوتي للواجب الثاني.',
    lastMessageTime: 'أمس'
  },
  {
    id: 'ch-direct-jean-lina',
    name: 'أ. جان رينو (محادثة خاصة)',
    type: 'direct',
    participants: ['u-teacher-2', 'u-student-2'],
    lastMessageText: 'Bonjour Lina! Votre paragraphe est incroyable.',
    lastMessageTime: 'أمس'
  }
];

// Pre-loaded Messages
export const mockMessages: Message[] = [
  // General English messages
  {
    id: 'm-1',
    senderId: 'u-teacher-1',
    senderName: 'د. سارة سميث',
    senderRole: 'teacher',
    text: 'أهلاً ومرحباً بكم جميعاً في مجموعة اللغة الإنجليزية العامة لمركز Elite Language Center. هنا يمكنكم الاستفسار ومشاركة الملاحظات العامة.',
    timestamp: '2026-06-22 09:00'
  },
  {
    id: 'm-2',
    senderId: 'u-student-1',
    senderName: 'أحمد العتيبي',
    senderRole: 'student',
    text: 'مرحباً بك يا دكتورة، سعداء جداً بالتواجد والتعلم تحت إشرافك الأكاديمي المتميز.',
    timestamp: '2026-06-22 10:15'
  },
  {
    id: 'm-3',
    senderId: 'u-student-2',
    senderName: 'لينا كمال',
    senderRole: 'student',
    text: 'أهلاً بالجميع، أتمنى أن تكون رحلة تعليمية مفيدة وممتعة لنا جميعاً.',
    timestamp: '2026-06-22 10:30'
  },

  // IELTS course messages
  {
    id: 'm-ielts-1',
    senderId: 'u-teacher-1',
    senderName: 'د. سارة سميث',
    senderRole: 'teacher',
    text: 'مرحباً بطلاب دورة تحضير الايلتس الأبطال. تذكروا أن التدريب اليومي المستمر هو مفتاح الوصول للدرجة 7+.',
    timestamp: '2026-06-23 09:30'
  },
  {
    id: 'm-ielts-2',
    senderId: 'u-student-1',
    senderName: 'أحمد العتيبي',
    senderRole: 'student',
    text: 'دكتورة، هل من الممكن تزويدنا بمراجع إضافية مخصصة لقسم القراءة الأكاديمي؟ أحس أن وقت القراءة ضيق جداً في الاختبار التجريبي.',
    timestamp: '2026-06-23 10:20'
  },
  {
    id: 'm-ielts-3',
    senderId: 'u-teacher-1',
    senderName: 'د. سارة سميث',
    senderRole: 'teacher',
    text: 'طلبك في محله يا أحمد. لقد قمت للتو برفع نماذج إضافية لقسم القراءة ومحاكاة الوقت في لوحة الدروس التدريبية، يرجى مراجعتها وتطبيق تقنيات Skimming التي تدربنا عليها.',
    timestamp: '2026-06-23 11:45'
  }
];

// Global Initial Statistics
export const initialStats = {
  studentsCount: 850,
  teachersCount: 12,
  coursesCount: 25,
  successRate: 92
};
