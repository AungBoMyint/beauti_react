interface AppUser {
  emailAddress: string;
  id: string;
  image: string;
  points: number;
  status: number;
  userName: string;
  expire_date?: string;
  birth_date?: string;
}
export default AppUser;
