import { useState } from 'react';
import {
  BookOpen,
  Award,
  LayoutDashboard,
  FileText,
  ClipboardList,
  Gift,
  Headphones,
  Settings,
  Crown,
  LogOut,
  Menu, // Added Menu icon for potential mobile trigger in parent
} from 'lucide-react';

const StudentNavbar = ({ onMenuItemClick }) => {
  // 💡 State for active tab remains useful for styling
  const [activeTab, setActiveTab] = useState('Dashboard');

  const sidebarItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, navigation: '/' },
    { label: 'My Courses', icon: <BookOpen size={20} />, navigation: '/my-courses' },
    { label: 'Assignments', icon: <FileText size={20} />, navigation: '/assignments' },
    { label: 'Quizzes', icon: <ClipboardList size={20} />, navigation: '/quizzes' },
    { label: 'Leaderboard', icon: <Crown size={20} />, navigation: '/leaderboard' },
    { label: 'Certificates', icon: <Award size={20} />, navigation: '/certificates' },
    { label: 'Refer and Earn', icon: <Gift size={20} />, navigation: '/refer-and-earn' },
    { label: 'Support', icon: <Headphones size={20} />, navigation: '/support' },
    { label: 'Settings', icon: <Settings size={20} />, navigation: '/settings' },
  ];

  return (
    // 💡 REMOVED: fixed, inset-y-0, left-0, z-50, transform, transition-transform, duration-300, ease-in-out, isSidebarOpen logic, and md:relative.
    // 💡 This allows the parent <aside> in StudentLayout to control the positioning.
    <div className="h-full w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-zinc-800">
        <span className="text-xl font-bold tracking-tighter text-white">
          LMS<span className="text-blue-500">PORTAL</span>
        </span>

        {/* 💡 Removed unnecessary 'hi' text and simplified logic. 
             This button would ideally close the sidebar on mobile, 
             but needs a prop from the parent to work. */}
        {/* <button onClick={() => {}} className="md:hidden ml-auto text-zinc-400">
          <X size={24} />
        </button> */}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {sidebarItems.map(item => (
          <button
            key={item.label}
            onClick={() => {
              setActiveTab(item.label);
              // 💡 If you need to trigger a global navigation action:
              if (onMenuItemClick) onMenuItemClick(item.label);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.label
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-medium'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm text-white shadow-md">
            AJ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">studentName</p>
            <p className="text-xs text-zinc-500 truncate">Student ID: 9021</p>
          </div>
          <LogOut size={18} className="text-zinc-400 hover:text-red-400 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default StudentNavbar;
