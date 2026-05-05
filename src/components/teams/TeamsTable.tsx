import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import type { TeamMember } from "@/hooks/useLocalStorage";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

type Props = {
  members: TeamMember[];
  onDelete: (id: string) => void;
};

const TeamsTable: React.FC<Props> = ({ members, onDelete }) => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Highlight row for 2 seconds (if needed later)
  useEffect(() => {
    if (highlightedId) {
      const timer = setTimeout(() => setHighlightedId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedId]);

  // Empty state
  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No team members found</p>
        <Button variant="outline">Add Your First Member</Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        {/* HEADER */}
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {members.map((member, index) => (
            <TableRow
              key={member.id}
              onClick={() => navigate(`/teams-list/${member.id}`)}
              className={`cursor-pointer transition-colors ${
                highlightedId === member.id
                  ? "bg-green-50 dark:bg-green-950/20"
                  : "hover:bg-gray-50 dark:hover:bg-slate-800"
              }`}
            >
              {/* S.No */}
              <TableCell className="font-medium">{index + 1}</TableCell>

              {/* Name + Avatar */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-sm">{member.name}</span>
                </div>
              </TableCell>

              {/* Email */}
              <TableCell className="text-sm">{member.email}</TableCell>

              {/* Phone */}
              <TableCell className="text-sm">{member.phone}</TableCell>

              {/* Role */}
              <TableCell>
                <span className="text-sm">{member.role}</span>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={member.status === "Active" ? "default" : "secondary"}
                  className={
                    member.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {member.status}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  
                  {/* VIEW */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent row click
                      navigate(`/teams-list/${member.id}`);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {/* DELETE */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent row click
                      onDelete(member.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamsTable;