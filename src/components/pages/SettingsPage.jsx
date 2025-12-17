import React, { useState, useEffect } from 'react';
import { Settings, User, Bell, Shield, Volume2, Save, Check, Trash2, Plus, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../common/ToastProvider';

const SettingsPage = ({ teamMembers, onAddMember, onRemoveMember }) => {
    const { addToast } = useToast();

    // Persisted Settings State
    const [persona, setPersona] = useState(() => localStorage.getItem('settings_persona') || 'empathetic');
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('settings_notifications');
        return saved ? JSON.parse(saved) : { slack: true, email: false };
    });
    const [riskSensitivity, setRiskSensitivity] = useState(() => localStorage.getItem('settings_riskSensitivity') || 75);

    const [newMemberName, setNewMemberName] = useState('');

    const handleSave = () => {
        // Save settings to localStorage
        localStorage.setItem('settings_persona', persona);
        localStorage.setItem('settings_notifications', JSON.stringify(notifications));
        localStorage.setItem('settings_riskSensitivity', riskSensitivity);

        // Team members are already saved by App.jsx, but we confirm everything is secure
        addToast("All settings and team configuration saved successfully!", "success");
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        if (!newMemberName.trim()) return;

        onAddMember(newMemberName);
        setNewMemberName('');
        addToast(`Added ${newMemberName} to the team`, "success");
    };

    const handleRemoveMember = (id, name) => {
        onRemoveMember(id);
        addToast(`Removed ${name} from the team`, "info");
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
        >
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                    <Settings className="w-8 h-8 text-slate-500" />
                    Configuration
                </h1>
                <p className="text-slate-500">Customize your SprintGuard agent and alerts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Team Management */}
                <div className="glass-panel p-6 rounded-2xl md:col-span-2 bg-white">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-500" />
                        Team Management
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Member List */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Current Members</h4>
                            {teamMembers.length === 0 && (
                                <p className="text-sm text-slate-400 italic py-2">No team members added yet.</p>
                            )}
                            {teamMembers.map(member => (
                                <div key={member.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors group shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white">
                                            {member.avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-800">{member.name}</p>
                                            <p className="text-xs text-slate-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveMember(member.id, member.name)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add Member Form */}
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Add New Member</h4>
                            <form onSubmit={handleAddMember} className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-500 mb-1.5 block">Full Name</label>
                                    <input
                                        type="text"
                                        value={newMemberName}
                                        onChange={(e) => setNewMemberName(e.target.value)}
                                        placeholder="e.g. Sarah Connor"
                                        className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!newMemberName.trim()}
                                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-200"
                                >
                                    <Plus className="w-4 h-4" /> Add Member
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Agent Persona */}
                <div className="glass-panel p-6 rounded-2xl md:col-span-2 bg-white">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-500" />
                        AI Agent Persona
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">Choose how Rovo communicates with your team.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                            onClick={() => setPersona('strict')}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${persona === 'strict' ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Shield className="w-6 h-6 text-red-500" />
                                <span className={`font-semibold ${persona === 'strict' ? 'text-blue-700' : 'text-slate-700'}`}>Strict Scrum Master</span>
                            </div>
                            <p className="text-sm text-slate-500 italic">"Velocity is down 15%. This is unacceptable. Fix it immediately."</p>
                            {persona === 'strict' && <div className="mt-2 text-xs text-blue-600 flex items-center gap-1"><Check className="w-3 h-3" /> Active</div>}
                        </div>

                        <div
                            onClick={() => setPersona('empathetic')}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${persona === 'empathetic' ? 'bg-purple-50 border-purple-500 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Volume2 className="w-6 h-6 text-purple-500" />
                                <span className={`font-semibold ${persona === 'empathetic' ? 'text-purple-700' : 'text-slate-700'}`}>Empathetic Coach</span>
                            </div>
                            <p className="text-sm text-slate-500 italic">"We're a bit off track, but we can catch up. Let's adjust the scope."</p>
                            {persona === 'empathetic' && <div className="mt-2 text-xs text-purple-600 flex items-center gap-1"><Check className="w-3 h-3" /> Active</div>}
                        </div>
                    </div>
                </div>

                {/* Risk Sensitivity */}
                <div className="glass-panel p-6 rounded-2xl bg-white">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        Risk Model Sensitivity
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-600">Alert Threshold</span>
                                <span className="text-blue-600 font-mono font-medium">{riskSensitivity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={riskSensitivity}
                                onChange={(e) => setRiskSensitivity(e.target.value)}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                            <p className="text-xs text-slate-400 mt-2">Create alerts only when risk score exceeds this value.</p>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="glass-panel p-6 rounded-2xl bg-white">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-yellow-500" />
                        Notifications
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Slack Alerts</span>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, slack: !prev.slack }))}
                                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${notifications.slack ? 'bg-emerald-500' : 'bg-slate-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifications.slack ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Daily Email Digest</span>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${notifications.email ? 'bg-emerald-500' : 'bg-slate-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifications.email ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Jira Comment Bot</span>
                            <button className="w-11 h-6 flex items-center rounded-full p-1 bg-slate-200 cursor-not-allowed opacity-50">
                                <div className="bg-slate-400 w-4 h-4 rounded-full shadow-md translate-x-0"></div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 transition-all"
                >
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </div>
        </motion.div>
    );
};

export default SettingsPage;
