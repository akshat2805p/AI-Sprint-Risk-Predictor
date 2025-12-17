import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Activity, FileText, BarChart2 } from 'lucide-react';

const RovoLogicModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Brain className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">How the AI Judges Risk</h3>
                                    <p className="text-xs text-slate-500">Powered by Atlassian Forge & Rovo Agents</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

                            {/* Core Logic */}
                            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                                <p className="text-slate-700 text-sm leading-relaxed">
                                    The AI acts as a <span className="font-bold text-indigo-700">Pattern Matcher</span> and <span className="font-bold text-indigo-700">Reasoning Engine</span>. It compares <span className="italic">current sprint data</span> (Plan vs. Reality) against <span className="italic">historical baselines</span> to detect "Hidden Risks" that pure metrics miss.
                                </p>
                            </div>

                            {/* Signals */}
                            <div>
                                <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3">
                                    <Activity className="w-4 h-4 text-emerald-500" />
                                    1. The Signals: What Data We Watch
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                                        <div className="font-medium text-slate-800 text-sm mb-1">Historical Velocity</div>
                                        <p className="text-xs text-slate-500">Overcommitment: If Current Load &gt; Avg Velocity → <span className="text-red-500 font-bold">High Risk</span></p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                                        <div className="font-medium text-slate-800 text-sm mb-1">Ticket Stagnation</div>
                                        <p className="text-xs text-slate-500">Bottlenecking: If 'In Progress' &gt; 3 days w/o update → <span className="text-yellow-600 font-bold">Warn</span></p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 col-span-1 md:col-span-2">
                                        <div className="font-medium text-slate-800 text-sm mb-1">Scope Creep</div>
                                        <p className="text-xs text-slate-500">Instability: If New Points &gt; 15% of Initial Scope → <span className="text-red-500 font-bold">Unstable</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Pillar 2: The Judgment */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-purple-500" />
                                    2. The Judgment Logic (LLM)
                                </h3>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl border-l-4 border-purple-500 bg-purple-50">
                                        <h4 className="font-bold text-slate-800 mb-2">A. Sentiment & Tone (Qualitative)</h4>
                                        <p className="text-sm text-slate-600 mb-2">The AI reads ticket comments to find frustration or blockers.</p>
                                        <div className="bg-white border border-slate-200 p-3 rounded-lg text-xs font-mono text-slate-600 shadow-sm">
                                            Comment: "Still waiting on API team, can't finish."<br />
                                            <span className="text-red-600 font-semibold">&gt;&gt; Judgment: HIGH RISK (External Dependency)</span>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl border-l-4 border-blue-500 bg-blue-50">
                                        <h4 className="font-bold text-slate-800 mb-2">B. Ambiguity Detection (Complexity)</h4>
                                        <p className="text-sm text-slate-600 mb-2">High story points + Short description = Ambiguity.</p>
                                        <div className="bg-white border border-slate-200 p-3 rounded-lg text-xs font-mono text-slate-600 shadow-sm">
                                            Ticket: 8 Points | Desc: "Fix login"<br />
                                            <span className="text-orange-600 font-semibold">&gt;&gt; Judgment: HIGH RISK (Undefined Scope)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reasoning */}
                            <div>
                                <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3">
                                    <Brain className="w-4 h-4 text-blue-500" />
                                    3. AI Chain of Thought
                                </h4>
                                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <div className="flex gap-3">
                                        <div className="w-0.5 bg-slate-300 rounded-full"></div>
                                        <div className="pb-2">
                                            <p className="text-sm text-slate-700 mb-1 font-medium">Step 1: Ingest Jira Events</p>
                                            <div className="text-xs text-slate-500 font-mono bg-white border border-slate-200 p-2 rounded">
                                                Event: Ticket-124 moved to 'Done'
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-0.5 bg-emerald-500 rounded-full"></div>
                                        <div>
                                            <p className="text-sm text-slate-700 mb-1 font-medium">Step 2: Context Evaluation</p>
                                            <div className="text-xs text-slate-500 font-mono bg-white border border-slate-200 p-2 rounded">
                                                Analysis: Velocity is stable. No risk.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                                <BarChart2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                                <div>
                                    <h5 className="text-sm font-semibold text-emerald-900">Final Verdict Generation</h5>
                                    <p className="text-xs text-emerald-800 mt-1">
                                        The AI aggregates all signal weights to produce a 0-100 Risk Score. A score &gt; 70 triggers immediate alerts.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
                            >
                                Got it
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RovoLogicModal;
