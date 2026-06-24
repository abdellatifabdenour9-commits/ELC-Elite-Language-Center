import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircle, Instagram, Facebook, CheckCircle2, Clock, Map } from 'lucide-react';
import { useApp } from '../store';

export const ContactUs: React.FC = () => {
  const { t, language } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: language === 'ar' ? 'استفسار عام' : language === 'en' ? 'General Inquiry' : 'Demande générale',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: language === 'ar' ? 'استفسار عام' : language === 'en' ? 'General Inquiry' : 'Demande générale',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="py-6 md:py-12 max-w-7xl mx-auto px-4 text-start space-y-8 md:space-y-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4">
        <span className="text-[#800000] font-bold text-xs md:text-sm uppercase tracking-wider">
          {language === 'ar' ? 'تواصل معنا الآن' : language === 'en' ? 'Contact Us' : 'Contactez-nous'}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#002B5B] dark:text-slate-100">
          {language === 'ar' ? 'يسعدنا الإجابة عن استفساراتك' : language === 'en' ? 'Get In Touch With Us' : 'Nous sommes à votre écoute'}
        </h1>
        <div className="h-1 w-20 bg-[#800000] mx-auto rounded-full" />
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {language === 'ar'
            ? 'فريق خدمة العملاء والمستشارون الأكاديميون جاهزون للرد على رسائلك وتقديم الاستشارات المجانية لتحديد مستواك والبرنامج الأنسب لك.'
            : language === 'en'
            ? 'Our dedicated team and academic counselors are available to answer your messages, offering free placement advice to find the perfect fit.'
            : 'Notre équipe et nos conseillers d\'orientation sont disponibles pour répondre à toutes vos questions et vous guider vers le cursus idéal.'}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        {/* Contact info */}
        <div className="lg:col-span-1 space-y-6 md:space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-50 dark:border-slate-800 p-6 md:p-8 shadow-md space-y-5 md:space-y-6">
            <h3 className="text-xl font-bold text-[#002B5B] dark:text-slate-100">
              {language === 'ar' ? 'معلومات الاتصال المباشر' : language === 'en' ? 'Direct Contact Channels' : 'Coordonnées de Contact'}
            </h3>
            
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'اتصال مباشر أو واتساب' : language === 'en' ? 'Call or WhatsApp' : 'Téléphone ou WhatsApp'}
                  </p>
                  <p className="font-bold text-slate-700 dark:text-slate-200 text-sm ltr" style={{ direction: 'ltr' }}>0549 66 02 76 / 0550 11 22 33</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-[#002B5B] dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'البريد الإلكتروني الرسمي' : language === 'en' ? 'Official Email Address' : 'E-mail Officiel'}
                  </p>
                  <p className="font-bold text-slate-700 dark:text-slate-200 text-sm ltr" style={{ direction: 'ltr' }}>info@elc-dz.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-[#800000] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'موقع الحرم الأكاديمي' : language === 'en' ? 'Campus Location' : 'Siège Principal'}
                  </p>
                  <p className="font-bold text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                    {language === 'ar' ? 'غرداية، الجزائر' : 'Ghardaia, Algeria'}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'أوقات العمل واستقبال الزوار' : language === 'en' ? 'Working Hours' : 'Heures d\'Ouverture'}
                  </p>
                  <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                    {language === 'ar' 
                      ? 'السبت - الخميس: 08:30 - 17:30' 
                      : language === 'en'
                      ? 'Saturday - Thursday: 08:30 - 17:30'
                      : 'Samedi - Jeudi : 08:30 - 17:30'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'الجمعة: مغلق' : language === 'en' ? 'Friday: Closed' : 'Vendredi : Fermé'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-50 dark:border-slate-800 p-6 md:p-8 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-[#002B5B] dark:text-slate-100 mb-4">
              {language === 'ar' ? 'تابعنا وتواصل معنا عبر شبكات التواصل' : language === 'en' ? 'Follow Us on Social Media' : 'Suivez-nous sur les réseaux'}
            </h3>
            <div className="flex justify-start gap-4">
              {/* WhatsApp icon link */}
              <a 
                href="https://wa.me/213549660276" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                id="link-whatsapp"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
              </a>
              {/* Instagram link */}
              <a 
                href="https://www.instagram.com/elc.47/" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                id="link-instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              {/* Facebook link */}
              <a 
                href="https://www.facebook.com/abdennour.bouaroua.7" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center justify-center shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                id="link-facebook"
              >
                <Facebook className="w-6 h-6 fill-current" />
              </a>
            </div>
          </div>
        </div>

        {/* Messaging Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-50 dark:border-slate-800 p-6 md:p-8 shadow-md">
            <h3 className="text-xl font-bold text-[#002B5B] dark:text-slate-100 mb-6">
              {language === 'ar' ? 'أرسل لنا رسالة مباشرة' : language === 'en' ? 'Send Us a Direct Message' : 'Envoyez-nous un Message'}
            </h3>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-xl p-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
                    {language === 'ar' ? 'تم إرسال رسالتك بنجاح!' : language === 'en' ? 'Message Sent Successfully!' : 'Message envoyé avec succès !'}
                  </h4>
                  <p className="text-emerald-600 dark:text-emerald-300 text-sm max-w-md mx-auto">
                    {language === 'ar'
                      ? 'شكراً لتواصلك مع النخبة لتدريس اللغات ELC. سنقوم بمراجعة استفسارك والرد عليك عبر بريدك الإلكتروني أو الاتصال الهاتفي خلال أقل من 12 ساعة.'
                      : language === 'en'
                      ? 'Thank you for contacting Elite Language Center (ELC). We will review your inquiry and get back to you via email or phone within 12 hours.'
                      : 'Merci d\'avoir contacté l\'Elite Language Center (ELC). Nous examinerons votre demande et vous répondrons par e-mail ou téléphone sous 12 heures.'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {language === 'ar' ? 'الاسم الكامل' : language === 'en' ? 'Full Name' : 'Nom Complet'} <span className="text-[#800000]">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none transition text-start"
                        placeholder={language === 'ar' ? 'أدخل اسمك الكريم' : language === 'en' ? 'Enter your full name' : 'Saisissez votre nom'}
                        id="form-name"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {language === 'ar' ? 'البريد الإلكتروني' : language === 'en' ? 'Email Address' : 'Adresse E-mail'} <span className="text-[#800000]">*</span>
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none transition text-start font-mono"
                        placeholder="example@domain.com"
                        id="form-email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {language === 'ar' ? 'رقم الهاتف (اختياري)' : language === 'en' ? 'Phone Number (Optional)' : 'Téléphone (Optionnel)'}
                      </label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none transition text-start font-mono"
                        placeholder="0550 11 22 33"
                        id="form-phone"
                      />
                    </div>
                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-medium">
                        {language === 'ar' ? 'موضوع الرسالة' : language === 'en' ? 'Subject' : 'Sujet'}
                      </label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none transition text-start appearance-none"
                        id="form-subject"
                      >
                        {language === 'ar' ? (
                          <>
                            <option>استفسار عام</option>
                            <option>التسجيل في دورة معينة</option>
                            <option>اختبارات تحديد المستوى</option>
                            <option>طلب خصومات المجموعات</option>
                            <option>شكاوى ومقترحات</option>
                          </>
                        ) : language === 'en' ? (
                          <>
                            <option>General Inquiry</option>
                            <option>Register for a Course</option>
                            <option>Placement Level Testing</option>
                            <option>Group Discount Requests</option>
                            <option>Feedback & Suggestions</option>
                          </>
                        ) : (
                          <>
                            <option>Demande générale</option>
                            <option>S\'inscrire à un cours</option>
                            <option>Test de positionnement</option>
                            <option>Offre pour groupes</option>
                            <option>Suggestions et réclamations</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Message content */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {language === 'ar' ? 'نص الرسالة' : language === 'en' ? 'Message Details' : 'Détails du Message'} <span className="text-[#800000]">*</span>
                    </label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none transition text-start"
                      placeholder={language === 'ar' ? 'اكتب تفاصيل استفسارك هنا وسيجيبك المستشار الأكاديمي...' : language === 'en' ? 'Type your message details here...' : 'Saisissez vos commentaires ou questions ici...'}
                      id="form-message"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3.5 bg-[#800000] hover:bg-[#600000] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2"
                  >
                    <span>
                      {language === 'ar' ? 'أرسل الاستفسار الآن' : language === 'en' ? 'Submit Inquiry Now' : 'Envoyer ma Demande'}
                    </span>
                    <Send className="w-4 h-4 transform rotate-180" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Google Maps Vector/Interactive Mockup */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#002B5B] dark:text-slate-100 flex items-center gap-2">
              <Map className="w-5 h-5 text-[#800000]" />
              <span>
                {language === 'ar' ? 'خريطة الوصول للحرم الأكاديمي' : language === 'en' ? 'Campus Location Map' : 'Plan d\'Accès au Centre'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'ar' 
                ? 'تفضل بزيارتنا للحصول على استشارة تحديد مستوى مجانية مباشرة وجهًا لوجه' 
                : language === 'en' 
                ? 'Visit us in person for a free level advisory and guidance session' 
                : 'Passez nous voir pour un entretien conseil et un test gratuit de niveau'}
            </p>
          </div>
        </div>

        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
          {/* Aesthetic Map Grid Vector Mockup */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-[radial-gradient(#800000_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Map roads mock */}
          <div className="absolute inset-0 p-4 overflow-hidden pointer-events-none">
            <div className="w-full h-1 bg-slate-300 dark:bg-slate-800 absolute top-1/3 left-0 transform rotate-12" />
            <div className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 absolute bottom-1/4 left-0 transform -rotate-6" />
            <div className="h-full w-1 bg-slate-300 dark:bg-slate-800 absolute left-1/4 top-0 transform rotate-45" />
            <div className="h-full w-1.5 bg-slate-300 dark:bg-slate-800 absolute right-1/3 top-0 transform -rotate-12" />
          </div>

          {/* Interactive Campus card */}
          <div className="relative z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-2xl max-w-sm text-center space-y-4">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950/50 text-[#800000] rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <MapPin className="w-6 h-6 fill-current" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#800000] bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded">ELC Campus</span>
              <h4 className="font-bold text-[#002B5B] dark:text-slate-100">Elite Language Center</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'ar' ? 'غرداية، الجزائر.' : 'Ghardaia, Algeria.'}<br />
                {language === 'ar' ? 'الرمز الجغرافي: FJRP+7X غرداية' : 'Plus Code: FJRP+7X Ghardaia'}
              </p>
            </div>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Elite+Language+Center+Ghardaia" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#002B5B] hover:bg-[#001F42] text-white text-xs font-semibold rounded-lg transition duration-300"
            >
              <span>{language === 'ar' ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
              <MapPin className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Styled landmarks markers */}
          <div className="absolute top-1/4 right-1/4 flex flex-col items-center opacity-40">
            <div className="px-2 py-1 bg-white dark:bg-slate-800 text-[10px] text-slate-500 rounded border border-slate-100">
              {language === 'ar' ? 'وسط المدينة' : 'City Center'}
            </div>
            <div className="w-2 h-2 bg-slate-400 rounded-full" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 flex flex-col items-center opacity-40">
            <div className="px-2 py-1 bg-white dark:bg-slate-800 text-[10px] text-slate-500 rounded border border-slate-100">
              {language === 'ar' ? 'بني يزقن' : 'Beni Isguen'}
            </div>
            <div className="w-2 h-2 bg-slate-400 rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
};
