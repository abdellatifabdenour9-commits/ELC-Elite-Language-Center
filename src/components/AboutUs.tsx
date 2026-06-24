import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Shield, Compass, Sparkles, Award } from 'lucide-react';
import { useApp } from '../store';
import heroImg from '../../pictures/About Us/photo-1513258496099-48168024aec0.jfif';

export const AboutUs: React.FC = () => {
  const { t, language } = useApp();

  const localizedValues = {
    ar: [
      {
        title: 'الجودة والتميز الأكاديمي',
        desc: 'الالتزام بأعلى معايير جودة التعليم والتركيز الكامل على نجاح ومستقبل الطالب.',
        icon: Award,
        color: 'text-[#800000] bg-rose-50 dark:bg-rose-950/20'
      },
      {
        title: 'الالتزام والمسؤولية',
        desc: 'الالتزام الكامل بتقديم برامج ومتابعة مستمرة لتحقيق أفضل النتائج الدراسية الممكنة لجميع الطلاب.',
        icon: Shield,
        color: 'text-[#002B5B] bg-blue-50 dark:bg-blue-950/20'
      },
      {
        title: 'الابتكار والتطوير',
        desc: 'تبني أحدث تقنيات التعليم وأساليب التدريس الحديثة والمبتكرة التي تضمن تفوق الطالب.',
        icon: Sparkles,
        color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/20'
      },
      {
        title: 'التنوع اللغوي والثقافي',
        desc: 'تقدير التنوع وبناء جسور التواصل الثقافي الفعال لتمكين قادة المستقبل.',
        icon: Compass,
        color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20'
      }
    ],
    en: [
      {
        title: 'Academic Excellence',
        desc: 'Uncompromising commitment to premium pedagogical quality, putting student success first.',
        icon: Award,
        color: 'text-[#800000] bg-rose-50 dark:bg-rose-950/20'
      },
      {
        title: 'Responsibility & Commitment',
        desc: 'Full dedication to delivering structural follow-up for maximum learning and scoring milestones.',
        icon: Shield,
        color: 'text-[#002B5B] bg-blue-50 dark:bg-blue-950/20'
      },
      {
        title: 'Innovation & Growth',
        desc: 'Embracing leading-edge e-learning resources and modern conversational strategies.',
        icon: Sparkles,
        color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/20'
      },
      {
        title: 'Multicultural Exchange',
        desc: 'Fostering shared communication channels and expanding prospective global viewpoints.',
        icon: Compass,
        color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20'
      }
    ],
    fr: [
      {
        title: 'Excellence Académique',
        desc: 'Engagement absolu envers la qualité de l\'enseignement, centré sur le succès de l\'apprenant.',
        icon: Award,
        color: 'text-[#800000] bg-rose-50 dark:bg-rose-950/20'
      },
      {
        title: 'Responsabilité & Suivi',
        desc: 'Dévouement total à assurer un encadrement structuré pour atteindre d\'excellents résultats.',
        icon: Shield,
        color: 'text-[#002B5B] bg-blue-50 dark:bg-blue-950/20'
      },
      {
        title: 'Innovation Pédagogique',
        desc: 'Adoption des technologies d\'apprentissage en ligne les plus avancées et des méthodes actives.',
        icon: Sparkles,
        color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/20'
      },
      {
        title: 'Échange Interculturel',
        desc: 'Valorisation de la diversité et création de passerelles linguistiques pour les leaders de demain.',
        icon: Compass,
        color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20'
      }
    ]
  };

  const localizedObjectives = {
    ar: [
      { label: 'تطوير الطلاقة والفظ المخارج الصحيح للغات لتصبح المحادثة مهارة بديهية طبيعية.', num: '١' },
      { label: 'تأهل الطلاب الأكاديميين لاجتياز اختبارات الكفاءة المعتمدة دولياً وتيسير القبول الجامعي.', num: '٢' },
      { label: 'سد الفجوة بين المناهج المكتوبة والاستخدامات المهنية للغات في بيئات العمل العالمية للشركات.', num: '٣' },
      { label: 'بناء جسور التواصل الحضاري والتبادل الثقافي من خلال تعليم اللغات للوافدين وثقافات العالم.', num: '٤' }
    ],
    en: [
      { label: 'Develop fluency and native pronunciation so conversation becomes a second-nature skill.', num: '1' },
      { label: 'Prepare academic students to pass internationally accredited proficiency exams like IELTS or DELF.', num: '2' },
      { label: 'Bridge the gap between textbook instruction and professional workplace communication.', num: '3' },
      { label: 'Build channels for cultural exchange and expat integration by hosting language learning.', num: '4' }
    ],
    fr: [
      { label: 'Développer l\'aisance orale et la prononciation correcte afin d\'en faire une compétence naturelle.', num: '1' },
      { label: 'Préparer les candidats à passer avec brio les examens officiels internationaux (IELTS, DELF, DALF).', num: '2' },
      { label: 'Combler le fossé entre la théorie des manuels et les exigences professionnelles en entreprise.', num: '3' },
      { label: 'Créer des passerelles d\'échange culturel pour les expatriés grâce à un enseignement dédié.', num: '4' }
    ]
  };

  const values = localizedValues[language] || localizedValues['ar'];
  const objectives = localizedObjectives[language] || localizedObjectives['ar'];

  return (
    <div className="py-6 md:py-12 space-y-12 md:space-y-20 max-w-7xl mx-auto px-4 text-start">
      {/* Intro Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4"
      >
        <span className="text-[#800000] font-bold text-xs md:text-sm uppercase tracking-wider">
          {language === 'ar' ? 'من نحن ورؤيتنا' : language === 'en' ? 'Who We Are' : 'Qui Sommes-Nous'}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#002B5B] dark:text-slate-100">{t('about.title')}</h1>
        <div className="h-1 w-20 bg-[#800000] mx-auto rounded-full" />
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-lg">
          {t('about.desc')}
        </p>
      </motion.div>

      {/* Hero Presentation */}
      <section className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002B5B] dark:text-slate-100">
            {language === 'ar' ? 'قصتنا في التعليم والريادة' : language === 'en' ? 'Our Story in Education' : 'Notre Histoire et Leadership'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
            {language === 'ar'
              ? 'تأسست مدرسة اللغات Elite Language Center تلبية للطلب المتزايد على كفاءة لغوية حقيقية تلائم المعايير العالمية. انطلقنا من فكرة بسيطة: "اللغات تكتسب بالتفاعل والممارسة لا بالتلقين والامتحانات الجافة".'
              : language === 'en'
              ? 'Elite Language Center was founded to meet the growing demand for genuine linguistic competence aligned with international standards. We started with a simple belief: "Languages are acquired through active interaction and practice, not passive textbooks."'
              : 'Elite Language Center a été fondé pour répondre à la demande croissante de compétences linguistiques réelles conformes aux normes internationales. Nous croyons fermement que les langues s\'acquièrent par la pratique active.'}
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
            {language === 'ar'
              ? 'خلال سنوات قليلة، نجح المركز في تأهيل أكثر من 5000 طالب وطالبة للقبول في كبرى الجامعات العالمية، واجتياز اختبارات الكفاءة الدولية مثل IELTS و DELF بنجاح باهر وتفوق مشهود، من خلال دمج المدرسين المتحدثين الأصليين بالبنية التحتية التكنولوجية الحديثة.'
              : language === 'en'
              ? 'Within a few years, our academy successfully prepared over 5,000 students for top international universities and official exams like IELTS and DELF, by combining native-speaking teachers with advanced, interactive tech infrastructure.'
              : 'En quelques années, notre centre a accompagné plus de 5000 étudiants vers de prestigieuses universités et la réussite d\'examens officiels, combinant formateurs natifs et outils technologiques innovants.'}
          </p>
          <div className="border-l-4 border-[#800000] pl-4 py-1.5 bg-rose-50/50 dark:bg-rose-950/10">
            <p className="text-[#800000] dark:text-rose-400 font-semibold italic text-sm md:text-lg">
              {language === 'ar'
                ? '"نحن لا ندرّس الكلمات، بل نمكنك من التعبير بطلاقة عن أفكارك وبناء ثقة حديدية تفتح لك أبواب المستقبل."'
                : language === 'en'
                ? '"We do not just teach words; we empower you to eloquently express your ideas and build bulletproof confidence for your future."'
                : '"Nous n\'enseignons pas seulement des mots, nous vous donnons les clés pour exprimer vos idées avec assurance et libérer votre avenir."'}
            </p>
          </div>
        </div>
        <div className="relative aspect-video md:aspect-auto md:h-[400px] rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
          <img 
            src={heroImg} 
            alt="Elite Language Center Library" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-md space-y-3 md:space-y-4 flex flex-col justify-between">
          <div className="space-y-3 md:space-y-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center text-[#800000]">
              <Target className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#002B5B] dark:text-slate-100">
              {language === 'ar' ? 'رسالتنا التعليمية' : language === 'en' ? 'Our Mission' : 'Notre Mission'}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
              {language === 'ar'
                ? 'تمكين الأفراد من التواصل بثقة وفعالية عبر الثقافات من خلال تقديم برامج تعليمية متميزة.'
                : language === 'en'
                ? 'Empower individuals to converse confidently and effectively across global boundaries through premium linguistic training.'
                : 'Donner aux individus les moyens de communiquer avec assurance et efficacité par-delà les cultures grâce à nos programmes d\'excellence.'}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-[#002B5B] text-white rounded-2xl border border-[#001F42] shadow-md space-y-3 md:space-y-4 flex flex-col justify-between">
          <div className="space-y-3 md:space-y-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center text-rose-300">
              <Eye className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {language === 'ar' ? 'رؤيتنا المستقبلية' : language === 'en' ? 'Our Vision' : 'Notre Vision'}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {language === 'ar'
                ? 'أن نكون المركز الرائد والأكثر تميزاً في تقديم الحلول التعليمية للغات على المستوى الإقليمي.'
                : language === 'en'
                ? 'To be the preeminent regional hub pioneering personalized, high-performance bilingual educational solutions.'
                : 'Devenir l\'institution de référence pionnière dans les solutions éducatives linguistiques d\'élite.'}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8 md:space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002B5B] dark:text-slate-100">{t('about.our_values')}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {language === 'ar' ? 'نلتزم بمجموعة من المبادئ والقيم الراسخة في كل خطوة نخطوها' : language === 'en' ? 'We adhere to robust principles in every step of our tutoring.' : 'Nous adhérons à des principes fondamentaux solides dans chaque cycle éducatif.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx} 
                className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-50 dark:border-slate-800 shadow-sm space-y-3 md:space-y-4 text-start"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${val.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-[#002B5B] dark:text-slate-100">{val.title}</h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Objectives Block */}
      <section className="bg-slate-50 dark:bg-slate-950/20 p-6 md:p-12 rounded-2xl flex flex-col gap-6 md:gap-8">
        <div className="space-y-2 border-l-4 border-[#800000] pl-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002B5B] dark:text-slate-100">{t('about.goals_title')}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">{t('about.goals_subtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4 w-full">
          {objectives.map((obj, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-50 dark:border-slate-800 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#800000] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {obj.num}
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">{obj.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
