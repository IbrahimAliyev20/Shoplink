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

export interface AuthLoginResponse {
  data: {
      token: string;
      user: {
          name: string;
          email: string;
          phone: string;
          complete: number;
          role: string[];
      };
      token_type: string;
  };
  message: string;
}

export interface AuthRegisterResponse {
  status: string;
  message: string;
  data?: {
      token: string;
      user: {
          id: number;
          name: string;
          email: string;
          phone: string;
          store_name: string;
          store_id: string;
      };
  };
  remark: string;
  messages: {
      error: string[];
  };
}

export interface RegisterFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  store_name?: string;
  store_id?: string;
}

export interface UserData {
  name: string;
  phone: string;
  email: string;
  voen: string;
  fin: string;
  type: string;
  region: string;
  image: string;
  role: string[];
  complete: number;
}


export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AllStore {
  id: number;
  name: string;
  language: string;
  currency: string;
  logo: string;
  thumb_logo: string;
  background_image: string;
  thumb_background_image: string;
  slug: string;
}


export interface StoreDelete {
  id: number;
}

export interface ApiErrorResponse {
  remark: string;
  status: "error";
  message: {
    error: string[];
  };
}
export interface UpdateApiResponse {
  id: number;
  name: string;
  language: string;
  currency: string;
  logo: string;
  thumb_logo: string;
  background_image: string;
  thumb_background_image: string;
}


////////////////////////////


export interface Address {
  id: number;
  country: string;
  city: string;
  address: string;
  title: string;
  name: string;
  surname: string;
  phone: string;
  selected: boolean | null; 
}


export interface  Promocode {
  id: number;
  name: string;
  discount: number;
}