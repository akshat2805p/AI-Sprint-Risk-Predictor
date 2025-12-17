// ---------------- RiskScoreCard.jsx ----------------
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, BarChart2, PieChart } from 'lucide-react';

const RiskScoreCard = ({ score = 72, trend = 'up' }) => {
    const [viewMode, setViewMode] = useState('gauge');

    const getColor = (s) => {
        if (s < 40) return 'text-emerald-500';
        if (s < 70) return 'text-yellow-500';
        return 'text-red-500';
    };

    const colorClass = getColor(score);

    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group min-h-[250px] flex flex-col justify-between hover:shadow-lg transition-shadow bg-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-emerald-500/10"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">Sprint Risk Score</h3>
                    <p className="text-xs text-slate-400 mt-1">Based on Jira signals</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('gauge')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'gauge' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                        title="Gauge View"
                    >
                        <PieChart className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('graph')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'graph' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                        title="Trend Graph"
                    >
                        <BarChart2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative z-10">
                {viewMode === 'gauge' ? (
                    <div className="flex items-end gap-4">
                        <div className="relative flex items-center justify-center">
                            <svg className="w-32 h-32 transform -rotate-90">
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                                <motion.circle
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: score / 100 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8"
                                    fill="transparent" strokeLinecap="round" className={colorClass}
                                    style={{ strokeDasharray: 365, strokeDashoffset: 0 }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-4xl font-bold ${colorClass}`}>{score}</span>
                                <span className="text-sm text-slate-400 font-medium">HIGH</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 pb-2">
                            <div className="flex items-center gap-2 text-red-500 bg-red-50 px-2 py-1 rounded-md text-sm border border-red-100 font-medium">
                                <TrendingUp className="w-4 h-4" />
                                <span>+12% vs last sprint</span>
                            </div>
                            <p className="text-slate-500 text-sm">Critical risk level detected.</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-32 flex items-end justify-between px-2 gap-2">
                        {[45, 52, 49, 62, 68, 75, 78].map((val, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 w-full bg-slate-50 rounded-t-sm hover:bg-slate-100 transition-colors group/bar">
                                <div className="relative w-full flex items-end justify-center h-full">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        className={`w-3 rounded-t-full ${val > 70 ? 'bg-red-500' : val > 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                                    ></motion.div>
                                    <div className="absolute -top-8 bg-white border border-slate-200 text-slate-700 text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg">
                                        {val} Risk
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-400">D{i + 1}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default RiskScoreCard;
