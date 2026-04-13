import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  ArrowRight,
  Search,
  Filter,
  Activity
} from 'lucide-react';
import { Workflow } from '../types';
import { RiskBadge } from './RiskBadge';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DashboardProps {
  workflows: Workflow[];
  onSelectWorkflow: (workflow: Workflow) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ workflows, onSelectWorkflow }) => {
  const riskStats = [
    { name: 'LOW', value: workflows.filter(w => w.riskLevel === 'LOW').length, color: '#10b981' },
    { name: 'MEDIUM', value: workflows.filter(w => w.riskLevel === 'MEDIUM').length, color: '#f59e0b' },
    { name: 'HIGH', value: workflows.filter(w => w.riskLevel === 'HIGH').length, color: '#f97316' },
    { name: 'CRITICAL', value: workflows.filter(w => w.riskLevel === 'CRITICAL').length, color: '#ef4444' },
  ];

  const domainData = [
    { name: 'Finance', count: workflows.filter(w => w.domain === 'Finance').length },
    { name: 'Healthcare', count: workflows.filter(w => w.domain === 'Healthcare').length },
    { name: 'Other', count: workflows.filter(w => w.domain !== 'Finance' && w.domain !== 'Healthcare').length },
  ];

  const stats = [
    { label: 'Total Workflows', value: workflows.length, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Critical Alerts', value: workflows.filter(w => w.riskLevel === 'CRITICAL').length, icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Compliant Systems', value: workflows.filter(w => w.regulatoryMapping.every(r => r.status === 'Compliant')).length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Reviews', value: 3, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Governance Overview</h2>
        <p className="text-slate-500">Real-time status of enterprise AI systems</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className={stat.bg + " p-3 rounded-lg"}>
              <stat.icon className={stat.color + " w-6 h-6"} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Risk Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {riskStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Mix */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Domain Mix</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                  <Cell fill="#64748b" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {domainData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", i === 0 ? "bg-blue-500" : i === 1 ? "bg-emerald-500" : "bg-slate-500")} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-semibold">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-bottom border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">Active AI Workflows</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search workflows..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full sm:w-64"
              />
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-100">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Workflow Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Domain</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workflows.map((workflow) => (
                <tr 
                  key={workflow.id} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() => onSelectWorkflow(workflow)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{workflow.name}</div>
                    <div className="text-xs text-slate-500 truncate max-w-[200px]">{workflow.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{workflow.domain}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-600">{workflow.aiType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <RiskBadge level={workflow.riskLevel} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 ml-auto group-hover:translate-x-1 transition-transform">
                      Analyze <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
