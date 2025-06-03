'use client';

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Bug, 
  BarChart3, 
  Users, 
  Settings, 
  ChevronRight,
  User,
  Calendar,
  Tag
} from "lucide-react";

// Dummy data for defects
const defects = [
  {
    id: "DEF-001",
    title: "Login form validation error",
    description: "User cannot submit login form when email field contains special characters",
    priority: "Critical",
    status: "Open",
    assignee: "John Doe",
    reporter: "Jane Smith",
    createdAt: "2024-06-01",
    tags: ["Authentication"]
  },
  {
    id: "DEF-002",
    title: "Navigation menu not responsive on mobile",
    description: "Mobile navigation menu overlaps content on screens smaller than 768px",
    priority: "Medium",
    status: "In Progress",
    assignee: "Sarah Wilson",
    reporter: "Mike Johnson",
    createdAt: "2024-06-02",
    tags: ["UI/UX"]
  },
  {
    id: "DEF-003",
    title: "Database timeout on large queries",
    description: "Queries taking longer than 30 seconds are timing out",
    priority: "Critical",
    status: "Open",
    assignee: "Alex Chen",
    reporter: "David Lee",
    createdAt: "2024-06-01",
    tags: ["Performance"]
  },
  {
    id: "DEF-004",
    title: "Button hover state missing",
    description: "Primary buttons don't show hover states on desktop",
    priority: "Low",
    status: "Open",
    assignee: "Emma Davis",
    reporter: "Tom Wilson",
    createdAt: "2024-05-30",
    tags: ["UI/UX"]
  },
  {
    id: "DEF-005",
    title: "Email notifications not sent",
    description: "Users are not receiving email notifications for assigned tasks",
    priority: "Medium",
    status: "In Progress",
    assignee: "John Doe",
    reporter: "Lisa Brown",
    createdAt: "2024-05-29",
    tags: ["Notifications"]
  }
];

// Stats data
const stats = {
  total: 24,
  critical: 8,
  medium: 10,
  low: 6
};

export default function DefectTracker() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, active: true },
    { name: 'Defects', icon: Bug, active: false },
    { name: 'Reports', icon: BarChart3, active: false },
    { name: 'Team', icon: Users, active: false },
    { name: 'Settings', icon: Settings, active: false }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <Bug className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">DefectTracker</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeNav === item.name ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        {/* New Defect Button */}
        <div className="px-6 mt-8">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            New Defect
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Defect Tracker</h1>
              <p className="text-gray-600 mt-1">Monitor and manage project defects</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              New Defect
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto">
          {/* Search and Filter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search defects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-gray-600 mt-1">Total Defects</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
              <div className="text-gray-600 mt-1">Critical</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-yellow-600">{stats.medium}</div>
              <div className="text-gray-600 mt-1">Medium</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-green-600">{stats.low}</div>
              <div className="text-gray-600 mt-1">Low Priority</div>
            </div>
          </div>

          {/* Recent Defects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Defects</h2>
              <div className="flex items-center text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {defects.slice(0, 5).map((defect) => (
                <div key={defect.id} className="p-6 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-gray-900">{defect.id}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(defect.priority)}`}>
                          {defect.priority} Priority
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(defect.status)}`}>
                          {defect.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{defect.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{defect.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 mr-1" />
                          {defect.tags.join(', ')}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          Assigned to {defect.assignee}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Created {defect.createdAt}
                        </div>
                        <div className="flex items-center">
                          Reported by {defect.reporter}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-gray-50 text-center text-sm text-gray-600">
              Showing {defects.length} defects
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
