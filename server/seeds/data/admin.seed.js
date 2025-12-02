import Admin from "../../models/admin.js";

export const seedAdmins = async () => {
    const admin = {
        email: "admin@code2dbug.com",
        password: "Admin@123",
        name: "Admin",
        lastName: "User",
        phoneNumber: "9999999999",
    };

    await Admin.create(admin);
    console.log("   ✓ Created 1 admin");
    console.log("   📧 Admin: admin@code2dbug.com / Admin@123");
};
