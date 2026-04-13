import React from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  History,
  Fingerprint,
  Lock,
  Zap,
  ChevronRight,
  Info,
  ExternalLink,
  Activity
} from 'lucide-react';
import { Workflow, ComplianceStatus } from '../types';
import { RiskBadge } from './RiskBadge';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface WorkflowDetailProps {
  workflow: Workflow;
  onBack: () => void;
}

export const WorkflowDetail: React.FC<WorkflowDetailProps> = ({ workflow, onBack }) => {
  const getStatusIcon = (status: ComplianceStatus) => {
    switch (status) {
      case 'Compliant': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Partial': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'Non-compliant': return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-bold text-slate-900">{workflow.name}</h2>
            <RiskBadge level={workflow.riskLevel} className="text-sm px-3 py-1" />
          </div>
          <p className="text-slate-500 max-w-2xl">{workflow.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
            <History className="w-4 h-4" />
            View History
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            Export Audit Log
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Risk & Compliance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Risk Engine Card */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Risk Tiering Engine
              </h3>
              <div className="text-sm font-mono bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-600">
                Score: <span className={cn("font-bold", workflow.riskScore > 80 ? "text-red-600" : "text-blue-600")}>{workflow.riskScore}/100</span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Risk Explanation</h4>
                  <p className="text-slate-700 leading-relaxed">{workflow.riskExplanation}</p>
                  
                  <div className="mt-6 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Triggered Guardrails</h4>
                    {workflow.triggeredRules.length > 0 ? (
                      workflow.triggeredRules.map((rule, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-2 rounded-lg border border-red-100">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          {rule}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        No critical guardrails triggered
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Autonomy Control</h4>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-600">System Autonomy</span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold border",
                      workflow.autonomyLevel === 'RESTRICTED' ? "bg-red-100 text-red-700 border-red-200" : 
                      workflow.autonomyLevel === 'LIMITED' ? "bg-amber-100 text-amber-700 border-amber-200" : 
                      "bg-emerald-100 text-emerald-700 border-emerald-200"
                    )}>
                      {workflow.autonomyLevel}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Lock className="w-3 h-3" />
                      {workflow.autonomyLevel === 'RESTRICTED' ? 'Human-in-the-loop required for all outputs' : 'Limited supervision required'}
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          workflow.autonomyLevel === 'RESTRICTED' ? "w-1/4 bg-red-500" : 
                          workflow.autonomyLevel === 'LIMITED' ? "w-2/3 bg-amber-500" : "w-full bg-emerald-500"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Multi-Agent Trace */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Multi-Agent Workflow Trace
              </h3>
              <span className="text-xs text-slate-400">Real-time Propagation Analysis</span>
            </div>
            <div className="p-6">
              {workflow.agentTrace.length > 0 ? (
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {workflow.agentTrace.map((step, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="relative flex items-start gap-6 group"
                    >
                      <div className={cn(
                        "absolute left-0 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110",
                        i === 0 ? "bg-blue-500" : i === workflow.agentTrace.length - 1 ? "bg-emerald-500" : "bg-slate-400"
                      )}>
                        <span className="text-white text-[10px] font-bold">{i + 1}</span>
                      </div>
                      <div className="ml-12 flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:border-blue-200 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-bold text-slate-900 text-sm">{step.agent}</h5>
                          <span className="text-[10px] font-mono text-slate-400">Risk Contribution: +{step.riskContribution}%</span>
                        </div>
                        <p className="text-xs text-blue-600 font-medium mb-2">{step.action}</p>
                        <div className="grid grid-cols-2 gap-4 text-[11px]">
                          <div>
                            <span className="text-slate-400 block mb-1 uppercase tracking-tighter font-bold">Input</span>
                            <code className="text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">{step.input}</code>
                          </div>
                          <div>
                            <span className="text-slate-400 block mb-1 uppercase tracking-tighter font-bold">Output</span>
                            <code className="text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">{step.output}</code>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 italic text-sm">
                  No multi-agent trace available for this workflow type.
                </div>
              )}
            </div>
          </section>

          {/* Decision Traceability */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-indigo-500" />
                Decision Traceability
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">System Objective</h4>
                  <p className="text-sm text-slate-700">{workflow.decisionTrace.intent}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Decision Logic</h4>
                  <div className="bg-slate-900 rounded-lg p-3 text-emerald-400 font-mono text-xs leading-relaxed">
                    {workflow.decisionTrace.logic}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Potential Failure Points</h4>
                  <ul className="space-y-2">
                    {workflow.decisionTrace.failurePoints.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Data Lineage</h4>
                  <div className="flex flex-wrap gap-2">
                    {workflow.decisionTrace.dataUsed.map((data, i) => (
                      <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold border border-indigo-100">
                        {data}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Regulatory & Recommendations */}
        <div className="space-y-6">
          {/* Regulatory Mapping */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Regulatory Mapping
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {workflow.regulatoryMapping.length > 0 ? (
                workflow.regulatoryMapping.map((framework, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-4 hover:border-slate-200 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-slate-900 text-sm">{framework.name}</span>
                      {getStatusIcon(framework.status)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 uppercase font-bold">Status</span>
                        <span className={cn(
                          "font-bold",
                          framework.status === 'Compliant' ? "text-emerald-600" : 
                          framework.status === 'Partial' ? "text-amber-600" : "text-red-600"
                        )}>{framework.status}</span>
                      </div>
                      {framework.missingControls.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[10px] text-red-400 uppercase font-bold block mb-1">Missing Controls</span>
                          <div className="flex flex-wrap gap-1">
                            {framework.missingControls.map((c, j) => (
                              <span key={j} className="text-[9px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100">{c}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-400 text-sm italic">
                  No frameworks mapped yet.
                </div>
              )}
              <button className="w-full py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1">
                Map New Framework <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </section>

          {/* Recommendations */}
          <section className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden text-white">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                Governance Actions
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {workflow.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors">
                    <span className="text-[10px] font-bold text-blue-400 group-hover:text-white">{i + 1}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed group-hover:text-white transition-colors">{rec}</p>
                </div>
              ))}
              <div className="pt-4">
                <button className="w-full py-3 bg-blue-600 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  Apply All Controls
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
