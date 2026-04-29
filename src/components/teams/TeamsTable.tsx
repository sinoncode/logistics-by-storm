import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import type { TeamMember } from '@/hooks/useLocalStorage';
import { Badge } from '@/components/ui/badge';

interface TeamsTableProps {
  members: TeamMember[];
}

export const TeamsTable = ({ members }: TeamsTableProps) => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Highlight new member for 2 seconds
  if (highlightedId) {
    setTimeout(() => setHighlightedId(null), 2000);
  }

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
        <TableBody>
          {members.map((member, index) => (
            <TableRow
              key={member.id}
              className={`transition-colors ${
                highlightedId === member.id ? 'bg-green-50 dark:bg-green-950/20' : ''
              }`}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
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
              <TableCell className="text-sm">{member.email}</TableCell>
              <TableCell className="text-sm">{member.phone}</TableCell>
              <TableCell>
                <span className="text-sm">{member.role}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={member.status === 'Active' ? 'default' : 'secondary'}
                  className={
                    member.status === 'Active'
                      ? 'bg-green-100 text-green-800 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                  }
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
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
