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

// Default team members data
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
  {
    id: '3',
    firstName: 'Darlene',
    lastName: 'Robertson',
    name: 'Darlene Robertson',
    email: 'darlene.robertson@example.com',
    phone: '8130586000',
    role: 'Frontend Developer',
    status: 'Active',
    avatar: `https://ui-avatars.com/api/?name=Darlene+Robertson&background=EC4899&color=fff`,
    joinDate: '12 Mar 2023',
  },
  {
    id: '4',
    firstName: 'Cameron',
    lastName: 'Williamson',
    name: 'Cameron Williamson',
    email: 'cameron.williamson@example.com',
    phone: '8447861700',
    role: 'Backend Developer',
    status: 'Inactive',
    avatar: `https://ui-avatars.com/api/?name=Cameron+Williamson&background=10B981&color=fff`,
    joinDate: '08 Aug 2022',
  },
  {
    id: '5',
    firstName: 'Leslie',
    lastName: 'Alexander',
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    phone: '9931750600',
    role: 'Accountant',
    status: 'Active',
    avatar: `https://ui-avatars.com/api/?name=Leslie+Alexander&background=F59E0B&color=fff`,
    joinDate: '15 Oct 2023',
  },
  {
    id: '6',
    firstName: 'Courtney',
    lastName: 'Henry',
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    phone: '8595020300',
    role: 'Marketing Specialist',
    status: 'Active',
    avatar: `https://ui-avatars.com/api/?name=Courtney+Henry&background=EF4444&color=fff`,
    joinDate: '01 Jun 2023',
  },
  {
    id: '7',
    firstName: 'Brooklyn',
    lastName: 'Simmons',
    name: 'Brooklyn Simmons',
    email: 'brooklyn.simmons@example.com',
    phone: '9824751300',
    role: 'Operations Manager',
    status: 'Inactive',
    avatar: `https://ui-avatars.com/api/?name=Brooklyn+Simmons&background=6366F1&color=fff`,
    joinDate: '20 Dec 2023',
  },
];

const TeamsPage = () => {
  const { members, addMember, setMembers } = useLocalStorage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayMembers, setDisplayMembers] = useState<TeamMember[]>([]);

  // Initialize with default members if localStorage is empty
  useEffect(() => {
    if (members.length === 0) {
      setMembers(DEFAULT_MEMBERS);
      setDisplayMembers(DEFAULT_MEMBERS);
    } else {
      setDisplayMembers(members);
    }
  }, [members, setMembers]);

  const handleAddMember = (memberData: Omit<TeamMember, 'id' | 'avatar' | 'joinDate'>) => {
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

    addMember(newMember);
    toast.success(`${memberData.name} has been added successfully!`, {
      position: 'bottom-right',
      autoClose: 3000,
    });
    setDisplayMembers((prev) => [...prev, newMember]);
  };

  return (
    <>
      <Breadcrumb title="Teams" text="Manage your team members" />

      <LazyWrapper>
        <Card className="card h-full !p-0 !block border-0 overflow-hidden mb-6">
          <CardHeader className="border-b border-neutral-200 dark:border-slate-600 !py-4 px-6 flex items-center flex-wrap gap-3 justify-between">
            <div className="flex items-center flex-wrap gap-3">
              <span className="text-base font-medium text-neutral-500 dark:text-neutral-300 mb-0">Show</span>
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

          <CardContent className="card-body p-6">
            <TeamsTable members={displayMembers} />
          </CardContent>
        </Card>
      </LazyWrapper>

      <AddMemberModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddMember={handleAddMember}
      />
    </>
  );
};

// Helper function to generate random color for avatar
const generateRandomColor = (): string => {
  const colors = ['3B82F6', 'A855F7', 'EC4899', '10B981', 'F59E0B', 'EF4444', '6366F1', '06B6D4'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default TeamsPage;