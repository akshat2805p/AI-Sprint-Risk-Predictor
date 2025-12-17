import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Mail, Split, MessageSquare, Check, ArrowRight, Loader2, Bot } from 'lucide-react';

const RecoveryPlan = ({ data }) => {
    const [draftingEmail, setDraftingEmail] = useState(false);
    const [emailDraft, setEmailDraft] = useState(null);
    const [analyzingBlocker, setAnalyzingBlocker] = useState(null);
    const [blockerAnalysis, setBlockerAnalysis] = useState(null);

    // Fallback if data is missing
    const bottlenecks = data?.bottlenecks || [];
    const draftBody = data?.insights?.draftEmailBody || "Hi Team,\n\nI noticed we are trending behind.\n\nBest,\nScrum Master";

    const handleDraftEmail = () => {
        setDraftingEmail(true);
        setTimeout(() => {
            setEmailDraft({
                subject: "Sprint Update: Scope Adjustment Needed",
                body: draftBody
            });
            setDraftingEmail(false);
        }, 2000);
    };

    const handleAnalyzeBlocker = (ticketId) => {
        setAnalyzingBlocker(ticketId);
        setTimeout(() => {
            setBlockerAnalysis({
                ticketId,
                analysis: "Rovo Analysis: The delay is caused by a missing API specification from the Backend Team. The ticket has been in 'Waiting' status for 72 hours."
            });
            setAnalyzingBlocker(null);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                        <Bot className="w-8 h-8 text-emerald-500" />
                        Rovo Recovery Plan
                    </h1>
                    <p className="text-slate-500">AI-driven actions to get the sprint back on track.</p>
                </div>
            </div>

            {/* Section 1: One-Click Fixes */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden bg-white border border-slate-200 shadow-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Smart Actions (One-Click Fixes)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {/* Action Card 1: Draft Email */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:bg-slate-100 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-500/10 p-2 rounded-lg text-blue-600">
                                <Mail className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700">High Impact</span>
                        </div>
                        <h4 className="text-lg font-medium text-slate-800 mb-1">Draft Stakeholder Update</h4>
                        <p className="text-sm text-slate-600 mb-4">Generate a polite email explaining the scope creep and proposing a fix.</p>

                        {!emailDraft ? (
                            <button
                                onClick={handleDraftEmail}
                                disabled={draftingEmail}
                                className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-sm shadow-emerald-200"
                            >
                                {draftingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : "Use Rovo to Draft Email"}
                            </button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-white border border-slate-200 rounded-lg p-4 shadow-inner"
                            >
                                <div className="text-xs text-slate-500 mb-2 uppercase font-mono">Draft Preview</div>
                                <div className="text-sm text-slate-700 font-mono whitespace-pre-wrap mb-3">
                                    {emailDraft.body}
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded hover:bg-emerald-100 text-sm font-medium flex items-center justify-center gap-1">
                                        <Check className="w-3 h-3" /> Copy to Clipboard
                                    </button>
                                    <button
                                        onClick={() => setEmailDraft(null)}
                                        className="py-1.5 px-3 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 text-sm"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Action Card 2: Split Ticket */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:bg-slate-100 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-500/10 p-2 rounded-lg text-purple-600">
                                <Split className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-700">Medium Impact</span>
                        </div>
                        <h4 className="text-lg font-medium text-slate-800 mb-1">Split Big Ticket (SPR-12)</h4>
                        <p className="text-sm text-slate-600 mb-4">Ticket SPR-12 is 13 Story Points. Rovo recommends splitting it into 3 subtasks.</p>
                        <button className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-slate-200 shadow-sm">
                            View Proposed Subtasks <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Section 2: The Blocker Breaker */}
            <div className="glass-panel p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-red-500" />
                    The Blocker Breaker
                </h3>
                <div className="space-y-4">
                    {bottlenecks.slice(0, 2).map(ticket => (
                        <div key={ticket.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-blue-600 font-mono text-sm font-bold">{ticket.id}</span>
                                        <span className="text-slate-500 text-xs">• {ticket.assignee}</span>
                                    </div>
                                    <h4 className="text-slate-800 font-medium">{ticket.title}</h4>
                                </div>
                                <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded border border-red-200">
                                    Blocked {ticket.daysInStatus} days
                                </span>
                            </div>

                            {blockerAnalysis?.ticketId === ticket.id ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                                >
                                    <p className="text-sm text-blue-700 flex gap-2">
                                        <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                                        {blockerAnalysis.analysis}
                                    </p>
                                </motion.div>
                            ) : (
                                <button
                                    onClick={() => handleAnalyzeBlocker(ticket.id)}
                                    disabled={analyzingBlocker === ticket.id}
                                    className="mt-2 text-sm text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
                                >
                                    {analyzingBlocker === ticket.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Bot className="w-3 h-3" />}
                                    Ask Rovo why this is blocked
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default RecoveryPlan;
