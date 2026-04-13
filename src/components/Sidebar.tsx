import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ShieldCheck, 
  Activity, 
  FileText,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'simulate', label: 'Simulate Workflow', icon: PlusCircle },
    { id: 'governance', label: 'Governance Logs', icon: ShieldCheck },
    { id: 'monitoring', label: 'Real-time Monitor', icon: Activity },
    { id: 'reports', label: 'Compliance Reports', icon: FileText },
  ];

  return (
    <div className="w-64 bg-slate-950 text-slate-300 h-screen flex flex-col border-r border-slate-800 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-white text-base leading-tight">
            AssureTrust
          </h1>
          <span className="text-blue-400 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
            Aethryx Platform
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === item.id 
                ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
                : "hover:bg-slate-900 hover:text-white border border-transparent"
            )}
          >
            <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-blue-400" : "text-slate-500")} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium hover:text-white transition-colors">
          <Settings className="w-4 h-4 text-slate-500" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
