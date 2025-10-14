// Order Detail Page Data
export const orderDetailPageData = {
  order: {
    orderNumber: "#9581347322",
    orderedBy: "Aysun Feyzullayeva",
    deliveryAddress: "Nizami rayonu, M.Abbasov küçəsi",
    orderSummary: "1 məhsul",
    orderDate: "01.20.2003",
  },
  product: {
    id: 1,
    name: "Tommy Hilfiger Men's Kelby Sneaker",
    image: "/images/sneaker.jpg", 
    price: "1250 AZN",
    quantity: 1,
  },
  paymentDetails: {
    price: "1250 AZN",
    deliveryCost: "20 AZN",
    totalAmount: "1270 AZN",
  },
  contactInfo: {
    email: "stridex@gmail.com",
    phone: "+994 700 70 77",
    address: "Nizami rayonu, M.Abbasov küçəsi",
    socialMedia: {
      facebook: "#",
      instagram: "#",
      telegram: "#",
    },
  },
};

export const orderTrackPageData = {
  tracking: {
    deliveryNumber: "#9581347322",
    currentStatus: "Sifarişiniz hazırlanılır",
    trackingSteps: [
      {
        id: 1,
        label: "Sifarişin təsdiqi",
        status: "completed",
        description: "Sifarişiniz artıq təsdiqlənib",
        timestamp: "05.09.2025 11:24",
      },
      {
        id: 2,
        label: "Sifarişin hazırlanılır",
        status: "current",
        description: "Sifarişiniz hazırlanmağa başlanılır",
        timestamp: "05.09.2025 11:24",
      },
      {
        id: 3,
        label: "Sifarişiniz yoldadır",
        status: "pending",
        description: "Sifarişiniz çatdırılma üçün yoldadır",
        timestamp: null,
      },
      {
        id: 4,
        label: "Sifarişiniz çatdırıldı",
        status: "pending",
        description: "Sifarişiniz uğurla çatdırıldı",
        timestamp: null,
      },
    ],
  },
  orderInfo: {
    orderNumber: "#9581347322",
    orderedBy: "Aysun Feyzullayeva",
    deliveryAddress: "Nizami rayonu, M.Abbasov küçəsi",
    orderSummary: "1 məhsul",
    orderDate: "01.20.2003",
  },
  product: {
    id: 1,
    name: "Tommy Hilfiger Men's Kelby Sneaker",
    image: "/images/sneaker.jpg",
    price: "1250 AZN",
    quantity: 1,
  },
  paymentDetails: {
    price: "1250 AZN",
    deliveryCost: "20 AZN",
    totalAmount: "1270 AZN",
  },
};

export const statusConfig = {
  completed: {
    bgColor: "bg-green-500",
    textColor: "text-green-600",
    icon: "✓",
  },
  current: {
    bgColor: "bg-green-500",
    textColor: "text-green-600",
    icon: "●",
  },
  pending: {
    bgColor: "bg-gray-300",
    textColor: "text-gray-400",
    icon: "○",
  },
};
