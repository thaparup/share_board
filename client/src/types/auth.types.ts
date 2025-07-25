type SignupFormData = {
  name: string;
  email: string;
  password: string;
  avatarImageFile?: File;
};

type SigninFormData = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  avatarImage: string;
  role?: "ADMIN" | "MEMBER";
};

type AuthStoreType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  // fetchUser: () => Promise<boolean>;
};

type UsersResponse = {
  message: string;
  data: User[];
};

export type {
  SignupFormData,
  SigninFormData,
  AuthStoreType,
  User,
  UsersResponse,
};
