import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Shield, Calendar, Award, Star, Users, LogOut } from 'lucide-react';

const UserProfile = ({ isOpen, onClose, user, teamMembers, onLogout }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header Banner */}
                    <div className="h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="px-8 pb-8">
                        {/* Profile Info */}
                        <div className="relative -mt-12 mb-6 flex items-end justify-between">
                            <div className="flex items-end gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br from-emerald-400 to-teal-500">
                                    {user.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                                </div>
                                <div className="mb-1">
                                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                        {user.name || 'User Name'}
                                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-medium uppercase tracking-wider">
                                            {user.role || 'Member'}
                                        </span>
                                    </h2>
                                    <p className="text-slate-500 text-sm flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5" /> {user.email || 'user@example.com'}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:block text-right">
                                <div className="text-2xl font-bold text-slate-800">Level 5</div>
                                <div className="text-xs text-slate-500 uppercase tracking-widest">Sprint Veteran</div>
                            </div>
                        </div>

                        {/* User Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <Users className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-500">Team</div>
                                    <div className="text-lg font-bold text-slate-800">{user.teamName || 'Engineering'}</div>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-500">Joined</div>
                                    <div className="text-lg font-bold text-slate-800">{user.joinedAt || 'Dec 2025'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Team Section */}
                        <div className="space-y-4 mb-6">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <Users className="w-5 h-5 text-indigo-500" />
                                My Team
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {teamMembers.map(member => (
                                    <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-sm transition-all">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {member.avatar}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-800">{member.name}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-2">
                                                {member.role}
                                                {member.status && (
                                                    <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' :
                                                        member.status === 'Busy' ? 'bg-red-500' : 'bg-slate-400'
                                                        }`}></span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <button
                                onClick={onLogout}
                                className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 rounded-xl transition-all font-medium flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default UserProfile;
