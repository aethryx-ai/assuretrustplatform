/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { WorkflowForm } from './components/WorkflowForm';
import { WorkflowDetail } from './components/WorkflowDetail';
import { GovernanceLogs } from './components/GovernanceLogs';
import { RealTimeMonitor } from './components/RealTimeMonitor';
import { ComplianceReports } from './components/ComplianceReports';
import { Workflow } from './types';
import { MOCK_WORKFLOWS } from './mockData';
import { evaluateWorkflow } from './services/geminiService';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ShieldCheck, 
  Activity, 
  Menu,
  X,
  Bell,
  Loader2
} from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Handle mobile navigation
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedWorkflow(null);
    setIsMobileMenuOpen(false);
  };

  const handleSaveWorkflow = async (newWorkflow: Partial<Workflow>) => {
    setIsEvaluating(true);
    try {
      const fullWorkflow = await evaluateWorkflow(newWorkflow);
      setWorkflows([fullWorkflow, ...workflows]);
      setActiveTab('dashboard');
    } catch (error) {
      console.error("Evaluation failed:", error);
      // Fallback or error handling could go here
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar - Desktop */}
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-sm tracking-tight">AssureTrust</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
              Enterprise <span className="text-slate-300">/</span> {activeTab}
              {selectedWorkflow && (
                <>
                  <span className="text-slate-300">/</span> 
                  <span className="text-blue-600">{selectedWorkflow.name}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1" />
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">Brindha A.</p>
                <p className="text-[10px] text-slate-500">Compliance Lead</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/brindha/100/100" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            {selectedWorkflow ? (
              <WorkflowDetail 
                key="detail"
                workflow={selectedWorkflow} 
                onBack={() => setSelectedWorkflow(null)} 
              />
            ) : activeTab === 'dashboard' ? (
              <Dashboard 
                key="dashboard"
                workflows={workflows} 
                onSelectWorkflow={setSelectedWorkflow} 
              />
            ) : activeTab === 'simulate' ? (
              <WorkflowForm 
                key="form"
                onSave={handleSaveWorkflow} 
                onCancel={() => setActiveTab('dashboard')} 
                isEvaluating={isEvaluating}
              />
            ) : activeTab === 'governance' ? (
              <GovernanceLogs key="governance" />
            ) : activeTab === 'monitoring' ? (
              <RealTimeMonitor key="monitoring" />
            ) : activeTab === 'reports' ? (
              <ComplianceReports key="reports" />
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4"
              >
                <Activity className="w-12 h-12 opacity-20" />
                <p className="text-sm font-medium italic">Module "{activeTab}" is currently under development.</p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="text-blue-600 text-sm font-bold hover:underline"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 z-20">
          <button 
            onClick={() => handleTabChange('dashboard')}
            className={cn("flex flex-col items-center gap-1", activeTab === 'dashboard' ? "text-blue-600" : "text-slate-400")}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Home</span>
          </button>
          <button 
            onClick={() => handleTabChange('simulate')}
            className={cn("flex flex-col items-center gap-1", activeTab === 'simulate' ? "text-blue-600" : "text-slate-400")}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Sim</span>
          </button>
          <button 
            onClick={() => handleTabChange('monitoring')}
            className={cn("flex flex-col items-center gap-1", activeTab === 'monitoring' ? "text-blue-600" : "text-slate-400")}
          >
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Live</span>
          </button>
          <button 
            onClick={() => handleTabChange('governance')}
            className={cn("flex flex-col items-center gap-1", activeTab === 'governance' ? "text-blue-600" : "text-slate-400")}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Gov</span>
          </button>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-slate-950 z-50 md:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <ShieldCheck className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="font-bold text-white text-base leading-tight">AssureTrust</h1>
                    <span className="text-blue-400 block text-[10px] font-bold uppercase tracking-wider opacity-80">Aethryx Platform</span>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <nav className="flex-1 px-4 py-4 space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'simulate', label: 'Simulate Workflow', icon: PlusCircle },
                  { id: 'governance', label: 'Governance Logs', icon: ShieldCheck },
                  { id: 'monitoring', label: 'Real-time Monitor', icon: Activity },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      activeTab === item.id 
                        ? "bg-blue-600 text-white" 
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
