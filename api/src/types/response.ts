export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    login_id: string;
    name: string;
  };
}