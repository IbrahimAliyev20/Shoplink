export interface HeroBanner {
    title: string;
    description: string;
    btn_text: string;
    btn_link: string;
    images: {
        image: string;
        thumb_image: string;
    }[];
  }
  
  export interface About {
    title: string;
    description: string;
    image: string;
    thumb_image: string;
  }
  
  export interface Advantages {
    title: string;
    description: string;
    image: string;
    thumb_image: string;
  }
  
  export interface Banner {
    title: string;
    btn_1: string;
    link_1: string;
    btn_2: string;
    link_2: string;
  }
  
  export interface Sellers {
    name: string;
    link: string;
    description: string;
    image: string;
    thumb_image: string;
  }
  
  export interface SosialMediaItem {
    name: string;
    link: string;
    image: string;
    thumb_image: string;
  }
  
  export interface Sosial {
    "sosial-media": SosialMediaItem[];
    logo: string;
  }
  
  export interface Setup {
    title: string;
    description: string;
  }
  
  export interface Faqs {
    name: string;
    faqs: {
        question: string;
        answer: string;
    }[];
  }
  
  export interface ContactForm {
    name: string;
    phone: string;
    message: string;
  }
  export interface Contact {
    email: string;
    phone: string;
    address: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
  }



  
  export interface TrackNumberDetail {
    quantity: string;
    product: string;
    product_price: number;
    total_price: number;
  }
  
  export interface TrackNumber {
    id: number;
    name: string;
    email: string;
    phone: string;
    note: string | null;
    address: string;
    city: string;
    total_price: number;
    status: number;
    promocode: string | null;
    detail: TrackNumberDetail[];
  }