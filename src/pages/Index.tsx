import { useState } from "react";
import { AppState, Ticket, User } from "@/types/ticket";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  // Mock data for demo
  const [appState, setAppState] = useState<AppState>({
    currentUser: {
      id: "admin1",
      username: "Администратор",
      role: "admin",
    },
    technicians: [
      { id: "tech1", username: "Иван Техников", role: "technician" },
      { id: "tech2", username: "Мария Сервисова", role: "technician" },
      { id: "tech3", username: "Петр Починкин", role: "technician" },
    ],
    tickets: [
      {
        id: "001",
        title: "Не работает принтер в офисе",
        description:
          "Принтер HP LaserJet не печатает документы. Индикаторы мигают красным.",
        status: "created",
        userId: "user1",
        userName: "Анна Петрова",
        createdDate: "15.11.2024",
      },
      {
        id: "002",
        title: "Проблемы с интернетом",
        description:
          "Медленное соединение в отделе маркетинга. Скорость упала в 10 раз.",
        status: "in_progress",
        userId: "user2",
        userName: "Дмитрий Козлов",
        assignedTechnicianId: "tech1",
        assignedTechnicianName: "Иван Техников",
        createdDate: "14.11.2024",
      },
      {
        id: "003",
        title: "Установка нового ПО",
        description:
          "Необходимо установить Adobe Creative Suite на рабочую станцию дизайнера.",
        status: "completed",
        userId: "user3",
        userName: "Екатерина Дизайнова",
        assignedTechnicianId: "tech2",
        assignedTechnicianName: "Мария Сервисова",
        createdDate: "13.11.2024",
        completedReport:
          "ПО успешно установлено и настроено. Проведено обучение пользователя.",
      },
      {
        id: "004",
        title: "Компьютер не включается",
        description:
          "Рабочая станция в 205 кабинете не реагирует на нажатие кнопки питания.",
        status: "created",
        userId: "user4",
        userName: "Алексей Менеджеров",
        createdDate: "15.11.2024",
      },
      {
        id: "005",
        title: "Восстановление данных",
        description:
          "Случайно удалил важные файлы с рабочего стола. Возможно ли восстановление?",
        status: "in_progress",
        userId: "user5",
        userName: "Ольга Бухгалтерова",
        assignedTechnicianId: "tech3",
        assignedTechnicianName: "Петр Починкин",
        createdDate: "14.11.2024",
      },
    ],
  });

  const handleAssignTechnician = (
    ticketId: string,
    technicianId: string,
    technicianName: string,
  ) => {
    setAppState((prev) => ({
      ...prev,
      tickets: prev.tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              assignedTechnicianId: technicianId,
              assignedTechnicianName: technicianName,
              status: "in_progress" as const,
            }
          : ticket,
      ),
    }));
  };

  const handleLogout = () => {
    console.log("Выход из системы");
  };

  return (
    <div className="font-roboto">
      <AdminPanel
        appState={appState}
        onAssignTechnician={handleAssignTechnician}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Index;
