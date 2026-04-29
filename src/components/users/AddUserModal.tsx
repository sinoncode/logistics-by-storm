import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { UserForm } from "./UserForm";

interface AddUserModalProps {
    onUserAdded: () => void;
}

export function AddUserModal({ onUserAdded }: AddUserModalProps) {
    const [open, setOpen] = useState(false);

    const handleUserAdded = () => {
        setOpen(false);
        onUserAdded();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-auto h-11">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new user to the system.
                    </DialogDescription>
                </DialogHeader>
                <UserForm onUserAdded={handleUserAdded} />
            </DialogContent>
        </Dialog>
    );
}