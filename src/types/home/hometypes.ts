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
  
  export interface Contact {
    name: string;
    phone: string;
    message: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
  }