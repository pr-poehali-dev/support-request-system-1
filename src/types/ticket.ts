export interface User {
  id: string;
  username: string;
  role: "user" | "admin" | "technician";
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "created" | "in_progress" | "completed";
  userId: string;
  userName: string;
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  createdDate: string;
  completedReport?: string;
}

export interface AppState {
  currentUser: User;
  tickets: Ticket[];
  technicians: User[];
}
