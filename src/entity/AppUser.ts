interface AppUser {
  emailAddress: string;
  id: string;
  image: string;
  points: number;
  status: number;
  userName: string;
  password: string;
  expire_date?: string;
  birth_date?: string;
  claimed: string[]; //year string
}

export default AppUser;
