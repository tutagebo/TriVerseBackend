export interface DataResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface RegisterResponse extends DataResponse {
  data?: {
    login_id: string;
    name: string;
  };
}

export interface LoginResponse extends DataResponse {
  data?: {
    name: string;
    uuid: string;
  };
}
