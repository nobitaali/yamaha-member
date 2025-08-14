import { User, Task, Submission, Notification, Transaction } from '../types';

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@yamaha.co.id',
    name: 'Admin Yamaha',
    phone: '+62812-3456-7890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    balance: 0,
    role: 'admin',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'budi.santoso@gmail.com',
    name: 'Budi Santoso',
    phone: '+62813-4567-8901',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    balance: 275000,
    role: 'customer',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '3',
    email: 'sari.dewi@yahoo.com',
    name: 'Sari Dewi',
    phone: '+62814-5678-9012',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    balance: 450000,
    role: 'customer',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '4',
    email: 'ahmad.rizki@gmail.com',
    name: 'Ahmad Rizki',
    phone: '+62815-6789-0123',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    balance: 180000,
    role: 'customer',
    createdAt: new Date('2024-03-05')
  },
  {
    id: '5',
    email: 'maya.putri@gmail.com',
    name: 'Maya Putri',
    phone: '+62816-7890-1234',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    balance: 320000,
    role: 'customer',
    createdAt: new Date('2024-02-28')
  },
  {
    id: '6',
    email: 'doni.pratama@gmail.com',
    name: 'Doni Pratama',
    phone: '+62817-8901-2345',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    balance: 95000,
    role: 'customer',
    createdAt: new Date('2024-03-12')
  }
];

// Mock Tasks Data
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review Service Yamaha NMAX',
    description: 'Berikan review pengalaman service motor Yamaha NMAX Anda dan upload foto struk service. Review harus mencakup kualitas pelayanan, kecepatan service, dan kepuasan keseluruhan.',
    reward: 75000,
    deadline: new Date('2025-01-25'),
    category: 'service',
    requirements: [
      'Foto struk service yang jelas',
      'Review minimal 100 kata',
      'Rating 1-5 bintang untuk setiap aspek',
      'Foto kondisi motor sebelum dan sesudah service'
    ],
    status: 'active',
    createdBy: '1',
    createdAt: new Date('2025-01-10')
  },
  {
    id: '2',
    title: 'Share Foto Motor di Instagram',
    description: 'Posting foto motor Yamaha Anda di Instagram dengan hashtag #YamahaIndonesia #YamahaCommunity. Foto harus menampilkan motor dengan latar belakang menarik.',
    reward: 35000,
    deadline: new Date('2025-01-30'),
    category: 'social',
    requirements: [
      'Posting di Instagram dengan foto berkualitas tinggi',
      'Gunakan hashtag #YamahaIndonesia #YamahaCommunity',
      'Tag minimal 3 teman',
      'Caption minimal 50 kata tentang pengalaman berkendara'
    ],
    status: 'active',
    createdBy: '1',
    createdAt: new Date('2025-01-08')
  },
  {
    id: '3',
    title: 'Survey Kepuasan Pelanggan Q1 2025',
    description: 'Bantu Yamaha meningkatkan layanan dengan mengisi survey kepuasan pelanggan. Survey mencakup pengalaman pembelian, service, dan kepuasan produk.',
    reward: 50000,
    deadline: new Date('2025-02-15'),
    category: 'survey',
    requirements: [
      'Lengkapi semua 25 pertanyaan survey',
      'Berikan feedback konstruktif',
      'Submit dalam 1x kesempatan',
      'Waktu pengisian maksimal 30 menit'
    ],
    status: 'active',
    createdBy: '1',
    createdAt: new Date('2025-01-05')
  },
  {
    id: '4',
    title: 'Test Ride Yamaha Aerox 155',
    description: 'Ikuti test ride Yamaha Aerox 155 terbaru di dealer resmi dan berikan feedback pengalaman berkendara. Dapatkan kesempatan merasakan performa terdepan.',
    reward: 100000,
    deadline: new Date('2025-01-28'),
    category: 'testride',
    requirements: [
      'Hadir di dealer yang ditentukan',
      'Membawa SIM C yang masih aktif',
      'Mengisi form feedback lengkap',
      'Foto dokumentasi saat test ride'
    ],
    status: 'active',
    createdBy: '1',
    createdAt: new Date('2025-01-12')
  },
  {
    id: '5',
    title: 'Video Review Yamaha Mio M3',
    description: 'Buat video review Yamaha Mio M3 dengan durasi 3-5 menit. Bahas performa, desain, fitur, dan pengalaman berkendara sehari-hari.',
    reward: 150000,
    deadline: new Date('2025-02-10'),
    category: 'content',
    requirements: [
      'Video durasi 3-5 menit',
      'Kualitas HD minimal 720p',
      'Bahas minimal 5 aspek motor',
      'Upload ke YouTube dan bagikan link'
    ],
    status: 'active',
    createdBy: '1',
    createdAt: new Date('2025-01-07')
  },
  {
    id: '6',
    title: 'Kunjungi Yamaha Heritage Museum',
    description: 'Kunjungi Yamaha Heritage Museum dan bagikan pengalaman Anda. Upload foto dan ceritakan sejarah Yamaha yang paling berkesan.',
    reward: 80000,
    deadline: new Date('2025-02-20'),
    category: 'event',
    requirements: [
      'Foto di depan museum dengan tiket masuk',
      'Minimal 5 foto koleksi motor klasik',
      'Cerita pengalaman minimal 200 kata',
      'Share di media sosial dengan hashtag #YamahaHeritage'
    ],
    status: 'active',
    createdBy: '1',
    createdAt: new Date('2025-01-09')
  },
  {
    id: '7',
    title: 'Referral Program - Ajak Teman Bergabung',
    description: 'Ajak teman untuk bergabung dengan komunitas Yamaha Member. Setiap teman yang berhasil mendaftar dan verifikasi akun, Anda mendapat reward.',
    reward: 25000,
    deadline: new Date('2025-03-31'),
    category: 'referral',
    requirements: [
      'Teman mendaftar menggunakan kode referral Anda',
      'Teman melengkapi profil dan verifikasi',
      'Teman menyelesaikan minimal 1 tugas',
      'Maksimal 10 referral per bulan'
    ],
    status: 'active',
    createdBy: '1',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '8',
    title: 'Workshop Safety Riding',
    description: 'Ikuti workshop safety riding yang diselenggarakan oleh Yamaha. Pelajari teknik berkendara yang aman dan dapatkan sertifikat.',
    reward: 120000,
    deadline: new Date('2025-02-05'),
    category: 'workshop',
    requirements: [
      'Hadir tepat waktu di lokasi workshop',
      'Mengikuti seluruh sesi (4 jam)',
      'Lulus ujian praktik safety riding',
      'Foto sertifikat dan upload'
    ],
    status: 'active',
    createdBy: '1',
    createdAt: new Date('2025-01-11')
  }
];

// Mock Submissions Data
export const mockSubmissions: Submission[] = [
  {
    id: '1',
    taskId: '1',
    userId: '2',
    content: {
      text: 'Service NMAX saya di dealer Yamaha Kelapa Gading sangat memuaskan. Teknisi sangat profesional dan menjelaskan setiap detail perbaikan. Waktu tunggu hanya 2 jam untuk service berkala. Motor terasa lebih halus setelah service dan suara mesin lebih senyap. Pelayanan customer service juga ramah dan informatif. Harga service sesuai dengan kualitas yang diberikan. Sangat puas dengan pengalaman service kali ini.',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop'
      ]
    },
    status: 'approved',
    submittedAt: new Date('2025-01-15'),
    reviewedAt: new Date('2025-01-16'),
    reviewedBy: '1',
    feedback: 'Review sangat detail dan informatif. Foto struk service jelas. Terima kasih atas partisipasinya!'
  },
  {
    id: '2',
    taskId: '2',
    userId: '3',
    content: {
      text: 'Yamaha Aerox kesayangan di pantai Ancol! Motor yang sempurna untuk touring dan daily riding. Performa mesin responsif dan desain yang sporty bikin percaya diri di jalan. #YamahaIndonesia #YamahaCommunity',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      ]
    },
    status: 'pending',
    submittedAt: new Date('2025-01-18')
  },
  {
    id: '3',
    taskId: '3',
    userId: '4',
    content: {
      text: 'Survey telah diisi lengkap. Secara keseluruhan sangat puas dengan produk dan layanan Yamaha. Beberapa saran untuk peningkatan layanan after sales dan ketersediaan spare part di daerah.'
    },
    status: 'approved',
    submittedAt: new Date('2025-01-14'),
    reviewedAt: new Date('2025-01-15'),
    reviewedBy: '1',
    feedback: 'Terima kasih atas feedback yang konstruktif. Masukan Anda sangat berharga untuk perbaikan layanan kami.'
  },
  {
    id: '4',
    taskId: '4',
    userId: '5',
    content: {
      text: 'Test ride Aerox 155 di dealer Yamaha Sunter. Akselerasi sangat responsif, handling stabil di tikungan, dan fitur smart key sangat praktis. Suspensi nyaman untuk berkendara jarak jauh. Sangat terkesan dengan performa mesin 155cc VVA.',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop'
      ]
    },
    status: 'pending',
    submittedAt: new Date('2025-01-19')
  }
];

// Mock Notifications Data
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    title: 'Tugas Baru Tersedia!',
    message: 'Ada tugas baru "Video Review Yamaha Mio M3" dengan reward Rp 150.000. Jangan sampai terlewat!',
    type: 'task',
    read: false,
    createdAt: new Date('2025-01-19')
  },
  {
    id: '2',
    userId: '2',
    title: 'Submission Disetujui',
    message: 'Submission Anda untuk tugas "Review Service Yamaha NMAX" telah disetujui. Reward Rp 75.000 telah ditambahkan ke saldo.',
    type: 'submission',
    read: true,
    createdAt: new Date('2025-01-16')
  },
  {
    id: '3',
    userId: '3',
    title: 'Deadline Mendekat',
    message: 'Tugas "Share Foto Motor di Instagram" akan berakhir dalam 3 hari. Segera selesaikan untuk mendapatkan reward!',
    type: 'task',
    read: false,
    createdAt: new Date('2025-01-18')
  },
  {
    id: '4',
    userId: '4',
    title: 'Selamat! Level Naik',
    message: 'Selamat! Anda telah naik ke Level 5. Dapatkan akses ke tugas eksklusif dengan reward lebih besar.',
    type: 'system',
    read: false,
    createdAt: new Date('2025-01-17')
  },
  {
    id: '5',
    userId: '5',
    title: 'Workshop Safety Riding',
    message: 'Pendaftaran workshop safety riding telah dibuka. Daftar sekarang dan dapatkan sertifikat resmi!',
    type: 'system',
    read: true,
    createdAt: new Date('2025-01-15')
  }
];

// Mock Transactions Data
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '2',
    type: 'reward',
    amount: 75000,
    status: 'completed',
    description: 'Reward dari tugas: Review Service Yamaha NMAX',
    createdAt: new Date('2025-01-16')
  },
  {
    id: '2',
    userId: '2',
    type: 'withdrawal',
    amount: -50000,
    status: 'completed',
    description: 'Penarikan saldo ke rekening BCA ****1234',
    createdAt: new Date('2025-01-14')
  },
  {
    id: '3',
    userId: '3',
    type: 'reward',
    amount: 50000,
    status: 'completed',
    description: 'Reward dari tugas: Survey Kepuasan Pelanggan Q4 2024',
    createdAt: new Date('2025-01-12')
  },
  {
    id: '4',
    userId: '3',
    type: 'reward',
    amount: 35000,
    status: 'pending',
    description: 'Reward dari tugas: Share Foto Motor di Instagram',
    createdAt: new Date('2025-01-18')
  },
  {
    id: '5',
    userId: '4',
    type: 'reward',
    amount: 50000,
    status: 'completed',
    description: 'Reward dari tugas: Survey Kepuasan Pelanggan Q1 2025',
    createdAt: new Date('2025-01-15')
  },
  {
    id: '6',
    userId: '4',
    type: 'withdrawal',
    amount: -100000,
    status: 'pending',
    description: 'Penarikan saldo ke rekening Mandiri ****5678',
    createdAt: new Date('2025-01-17')
  },
  {
    id: '7',
    userId: '5',
    type: 'reward',
    amount: 100000,
    status: 'completed',
    description: 'Reward dari tugas: Test Ride Yamaha Aerox 155',
    createdAt: new Date('2025-01-13')
  },
  {
    id: '8',
    userId: '5',
    type: 'reward',
    amount: 25000,
    status: 'completed',
    description: 'Bonus referral - Ahmad Rizki bergabung',
    createdAt: new Date('2025-01-10')
  }
];

// Additional mock data for enhanced realism
export const mockLeaderboard = [
  { rank: 1, userId: '3', name: 'Sari Dewi', points: 3250, completedTasks: 18, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
  { rank: 2, userId: '5', name: 'Maya Putri', points: 2890, completedTasks: 15, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { rank: 3, userId: '2', name: 'Budi Santoso', points: 2450, completedTasks: 12, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { rank: 4, userId: '4', name: 'Ahmad Rizki', points: 1980, completedTasks: 10, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { rank: 5, userId: '6', name: 'Doni Pratama', points: 1650, completedTasks: 8, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
];

export const mockAchievements = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Selesaikan tugas pertama Anda',
    icon: '🎯',
    requirement: 1,
    reward: 10000,
    category: 'milestone'
  },
  {
    id: '2',
    title: 'Social Butterfly',
    description: 'Selesaikan 5 tugas social media',
    icon: '📱',
    requirement: 5,
    reward: 25000,
    category: 'social'
  },
  {
    id: '3',
    title: 'Service Expert',
    description: 'Berikan 10 review service',
    icon: '🔧',
    requirement: 10,
    reward: 50000,
    category: 'service'
  },
  {
    id: '4',
    title: 'Content Creator',
    description: 'Buat 3 video review',
    icon: '🎥',
    requirement: 3,
    reward: 75000,
    category: 'content'
  },
  {
    id: '5',
    title: 'Community Leader',
    description: 'Referral 20 member baru',
    icon: '👥',
    requirement: 20,
    reward: 100000,
    category: 'referral'
  }
];

export const mockRewards = [
  {
    id: '1',
    title: 'Voucher Service Gratis',
    description: 'Voucher service berkala gratis untuk semua tipe Yamaha',
    points: 500,
    category: 'service',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    stock: 50,
    validUntil: new Date('2025-12-31')
  },
  {
    id: '2',
    title: 'Helm Yamaha Original',
    description: 'Helm half face Yamaha dengan desain eksklusif',
    points: 1000,
    category: 'merchandise',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=200&fit=crop',
    stock: 25,
    validUntil: new Date('2025-12-31')
  },
  {
    id: '3',
    title: 'Jaket Yamaha Racing',
    description: 'Jaket touring Yamaha dengan material berkualitas tinggi',
    points: 1500,
    category: 'merchandise',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
    stock: 15,
    validUntil: new Date('2025-12-31')
  },
  {
    id: '4',
    title: 'Aksesoris Motor Package',
    description: 'Paket aksesoris lengkap: spion, lampu LED, dan cover motor',
    points: 2000,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    stock: 10,
    validUntil: new Date('2025-12-31')
  },
  {
    id: '5',
    title: 'Test Ride Eksklusif',
    description: 'Kesempatan test ride motor Yamaha terbaru sebelum launching',
    points: 800,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=200&fit=crop',
    stock: 30,
    validUntil: new Date('2025-06-30')
  }
];

// Statistics for admin dashboard
export const mockStatistics = {
  totalUsers: mockUsers.filter(u => u.role === 'customer').length,
  totalTasks: mockTasks.length,
  totalSubmissions: mockSubmissions.length,
  pendingSubmissions: mockSubmissions.filter(s => s.status === 'pending').length,
  totalRewards: mockTransactions
    .filter(t => t.type === 'reward' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0),
  activeUsers: 4, // Users who completed tasks in last 30 days
  completionRate: 75, // Percentage of tasks completed
  averageRating: 4.6 // Average user satisfaction rating
};