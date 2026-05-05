import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LazyWrapper from "@/components/LazyWrapper";
import CustomSelect from '@/components/shared/CustomSelect';
import SearchBox from '@/components/shared/SearchBox';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Breadcrumb from "@/layouts/Breadcrumb";
import { Plus } from "lucide-react";
import { useLocalStorage, type TeamMember } from '@/hooks/useLocalStorage';
import { AddMemberModal } from '@/components/teams/AddMemberModal';
import TeamsTable from '@/components/teams/TeamsTable';

// Default team members
const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: '1',
    firstName: 'Kathryn',
    lastName: 'Murphy',
    name: 'Kathryn Murphy',
    email: 'osgoodwy@gmail.com',
    phone: '8700042600',
    role: 'Manager',
    status: 'Active',
    avatar: `https://ui-avatars.com/api/?name=Kathryn+Murphy&background=3B82F6&color=fff`,
    joinDate: '25 Jan 2024',
  },
  {
    id: '2',
    firstName: 'Annette',
    lastName: 'Black',
    name: 'Annette Black',
    email: 'redaniel@gmail.com',
    phone: '8368029100',
    role: 'UI UX Designer',
    status: 'Inactive',
    avatar: `https://ui-avatars.com/api/?name=Annette+Black&background=A855F7&color=fff`,
    joinDate: '25 Jan 2024',
  },
];

const roles = [
  { id: "1", name: "Manager" },
  { id: "2", name: "Frontend Developer" },
  { id: "3", name: "Backend Developer" },
  { id: "4", name: "Accountant" },
];

const TeamsPage = () => {
  const { members, addMember, setMembers } = useLocalStorage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize default data
  useEffect(() => {
    if (members.length === 0) {
      setMembers(DEFAULT_MEMBERS);
    }
  }, [members, setMembers]);

  // ✅ Add Member
  const handleAddMember = (
    memberData: Omit<TeamMember, 'id' | 'avatar' | 'joinDate'>
  ) => {
    const newMember: TeamMember = {
      ...memberData,
      id: `member-${Date.now()}`,
      avatar: `https://ui-avatars.com/api/?name=${memberData.firstName}+${memberData.lastName}&background=${generateRandomColor()}&color=fff`,
      joinDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    const updatedMembers = [...members, newMember];

    setMembers(updatedMembers);

    toast.success(`${memberData.name} added successfully!`, {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  // ✅ Delete Member
  const handleDeleteMember = (id: string) => {
    const updatedMembers = members.filter((m) => m.id !== id);

    setMembers(updatedMembers);

    toast.success("Member deleted successfully!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <>
      <Breadcrumb title="Teams" text="Manage your team members" />

      <LazyWrapper>
        <Card className="card h-full !p-0 !block border-0 overflow-hidden mb-6">
          <CardHeader className="border-b border-neutral-200 dark:border-slate-600 !py-4 px-6 flex items-center flex-wrap gap-3 justify-between">
            <div className="flex items-center flex-wrap gap-3">
              <span className="text-base font-medium text-neutral-500">Show</span>

              <CustomSelect
                placeholder="10"
                options={["5", "10", "15", "20", "25", "50"]}
              />

              <SearchBox />

              <CustomSelect
                placeholder="Status"
                options={["All", "Active", "Inactive"]}
              />
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-auto h-11 bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Member
            </Button>
          </CardHeader>

          <CardContent className="p-6">
            <TeamsTable
              members={members} // ✅ single source of truth
              onDelete={handleDeleteMember}
            />
          </CardContent>
        </Card>
      </LazyWrapper>

      <AddMemberModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddMember={handleAddMember}
        roles={roles}
      />
    </>
  );
};

// Helper
const generateRandomColor = (): string => {
  const colors = ['3B82F6', 'A855F7', 'EC4899', '10B981', 'F59E0B', 'EF4444', '6366F1', '06B6D4'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default TeamsPage;