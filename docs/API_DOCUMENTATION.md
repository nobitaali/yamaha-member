# API Documentation - Yamaha Member Platform

## 🌐 Base URL
- **Development**: `http://localhost:3001/api/v1`
- **Staging**: `https://api-staging.member.yamaha.co.id/v1`
- **Production**: `https://api.member.yamaha.co.id/v1`

## 🔐 Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Token Structure
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "customer|admin",
  "iat": 1640995200,
  "exp": 1641081600
}
```

## 📋 Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2025-01-20T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2025-01-20T10:30:00Z"
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔑 Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+6281234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer",
      "emailVerified": false
    },
    "token": "jwt_token_here"
  },
  "message": "Registration successful"
}
```

**Error Codes:**
- `EMAIL_EXISTS` - Email already registered
- `VALIDATION_ERROR` - Invalid input data
- `WEAK_PASSWORD` - Password doesn't meet requirements

### POST /auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer",
      "balance": 150000,
      "avatar": "https://example.com/avatar.jpg"
    },
    "token": "jwt_token_here"
  },
  "message": "Login successful"
}
```

**Error Codes:**
- `INVALID_CREDENTIALS` - Wrong email or password
- `ACCOUNT_LOCKED` - Account temporarily locked
- `EMAIL_NOT_VERIFIED` - Email verification required

### POST /auth/refresh
Refresh access token.

**Headers:**
```
Authorization: Bearer <refresh_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token_here",
    "expiresAt": "2025-01-21T10:30:00Z"
  }
}
```

### POST /auth/logout
Logout user and invalidate token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### POST /auth/forgot-password
Request password reset.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### POST /auth/reset-password
Reset password with token.

**Request Body:**
```json
{
  "token": "reset_token_here",
  "password": "NewSecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

## 👤 User Management Endpoints

### GET /users/profile
Get current user profile.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+6281234567890",
    "avatar": "https://example.com/avatar.jpg",
    "balance": 150000,
    "role": "customer",
    "emailVerified": true,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-20T10:30:00Z"
  }
}
```

### PUT /users/profile
Update user profile.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+6281234567891",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+6281234567891",
    "avatar": "https://example.com/new-avatar.jpg",
    "balance": 150000,
    "updatedAt": "2025-01-20T10:30:00Z"
  },
  "message": "Profile updated successfully"
}
```

### GET /users/stats
Get user statistics.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tasksCompleted": 12,
    "tasksActive": 3,
    "totalPoints": 2450,
    "currentLevel": 8,
    "nextLevelPoints": 3000,
    "achievements": [
      {
        "id": "first_steps",
        "title": "First Steps",
        "description": "Complete your first task",
        "unlockedAt": "2025-01-15T10:00:00Z"
      }
    ]
  }
}
```

## 📋 Task Management Endpoints

### GET /tasks
Get list of tasks with filtering and pagination.

**Query Parameters:**
- `category` (optional): Filter by task category
- `status` (optional): Filter by task status (active, completed, expired)
- `search` (optional): Search in title and description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Example Request:**
```
GET /tasks?category=service&status=active&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Review Service Yamaha NMAX",
      "description": "Berikan review pengalaman service motor Yamaha NMAX Anda",
      "reward": 75000,
      "deadline": "2025-01-25T23:59:59Z",
      "category": "service",
      "requirements": [
        "Foto struk service yang jelas",
        "Review minimal 100 kata",
        "Rating 1-5 bintang untuk setiap aspek"
      ],
      "status": "active",
      "createdBy": "admin_uuid",
      "createdAt": "2025-01-10T00:00:00Z",
      "participantCount": 245,
      "maxParticipants": 500
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 8,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### GET /tasks/:id
Get specific task details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Review Service Yamaha NMAX",
    "description": "Berikan review pengalaman service motor Yamaha NMAX Anda dan upload foto struk service. Review harus mencakup kualitas pelayanan, kecepatan service, dan kepuasan keseluruhan.",
    "reward": 75000,
    "deadline": "2025-01-25T23:59:59Z",
    "category": "service",
    "requirements": [
      "Foto struk service yang jelas",
      "Review minimal 100 kata",
      "Rating 1-5 bintang untuk setiap aspek",
      "Foto kondisi motor sebelum dan sesudah service"
    ],
    "status": "active",
    "createdBy": "admin_uuid",
    "createdAt": "2025-01-10T00:00:00Z",
    "updatedAt": "2025-01-10T00:00:00Z",
    "participantCount": 245,
    "maxParticipants": 500,
    "userSubmission": null
  }
}
```

### POST /tasks (Admin Only)
Create a new task.

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "title": "New Task Title",
  "description": "Detailed task description",
  "reward": 50000,
  "deadline": "2025-02-15T23:59:59Z",
  "category": "survey",
  "requirements": [
    "Complete all survey questions",
    "Provide constructive feedback"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new_uuid",
    "title": "New Task Title",
    "description": "Detailed task description",
    "reward": 50000,
    "deadline": "2025-02-15T23:59:59Z",
    "category": "survey",
    "requirements": [
      "Complete all survey questions",
      "Provide constructive feedback"
    ],
    "status": "active",
    "createdBy": "admin_uuid",
    "createdAt": "2025-01-20T10:30:00Z"
  },
  "message": "Task created successfully"
}
```

### PUT /tasks/:id (Admin Only)
Update existing task.

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "reward": 60000,
  "deadline": "2025-02-20T23:59:59Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Updated Task Title",
    "description": "Updated description",
    "reward": 60000,
    "deadline": "2025-02-20T23:59:59Z",
    "updatedAt": "2025-01-20T10:30:00Z"
  },
  "message": "Task updated successfully"
}
```

### DELETE /tasks/:id (Admin Only)
Delete a task.

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## 📝 Submission Endpoints

### GET /submissions
Get user's submissions or all submissions (admin).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `taskId` (optional): Filter by specific task
- `status` (optional): Filter by submission status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "taskId": "task_uuid",
      "userId": "user_uuid",
      "content": {
        "text": "Service NMAX saya di dealer Yamaha Kelapa Gading sangat memuaskan...",
        "images": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ]
      },
      "status": "approved",
      "submittedAt": "2025-01-15T14:30:00Z",
      "reviewedAt": "2025-01-16T09:00:00Z",
      "reviewedBy": "admin_uuid",
      "feedback": "Review sangat detail dan informatif. Terima kasih!",
      "task": {
        "title": "Review Service Yamaha NMAX",
        "reward": 75000
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1
  }
}
```

### POST /submissions
Submit task completion.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "taskId": "task_uuid",
  "content": {
    "text": "Detailed review of the service experience...",
    "images": [
      "https://example.com/uploaded-image1.jpg",
      "https://example.com/uploaded-image2.jpg"
    ],
    "videos": [
      "https://example.com/uploaded-video.mp4"
    ]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new_submission_uuid",
    "taskId": "task_uuid",
    "userId": "user_uuid",
    "content": {
      "text": "Detailed review of the service experience...",
      "images": [
        "https://example.com/uploaded-image1.jpg",
        "https://example.com/uploaded-image2.jpg"
      ]
    },
    "status": "pending",
    "submittedAt": "2025-01-20T10:30:00Z"
  },
  "message": "Submission created successfully"
}
```

### PUT /submissions/:id/review (Admin Only)
Review and approve/reject submission.

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "status": "approved",
  "feedback": "Excellent work! All requirements met."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "submission_uuid",
    "status": "approved",
    "reviewedAt": "2025-01-20T10:30:00Z",
    "reviewedBy": "admin_uuid",
    "feedback": "Excellent work! All requirements met."
  },
  "message": "Submission reviewed successfully"
}
```

## 🎁 Rewards Endpoints

### GET /rewards
Get available rewards catalog.

**Query Parameters:**
- `category` (optional): Filter by reward category
- `search` (optional): Search in title and description
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Voucher Service Gratis",
      "description": "Voucher service berkala gratis untuk semua tipe Yamaha",
      "points": 500,
      "category": "service",
      "image": "https://example.com/voucher-image.jpg",
      "stock": 50,
      "validUntil": "2025-12-31T23:59:59Z",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1
  }
}
```

### POST /rewards/:id/redeem
Redeem a reward with points.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "deliveryAddress": {
    "name": "John Doe",
    "phone": "+6281234567890",
    "address": "Jl. Sudirman No. 123",
    "city": "Jakarta",
    "postalCode": "12345"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "redemptionId": "redemption_uuid",
    "rewardId": "reward_uuid",
    "pointsUsed": 500,
    "status": "processing",
    "redeemedAt": "2025-01-20T10:30:00Z",
    "estimatedDelivery": "2025-01-25T00:00:00Z"
  },
  "message": "Reward redeemed successfully"
}
```

## 💰 Payment Endpoints

### POST /payments/create
Create a new payment transaction.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "amount": 100000,
  "method": "gopay",
  "returnUrl": "https://member.yamaha.co.id/payment/success",
  "cancelUrl": "https://member.yamaha.co.id/payment/cancel"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentId": "payment_uuid",
    "orderId": "ORDER-20250120-001",
    "amount": 100000,
    "method": "gopay",
    "status": "pending",
    "paymentUrl": "https://api.midtrans.com/v2/gopay/...",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "expiresAt": "2025-01-20T11:30:00Z",
    "createdAt": "2025-01-20T10:30:00Z"
  },
  "message": "Payment created successfully"
}
```

### GET /payments/:id
Get payment details.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "payment_uuid",
    "orderId": "ORDER-20250120-001",
    "amount": 100000,
    "method": "gopay",
    "status": "success",
    "paidAt": "2025-01-20T10:35:00Z",
    "createdAt": "2025-01-20T10:30:00Z"
  }
}
```

### POST /payments/webhook
Handle payment gateway webhooks.

**Request Body (Midtrans):**
```json
{
  "transaction_time": "2025-01-20 10:35:00",
  "transaction_status": "settlement",
  "transaction_id": "midtrans_transaction_id",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "signature_hash",
  "payment_type": "gopay",
  "order_id": "ORDER-20250120-001",
  "merchant_id": "merchant_id",
  "gross_amount": "100000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook processed successfully"
}
```

## 💳 Wallet Endpoints

### GET /wallet/balance
Get current wallet balance.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": 275000,
    "currency": "IDR",
    "lastUpdated": "2025-01-20T10:30:00Z"
  }
}
```

### GET /wallet/transactions
Get wallet transaction history.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `type` (optional): Filter by transaction type (credit, debit)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "transaction_uuid",
      "type": "credit",
      "amount": 75000,
      "description": "Reward dari tugas: Review Service Yamaha NMAX",
      "status": "completed",
      "createdAt": "2025-01-16T09:00:00Z"
    },
    {
      "id": "transaction_uuid_2",
      "type": "debit",
      "amount": -50000,
      "description": "Penarikan saldo ke rekening BCA ****1234",
      "status": "completed",
      "createdAt": "2025-01-14T15:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 10,
    "totalPages": 1
  }
}
```

### POST /wallet/withdraw
Request wallet withdrawal.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "amount": 100000,
  "bankCode": "BCA",
  "accountNumber": "1234567890",
  "accountName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "withdrawalId": "withdrawal_uuid",
    "amount": 100000,
    "bankCode": "BCA",
    "accountNumber": "****7890",
    "status": "pending",
    "estimatedProcessing": "2025-01-21T00:00:00Z",
    "createdAt": "2025-01-20T10:30:00Z"
  },
  "message": "Withdrawal request submitted successfully"
}
```

## 🔔 Notification Endpoints

### GET /notifications
Get user notifications.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `read` (optional): Filter by read status (true/false)
- `type` (optional): Filter by notification type
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "notification_uuid",
      "title": "Tugas Baru Tersedia!",
      "message": "Ada tugas baru 'Video Review Yamaha Mio M3' dengan reward Rp 150.000",
      "type": "task",
      "read": false,
      "createdAt": "2025-01-19T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1
  }
}
```

### PUT /notifications/:id/read
Mark notification as read.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### PUT /notifications/read-all
Mark all notifications as read.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

## 📊 Admin Analytics Endpoints

### GET /admin/stats (Admin Only)
Get platform statistics.

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 1250,
      "active": 890,
      "newThisMonth": 45
    },
    "tasks": {
      "total": 25,
      "active": 8,
      "completed": 17
    },
    "submissions": {
      "total": 3420,
      "pending": 23,
      "approved": 3180,
      "rejected": 217
    },
    "transactions": {
      "totalVolume": 125000000,
      "totalRewards": 89500000,
      "totalWithdrawals": 35500000
    },
    "engagement": {
      "dailyActiveUsers": 234,
      "averageSessionDuration": 1245,
      "taskCompletionRate": 0.78
    }
  }
}
```

### GET /admin/users (Admin Only)
Get users list with management capabilities.

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `search` (optional): Search by name or email
- `role` (optional): Filter by user role
- `status` (optional): Filter by account status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user_uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+6281234567890",
      "role": "customer",
      "balance": 275000,
      "emailVerified": true,
      "status": "active",
      "lastLoginAt": "2025-01-20T08:00:00Z",
      "createdAt": "2025-01-01T00:00:00Z",
      "stats": {
        "tasksCompleted": 12,
        "totalEarned": 450000
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1250,
    "totalPages": 63
  }
}
```

## 📁 File Upload Endpoints

### POST /upload/image
Upload image file.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body:**
```
Form data with 'image' field containing the file
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.member.yamaha.co.id/uploads/images/uuid.jpg",
    "filename": "uuid.jpg",
    "size": 1024000,
    "mimeType": "image/jpeg"
  },
  "message": "Image uploaded successfully"
}
```

### POST /upload/video
Upload video file.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body:**
```
Form data with 'video' field containing the file
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.member.yamaha.co.id/uploads/videos/uuid.mp4",
    "filename": "uuid.mp4",
    "size": 10240000,
    "mimeType": "video/mp4",
    "duration": 120
  },
  "message": "Video uploaded successfully"
}
```

## ❌ Error Codes

### Authentication Errors
- `AUTH_001` - Invalid credentials
- `AUTH_002` - Token expired
- `AUTH_003` - Token invalid
- `AUTH_004` - Account locked
- `AUTH_005` - Email not verified
- `AUTH_006` - Insufficient permissions

### Validation Errors
- `VAL_001` - Required field missing
- `VAL_002` - Invalid email format
- `VAL_003` - Password too weak
- `VAL_004` - Invalid phone number
- `VAL_005` - File too large
- `VAL_006` - Invalid file type

### Business Logic Errors
- `BIZ_001` - Insufficient balance
- `BIZ_002` - Task already submitted
- `BIZ_003` - Task expired
- `BIZ_004` - Reward out of stock
- `BIZ_005` - Maximum participants reached
- `BIZ_006` - Duplicate submission

### System Errors
- `SYS_001` - Database connection error
- `SYS_002` - External service unavailable
- `SYS_003` - File upload failed
- `SYS_004` - Payment gateway error
- `SYS_005` - Email service error

## 🔄 Rate Limiting

### Rate Limits by Endpoint Type
- **Authentication**: 5 requests per 15 minutes per IP
- **General API**: 100 requests per 15 minutes per user
- **File Upload**: 10 requests per hour per user
- **Payment**: 3 requests per minute per user
- **Admin**: 1000 requests per 15 minutes per admin

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## 🔍 Testing

### Postman Collection
Import the Postman collection for easy API testing:
```
https://api.member.yamaha.co.id/docs/postman-collection.json
```

### Test Accounts
**Customer Account:**
- Email: `test.customer@yamaha.co.id`
- Password: `TestPass123!`

**Admin Account:**
- Email: `test.admin@yamaha.co.id`
- Password: `AdminPass123!`

### Webhook Testing
Use ngrok for local webhook testing:
```bash
ngrok http 3001
# Use the generated URL for webhook endpoints
```

This API documentation provides comprehensive information about all available endpoints, request/response formats, authentication requirements, and error handling for the Yamaha Member platform.