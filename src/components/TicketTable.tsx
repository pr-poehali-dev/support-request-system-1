import { Ticket, User } from "@/types/ticket";
import { useState } from "react";
import Icon from "@/components/ui/icon";
import TechnicianAssign from "./TechnicianAssign";
import TicketCard from "./TicketCard";

interface TicketTableProps {
  tickets: Ticket[];
  technicians: User[];
  onAssignTechnician: (
    ticketId: string,
    technicianId: string,
    technicianName: string,
  ) => void;
}

const TicketTable = ({
  tickets,
  technicians,
  onAssignTechnician,
}: TicketTableProps) => {
  const [assignDropdown, setAssignDropdown] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "created":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "created":
        return "Создана";
      case "in_progress":
        return "В обработке";
      case "completed":
        return "Выполнена";
      default:
        return status;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Заявка
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Пользователь
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Исполнитель
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {ticket.title}
                      </div>
                      <div className="text-sm text-gray-500">#{ticket.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ticket.userName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ticket.createdDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                    >
                      {getStatusText(ticket.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ticket.assignedTechnicianName || "Не назначен"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-vk-blue hover:text-vk-blue-dark transition-colors"
                    >
                      Просмотр
                    </button>
                    {!ticket.assignedTechnicianId && (
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setAssignDropdown(
                              assignDropdown === ticket.id ? null : ticket.id,
                            )
                          }
                          className="text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
                        >
                          <Icon name="UserPlus" size={16} />
                          Назначить
                        </button>
                        <TechnicianAssign
                          technicians={technicians}
                          isOpen={assignDropdown === ticket.id}
                          onClose={() => setAssignDropdown(null)}
                          onAssign={(techId, techName) =>
                            onAssignTechnician(ticket.id, techId, techName)
                          }
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTicket && (
        <TicketCard
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </>
  );
};

export default TicketTable;
