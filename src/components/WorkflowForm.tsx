import React, { useState } from 'react';
import { 
  Save, 
  X, 
  Info, 
  Database, 
  Activity, 
  Cpu, 
  Building2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Industry, AIType, Sensitivity, Workflow, RiskLevel } from '../types';
import { cn } from '../lib/utils';

interface WorkflowFormProps {
  onSave: (workflow: Partial<Workflow>) => void;
  onCancel: () => void;
  isEvaluating?: boolean;
}

export const WorkflowForm: React.FC<WorkflowFormProps> = ({ onSave, onCancel, isEvaluating }) => {
  const [formData, setFormData] = useState({
    name: '',
    domain: 'Finance' as Industry,
    description: '',
    aiType: 'LLM' as AIType,
    dataSensitivity: 'Medium' as Sensitivity,
    decisionImpact: 'Medium' as Sensitivity,
  });

  const calculateRisk = (impact: Sensitivity, sensitivity: Sensitivity): { level: RiskLevel, score: number } => {
    if (impact === 'High' && sensitivity === 'High') return { level: 'CRITICAL', score: 90 };
    if (impact === 'High' || sensitivity === 'High') return { level: 'HIGH', score: 75 };
    if (impact === 'Medium' && sensitivity === 'Medium') return { level: 'MEDIUM', score: 50 };
    return { level: 'LOW', score: 25 };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { level, score } = calculateRisk(formData.decisionImpact, formData.dataSensitivity);
    
    onSave({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      riskLevel: level,
      riskScore: score,
      riskExplanation: `Calculated based on ${formData.dataSensitivity} data sensitivity and ${formData.decisionImpact} decision impact.`,
      createdAt: new Date().toISOString(),
      regulatoryMapping: [],
      agentTrace: [],
      triggeredRules: [],
      recommendations: [],
      autonomyLevel: level === 'CRITICAL' ? 'RESTRICTED' : level === 'HIGH' ? 'LIMITED' : 'FULL',
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Simulate New Workflow</h2>
            <p className="text-sm text-slate-500">Define AI parameters for governance evaluation</p>
          </div>
          <button 
            onClick={onCancel}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              General Information
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Workflow Name</label>
                <input 
                  required
                  type="text"
                  placeholder="e.g. Loan Approval AI"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Industry Domain</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  value={formData.domain}
                  onChange={e => setFormData({...formData, domain: e.target.value as Industry})}
                >
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Public Sector</option>
                  <option>Retail</option>
                  <option>Technology</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Use Case Description</label>
              <textarea 
                required
                rows={3}
                placeholder="Describe the objective and scope of this AI system..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Technical Config */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              AI Configuration
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  AI Type <Info className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <div className="space-y-2">
                  {['LLM', 'Agentic System', 'Recommendation System'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, aiType: type as AIType})}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-lg text-sm border transition-all",
                        formData.aiType === type 
                          ? "bg-blue-50 border-blue-200 text-blue-700 font-medium" 
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  Data Sensitivity <Database className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <div className="space-y-2">
                  {['Low', 'Medium', 'High'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({...formData, dataSensitivity: level as Sensitivity})}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-lg text-sm border transition-all",
                        formData.dataSensitivity === level 
                          ? "bg-amber-50 border-amber-200 text-amber-700 font-medium" 
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  Decision Impact <Activity className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <div className="space-y-2">
                  {['Low', 'Medium', 'High'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({...formData, decisionImpact: level as Sensitivity})}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-lg text-sm border transition-all",
                        formData.decisionImpact === level 
                          ? "bg-red-50 border-red-200 text-red-700 font-medium" 
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Governance Note:</strong> High impact decisions combined with high data sensitivity will automatically trigger <strong>CRITICAL</strong> risk tiering and <strong>RESTRICTED</strong> autonomy controls.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button 
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isEvaluating}
              className="px-8 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI Evaluating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Evaluate & Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
