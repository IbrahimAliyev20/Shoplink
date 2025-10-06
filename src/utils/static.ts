export const navigationItems = [
    { label: "jobs", href: "/jobs" },
    { label: "companies", href: "/companies" },
    { label: "categories", href: "/categories" },
    { label: "cvs", href: "/cvs" },
    { label: "about", href: "/about" },
  ]

export const PAYMENT_METHODS = [
  { id: 'cash', name: 'Nağd ödəniş', enabled: true },
  // { id: 'epoint', name: 'E-point', enabled: false },
  // { id: 'payriff', name: 'Payriff', enabled: false },
]




export interface ChartDataPoint {
  label: string 
  value: number
}

export interface Activity {
  company: string
  description: string
  time: string
}


// Qrafiklər üçün Məlumatlar
export const monthlyChartData: ChartDataPoint[] = [
  { label: "İyun", value: 800 },
  { label: "İyul", value: 1400 },
  { label: "Avqust", value: 600 },
  { label: "Sentyabr", value: 1350 },
  { label: "Oktyabr", value: 900 },
  { label: "Noyabr", value: 1700 },
]

export const weeklyChartData: ChartDataPoint[] = [
  { label: "B.e.", value: 350 },
  { label: "Ç.a.", value: 400 },
  { label: "Çər.", value: 300 },
  { label: "C.a.", value: 500 },
  { label: "Cümə", value: 450 },
  { label: "Şən.", value: 600 },
  { label: "Baz.", value: 550 },
]

export const dailyChartData: ChartDataPoint[] = [
  { label: "00:00", value: 10 },
  { label: "04:00", value: 20 },
  { label: "08:00", value: 50 },
  { label: "12:00", value: 80 },
  { label: "16:00", value: 70 },
  { label: "20:00", value: 40 },
]

// Son Fəaliyyətlər üçün Məlumat
export const recentActivities: Activity[] = [
  { company: "Yeni sifariş qəbul edildi", description: "№#4532", time: "3 Sent 2025 • 10:57" },
  { company: "Sifariş uğurla tamamlandı", description: "№#4529", time: "3 Sent 2025 • 10:57" },
  { company: "Sifariş uğurla tamamlandı", description: "№#4529", time: "3 Sent 2025 • 10:57" },
  { company: "Yeni istifadəçi qeydiyyatı", description: "", time: "3 Sent 2025 • 10:57" },
  { company: "Yeni istifadəçi qeydiyyatı", description: "", time: "3 Sent 2025 • 10:57" },
  { company: "Uğurlu ödəniş", description: "₼560.00 kartla ödənildi", time: "" },
]







export interface ActiveInvestment {
  id: number;
  startup: {
    name: string;
    logo: string;
  };
  investmentAmount: string;
  sharePercentage: string;
  currentValue: string;
  lastUpdateDate: string;
  documents: {
    name: string;
    type: string;
  }[];
  developmentStatus: string;
  responsibleManager: string;
  category: string[];
  shortDescription: string;
  teamSize: string;
  info: string;
  amount: string;
  status: string;
}

export const mockInvestments: ActiveInvestment[] = [
  ...Array.from({ length: 50 }, (_, i) => {
    const categories = [["Texnologiya"], ["FinTech"], ["E-commerce"], ["SaaS"], ["Təhsil"]];
    const statuses = ["Uğurlu ödəmə", "Ləğv edildi", "Gözləmədə", "Ödəniş keçməyib", "Tamamlandı", "Aktiv"];
    
    return {
      id: i + 1,
      startup: {
        name: "Startup.com",
        logo: "/placeholder.svg?height=32&width=32",
      },
      investmentAmount: "7.000 AZN",
      sharePercentage: "12%",
      currentValue: "25.000 AZN",
      lastUpdateDate: "23.07.2025",
      documents: [{ name: "startupsənəd.docx", type: "docx" }],
      developmentStatus: "İnkişaf prosesi",
      responsibleManager: "Məsul başçısı",
      category: categories[i % categories.length],
      shortDescription: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
      teamSize: `${Math.floor(Math.random() * 8) + 2} nəfər`,
      info: "Balansdan ödəniş",
      amount: "2000 AZN",
      status: statuses[i % statuses.length],
    };
  }),
];

export interface MetricData {
  title: string;
  value: string;
  icon: "dollar" | "users" | "userCheck" | "zap";
}