# Admin User Creation Guide

This guide explains how to create an admin user for the HoardSpace platform.

## Prerequisites

- MongoDB connection should be configured in your `.env` file
- Make sure you have `bcryptjs` installed (should already be in dependencies)
- **Security requirement:** Set `ADMIN_CREATION_SECRET` in your `.env` file

## Security Setup

Before running any admin creation scripts, add this to your `.env` file:

```env
ADMIN_CREATION_SECRET=your-secure-random-secret-here
```

🔒 **Why this is required:** This prevents unauthorized admin user creation even if someone gains access to your codebase. Generate a strong random string and keep it secure.

💡 **Tip:** You can generate a secure secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Option 1: Create Default Admin (Quickest)

This creates an admin user with pre-defined credentials:

```bash
npm run create-default-admin
```

**Default Credentials:**

- **Email:** admin@hoardspace.com
- **Password:** Admin@123456

⚠️ **IMPORTANT:** Change the password after your first login!

## Option 2: Create Custom Admin (Interactive)

This script will prompt you to enter custom admin details:

```bash
npm run create-admin
```

You'll be asked to provide:

- Admin name
- Admin email
- Admin password (minimum 6 characters)
- Admin phone (optional)

## Option 3: Direct Script Execution

You can also run the scripts directly:

```bash
# Default admin
node scripts/create-default-admin.js

# Custom admin (interactive)
node scripts/create-admin.js
```

## What the Scripts Do

1. **Verify ADMIN_CREATION_SECRET** is set in environment
2. **Connect to MongoDB** using your `MONGODB_URI` environment variable
3. **Check for existing users** with the same email
4. **Hash the password** securely using bcrypt
5. **Create the admin user** with:
   - Role: `admin`
   - Email verified: `true`
   - KYC status: `approved`
   - Auth provider: `local`

## After Creating Admin

1. Go to your application login page
2. Use the admin credentials to login
3. You'll be automatically redirected to `/admin/dashboard`
4. **Change the default password** if you used the default admin

## Admin Dashboard Access

Once logged in as admin, you can access:

- **User Management:** View, approve/reject KYC, delete users
- **Hoarding Management:** Approve/reject listings, delete hoardings
- **Platform Statistics:** View overall platform metrics

## Troubleshooting

### Error: User already exists

If you see this error, the script detected an existing user with the same email. You can:

- Use the interactive script (`npm run create-admin`) to update the existing user to admin
- Choose a different email address
- Delete the existing user from MongoDB first

### Error: MongoDB connection failed

Check that:

- Your `MONGODB_URI` environment variable is set correctly
- MongoDB is running and accessible
- Your database credentials are correct

### Error: Module not found

Make sure all dependencies are installed:

```bash
npm install
```

## Security Notes

- Passwords are hashed using bcrypt with salt rounds of 10
- Never commit admin credentials to version control
- Change default passwords immediately after first use
- Use strong, unique passwords for production environments
- Consider using environment variables for admin creation in production

## Environment Variable

Make sure your `.env.local` file contains:

```env
MONGODB_URI=your_mongodb_connection_string
```

Example:

```env
MONGODB_URI=mongodb://localhost:27017/hoardspace
# or for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hoardspace
```
