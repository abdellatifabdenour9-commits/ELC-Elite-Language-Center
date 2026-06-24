import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, Menu, X, ChevronDown, GraduationCap, BookOpen, Globe
} from 'lucide-react';
import { AppProvider, useApp } from './store';
import { Home } from './components/Home';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { Courses } from './components/Courses';
import { Language } from './translations';
import elcLogo from '../pictures/logo/logo.png';

const AppContent: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage, t } = useApp();

  const [currentView, setCurrentView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync Tailwind Dark Class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'courses':
        return <Courses onNavigate={setCurrentView} />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">

      {/* PRIMARY HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800/80 shadow-sm transition">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-6">
          
          {/* Logo Branding */}
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 sm:gap-3 text-start"
            id="header-logo-btn"
          >
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-md shrink-0 border border-slate-100 dark:border-slate-800">
              <img src={elcLogo} alt="ELC Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold text-[#002B5B] dark:text-white leading-tight">ELC – Elite Language Center</h2>
              <p className="text-[8px] sm:text-[9px] text-slate-400 tracking-wide">{t('school_name')}</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-600 dark:text-slate-300">
            <button 
              onClick={() => setCurrentView('home')}
              className={`hover:text-[#800000] transition ${currentView === 'home' ? 'text-[#800000] underline underline-offset-4' : ''}`}
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => setCurrentView('courses')}
              className={`hover:text-[#800000] transition ${currentView === 'courses' ? 'text-[#800000] underline underline-offset-4' : ''}`}
            >
              {t('nav.courses')}
            </button>
            <button 
              onClick={() => setCurrentView('about')}
              className={`hover:text-[#800000] transition ${currentView === 'about' ? 'text-[#800000] underline underline-offset-4' : ''}`}
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => setCurrentView('contact')}
              className={`hover:text-[#800000] transition ${currentView === 'contact' ? 'text-[#800000] underline underline-offset-4' : ''}`}
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* Right utility items */}
          <div className="flex items-center gap-3">
            {/* Language Dropdown Selector */}
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 px-2.5 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              <Globe className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent border-none text-xs font-bold pl-1.5 pr-4 outline-none cursor-pointer appearance-none text-slate-600 dark:text-slate-300"
                id="language-select"
              >
                <option value="ar" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">العربية</option>
                <option value="en" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">English</option>
                <option value="fr" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Français</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
            </div>

            {/* Dark Mode toggler */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-xl transition"
              title="تبديل المظهر"
              id="theme-toggler-btn"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE RESPONSIVE SIDEBAR DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            {/* Backdrop overlay */}
            <div 
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
            />
            {/* Menu container */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 h-full bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="font-extrabold text-[#002B5B] dark:text-white">{t('school_sub')}</span>
              </div>

              <div className="flex flex-col gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
                <button 
                  onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
                  className={`p-2.5 text-start rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition ${currentView === 'home' ? 'bg-[#800000]/5 text-[#800000]' : ''}`}
                >
                  {t('nav.home')}
                </button>
                <button 
                  onClick={() => { setCurrentView('courses'); setMobileMenuOpen(false); }}
                  className={`p-2.5 text-start rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition ${currentView === 'courses' ? 'bg-[#800000]/5 text-[#800000]' : ''}`}
                >
                  {t('nav.courses')}
                </button>
                <button 
                  onClick={() => { setCurrentView('about'); setMobileMenuOpen(false); }}
                  className={`p-2.5 text-start rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition ${currentView === 'about' ? 'bg-[#800000]/5 text-[#800000]' : ''}`}
                >
                  {t('nav.about')}
                </button>
                <button 
                  onClick={() => { setCurrentView('contact'); setMobileMenuOpen(false); }}
                  className={`p-2.5 text-start rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition ${currentView === 'contact' ? 'bg-[#800000]/5 text-[#800000]' : ''}`}
                >
                  {t('nav.contact')}
                </button>

                {/* Mobile Language list */}
                <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-4">
                  <p className="text-xs text-slate-400 mb-2 px-2.5">اللغة / Language / Langue</p>
                  <div className="flex gap-2 p-1 bg-slate-50 dark:bg-slate-950 rounded-xl">
                    <button 
                      onClick={() => setLanguage('ar')}
                      className={`flex-1 py-2 rounded-lg text-center font-bold text-xs transition ${language === 'ar' ? 'bg-[#800000] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      العربية
                    </button>
                    <button 
                      onClick={() => setLanguage('en')}
                      className={`flex-1 py-2 rounded-lg text-center font-bold text-xs transition ${language === 'en' ? 'bg-[#800000] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={() => setLanguage('fr')}
                      className={`flex-1 py-2 rounded-lg text-center font-bold text-xs transition ${language === 'fr' ? 'bg-[#800000] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      FR
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CORE VIEWPORT SCENARIO */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* PRIMARY ACADEMIC FOOTER */}
      <footer className="bg-[#002B5B] text-slate-300 py-16 border-t border-[#800000] text-xs leading-relaxed print:hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
          
          {/* Section 1: Logo & Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow shrink-0 border border-white/10">
                <img src={elcLogo} alt="ELC Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h2 className="text-sm font-extrabold text-white">Elite Language Center</h2>
            </div>
            <p className="text-slate-400 text-sm">
              {language === 'ar' 
                ? 'مدرسة النخبة المعتمدة دولياً ومحلياً لتدريس اللغات الحية بأساليب تفاعلية حديثة، لبناء جيل طليق لغوياً ومتمكن أكاديمياً.'
                : language === 'en'
                ? 'Internationally and locally accredited elite school for teaching living languages using modern interactive methods, to build a generation fluent in speech and strong in academics.'
                : 'École d\'élite accréditée internationalement et localement pour l\'enseignement des langues vivantes selon des méthodes interactives modernes, afin de former une génération fluide et forte sur le plan académique.'}
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="space-y-3 text-start">
            <h4 className="font-bold text-white text-sm border-b border-white/10 pb-1.5">
              {language === 'ar' ? 'روابط سريعة' : language === 'en' ? 'Quick Links' : 'Liens Rapides'}
            </h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => setCurrentView('home')} className="hover:text-white transition text-start">{t('nav.home')}</button>
              <button onClick={() => setCurrentView('courses')} className="hover:text-white transition text-start">{t('nav.courses')}</button>
              <button onClick={() => setCurrentView('about')} className="hover:text-white transition text-start">{t('nav.about')}</button>
              <button onClick={() => setCurrentView('contact')} className="hover:text-white transition text-start">{t('nav.contact')}</button>
            </div>
          </div>

          {/* Section 3: Hours & Support */}
          <div className="space-y-3 text-start">
            <h4 className="font-bold text-white text-sm border-b border-white/10 pb-1.5">
              {language === 'ar' ? 'مواعيد العمل الرسمية' : language === 'en' ? 'Official Hours' : 'Heures de Bureau'}
            </h4>
            <div className="space-y-2 text-slate-400">
              <p>
                {language === 'ar' 
                  ? 'من السبت إلى الخميس:' 
                  : language === 'en'
                  ? 'Saturday to Thursday:'
                  : 'Du samedi au jeudi:'}{' '}
                <span className="text-white">08:30 - 17:30</span>
              </p>
              <p>
                {language === 'ar' ? 'الجمعة:' : language === 'en' ? 'Friday:' : 'Vendredi:'}{' '}
                <span className="text-white">{language === 'ar' ? 'مغلق' : language === 'en' ? 'Closed' : 'Fermé'}</span>
              </p>
              <p>
                {language === 'ar' ? 'الدعم الهاتفي:' : language === 'en' ? 'Phone Support:' : 'Support Téléphonique:'}{' '}
                <span className="text-emerald-400">0549 66 02 76</span>
              </p>
            </div>
          </div>

          {/* Section 4: Accreditations */}
          <div className="space-y-3 text-start">
            <h4 className="font-bold text-white text-sm border-b border-white/10 pb-1.5">
              {language === 'ar' ? 'اعتمادات وشراكات دولية' : language === 'en' ? 'International Accreditations' : 'Accréditations Internationales'}
            </h4>
            <p className="text-slate-400 text-sm">
              {language === 'ar' 
                ? 'مناهجنا وبرامجنا التحضيرية معتمدة ومتوافقة مع الإطار الأوروبي المشترك للغات (CEFR) ونموذج كامبريدج البريطاني للتقييم اللغوي المستمر.'
                : language === 'en'
                ? 'Our curriculum and preparatory programs are certified and fully aligned with the Common European Framework of Reference for Languages (CEFR) and Cambridge standards.'
                : 'Notre programme d\'études et nos programmes préparatoires sont certifiés et conformes au Cadre européen commun de référence pour les langues (CECRL) et aux normes de Cambridge.'}
            </p>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/10 text-center text-slate-500 text-[10px] flex flex-col md:flex-row justify-between items-center gap-4">
          <p>{t('rights_reserved')}</p>
          <div className="flex gap-4">
            <span>{language === 'ar' ? 'شروط الاستخدام' : language === 'en' ? 'Terms of Use' : 'Conditions d\'utilisation'}</span>
            <span>{language === 'ar' ? 'سياسة الخصوصية' : language === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
