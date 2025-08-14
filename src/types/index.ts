export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  balance: number;
  role: 'customer' | 'admin';
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: Date;
  category: string;
  requirements: string[];
  status: 'active' | 'completed' | 'expired';
  createdBy: string;
  createdAt: Date;
}

export interface Submission {
  id: string;
  taskId: string;
  userId: string;
  content: {
    text?: string;
    images?: string[];
    videos?: string[];
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  feedback?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'task' | 'submission' | 'reward' | 'system';
  read: boolean;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'reward' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: Date;
}