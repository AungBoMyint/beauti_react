import authStore from "@/hooks/authStore";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const AdminMiddleware = (props: Props) => {
  const user = authStore((state) => state.currentUser);
  const isAdmin = user?.status ?? 0 > 0;
  return isAdmin ? props.children : <></>;
};

export default AdminMiddleware;
