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





export interface Activity {
  company: string
  description: string
  time: string
}


// Qrafiklər üçün Məlumatlar



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