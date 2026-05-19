import UserList1 from "@/assets/images/user-list/user-list1.png";
import UserList2 from "@/assets/images/user-list/user-list2.png";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
  status: "Active" | "Inactive";
  joinDate: string;
  avatar: string;
}

export const usersData: User[] = [
  {
    id: "1",
    name: "Kathryn Murphy",
    email: "kathryn@gmail.com",
    phone: 9876543210,
    status: "Active",
    joinDate: "25 Jan 2024",
    avatar: UserList1,
  },

  {
    id: "2",
    name: "Annette Black",
    email: "annette@gmail.com",
    phone: 9988776655,
    status: "Inactive",
    joinDate: "18 Feb 2024",
    avatar: UserList2,
  },
];