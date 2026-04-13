import React from 'react';
import { Activity, Zap, Users, ShieldAlert, TrendingUp, Cpu } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { MOCK_MONITOR_STATS } from '../mockData';
import { motion } from 'motion/react';

export const RealTimeMonitor: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Real-time Monitor</h2>
        <p className="text-slate-500">Live telemetry of AI decision flows and risk triggers</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">Requests / min</p>
          <p className="text-3xl font-bold text-slate-900">1,284</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-50 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-bold text-red-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +4%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">Risk Triggers</p>
          <p className="text-3xl font-bold text-slate-900">42</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Cpu className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-xs font-bold text-slate-400">Stable</span>
          </div>
          <p className="text-sm font-medium text-slate-500">Avg. Latency</p>
          <p className="text-3xl font-bold text-slate-900">184ms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Throughput & Risk
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_MONITOR_STATS}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReq)" />
                <Area type="monotone" dataKey="risk" stroke="#ef4444" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Agent Activity
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Data', active: 45 },
                { name: 'Model', active: 32 },
                { name: 'Decision', active: 18 },
                { name: 'Monitor', active: 24 },
                { name: 'Gov', active: 12 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="active" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-4">Live Decision Feed</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                key={i} 
                className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="flex-1">
                  <p className="text-xs font-mono text-slate-400">08:52:4{i} - Workflow: LoanApproval_v2</p>
                  <p className="text-sm font-medium">Decision: Approved (Confidence 0.94) - <span className="text-emerald-400">Policy Passed</span></p>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500">24ms</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl -mr-32 -mt-32 rounded-full" />
      </div>
    </div>
  );
};
