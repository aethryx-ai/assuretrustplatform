import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, XCircle, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { MOCK_COMPLIANCE_SUMMARY } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const ComplianceReports: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Compliance Reports</h2>
          <p className="text-slate-500">Organizational posture against global AI frameworks</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Full Audit Export
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_COMPLIANCE_SUMMARY.map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={item.framework} 
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
          >
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{item.framework}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-slate-600">Compliant</span>
                </div>
                <span className="font-bold">{item.compliant}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-slate-600">Partial</span>
                </div>
                <span className="font-bold">{item.partial}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-slate-600">Non-compliant</span>
                </div>
                <span className="font-bold">{item.nonCompliant}</span>
              </div>
              <div className="pt-2">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: `${(item.compliant / (item.compliant + item.partial + item.nonCompliant)) * 100}%` }} />
                  <div className="bg-amber-500 h-full" style={{ width: `${(item.partial / (item.compliant + item.partial + item.nonCompliant)) * 100}%` }} />
                  <div className="bg-red-500 h-full" style={{ width: `${(item.nonCompliant / (item.compliant + item.partial + item.nonCompliant)) * 100}%` }} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Recent Compliance Assessments</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <FileText className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Q2 AI Governance Audit - {i === 1 ? 'Finance' : i === 2 ? 'Healthcare' : 'Retail'}</p>
                    <p className="text-xs text-slate-500">Generated on April {10 - i}, 2026 • 24 pages</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors border-t border-slate-100">
            View All Assessments
          </button>
        </div>

        <div className="bg-blue-600 rounded-xl p-6 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between">
          <div>
            <ShieldCheck className="w-10 h-10 mb-6 opacity-50" />
            <h3 className="text-xl font-bold mb-2">Ready for EU AI Act?</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Our automated mapping shows 82% readiness across your current AI inventory. 
              Click below to see specific gaps and required technical documentation.
            </p>
          </div>
          <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
            Run Gap Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
