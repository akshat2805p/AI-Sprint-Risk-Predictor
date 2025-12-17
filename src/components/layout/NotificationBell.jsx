import React, { useState } from 'react';
import { Bell, Check, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'alert', title: 'High Risk Detected', message: 'Risk score jumped to 78/100.', time: '10m ago', read: false },
        { id: 2, type: 'info', title: 'New Ticket Added', message: 'SPR-156 was added to the sprint.', time: '2h ago', read: false },
        { id: 3, type: 'warning', title: 'Velocity Warning', message: 'Team is traversing 20% slower.', time: '5h ago', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse"></span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                        >
                            <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
                                <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-500 uppercase font-bold tracking-wide">Mark all read</button>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500 text-sm">No new notifications</div>
                                ) : (
                                    notifications.map(notification => (
                                        <div
                                            key={notification.id}
                                            onClick={() => markAsRead(notification.id)}
                                            className={`p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${notification.read ? 'opacity-60' : 'bg-blue-50/50'}`}
                                        >
                                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notification.type === 'alert' ? 'bg-red-500' :
                                                notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                                }`}></div>
                                            <div>
                                                <h4 className={`text-sm font-medium mb-0.5 ${notification.read ? 'text-slate-500' : 'text-slate-800'}`}>
                                                    {notification.title}
                                                </h4>
                                                <p className="text-xs text-slate-500 leading-snug mb-1">{notification.message}</p>
                                                <span className="text-[10px] text-slate-400">{notification.time}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBell;
