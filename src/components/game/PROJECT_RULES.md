# NOC Simülatörü - Proje İş Kuralları (Project Business Rules)

Bu doküman, NOC Simülatörü projesinin mimari standartlarını, entegrasyon kurallarını, görsel/işitsel yönergelerini ve oyun mekaniği standartlarını tanımlar.

---

## 1. Mimari ve Entegrasyon Kuralları
1. **Sıfır Bağımlılıkla Entegrasyon (Modülerlik):**
   * Tüm oyun kodları, veri dosyaları, tipler, kancalar (hooks) ve alt bileşenler yalnızca `src/components/game/` klasörü altında bulunmalıdır.
   * Ana sitenin (portföy sitesi) çalışmasını bozacak hiçbir global değişiklik yapılmamalıdır.
2. **Kütüphane Sınırı:**
   * Projenin `package.json` dosyasında halihazırda bulunan paketler (`react`, `framer-motion`, `lucide-react`, `i18next`, `tailwindcss`) dışında dışarıdan ek bir npm kütüphanesi kurulmayacaktır.
3. **Dil ve Yerelleştirme Desteği (i18n):**
   * Arayüzdeki tüm metinler `i18n.ts` yerelleştirme dosyası üzerinden (çift dilli TR/EN) okunacaktır.
   * Alarmlar, çözümler ve hata mesajları gibi dinamik veriler veri dosyasında `{ tr: "...", en: "..." }` formatında çift dilli tutulacaktır.
4. **Performans ve Derleme Güvenliği:**
   * Kodlama esnasında hiçbir TypeScript veya ESLint hatasına izin verilmeyecektir. Her adımdan sonra `npm run build` ile doğrulama yapılacaktır.

---

## 2. Görsel ve Animasyon Kuralları
1. **Can Kaybetme Animasyonu (Zoom & Break):**
   * Oyuncu can kaybettiğinde (hatalı sıralama veya süre aşımı), canları temsil eden kalpler (Heart) ekranın ortasına zoomlanacaktır.
   * En sağdaki aktif kalp titreyerek (shake) ortadan ikiye kırılacaktır.
   * Kırılan kalbin rengi grileşecek (gray-out) ve küçülerek ekrandan uzaklaşıp eski pozisyonuna geri dönecektir.
2. **Odaklama (Blur/Darken) Efekti:**
   * Can kaybı animasyonu devreye girdiğinde, can göstergesi hariç arka plandaki tüm oyun paneli (Dashboard) kararacak ve/veya blurlaşacaktır. Focus tamamen kalplerin üzerinde olacaktır.
3. **Hata Açıklama Mesajı:**
   * Kalp animasyonu ekranın ortasında oynatılırken, hatanın neden kaynaklandığını (örneğin: "P1 alarmı varken P2'ye müdahale edildi", "Yanlış adım sıralaması" veya "Süre doldu") belirten açıklayıcı bir uyarı metni (TR/EN) ekranda belirecektir.

---

## 3. Ses ve Müzik Kuralları
1. **Ses Efektleri (SFX):**
   * Alarmların geri sayım süreleri kritik seviyeye (örneğin son 10 saniye) geldiğinde ritmik bir **saat tıkırtısı (ticking)** sesi çalacaktır.
   * Yanlış müdahalede ve can kaybında **hata/can kaybı ses efekti** çalacaktır.
   * Canlar tükenip oyun bittiğinde **Game Over ses efekti** çalacaktır.
2. **Arka Plan Müziği (BGM):**
   * Oyun boyunca çalan, atmosferi destekleyen ve gerilimi artıran bir **siberpunk/gerilim fon müziği** entegre edilecektir. Müzik isteğe göre açılıp kapatılabilecektir.

---

## 4. CMD Terminal Prosedür Uygulama Kuralları
1. **CMD Arayüzü Popup Penceresi:**
   * "Prosedürü Uygula" butonuna basıldığında, ekranın ortasına retro bir **CMD (Command Prompt)** ekranı zoomlanarak açılacaktır.
2. **Zamanın Durdurulması (Pause on Execute):**
   * CMD ekranı açıldığı anda alarmların geri sayım süreleri **duracaktır (pause)**.
3. **Komut Satırı Simülasyonu:**
   * CMD ekranında, oyuncunun seçtiği çözüm adımlarını temsil eden sahte sistem komutları (örn: `ping -c 4 10.0.0.1`, `systemctl restart nginx`) satır satır otomatik olarak yazılacak ve enterlanacaktır.
4. **Sonuç Kontrolü:**
   * **Doğruysa:** CMD ekranında yeşil renkle "İşlem Başarılı / Operation Successful" yazacak, ekran kapanacak, alarm listeden silinecek ve süreler kaldığı yerden devam edecektir (seviye bitmediyse).
   * **Yanlışsa:** CMD ekranında kırmızı renkle "ERROR / ACCESS DENIED" yazacak, ardından ekran kapanıp can kaybı animasyonu ve hata mesajı tetiklenecektir.

---

## 5. Duraklatma, Geri Dönme ve Oyunu Bitirme Kuralları
1. **Geri Dön (Back) Butonu:**
   * Her oyun ekranında bir "Geri Dön" butonu olacaktır.
   * Geri dönüldüğünde süreler ve oyun **duraklatılacaktır (pause)**.
2. **Aktif Oyunu Koruma:**
   * Hali hazırda devam eden bir oyun varken oyuncunun yeni bir oyun başlatmasına izin verilmeyecektir.
3. **Oyunu Bitir (End Game) Butonu:**
   * Oyunu tamamen sonlandırmak için bir **"Oyunu Bitir"** butonu eklenecektir. Bu butona basılmadan başka bir oyuna geçilmeyecektir.

---

## 6. Oyun Müdahale ve Öncelik Kuralları
1. **P1 (Kritik) Öncelik Kuralı:**
   * Sistemde aktif en az bir P1 (Kritik) alarmı varken, oyuncunun P2, P3 veya P4 seviyesindeki alarmlara tıklaması veya müdahale etmesi engellenmeyecektir (kilitlenmeyecektir).
   * Ancak oyuncu, kuyrukta çözülmemiş bir P1 alarmı varken başka bir seviyedeki alarma müdahale etmeye veya onu çözmeye kalkışırsa **doğrudan 1 Can kaybedecektir** ve ekranda buna dair bir hata açıklaması görünecektir.

---

## 7. Stitch.ai Tasarım & Prompt Kılavuzu
Oyun ekranının arayüz yerleşimi Stitch.ai kullanılarak tasarlanacaktır. Stitch.ai tasarımı için kullanılacak **görsel prompt taslağı** aşağıda tanımlanmıştır:

```text
Prompt: A highly premium, futuristic cyberpunk style Network Operations Center (NOC) dashboard game user interface.
Color Palette: HSL tailored neon cyber-green (#14fac8), deep system indigo (#4f46e5), vibrant warning orange (#f97316), and glowing warning red (#ef4444) on a very dark glassmorphism semi-transparent black background.
Layout:
- Top Stats Bar: Minimalist cyber-pill containers displaying Level, Score, and 3 glowing Heart icons. Includes a Pause and "End Game" buttons.
- Main Section divided in 2 columns:
  1. Left Column (35% width): Active Alerts list. Each alert is a sleek card showing a priority badge (P1-P4), a ticking seconds timer, and a progress bar. P1 alerts have an intense pulsing red glow.
  2. Right Column (65% width): Active workspace showing details of the selected alert, a pool of available steps represented as glowing code pills, a sequenced steps drop area with ordered numbers, and a large neon-glowing "EXECUTE PROCEDURE" trigger button.
- Bottom Section: A retro command-line output log window with a clean Monospace font showing system output logs.
All panels should have thin borders (#1f2937) and subtle cybernetic line grid backgrounds to match the provided cropped monitor image background.
```
