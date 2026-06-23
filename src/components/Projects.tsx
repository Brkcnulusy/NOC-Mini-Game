import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Activity, MonitorSmartphone } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
);

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const projectList = [
    {
      id: 'junior-sysadmin-lab',
      title: 'Junior SysAdmin Monitoring Dashboard',
      description: t('projects.sysadmin.desc'),
      features: t('projects.sysadmin.features', { returnObjects: true }) as string[],
      repoUrl: 'https://github.com/Brkcnulusy/Junior-SysAdmin-Lab',
      icon: Activity
    },
    {
      id: 'noc-l1-support-lab',
      title: 'NOC / L1 Support Home Lab',
      description: t('projects.noc.desc'),
      features: t('projects.noc.features', { returnObjects: true }) as string[],
      repoUrl: 'https://github.com/Brkcnulusy/noc-l1-support-lab',
      icon: MonitorSmartphone
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-12 min-h-[80vh]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sys-indigo to-cyan-400 dark:from-sys-neon dark:to-blue-500 inline-block">
          {t('nav.projects')}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projectList.map((project, idx) => {
          const Icon = project.icon;
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="flex flex-col h-full p-8 rounded-3xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-shadow"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-sys-indigo/20 dark:bg-sys-neon/20 rounded-full blur-3xl group-hover:bg-sys-indigo/30 dark:group-hover:bg-sys-neon/30 transition-colors" />

              <div className="mb-6 inline-flex p-4 rounded-2xl bg-black/5 dark:bg-white/5 text-sys-indigo dark:text-sys-neon w-fit">
                <Icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 flex-grow mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">{t('projects.featuresTitle')}</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sys-indigo dark:bg-sys-neon" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-sys-indigo dark:hover:bg-sys-neon hover:text-white transition-all"
              >
                <GithubIcon className="w-5 h-5" />
                {t('projects.viewRepo')}
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
