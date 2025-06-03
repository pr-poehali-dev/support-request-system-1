import { User } from "@/types/ticket";
import Icon from "@/components/ui/icon";

interface TechnicianAssignProps {
  technicians: User[];
  onAssign: (technicianId: string, technicianName: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const TechnicianAssign = ({
  technicians,
  onAssign,
  isOpen,
  onClose,
}: TechnicianAssignProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <div className="p-2">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2 py-1">
          Выберите техника
        </div>
        {technicians.length === 0 ? (
          <div className="px-2 py-3 text-sm text-gray-500">
            Нет доступных техников
          </div>
        ) : (
          technicians.map((tech) => (
            <button
              key={tech.id}
              onClick={() => {
                onAssign(tech.id, tech.username);
                onClose();
              }}
              className="w-full text-left px-2 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 transition-colors"
            >
              <Icon name="User" size={16} />
              {tech.username}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default TechnicianAssign;
