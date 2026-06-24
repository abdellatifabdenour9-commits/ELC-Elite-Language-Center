import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Award, Clock, DollarSign, ArrowLeft, ArrowRight, Search, CheckCircle, Info } from 'lucide-react';
import { useApp } from '../store';
import { Course } from '../types';

interface CoursesProps {
  onNavigate: (view: string) => void;
}

// Local translation mapping for course data
const courseTranslations: Record<string, Record<string, { title: string; description: string; level: string; syllabus: string[] }>> = {
  en: {
    'c-english-gen': {
      title: 'General English Program',
      description: 'A comprehensive training program to develop all four English language skills (Listening, Speaking, Reading, Writing) based on the CEFR framework.',
      level: 'Levels: A1 - A2 - B1 - B2 - C1',
      syllabus: [
        'Develop listening comprehension and understand global accents',
        'Build confidence and fluency in social and daily conversations',
        'Improve analytical reading, academic writing, and formal emailing',
        'Comprehensive review of grammar rules and specialized vocabulary'
      ]
    },
    'c-french-gen': {
      title: 'General French Program',
      description: 'Master French with our interactive curriculum designed to improve pronunciation, real-world conversations, and daily text comprehension.',
      level: 'Levels: A1 - A2 - B1 - B2 - C1',
      syllabus: [
        'Accurate pronunciation of French sounds and phonetics',
        'Form common expressions for daily life and work environments',
        'Core grammar rules and tenses (Present, Past, Future)',
        'Conversational strategies to break the fear and speak fluently'
      ]
    },
    'c-german-a1': {
      title: 'German Language — Level A1',
      description: 'Your first step to learning German! Gain essential skills for daily conversation, self-introduction, and simple sentence structures.',
      level: 'Level: A1 - Anfänger',
      syllabus: [
        'German alphabets, specific pronunciation rules, and phonetics',
        'Greetings, introducing oneself and others, asking about profession',
        'Constructing simple sentences using common verbs and pronouns',
        'Numbers, telling the time, seasons, and everyday scenarios'
      ]
    },
    'c-spanish-open': {
      title: 'Foundational Spanish',
      description: 'Begin your journey learning one of the world\'s most popular languages in an engaging, interactive, and gamified way from scratch.',
      level: 'Level: Beginner - Open',
      syllabus: [
        'Spanish alphabet, correct pronunciation, and accents',
        'Introducing oneself, family, colors, and numbers',
        'Constructing basic sentences with auxiliary verbs',
        'Interaction and speaking skills for restaurant, travel, and street'
      ]
    },
    'c-english-kids': {
      title: 'English for Kids (Conversation)',
      description: 'Specialized conversational section for children. Fun interactive lessons focusing on speaking skills, vocabulary, and confidence-building through games.',
      level: 'Age Group: Kids Conversation',
      syllabus: [
        'Interactive phonics and English pronunciation guides',
        'Essential vocabulary: animals, fruits, shapes, and toys',
        'Expressing feelings and daily needs in simple sentences',
        'Roleplays, mini-stories, and early language fluency games'
      ]
    },
    'c-smart-kids': {
      title: 'Smart Kids Camp 2026',
      description: 'Summer Camp for kids. A fun, recreational, and educational summer program that blends hands-on activities, creativity, and smart English learning.',
      level: 'Age Group: Kids Summer Camp',
      syllabus: [
        'Critical thinking, brain games, and problem-solving puzzles',
        'Daily English conversation and illustrated interactive stories',
        'Handcrafts, drawing, and creative multilingual expression',
        'Team-building games to enhance leadership and social skills'
      ]
    },
    'c-summer-camp': {
      title: 'Summer Camp 2026 (Teens)',
      description: 'An intensive summer program combining academic development, extracurricular workshops, and public speaking to build strong language skills.',
      level: 'Age Group: Teens Summer Camp',
      syllabus: [
        'Public speaking and presentation skills in English',
        'Innovation workshops, collaborative projects, and mini-research',
        'Language games, educational drama, and roleplaying',
        'Contemporary vocabulary, technology, and AI discussions'
      ]
    },
    'c-speaking-club': {
      title: 'Speaking Club — English Conversation',
      description: 'The perfect safe space to break language barriers and practice speaking English with peers and native-level mentors on exciting topics.',
      level: 'Level: Intermediate to Advanced',
      syllabus: [
        'Active and open discussions about contemporary global topics',
        'Individual presentations and debates to strengthen argumentation',
        'Constructive peer feedback on pronunciation and sentence structures',
        'Learning modern idioms, slang, and daily expressions'
      ]
    },
    'c-online-classes': {
      title: 'Online English Classes',
      description: 'Fully remote interactive classes with morning and evening schedules tailored to fit all commitments and professional timelines.',
      level: 'Shift Options: Morning / Evening',
      syllabus: [
        'Live video classes with interactive group participation',
        'Access to ELC academic platform for assignments and resources',
        'Structured conversation sessions covering essential communication',
        'Regular progress tracking and digital mock exams'
      ]
    },
    'c-elc-speaking': {
      title: 'ELC Speaking Class',
      description: 'Social Communication Department. Develop effective social skills, build professional and personal relationships, and master polite English.',
      level: 'Focus: Social Communication',
      syllabus: [
        'Body language, active listening, and social conversation etiquette',
        'Handling short and long conversations with natural confidence',
        'Polite expressions, negotiations, and real-life social scenarios',
        'Cross-cultural awareness and navigating diverse environments'
      ]
    },
    'c-lt-booster': {
      title: 'LT Booster Suite',
      description: 'Specialized program for English teachers. Train in modern teaching methodologies, interactive classroom management, and curriculum design.',
      level: 'Focus: English Teacher Training',
      syllabus: [
        'Modern theories and methodologies in English language teaching (ESL)',
        'Designing interactive lesson plans and educational materials',
        'Integrating technology and AI assistants inside modern classrooms',
        'Assessment strategies and handling mixed-ability students'
      ]
    },
    'c-bac-prep': {
      title: 'Baccalaureate Exam Preparation',
      description: 'Intensive program designed for final-year high school students to review, analyze, and solve official national exam papers with high scores.',
      level: 'Exam Group: BAC Students',
      syllabus: [
        'Comprehensive review of all syllabus units and grammar',
        'Exam methodology, structure, and decoding common question traps',
        'Solving official past baccalaureate exams under timed conditions',
        'Valuable advice on exam anxiety and time-management strategies'
      ]
    },
    'c-accounting': {
      title: 'Accounting & Finance Essentials',
      description: 'Acquire both fundamental and advanced skills in financial accounting, corporate bookkeeping, and budget management with practical exercises.',
      level: 'Focus: Accounting & Finance',
      syllabus: [
        'Principles of general accounting and financial terminology',
        'Recording daily transactions in journals and ledgers',
        'Preparing financial statements: balance sheets, income statements',
        'Practical applications using popular accounting software suites'
      ]
    },
    'c-summer-school-2025': {
      title: 'Summer Academic Formations 2025',
      description: 'For Primary, Middle, and High school levels (English & French). Strengthen school subjects and start your academic year with absolute confidence.',
      level: 'Levels: Primary, Middle, High School',
      syllabus: [
        'Filling educational gaps identified from the past school year',
        'Explaining and simplifying core grammar and upcoming vocabulary',
        'Intensive revision and writing workshops to boost writing skills',
        'Interactive educational activities to promote rapid learning'
      ]
    },
    'c-english-idioms': {
      title: 'English Idioms & Slang',
      description: 'Learn the most common idiomatic expressions used by native speakers to make your English conversations sound natural, native, and eloquent.',
      level: 'Type: Educational Content',
      syllabus: [
        'Concept of idiomatic expressions and their impact on conversations',
        'Popular idioms for emotions, success, time, and weather',
        'How to naturally integrate idioms and avoid literal translation',
        'Interactive quizzes and roleplaying real conversation scenarios'
      ]
    },
    'c-grammar-rules': {
      title: 'Grammar: Word Types & Punctuation',
      description: 'A comprehensive and simplified reference for parts of speech (Nouns, Verbs, Adjectives) and punctuation to perfect your academic writing.',
      level: 'Type: Grammar & Punctuation',
      syllabus: [
        'Eight parts of speech and identifying word roles in sentences',
        'Detailed study of nouns, verbs, adjectives, and word derivation',
        'Using punctuation (comma, period, brackets) correctly',
        'Reviewing common sentence-level errors and stylistic rules'
      ]
    },
    'c-quotes-inspire': {
      title: 'Inspirational English Quotes',
      description: 'A handpicked collection of inspiring quotes in English with translations, linguistic analysis, and vocabulary reviews to motivate your study.',
      level: 'Type: Inspirational Content',
      syllabus: [
        'Analyzing quotes and studying their high-level grammatical structures',
        'Learning advanced vocabulary with rhetorical and emotional depth',
        'How to apply quotes in your essays and presentations',
        'Group discussions to improve positive critical thinking skills'
      ]
    }
  },
  fr: {
    'c-english-gen': {
      title: 'Programme d\'Anglais Général',
      description: 'Un programme complet pour développer les quatre compétences (Compréhension et expression écrites/orales) selon le cadre CECRL.',
      level: 'Niveaux : A1 - A2 - B1 - B2 - C1',
      syllabus: [
        'Améliorer la compréhension orale et s\'habituer aux différents accents',
        'Gagner en confiance et en fluidité dans les conversations quotidiennes',
        'Développer la lecture analytique et rédiger des e-mails formels',
        'Révision approfondie de la grammaire et du vocabulaire professionnel'
      ]
    },
    'c-french-gen': {
      title: 'Programme de Français Général',
      description: 'Maîtrisez le français grâce à notre méthode interactive axée sur la prononciation, la conversation et l\'analyse de textes.',
      level: 'Niveaux : A1 - A2 - B1 - B2 - C1',
      syllabus: [
        'Prononciation correcte des sons français et phonétique',
        'Formuler des expressions de la vie quotidienne et du milieu de travail',
        'Grammaire de base et maîtrise des temps (Présent, Passé, Futur)',
        'Stratégies de conversation pour surmonter l\'appréhension et s\'exprimer'
      ]
    },
    'c-german-a1': {
      title: 'Langue Allemande — Niveau A1',
      description: 'Votre premier pas en allemand ! Apprenez à vous présenter, à poser des questions et à formuler des phrases simples du quotidien.',
      level: 'Niveau : A1 - Anfänger',
      syllabus: [
        'Alphabet allemand, règles de prononciation spécifiques et phonétique',
        'Salutations, se présenter soi-même et les autres, parler de son métier',
        'Structure de la phrase simple avec verbes et pronoms courants',
        'Chiffres, heure, saisons et situations réelles quotidiennes'
      ]
    },
    'c-spanish-open': {
      title: 'Espagnol Fondamental',
      description: 'Démarrez votre apprentissage de l\'une des langues les plus parlées au monde à travers un parcours interactif et moderne.',
      level: 'Niveau : Débutant / Ouvert',
      syllabus: [
        'Alphabet espagnol, prononciation correcte et accents toniques',
        'Se présenter, présenter sa famille, exprimer les couleurs et chiffres',
        'Construction de phrases de base avec les verbes d\'action essentiels',
        'Expressions courantes pour le voyage, les achats et la rue'
      ]
    },
    'c-english-kids': {
      title: 'Anglais pour Enfants (Conversation)',
      description: 'Section d\'anglais axée sur l\'expression orale pour enfants. Cours ludiques et stimulants à base de jeux, chants et projets créatifs.',
      level: 'Groupe d\'âge : Conversation Enfants',
      syllabus: [
        'Phonétique et prononciation anglaise par des méthodes interactives',
        'Vocabulaire essentiel : animaux, fruits, formes et jouets',
        'Exprimer ses émotions et ses besoins quotidiens en phrases simples',
        'Jeux de rôle, mini-histoires et développement de la fluidité'
      ]
    },
    'c-smart-kids': {
      title: 'Smart Kids Camp 2026',
      description: 'Camp d\'été pour enfants. Un programme estival d\'apprentissage de l\'anglais combinant divertissement, innovation et créativité.',
      level: 'Groupe d\'âge : Camp d\'Été Enfants',
      syllabus: [
        'Activités de logique, d\'esprit critique et de résolution d\'énigmes',
        'Conversations anglaises quotidiennes et histoires illustrées',
        'Travaux manuels, dessin et expression artistique en anglais',
        'Jeux d\'équipe pour développer le leadership et l\'entraide'
      ]
    },
    'c-summer-camp': {
      title: 'Summer Camp 2026 (Ados)',
      description: 'Programme d\'été intensif mêlant révision académique, ateliers de prise de parole en public et projets collaboratifs.',
      level: 'Groupe d\'âge : Camp d\'Été Ados',
      syllabus: [
        'Techniques d\'expression orale et de présentation en public',
        'Ateliers d\'innovation, projets créatifs et mini-recherche',
        'Jeux linguistiques collectifs, théâtre et improvisation',
        'Vocabulaire contemporain, technologie et débats sur l\'IA'
      ]
    },
    'c-speaking-club': {
      title: 'Speaking Club — Conversation Anglaise',
      description: 'L\'espace idéal pour surmonter le blocage de la langue et échanger en anglais avec des professeurs qualifiés sur des thèmes captivants.',
      level: 'Niveau : Intermédiaire à Avancé',
      syllabus: [
        'Discussions ouvertes sur des sujets d\'actualité internationale',
        'Présentations individuelles et débats argumentés',
        'Correction bienveillante de la prononciation et de la syntaxe',
        'Vocabulaire familier, expressions idiomatiques et tournures de phrase'
      ]
    },
    'c-online-classes': {
      title: 'Cours d\'Anglais en Ligne',
      description: 'Cours à distance interactifs avec horaires flexibles (matin et soir) pour concilier apprentissage et obligations quotidiennes.',
      level: 'Options : Horaires Matin / Soir',
      syllabus: [
        'Vidéoconférences en direct avec participation active en groupe',
        'Plateforme ELC intégrée pour devoirs, ressources et corrections',
        'Séances de conversation structurées couvrant la vie courante',
        'Évaluation régulière du niveau et examens blancs'
      ]
    },
    'c-elc-speaking': {
      title: 'ELC Speaking Class',
      description: 'Section communication sociale. Perfectionnez vos compétences relationnelles et apprenez à mener des conversations fluides et polies.',
      level: 'Focus : Communication Sociale',
      syllabus: [
        'Langage corporel, écoute active et étiquette des échanges formels',
        'Mener des conversations courtes et longues avec assurance',
        'Formules de politesse, négociation et interactions sociales réelles',
        'Sensibilisation culturelle et gestion de la diversité des contextes'
      ]
    },
    'c-lt-booster': {
      title: 'LT Booster Suite',
      description: 'Programme d\'excellence pour enseignants d\'anglais. Maîtrisez les stratégies de gestion de classe et de didactique des langues.',
      level: 'Focus : Formation d\'Enseignants',
      syllabus: [
        'Méthodologies modernes d\'enseignement de l\'anglais langue seconde',
        'Conception de plans de cours dynamiques et de supports visuels',
        'Intégration du numérique et des outils d\'intelligence artificielle',
        'Techniques d\'évaluation et gestion des classes de niveaux mixtes'
      ]
    },
    'c-bac-prep': {
      title: 'Préparation au Baccalauréat',
      description: 'Révision intensive pour les élèves de terminale. Analyse méthodique des sujets types et entraînement rigoureux pour garantir le succès.',
      level: 'Groupe : Élèves de Terminale',
      syllabus: [
        'Révision complète du programme de langues étrangères',
        'Méthode d\'analyse des questions et de rédaction attendue au bac',
        'Résolution chronométrée des examens officiels précédents',
        'Gestion du temps, du stress et astuces méthodologiques clés'
      ]
    },
    'c-accounting': {
      title: 'Comptabilité et Finance d\'Entreprise',
      description: 'Maîtrisez les fondamentaux comptables, la gestion de trésorerie et l\'analyse de bilans grâce à des ateliers pratiques.',
      level: 'Focus : Comptabilité & Gestion',
      syllabus: [
        'Principes de comptabilité générale et vocabulaire financier',
        'Enregistrement des opérations courantes (journaux, grand livre)',
        'Élaboration des états financiers : bilan, compte de résultat',
        'Prise en main guidée des logiciels professionnels de comptabilité'
      ]
    },
    'c-summer-school-2025': {
      title: 'Soutien Académique d\'Été 2025',
      description: 'Niveaux Primaire, Moyen et Secondaire (Anglais & Français). Consolidez vos bases durant l\'été pour aborder la rentrée avec sérénité.',
      level: 'Niveaux : Primaire, Moyen, Secondaire',
      syllabus: [
        'Remise à niveau et comblement des lacunes de l\'année écoulée',
        'Explication claire de la grammaire et du lexique de l\'année suivante',
        'Ateliers intensifs d\'expression écrite et de lecture fluide',
        'Activités pédagogiques ludiques favorisant la mémorisation'
      ]
    },
    'c-english-idioms': {
      title: 'Expressions Idiomatiques Anglaises',
      description: 'Apprenez les expressions idiomatiques courantes utilisées par les natifs pour donner du relief et de l\'éloquence à vos conversations.',
      level: 'Type : Contenu Pédagogique',
      syllabus: [
        'Compréhension des expressions imagées et leur utilité au quotidien',
        'Idiomes courants liés aux émotions, au succès, au temps',
        'Intégrer les expressions et éviter la traduction littérale',
        'Mises en situation et dialogues thématiques ludiques'
      ]
    },
    'c-grammar-rules': {
      title: 'Grammaire et Ponctuation',
      description: 'Un guide de référence simple des types de mots (Noms, Verbes, Adjectifs) et des règles de ponctuation pour un écrit sans faute.',
      level: 'Type : Grammaire et Syntaxe',
      syllabus: [
        'Les huit classes grammaticales et leur fonction dans la phrase',
        'Étude détaillée de l\'accord des verbes et dérivation des adjectifs',
        'Règles d\'usage de la ponctuation (virgules, deux points, parenthèses)',
        'Analyse et correction des erreurs courantes de formulation'
      ]
    },
    'c-quotes-inspire': {
      title: 'Citations Inspirantes en Anglais',
      description: 'Découvrez des proverbes et citations inspirantes. Analyse grammaticale et traduction pour s\'instruire tout en restant motivé.',
      level: 'Type : Éveil et Culture',
      syllabus: [
        'Analyse stylistique et décryptage grammatical des citations célèbres',
        'Assimilation de vocabulaire à forte valeur expressive',
        'Utilisation pertinente de citations dans les écrits et présentations',
        'Discussions guidées autour de la pensée positive et inspirante'
      ]
    }
  }
};

export const Courses: React.FC<CoursesProps> = ({ onNavigate }) => {
  const { courses, currentUser, enrollInCourse, signUp, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showRegModal, setShowRegModal] = useState<boolean>(false);
  const [regForm, setRegForm] = useState({ name: '', email: '' });

  // Translation helpers for specific UI texts
  const tUI = (ar: string, en: string, fr: string) => {
    if (language === 'en') return en;
    if (language === 'fr') return fr;
    return ar;
  };

  // Get translated content for a specific course
  const getCourseDetails = (course: Course) => {
    const langTrans = courseTranslations[language];
    if (langTrans && langTrans[course.id]) {
      return {
        title: langTrans[course.id].title,
        description: langTrans[course.id].description,
        level: langTrans[course.id].level,
        syllabus: langTrans[course.id].syllabus
      };
    }
    return {
      title: course.title,
      description: course.description,
      level: course.level,
      syllabus: course.syllabus
    };
  };

  const categories = [
    { id: 'all', label: tUI('الكل', 'All', 'Tout') },
    { id: 'languages', label: tUI('دورات اللغات', 'Language Courses', 'Cours de Langues') },
    { id: 'special', label: tUI('البرامج الخاصة', 'Special Programs', 'Programmes Spéciaux') },
    { id: 'academic', label: tUI('دورات أكاديمية', 'Academic Courses', 'Soutien Académique') },
    { id: 'educational', label: tUI('محتوى تعليمي', 'Educational Content', 'Contenu Éducatif') }
  ];

  // Filtering logic
  const filteredCourses = courses.filter(course => {
    const details = getCourseDetails(course);
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = 
      details.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      details.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      details.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegisterClick = (course: Course) => {
    setSelectedCourse(course);
    const details = getCourseDetails(course);
    if (currentUser && currentUser.role === 'student') {
      enrollInCourse(course.id);
      alert(
        tUI(
          `تم تسجيلك بنجاح في دورة "${details.title}". يرجى الانتقال إلى لوحة الطالب لمتابعة الدروس.`,
          `Successfully registered in the course "${details.title}". Please go to your student dashboard to access lessons.`,
          `Inscription réussie au cours "${details.title}". Veuillez vous rendre sur votre tableau de bord étudiant pour y accéder.`
        )
      );
      onNavigate('student-dashboard');
    } else if (currentUser && currentUser.role !== 'student') {
      alert(
        tUI(
          'عذراً، يجب تسجيل الدخول بحساب "طالب" لتتمكن من حجز الدورات الأكاديمية.',
          'Sorry, you must be logged in as a "Student" to enroll in academic courses.',
          'Désolé, vous devez être connecté en tant qu\'Étudiant pour vous inscrire à un cours.'
        )
      );
    } else {
      setShowRegModal(true);
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.email || !selectedCourse) return;
    const details = getCourseDetails(selectedCourse);

    signUp(regForm.name, regForm.email, 'student');
    enrollInCourse(selectedCourse.id);
    
    setShowRegModal(false);
    setRegForm({ name: '', email: '' });
    
    alert(
      tUI(
        `أهلاً بك ${regForm.name}! تم إنشاء حسابك الأكاديمي وتسجيلك بنجاح في دورة "${details.title}".`,
        `Welcome ${regForm.name}! Your student account has been created and you have successfully enrolled in "${details.title}".`,
        `Bienvenue ${regForm.name} ! Votre compte étudiant a été créé et vous êtes inscrit au cours "${details.title}".`
      )
    );
    onNavigate('student-dashboard');
  };

  const isRtl = language === 'ar';

  return (
    <div className={`py-6 md:py-12 max-w-7xl mx-auto px-4 ${isRtl ? 'text-right' : 'text-left'} space-y-8 md:space-y-12`}>
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4">
        <span className="text-[#800000] font-bold text-xs md:text-sm uppercase tracking-wider">
          {tUI('البرامج التعليمية والأكاديمية', 'Educational & Academic Programs', 'Programmes Éducatifs & Académiques')}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#002B5B] dark:text-slate-100">
          {tUI('استكشف دورات النخبة في اللغات', 'Explore Elite Language Courses', 'Découvrez Nos Formations d\'Élite')}
        </h1>
        <div className="h-1 w-20 bg-[#800000] mx-auto rounded-full" />
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          {tUI(
            'اختر من بين تشكيلة برامجنا التخصصية الممنهجة، والتي تغطي المستويات التأسيسية والمحادثة المتقدمة والتأهيل للاختبارات الدولية.',
            'Choose from our structured specialized programs covering fundamental levels, advanced conversations, and international exam preparations.',
            'Choisissez parmi nos programmes structurés allant des niveaux débutants aux conversations avancées et préparations d\'examens officiels.'
          )}
        </p>
      </div>

      {/* Search and Categories bar */}
      <div className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 md:p-6 rounded-2xl shadow-md flex flex-col ${isRtl ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between items-center gap-6`}>
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${isRtl ? 'pl-4 pr-10 text-right' : 'pr-4 pl-10 text-left'} py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none transition text-sm`}
            placeholder={tUI('ابحث عن دورة...', 'Search for a course...', 'Rechercher un cours...')}
            id="search-courses"
          />
          <Search className={`w-5 h-5 text-slate-400 absolute ${isRtl ? 'right-3' : 'left-3'} top-3`} />
        </div>

        {/* Categories toggler */}
        <div className={`flex flex-wrap ${isRtl ? 'flex-row-reverse' : 'flex-row'} justify-center gap-2 w-full md:w-auto`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                selectedCategory === cat.id 
                  ? 'bg-[#800000] text-white shadow-md' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              id={`cat-btn-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => {
          const details = getCourseDetails(course);
          return (
            <motion.div
              key={course.id}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
              id={`course-card-${course.id}`}
            >
              {/* Image header */}
              <div className="relative h-48 bg-slate-100">
                <img 
                  src={course.image} 
                  alt={details.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} bg-[#800000]/90 backdrop-blur text-white text-[11px] font-bold px-3 py-1 rounded-full border border-rose-900/30`}>
                  {categories.find(c => c.id === course.category)?.label}
                </span>
              </div>

              {/* Course Information */}
              <div className={`p-6 space-y-4 flex-1 flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#002B5B] dark:text-slate-100 leading-snug">{details.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">{details.description}</p>
                </div>

                {/* Course Meta Info */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 dark:border-slate-800 py-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <div className={`flex items-center ${isRtl ? 'justify-end' : 'justify-start'} gap-1.5`}>
                    {!isRtl && <Award className="w-4 h-4 text-[#800000] flex-shrink-0" />}
                    <span>{details.level}</span>
                    {isRtl && <Award className="w-4 h-4 text-[#800000] flex-shrink-0" />}
                  </div>
                  <div className={`flex items-center ${isRtl ? 'justify-end' : 'justify-start'} gap-1.5`}>
                    {!isRtl && <Clock className="w-4 h-4 text-[#002B5B] dark:text-slate-300 flex-shrink-0" />}
                    <span>{course.duration}</span>
                    {isRtl && <Clock className="w-4 h-4 text-[#002B5B] dark:text-slate-300 flex-shrink-0" />}
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className={`px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-50 dark:border-slate-800/50 mt-auto bg-slate-50/50 dark:bg-slate-900/50 p-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <p className="text-[10px] text-slate-400">{tUI('سعر الاشتراك', 'Enrollment Fee', 'Tarif d\'inscription')}</p>
                  <p className="text-lg font-extrabold text-[#800000]">{course.price.toLocaleString()} {tUI('د.ج', 'DA', 'DA')}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#002B5B] dark:text-slate-200 text-xs font-bold rounded-lg transition"
                    title={tUI('عرض المنهج', 'View Syllabus', 'Voir le programme')}
                    id={`syllabus-btn-${course.id}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRegisterClick(course)}
                    className="px-5 py-2 bg-[#002B5B] hover:bg-[#001F42] text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                    id={`register-btn-${course.id}`}
                  >
                    <span>{tUI('تسجيل الآن', 'Register Now', 'S\'inscrire')}</span>
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Syllabus Modal drawer */}
      <AnimatePresence>
        {selectedCourse && !showRegModal && (() => {
          const details = getCourseDetails(selectedCourse);
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-8 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto ${isRtl ? 'text-right' : 'text-left'} relative space-y-4 md:space-y-6 shadow-2xl`}
              >
                <div className={`flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition font-bold"
                  >
                    ✕
                  </button>
                  <h3 className="text-lg md:text-xl font-bold text-[#002B5B] dark:text-slate-100">
                    {tUI('مفردات ومنهج الدورة', 'Course Syllabus & Syllabus', 'Programme et Syllabus du Cours')}
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="font-semibold text-sm text-[#800000]">{details.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{details.description}</p>
                  
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-slate-400">
                      {tUI('مواضيع الخطة الدراسية بالتفصيل:', 'Detailed Course Topics:', 'Sujets détaillés du programme :')}
                    </p>
                    <div className="space-y-2">
                      {details.syllabus.map((topic, i) => (
                        <div key={i} className={`flex items-start ${isRtl ? 'justify-end' : 'justify-start'} gap-2 text-xs`}>
                          {!isRtl && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />}
                          <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{topic}</span>
                          {isRtl && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <p className="text-[10px] text-slate-400">{tUI('سعر الاشتراك الكامل', 'Full Subscription Fee', 'Tarif d\'inscription complet')}</p>
                    <p className="text-lg font-extrabold text-[#800000]">{selectedCourse.price.toLocaleString()} {tUI('د.ج', 'DA', 'DA')}</p>
                  </div>
                  <button
                    onClick={() => handleRegisterClick(selectedCourse)}
                    className="px-6 py-2.5 bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2"
                  >
                    <span>{tUI('التسجيل والحجز المباشر', 'Enroll & Book Seat', 'S\'inscrire & Réserver')}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Registration Modal for Non-logged-in Guests */}
      <AnimatePresence>
        {showRegModal && selectedCourse && (() => {
          const details = getCourseDetails(selectedCourse);
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl max-w-md w-full ${isRtl ? 'text-right' : 'text-left'} relative space-y-6 shadow-2xl`}
              >
                <div className={`flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                  <button 
                    onClick={() => setShowRegModal(false)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition font-bold"
                  >
                    ✕
                  </button>
                  <h3 className="text-xl font-bold text-[#002B5B] dark:text-slate-100">
                    {tUI('التسجيل الأكاديمي السريع', 'Quick Academic Registration', 'Inscription Académique Rapide')}
                  </h3>
                </div>

                <div className="space-y-2 bg-rose-50/50 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-100 dark:border-rose-950">
                  <p className="text-xs text-slate-500">{tUI('أنت تسجل حالياً في:', 'You are registering in:', 'Vous vous inscrivez à :')}</p>
                  <p className="font-bold text-xs text-[#800000]">{details.title}</p>
                  <p className="text-[11px] text-slate-400 font-semibold">
                    {tUI('سعر الدورة:', 'Course Fee:', 'Tarif du cours :')} {selectedCourse.price.toLocaleString()} {tUI('د.ج', 'DA', 'DA')}
                  </p>
                </div>

                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">
                      {tUI('الاسم الكامل', 'Full Name', 'Nom Complet')} <span className="text-[#800000]">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm(p => ({ ...p, name: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none ${isRtl ? 'text-right' : 'text-left'}`}
                      placeholder={tUI('الاسم الكامل', 'Full Name', 'Nom complet')}
                      id="reg-modal-name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">
                      {tUI('البريد الإلكتروني', 'Email Address', 'Adresse E-mail')} <span className="text-[#800000]">*</span>
                    </label>
                    <input 
                      type="email"
                      required
                      value={regForm.email}
                      onChange={(e) => setRegForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none text-left font-mono"
                      placeholder="name@example.com"
                      id="reg-modal-email"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#800000] hover:bg-[#600000] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                    >
                      <span>{tUI('تأكيد التسجيل والدفع التجريبي', 'Confirm Registration & Access', 'Confirmer l\'Inscription & Accéder')}</span>
                      {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};
