import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectManagement from "../components/admin/ProjectManagement";
import ClientManagement from "../components/admin/ClientManagement";
import ContactFormViewer from "../components/admin/ContactFormViewer";
import NewsletterViewer from "../components/admin/NewsletterViewer";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const tabs = [
    { id: "projects", label: "Projects" },
    { id: "clients", label: "Clients" },
    { id: "contacts", label: "Contact Forms" },
    { id: "newsletter", label: "Newsletter" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded font-semibold transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition border-b-4 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent hover:text-blue-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "projects" && <ProjectManagement />}
        {activeTab === "clients" && <ClientManagement />}
        {activeTab === "contacts" && <ContactFormViewer />}
        {activeTab === "newsletter" && <NewsletterViewer />}
      </main>
    </div>
  );
}
