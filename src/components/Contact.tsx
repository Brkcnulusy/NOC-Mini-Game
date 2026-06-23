import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const contactInfo = [
    { icon: Mail, label: t('contact.email'), value: 'brkcnulusy@gmail.com', href: 'mailto:brkcnulusy@gmail.com' },
    { icon: Phone, label: t('contact.phone'), value: '0543 208 96 57', href: 'tel:+905432089657' },
    { icon: MapPin, label: t('contact.location'), value: 'İstanbul, Türkiye', href: 'https://maps.google.com/?q=Istanbul,Turkey' },
  ];

  const socialLinks = [
    { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/burak-can-ulusoy-375120272', label: 'LinkedIn' },
    { icon: GithubIcon, href: 'https://github.com/Brkcnulusy', label: 'GitHub' },
    { icon: Mail, href: 'mailto:brkcnulusy@gmail.com', label: 'Email' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-12 min-h-[80vh] flex flex-col items-center">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-10 md:p-16 shadow-2xl backdrop-blur-md mb-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sys-neon via-sys-indigo to-purple-500" />
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight">
          {t('contact.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <a 
                key={idx}
                href={info.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
              >
                <div className="p-4 rounded-full bg-sys-indigo/10 dark:bg-sys-neon/10 text-sys-indigo dark:text-sys-neon mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">{info.label}</h3>
                <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{info.value}</p>
              </a>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-6">
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-sys-indigo hover:text-white dark:hover:bg-sys-neon dark:hover:text-black transition-all hover:-translate-y-1 shadow-md"
              >
                <Icon className="w-8 h-8" />
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Map Integration */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full min-h-[350px] h-[400px] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl bg-slate-100 dark:bg-slate-900"
      >
        <iframe 
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.7932742918!2d28.8720967399564!3d41.00549580970966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2sIstanbul%2C%20T%C3%BCrkiye!5e0!3m2!1sen!2sus!4v1718712345678!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'contrast(1.2) opacity(0.8)' }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="dark:invert dark:hue-rotate-180" // Simple trick to make Google Maps dark mode compatible
        />
      </motion.div>
    </div>
  );
};

export default Contact;
