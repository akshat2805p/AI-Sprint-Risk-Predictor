import React, { useState } from 'react';
import { LayoutDashboard, AlertTriangle, Lightbulb, Settings, Bell, Search, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Sidebar = ({ isOpen, toggleSidebar, activeView, onNavigate }) => {
    const navItems = [
        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
        { id: 'analysis', icon: AlertTriangle, label: 'Risk Analysis' },
        { id: 'insights', icon: Lightbulb, label: 'Insights' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white/70 backdrop-blur-xl border-r border-white/40 transition-transform duration-300 transform",
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
            <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        SprintGuard
                    </span>
                </div>
                <button onClick={toggleSidebar} className="md:hidden text-slate-400">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            onNavigate(item.id);
                            if (window.innerWidth < 768) toggleSidebar();
                        }}
                        className={cn(
                            "flex items-center w-full gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                            activeView === item.id
                                ? "bg-blue-50 text-blue-600 shadow-sm border border-blue-100 ring-1 ring-blue-500/10 font-semibold"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

import NotificationBell from './NotificationBell';

const Header = ({ toggleSidebar, onSearch, onLogout, user, onProfileClick }) => (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white/60 backdrop-blur-md border-b border-white/40 z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden text-slate-500">
                <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-sm">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search sprints..."
                    className="bg-transparent border-none focus:outline-none text-sm text-slate-700 w-48 placeholder:text-slate-400"
                    onChange={(e) => onSearch && onSearch(e.target.value)}
                />
            </div>
        </div>
        <div className="flex items-center gap-4">
            <NotificationBell />

            {/* Profile Dropdown */}
            <div
                className="group relative cursor-pointer"
                onClick={onProfileClick}
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 border border-white/50 shadow-md flex items-center justify-center text-xs font-bold text-white uppercase ring-2 ring-white/50">
                    {user?.name?.charAt(0) || 'U'}
                </div>
            </div>
        </div>
    </header>
);

import UserProfile from '../common/UserProfile';

export default function DashboardLayout({ children, activeView = 'overview', onNavigate, onSearch, onLogout, user, teamMembers }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <div className="min-h-screen text-slate-800 selection:bg-blue-500/30 relative overflow-hidden bg-transparent">
            {/* Background Atmosphere - Handled by index.css now, but adding extra light mode glows */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <Sidebar
                isOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(false)}
                activeView={activeView}
                onNavigate={onNavigate}
            />
            <Header
                toggleSidebar={() => setSidebarOpen(true)}
                onSearch={onSearch}
                onLogout={onLogout}
                user={user}
                onProfileClick={() => setProfileOpen(true)}
            />

            <main className="pt-20 pb-8 px-4 sm:px-6 md:pl-72 md:pr-8 mx-auto max-w-7xl transition-all duration-300 relative z-10">
                {children}
            </main>

            <UserProfile
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                user={user}
                teamMembers={teamMembers}
                onLogout={onLogout}
            />
        </div>
    );
}
