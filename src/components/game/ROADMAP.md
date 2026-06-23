# NOC Simülatörü - Proje Yol Haritası (ROADMAP)

Bu doküman, belirlenen Proje İş Kuralları çerçevesinde oyunun geliştirileceği adımları ve görevleri (TODO listesi) listeler.

---

## Faz 1: Altyapı ve Veri Hazırlığı
- [x] Oyun klasör yapısının modüler hale getirilmesi (`types/`, `data/`, `hooks/`, `components/`).
- [x] TypeScript veri modellerinin (`src/components/game/types/game.ts`) hazırlanması.
- [x] Alarmlar veritabanının (`src/components/game/data/gameAlarms.ts`) zenginleştirilerek 24 adet çift dilli alarm senaryosunun yazılması.
- [x] Proje kuralları (`PROJECT_RULES.md`) ve yol haritası (`ROADMAP.md`) dosyalarının oluşturulması.

---

## Faz 2: Ses Dosyalarının Dahil Edilmesi
- [ ] Oyun içi sesler için telifsiz/açık kaynak ses varlıklarının bulunması ve `public/sounds/` klasörüne eklenmesi:
  - `bg_music_tension.mp3` (Gerilim fon müziği)
  - `clock_ticking.mp3` (Geri sayım tıkırtısı)
  - `heart_lost.mp3` (Can kaybetme efekti)
  - `game_over.mp3` (Oyun bitiş efekti)
  - `success.mp3` (Başarı efekti)
- [ ] Ses oynatma mekanizmasının oyun motoruna entegre edilmesi ve ses açıp kapatma (Mute/Unmute) düğmesinin eklenmesi.

---

## Faz 3: Gelişmiş Oyun Motoru (useGameEngine) Geliştirilmesi
- [ ] Zamanlayıcı kontrolü:
  - [ ] Her alarm için bağımsız geri sayım sayaçları.
  - [ ] Süreler duraklatıldığında (pause) sayaçların dondurulması.
- [ ] Can ve Skor kontrol mantığı:
  - [ ] 3 can limiti kontrolü.
  - [ ] Can kaybetme durumunun tetiklenmesi ve hata sebebi mesajının (`errorReason`) saklanması.
  - [ ] Puanlama algoritmasının işletilmesi.
- [ ] Duraklatma (Pause) ve Oyunu Sonlandırma (End Game) fonksiyonlarının eklenmesi.
- [ ] P1 öncelik kuralının (kuyrukta P1 varken diğer alarmların kilitlenmesi) hook seviyesinde doğrulanması.

---

## Faz 4: Stitch.ai Arayüz Tasarımı ve Şablon Kodlama
- [ ] Yazılan Stitch.ai promptu kullanılarak oyun ekranı (`Dashboard.tsx`) arayüz düzeninin tasarlanması.
- [ ] Tasarımın responsive CSS grid ve flexbox kullanılarak şablon kodunun (`Dashboard.tsx` içine) yazılması.
- [ ] Geri Dön (Back), Duraklat (Pause) ve Oyunu Sonlandır (End Game) butonlarının arayüze yerleştirilmesi.

---

## Faz 5: Can Kaybetme ve Odaklanma (Blur) Animasyonları
- [ ] Can kaybı durumunda tüm ekranın blurlaşması / kararması ve odağın sadece can animasyonuna geçmesi.
- [ ] Ekranın ortasına zoomlanan kalpler (Heart) animasyonu:
  - [ ] Kalplerin zoomlanarak gelmesi.
  - [ ] En sağdaki kalbin titreyerek ortadan ikiye kırılması ve grileşmesi.
  - [ ] Kırılan kalbin küçülerek uzaklaşıp yerine dönmesi.
- [ ] Kalplerin altında hatanın nedenini belirten Türkçe ve İngilizce hata mesajının gösterilmesi.

---

## Faz 6: CMD Terminal Prosedür Uygulama Arayüzü
- [ ] "Prosedürü Uygula" butonuna basıldığında ekranın ortasına zoomlanarak açılan CMD Popup bileşeninin yazılması.
- [ ] CMD ekranı açıldığında tüm alarm sürelerinin dondurulması.
- [ ] Seçilen adımları temsil eden komutların terminale sırayla yazılması simülasyonu.
- [ ] Komut çıktılarının kontrolü:
  - [ ] Doğruysa yeşil başarı mesajı yazılması, CMD'nin kapanıp alarmın çözülmesi.
  - [ ] Yanlışsa kırmızı hata mesajı verilmesi, CMD'nin kapanıp Can Kaybetme Animasyonunun tetiklenmesi.

---

## Faz 7: Entegrasyon, Test ve Derleme Doğrulaması
- [ ] Tüm fazlardaki seslerin, animasyonların ve CMD ekranının birbirleriyle entegre çalışmasının test edilmesi.
- [ ] Geri dönüldüğünde sürelerin donması ve aktif oyunun korunması kurallarının doğrulanması.
- [ ] `npm run build` ile TypeScript derlemesinin doğrulanması ve sıfır hata ile tamamlanması.
- [ ] Ana portföy sitesine kopyalanıp test edilmesi.
