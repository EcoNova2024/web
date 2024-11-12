export type User = {
  created_at: string;
  email: string;
  id: string;
  image_url: string;
  name: string;
  verified: boolean;
};

export type UpdateUser = {
  new_image: string;
  new_user: string;
};

export type UpdateEmailParams = {
  new_email: string;
};

export type UpdatePasswordParams = {
  new_password: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type VerificationParams = {
  email: string;
};

export type ResetPasswordParams = {
  email: string;
};

export type SignupParams = {
  email: string;
  image_url: string;
  name: string;
  password: string;
};