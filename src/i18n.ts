import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About Me',
        skills: 'Tech Stack',
        projects: 'Projects',
        contact: 'Contact',
        game: 'NOC Game',
      },
      hero: {
        hello: 'Hello!',
        description: 'Hi, I am Burak Can Ulusoy a passionate self-taught IT Support Specialist.',
        dragToExplore: 'Drag and hold the icon to explore',
      },
      about: {
        title: 'About Me',
        subtitle: 'IT Support',
        shortDesc: 'A passionate self-taught IT Support Specialist.',
        tabs: {
          overview: 'Overview',
          skills: 'Skills',
          stats: 'Stats',
          education: 'Education',
          hobbies: 'Hobbies',
        },
        storyText:
          "I am on a journey from the software world into systems and infrastructure management. I love exploring the backstage of computer systems, their complex inner workings, and chasing the question: 'What is the root cause of this problem?' Combining this lifelong curiosity with the satisfaction of troubleshooting structural challenges, I continuously learn by building, breaking, and reconstructing labs.",
        educationItems: [
          { school: 'Düzce University', degree: 'Construction Technology', years: '2019-2022', score: '3.08 GPA' },
          { school: 'Anadolu University', degree: 'Computer Programming', years: '2022-2024', score: '2.75 GPA' },
        ],
        courses: [
          'Basic GNU-Linux Training',
          'Network Fundamentals Training',
          'Basic Network Training',
          'Algorithm Development & Intro to Programming',
          'Modern Web Development Course',
        ],
        hobbiesItems: ['Football', 'Swimming', 'Volleyball', 'F1', 'Nature Hiking'],
      },
      projects: {
        viewRepo: 'View Repository',
        featuresTitle: 'FEATURES / HIGHLIGHTS',
        sysadmin: {
          name: 'System Administration & Shell Scripting Labs',
          desc: 'A modern, real-time monitoring dashboard tracking system resources and critical services of a Linux server, built as a hands-on sysadmin learning lab.',
          features: [
            'Real-time System Metrics',
            'Service Monitoring (Nginx, SSH, UFW)',
            'Automated Data Injection',
            'Professional Terminal Logs',
          ],
        },
        noc: {
          name: 'NOC Monitoring Solutions',
          desc: 'A personal learning lab documenting my journey into NOC and L1 IT Support. All configurations, troubleshooting scenarios, and projects are hands-on and self-hosted.',
          features: [
            'Windows Server 2022 + Active Directory',
            'Ticketing System (Planned)',
            'Network Monitoring (Planned)',
          ],
        },
      },
      contact: {
        title: 'Contact Information',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
      },
      game: {
        title: 'NOC Simulator',
        landing: {
          subtitle: '> Initialize NOC environment. Test your troubleshooting skills under pressure.',
          awaiting: '> System Ready. Awaiting user input_'
        },
        lives: 'Lives',
        level: 'Level',
        priority: {
          P1: 'Critical',
          P2: 'High',
          P3: 'Medium',
          P4: 'Low',
        },
        gameOver: 'Game Over!',
        gameWon: 'Level Cleared!',
        restart: 'Restart Simulation',
        nextLevel: 'Next Level',
        start: 'Start Simulation',
        back: 'Back',
        execute: 'Execute Procedure',
        steps: 'Resolution Steps (Drag & Drop)',
        rules: {
          title: 'Rules of Engagement',
          r1: 'Prioritize Critical (P1) alerts first.',
          r2: 'Sequence troubleshooting steps correctly.',
          r3: 'You have 3 lives. Use them wisely.',
          r4: 'Watch the timer!',
          r5: 'Click the left screen to resolve alarms.'
        },
        score: 'SCORE',
        time: 'TIME',
        alerts: 'ACTIVE ALERTS',
        sequenceTitle: 'TROUBLESHOOTING SEQUENCE',
        terminal: {
          resolving: 'Executing procedure...',
          success: 'RESOLUTION APPLIED SUCCESSFULLY',
          failed: 'PROCEDURE FAILED'
        },
        status: {
          critical: 'CRITICAL',
          warning: 'WARNING',
          stable: 'STABLE'
        }
      },
    },
  },
  tr: {
    translation: {
      nav: {
        home: 'Ana Sayfa',
        about: 'Hakkımda',
        skills: 'Yetenekler',
        projects: 'Projeler',
        contact: 'İletişim',
        game: 'NOC Oyunu',
      },
      hero: {
        hello: 'Merhaba!',
        description: 'Merhaba, ben Burak Can Ulusoy, tutkulu ve kendi kendini yetiştirmiş bir BT Destek Uzmanıyım.',
        dragToExplore: 'Keşfetmek için ikona basılı tutun ve sürükleyin',
      },
      about: {
        title: 'Hakkımda',
        subtitle: 'BT Destek',
        shortDesc: 'Kendi kendini yetiştirmiş bir BT Destek Uzmanıyım.',
        tabs: {
          overview: 'Genel Bakış',
          skills: 'Yetenekler',
          stats: 'İstatistikler',
          education: 'Eğitim',
          hobbies: 'Hobiler',
        },
        storyText:
          'Yazılım dünyasından sistem ve altyapı yönetimine uzanan bir serüvendeyim. Bilgisayar sistemlerinin mutfağını, arkada dönen karmaşık işleyişi ve "Bu probleme yol açan asıl sebep ne?" sorusunun peşinden gitmeyi seviyorum. Çocukluğumdan beri bitmeyen bu keşfetme merakını, karşılaştığım altyapısal problemleri çözmenin verdiği hazla birleştiriyor; laboratuvar ortamında sistemleri kırıp dökerek ve yeniden inşa ederek öğrenmeye devam ediyorum.',
        educationItems: [
          { school: 'Düzce Üniversitesi', degree: 'İnşaat Teknolojisi', years: '2019-2022', score: '3.08 Ortalama' },
          { school: 'Anadolu Üniversitesi', degree: 'Bilgisayar Programcılığı', years: '2022-2024', score: '2.75 Ortalama' },
        ],
        courses: [
          'Temel GNU - Linux Eğitimi',
          'Ağ (Network) Temelleri Eğitimi',
          'Temel Network Eğitimi',
          'Algoritma Geliştirme ve Programlamaya Giriş',
          'Modern Web Geliştirme Kursu',
        ],
        hobbiesItems: ['Futbol', 'Yüzme', 'Voleybol', 'F1', 'Doğa Gezisi'],
      },
      projects: {
        viewRepo: 'Depoyu Görüntüle',
        featuresTitle: 'ÖZELLİKLER / ÖNE ÇIKANLAR',
        sysadmin: {
          name: 'System Administration & Shell Scripting Labs',
          desc: 'Bir Linux sunucusunun sistem kaynaklarını ve kritik servislerini anlık olarak takip eden, modern ve kullanıcı dostu izleme paneli — uygulamalı sysadmin öğrenme laboratuvarı.',
          features: [
            'Anlık Sistem Metrikleri',
            'Servis Denetimi (Nginx, SSH, UFW)',
            'Otomatik Veri Enjeksiyonu',
            'Profesyonel Terminal Logları',
          ],
        },
        noc: {
          name: 'NOC Monitoring Solutions',
          desc: 'NOC ve L1 IT Destek yolculuğumu belgeleyen kişisel eğitim laboratuvarım. Tüm yapılandırmalar, sorun giderme senaryoları ve projeler uygulamalı ve kendi altyapımda çalışmaktadır.',
          features: [
            'Windows Server 2022 + Active Directory',
            'Ticket Sistemi (Planlandı)',
            'Ağ İzleme (Planlandı)',
          ],
        },
      },
      contact: {
        title: 'İletişim Bilgileri',
        email: 'E-posta',
        phone: 'Telefon',
        location: 'Konum',
      },
      game: {
        title: 'NOC Simülatörü',
        landing: {
          subtitle: '> NOC ortamı başlatılıyor. Sorun giderme becerilerinizi baskı altında test edin.',
          awaiting: '> Sistem Hazır. Kullanıcı girişi bekleniyor_'
        },
        lives: 'Can',
        level: 'Seviye',
        priority: {
          P1: 'Kritik',
          P2: 'Yüksek',
          P3: 'Orta',
          P4: 'Düşük',
        },
        gameOver: 'Oyun Bitti!',
        gameWon: 'Seviye Geçildi!',
        restart: 'Simülasyonu Yeniden Başlat',
        nextLevel: 'Sonraki Seviye',
        start: 'Simülasyonu Başlat',
        back: 'Geri Dön',
        execute: 'Prosedürü Uygula',
        steps: 'Çözüm Adımları (Sürükle & Bırak)',
        rules: {
          title: 'Müdahale Kuralları',
          r1: 'Öncelikle Kritik (P1) alarmlara müdahale et.',
          r2: 'Çözüm adımlarını doğru sıraya koy.',
          r3: '3 canın var. Akıllıca kullan.',
          r4: 'Zamana dikkat et!',
          r5: 'Alarmları çözmek için soldaki ekrana tıkla.'
        },
        score: 'SKOR',
        time: 'ZAMAN',
        alerts: 'AKTİF ALARMLAR',
        sequenceTitle: 'SORUN GİDERME SIRALAMASI',
        terminal: {
          resolving: 'Prosedür uygulanıyor...',
          success: 'ÇÖZÜM BAŞARIYLA UYGULANDI',
          failed: 'PROSEDÜR BAŞARISIZ'
        },
        status: {
          critical: 'KRİTİK',
          warning: 'UYARI',
          stable: 'STABİL'
        }
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
