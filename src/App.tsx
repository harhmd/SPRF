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
  Landmark
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

export interface BowtieModel {
  hazard: string;
  topEvent: string;
  preventiveBarriers: string[];
  mitigationBarriers: string[];
}

export interface RiskItem {
  id: string;
  title: string;
  category: string;
  mandate: 'Menyelaras Pelan Risiko' | 'Kesinambungan Operasi' | 'Pelaporan & Audit Dalam';
  mandateCitation: { text: string; url: string }[];
  owner: string;
  strategy: string;
  status: string;
  probInherent: number;
  lossInherentRM: number;
  probResidual: number;
  lossResidualRM: number;
  mitigationCostRM: number;
  confidenceVaR95: number;
  dueDate: string;
  progress: number;
  kriLink: string;
  bowtie: BowtieModel;
  treatmentPlan: string;
  contingency: string;
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
  'Agrobazaar Online & Digital',
  'Tadbir Urus & Audit Lembaga'
];

const MANDATE_OPTIONS = [
  'All',
  'Menyelaras Pelan Risiko',
  'Kesinambungan Operasi',
  'Pelaporan & Audit Dalam'
];

const INITIAL_QUANT_RISKS: RiskItem[] = [
  {
    id: 'FAMA-QRA-01',
    title: 'Lonjakan Harga Pasaran & Defisit Stok Penampan (Jualan Agro MADANI)',
    category: 'Jualan Agro MADANI & Intervensi',
    mandate: 'Kesinambungan Operasi',
    mandateCitation: [
      {
        text: 'Astro AWANI: FAMA Tubuh Jawatankuasa Tingkat Stok Makanan Hadapi El Niño',
        url: 'https://www.astroawani.com/berita-malaysia/fama-tubuh-jawatankuasa-tingkat-stok-makanan-hadapi-el-nino'
      },
      {
        text: 'FAMA FB Rasmi: Pengurusan Stok Penampan Makanan Kebangsaan',
        url: 'https://www.facebook.com/FAMA.Malaysia/posts/1453131836857104/'
      }
    ],
    owner: 'En. Hishamuddin (Bhg. Pemasaran Segar & Intervensi)',
    strategy: 'Mitigate / Reduce',
    status: 'In Progress',
    probInherent: 0.65,
    lossInherentRM: 6500000,
    probResidual: 0.20,
    lossResidualRM: 1400000,
    mitigationCostRM: 450000,
    confidenceVaR95: 2150000,
    dueDate: '2026-11-20',
    progress: 75,
    kriLink: 'KRI-STK-01',
    bowtie: {
      hazard: 'Volatiliti Bekalan Makanan Global, Kemarau El Niño & Faktor Cuaca Ekstrem',
      topEvent: 'Defisit Stok Penampan Bawang & Telur Ayam di Pasaran Domestik',
      preventiveBarriers: ['Kontrak Hadapan Pembekal Tempatan 60 Hari', 'Kuota Pelepasan Terperingkat', 'Subsidi Logistik Pengangkutan FAMA'],
      mitigationBarriers: ['Pengaktifan 120 Tapak Jualan Agro MADANI', 'Pengedaran Pantas Hab RTC Gopeng & RTC Pasir Puteh']
    },
    treatmentPlan: 'Kunci kuota off-take pembekal tempatan 60 hari awal dan edar 1,200 tan metrik stok penampan nasional.',
    contingency: 'Pemberian subsidi pengangkutan terus dan mobilisasi kargo antara-negeri di bawah Jawatankuasa Khas Stok Makanan.'
  },
  {
    id: 'FAMA-QRA-02',
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
    strategy: 'Mitigate / Reduce',
    status: 'Behind Schedule',
    probInherent: 0.50,
    lossInherentRM: 3200000,
    probResidual: 0.12,
    lossResidualRM: 850000,
    mitigationCostRM: 180000,
    confidenceVaR95: 1100000,
    dueDate: '2026-10-31',
    progress: 45,
    kriLink: 'KRI-TMP-01',
    bowtie: {
      hazard: 'Gelombang Haba Ekstrem El Niño & Gangguan Bekalan Tenaga Elektrik Komersial',
      topEvent: 'Peningkatan Suhu Bilik Sejuk Melebihi 4°C Menyebabkan Kerosakan Sayur-Sayuran',
      preventiveBarriers: ['Sistem Dwi-Pemampat Inverter Sandaran', 'Sensor Telemetri IoT 24/7', 'Genset Automatik 15-Saat'],
      mitigationBarriers: ['Treler Sejuk Beku Mudah Alih 40-Kaki', 'Pengalihan Pantas ke Pusat Pemprosesan Buah Berhampiran']
    },
    treatmentPlan: 'Pemasangan sensor telemetri pintar IoT dengan penggera amaran automatik dan dwi-pemampat inverter.',
    contingency: 'Sewa treler sejuk beku kecemasan 40 kaki serta pengalihan stok kubis ke PPBBS Batu Kurau.'
  },
  {
    id: 'FAMA-QRA-03',
    title: 'Kemusnahan Tanaman Sayuran Ladang Kontrak Akibat Fenomena Cuaca Ekstrem (El Niño / Monsun)',
    category: 'Ladang Kontrak & Hasil Segar',
    mandate: 'Kesinambungan Operasi',
    mandateCitation: [
      {
        text: 'Astro AWANI: Kesiapsiagaan Bencana & El Niño FAMA',
        url: 'https://www.astroawani.com/berita-malaysia/fama-tubuh-jawatankuasa-tingkat-stok-makanan-hadapi-el-nino'
      },
      {
        text: 'FAMA Malaysia FB: Pelan Kontingensi Hasil Segar',
        url: 'https://www.facebook.com/FAMA.Malaysia/posts/1453131836857104/'
      }
    ],
    owner: 'Ir. Zulkifli (Bhg. Ladang Kontrak & Pengembangan)',
    strategy: 'Transfer',
    status: 'In Progress',
    probInherent: 0.70,
    lossInherentRM: 4800000,
    probResidual: 0.30,
    lossResidualRM: 1200000,
    mitigationCostRM: 320000,
    confidenceVaR95: 1650000,
    dueDate: '2026-12-15',
    progress: 60,
    kriLink: 'KRI-SUP-01',
    bowtie: {
      hazard: 'Kemarau Berpanjangan El Niño & Limpahan Hujan Monsun Timur Laut (La Niña)',
      topEvent: 'Kemusnahan Skala Luas Ladang Sayur Kontrak & Kegagalan Penghantaran',
      preventiveBarriers: ['Jadual Giliran Tanaman Luar Musim', 'Geran Rumah Lindungan Hujan (Rain Shelters)', 'Sistem Saliran Pintar & Fertigasi Tertutup'],
      mitigationBarriers: ['Skim Takaful Agromakanan KPKM', 'Mobilisasi Bekalan Gantian Segera dari Sabah & Pantai Barat']
    },
    treatmentPlan: 'Penstrukturan semula zon penanaman berjadual dan pendaftaran mandatori petani ke Takaful Agromakanan.',
    contingency: 'Pengaktifan Tabung Bantuan Bencana Pertanian KPKM dan penyelarasan laluan alternatif.'
  },
  {
    id: 'FAMA-QRA-04',
    title: 'Penggubalan & Semakan Pelan Risiko Eksport Durian Beku AGROMAS (Piawaian MAMPU & GACC)',
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
    probInherent: 0.40,
    lossInherentRM: 5400000,
    probResidual: 0.08,
    lossResidualRM: 950000,
    mitigationCostRM: 260000,
    confidenceVaR95: 1350000,
    dueDate: '2027-01-15',
    progress: 35,
    kriLink: 'KRI-GPL-01',
    bowtie: {
      hazard: 'Perubahan Pasaran Global, Audit Biosekuriti Rentas Sempadan & Kegagalan Rantaian Beku',
      topEvent: 'Penolakan Konsainan Kontena Durian Beku di Pintu Masuk Eksport',
      preventiveBarriers: ['Penjajaran Piawaian Pengurusan Risiko MAMPU', 'Pensijilan Pembekuan Nitrogen Cecair -80°C', 'Pemeteraian Kontena Bersuhu IoT'],
      mitigationBarriers: ['Diversifikasi Pasaran Gantian (UAE, Australia)', 'Pemprosesan Hiliran Pes & Puree Durian Segera']
    },
    treatmentPlan: 'Penaiktarafan kilang pembekuan nitrogen cair -80°C mengikut parameter Pelan Risiko FAMA-MAMPU.',
    contingency: 'Pelan lencongan pasaran ke Asia Barat dan hiliran agroindustri makanan sedia hidang.'
  },
  {
    id: 'FAMA-QRA-05',
    title: 'Ketidakpatuhan Regulatori GPL & Kelemahan Kawalan Sempadan (Audit Dalam & MAQIS)',
    category: 'Regulatori GPL & Kualiti',
    mandate: 'Pelaporan & Audit Dalam',
    mandateCitation: [
      {
        text: 'Portal Rasmi Audit FAMA: Kawalan Dalaman & Jawatankuasa Audit Lembaga',
        url: 'https://auditfama.com/tentang-kami'
      },
      {
        text: 'FAMA Gov: Fungsi Bahagian Perancangan Strategik',
        url: 'https://www.fama.gov.my/fungsi-ps'
      }
    ],
    owner: 'Pn. Farah Nadia (Bhg. Regulatori & Kualiti Standard)',
    strategy: 'Mitigate / Reduce',
    status: 'Completed',
    probInherent: 0.55,
    lossInherentRM: 2100000,
    probResidual: 0.15,
    lossResidualRM: 500000,
    mitigationCostRM: 110000,
    confidenceVaR95: 680000,
    dueDate: '2026-09-30',
    progress: 100,
    kriLink: 'KRI-GPL-01',
    bowtie: {
      hazard: 'Penyeludupan Hasil Segar Tidak Bergred, Pemalsuan Label Asal Usul & Kelompangan Prosedur',
      topEvent: 'Kemasukan Produk GPL Tidak Mematuhi Standard Kebangsaan Menceroboh Pasaran Domestik',
      preventiveBarriers: ['Sistem e-Lesen GPL Bersepadu', 'Prapemeriksaan MAQIS Berautomasi', 'Audit Pematuhan Bahagian Audit Dalam'],
      mitigationBarriers: ['Sitaan Kuarantin Segera di Kompleks Sempadan', 'Pelaporan Ketidakpatuhan Terus ke Jawatankuasa Audit Lembaga']
    },
    treatmentPlan: 'Penguatkuasaan digital e-Lesen GPL di pintu Bukit Kayu Hitam dan Pelabuhan Klang disokong audit pematuhan berkala.',
    contingency: 'Pusat sitaan kuarantin FAMA-MAQIS dengan tapak pelupusan biosekuriti terkawal.'
  },
  {
    id: 'FAMA-QRA-06',
    title: 'Penjajaran Bajet Pembangunan & Integriti Kawalan Dalaman Operasi RTC / Pasar Tani',
    category: 'Tadbir Urus & Audit Lembaga',
    mandate: 'Pelaporan & Audit Dalam',
    mandateCitation: [
      {
        text: 'Portal Rasmi Audit FAMA: Bahagian Audit Dalam & Jawatankuasa Audit Lembaga',
        url: 'https://auditfama.com/tentang-kami'
      },
      {
        text: 'FAMA Gov: Bahagian Perancangan Strategik (PS) - Bajet Pembangunan',
        url: 'https://www.fama.gov.my/fungsi-ps'
      }
    ],
    owner: 'En. Azlan Shah (Bhg. Perancangan Strategik & Bahagian Audit Dalam)',
    strategy: 'Mitigate / Reduce',
    status: 'In Progress',
    probInherent: 0.45,
    lossInherentRM: 3800000,
    probResidual: 0.10,
    lossResidualRM: 700000,
    mitigationCostRM: 220000,
    confidenceVaR95: 950000,
    dueDate: '2026-12-31',
    progress: 80,
    kriLink: 'KRI-GPL-01',
    bowtie: {
      hazard: 'Ketidakselarasan Peruntukan Bajet Pembangunan dengan Pendedahan Risiko & Kelompangan Audit',
      topEvent: 'Ketirisan Dana Pelaburan Infrastruktur Agromakanan & Penemuan Audit Berulang',
      preventiveBarriers: ['Model Penilaian Impak RoMI Berasaskan Bukti', 'Penyelarasan Bajet Pembangunan Bersama Bahagian PS', 'Semakan Audit Kawalan Dalaman Berkala'],
      mitigationBarriers: ['Pelaporan Suku Tahunan Terus ke Jawatankuasa Audit Lembaga', 'Pengstrukturan Semula Belanjawan Projek Kritikal']
    },
    treatmentPlan: 'Penyelarasan matriks RoMI kuantitatif untuk setiap permohonan Bajet Pembangunan tahunan dan laporan audit suku tahunan.',
    contingency: 'Penahanan pelepasan dana peringkat kedua jika penemuan audit kawalan dalaman tidak diselesaikan dalam 30 hari.'
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

const formatPercent = (val: number) => `${(val * 100).toFixed(1)}%`;

export default function App() {
  const [risks, setRisks] = useState<RiskItem[]>(INITIAL_QUANT_RISKS);
  const [kris, setKris] = useState<KRIItem[]>(INITIAL_KRIS);
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'mandates' | 'emv' | 'kri' | 'bowtie' | 'register'>('overview');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [mandateFilter, setMandateFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTelemetrySimulating, setIsTelemetrySimulating] = useState(false);

  const portfolioMetrics = useMemo(() => {
    const totalInherentEMV = risks.reduce((sum, r) => sum + r.probInherent * r.lossInherentRM, 0);
    const totalResidualEMV = risks.reduce((sum, r) => sum + r.probResidual * r.lossResidualRM, 0);
    const totalMitigationInvestment = risks.reduce((sum, r) => sum + r.mitigationCostRM, 0);
    
    const emvReduction = totalInherentEMV - totalResidualEMV;
    const netSavings = emvReduction - totalMitigationInvestment;
    const returnOnMitigation = totalMitigationInvestment > 0 ? (netSavings / totalMitigationInvestment) * 100 : 0;

    const portfolioVaR95 = risks.reduce((sum, r) => sum + r.confidenceVaR95, 0);

    const criticalKri = kris.filter(k => k.status === 'RED').length;
    const warningKri = kris.filter(k => k.status === 'AMBER').length;
    const normalKri = kris.filter(k => k.status === 'GREEN').length;

    return {
      totalInherentEMV,
      totalResidualEMV,
      totalMitigationInvestment,
      emvReduction,
      netSavings,
      returnOnMitigation,
      portfolioVaR95,
      criticalKri,
      warningKri,
      normalKri
    };
  }, [risks, kris]);

  const emvComparisonData = useMemo(() => {
    return risks.map((r) => {
      const inherentEMV = (r.probInherent * r.lossInherentRM) / 1000;
      const residualEMV = (r.probResidual * r.lossResidualRM) / 1000;
      return {
        name: r.id.replace('FAMA-QRA-', 'QRA-'),
        title: r.title,
        InherentEMV: Math.round(inherentEMV),
        ResidualEMV: Math.round(residualEMV),
        MitigasiCost: Math.round(r.mitigationCostRM / 1000)
      };
    });
  }, [risks]);

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
    setTimeout(() => setIsTelemetrySimulating(false), 600);
  };

  const filteredRisks = useMemo(() => {
    return risks.filter((r) => {
      const matchCat = categoryFilter === 'All' || r.category === categoryFilter;
      const matchMandate = mandateFilter === 'All' || r.mandate === mandateFilter;
      const matchSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.mandate.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchMandate && matchSearch;
    });
  }, [risks, categoryFilter, mandateFilter, searchQuery]);

  const exportQuantCSV = () => {
    const headers = [
      'Kod Risiko',
      'Tajuk Inisiatif',
      'Mandat Tadbir Urus',
      'Kategori',
      'Pegawai Pemilik',
      'Kebarangkalian Kasar (P)',
      'Kerugian Kasar (RM)',
      'Inherent EMV (RM)',
      'Kebarangkalian Bersih (P)',
      'Kerugian Bersih (RM)',
      'Residual EMV (RM)',
      'Kos Mitigasi (RM)',
      '95% VaR (RM)',
      'Status'
    ];
    const rows = risks.map((r) => [
      r.id,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.mandate}"`,
      r.category,
      `"${r.owner}"`,
      r.probInherent,
      r.lossInherentRM,
      r.probInherent * r.lossInherentRM,
      r.probResidual,
      r.lossResidualRM,
      r.probResidual * r.lossResidualRM,
      r.mitigationCostRM,
      r.confidenceVaR95,
      r.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SPRF_FAMA_Pengukuran_Risiko_Kuantitatif_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-600 selection:text-white pb-24">
      {/* Top Header Bar */}
      <header className="border-b border-emerald-100 bg-white/95 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-700 to-green-700 flex items-center justify-center shadow-md shadow-emerald-700/20 text-white">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              SPRF &bull; FAMA Malaysia
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                Sistem Pengurusan Risiko FAMA
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Integrasi 3 Mandat Strategik: Penyelarasan Pelan (MAMPU) &bull; Kesinambungan Bencana (El Niño) &bull; Bajet Pembangunan &amp; Audit Lembaga
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateTelemetry}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-200 shadow-sm transition active:scale-95"
            title="Kemas kini bacaan sensor IoT secara rawak"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isTelemetrySimulating ? 'animate-spin' : ''}`} />
            Simulasi KRI Masa-Nyata
          </button>
          <button
            onClick={exportQuantCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow-sm shadow-emerald-600/30 transition transform active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Eksport Laporan Kuantitatif
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* 3 Strategic Mandate Banner Cards */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-700" />
                3 Tiang Mandat Tadbir Urus Pengurusan Risiko FAMA
              </h2>
              <p className="text-xs text-slate-500">
                Penyelarasan komprehensif berlandaskan piawaian MAMPU, Jawatankuasa Khas El Niño, dan Jawatankuasa Audit Lembaga
              </p>
            </div>
            <button
              onClick={() => setActiveTab('mandates')}
              className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              Lihat Butiran Mandat &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Pillar 1 */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Mandat 1
                  </span>
                  <a
                    href="https://www.fama.gov.my/web/pub/gambar/-/asset_publisher/Li0C7t69bLDU/content/18-hingga-20-julai-2022-isnin-hingga-rabu-bengkel-pembangunan-pelan-pengurusan-risiko-fama-bersama-mampu-hotel-mercure-selayang-bengkel-ini-dianjurkan?refererPlid=30269"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-semibold"
                    title="Buka rujukan rasmi Bengkel MAMPU"
                  >
                    MAMPU Selayang <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2">Menyelaras Pembangunan Pelan Risiko</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Menggubal dan mengemas kini <strong>Pelan Pengurusan Risiko FAMA</strong> bagi mendepani gangguan operasi atau perubahan pasaran agromakanan mengikut piawaian sektor awam MAMPU.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Status Pelan:</span>
                <span className="font-semibold text-emerald-700">Disediakan Bersama MAMPU</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Mandat 2
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.astroawani.com/berita-malaysia/fama-tubuh-jawatankuasa-tingkat-stok-makanan-hadapi-el-nino"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 font-semibold"
                      title="Rujukan Astro AWANI: Jawatankuasa El Niño"
                    >
                      AWANI <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://www.facebook.com/FAMA.Malaysia/posts/1453131836857104/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 font-semibold"
                      title="Kenyataan Rasmi FAMA"
                    >
                      FB Rasmi <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2">Pemantauan Kesinambungan Operasi</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Memastikan kesiapsiagaan organisasi dalam menghadapi risiko bencana dan intervensi sekuriti makanan (persediaan menghadapi fenomena cuaca ekstrem <strong>El Niño / La Niña</strong> atau krisis bekalan).
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Jawatankuasa Khas:</span>
                <span className="font-semibold text-emerald-700">Stok Makanan El Niño Aktif</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Mandat 3
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.fama.gov.my/fungsi-ps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 font-semibold"
                      title="Portal FAMA: Fungsi Perancangan Strategik"
                    >
                      Bhg. PS <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://auditfama.com/tentang-kami"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 font-semibold"
                      title="Portal Rasmi Audit FAMA"
                    >
                      Audit FAMA <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2">Pelaporan dan Integrasi Bajet &amp; Audit</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Menyediakan penilaian impak risiko untuk diselaraskan dengan pelan <strong>bajet pembangunan tahunan</strong> serta sasaran kerja agensi. Bekerjasama rapat dengan <strong>Bahagian Audit Dalam FAMA</strong> yang melaporkan terus kepada <strong>Jawatankuasa Audit Lembaga</strong>.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Pelaporan Lembaga:</span>
                <span className="font-semibold text-emerald-700">Jawatankuasa Audit Lembaga</span>
              </div>
            </div>

          </div>
        </section>

        {/* 4 Quantitative Financial Metrics (EMV, Net Savings, VaR, KRI Alerts) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Expected Monetary Value (EMV) Reduction */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nilai Jangkaan Kerugian (EMV)</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-2xl font-black text-emerald-700">
                    {formatRM(portfolioMetrics.totalResidualEMV)}
                  </span>
                  <span className="text-xs font-medium text-slate-500">residual</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Inherent EMV Asal:</span>
              <span className="font-bold text-rose-600">{formatRM(portfolioMetrics.totalInherentEMV)}</span>
            </div>
          </div>

          {/* Card 2: Return on Mitigation Investment (RoMI) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pulangan Bersih Mitigasi (RoMI)</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-2xl font-black text-emerald-700">
                    +{portfolioMetrics.returnOnMitigation.toFixed(0)}%
                  </span>
                  <span className="text-xs font-medium text-slate-500">ROI risiko</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Penjimatan Bersih:</span>
              <span className="font-bold text-emerald-700">{formatRM(portfolioMetrics.netSavings)}</span>
            </div>
          </div>

          {/* Card 3: 95% 1-Month Value at Risk (VaR) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Agregat 95% Value at Risk (VaR)</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-2xl font-black text-amber-600">
                    {formatRM(portfolioMetrics.portfolioVaR95)}
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Had Selera Risiko Agromakanan:</span>
              <span className="font-bold text-emerald-700">Siling RM10.0M</span>
            </div>
          </div>

          {/* Card 4: Key Risk Indicators Health */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Integriti Operasi (KRI Telemetri)</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-2xl font-black text-slate-900">{kris.length} Metrik</span>
                  <span className="text-xs text-amber-700 font-semibold">({portfolioMetrics.warningKri} Amaran)</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Gauge className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Status Semasa:</span>
              <span className="font-bold text-amber-700">
                {portfolioMetrics.criticalKri > 0 ? 'Tindakan Segera' : 'Dalam Pengawasan Rapi'}
              </span>
            </div>
          </div>

        </div>

        {/* TAB: MANDATES & STRATEGIC GOVERNANCE */}
        {activeTab === 'mandates' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header intro */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-600" />
                Kerangka Tadbir Urus &amp; Mandat Rasmi Pengurusan Risiko FAMA
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
                Struktur Pengurusan Risiko FAMA menggabungkan penggubalan berstandard kebangsaan (MAMPU), pelan tindakan kesiapsiagaan bencana iklim (El Niño / La Niña), dan akauntabiliti tadbir urus bersama Bahagian Audit Dalam yang bertanggungjawab terus kepada Jawatankuasa Audit Lembaga Pengarah FAMA.
              </p>
            </div>

            {/* Detailed 3 Mandate Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Detailed Card 1 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">Tiang Strategik 1</span>
                    <h3 className="text-sm font-bold text-slate-900">Menyelaras Pembangunan Pelan Risiko</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menggubal dan mengemas kini Pelan Pengurusan Risiko FAMA bagi mendepani gangguan operasi atau perubahan pasaran agromakanan. Dilaksanakan secara sistematik menerusi bengkel penilaian komprehensif.
                </p>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">Rujukan Institusi Rasmi:</span>
                  <a
                    href="https://www.fama.gov.my/web/pub/gambar/-/asset_publisher/Li0C7t69bLDU/content/18-hingga-20-julai-2022-isnin-hingga-rabu-bengkel-pembangunan-pelan-pengurusan-risiko-fama-bersama-mampu-hotel-mercure-selayang-bengkel-ini-dianjurkan?refererPlid=30269"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span>Bengkel Pelan Risiko Bersama MAMPU (Mercure Selayang)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                  </a>
                </div>
                <ul className="text-xs text-slate-600 space-y-2 pt-1 border-t border-slate-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Penyeragaman parameter risiko agromakanan mengikut piawaian Sektor Awam MAMPU.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Pengenalpastian ancaman pasaran import, kuota eksport, dan rantaian nilai makanan negara.</span>
                  </li>
                </ul>
              </div>

              {/* Detailed Card 2 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">Tiang Strategik 2</span>
                    <h3 className="text-sm font-bold text-slate-900">Pemantauan Kesinambungan Operasi</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Memastikan kesiapsiagaan organisasi dalam menghadapi risiko bencana dan intervensi sekuriti makanan seperti persediaan menghadapi fenomena cuaca ekstrem El Niño / La Niña atau krisis bekalan.
                </p>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">Rujukan Institusi Rasmi:</span>
                  <a
                    href="https://www.astroawani.com/berita-malaysia/fama-tubuh-jawatankuasa-tingkat-stok-makanan-hadapi-el-nino"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span>FAMA Tubuh Jawatankuasa Hadapi El Niño (Astro AWANI)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                  </a>
                  <a
                    href="https://www.facebook.com/FAMA.Malaysia/posts/1453131836857104/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span>Kenyataan Rasmi Pengurusan Stok Makanan FAMA FB</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                  </a>
                </div>
                <ul className="text-xs text-slate-600 space-y-2 pt-1 border-t border-slate-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Jawatankuasa Khas Peningkatan Stok Penampan Makanan (bawang, telur, minyak masak, kubis).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Kesiapsiagaan logistik Pusat Operasi RTC Gopeng, RTC Pasir Puteh, dan PPL Nilai/Cameron Highlands.</span>
                  </li>
                </ul>
              </div>

              {/* Detailed Card 3 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">Tiang Strategik 3</span>
                    <h3 className="text-sm font-bold text-slate-900">Pelaporan dan Integrasi Bajet &amp; Audit</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menyediakan penilaian impak risiko untuk diselaraskan dengan pelan bajet pembangunan tahunan serta sasaran kerja agensi. Jawatankuasa ini bekerjasama rapat dengan Bahagian Audit Dalam yang melaporkan terus kepada Jawatankuasa Audit Lembaga.
                </p>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">Rujukan Institusi Rasmi:</span>
                  <a
                    href="https://www.fama.gov.my/fungsi-ps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span>Fungsi Bahagian Perancangan Strategik (PS) FAMA</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                  </a>
                  <a
                    href="https://auditfama.com/tentang-kami"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-emerald-700 font-semibold group transition"
                  >
                    <span>Portal Rasmi Audit FAMA &amp; Audit Lembaga</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                  </a>
                </div>
                <ul className="text-xs text-slate-600 space-y-2 pt-1 border-t border-slate-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Integrasi metrik RoMI (Return on Mitigation Investment) dalam justifikasi Bajet Pembangunan tahunan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Laporan pengesahan kawalan dalaman terus kepada Jawatankuasa Audit Lembaga Pengarah FAMA.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Governance Flowchart Diagram */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Aliran Pelaporan Tadbir Urus Pengurusan Risiko FAMA (End-to-End)</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Peringkat 1: Operasi</span>
                  <h4 className="font-bold text-slate-900">Hab RTC, PPL &amp; Ladang Kontrak</h4>
                  <p className="text-slate-600 text-[11px]">Sensor IoT KRI, data stok simpanan, dan isu lapangan dikesan masa-nyata.</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-emerald-800">Peringkat 2: Penyelarasan</span>
                  <h4 className="font-bold text-emerald-950">Jawatankuasa Pengurusan Risiko FAMA</h4>
                  <p className="text-slate-700 text-[11px]">Penggubalan pelan berasaskan garis panduan MAMPU &amp; pengiraan kuantitatif EMV.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Peringkat 3: Semakan &amp; Bajet</span>
                  <h4 className="font-bold text-slate-900">Bhg. PS &amp; Bahagian Audit Dalam</h4>
                  <p className="text-slate-600 text-[11px]">Penjajaran dengan Bajet Pembangunan tahunan dan audit kawalan dalaman.</p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-800 text-white rounded-xl text-center space-y-1.5 shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-emerald-100">Peringkat 4: Lembaga</span>
                  <h4 className="font-bold text-white">Jawatankuasa Audit Lembaga</h4>
                  <p className="text-emerald-100 text-[11px]">Pengesyoran dasar, kelulusan peruntukan selera risiko, dan pemantauan statutori.</p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 1: OVERVIEW & COMPARISON */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* EMV Inherent vs Residual Chart */}
              <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      Analisis Nilai Jangkaan Kerugian (EMV = Kebarangkalian &times; Kerugian Bersih)
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pengurangan pendedahan kewangan (Inherent EMV vs Residual EMV) selepas pelaburan kawalan mitigasi FAMA (dalam '000 RM)
                    </p>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    Nilai Empirikal Kewangan
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emvComparisonData} margin={{ top: 15, right: 15, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `RM${val}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        formatter={(val: any, name: any) => [`RM ${Number(val).toLocaleString()},000`, name === 'InherentEMV' ? 'Inherent EMV' : name === 'ResidualEMV' ? 'Residual EMV' : 'Kos Mitigasi']}
                      />
                      <Legend />
                      <Bar dataKey="InherentEMV" name="Inherent EMV (Tanpa Kawalan)" fill="#ef4444" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="ResidualEMV" name="Residual EMV (Selepas Kawalan)" fill="#10b981" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="MitigasiCost" name="Kos Pelaburan Mitigasi" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* KRI Quick Status Feed */}
              <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-emerald-600" />
                      Status KRI Masa-Nyata
                    </h3>
                    <button
                      onClick={() => setActiveTab('kri')}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                    >
                      Buka Papan Penuh &rarr;
                    </button>
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
                  <span>Audit Kekerapan:</span>
                  <span className="font-mono text-emerald-700 font-semibold">Automasi Telemetri IoT</span>
                </div>
              </div>

            </div>

            {/* Side-by-side Table Comparison: Traditional Matrix vs Modern Practice */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3.5">
                Perbandingan Metodologi: Matriks Risiko Tradisional vs. Pengukuran Industri Kuantitatif
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Ciri &amp; Dimensi</th>
                      <th className="py-3 px-4 text-rose-600">Matriks Tradisional (5&times;5)</th>
                      <th className="py-3 px-4 text-emerald-700">Pengukuran Industri (EMV, VaR, KRI, Bowtie)</th>
                      <th className="py-3 px-4">Faedah Langsung untuk FAMA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900">Unit Pengukuran</td>
                      <td className="py-3 px-4 text-slate-500">Skor arbituari tanpa unit (1 hingga 25)</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Ringgit Malaysia (RM), %, Minit, Hari</td>
                      <td className="py-3 px-4">Kewangan &amp; Lembaga Pengarah faham impak sebenar.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900">Agregasi Seluruh Portfolio</td>
                      <td className="py-3 px-4 text-slate-500">Gagal (skor matriks tidak boleh dicampurkan)</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Boleh dijumlahkan terus (Jumlah EMV &amp; VaR)</td>
                      <td className="py-3 px-4">Mengetahui jumlah pendedahan kewangan kebangsaan FAMA.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900">Justifikasi Belanjawan Mitigasi</td>
                      <td className="py-3 px-4 text-slate-500">Sukar menentukan ROI kos intervensi</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Pengiraan RoMI (Return on Mitigation Investment)</td>
                      <td className="py-3 px-4">Membuktikan kos memasang sensor IoT berbaloi melindungi stok.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900">Kekerapan &amp; Pengesanan</td>
                      <td className="py-3 px-4 text-slate-500">Semakan manual tahunan / suku tahunan</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Masa nyata menerusi ambang amaran KRI</td>
                      <td className="py-3 px-4">Pencegahan serta-merta sebelum hasil sayur/durian rosak.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXPECTED MONETARY VALUE & VALUE AT RISK */}
        {activeTab === 'emv' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    Model Kuantitatif: Expected Monetary Value (EMV) &amp; 95% Value at Risk (VaR)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Formula Piawaian: EMV = Kebarangkalian (P) &times; Potensi Kerugian (C) | RoMI = (EMV Diselamatkan - Kos Mitigasi) / Kos Mitigasi
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block font-medium">Jumlah EMV Diselamatkan:</span>
                  <span className="text-lg font-black text-emerald-700">{formatRM(portfolioMetrics.emvReduction)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {risks.map((r) => {
                  const inherentEMV = r.probInherent * r.lossInherentRM;
                  const residualEMV = r.probResidual * r.lossResidualRM;
                  const savedEMV = inherentEMV - residualEMV;
                  const netGain = savedEMV - r.mitigationCostRM;
                  const romi = (netGain / r.mitigationCostRM) * 100;

                  return (
                    <div
                      key={r.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {r.id}
                          </span>
                          <span className="text-[10px] text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                            {r.mandate}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-2.5 line-clamp-2 leading-relaxed">{r.title}</h4>

                        {/* Comparative Cards */}
                        <div className="grid grid-cols-2 gap-2 mt-3.5 text-xs">
                          <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-200/80">
                            <span className="text-[10px] text-rose-700 block uppercase font-bold">Inherent EMV</span>
                            <span className="font-black text-rose-950 text-sm mt-0.5 block">{formatRM(inherentEMV)}</span>
                            <span className="text-[10px] text-rose-700/80 block mt-0.5">
                              (P: {formatPercent(r.probInherent)} &times; {formatRM(r.lossInherentRM)})
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/90">
                            <span className="text-[10px] text-emerald-700 block uppercase font-bold">Residual EMV</span>
                            <span className="font-black text-emerald-950 text-sm mt-0.5 block">{formatRM(residualEMV)}</span>
                            <span className="text-[10px] text-emerald-700/80 block mt-0.5">
                              (P: {formatPercent(r.probResidual)} &times; {formatRM(r.lossResidualRM)})
                            </span>
                          </div>
                        </div>

                        {/* Financial Efficiency */}
                        <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Kos Pelaburan Mitigasi:</span>
                            <span className="font-mono font-semibold text-slate-800">{formatRM(r.mitigationCostRM)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">95% Value at Risk (VaR):</span>
                            <span className="font-mono font-bold text-amber-700">{formatRM(r.confidenceVaR95)}</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-1 border-t border-slate-200">
                            <span className="text-emerald-800">Pulangan Mitigasi (RoMI):</span>
                            <span className="text-emerald-700 font-black">+{romi.toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedRisk(r)}
                        className="mt-4 w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-800 border border-emerald-200 transition"
                      >
                        Buka Analisis Bowtie &amp; Rujukan Mandat &rarr;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KEY RISK INDICATORS TELEMETRY */}
        {activeTab === 'kri' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-emerald-600" />
                    Sistem Penunjuk Risiko Utama Masa-Nyata (KRI Telemetri FAMA)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pemantauan berterusan dengan ambang pencetus automatik bagi menyokong Jawatankuasa Khas Kesiapsiagaan Stok Makanan El Niño
                  </p>
                </div>
                <button
                  onClick={handleSimulateTelemetry}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow-sm transition flex items-center gap-2 active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTelemetrySimulating ? 'animate-spin' : ''}`} />
                  Uji Pencetus Sensor IoT
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {kris.map((kri) => {
                  return (
                    <div
                      key={kri.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 hover:border-emerald-300 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                              {kri.id}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">{kri.category}</span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 mt-1.5">{kri.name}</h3>
                          <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">
                            &bull; {kri.linkedMandate}
                          </span>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 ${
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

                      {/* Big Telemetry Value */}
                      <div className="flex items-baseline gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                        <span className="text-3xl font-black text-slate-900">{kri.currentValue}</span>
                        <span className="text-xs text-slate-500 font-semibold">{kri.unit}</span>
                      </div>

                      {/* Threshold Gauge Display */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-500 font-medium">
                          <span>Ambang Selamat: &le; {kri.greenLimit}</span>
                          <span>Ambang Amaran: &gt; {kri.greenLimit}</span>
                          <span>Kecemasan: &gt; {kri.amberLimit}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 flex overflow-hidden border border-slate-200">
                          <div className="bg-emerald-500 h-full w-1/3" title="Zon Hijau"></div>
                          <div className="bg-amber-400 h-full w-1/3" title="Zon Amaran"></div>
                          <div className="bg-rose-500 h-full w-1/3" title="Zon Bahaya"></div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{kri.description}</p>

                      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Frekuensi: {kri.frequency}</span>
                        <span className="font-medium text-emerald-700">{kri.lastUpdate}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BOWTIE BARRIER MANAGEMENT */}
        {activeTab === 'bowtie' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-emerald-600" />
                    Model Pengurusan Halangan Bowtie (Barrier Integrity Management)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Memetakan laluan pencegahan sebelum insiden (Preventive Barriers) dan laluan mitigasi pemulihan selepas insiden (Mitigating Barriers)
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {risks.map((r) => (
                  <div key={r.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          {r.id}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
                      </div>
                      <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {r.mandate}
                      </span>
                    </div>

                    {/* Bowtie Diagram Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-11 gap-3.5 items-center text-xs">
                      {/* Left: Hazard / Threats & Preventive Barriers */}
                      <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                        <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                          [ Ancaman / Punca ] &rarr; Halangan Pencegahan
                        </span>
                        <p className="text-slate-800 font-medium text-xs leading-snug">{r.bowtie.hazard}</p>
                        <div className="space-y-1.5 pt-1">
                          {r.bowtie.preventiveBarriers.map((bar, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="text-[11px] leading-snug">{bar}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Center: Top Event */}
                      <div className="lg:col-span-3 bg-gradient-to-br from-emerald-700 to-green-800 text-white p-5 rounded-2xl border border-emerald-600 text-center shadow-md">
                        <AlertTriangle className="w-6 h-6 text-amber-300 mx-auto mb-1.5" />
                        <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider block">Peristiwa Utama (Top Event)</span>
                        <p className="text-xs font-bold text-white mt-1.5 leading-snug">{r.bowtie.topEvent}</p>
                      </div>

                      {/* Right: Mitigating Barriers & Consequences */}
                      <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                          Halangan Mitigasi &rarr; [ Kawalan Kerugian ]
                        </span>
                        <div className="space-y-1.5">
                          {r.bowtie.mitigationBarriers.map((bar, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="text-[11px] leading-snug">{bar}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px]">
                          <span className="text-slate-500 font-medium">Had Residual:</span>
                          <span className="font-bold text-emerald-700">{formatRM(r.lossResidualRM)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: QUANTITATIVE RISK REGISTER */}
        {activeTab === 'register' && (
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
            <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Daftar Risiko Kuantitatif FAMA</h2>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {filteredRisks.length} rekod berangka
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari tajuk, kod QRA, mandat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white w-52 sm:w-56 transition"
                  />
                </div>

                <select
                  value={mandateFilter}
                  onChange={(e) => setMandateFilter(e.target.value)}
                  className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                >
                  <option value="All">Semua Mandat Tadbir Urus</option>
                  {MANDATE_OPTIONS.filter(m => m !== 'All').map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                >
                  <option value="All">Semua Kategori</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-600 uppercase font-semibold border-b border-slate-200 tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Kod &amp; Inisiatif FAMA</th>
                    <th className="py-3 px-4">Mandat Tadbir Urus</th>
                    <th className="py-3 px-4">Inherent EMV (RM)</th>
                    <th className="py-3 px-4">Residual EMV (RM)</th>
                    <th className="py-3 px-4">Pelaburan Mitigasi</th>
                    <th className="py-3 px-4">95% VaR (RM)</th>
                    <th className="py-3 px-4">Kemajuan</th>
                    <th className="py-3 px-4 text-right">Butiran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRisks.map((risk) => {
                    const inherentEMV = risk.probInherent * risk.lossInherentRM;
                    const residualEMV = risk.probResidual * risk.lossResidualRM;

                    return (
                      <tr
                        key={risk.id}
                        onClick={() => setSelectedRisk(risk)}
                        className="hover:bg-emerald-50/40 transition cursor-pointer group"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {risk.id}
                            </span>
                            <span className="font-semibold text-slate-900 group-hover:text-emerald-700 line-clamp-1 transition">
                              {risk.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">{risk.owner}</span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {risk.mandate}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-mono text-rose-600 font-bold">
                          {formatRM(inherentEMV)}
                        </td>

                        <td className="py-3 px-4 font-mono text-emerald-700 font-black">
                          {formatRM(residualEMV)}
                        </td>

                        <td className="py-3 px-4 font-mono text-slate-700 font-medium">
                          {formatRM(risk.mitigationCostRM)}
                        </td>

                        <td className="py-3 px-4 font-mono text-amber-700 font-bold">
                          {formatRM(risk.confidenceVaR95)}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                              <div
                                className="h-full bg-emerald-600 rounded-full"
                                style={{ width: `${risk.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-[11px] font-mono font-medium text-slate-500">{risk.progress}%</span>
                          </div>
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

      </main>

      {/* Detail Inspection Drawer for Quantitative Risk */}
      {selectedRisk && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fadeIn">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                      {selectedRisk.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{selectedRisk.category}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {selectedRisk.mandate}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2 leading-snug">{selectedRisk.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedRisk(null)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mandate References in Modal */}
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-2 text-xs">
                <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-700" /> Rujukan Mandat &amp; Dokumen Berkaitan:
                </span>
                <div className="space-y-1.5">
                  {selectedRisk.mandateCitation.map((cite, idx) => (
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

              {/* EMV Quantitative Card */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80">
                  <span className="text-[10px] text-rose-700 block uppercase font-bold">Inherent Loss &amp; EMV</span>
                  <div className="text-xl font-black text-rose-950 mt-1">
                    {formatRM(selectedRisk.probInherent * selectedRisk.lossInherentRM)}
                  </div>
                  <p className="text-[11px] text-rose-700/90 mt-1">
                    Kebarangkalian: {formatPercent(selectedRisk.probInherent)} &bull; Kerugian Bersih: {formatRM(selectedRisk.lossInherentRM)}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 block uppercase font-bold">Residual Loss &amp; EMV</span>
                  <div className="text-xl font-black text-emerald-900 mt-1">
                    {formatRM(selectedRisk.probResidual * selectedRisk.lossResidualRM)}
                  </div>
                  <p className="text-[11px] text-emerald-700/90 mt-1">
                    Kebarangkalian: {formatPercent(selectedRisk.probResidual)} &bull; Kerugian Bersih: {formatRM(selectedRisk.lossResidualRM)}
                  </p>
                </div>
              </div>

              {/* Governance & Bowtie Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Pegawai Pemilik:</span>
                  <span className="text-slate-900 font-bold">{selectedRisk.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Kos Pelaburan Mitigasi:</span>
                  <span className="text-emerald-700 font-bold">{formatRM(selectedRisk.mitigationCostRM)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">95% Value at Risk (VaR):</span>
                  <span className="text-amber-700 font-bold">{formatRM(selectedRisk.confidenceVaR95)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Pelaporan Audit:</span>
                  <span className="text-emerald-800 font-semibold">Jawatankuasa Audit Lembaga</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Status Tindakan:</span>
                  <span className="text-emerald-800 font-semibold">{selectedRisk.status} ({selectedRisk.progress}%)</span>
                </div>
              </div>

              {/* Bowtie Preventive Barriers */}
              <div>
                <h4 className="text-xs uppercase font-bold text-emerald-800 tracking-wider mb-2.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Halangan Pencegahan (Preventive Barriers)
                </h4>
                <div className="space-y-1.5">
                  {selectedRisk.bowtie.preventiveBarriers.map((bar, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      &bull; {bar}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bowtie Recovery Barriers */}
              <div>
                <h4 className="text-xs uppercase font-bold text-emerald-800 tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Halangan Pemulihan (Mitigating Barriers)
                </h4>
                <div className="space-y-1.5">
                  {selectedRisk.bowtie.mitigationBarriers.map((bar, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      &bull; {bar}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => setSelectedRisk(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition"
              >
                Tutup Paparan Analisis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Navigation Menu */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-4 py-2">
        <div className="max-w-xl mx-auto flex items-center justify-around">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-xs font-medium transition ${
              activeTab === 'overview'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[11px]">Ringkasan</span>
          </button>

          <button
            onClick={() => setActiveTab('mandates')}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-xs font-medium transition ${
              activeTab === 'mandates'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Landmark className="w-5 h-5" />
            <span className="text-[11px]">Mandat FAMA</span>
          </button>

          <button
            onClick={() => setActiveTab('emv')}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-xs font-medium transition ${
              activeTab === 'emv'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span className="text-[11px]">Model EMV</span>
          </button>

          <button
            onClick={() => setActiveTab('kri')}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-xs font-medium transition ${
              activeTab === 'kri'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Gauge className="w-5 h-5" />
            <span className="text-[11px]">KRI Telemetri</span>
          </button>

          <button
            onClick={() => setActiveTab('bowtie')}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-xs font-medium transition ${
              activeTab === 'bowtie'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[11px]">Bowtie</span>
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-xs font-medium transition ${
              activeTab === 'register'
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-5 h-5" />
            <span className="text-[11px]">Daftar Kuantitatif</span>
          </button>

        </div>
      </nav>
    </div>
  );
}
