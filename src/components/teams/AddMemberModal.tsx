import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddMemberForm from "/home/sumit-pal/Desktop/logistics-by-storm/src/pages/teams/add-member/AddMember";

type Role = {
  id: string;
  name: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMember: (data: any) => void;
  roles: Role[];
};

export const AddMemberModal = ({
  open,
  onOpenChange,
  onAddMember,
  roles,
}: Props) => {
  const handleSubmit = (data: any) => {
    onAddMember(data);
    onOpenChange(false); // close modal after submit
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
     <DialogContent className="!max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>

        <AddMemberForm onSubmit={handleSubmit} roles={roles} />
      </DialogContent>
    </Dialog>
  );
};