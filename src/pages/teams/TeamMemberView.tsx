import { useParams } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Breadcrumb from "@/layouts/Breadcrumb";

const TeamMemberView = () => {
  const { id } = useParams();
  const { members } = useLocalStorage();

  const member = members.find((m) => m.id === id);

  if (!member) {
    return <div className="p-6">Member not found</div>;
  }

  return (
    <>
      <Breadcrumb title="Team Member" text="Member Details" />

      <div className="p-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-24 h-24 rounded-full mb-4"
          />

          <h2 className="text-xl font-semibold">{member.name}</h2>
          <p className="text-gray-500">{member.role}</p>

          <div className="mt-4 space-y-2">
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Phone:</strong> {member.phone}</p>
            <p><strong>Status:</strong> {member.status}</p>
            <p><strong>Joined:</strong> {member.joinDate}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberView;