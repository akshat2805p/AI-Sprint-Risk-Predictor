// ---------------- JiraSync.jsx ----------------
import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Link as LinkIcon, ExternalLink, Loader2 } from 'lucide-react';

const JiraSync = ({ projectKey = "PROJ-24" }) => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSynced, setLastSynced] = useState('2 mins ago');
    const [ticketCount, setTicketCount] = useState(142);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setLastSynced('Just now');
            setTicketCount(prev => prev + 2);
        }, 2000);
    };

    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden bg-white">
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                        <LinkIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Jira Integration</h3>
                        <p className="text-xs text-slate-500">Connected to Project <span className="text-blue-600 font-medium">{projectKey}</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-600 text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-slate-500">Last Synced</span>
                    <span className="text-slate-900 font-mono font-medium">{lastSynced}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Tickets Processed</span>
                    <span className="text-slate-900 font-mono font-medium">{ticketCount}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                >
                    {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    {isSyncing ? 'Syncing...' : 'Sync Now'}
                </button>
                <button className="flex items-center justify-center py-2 px-3 bg-white hover:bg-slate-50 text-slate-600 rounded-lg transition-colors border border-slate-200 shadow-sm">
                    <ExternalLink className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
export default JiraSync;
