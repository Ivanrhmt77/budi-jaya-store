export type User = {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  role: string;
  image: string;
  updated_at: Date;
  created_at: Date;
  password?: string;
  type?: string;
};
