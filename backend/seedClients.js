const mongoose = require("mongoose");
require("dotenv").config();
const Client = require("./src/models/Client");

const seedClients = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing clients
    await Client.deleteMany({});

    // Add sample clients
    const clients = [
      {
        name: "John Anderson",
        designation: "CEO, Tech Solutions",
        description: "Excellent service and professional team. Highly recommended for any business needs.",
        image: "https://i.pravatar.cc/150?img=1"
      },
      {
        name: "Sarah Mitchell",
        designation: "Marketing Director",
        description: "Outstanding results and great communication throughout the project.",
        image: "https://i.pravatar.cc/150?img=5"
      },
      {
        name: "Michael Chen",
        designation: "Business Consultant",
        description: "Delivered exactly what we needed. Exceeded our expectations.",
        image: "https://i.pravatar.cc/150?img=3"
      },
      {
        name: "Emily Davis",
        designation: "Project Manager",
        description: "Professional and reliable. Would definitely work with them again.",
        image: "https://i.pravatar.cc/150?img=9"
      },
      {
        name: "Robert Wilson",
        designation: "Operations Head",
        description: "Great attention to detail and commitment to quality work.",
        image: "https://i.pravatar.cc/150?img=7"
      }
    ];

    await Client.insertMany(clients);
    console.log("✅ Sample clients added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding clients:", error);
    process.exit(1);
  }
};

seedClients();
