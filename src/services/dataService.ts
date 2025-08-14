import { 
  User, 
  Task, 
  Submission, 
  Notification, 
  Transaction 
} from '../types';
import {
  mockUsers,
  mockTasks,
  mockSubmissions,
  mockNotifications,
  mockTransactions,
  mockLeaderboard,
  mockAchievements,
  mockRewards,
  mockStatistics
} from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class DataService {
  // User methods
  async getUsers(): Promise<User[]> {
    await delay(500);
    return mockUsers;
  }

  async getUserById(id: string): Promise<User | null> {
    await delay(300);
    return mockUsers.find(user => user.id === id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    await delay(500);
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    return mockUsers[userIndex];
  }

  // Task methods
  async getTasks(filters?: {
    category?: string;
    status?: string;
    search?: string;
  }): Promise<Task[]> {
    await delay(400);
    let filteredTasks = [...mockTasks];

    if (filters?.category && filters.category !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.category === filters.category);
    }

    if (filters?.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    return filteredTasks;
  }

  async getTaskById(id: string): Promise<Task | null> {
    await delay(300);
    return mockTasks.find(task => task.id === id) || null;
  }

  async createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    await delay(600);
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    mockTasks.unshift(newTask);
    return newTask;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    await delay(500);
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;
    
    mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates };
    return mockTasks[taskIndex];
  }

  async deleteTask(id: string): Promise<boolean> {
    await delay(400);
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return false;
    
    mockTasks.splice(taskIndex, 1);
    return true;
  }

  // Submission methods
  async getSubmissions(filters?: {
    taskId?: string;
    userId?: string;
    status?: string;
  }): Promise<Submission[]> {
    await delay(400);
    let filteredSubmissions = [...mockSubmissions];

    if (filters?.taskId) {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.taskId === filters.taskId);
    }

    if (filters?.userId) {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.userId === filters.userId);
    }

    if (filters?.status) {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.status === filters.status);
    }

    return filteredSubmissions;
  }

  async getSubmissionById(id: string): Promise<Submission | null> {
    await delay(300);
    return mockSubmissions.find(sub => sub.id === id) || null;
  }

  async createSubmission(submissionData: Omit<Submission, 'id' | 'submittedAt'>): Promise<Submission> {
    await delay(600);
    const newSubmission: Submission = {
      ...submissionData,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date()
    };
    mockSubmissions.unshift(newSubmission);
    return newSubmission;
  }

  async updateSubmission(id: string, updates: Partial<Submission>): Promise<Submission | null> {
    await delay(500);
    const submissionIndex = mockSubmissions.findIndex(sub => sub.id === id);
    if (submissionIndex === -1) return null;
    
    mockSubmissions[submissionIndex] = { ...mockSubmissions[submissionIndex], ...updates };
    return mockSubmissions[submissionIndex];
  }

  async reviewSubmission(
    id: string, 
    status: 'approved' | 'rejected', 
    feedback?: string,
    reviewerId?: string
  ): Promise<Submission | null> {
    await delay(500);
    const submission = await this.updateSubmission(id, {
      status,
      feedback,
      reviewedAt: new Date(),
      reviewedBy: reviewerId
    });

    // If approved, add reward to user balance
    if (status === 'approved' && submission) {
      const task = await this.getTaskById(submission.taskId);
      if (task) {
        const user = await this.getUserById(submission.userId);
        if (user) {
          await this.updateUser(user.id, {
            balance: user.balance + task.reward
          });

          // Create transaction record
          await this.createTransaction({
            userId: user.id,
            type: 'reward',
            amount: task.reward,
            status: 'completed',
            description: `Reward dari tugas: ${task.title}`
          });
        }
      }
    }

    return submission;
  }

  // Notification methods
  async getNotifications(userId: string): Promise<Notification[]> {
    await delay(300);
    return mockNotifications
      .filter(notif => notif.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async markNotificationAsRead(id: string): Promise<boolean> {
    await delay(200);
    const notificationIndex = mockNotifications.findIndex(notif => notif.id === id);
    if (notificationIndex === -1) return false;
    
    mockNotifications[notificationIndex].read = true;
    return true;
  }

  async createNotification(notificationData: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    await delay(300);
    const newNotification: Notification = {
      ...notificationData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    mockNotifications.unshift(newNotification);
    return newNotification;
  }

  // Transaction methods
  async getTransactions(userId?: string): Promise<Transaction[]> {
    await delay(400);
    let filteredTransactions = [...mockTransactions];

    if (userId) {
      filteredTransactions = filteredTransactions.filter(trans => trans.userId === userId);
    }

    return filteredTransactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTransaction(transactionData: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
    await delay(500);
    const newTransaction: Transaction = {
      ...transactionData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    mockTransactions.unshift(newTransaction);
    return newTransaction;
  }

  async processWithdrawal(userId: string, amount: number, bankInfo: any): Promise<Transaction> {
    await delay(800);
    
    // Update user balance
    const user = await this.getUserById(userId);
    if (!user || user.balance < amount) {
      throw new Error('Insufficient balance');
    }

    await this.updateUser(userId, {
      balance: user.balance - amount
    });

    // Create withdrawal transaction
    return await this.createTransaction({
      userId,
      type: 'withdrawal',
      amount: -amount,
      status: 'pending',
      description: `Penarikan saldo ke rekening ${bankInfo.bankName} ****${bankInfo.accountNumber.slice(-4)}`
    });
  }

  // Leaderboard and achievements
  async getLeaderboard(limit: number = 10) {
    await delay(400);
    return mockLeaderboard.slice(0, limit);
  }

  async getAchievements() {
    await delay(300);
    return mockAchievements;
  }

  async getUserAchievements(userId: string) {
    await delay(300);
    // Mock user achievements - in real app, this would be based on user's actual progress
    const userSubmissions = await this.getSubmissions({ userId });
    const completedTasks = userSubmissions.filter(sub => sub.status === 'approved').length;
    
    return mockAchievements.map(achievement => ({
      ...achievement,
      completed: completedTasks >= achievement.requirement,
      progress: Math.min(completedTasks, achievement.requirement)
    }));
  }

  // Rewards catalog
  async getRewards() {
    await delay(400);
    return mockRewards;
  }

  async redeemReward(userId: string, rewardId: string): Promise<boolean> {
    await delay(600);
    const user = await this.getUserById(userId);
    const reward = mockRewards.find(r => r.id === rewardId);
    
    if (!user || !reward || user.balance < reward.points) {
      return false;
    }

    // Deduct points from user balance
    await this.updateUser(userId, {
      balance: user.balance - reward.points
    });

    // Create transaction record
    await this.createTransaction({
      userId,
      type: 'withdrawal',
      amount: -reward.points,
      status: 'completed',
      description: `Penukaran reward: ${reward.title}`
    });

    // Reduce reward stock
    reward.stock = Math.max(0, reward.stock - 1);

    return true;
  }

  // Statistics for admin
  async getStatistics() {
    await delay(500);
    return mockStatistics;
  }

  async getDashboardStats() {
    await delay(400);
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return {
      totalUsers: mockUsers.filter(u => u.role === 'customer').length,
      activeTasks: mockTasks.filter(t => t.status === 'active').length,
      pendingSubmissions: mockSubmissions.filter(s => s.status === 'pending').length,
      totalRewards: mockTransactions
        .filter(t => t.type === 'reward' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0),
      monthlyStats: {
        newUsers: mockUsers.filter(u => u.createdAt >= thisMonth).length,
        completedTasks: mockSubmissions.filter(s => 
          s.status === 'approved' && s.reviewedAt && s.reviewedAt >= thisMonth
        ).length,
        totalRewards: mockTransactions
          .filter(t => 
            t.type === 'reward' && 
            t.status === 'completed' && 
            t.createdAt >= thisMonth
          )
          .reduce((sum, t) => sum + t.amount, 0)
      }
    };
  }

  // Search functionality
  async searchAll(query: string) {
    await delay(400);
    const searchLower = query.toLowerCase();
    
    return {
      tasks: mockTasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      ),
      users: mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    };
  }
}

export const dataService = new DataService();