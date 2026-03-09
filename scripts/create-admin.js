/**
 * Script to create an admin user
 * Run with: node scripts/create-admin.js
 *
 * SECURITY: Requires ADMIN_CREATION_SECRET in .env file
 * This prevents unauthorized admin user creation
 */

// Load environment variables from .env file
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");

// Security check - require admin creation secret
const ADMIN_CREATION_SECRET = process.env.ADMIN_CREATION_SECRET;

if (!ADMIN_CREATION_SECRET) {
  console.error("\n❌ SECURITY ERROR: ADMIN_CREATION_SECRET is not set\n");
  console.log(
    "For security, this script requires ADMIN_CREATION_SECRET in your .env file.",
  );
  console.log("Add this to your .env:");
  console.log("ADMIN_CREATION_SECRET=your-secret-key-here\n");
  console.log("⚠️  Keep this secret secure and never commit it to git!\n");
  process.exit(1);
}

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

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function createAdminUser() {
  try {
    console.log("\n🔐 Admin User Creation Script\n");
    console.log("================================================\n");

    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Get admin details
    const name = await question("Enter admin name: ");
    const email = await question("Enter admin email: ");
    const password = await question("Enter admin password: ");
    const phone = await question("Enter admin phone (optional): ");

    // Validate inputs
    if (!name || !email || !password) {
      console.error("\n❌ Name, email, and password are required!");
      process.exit(1);
    }

    if (password.length < 6) {
      console.error("\n❌ Password must be at least 6 characters long!");
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("\n❌ User with this email already exists!");
      console.log("\nExisting user details:");
      console.log(`- Name: ${existingUser.name}`);
      console.log(`- Email: ${existingUser.email}`);
      console.log(`- Role: ${existingUser.role}`);

      const update = await question(
        "\nDo you want to update this user to admin? (yes/no): ",
      );
      if (update.toLowerCase() === "yes" || update.toLowerCase() === "y") {
        existingUser.role = "admin";
        existingUser.emailVerified = true;
        await existingUser.save();
        console.log("\n✅ User updated to admin successfully!");
        console.log(`\nAdmin credentials:`);
        console.log(`Email: ${email}`);
        console.log(`Role: admin`);
      } else {
        console.log("\n❌ Operation cancelled.");
      }
      process.exit(0);
    }

    // Hash password
    console.log("\nHashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const adminUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || undefined,
      role: "admin",
      authProvider: "local",
      emailVerified: true,
      isPhoneVerified: !!phone,
      kycStatus: "approved",
    });

    console.log("\n✅ Admin user created successfully!\n");
    console.log("================================================");
    console.log("Admin User Details:");
    console.log("================================================");
    console.log(`Name: ${adminUser.name}`);
    console.log(`Email: ${adminUser.email}`);
    console.log(`Role: ${adminUser.role}`);
    console.log(`Phone: ${adminUser.phone || "Not provided"}`);
    console.log(`Email Verified: ${adminUser.emailVerified}`);
    console.log(`Created At: ${adminUser.createdAt}`);
    console.log("================================================\n");
    console.log("🎉 You can now login with these credentials!\n");
  } catch (error) {
    console.error("\n❌ Error creating admin user:", error.message);
    if (error.code === 11000) {
      console.error(
        "Duplicate key error - user with this email may already exist",
      );
    }
  } finally {
    rl.close();
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

// Run the script
createAdminUser();
