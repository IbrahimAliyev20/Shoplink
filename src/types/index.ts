

export interface ApiResponse<T> {
  meta: {
    last_page: number;
    total: number;
    per_page: number;
    current_page: number;
  };

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

export interface AuthForgetpasswordResponse {
  remark: string;
  status: string;
  message:string;
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
  id?: number;
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
  selected:number; 
}


export interface  Promocode {
  id: number;
  name: string;
  discount: number;
  status: number;
}




export interface StoreOrder {
    id: number;
    user_id?: number;
    name: string;
    email: string;
    phone: string;
    note: string;
    address: string;
    city: string;
    total_price: number;
    status: number;
    promocode?: string | null;
    detail: [
        {
            quantity: string,
            product: string,
            product_price: number,
            total_price: number
        },
     
    ]

}



export interface ClientsResponse {
  id: number;
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
  created_at: string;
  order_count: number;
  feedback: string;
 
}

export interface FeedbackResponse {
  id: number;
  note: string;
  user_id: number;
  created_at: string;
}
    



interface OrderProduct {
  product_id: number;
  quantity: number;
}


export interface OrderPayload {
  user_id?: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  store_slug: string;
  note?: string;
  promocode?: string | null;
  products: OrderProduct[];
}


export interface Reports {
  quantity: string;
  product: string;
  product_price: number;
  total_price: number;
  image: string;
  category: string;
  stock: number | null;
}

export interface StoreStats {
  total_amount: number;
  total_users: number;
  todays_order: number;
  active_order: number;
}


export interface ReportStats {
  [year: string]: {
    January: string | number;
    February: string | number;
    March: string | number;
    April: string | number;
    May: string | number;
    June: string | number;
    July: string | number;
    August: string | number;
    September: string | number;
    October: string | number;
    November: string | number;
    December: string | number;
    total: number;
  };
}


export interface Subscribe {
  id: number;
  title: string;
  type: string;
  price: number;
  description: string;
  months: number;
}