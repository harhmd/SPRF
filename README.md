# SPRF - Sistem Pengurusan Risiko FAMA

**Sistem Pengurusan Risiko FAMA (SPRF)** adalah platform pemantauan dan analisis risiko agromakanan berasaskan metodologi kuantitatif moden (Quantitative Risk Assessment - QRA). Platform ini menggantikan matriks risiko kualitatif tradisional 5×5 dengan ukuran berangka empirikal:

- **Expected Monetary Value (EMV):** Mengukur pendedahan kewangan kasar (Inherent) vs pendedahan bersih (Residual) selepas kawalan.
- **Return on Mitigation Investment (RoMI):** Menjustifikasikan peruntukan belanjawan intervensi agromakanan.
- **95% Value at Risk (VaR):** Mengawal selera risiko agregat rantaian bekalan.
- **Key Risk Indicators (KRI) Masa-Nyata:** Pemantauan telemetri IoT rantaian sejuk, penampan bekalan komoditi asasi, dan kawalan GPL sempadan.
- **Model Pengurusan Halangan Bowtie (Barrier Integrity Management):** Visualisasi pencegahan ancaman (*Preventive Barriers*) dan pemulihan impak (*Mitigating Barriers*).

---

## Modul Utama

1. **Ringkasan Portfolio (Overview):** Metrik kewangan EMV, RoMI, 95% VaR, graf perbandingan pendedahan risiko, dan suapan telemetri KRI.
2. **Model EMV & VaR:** Analisis kuantitatif terperinci setiap risiko mengikut inisiatif strategik FAMA.
3. **KRI Telemetri:** Pemantauan had ambang amaran (Hijau, Kuning, Merah) dengan simulasi masa-nyata.
4. **Pengurusan Bowtie:** Pemetaan struktur ancaman, peristiwa utama (*Top Event*), dan halangan integriti.
5. **Daftar Risiko Kuantitatif (Risk Register):** Paparan data tabular dengan carian, penapisan kategori, serta eksport fail CSV.

---

## Teknologi

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React, Recharts
- **Build Tool:** Vite
- **Web Server:** Nginx (Alpine Linux)
- **Deployment:** Docker & Coolify VPS orchestration

---

## Pembangunan Setempat (Local Development)

```bash
# Pasang dependensi
npm install

# Jalankan pelayan pembangunan
npm run dev

# Bina untuk produksi
npm run build
```

---

## Penerapan Docker (Docker Deployment)

```bash
# Bina imej docker
docker build -t sprf .

# Jalankan kontena pada port 80
docker run -d -p 80:80 --name sprf sprf
```

---

Dikuasakan oleh **FAMA Malaysia** &bull; Hak Cipta Terpelihara.
