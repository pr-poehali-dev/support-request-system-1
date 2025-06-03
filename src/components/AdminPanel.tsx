import { useState } from "react";
import { AppState, Ticket } from "@/types/ticket";
import Icon from "@/components/ui/icon";
import TicketTable from "./TicketTable";

interface AdminPanelProps {
  appState: AppState;
  onAssignTechnician: (
    ticketId: string,
    technicianId: string,
    technicianName: string,
  ) => void;
  onLogout: () => void;
}

const AdminPanel = ({
  appState,
  onAssignTechnician,
  onLogout,
}: AdminPanelProps) => {
  const [filter, setFilter] = useState<
    "all" | "created" | "in_progress" | "completed"
  >("all");

  const filteredTickets = appState.tickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  const getFilterButtonClass = (currentFilter: string) => {
    return filter === currentFilter
      ? "px-4 py-2 bg-vk-blue text-white rounded-lg text-sm font-medium"
      : "px-4 py-2 text-gray-600 hover:text-vk-blue transition-colors text-sm font-medium";
  };

  const stats = {
    total: appState.tickets.length,
    created: appState.tickets.filter((t) => t.status === "created").length,
    inProgress: appState.tickets.filter((t) => t.status === "in_progress")
      .length,
    completed: appState.tickets.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Icon name="Shield" size={24} className="text-vk-blue mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                Панель администратора
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={20} className="text-gray-400" />
                <span className="text-sm text-gray-700">
                  {appState.currentUser.username}
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Администратор
                </span>
              </div>
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Icon name="LogOut" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Icon name="FileText" size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Всего заявок
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Icon name="Clock" size={24} className="text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Новые</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.created}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Icon name="Play" size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">В работе</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.inProgress}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Icon name="CheckCircle" size={24} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Выполнены</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completed}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-sm font-medium text-gray-700">Фильтр:</span>
          <button
            onClick={() => setFilter("all")}
            className={getFilterButtonClass("all")}
          >
            Все заявки
          </button>
          <button
            onClick={() => setFilter("created")}
            className={getFilterButtonClass("created")}
          >
            Новые
          </button>
          <button
            onClick={() => setFilter("in_progress")}
            className={getFilterButtonClass("in_progress")}
          >
            В работе
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={getFilterButtonClass("completed")}
          >
            Выполненные
          </button>
        </div>

        {/* Tickets Table */}
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Icon
              name="FileText"
              size={48}
              className="text-gray-300 mx-auto mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Заявок не найдено
            </h3>
            <p className="text-gray-500">
              {filter === "all"
                ? "В системе пока нет заявок."
                : `Нет заявок со статусом "${filter}".`}
            </p>
          </div>
        ) : (
          <TicketTable
            tickets={filteredTickets}
            technicians={appState.technicians}
            onAssignTechnician={onAssignTechnician}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
