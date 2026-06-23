export type Priority = 'P1' | 'P2' | 'P3' | 'P4';

export interface ResolutionStep {
  id: string;
  text: { en: string; tr: string };
}

export interface AlarmData {
  id: string;
  priority: Priority;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  correctOrder: string[]; // Array of step IDs
  steps: ResolutionStep[];
}

// 20 Alarms Pool
export const ALARM_DB: AlarmData[] = [
  // --- P1 (CRITICAL) ---
  {
    id: 'p1_core_switch',
    priority: 'P1',
    title: { en: 'Core Switch Offline', tr: 'Core Switch Çevrimdışı' },
    description: { en: 'Main datacenter switch is unresponsive.', tr: 'Ana veri merkezi switch cihazı yanıt vermiyor.' },
    correctOrder: ['step_ping', 'step_ssh', 'step_console', 'step_dispatch'],
    steps: [
      { id: 'step_ssh', text: { en: 'Attempt remote SSH', tr: 'Uzaktan SSH bağlantısı dene' } },
      { id: 'step_console', text: { en: 'Check out-of-band management console', tr: 'OOB yönetim konsolunu kontrol et' } },
      { id: 'step_dispatch', text: { en: 'Dispatch remote hands to datacenter', tr: 'Veri merkezine saha ekibi yönlendir' } },
      { id: 'step_ping', text: { en: 'Verify reachability via Ping', tr: 'Ping ile erişilebilirliği doğrula' } },
    ]
  },
  {
    id: 'p1_db_down',
    priority: 'P1',
    title: { en: 'Database Unreachable', tr: 'Veritabanına Erişilemiyor' },
    description: { en: 'Main production database is rejecting connections.', tr: 'Ana canlı veritabanı bağlantıları reddediyor.' },
    correctOrder: ['step_service', 'step_logs', 'step_restart', 'step_escalate'],
    steps: [
      { id: 'step_escalate', text: { en: 'Escalate to DBA team', tr: 'DBA (Veritabanı Yönetici) ekibine ilet' } },
      { id: 'step_restart', text: { en: 'Restart Database Service', tr: 'Veritabanı servisini yeniden başlat' } },
      { id: 'step_service', text: { en: 'Check DB service status', tr: 'Veritabanı servis durumunu kontrol et' } },
      { id: 'step_logs', text: { en: 'Review database error logs', tr: 'Veritabanı hata loglarını incele' } },
    ]
  },
  {
    id: 'p1_dns_fail',
    priority: 'P1',
    title: { en: 'Global DNS Failure', tr: 'Küresel DNS Çökmesi' },
    description: { en: 'Internal DNS resolution is failing across all subnets.', tr: 'Tüm alt ağlarda iç DNS çözümlemesi başarısız.' },
    correctOrder: ['step_nslookup', 'step_bind', 'step_flush', 'step_announce'],
    steps: [
      { id: 'step_announce', text: { en: 'Send global outage announcement', tr: 'Genel kesinti duyurusu gönder' } },
      { id: 'step_bind', text: { en: 'Restart BIND/DNS services', tr: 'BIND/DNS servislerini yeniden başlat' } },
      { id: 'step_nslookup', text: { en: 'Run nslookup tests locally', tr: 'Lokalde nslookup testleri çalıştır' } },
      { id: 'step_flush', text: { en: 'Flush DNS cache on core routers', tr: 'Ana routerlarda DNS önbelleğini temizle' } },
    ]
  },
  {
    id: 'p1_fw_crash',
    priority: 'P1',
    title: { en: 'Edge Firewall Crash', tr: 'Edge Firewall Çökmesi' },
    description: { en: 'Primary edge firewall stopped routing traffic.', tr: 'Birincil dış ağ güvenlik duvarı trafiği kesti.' },
    correctOrder: ['step_verify_failover', 'step_force_ha', 'step_pcap', 'step_vendor'],
    steps: [
      { id: 'step_vendor', text: { en: 'Open Sev 1 ticket with vendor', tr: 'Üreticiye Sev 1 destek talebi aç' } },
      { id: 'step_verify_failover', text: { en: 'Verify HA failover status', tr: 'HA failover durumunu doğrula' } },
      { id: 'step_pcap', text: { en: 'Capture traffic (pcap) for analysis', tr: 'Analiz için trafik yakala (pcap)' } },
      { id: 'step_force_ha', text: { en: 'Force manual HA failover', tr: 'Manuel HA failover tetikle' } },
    ]
  },
  {
    id: 'p1_storage_offline',
    priority: 'P1',
    title: { en: 'SAN Storage Array Offline', tr: 'SAN Depolama Çevrimdışı' },
    description: { en: 'Multiple hypervisors lost connection to LUNs.', tr: 'Çoklu hipervizörlerin LUN bağlantısı koptu.' },
    correctOrder: ['step_san_ping', 'step_fiber', 'step_controller', 'step_restore'],
    steps: [
      { id: 'step_restore', text: { en: 'Initialize emergency VM recovery', tr: 'Acil sanal makine kurtarmayı başlat' } },
      { id: 'step_controller', text: { en: 'Check storage controller health', tr: 'Depolama kontrolcüsü sağlığını kontrol et' } },
      { id: 'step_san_ping', text: { en: 'Ping SAN management IP', tr: 'SAN yönetim IP adresine ping at' } },
      { id: 'step_fiber', text: { en: 'Verify Fiber Channel switch links', tr: 'Fiber Channel switch linklerini doğrula' } },
    ]
  },

  // --- P2 (HIGH) ---
  {
    id: 'p2_high_cpu',
    priority: 'P2',
    title: { en: 'High CPU on Web Server', tr: 'Web Sunucusunda Yüksek CPU' },
    description: { en: 'Web server CPU usage exceeded 95% for 5 minutes.', tr: 'Web sunucusu CPU kullanımı 5 dakikadır %95 üzeri.' },
    correctOrder: ['step_top', 'step_kill', 'step_monitor'],
    steps: [
      { id: 'step_monitor', text: { en: 'Monitor load for 5 minutes', tr: 'Yükü 5 dakika boyunca izle' } },
      { id: 'step_kill', text: { en: 'Kill zombie/stuck processes', tr: 'Askıda kalan (zombie) işlemleri sonlandır' } },
      { id: 'step_top', text: { en: 'Run top/htop to identify process', tr: 'İşlemi tespit etmek için top/htop çalıştır' } },
    ]
  },
  {
    id: 'p2_disk_full',
    priority: 'P2',
    title: { en: 'Disk Space Critical', tr: 'Kritik Disk Alanı' },
    description: { en: 'Filesystem /var/log is at 99% capacity.', tr: '/var/log dosya sistemi %99 dolulukta.' },
    correctOrder: ['step_df', 'step_du', 'step_truncate'],
    steps: [
      { id: 'step_truncate', text: { en: 'Truncate or rotate old logs', tr: 'Eski logları temizle veya rotate et' } },
      { id: 'step_df', text: { en: 'Run df -h to verify disk usage', tr: 'Disk kullanımını doğrulamak için df -h çalıştır' } },
      { id: 'step_du', text: { en: 'Find largest files with du -sh', tr: 'du -sh ile en büyük dosyaları bul' } },
    ]
  },
  {
    id: 'p2_memory_leak',
    priority: 'P2',
    title: { en: 'Memory Leak Detected', tr: 'Bellek Sızıntısı Tespit Edildi' },
    description: { en: 'Application server RAM usage growing linearly without GC.', tr: 'Uygulama sunucusu RAM kullanımı GC olmadan lineer artıyor.' },
    correctOrder: ['step_free', 'step_heap', 'step_restart_app', 'step_dev'],
    steps: [
      { id: 'step_dev', text: { en: 'Send heap dump to Dev team', tr: 'Yığın dökümünü Geliştirici ekibine gönder' } },
      { id: 'step_restart_app', text: { en: 'Gracefully restart application pool', tr: 'Uygulama havuzunu güvenlice yeniden başlat' } },
      { id: 'step_free', text: { en: 'Run free -m to check RAM state', tr: 'RAM durumunu görmek için free -m çalıştır' } },
      { id: 'step_heap', text: { en: 'Generate JVM heap dump', tr: 'JVM yığın dökümü (heap dump) oluştur' } },
    ]
  },
  {
    id: 'p2_ssl_expire',
    priority: 'P2',
    title: { en: 'SSL Certificate Expiring', tr: 'SSL Sertifikası Sona Eriyor' },
    description: { en: 'Wildcard SSL certificate expires in 24 hours.', tr: 'Wildcard SSL sertifikasının süresi 24 saat içinde doluyor.' },
    correctOrder: ['step_certinfo', 'step_renew', 'step_deploy', 'step_verify_ssl'],
    steps: [
      { id: 'step_deploy', text: { en: 'Deploy new cert to load balancers', tr: 'Yeni sertifikayı yük dengeleyicilere dağıt' } },
      { id: 'step_verify_ssl', text: { en: 'Verify chain with SSLLabs/curl', tr: 'SSLLabs/curl ile sertifika zincirini doğrula' } },
      { id: 'step_renew', text: { en: 'Request renewal from CA', tr: 'CA üzerinden yenileme talep et' } },
      { id: 'step_certinfo', text: { en: 'Check exact expiration date', tr: 'Tam bitiş tarihini kontrol et' } },
    ]
  },
  {
    id: 'p2_lb_failover',
    priority: 'P2',
    title: { en: 'Load Balancer Failover', tr: 'Yük Dengeleyici Yedeğe Geçişi' },
    description: { en: 'Primary load balancer node switched to standby.', tr: 'Birincil yük dengeleyici düğümü yedek (standby) duruma geçti.' },
    correctOrder: ['step_lb_logs', 'step_health', 'step_sync', 'step_failback'],
    steps: [
      { id: 'step_sync', text: { en: 'Verify config sync between nodes', tr: 'Düğümler arası config senkronizasyonunu doğrula' } },
      { id: 'step_failback', text: { en: 'Schedule manual failback window', tr: 'Manuel geri dönüş (failback) penceresi planla' } },
      { id: 'step_lb_logs', text: { en: 'Check failover event logs', tr: 'Yedeğe geçiş (failover) loglarını incele' } },
      { id: 'step_health', text: { en: 'Check backend server health metrics', tr: 'Arka uç sunucu sağlık metriklerini kontrol et' } },
    ]
  },

  // --- P3 (MEDIUM) ---
  {
    id: 'p3_backup_fail',
    priority: 'P3',
    title: { en: 'Backup Job Failed', tr: 'Yedekleme İşlemi Başarısız' },
    description: { en: 'Daily incremental backup job reported an error.', tr: 'Günlük artımlı yedekleme görevi hata verdi.' },
    correctOrder: ['step_check_job', 'step_storage', 'step_rerun'],
    steps: [
      { id: 'step_rerun', text: { en: 'Manually re-trigger backup job', tr: 'Yedekleme görevini manuel tetikle' } },
      { id: 'step_storage', text: { en: 'Check backup storage capacity', tr: 'Yedekleme depolama alanını kontrol et' } },
      { id: 'step_check_job', text: { en: 'Review backup job logs', tr: 'Yedekleme görev loglarını incele' } },
    ]
  },
  {
    id: 'p3_vpn_latency',
    priority: 'P3',
    title: { en: 'High VPN Latency', tr: 'Yüksek VPN Gecikmesi' },
    description: { en: 'Users reporting slow connections to the VPN gateway.', tr: 'Kullanıcılar VPN ağ geçidine yavaş bağlantı bildiriyor.' },
    correctOrder: ['step_mtr', 'step_isp', 'step_notify'],
    steps: [
      { id: 'step_notify', text: { en: 'Notify users of degraded performance', tr: 'Kullanıcılara performans düşüklüğünü bildir' } },
      { id: 'step_isp', text: { en: 'Check ISP routing status', tr: 'ISP yönlendirme durumunu kontrol et' } },
      { id: 'step_mtr', text: { en: 'Run MTR to check packet loss', tr: 'Paket kaybını görmek için MTR çalıştır' } },
    ]
  },
  {
    id: 'p3_ntp_sync',
    priority: 'P3',
    title: { en: 'NTP Sync Lost', tr: 'NTP Senkronizasyon Kaybı' },
    description: { en: 'Server clock drift exceeded 500ms.', tr: 'Sunucu saat sapması 500ms sınırını aştı.' },
    correctOrder: ['step_ntpq', 'step_ntp_restart', 'step_hwclock'],
    steps: [
      { id: 'step_hwclock', text: { en: 'Sync hardware clock to system', tr: 'Donanım saatini sistem saatiyle eşitle' } },
      { id: 'step_ntp_restart', text: { en: 'Restart NTP/Chrony service', tr: 'NTP/Chrony servisini yeniden başlat' } },
      { id: 'step_ntpq', text: { en: 'Run ntpq -p to view peers', tr: 'NTP eşlerini görmek için ntpq -p çalıştır' } },
    ]
  },
  {
    id: 'p3_raid_degraded',
    priority: 'P3',
    title: { en: 'RAID Array Degraded', tr: 'RAID Kümesi Bozuldu' },
    description: { en: 'Disk 3 in RAID 5 array marked as failed.', tr: 'RAID 5 kümesindeki Disk 3 arızalı olarak işaretlendi.' },
    correctOrder: ['step_megacli', 'step_smart', 'step_order_disk', 'step_hotspare'],
    steps: [
      { id: 'step_smart', text: { en: 'Check SMART data for faulty disk', tr: 'Hatalı disk için SMART verilerini kontrol et' } },
      { id: 'step_order_disk', text: { en: 'Order replacement drive', tr: 'Yedek disk siparişi ver' } },
      { id: 'step_hotspare', text: { en: 'Assign global hot spare', tr: 'Global yedek diski (hot spare) ata' } },
      { id: 'step_megacli', text: { en: 'Check RAID controller status', tr: 'RAID kontrolcü durumunu kontrol et' } },
    ]
  },
  {
    id: 'p3_log_rotation',
    priority: 'P3',
    title: { en: 'Log Rotation Failed', tr: 'Log Rotate Başarısız' },
    description: { en: 'Logrotate cron job failed to compress /var/log/messages.', tr: 'Logrotate cron görevi /var/log/messages sıkıştırmasını başaramadı.' },
    correctOrder: ['step_cronlog', 'step_permissions', 'step_logrotate_f'],
    steps: [
      { id: 'step_permissions', text: { en: 'Check directory permissions', tr: 'Dizin izinlerini kontrol et' } },
      { id: 'step_logrotate_f', text: { en: 'Run logrotate -f manually', tr: 'logrotate -f komutunu manuel çalıştır' } },
      { id: 'step_cronlog', text: { en: 'Review cron execution logs', tr: 'Cron çalıştırma loglarını incele' } },
    ]
  },

  // --- P4 (LOW) ---
  {
    id: 'p4_test_server',
    priority: 'P4',
    title: { en: 'Test Server Offline', tr: 'Test Sunucusu Çevrimdışı' },
    description: { en: 'A non-production QA server is not pinging.', tr: 'Canlı olmayan bir QA sunucusu ping almıyor.' },
    correctOrder: ['step_jira', 'step_reboot_vm'],
    steps: [
      { id: 'step_reboot_vm', text: { en: 'Restart VM via hypervisor', tr: 'Hipervizör üzerinden sanal makineyi yeniden başlat' } },
      { id: 'step_jira', text: { en: 'Check Jira for planned maintenance', tr: 'Planlı bakım için Jira kayıtlarına bak' } },
    ]
  },
  {
    id: 'p4_printer',
    priority: 'P4',
    title: { en: 'Office Printer Error', tr: 'Ofis Yazıcısı Hatası' },
    description: { en: 'HQ Floor 2 printer is showing offline.', tr: 'Merkez Ofis 2. Kat yazıcısı çevrimdışı görünüyor.' },
    correctOrder: ['step_spooler', 'step_ticket'],
    steps: [
      { id: 'step_ticket', text: { en: 'Assign ticket to local IT', tr: 'Talebi yerel IT ekibine ata' } },
      { id: 'step_spooler', text: { en: 'Restart Print Spooler service', tr: 'Print Spooler servisini yeniden başlat' } },
    ]
  },
  {
    id: 'p4_dev_vm',
    priority: 'P4',
    title: { en: 'Dev VM Unreachable', tr: 'Geliştirici Sanal Makinesi Ulaşılamaz' },
    description: { en: 'Developer cannot SSH into their sandbox VM.', tr: 'Geliştirici korumalı alan sanal makinesine SSH yapamıyor.' },
    correctOrder: ['step_vnc', 'step_sshd', 'step_inform_dev'],
    steps: [
      { id: 'step_inform_dev', text: { en: 'Inform developer of resolution', tr: 'Geliştiriciye çözüm hakkında bilgi ver' } },
      { id: 'step_vnc', text: { en: 'Connect via VNC console', tr: 'VNC konsolu üzerinden bağlan' } },
      { id: 'step_sshd', text: { en: 'Verify sshd is running', tr: 'sshd servisinin çalıştığını doğrula' } },
    ]
  },
  {
    id: 'p4_av_issue',
    priority: 'P4',
    title: { en: 'Conf Room AV Issue', tr: 'Toplantı Odası AV Sorunu' },
    description: { en: 'Projector in Room C is not detecting inputs.', tr: 'C Odasındaki projektör görüntü girişlerini algılamıyor.' },
    correctOrder: ['step_helpdesk', 'step_cable', 'step_reboot_av'],
    steps: [
      { id: 'step_cable', text: { en: 'Ask user to re-plug HDMI', tr: 'Kullanıcıdan HDMI kablosunu takıp çıkarmasını iste' } },
      { id: 'step_reboot_av', text: { en: 'Power cycle AV equipment remotely', tr: 'AV ekipmanını uzaktan yeniden başlat' } },
      { id: 'step_helpdesk', text: { en: 'Log call in Helpdesk system', tr: 'Çağrıyı Helpdesk sistemine kaydet' } },
    ]
  },
  {
    id: 'p4_badge_reader',
    priority: 'P4',
    title: { en: 'Badge Reader Offline', tr: 'Kart Okuyucu Çevrimdışı' },
    description: { en: 'East Entrance door reader lost network connection.', tr: 'Doğu Girişi kapı okuyucusu ağ bağlantısını kaybetti.' },
    correctOrder: ['step_poe', 'step_ping_reader', 'step_facilities'],
    steps: [
      { id: 'step_facilities', text: { en: 'Notify Facilities management', tr: 'Bina Yönetimine haber ver' } },
      { id: 'step_ping_reader', text: { en: 'Ping reader IP address', tr: 'Okuyucu IP adresine ping at' } },
      { id: 'step_poe', text: { en: 'Bounce PoE switch port', tr: 'PoE switch portunu kapatıp aç (bounce)' } },
    ]
  }
];

export interface LevelConfig {
  id: number;
  pool: { [key in Priority]?: number }; // How many of each priority to spawn
  timeSeconds: number; // Total time for the level
}

export const LEVELS: LevelConfig[] = [
  { id: 1, pool: { P4: 1 }, timeSeconds: 60 },
  { id: 2, pool: { P2: 1, P4: 1 }, timeSeconds: 75 },
  { id: 3, pool: { P1: 1, P3: 1, P4: 1 }, timeSeconds: 90 },
  { id: 4, pool: { P1: 1, P2: 1, P3: 1, P4: 1 }, timeSeconds: 90 },
  { id: 5, pool: { P1: 2, P2: 1, P3: 1, P4: 1 }, timeSeconds: 120 },
];
