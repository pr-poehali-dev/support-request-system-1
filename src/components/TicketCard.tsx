import { Ticket } from "@/types/ticket";
import Icon from "@/components/ui/icon";

interface TicketCardProps {
  ticket: Ticket;
  onClose: () => void;
}

const TicketCard = ({ ticket, onClose }: TicketCardProps) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Заявка #{ticket.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {ticket.title}
            </h3>
            <p className="text-gray-700">{ticket.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Статус:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
              >
                {getStatusText(ticket.status)}
              </span>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">
                Дата создания:
              </span>
              <span className="ml-2 text-sm text-gray-900">
                {ticket.createdDate}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">
                Пользователь:
              </span>
              <span className="ml-2 text-sm text-gray-900">
                {ticket.userName}
              </span>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">
                Исполнитель:
              </span>
              <span className="ml-2 text-sm text-gray-900">
                {ticket.assignedTechnicianName || "Не назначен"}
              </span>
            </div>
          </div>

          {ticket.completedReport && (
            <div>
              <span className="text-sm font-medium text-gray-500">
                Отчет техника:
              </span>
              <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                {ticket.completedReport}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
