/**
 * Quick script to create a default admin user
 * Run with: node scripts/create-default-admin.js
 *
 * Default credentials:
 * Email: admin@hoardspace.com
 * Password: Admin@123456
 */

// Load environment variables from .env file
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// MongoDB connection URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("\n❌ ERROR: MONGODB_URI is not set in .env file\n");
  console.log("Please add MONGODB_URI to your .env file:");
  console.log(
    "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database\n",
  );
  process.exit(1);
}

// Default admin credentials
const DEFAULT_ADMIN = {
  name: "Admin User",
  email: "admin@hoardspace.com",
  password: "Admin@123456",
  phone: "+919999999999",
};

// User Schema (matching your model)
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    role: {
      type: String,
      enum: ["buyer", "vendor", "admin"],
      default: "buyer",
      required: true,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      required: true,
    },
    emailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    kycStatus: {
      type: String,
      enum: ["not_submitted", "pending", "approved", "rejected"],
      default: "not_submitted",
    },
    image: { type: String },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function createDefaultAdmin() {
  try {
    console.log("\n🔐 Creating Default Admin User\n");
    console.log("================================================\n");

    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: DEFAULT_ADMIN.email });
    if (existingAdmin) {
      console.log("⚠️  Admin user already exists!");
      console.log("\nExisting admin details:");
      console.log(`- Name: ${existingAdmin.name}`);
      console.log(`- Email: ${existingAdmin.email}`);
      console.log(`- Role: ${existingAdmin.role}`);
      console.log(`- Created: ${existingAdmin.createdAt}`);
      console.log(
        "\n💡 Use scripts/create-admin.js to create a custom admin\n",
      );
      process.exit(0);
    }

    // Hash password
    console.log("Creating admin user...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, salt);

    // Create admin user
    const adminUser = await User.create({
      name: DEFAULT_ADMIN.name,
      email: DEFAULT_ADMIN.email,
      password: hashedPassword,
      phone: DEFAULT_ADMIN.phone,
      role: "admin",
      authProvider: "local",
      emailVerified: true,
      isPhoneVerified: true,
      kycStatus: "approved",
    });

    console.log("\n✅ Default admin user created successfully!\n");
    console.log("================================================");
    console.log("Default Admin Credentials:");
    console.log("================================================");
    console.log(`Email: ${DEFAULT_ADMIN.email}`);
    console.log(`Password: ${DEFAULT_ADMIN.password}`);
    console.log("================================================");
    console.log(`Name: ${adminUser.name}`);
    console.log(`Phone: ${adminUser.phone}`);
    console.log(`Role: ${adminUser.role}`);
    console.log(`Created At: ${adminUser.createdAt}`);
    console.log("================================================\n");
    console.log("🎉 You can now login at /admin/dashboard\n");
    console.log("⚠️  IMPORTANT: Change the password after first login!\n");
  } catch (error) {
    console.error("\n❌ Error creating admin user:", error.message);
    if (error.code === 11000) {
      console.error("User with this email already exists");
    }
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

// Run the script
createDefaultAdmin();
