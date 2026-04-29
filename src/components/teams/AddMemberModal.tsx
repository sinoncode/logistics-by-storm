import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MemberForm } from './MemberForm';
import type { TeamMember } from '@/hooks/useLocalStorage';
import { useState } from 'react';

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMember: (member: Omit<TeamMember, 'id' | 'avatar' | 'joinDate'>) => void;
}

export const AddMemberModal = ({ open, onOpenChange, onAddMember }: AddMemberModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (member: Omit<TeamMember, 'id' | 'avatar' | 'joinDate'>) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    onAddMember(member);
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Team Member</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new member to your team.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-4">
          <MemberForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
