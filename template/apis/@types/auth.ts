export interface AuthTokenResponse {
  refresh: string;
  access: string;
}

export interface GetStoreUserParams {
  page_size: number;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface User {
  first_name: string;
  last_name: string;
  image: string;
  birth_date: string;
}

type CombinedBody = Partial<User> & LoginBody;
export interface SignupBody extends CombinedBody {}

export interface UserInfoBody {
  name: string;
  email: string;
  bio: string;
  gender: string;
}
