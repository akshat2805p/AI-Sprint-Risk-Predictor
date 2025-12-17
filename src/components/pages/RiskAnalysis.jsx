import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertCircle, Clock, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const RiskAnalysis = ({ data }) => {
    // Fallback if data is missing (shouldn't happen with correct flow)
    const burndownData = data?.burndownData || [];
    const busFactorData = data?.busFactorData || [];
    const bottlenecks = data?.bottlenecks || [];
    const insights = data?.insights || {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Risk Analysis</h1>
                    <p className="text-slate-500">Deep dive into sprint risks and predictive metrics.</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        High Risk of Delay
                    </span>
                </div>
            </div>

            {/* Predictive Burndown */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    AI Predictive Burndown
                </h3>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={burndownData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
                            <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                            <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#1e293b' }}
                            />
                            <ReferenceLine y={0} stroke="#cbd5e1" />

                            {/* Ideal Line */}
                            <Line type="monotone" dataKey="ideal" stroke="#3b82f6" strokeWidth={2} name="Ideal Velocity" strokeDasharray="5 5" dot={false} />

                            {/* Actual Progress */}
                            <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} name="Actual Progress" activeDot={{ r: 8, fill: '#10b981' }} />

                            {/* AI Prediction */}
                            <Line type="monotone" dataKey="predicted" stroke="#ef4444" strokeWidth={2} name="AI Prediction" strokeDasharray="3 3" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 flex gap-6 justify-center text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full opacity-50"></div>
                        <span>Ideal</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span>Actual</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>AI Prediction (Delayed)</span>
                    </div>
                </div>
            </div>

            {/* Bottleneck Detector & Scope Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Bottleneck Detector */}
                <div className="glass-panel p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        Stalled Ticket Detector
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                                    <th className="py-3 px-2 font-medium">Ticket</th>
                                    <th className="py-3 px-2 font-medium">Assignee</th>
                                    <th className="py-3 px-2 font-medium">Stalled For</th>
                                    <th className="py-3 px-2 font-medium">AI Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bottlenecks.map((ticket) => (
                                    <tr key={ticket.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors text-sm">
                                        <td className="py-3 px-2 text-blue-600 font-mono font-medium">{ticket.id}</td>
                                        <td className="py-3 px-2 text-slate-700">{ticket.assignee}</td>
                                        <td className="py-3 px-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${ticket.daysInStatus >= 3 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-yellow-50 text-yellow-600 border border-yellow-100'}`}>
                                                {ticket.daysInStatus} days
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 text-slate-500 italic">{ticket.reason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                        View All Blockers <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Scope Creep Timeline */}
                <div className="glass-panel p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        Scope Creep Timeline
                    </h3>
                    <div className="relative pl-6 border-l border-slate-200 space-y-6">
                        <div className="relative">
                            <div className="absolute -left-[29px] top-1 w-3 h-3 bg-slate-400 rounded-full border-2 border-slate-100 ring-2 ring-white"></div>
                            <p className="text-xs text-slate-500 mb-1">Sprint Start (Day 1)</p>
                            <p className="text-slate-700">Sprint started with 100 points.</p>
                        </div>

                        {/* Dynamic Scope Creep Items */}
                        {insights.scopeCreep?.tickets?.map((ticket, index) => (
                            <div key={ticket.id} className="relative">
                                <div className="absolute -left-[29px] top-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-slate-100 ring-2 ring-white shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
                                <p className="text-xs text-purple-600 mb-1 font-semibold">Day {index + 4} (+{ticket.pts} pts)</p>
                                <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg">
                                    <p className="text-sm text-slate-800 font-medium">Added ticket {ticket.id}</p>
                                    <p className="text-xs text-slate-500 mt-1">"{ticket.title}"</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bus Factor Alert (New) */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            Bus Factor Alert
                        </h3>
                        <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                            <p className="text-sm text-red-800 font-medium mb-2">
                                ⚠️ Critical Risk Detected
                            </p>
                            <p className="text-sm text-slate-600 mb-4">
                                40% of critical tickets are assigned to high-risk developers.
                            </p>

                            <div className="space-y-3">
                                {busFactorData.map(dev => (
                                    <div key={dev.name} className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-slate-500 w-24 truncate">{dev.name}</span>
                                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${dev.risk === 'High' ? 'bg-red-500' : 'bg-blue-500'}`}
                                                style={{ width: `${Math.min((dev.tickets / 15) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-slate-500 w-8 text-right">{dev.tickets}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default RiskAnalysis;
