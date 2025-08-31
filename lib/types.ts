export type User = {
  id: number;
  email: string;
  name: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Fetcher = {
  url: string;
  body?: object;
};

export type AuthMode = "signin" | "signup";
