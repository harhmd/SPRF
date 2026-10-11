import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Filter,
  Plus,
  Search,
  ChevronRight,
  CheckCircle2,
  Clock,
  Layers,
  FileSpreadsheet,
  RefreshCw,
  Sliders,
  User,
  Calendar,
  X,
  LayoutDashboard,
  Grid3X3,
  FileText,
  Building,
  Check,
  BadgeAlert,
  Activity,
  Gauge,
  Thermometer,
  Box,
  Truck,
  ShieldX,
  ArrowRight,
  Info,
  ExternalLink,
  CloudRain,
  Sun,
  Landmark,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  PieChart as PieIcon,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';

export interface BowtieItem {
  hazard: string;
  topEvent: string;
  preventiveBarriers: { title: string; score: number }[];
  mitigationBarriers: { title: string; score: number }[];
  impacts: string[];
}

export interface RiskOpportunityItem {
  id: string; // R-FAMA-xx or P-FAMA-xx
  type: 'RISK' | 'OPPORTUNITY';
  title: string;
  category: string;
  mandate: 'Menyelaras Pelan Risiko' | 'Kesinambungan Operasi' | 'Pelaporan & Audit Dalam';
  mandateCitation: { text: string; url: string }[];
  owner: string;
  strategy: 'Avoid' | 'Transfer' | 'Mitigate' | 'Accept' | 'Exploit' | 'Share' | 'Enhance' | 'Ignore';
  status: 'Completed' | 'In Progress' | 'Behind Schedule' | 'Under Review';
  actionStatus: 'Telah Diambil Tindakan' | 'Sedang Diambil Tindakan' | 'Tidak Diambil Tindakan';
  
  // Matrix Coordinates (Scale 1 - 10)
  impactPre: number; // Paksi-X (1-10)
  likelihoodPre: number; // Paksi-Y (1-10)
  impactPost: number; // Paksi-X selepas rawatan
  likelihoodPost: number; // Paksi-Y selepas rawatan
  
  // Quantitative Financials (RM)
  financialLossRM: number; // For risk or financial gain for opportunity
  mitigationCostRM: number;
  confidenceVaR95: number;
  dueDate: string;
  progress: number;
  
  // Bow-Tie Model
  bowtie?: BowtieItem;
  treatmentPlan: string[];
}

export interface KRIItem {
  id: string;
  name: string;
  category: string;
  linkedMandate: string;
  unit: string;
  currentValue: number;
  greenLimit: number;
  amberLimit: number;
  isInverse?: boolean;
  status: 'GREEN' | 'AMBER' | 'RED';
  frequency: string;
  lastUpdate: string;
  description: string;
}

const CATEGORIES = [
  'Pasar Tani & Runcit Agro',
  'Rangkaian PPL & Rantaian Sejuk',
  'Jualan Agro MADANI & Intervensi',
  'Ladang Kontrak & Hasil Segar',
  'Agrofood & Penjenamaan AGROMAS',
  'Regulatori GPL & Kualiti',
  'Aset & Stor Utama FAMA',
  'Tadbir Urus & Audit Lembaga'
];

const INITIAL_DATA: RiskOpportunityItem[] = [
  // --- RISIKO (-VE) ---
  {
    id: 'R-FAMA-01',
    type: 'RISK',
    title: 'Defisit Stok Penampan & Volatiliti Harga Komoditi Asasi (Jualan Agro MADANI)',
    category: 'Jualan Agro MADANI & Intervensi',
    mandate: 'Kesinambungan Operasi',
    mandateCitation: [
      {
        text: 'Astro AWANI: FAMA Tubuh Jawatankuasa Tingkat Stok Makanan Hadapi El Niño',
        url: 'https://www.astroawani.com/berita-malaysia/fama-tubuh-jawatankuasa-tingkat-stok-makanan-hadapi-el-nino'
      },
      {
        text: 'FAMA FB: Pengurusan Stok Penampan Kebangsaan',
        url: 'https://www.facebook.com/FAMA.Malaysia/posts/1453131836857104/'
      }
    ],
    owner: 'En. Hishamuddin (Bhg. Pemasaran Segar & Intervensi)',
    strategy: 'Mitigate',
    status: 'In Progress',
    actionStatus: 'Sedang Diambil Tindakan',
    impactPre: 8,
    likelihoodPre: 9,
    impactPost: 6,
    likelihoodPost: 4,
    financialLossRM: 6500000,
    mitigationCostRM: 450000,
    confidenceVaR95: 2150000,
    dueDate: '2026-11-20',
    progress: 75,
    bowtie: {
      hazard: 'Volatiliti Pasaran Global, Krisis Bekalan & Fenomena Kemarau El Niño',
      topEvent: 'Defisit Stok Penampan Bawang, Minyak Masak & Telur Ayam di Pasaran Domestik',
      preventiveBarriers: [
        { title: 'Kontrak Hadapan Pembekal Tempatan 60 Hari', score: 4 },
        { title: 'Pelepasan Stok Penampan Terperingkat', score: 4 },
        { title: 'Subsidi Logistik Pengangkutan FAMA', score: 3 }
      ],
      mitigationBarriers: [
        { title: 'Pengaktifan 120 Tapak Jualan Agro MADANI Pantas', score: 5 },
        { title: 'Mobilisasi Kargo Hab RTC Gopeng & RTC Pasir Puteh', score: 4 }
      ],
      impacts: [
        'Kenaikan harga barangan asas pengguna',
        'Teguran audit dan ketidakcapaian KPI sekuriti makanan',
        'Gangguan rantaian bekalan agromakanan negara'
      ]
    },
    treatmentPlan: [
      'Kunci kuota off-take pembekal tempatan 60 hari lebih awal untuk 1,200 tan metrik stok penampan.',
      'Laksanakan mobilisasi kargo antara-negeri di bawah Jawatankuasa Khas Kesiapsiagaan Stok Makanan.',
      'Sediakan laporan impak harga mingguan kepada Pengurusan Tertinggi FAMA.'
    ]
  },
  {
    id: 'R-FAMA-02',
    type: 'RISK',
    title: 'Kerosakan Pemampat Bilik Sejuk Hab PPL Cameron Highlands & Nilai',
    category: 'Rangkaian PPL & Rantaian Sejuk',
    mandate: 'Kesinambungan Operasi',
    mandateCitation: [
      {
        text: 'Astro AWANI: Kesiapsiagaan Rantaian Bekalan & Fenomena El Niño',
        url: 'https://www.astroawani.com/berita-malaysia/fama-tubuh-jawatankuasa-tingkat-stok-makanan-hadapi-el-nino'
      }
    ],
    owner: 'Pn. Rohana Ramli (Bhg. Logistik & Rantaian Bekalan)',
    strategy: 'Mitigate',
    status: 'Behind Schedule',
    actionStatus: 'Sedang Diambil Tindakan',
    impactPre: 8,
    likelihoodPre: 7,
    impactPost: 6,
    likelihoodPost: 3,
    financialLossRM: 3200000,
    mitigationCostRM: 180000,
    confidenceVaR95: 1100000,
    dueDate: '2026-10-31',
    progress: 45,
    bowtie: {
      hazard: 'Gelombang Haba Ekstrem El Niño & Lebihan Beban Tenaga Elektrik Komersial',
      topEvent: 'Kenaikan Suhu Bilik Sejuk (>4°C) Menyebabkan Kerosakan Sayur Segar Berskala Besar',
      preventiveBarriers: [
        { title: 'Sistem Dwi-Pemampat Inverter Sandaran', score: 4 },
        { title: 'Pemasangan Sensor Telemetri Pintar IoT 24/7', score: 4 },
        { title: 'Genset Automatik 15-Saat Siap Siaga', score: 3 }
      ],
      mitigationBarriers: [
        { title: 'Treler Sejuk Beku Mudah Alih 40-Kaki', score: 4 },
        { title: 'Pengalihan Pantas Stok ke PPBBS Batu Kurau', score: 4 }
      ],
      impacts: [
        'Kerosakan sayuran segar bernilai tinggi',
        'Kerugian perolehan kerajaan & kos hapus kira',
        'Teguran audit pengurusan fasiliti sejuk'
      ]
    },
    treatmentPlan: [
      'Pemasangan sensor telemetri suhu IoT dengan penggera amaran automatik terus ke telefon pegawai bertugas.',
      'Sewa treler sejuk beku kecemasan 40 kaki sebagai sandaran aktif semasa musim kemarau.',
      'Jadual penyelenggaraan berkala dwi-mingguan untuk semua unit kondenser.'
    ]
  },
  {
    id: 'R-FAMA-03',
    type: 'RISK',
    title: 'Kemusnahan Tanaman Sayuran Ladang Kontrak Akibat Fenomena Cuaca Ekstrem (El Niño / Monsun)',
    category: 'Ladang Kontrak & Hasil Segar',
    mandate: 'Kesinambungan Operasi',
    mandateCitation: [
      {
        text: 'Astro AWANI: Kesiapsiagaan Bencana & El Niño FAMA',
        url: 'https://www.astroawani.com/berita-malaysia/fama-tubuh-jawatankuasa-tingkat-stok-makanan-hadapi-el-nino'
      }
    ],
    owner: 'Ir. Zulkifli (Bhg. Ladang Kontrak & Pengembangan)',
    strategy: 'Transfer',
    status: 'In Progress',
    actionStatus: 'Sedang Diambil Tindakan',
    impactPre: 8,
    likelihoodPre: 8,
    impactPost: 5,
    likelihoodPost: 3,
    financialLossRM: 4800000,
    mitigationCostRM: 320000,
    confidenceVaR95: 1650000,
    dueDate: '2026-12-15',
    progress: 60,
    bowtie: {
      hazard: 'Kemarau Panjang El Niño & Hujan Lebat Monsun Timur Laut (La Niña)',
      topEvent: 'Kemusnahan Skala Luas Ladang Kontrak & Defisit Penuaian Sayuran Segar',
      preventiveBarriers: [
        { title: 'Jadual Giliran Tanaman Luar Musim Berperingkat', score: 4 },
        { title: 'Geran Terowong Lindungan Hujan (Rain Shelters)', score: 3 },
        { title: 'Sistem Fertigasi Tertutup Berkecekapan Tinggi', score: 4 }
      ],
      mitigationBarriers: [
        { title: 'Skim Takaful Agromakanan KPKM', score: 5 },
        { title: 'Mobilisasi Pembekal Alternatif Pantai Barat & Sabah', score: 4 }
      ],
      impacts: [
        'Petani kontrak menanggung kerugian modal',
        'Kekurangan penawaran hasil segar di Pasar Tani',
        'Pampasan kerosakan bencana agromakanan'
      ]
    },
    treatmentPlan: [
      'Pendaftaran mandatori semua peserta Ladang Kontrak FAMA ke bawah Skim Takaful Agromakanan KPKM.',
      'Penyusunan zon penanaman berjadual mengikut kalendar cuaca ramalan METMalaysia.',
      'Penyediaan stok benih dan baja sandaran kecemasan melalui Tabung Bencana Agromakanan.'
    ]
  },
  {
    id: 'R-FAMA-04',
    type: 'RISK',
    title: 'Penolakan Konsainan Kontena Durian Beku AGROMAS di Pintu Masuk Eksport (Piawaian GACC)',
    category: 'Agrofood & Penjenamaan AGROMAS',
    mandate: 'Menyelaras Pelan Risiko',
    mandateCitation: [
      {
        text: 'FAMA Gov: Bengkel Pembangunan Pelan Pengurusan Risiko FAMA Bersama MAMPU',
        url: 'https://www.fama.gov.my/web/pub/gambar/-/asset_publisher/Li0C7t69bLDU/content/18-hingga-20-julai-2022-isnin-hingga-rabu-bengkel-pembangunan-pelan-pengurusan-risiko-fama-bersama-mampu-hotel-mercure-selayang-bengkel-ini-dianjurkan?refererPlid=30269'
      }
    ],
    owner: 'Dr. Noraini Othman (Ketua Pegawai FAMACORP / AGROMAS)',
    strategy: 'Avoid',
    status: 'Under Review',
    actionStatus: 'Sedang Diambil Tindakan',
    impactPre: 9,
    likelihoodPre: 6,
    impactPost: 5,
    likelihoodPost: 2,
    financialLossRM: 5400000,
    mitigationCostRM: 260000,
    confidenceVaR95: 1350000,
    dueDate: '2027-01-15',
    progress: 35,
    bowtie: {
      hazard: 'Keretakan Rantaian Beku Rentas Sempadan & Kegagalan Ujian Mikrobiologi GACC',
      topEvent: 'Penahanan & Penolakan Konsainan Kontena Durian Beku di Pelabuhan Eksport',
      preventiveBarriers: [
        { title: 'Pensijilan Pembekuan Nitrogen Cecair -80°C', score: 5 },
        { title: 'Audit Prapemeriksaan Makmal Bertauliah FAMA-MAMPU', score: 4 },
        { title: 'Pemeteraian Kontena Bersuhu IoT Pintar', score: 4 }
      ],
      mitigationBarriers: [
        { title: 'Diversifikasi Pasaran Gantian (UAE, Australia)', score: 4 },
        { title: 'Pemprosesan Hiliran Puree & Pes Durian Segera', score: 4 }
      ],
      impacts: [
        'Kerosakan reputasi jenama Malaysia Best / AGROMAS',
        'Kerugian kos kargo eksport dan penalti pelabuhan',
        'Penggantungan lesen eksport agromakanan'
      ]
    },
    treatmentPlan: [
      'Penaiktarafan kilang pembekuan nitrogen cair di Kompleks Pemprosesan Rengit dan Batu Kurau mengikut pelan MAMPU.',
      'Integrasi sistem data pengesanan suhu masa-nyata dalam setiap kontena reefer rentas sempadan.',
      'Penyediaan protokol lencongan pasaran kecemasan ke rantau Timur Tengah dalam tempoh 48 jam.'
    ]
  },
  {
    id: 'R-FAMA-05',
    type: 'RISK',
    title: 'Ketidakpatuhan Penggredan, Pembungkusan & Pelabelan (GPL) di Pintu Masuk Sempadan',
    category: 'Regulatori GPL & Kualiti',
    mandate: 'Pelaporan & Audit Dalam',
    mandateCitation: [
      {
        text: 'Portal Audit FAMA: Kawalan Dalaman & Jawatankuasa Audit Lembaga',
        url: 'https://auditfama.com/tentang-kami'
      }
    ],
    owner: 'Pn. Farah Nadia (Bhg. Regulatori & Kualiti Standard)',
    strategy: 'Mitigate',
    status: 'Completed',
    actionStatus: 'Telah Diambil Tindakan',
    impactPre: 7,
    likelihoodPre: 6,
    impactPost: 4,
    likelihoodPost: 2,
    financialLossRM: 2100000,
    mitigationCostRM: 110000,
    confidenceVaR95: 680000,
    dueDate: '2026-09-30',
    progress: 100,
    bowtie: {
      hazard: 'Penyeludupan Hasil Segar Sub-Standard, Pemalsuan Label & Dokumen GPL Palsu',
      topEvent: 'Kemasukan Kargo Pertanian Tanpa Label Menggugat Kualiti Pasaran Tempatan',
      preventiveBarriers: [
        { title: 'Penguatkuasaan Digital e-Lesen GPL Bersepadu', score: 5 },
        { title: 'Prapemeriksaan Bersama Agensi MAQIS di Pintu Sempadan', score: 4 },
        { title: 'Audit Kepatuhan Prosedur oleh Bahagian Audit Dalam', score: 4 }
      ],
      mitigationBarriers: [
        { title: 'Sitaan Kuarantin Segera di Kompleks Sempadan', score: 5 },
        { title: 'Pelaporan Terus kepada Jawatankuasa Audit Lembaga', score: 4 }
      ],
      impacts: [
        'Kemasukan perosak dan penyakit tumbuhan berisiko',
        'Penipuan pengguna dengan label gred palsu',
        'Teguran audit tatacara kawalan pintu sempadan'
      ]
    },
    treatmentPlan: [
      'Pelaksanaan sistem imbasan kod QR e-Lesen GPL mandatori di pintu Bukit Kayu Hitam dan Pelabuhan Klang.',
      'Latihan berkala pegawai penguat kuasa bersama pihak MAQIS.',
      'Pembentangan suku tahunan penemuan audit penguatkuasaan kepada Jawatankuasa Audit Lembaga.'
    ]
  },
  {
    id: 'R-FAMA-06',
    type: 'RISK',
    title: 'Kehilangan & Kerosakan Aset Alih Serta Stor Utama FAMA (Pematuhan 1PP & JKPAK)',
    category: 'Aset & Stor Utama FAMA',
    mandate: 'Pelaporan & Audit Dalam',
    mandateCitation: [
      {
        text: 'Portal Rasmi Audit FAMA: Integriti Aset & Audit Tatatertib',
        url: 'https://auditfama.com/tentang-kami'
      },
      {
        text: 'FAMA Gov: Bahagian Perancangan Strategik',
        url: 'https://www.fama.gov.my/fungsi-ps'
      }
    ],
    owner: 'En. Khairul Anuar (Unit Pengurusan Aset & Stor FAMA)',
    strategy: 'Mitigate',
    status: 'In Progress',
    actionStatus: 'Sedang Diambil Tindakan',
    impactPre: 8,
    likelihoodPre: 7,
    impactPost: 5,
    likelihoodPost: 2,
    financialLossRM: 1950000,
    mitigationCostRM: 95000,
    confidenceVaR95: 580000,
    dueDate: '2026-11-30',
    progress: 85,
    bowtie: {
      hazard: 'Kecuaian Kawalan Keluar Masuk, Kelemahan Rekod KEW.PA & Ketiadaan Audit Mengejut',
      topEvent: 'Kehilangan Peralatan Logistik, Bakul Plastik & Aset Sokongan Hab Pemasaran',
      preventiveBarriers: [
        { title: 'Merekodkan Pergerakan Aset Menggunakan KEW.PA 9 / SPS', score: 4 },
        { title: 'Program Kesedaran Tatacara Pengurusan Aset Kerajaan', score: 4 },
        { title: 'Pemasangan Jeriji Keselamatan & Kawalan Berpusat', score: 4 }
      ],
      mitigationBarriers: [
        { title: 'Pemeriksaan Mengejut oleh JKPAK Suku Tahunan', score: 4 },
        { title: 'Pemasangan CCTV & Kad Akses Pintu Stor Utama', score: 5 },
        { title: 'Tindakan Surcaj/Tatatertib jika Berlaku Kecuaian', score: 4 }
      ],
      impacts: [
        'Pembaziran harta kerajaan dan kos penggantian aset',
        'Teguran audit tatakelola aset alih 1PP',
        'Kelewatan operasi logistik pengedaran buah/sayur'
      ]
    },
    treatmentPlan: [
      'Penyelarasan penuh inventori dengan Sistem Pengurusan Stor (SPS) dan tandatangan borang KEW.PA 7 di setiap lokasi.',
      'Penetapan jadual mesyuarat JKPAK setiap 3 bulan bagi membentangkan laporan eksekutif sebelum 15 Mac.',
      'Pemasangan kamera litar tertutup (CCTV) dan kunci pintar di stor simpanan aset bernilai tinggi.'
    ]
  },

  // --- PELUANG (+VE) ---
  {
    id: 'P-FAMA-01',
    type: 'OPPORTUNITY',
    title: 'Meningkatkan Pemantauan Stok & Telemetri IoT Rantaian Sejuk Hab RTC',
    category: 'Rangkaian PPL & Rantaian Sejuk',
    mandate: 'Kesinambungan Operasi',
    mandateCitation: [
      {
        text: 'Astro AWANI: Peningkatan Stok Makanan Hadapi El Niño',
        url: 'https://www.astroawani.com/berita-malaysia/fama-tubuh-jawatankuasa-tingkat-stok-makanan-hadapi-el-nino'
      }
    ],
    owner: 'Pn. Rohana Ramli (Bhg. Logistik & Rantaian Bekalan)',
    strategy: 'Enhance',
    status: 'In Progress',
    actionStatus: 'Telah Diambil Tindakan',
    impactPre: 7,
    likelihoodPre: 7,
    impactPost: 9,
    likelihoodPost: 9,
    financialLossRM: 2800000,
    mitigationCostRM: 140000,
    confidenceVaR95: 0,
    dueDate: '2026-11-30',
    progress: 90,
    treatmentPlan: [
      'Penyepaduan data telemetri bilik sejuk dari semua 14 negeri ke papan pemuka pusat SPRF.',
      'Pengurangan kadar kerosakan pasca-tuai sayuran daripada 15% kepada bawah 3%.',
      'Pemberian amaran automatik kepada pegawai bertugas 15 minit sebelum ambang kritikal dicapai.'
    ]
  },
  {
    id: 'P-FAMA-02',
    type: 'OPPORTUNITY',
    title: 'Memperluas Rangkaian Jualan Agro MADANI Terus Dari Ladang Kontrak (Pintasan Kos Orang Tengah)',
    category: 'Jualan Agro MADANI & Intervensi',
    mandate: 'Kesinambungan Operasi',
    mandateCitation: [
      {
        text: 'FAMA FB: Pengurusan Stok & Intervensi Harga Rakyat',
        url: 'https://www.facebook.com/FAMA.Malaysia/posts/1453131836857104/'
      }
    ],
    owner: 'En. Hishamuddin (Bhg. Pemasaran Segar & Intervensi)',
    strategy: 'Exploit',
    status: 'In Progress',
    actionStatus: 'Telah Diambil Tindakan',
    impactPre: 8,
    likelihoodPre: 6,
    impactPost: 9,
    likelihoodPost: 8,
    financialLossRM: 4500000,
    mitigationCostRM: 210000,
    confidenceVaR95: 0,
    dueDate: '2026-12-31',
    progress: 80,
    treatmentPlan: [
      'Penyasaran 150 tapak Jualan Agro MADANI berjadual tetap di kawasan berpendapatan rendah B40.',
      'Hubungkan 400 usahawan ladang kontrak FAMA terus ke tapak jualan tanpa lapisan pemborong ketiga.',
      'Menawarkan penjimatan harga barangan dapur 10% hingga 30% lebih rendah daripada harga pasaran semasa.'
    ]
  },
  {
    id: 'P-FAMA-03',
    type: 'OPPORTUNITY',
    title: 'Memperkasa Pasaran Eksport Baharu Durian Premium & Pes Agromas ke UAE dan Australia',
    category: 'Agrofood & Penjenamaan AGROMAS',
    mandate: 'Menyelaras Pelan Risiko',
    mandateCitation: [
      {
        text: 'FAMA Gov: Bengkel Pelan Pengurusan Risiko FAMA & MAMPU',
        url: 'https://www.fama.gov.my/web/pub/gambar/-/asset_publisher/Li0C7t69bLDU/content/18-hingga-20-julai-2022-isnin-hingga-rabu-bengkel-pembangunan-pelan-pengurusan-risiko-fama-bersama-mampu-hotel-mercure-selayang-bengkel-ini-dianjurkan?refererPlid=30269'
      }
    ],
    owner: 'Dr. Noraini Othman (Ketua Pegawai FAMACORP / AGROMAS)',
    strategy: 'Exploit',
    status: 'In Progress',
    actionStatus: 'Sedang Diambil Tindakan',
    impactPre: 7,
    likelihoodPre: 6,
    impactPost: 9,
    likelihoodPost: 7,
    financialLossRM: 5100000,
    mitigationCostRM: 190000,
    confidenceVaR95: 0,
    dueDate: '2027-02-28',
    progress: 65,
    treatmentPlan: [
      'Penyertaan dalam Ekspo Agromakanan Gulfood Dubai bagi memperkenalkan produk hiliran durian beku AGROMAS.',
      'Memperoleh sijil Halal JAKIM dan pensijilan biosekuriti antarabangsa bagi meluaskan pasaran Timur Tengah.',
      'Membina perkongsian strategik dengan pengedar pasar raya besar di Australia dan Arab Saudi.'
    ]
  },
  {
    id: 'P-FAMA-04',
    type: 'OPPORTUNITY',
    title: 'Pemerkasaan Tadbir Urus Bersama Bahagian Audit Dalam & Penjajaran Bajet Pembangunan (RoMI)',
    category: 'Tadbir Urus & Audit Lembaga',
    mandate: 'Pelaporan & Audit Dalam',
    mandateCitation: [
      {
        text: 'Portal Rasmi Audit FAMA: Jawatankuasa Audit Lembaga',
        url: 'https://auditfama.com/tentang-kami'
      },
      {
        text: 'FAMA Gov: Bahagian Perancangan Strategik (PS)',
        url: 'https://www.fama.gov.my/fungsi-ps'
      }
    ],
    owner: 'En. Azlan Shah (Bhg. Perancangan Strategik & Bahagian Audit Dalam)',
    strategy: 'Enhance',
    status: 'Completed',
    actionStatus: 'Telah Diambil Tindakan',
    impactPre: 8,
    likelihoodPre: 7,
    impactPost: 9,
    likelihoodPost: 9,
    financialLossRM: 3900000,
    mitigationCostRM: 120000,
    confidenceVaR95: 0,
    dueDate: '2026-10-15',
    progress: 100,
    treatmentPlan: [
      'Menetapkan kriteria penilaian RoMI berasaskan data saintifik bagi setiap permohonan Bajet Pembangunan tahunan.',
      'Pelaporan suku tahunan status tindakan rawatan risiko terus ke Jawatankuasa Audit Lembaga Pengarah FAMA.',
      'Mewujudkan sesi penyelarasan dwi-tahunan antara pemilik risiko dan Bahagian Audit Dalam.'
    ]
  }
];

const INITIAL_KRIS: KRIItem[] = [
  {
    id: 'KRI-TMP-01',
    name: 'Suhu Bilik Sejuk PPL (> 4°C)',
    category: 'Rangkaian PPL & Rantaian Sejuk',
    linkedMandate: 'Kesinambungan Operasi (Kesiapsiagaan Gelombang Haba El Niño)',
    unit: 'Minit Sisihan',
    currentValue: 18,
    greenLimit: 15,
    amberLimit: 45,
    status: 'AMBER',
    frequency: 'Masa Nyata (Setiap 5 minit)',
    lastUpdate: '10 minit lalu',
    description: 'Tempoh sisihan kumulatif suhu bilik sejuk pra-penyejukan melebihi had standard 4°C akibat gelombang haba cuaca ekstrem.'
  },
  {
    id: 'KRI-STK-01',
    name: 'Penampan Bekalan JAM (Days of Inventory)',
    category: 'Jualan Agro MADANI & Intervensi',
    linkedMandate: 'Kesinambungan Operasi (Jawatankuasa Khas Stok Makanan El Niño)',
    unit: 'Hari Bekalan',
    currentValue: 14,
    greenLimit: 21,
    amberLimit: 10,
    isInverse: true,
    status: 'AMBER',
    frequency: 'Harian (Automasi ERP FAMA)',
    lastUpdate: 'Pagi ini, 08:30 AM',
    description: 'Baki hari bekalan komoditi asasi (bawang, telur, minyak masak) dalam simpanan hab kebangsaan bagi mendepani krisis bekalan.'
  },
  {
    id: 'KRI-SUP-01',
    name: 'Ketepatan Pembekal Ladang Kontrak (OTIF)',
    category: 'Ladang Kontrak & Hasil Segar',
    linkedMandate: 'Kesinambungan Operasi (Bencana Cuaca & Takaful Agromakanan)',
    unit: '% On-Time In-Full',
    currentValue: 91.5,
    greenLimit: 95.0,
    amberLimit: 85.0,
    isInverse: true,
    status: 'AMBER',
    frequency: 'Mingguan',
    lastUpdate: 'Semalam',
    description: 'Kadar hasil tanaman kontrak yang dihantar menepati masa dan kuantiti semasa peralihan musim monsun dan kemarau.'
  },
  {
    id: 'KRI-GPL-01',
    name: 'Kadar Penolakan Konsainan GPL Sempadan',
    category: 'Regulatori GPL & Kualiti',
    linkedMandate: 'Pelaporan & Audit Dalam (Pematuhan Standard & Integriti)',
    unit: '% Daripada Jumlah Kargo',
    currentValue: 1.8,
    greenLimit: 2.0,
    amberLimit: 5.0,
    status: 'GREEN',
    frequency: 'Masa Nyata (Sistem e-GPL)',
    lastUpdate: '20 minit lalu',
    description: 'Peratusan kargo segar yang ditahan di pintu masuk sempadan negara akibat label/gred sub-standard dilaporkan kepada Audit Lembaga.'
  }
];

const formatRM = (val: number) => {
  if (val >= 1000000) return `RM ${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `RM ${(val / 1000).toFixed(0)}k`;
  return `RM ${val.toLocaleString()}`;
};

export default function App() {
  const [items, setItems] = useState<RiskOpportunityItem[]>(INITIAL_DATA);
  const [kris, setKris] = useState<KRIItem[]>(INITIAL_KRIS);
  const [selectedItem, setSelectedItem] = useState<RiskOpportunityItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'matrix' | 'bowtie' | 'mandates' | 'register' | 'monitoring'>('overview');
  const [itemTypeFilter, setItemTypeFilter] = useState<'ALL' | 'RISK' | 'OPPORTUNITY'>('ALL');
  const [mandateFilter, setMandateFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTelemetrySimulating, setIsTelemetrySimulating] = useState(false);

  // Filtered dataset
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchType = itemTypeFilter === 'ALL' || item.type === itemTypeFilter;
      const matchMandate = mandateFilter === 'All' || item.mandate === mandateFilter;
      const matchCategory = categoryFilter === 'All' || item.category === categoryFilter;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchMandate && matchCategory && matchSearch;
    });
  }, [items, itemTypeFilter, mandateFilter, categoryFilter, searchQuery]);

  // Portfolio metrics
  const portfolioMetrics = useMemo(() => {
    const riskItems = items.filter(i => i.type === 'RISK');
    const oppItems = items.filter(i => i.type === 'OPPORTUNITY');

    const totalInherentLoss = riskItems.reduce((acc, r) => acc + (r.likelihoodPre * r.impactPre * r.financialLossRM) / 100, 0);
    const totalResidualLoss = riskItems.reduce((acc, r) => acc + (r.likelihoodPost * r.impactPost * r.financialLossRM) / 100, 0);
    const totalMitigationInvestment = items.reduce((acc, i) => acc + i.mitigationCostRM, 0);
    const totalOpportunityGain = oppItems.reduce((acc, o) => acc + (o.likelihoodPost * o.impactPost * o.financialLossRM) / 100, 0);

    const netSavings = totalInherentLoss - totalResidualLoss - totalMitigationInvestment;
    const romi = totalMitigationInvestment > 0 ? (netSavings / totalMitigationInvestment) * 100 : 0;
    const aggregateVaR = riskItems.reduce((acc, r) => acc + r.confidenceVaR95, 0);

    const criticalKri = kris.filter(k => k.status === 'RED').length;
    const warningKri = kris.filter(k => k.status === 'AMBER').length;

    return {
      riskCount: riskItems.length,
      oppCount: oppItems.length,
      totalInherentLoss,
      totalResidualLoss,
      totalOpportunityGain,
      totalMitigationInvestment,
      netSavings,
      romi,
      aggregateVaR,
      criticalKri,
      warningKri
    };
  }, [items, kris]);

  // Effectiveness comparison data for BarChart (Before vs After)
  const cumulativeEffectivenessData = useMemo(() => {
    return items.map((item) => {
      const magPre = item.impactPre * item.likelihoodPre;
      const magPost = item.impactPost * item.likelihoodPost;
      return {
        id: item.id,
        title: item.title,
        type: item.type,
        'Magnitud Asal': magPre,
        'Magnitud Selepas Rawatan': magPost
      };
    });
  }, [items]);

  const handleSimulateTelemetry = () => {
    setIsTelemetrySimulating(true);
    setKris((prev) =>
      prev.map((kri) => {
        if (kri.id === 'KRI-TMP-01') {
          const newVal = Math.min(60, Math.max(10, kri.currentValue + (Math.random() > 0.5 ? 8 : -5)));
          return {
            ...kri,
            currentValue: newVal,
            status: newVal > kri.amberLimit ? 'RED' : newVal > kri.greenLimit ? 'AMBER' : 'GREEN',
            lastUpdate: 'Baru sahaja dikemas kini'
          };
        }
        if (kri.id === 'KRI-STK-01') {
          const newVal = Math.max(8, kri.currentValue + (Math.random() > 0.5 ? 2 : -2));
          return {
            ...kri,
            currentValue: newVal,
            status: newVal < kri.amberLimit ? 'RED' : newVal < kri.greenLimit ? 'AMBER' : 'GREEN',
            lastUpdate: 'Baru sahaja dikemas kini'
          };
        }
        return kri;
      })
    );
    setTimeout(() => setIsTelemetrySimulating(false), 500);
  };

  const exportQuantCSV = () => {
    const headers = [
      'Kod Daftar',
      'Jenis (Risiko/Peluang)',
      'Pernyataan',
      'Kategori',
      'Mandat Tadbir Urus',
      'Pegawai Pemilik',
      'Strategi Tindak Balas',
      'Impak Asal (1-10)',
      'Kebarangkalian Asal (1-10)',
      'Magnitud Asal',
      'Impak Rawatan (1-10)',
      'Kebarangkalian Rawatan (1-10)',
      'Magnitud Rawatan',
      'Nilai Kewangan (RM)',
      'Kos Rawatan (RM)',
      'Status Tindakan'
    ];
    const rows = items.map((i) => [
      i.id,
      i.type,
      `"${i.title.replace(/"/g, '""')}"`,
      `"${i.category}"`,
      `"${i.mandate}"`,
      `"${i.owner}"`,
      i.strategy,
      i.impactPre,
      i.likelihoodPre,
      i.impactPre * i.likelihoodPre,
      i.impactPost,
      i.likelihoodPost,
      i.impactPost * i.likelihoodPost,
      i.financialLossRM,
      i.mitigationCostRM,
      i.actionStatus
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FAMA_Pengurusan_Risiko_Peluang_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-600 selection:text-white pb-24">
      
      {/* Top Header Bar */}
      <header className="border-b border-emerald-100 bg-white/95 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-700 to-green-800 flex items-center justify-center shadow-md shadow-emerald-700/20 text-white shrink-0">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              SPRF &bull; FAMA Malaysia
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                ISO 9001:2015 &amp; MS ISO 31000:2010
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Sistem Pengurusan Risiko &amp; Peluang (7 Langkah Piawaian Kerajaan &bull; Analisis Bow-Tie &bull; Dwi-Matriks 10&times;10)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateTelemetry}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-200 shadow-xs transition active:scale-95"
            title="Kemas kini bacaan sensor IoT secara rawak"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isTelemetrySimulating ? 'animate-spin' : ''}`} />
            Simulasi KRI IoT
          </button>
          <button
            onClick={exportQuantCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow-xs shadow-emerald-600/30 transition transform active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Eksport Laporan Rasmi
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto space-y-6">

        {/* 3 Strategic Mandate Banner */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-green-50/60 border border-emerald-200 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-700" />
                <h2 className="text-sm font-bold text-slate-900">
                  Kerangka Pengurusan Risiko &amp; Peluang Sektor Awam FAMA (MS ISO 31000 / ISO 9001)
                </h2>
              </div>
              <p className="text-xs text-slate-600 max-w-4xl leading-relaxed">
                Penyelarasan menyeluruh merangkumi <strong>7 Langkah Piawaian</strong>: Pengwujudan Konteks (7S/PESTEL), Analisis Bow-Tie, Heat Matrix Berkembar 10&times;10 (Risiko &amp; Peluang), Pelan Tindak Balas, dan Pemantauan Berterusan bersama <strong>Bahagian Audit Dalam</strong> &amp; <strong>Jawatankuasa Audit Lembaga</strong>.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('mandates')}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold text-white shadow-xs transition"
              >
                Lihat 3 Mandat Tadbir Urus &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* 4 Summary Quantitative Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Risiko Dikenalpasti (-VE)</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-rose-600">{portfolioMetrics.riskCount} Rekod</span>
                  <span className="text-xs text-slate-400 font-medium">aktif</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                <ShieldAlert className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Pendedahan Sisa (Residual):</span>
              <span className="font-bold text-emerald-700">{formatRM(portfolioMetrics.totalResidualLoss)}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Peluang Direbut (+VE)</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-emerald-700">{portfolioMetrics.oppCount} Inisiatif</span>
                  <span className="text-xs text-slate-400 font-medium">peluang emas</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Nilai Manfaat Terjana:</span>
              <span className="font-bold text-emerald-700">{formatRM(portfolioMetrics.totalOpportunityGain)}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pulangan Mitigasi (RoMI)</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-emerald-700">+{portfolioMetrics.romi.toFixed(0)}%</span>
                  <span className="text-xs text-slate-400 font-medium">kecekapan</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Penjimatan Bersih:</span>
              <span className="font-bold text-emerald-700">{formatRM(portfolioMetrics.netSavings)}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Telemetri KRI &amp; El Niño</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-slate-900">{kris.length} Sensor</span>
                  <span className="text-xs text-amber-700 font-bold">({portfolioMetrics.warningKri} Amaran)</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Gauge className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Had Selera Risiko:</span>
              <span className="font-bold text-emerald-700">Siling RM10.0M (Terkawal)</span>
            </div>
          </div>

        </div>

        {/* TAB 1: OVERVIEW & CUMULATIVE EFFECTIVENESS */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* 7 Langkah MS ISO 31000 Diagram Bar */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-700" />
                Aliran 7 Langkah Pengurusan Risiko &amp; Peluang (Adaptasi MS ISO 31000:2010)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Langkah 1</span>
                  <p className="font-bold text-slate-900 mt-1">Komunikasi &amp; Konsultansi</p>
                  <span className="text-[10px] text-slate-500 mt-1">Pihak Berkepentingan</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Langkah 2</span>
                  <p className="font-bold text-slate-900 mt-1">Pengwujudan Konteks</p>
                  <span className="text-[10px] text-slate-500 mt-1">7S &amp; PESTEL</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Langkah 3</span>
                  <p className="font-bold text-slate-900 mt-1">Kenalpasti Risiko &amp; Peluang</p>
                  <span className="text-[10px] text-slate-500 mt-1">Kod R &amp; Kod P</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase">Langkah 4</span>
                  <p className="font-bold text-emerald-950 mt-1">Analisis Bow-Tie</p>
                  <span className="text-[10px] text-emerald-800 mt-1">Pencegahan &amp; Mitigasi</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase">Langkah 5</span>
                  <p className="font-bold text-emerald-950 mt-1">Penilaian Dwi-Matriks</p>
                  <span className="text-[10px] text-emerald-800 mt-1">Skala 10&times;10</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Langkah 6</span>
                  <p className="font-bold text-slate-900 mt-1">Pelan Tindak Balas</p>
                  <span className="text-[10px] text-slate-500 mt-1">Rawatan &amp; Peluang</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Langkah 7</span>
                  <p className="font-bold text-slate-900 mt-1">Pemantauan &amp; Kajian</p>
                  <span className="text-[10px] text-slate-500 mt-1">Audit Lembaga</span>
                </div>
              </div>
            </div>

            {/* Cumulative Effectiveness Bar Chart (Before vs After Treatment) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-700" />
                      Penilaian Keberkesanan Rawatan: Magnitud Asal vs. Magnitud Selepas Rawatan
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Formula Magnitud = Impak (1-10) &times; Kebarangkalian (1-10) [Skala 1 - 100]. Risiko (-VE) diturunkan ke zon hijau/kuning; Peluang (+VE) ditingkatkan ke zon impak tinggi.
                    </p>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    Data Kumulatif Penilaian
                  </span>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cumulativeEffectivenessData} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="id" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        formatter={(val: any, name: any) => [`Magnitud: ${val}`, name]}
                      />
                      <Legend />
                      <Bar dataKey="Magnitud Asal" fill="#ef4444" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="Magnitud Selepas Rawatan" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick KRI Telemetry Feed */}
              <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-emerald-700" />
                      Sensor Telemetri KRI FAMA
                    </h3>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      IoT Masa-Nyata
                    </span>
                  </div>
                  <div className="space-y-3">
                    {kris.map((kri) => (
                      <div
                        key={kri.id}
                        className="p-3.5 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 transition flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-600 font-semibold border border-slate-200">
                              {kri.id}
                            </span>
                            <span className="text-xs font-semibold text-slate-800 truncate max-w-[170px]">
                              {kri.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Semasa: <span className="font-bold text-slate-900">{kri.currentValue} {kri.unit}</span>
                          </p>
                        </div>
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            kri.status === 'GREEN'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : kri.status === 'AMBER'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                          }`}
                        >
                          {kri.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                  <span>Kekerapan Audit:</span>
                  <span className="font-mono text-emerald-700 font-semibold">Automasi ERP &bull; Suku Tahunan</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: HEAT MATRIX BERKEMBAR 10x10 (RISIKO & PELUANG) */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Grid3X3 className="w-5 h-5 text-emerald-700" />
                    Heat Matrix Berkembar: Risiko (-VE) vs. Peluang (+VE) [Skala 10 &times; 10]
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Merujuk Manual Kualiti ISO 9001 (Page 11-12). Matriks Kiri: Matlamat mengurangkan risiko dari Zon Merah $\rightarrow$ Kuning/Hijau. Matriks Kanan: Matlamat merebut dan mengekalkan peluang di Zon Merah/Tinggi!
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 font-semibold text-slate-600">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Merah: Tinggi
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-600 ml-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Kuning: Sederhana
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-600 ml-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Hijau: Rendah
                  </span>
                </div>
              </div>

              {/* Split Dual Matrix Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* LEFT MATRIX: RISIKO (-VE) */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-600" />
                      <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">MATRIKS RISIKO (-VE)</h3>
                    </div>
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      Ancaman &bull; Matlamat: Turunkan Magnitud
                    </span>
                  </div>

                  {/* 10x10 Visual Coordinate Plotter */}
                  <div className="relative bg-white border-2 border-slate-300 rounded-xl p-3 shadow-inner">
                    <div className="text-[10px] font-bold text-slate-500 mb-1 flex justify-between">
                      <span>Paksi-Y: KEBARANGKALIAN (1 - 10)</span>
                      <span>Paksi-X: IMPAK (1 - 10)</span>
                    </div>

                    <div className="grid grid-cols-10 gap-1 aspect-square bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                      {/* Generating 100 cells (10 rows from 10 down to 1, 10 cols from 1 to 10) */}
                      {Array.from({ length: 10 }).map((_, rIdx) => {
                        const yVal = 10 - rIdx;
                        return Array.from({ length: 10 }).map((_, cIdx) => {
                          const xVal = cIdx + 1;
                          const mag = xVal * yVal;
                          
                          // Risk zone coloring:
                          // High (Merah): mag >= 45 or (xVal >= 7 and yVal >= 6)
                          // Low (Hijau): mag <= 18 and xVal <= 4 and yVal <= 4
                          // Medium (Kuning): other
                          const isRed = mag >= 48 || (xVal >= 7 && yVal >= 6);
                          const isGreen = mag <= 20 && xVal <= 5 && yVal <= 4;
                          const bgColor = isRed ? 'bg-rose-100 border-rose-200 text-rose-800' : isGreen ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 'bg-amber-100 border-amber-200 text-amber-800';

                          // Find matching risks in this cell
                          const matchingPre = items.filter(i => i.type === 'RISK' && i.impactPre === xVal && i.likelihoodPre === yVal);
                          const matchingPost = items.filter(i => i.type === 'RISK' && i.impactPost === xVal && i.likelihoodPost === yVal);

                          return (
                            <div
                              key={`r-${yVal}-${xVal}`}
                              className={`h-full w-full rounded border flex flex-col items-center justify-center relative font-mono text-[8px] transition hover:scale-105 hover:z-10 cursor-pointer ${bgColor}`}
                              title={`Impak: ${xVal}, Kebarangkalian: ${yVal} (Magnitud: ${mag})`}
                            >
                              {matchingPre.map(r => (
                                <span
                                  key={`pre-${r.id}`}
                                  onClick={() => setSelectedItem(r)}
                                  className="px-1 py-0.2 rounded bg-rose-600 text-white font-bold text-[8px] shadow-xs"
                                  title={`Asal: ${r.id} (${r.title}) - Magnitud ${mag}`}
                                >
                                  {r.id.replace('R-FAMA-', 'R')}
                                </span>
                              ))}
                              {matchingPost.map(r => (
                                <span
                                  key={`post-${r.id}`}
                                  onClick={() => setSelectedItem(r)}
                                  className="px-1 py-0.2 rounded bg-emerald-600 text-white font-bold text-[8px] shadow-xs mt-0.5"
                                  title={`Selepas Rawatan: ${r.id} - Magnitud ${mag}`}
                                >
                                  {r.id.replace('R-FAMA-', 'R')}*
                                </span>
                              ))}
                            </div>
                          );
                        });
                      })}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">Kedudukan Risiko FAMA (-VE):</span>
                    {items.filter(i => i.type === 'RISK').map(r => {
                      const magPre = r.impactPre * r.likelihoodPre;
                      const magPost = r.impactPost * r.likelihoodPost;
                      return (
                        <div
                          key={r.id}
                          onClick={() => setSelectedItem(r)}
                          className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 cursor-pointer transition flex items-center justify-between"
                        >
                          <div>
                            <span className="font-mono font-bold text-rose-600 mr-2">{r.id}</span>
                            <span className="font-medium text-slate-800 truncate inline-block max-w-[220px] align-middle">{r.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-right font-mono text-[11px]">
                            <span className="text-rose-600 font-bold">({r.impactPre},{r.likelihoodPre}) = {magPre}</span>
                            <span className="text-slate-400">&rarr;</span>
                            <span className="text-emerald-700 font-bold">({r.impactPost},{r.likelihoodPost}) = {magPost}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT MATRIX: PELUANG (+VE) */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-700" />
                      <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">MATRIKS PELUANG (+VE)</h3>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Peluang &bull; Matlamat: Tingkatkan Magnitud
                    </span>
                  </div>

                  {/* 10x10 Visual Coordinate Plotter */}
                  <div className="relative bg-white border-2 border-slate-300 rounded-xl p-3 shadow-inner">
                    <div className="text-[10px] font-bold text-slate-500 mb-1 flex justify-between">
                      <span>Paksi-Y: KEBARANGKALIAN (1 - 10)</span>
                      <span>Paksi-X: IMPAK POSITIF (1 - 10)</span>
                    </div>

                    <div className="grid grid-cols-10 gap-1 aspect-square bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                      {Array.from({ length: 10 }).map((_, rIdx) => {
                        const yVal = 10 - rIdx;
                        return Array.from({ length: 10 }).map((_, cIdx) => {
                          const xVal = cIdx + 1;
                          const mag = xVal * yVal;

                          // Opportunity zone coloring:
                          // High Opportunity (Zon Merah/Ungu): Rebut segera!
                          const isHigh = mag >= 48 || (xVal >= 7 && yVal >= 6);
                          const isLow = mag <= 20 && xVal <= 5 && yVal <= 4;
                          const bgColor = isHigh ? 'bg-purple-100 border-purple-200 text-purple-800' : isLow ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-emerald-100 border-emerald-200 text-emerald-800';

                          const matchingPre = items.filter(i => i.type === 'OPPORTUNITY' && i.impactPre === xVal && i.likelihoodPre === yVal);
                          const matchingPost = items.filter(i => i.type === 'OPPORTUNITY' && i.impactPost === xVal && i.likelihoodPost === yVal);

                          return (
                            <div
                              key={`p-${yVal}-${xVal}`}
                              className={`h-full w-full rounded border flex flex-col items-center justify-center relative font-mono text-[8px] transition hover:scale-105 hover:z-10 cursor-pointer ${bgColor}`}
                              title={`Peluang - Impak: ${xVal}, Kebarangkalian: ${yVal} (Magnitud: ${mag})`}
                            >
                              {matchingPre.map(p => (
                                <span
                                  key={`pre-${p.id}`}
                                  onClick={() => setSelectedItem(p)}
                                  className="px-1 py-0.2 rounded bg-slate-600 text-white font-bold text-[8px] shadow-xs"
                                  title={`Asal: ${p.id}`}
                                >
                                  {p.id.replace('P-FAMA-', 'P')}
                                </span>
                              ))}
                              {matchingPost.map(p => (
                                <span
                                  key={`post-${p.id}`}
                                  onClick={() => setSelectedItem(p)}
                                  className="px-1 py-0.2 rounded bg-purple-700 text-white font-bold text-[8px] shadow-xs mt-0.5"
                                  title={`Ditingkatkan: ${p.id} - Magnitud ${mag}`}
                                >
                                  {p.id.replace('P-FAMA-', 'P')}*
                                </span>
                              ))}
                            </div>
                          );
                        });
                      })}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">Kedudukan Peluang FAMA (+VE):</span>
                    {items.filter(i => i.type === 'OPPORTUNITY').map(p => {
                      const magPre = p.impactPre * p.likelihoodPre;
                      const magPost = p.impactPost * p.likelihoodPost;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedItem(p)}
                          className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 cursor-pointer transition flex items-center justify-between"
                        >
                          <div>
                            <span className="font-mono font-bold text-purple-700 mr-2">{p.id}</span>
                            <span className="font-medium text-slate-800 truncate inline-block max-w-[220px] align-middle">{p.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-right font-mono text-[11px]">
                            <span className="text-slate-500 font-medium">({p.impactPre},{p.likelihoodPre}) = {magPre}</span>
                            <span className="text-slate-400">&rarr;</span>
                            <span className="text-purple-700 font-bold">({p.impactPost},{p.likelihoodPost}) = {magPost}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 3: ANALISIS BOW-TIE & INDIKATOR KECEMERLANGAN (LANGKAH 4) */}
        {activeTab === 'bowtie' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-emerald-700" />
                  Langkah 4: Analisis Bow-Tie &amp; Indikator Kecemerlangan Tindakan (Skala 1 - 5)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logik berkadar songsang (Page 10-11): Nilai min rendah tindakan pencegahan &rarr; kebarangkalian adalah tinggi. Nilai min rendah tindakan mitigasi &rarr; impak kerosakan adalah tinggi.
                </p>
              </div>

              {items.filter(i => i.bowtie).map((r) => {
                const bowtie = r.bowtie!;
                const avgPrev = bowtie.preventiveBarriers.reduce((a, b) => a + b.score, 0) / bowtie.preventiveBarriers.length;
                const avgMit = bowtie.mitigationBarriers.reduce((a, b) => a + b.score, 0) / bowtie.mitigationBarriers.length;

                return (
                  <div key={r.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold border border-emerald-200">
                          {r.id}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
                      </div>
                      <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {r.category}
                      </span>
                    </div>

                    {/* Official Bow-Tie 5-Component Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-11 gap-3.5 items-stretch text-xs">
                      
                      {/* Left: Punca & Tindakan Pencegahan */}
                      <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between shadow-2xs">
                        <div>
                          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                            2. Punca (7S &amp; PESTEL) &rarr; 3. Pencegahan
                          </span>
                          <p className="text-slate-800 font-bold text-xs mt-1 leading-snug">{bowtie.hazard}</p>
                          
                          <div className="space-y-2 mt-3">
                            {bowtie.preventiveBarriers.map((bar, bIdx) => (
                              <div key={bIdx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]">
                                <span className="text-slate-700 leading-snug">&bull; {bar.title}</span>
                                <span className="font-mono font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0 ml-1">
                                  {bar.score}/5
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-100 flex justify-between items-center text-[11px]">
                          <span className="text-slate-500 font-semibold">Purata Min Pencegahan:</span>
                          <span className="font-mono font-bold text-emerald-700">{avgPrev.toFixed(1)} / 5.0</span>
                        </div>
                      </div>

                      {/* Center: Peristiwa Risiko (Top Event) */}
                      <div className="lg:col-span-3 bg-gradient-to-br from-emerald-800 to-green-900 text-white p-5 rounded-xl border border-emerald-700 flex flex-col items-center justify-center text-center shadow-md">
                        <AlertTriangle className="w-7 h-7 text-amber-300 mb-2" />
                        <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">
                          1. Peristiwa Risiko (Top Event)
                        </span>
                        <p className="text-xs font-bold text-white mt-2 leading-relaxed">{bowtie.topEvent}</p>
                      </div>

                      {/* Right: Tindakan Mitigasi & Impak */}
                      <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between shadow-2xs">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                            5. Tindakan Mitigasi &rarr; 4. Impak
                          </span>
                          
                          <div className="space-y-2 mt-2">
                            {bowtie.mitigationBarriers.map((bar, bIdx) => (
                              <div key={bIdx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]">
                                <span className="text-slate-700 leading-snug">&bull; {bar.title}</span>
                                <span className="font-mono font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0 ml-1">
                                  {bar.score}/5
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 space-y-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block">Kesan / Akibat (Consequences):</span>
                            {bowtie.impacts.map((imp, iIdx) => (
                              <p key={iIdx} className="text-[11px] text-slate-600 leading-snug">&ndash; {imp}</p>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-100 flex justify-between items-center text-[11px]">
                          <span className="text-slate-500 font-semibold">Purata Min Mitigasi:</span>
                          <span className="font-mono font-bold text-emerald-700">{avgMit.toFixed(1)} / 5.0</span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 4: 3 MANDAT TADBIR URUS & TANGGUNGJAWAB */}
        {activeTab === 'mandates' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-700" />
                3 Tiang Mandat Tadbir Urus Pengurusan Risiko FAMA
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
                Menyelaras fungsi utama agensi bagi memastikan pematuhan terhadap standard sektor awam, pengukuhan rantaian sekuriti makanan semasa krisis cuaca ekstrem, dan akauntabiliti belanjawan bersama Jawatankuasa Audit Lembaga.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pillar 1 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">Tiang 1</span>
                    <h3 className="text-sm font-bold text-slate-900">Menyelaras Pembangunan Pelan Risiko</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menggubal dan mengemas kini <strong>Pelan Pengurusan Risiko FAMA</strong> bagi mendepani gangguan operasi atau perubahan pasaran agromakanan.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px]">Rujukan Institusi Rasmi:</span>
                  <a
                    href="https://www.fama.gov.my/web/pub/gambar/-/asset_publisher/Li0C7t69bLDU/content/18-hingga-20-julai-2022-isnin-hingga-rabu-bengkel-pembangunan-pelan-pengurusan-risiko-fama-bersama-mampu-hotel-mercure-selayang-bengkel-ini-dianjurkan?refererPlid=30269"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span className="text-[11px]">Bengkel Pelan Risiko Bersama MAMPU (Hotel Mercure)</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1" />
                  </a>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">Tiang 2</span>
                    <h3 className="text-sm font-bold text-slate-900">Pemantauan Kesinambungan Operasi</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Memastikan kesiapsiagaan organisasi dalam menghadapi risiko bencana dan intervensi sekuriti makanan (persediaan El Niño / La Niña atau krisis bekalan).
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px]">Rujukan Institusi Rasmi:</span>
                  <a
                    href="https://www.astroawani.com/berita-malaysia/fama-tubuh-jawatankuasa-tingkat-stok-makanan-hadapi-el-nino"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span className="text-[11px]">FAMA Tubuh Jawatankuasa Hadapi El Niño (Astro AWANI)</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1" />
                  </a>
                  <a
                    href="https://www.facebook.com/FAMA.Malaysia/posts/1453131836857104/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span className="text-[11px]">Kenyataan Pengurusan Stok Penampan (FB FAMA)</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1" />
                  </a>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">Tiang 3</span>
                    <h3 className="text-sm font-bold text-slate-900">Pelaporan dan Integrasi Bajet &amp; Audit</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menyediakan penilaian impak risiko untuk diselaraskan dengan pelan bajet pembangunan tahunan serta sasaran kerja agensi. Bekerjasama dengan Bahagian Audit Dalam yang melaporkan terus kepada Jawatankuasa Audit Lembaga.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px]">Rujukan Institusi Rasmi:</span>
                  <a
                    href="https://www.fama.gov.my/fungsi-ps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span className="text-[11px]">Bahagian Perancangan Strategik (PS) FAMA</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1" />
                  </a>
                  <a
                    href="https://auditfama.com/tentang-kami"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span className="text-[11px]">Portal Rasmi Bahagian Audit Dalam FAMA</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: DAFTAR RISIKO & PELUANG (MASTER REGISTER) */}
        {activeTab === 'register' && (
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden animate-fadeIn">
            
            <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div>
                <h2 className="text-base font-bold text-slate-900">Daftar Induk Risiko (-VE) &amp; Peluang (+VE) FAMA</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Memaparkan analisis peralihan magnitud mengikut kod daftar R &amp; P berpandukan MS ISO 31000
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari tajuk, kod daftar, pegawai..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white w-52 sm:w-56 transition"
                  />
                </div>

                <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
                  <button
                    onClick={() => setItemTypeFilter('ALL')}
                    className={`px-2.5 py-1 rounded-lg transition ${itemTypeFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setItemTypeFilter('RISK')}
                    className={`px-2.5 py-1 rounded-lg transition ${itemTypeFilter === 'RISK' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700'}`}
                  >
                    Risiko (-VE)
                  </button>
                  <button
                    onClick={() => setItemTypeFilter('OPPORTUNITY')}
                    className={`px-2.5 py-1 rounded-lg transition ${itemTypeFilter === 'OPPORTUNITY' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700'}`}
                  >
                    Peluang (+VE)
                  </button>
                </div>

                <select
                  value={mandateFilter}
                  onChange={(e) => setMandateFilter(e.target.value)}
                  className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                >
                  <option value="All">Semua Mandat</option>
                  <option value="Menyelaras Pelan Risiko">Menyelaras Pelan Risiko</option>
                  <option value="Kesinambungan Operasi">Kesinambungan Operasi</option>
                  <option value="Pelaporan & Audit Dalam">Pelaporan &amp; Audit Dalam</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-600 uppercase font-semibold border-b border-slate-200 tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Kod &amp; Peristiwa</th>
                    <th className="py-3 px-4">Jenis</th>
                    <th className="py-3 px-4">Strategi</th>
                    <th className="py-3 px-4">Magnitud Asal (X,Y)</th>
                    <th className="py-3 px-4">Magnitud Rawatan</th>
                    <th className="py-3 px-4">Status Tindakan</th>
                    <th className="py-3 px-4">Pegawai Pemilik</th>
                    <th className="py-3 px-4 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => {
                    const magPre = item.impactPre * item.likelihoodPre;
                    const magPost = item.impactPost * item.likelihoodPost;

                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="hover:bg-emerald-50/40 transition cursor-pointer group"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono px-2 py-0.5 rounded font-bold text-xs ${item.type === 'RISK' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-purple-50 text-purple-700 border border-purple-200'}`}>
                              {item.id}
                            </span>
                            <span className="font-semibold text-slate-900 group-hover:text-emerald-700 line-clamp-1 transition">
                              {item.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 block mt-0.5">{item.category}</span>
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.type === 'RISK' ? 'bg-rose-100 text-rose-800' : 'bg-purple-100 text-purple-800'}`}>
                            {item.type}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            {item.strategy}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-slate-700">
                          ({item.impactPre},{item.likelihoodPre}) = <span className={item.type === 'RISK' ? 'text-rose-600' : 'text-slate-700'}>{magPre}</span>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                          ({item.impactPost},{item.likelihoodPost}) = <span className="font-black text-emerald-800">{magPost}</span>
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.actionStatus === 'Telah Diambil Tindakan' ? 'bg-emerald-100 text-emerald-800' : item.actionStatus === 'Sedang Diambil Tindakan' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                            {item.actionStatus}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-slate-600 text-[11px]">
                          {item.owner.split('(')[0]}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 inline-block transition transform group-hover:translate-x-0.5" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 6: PEMANTAUAN & KAJIAN SEMULA (LANGKAH 7) */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-emerald-700" />
                    Langkah 7: Pemantauan &amp; Kajian Semula (Jadual Tindak Balas &amp; Usulan Penambahbaikan)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Merujuk Seksyen 7.1.1 (Page 14-15 PDF). Pemantauan berkala setiap 3-6 bulan untuk dibentangkan kepada Jawatankuasa Pengurusan Aset &amp; Stor (JKPAK) dan Jawatankuasa Audit Lembaga.
                  </p>
                </div>
                <div className="text-right text-xs text-slate-600">
                  <span>Pegawai Pemantau: <strong>Pn. Nor Aziyah (PPT Aset &amp; Stor FAMA)</strong></span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">Bil</th>
                      <th className="py-3 px-4">Strategi Yang Dirancang / Pelan Tindakan</th>
                      <th className="py-3 px-4">Risiko / Peluang Berkait</th>
                      <th className="py-3 px-3 text-center text-slate-500">Tidak Diambil</th>
                      <th className="py-3 px-3 text-center text-amber-600">Sedang Diambil</th>
                      <th className="py-3 px-3 text-center text-emerald-700 font-bold">Telah Diambil</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {items.flatMap(i => i.treatmentPlan.map((tp, idx) => ({ tp, item: i, subIdx: idx }))).map((row, rIdx) => {
                      const isDone = row.item.actionStatus === 'Telah Diambil Tindakan';
                      const isPending = row.item.actionStatus === 'Sedang Diambil Tindakan';
                      const isNotDone = row.item.actionStatus === 'Tidak Diambil Tindakan';

                      return (
                        <tr key={rIdx} className="hover:bg-slate-50/60 transition">
                          <td className="py-2.5 px-3 font-mono text-slate-500">{rIdx + 1}.</td>
                          <td className="py-2.5 px-4 font-medium text-slate-800">{row.tp}</td>
                          <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">{row.item.id}</td>
                          <td className="py-2.5 px-3 text-center">{isNotDone ? <Check className="w-4 h-4 text-slate-600 mx-auto" /> : '-'}</td>
                          <td className="py-2.5 px-3 text-center">{isPending ? <Check className="w-4 h-4 text-amber-600 mx-auto" /> : '-'}</td>
                          <td className="py-2.5 px-3 text-center">{isDone ? <Check className="w-4 h-4 text-emerald-700 font-bold mx-auto" /> : '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Detail Inspection Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fadeIn">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${selectedItem.type === 'RISK' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-purple-50 text-purple-700 border border-purple-200'}`}>
                      {selectedItem.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{selectedItem.category}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {selectedItem.mandate}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2 leading-snug">{selectedItem.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Magnitude Shift Card */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80">
                  <span className="text-[10px] text-rose-700 block uppercase font-bold">Magnitud Asal (Sebelum)</span>
                  <div className="text-xl font-black text-rose-950 mt-1">
                    ({selectedItem.impactPre}, {selectedItem.likelihoodPre}) = {selectedItem.impactPre * selectedItem.likelihoodPre}
                  </div>
                  <p className="text-[11px] text-rose-700/90 mt-1">
                    Impak: {selectedItem.impactPre}/10 &bull; Kebarangkalian: {selectedItem.likelihoodPre}/10
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 block uppercase font-bold">Magnitud Sasaran (Selepas)</span>
                  <div className="text-xl font-black text-emerald-950 mt-1">
                    ({selectedItem.impactPost}, {selectedItem.likelihoodPost}) = {selectedItem.impactPost * selectedItem.likelihoodPost}
                  </div>
                  <p className="text-[11px] text-emerald-700/90 mt-1">
                    Impak: {selectedItem.impactPost}/10 &bull; Kebarangkalian: {selectedItem.likelihoodPost}/10
                  </p>
                </div>
              </div>

              {/* Rujukan Institusi Rasmi */}
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-2 text-xs">
                <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-700" /> Dokumen Rujukan &amp; Mandat Kerajaan:
                </span>
                <div className="space-y-1.5">
                  {selectedItem.mandateCitation.map((cite, idx) => (
                    <a
                      key={idx}
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white border border-emerald-200 hover:border-emerald-400 flex items-center justify-between text-emerald-800 font-semibold group transition text-xs"
                    >
                      <span className="line-clamp-1">{cite.text}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Pelan Rawatan & Tindakan */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider block">Pelan Tindak Balas &amp; Rawatan (Treatment Plan):</span>
                <div className="space-y-2">
                  {selectedItem.treatmentPlan.map((tp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                      <strong>{idx + 1}.</strong> {tp}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pegawai Bertanggungjawab */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pegawai Pemilik:</span>
                  <span className="text-slate-900 font-bold">{selectedItem.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Strategi Tindak Balas:</span>
                  <span className="text-emerald-700 font-bold">{selectedItem.strategy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kos Peruntukan Mitigasi:</span>
                  <span className="text-slate-800 font-mono font-semibold">{formatRM(selectedItem.mitigationCostRM)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Tindakan:</span>
                  <span className="text-emerald-800 font-bold">{selectedItem.actionStatus} ({selectedItem.progress}%)</span>
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition"
              >
                Tutup Paparan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Navigation Menu */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-4 py-2">
        <div className="max-w-2xl mx-auto flex items-center justify-around">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === 'overview'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px]">Ringkasan</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === 'matrix'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
            <span className="text-[10px]">Dwi-Matriks 10&times;10</span>
          </button>

          <button
            onClick={() => setActiveTab('bowtie')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === 'bowtie'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[10px]">Bow-Tie (Langkah 4)</span>
          </button>

          <button
            onClick={() => setActiveTab('mandates')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === 'mandates'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Landmark className="w-5 h-5" />
            <span className="text-[10px]">3 Mandat FAMA</span>
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === 'register'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-5 h-5" />
            <span className="text-[10px]">Daftar Induk R&amp;P</span>
          </button>

          <button
            onClick={() => setActiveTab('monitoring')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === 'monitoring'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-[10px]">Pemantauan (L7)</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
