import { useState, useEffect } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: number;
    designation: string;
    status: "Active" | "Inactive";
    joinDate: string;
    avatar: string;
}

const defaultUsers: User[] = [
    {
        id: "1",
        name: "Kathryn Murphy",
        email: "osgoodwy@gmail.com",
        phone: 8700042600,
        designation: "Manager",
        status: "Active",
        joinDate: "25 Jan 2024",
        avatar: "https://ui-avatars.com/api/?name=Kathryn+Murphy&background=random&color=fff&size=40",
    },
    {
        id: "2",
        name: "Annette Black",
        email: "redaniel@gmail.com",
        phone: 8368029100,
        designation: "UI UX Designer",
        status: "Inactive",
        joinDate: "25 Jan 2024",
        avatar: "https://ui-avatars.com/api/?name=Annette+Black&background=random&color=fff&size=40",
    },
    {
        id: "3",
        name: "Darlene Robertson",
        email: "darlene.robertson@example.com",
        phone: 8130586000,
        designation: "Frontend Developer",
        status: "Active",
        joinDate: "12 Mar 2023",
        avatar: "https://ui-avatars.com/api/?name=Darlene+Robertson&background=random&color=fff&size=40",
    },
    {
        id: "4",
        name: "Cameron Williamson",
        email: "cameron.williamson@example.com",
        phone: 8447861700,
        designation: "Backend Developer",
        status: "Inactive",
        joinDate: "08 Aug 2022",
        avatar: "https://ui-avatars.com/api/?name=Cameron+Williamson&background=random&color=fff&size=40",
    },
    {
        id: "5",
        name: "Leslie Alexander",
        email: "leslie.alexander@example.com",
        phone: 9931750600,
        designation: "Accountant",
        status: "Active",
        joinDate: "15 Oct 2023",
        avatar: "https://ui-avatars.com/api/?name=Leslie+Alexander&background=random&color=fff&size=40",
    },
    {
        id: "6",
        name: "Courtney Henry",
        email: "courtney.henry@example.com",
        phone: 8595020300,
        designation: "Marketing Specialist",
        status: "Active",
        joinDate: "01 Jun 2023",
        avatar: "https://ui-avatars.com/api/?name=Courtney+Henry&background=random&color=fff&size=40",
    },
    {
        id: "7",
        name: "Brooklyn Simmons",
        email: "brooklyn.simmons@example.com",
        phone: 9824751300,
        designation: "Operations Manager",
        status: "Inactive",
        joinDate: "20 Feb 2022",
        avatar: "https://ui-avatars.com/api/?name=Brooklyn+Simmons&background=random&color=fff&size=40",
    },
    {
        id: "8",
        name: "Jerome Bell",
        email: "jerome.bell@example.com",
        phone: 9955882200,
        designation: "Sales Executive",
        status: "Active",
        joinDate: "30 Nov 2023",
        avatar: "https://ui-avatars.com/api/?name=Jerome+Bell&background=random&color=fff&size=40",
    },
    {
        id: "9",
        name: "Floyd Miles",
        email: "floyd.miles@example.com",
        phone: 7895782400,
        designation: "Support Specialist",
        status: "Active",
        joinDate: "10 Sep 2023",
        avatar: "https://ui-avatars.com/api/?name=Floyd+Miles&background=random&color=fff&size=40",
    },
    {
        id: "10",
        name: "Savannah Nguyen",
        email: "savannah.nguyen@example.com",
        phone: 8281020300,
        designation: "Legal Advisor",
        status: "Inactive",
        joinDate: "18 Dec 2022",
        avatar: "https://ui-avatars.com/api/?name=Savannah+Nguyen&background=random&color=fff&size=40",
    },
    {
        id: "11",
        name: "Arlene McCoy",
        email: "arlene.mccoy@example.com",
        phone: 9811579900,
        designation: "Office Administrator",
        status: "Active",
        joinDate: "05 May 2024",
        avatar: "https://ui-avatars.com/api/?name=Arlene+McCoy&background=random&color=fff&size=40",
    },
    {
        id: "12",
        name: "Devon Lane",
        email: "devon.lane@example.com",
        phone: 9876543200,
        designation: "System Analyst",
        status: "Inactive",
        joinDate: "22 Jul 2021",
        avatar: "https://ui-avatars.com/api/?name=Devon+Lane&background=random&color=fff&size=40",
    },
];

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUsers = localStorage.getItem("users_list");
            if (storedUsers) {
                setUsers(JSON.parse(storedUsers));
            } else {
                // Initialize with default users
                setUsers(defaultUsers);
                localStorage.setItem("users_list", JSON.stringify(defaultUsers));
            }
        } catch (error) {
            console.error("Error loading users from localStorage:", error);
            setUsers(defaultUsers);
        } finally {
            setLoading(false);
        }
    }, []);

    const addUser = (user: User) => {
        try {
            const updatedUsers = [...users, user];
            setUsers(updatedUsers);
            localStorage.setItem("users_list", JSON.stringify(updatedUsers));
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        }
    };

    const updateUser = (id: string, updatedUser: Partial<User>) => {
        try {
            const updatedUsers = users.map(user =>
                user.id === id ? { ...user, ...updatedUser } : user
            );
            setUsers(updatedUsers);
            localStorage.setItem("users_list", JSON.stringify(updatedUsers));
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    };

    const deleteUser = (id: string) => {
        try {
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
            localStorage.setItem("users_list", JSON.stringify(updatedUsers));
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    };

    return {
        users,
        loading,
        addUser,
        updateUser,
        deleteUser,
    };
}