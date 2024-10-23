export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'mental-health' | 'fitness' | 'nutrition';
  type: 'article' | 'video' | 'link';
  content: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  category: 'mental-health' | 'fitness' | 'nutrition';
  startDate: Date;
  endDate: Date;
  capacity: number;
  enrolled: number;
  thumbnail?: string;
}

export interface SupportRequest {
  id: string;
  userId: string;
  type: 'counseling' | 'general';
  status: 'pending' | 'approved' | 'completed';
  description: string;
  createdAt: Date;
}