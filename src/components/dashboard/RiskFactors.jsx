// ---------------- RiskFactors.jsx ----------------
import React from 'react';
import { AlertCircle, Clock, FileWarning, Eye } from 'lucide-react';

const RiskFactors = () => {
    const factors = [
        { id: 1, title: 'Scope Creep Detected', icon: FileWarning, severity: 'High', color: 'red', desc: '3 new stories added mid-sprint.', action: 'Review with PO immediately.' },
        { id: 2, title: 'Velocity Drop', icon: Clock, severity: 'Medium', color: 'orange', desc: 'Team velocity 20% below average.', action: 'Check for blockers in daily standup.' },
        { id: 3, title: 'High Bug Count', icon: AlertCircle, severity: 'Low', color: 'yellow', desc: '5 non-blocking bugs reported.', action: 'Schedule bug bash session.' },
    ];

    const getColor = (color) => {
        switch (color) {
            case 'red': return 'bg-red-50 text-red-600 border-red-100';
            case 'orange': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'yellow': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl h-full bg-white">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-emerald-500" />
                Risk Factors
            </h3>
            <div className="space-y-3">
                {factors.map((factor) => (
                    <div key={factor.id} className="group relative p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 hover:border-emerald-100 transition-all cursor-pointer overflow-hidden">
                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex gap-3">
                                <div className={`p-2 rounded-lg ${getColor(factor.color)}`}>
                                    <factor.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">{factor.title}</h4>
                                    <p className="text-sm text-slate-500 mt-1 origin-top-left transition-all">
                                        {factor.desc}
                                    </p>

                                    <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
                                        <div className="pt-2 mt-2 border-t border-slate-200">
                                            <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                                                <Eye className="w-3 h-3" />
                                                Action: {factor.action}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getColor(factor.color)}`}>
                                {factor.severity}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default RiskFactors;
