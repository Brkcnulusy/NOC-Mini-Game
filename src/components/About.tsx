import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Terminal, Shield, Network, Server, Database, Code, BookOpen,
  Medal, Target, Monitor, BarChart3, AlertTriangle, FileCode2
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const About: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [repoData, setRepoData] = useState<any[]>([]);
  const [languageStats, setLanguageStats] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'stats' && repoData.length === 0) {
      fetch('https://api.github.com/users/Brkcnulusy/repos?per_page=100')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setRepoData(data);
            const langMap: Record<string, number> = {};
            data.forEach(repo => {
              if (repo.language) {
                langMap[repo.language] = (langMap[repo.language] || 0) + 1;
              }
            });
            const stats = Object.entries(langMap)
              .map(([name, value]) => ({ name, value }))
              .sort((a, b) => b.value - a.value);
            setLanguageStats(stats);
          }
        })
        .catch(err => console.error('GitHub API error:', err));
    }
  }, [activeTab, repoData.length]);

  /* ── Tab definitions ──────────────────────────────────────────────────── */
  const tabs = [
    { id: 'overview',  label: t('about.tabs.overview') },
    { id: 'skills',    label: t('about.tabs.skills') },
    { id: 'stats',     label: t('about.tabs.stats') },
    { id: 'education', label: t('about.tabs.education') },
    { id: 'hobbies',   label: t('about.tabs.hobbies') },
  ];

  /* ── Skill data ───────────────────────────────────────────────────────── */
  const skillData = [
    { name: 'JavaScript',                    value: 75, icon: FileCode2,     level: 'İyi Seviye' },
    { name: 'HTML5 & CSS3',                  value: 75, icon: Code,          level: 'İyi Seviye' },
    { name: 'Windows Server (AD, DNS)',      value: 60, icon: Server,        level: 'Orta Seviye' },
    { name: 'Bash Scripting',                value: 55, icon: Terminal,      level: 'Orta Seviye' },
    { name: 'Linux (Ubuntu/Debian)',         value: 40, icon: Monitor,       level: 'Orta Seviye' },
    { name: 'Networking (Cisco CCNA)',       value: 40, icon: Network,       level: 'Temel Seviye' },
    { name: 'DNS Management (Bind9)',        value: 30, icon: Database,      level: 'Temel Seviye' },
    { name: 'IT Security / Firewall (UFW)', value: 30, icon: Shield,        level: 'Temel Seviye' },
    { name: 'SLA & Incident Management',    value: 25, icon: AlertTriangle,  level: 'Giriş Seviyesi' },
    { name: 'System Monitoring (Zabbix)',   value: 15, icon: BarChart3,      level: 'Giriş Seviyesi' },
    { name: 'Ticketing Systems (Jira)',     value: 15, icon: BookOpen,       level: 'Giriş Seviyesi' },
  ];

  const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042','#8884d8','#ffc658','#4f46e5','#00f3ff'];

  const repoDescriptions: Record<string, string> = {
    Shell: 'System Administration & Shell Scripting Labs',
    Python: 'NOC Monitoring Solutions',
  };
  const enrichedLanguageStats = languageStats.map(item => ({
    ...item,
    description: repoDescriptions[item.name] ?? item.name,
  }));

  /* ── Level → color mapping for skill cards ──────────────────────────── */
  const levelColor = (level: string) => {
    if (level.includes('İyi'))   return 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10';
    if (level.includes('Orta'))  return 'text-blue-500 dark:text-blue-400 bg-blue-500/10';
    if (level.includes('Temel')) return 'text-amber-500 dark:text-amber-400 bg-amber-500/10';
    return 'text-slate-500 dark:text-slate-400 bg-slate-500/10'; // Giriş
  };

  /* ═══════════════════════════════════════════════════════════════════════ */
  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-12 pt-6 pb-12 min-h-[80vh] flex flex-col">

      {/* ─── FIXED HEADER (always visible) ─────────────────────────────── */}
      <div className="mb-6 text-left">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sys-indigo to-cyan-400 dark:from-sys-neon dark:to-blue-500 mb-1">
          {t('about.title')}
        </h2>
        <h3 className="text-base md:text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
          {t('about.subtitle')}
        </h3>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl flex items-start gap-2">
          <span className="text-sys-indigo dark:text-sys-neon font-bold mt-0.5">•</span>
          {t('about.shortDesc')}
        </p>
      </div>

      {/* ─── TAB BAR ───────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1 mb-8 border-b border-gray-200/60 dark:border-gray-700/60 pb-0">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-5 py-2.5 text-sm font-semibold rounded-t-xl transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-sys-indigo to-cyan-500 text-white font-bold shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ─── DYNAMIC CONTENT ───────────────────────────────────────────── */}
      <div className="w-full flex-1">
        <AnimatePresence mode="wait">

          {/* ── OVERVIEW ────────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl"
            >
              <div className="p-8 rounded-3xl bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 shadow-lg backdrop-blur-sm">
                <p className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  {t('about.storyText')}
                </p>
              </div>
            </motion.div>
          )}

          {/* ── SKILLS (card-based, no progress bars) ───────────────────── */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {skillData.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-sys-indigo/40 dark:hover:border-sys-neon/40 transition-all"
                  >
                    <div className="p-2.5 bg-sys-indigo/10 dark:bg-sys-neon/10 rounded-xl text-sys-indigo dark:text-sys-neon flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold truncate">{skill.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${levelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        <span className="text-xs font-bold text-slate-400">%{skill.value}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* ── STATS ───────────────────────────────────────────────────── */}
          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full space-y-8"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold">GitHub Repository Analysis</h3>
                <p className="text-slate-500 text-sm mt-1">Data fetched live from GitHub API · user: Brkcnulusy</p>
              </div>

              {enrichedLanguageStats.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pie Chart */}
                  <div className="p-6 rounded-3xl bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 shadow-lg flex flex-col items-center">
                    <h4 className="text-base font-bold mb-4">Language Distribution</h4>
                    <div className="w-full h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={enrichedLanguageStats} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                            {enrichedLanguageStats.map((_e, i) => (
                              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.85)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '12px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(_v: any, name: any) => [enrichedLanguageStats.find(s => s.name === name)?.description ?? name, '']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="p-6 rounded-3xl bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 shadow-lg flex flex-col items-center">
                    <h4 className="text-base font-bold mb-4">Repository Count by Language</h4>
                    <div className="w-full h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={enrichedLanguageStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} />
                          <YAxis tick={{ fill: '#888', fontSize: 12 }} />
                          <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.85)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '12px' }}
                            formatter={(value: any, _name: any, props: any) => { const desc = props?.payload?.description ?? _name; return [value, desc]; }}
                          />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {enrichedLanguageStats.map((_e, i) => (
                              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sys-indigo dark:border-sys-neon" />
                </div>
              )}
            </motion.div>
          )}

          {/* ── EDUCATION ───────────────────────────────────────────────── */}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <BookOpen className="text-sys-indigo dark:text-sys-neon" />
                  {t('about.tabs.education')}
                </h3>
                {(t('about.educationItems', { returnObjects: true }) as any[]).map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 shadow-lg border-l-4 border-l-sys-indigo dark:border-l-sys-neon">
                    <h4 className="text-lg font-bold">{item.school}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">{item.degree}</p>
                    <div className="flex justify-between mt-4 text-sm font-medium">
                      <span className="px-3 py-1 bg-black/5 dark:bg-white/10 rounded-md">{item.years}</span>
                      <span className="px-3 py-1 bg-sys-indigo/10 dark:bg-sys-neon/10 text-sys-indigo dark:text-sys-neon rounded-md">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <Target className="text-sys-indigo dark:text-sys-neon" />
                  Courses & Certifications
                </h3>
                <ul className="space-y-3">
                  {(t('about.courses', { returnObjects: true }) as string[]).map((course, idx) => (
                    <li key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/30 dark:bg-black/30 border border-gray-100 dark:border-gray-800 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <Medal className="w-5 h-5 text-sys-indigo dark:text-sys-neon flex-shrink-0" />
                      <span className="font-medium text-sm">{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* ── HOBBIES ─────────────────────────────────────────────────── */}
          {activeTab === 'hobbies' && (
            <motion.div
              key="hobbies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {(t('about.hobbiesItems', { returnObjects: true }) as string[]).map((hobby, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center justify-center w-36 h-36 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl"
                >
                  <span className="text-lg font-bold text-center p-4">{hobby}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default About;
