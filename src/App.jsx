import React, { useState, useEffect } from 'react';
import { ToastProvider } from './components/common/ToastProvider';
import DashboardLayout from './components/layout/DashboardLayout';
import RiskScoreCard from './components/dashboard/RiskScoreCard';
import RiskFactors from './components/dashboard/RiskFactors';
import JiraSync from './components/dashboard/JiraSync';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import RiskAnalysis from './components/pages/RiskAnalysis';
import RecoveryPlan from './components/pages/RecoveryPlan';
import SettingsPage from './components/pages/SettingsPage';
import SprintChat from './components/common/SprintChat';
import RovoLogicModal from './components/common/RovoLogicModal';
import { Construction, Plus, ArrowRight, Loader2, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMockSprintData } from './utils/mockDataGenerator';

function App() {
  // --- STATE DEFINITIONS ---

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { name: 'John Doe', role: 'Product Owner' };
  });
  const [authPage, setAuthPage] = useState('login');

  // Dashboard Data State (Persisted)
  const [dashboardData, setDashboardData] = useState(() => {
    const savedData = localStorage.getItem('dashboardData');
    return savedData ? JSON.parse(savedData) : null;
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [projectNameInput, setProjectNameInput] = useState('');
  const [jiraUrlInput, setJiraUrlInput] = useState('');

  // Dashboard View State
  const [currentView, setCurrentView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Floating Chat State
  const [chatOpen, setChatOpen] = useState(false);

  // Rovo Logic Modal State
  const [logicModalOpen, setLogicModalOpen] = useState(false);

  // Global Team State with Persistence
  const [teamMembers, setTeamMembers] = useState(() => {
    const savedTeam = localStorage.getItem('teamMembers');
    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  // Persist Team Members
  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  // --- HANDLERS ---

  const addTeamMember = (name) => {
    const newMember = {
      id: Date.now(),
      name: name,
      role: 'Developer',
      avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      status: 'Onboarding'
    };
    setTeamMembers([...teamMembers, newMember]);
    return newMember;
  };

  const removeTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    // Do NOT clear dashboard data on login, only on logout or explicit reset
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setDashboardData(null); // Clear dashboard data on logout as requested
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    // localStorage.removeItem('dashboardData'); 
    setAuthPage('login');
  };

  const handleAnalyzeProject = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate AI Analysis & Data Fetching
    setTimeout(() => {
      // GENERATE DYNAMIC DATA
      const generatedData = generateMockSprintData(projectNameInput, jiraUrlInput);

      setDashboardData(generatedData);
      localStorage.setItem('dashboardData', JSON.stringify(generatedData));

      setIsAnalyzing(false);
      setShowAddProjectModal(false);

      // Reset inputs
      setProjectNameInput('');
      setJiraUrlInput('');
    }, 2500);
  };

  // --- RENDER HELPERS ---

  if (!isAuthenticated) {
    if (authPage === 'register') {
      return (
        <RegisterPage
          onRegister={handleLogin}
          onSwitchToLogin={() => setAuthPage('login')}
        />
      );
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthPage('register')}
      />
    );
  }

  // --- MODALS ---
  const AddProjectModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md border border-slate-200 shadow-2xl"
      >
        <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Project</h2>
        <form onSubmit={handleAnalyzeProject} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Project Name</label>
            <input
              type="text"
              required
              value={projectNameInput}
              onChange={(e) => setProjectNameInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              placeholder="e.g. Phoenix Redesign"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Jira Project Link</label>
            <input
              type="text"
              required
              value={jiraUrlInput}
              onChange={(e) => setJiraUrlInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              placeholder="e.g. https://company.atlassian.net/browse/PROJ"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setShowAddProjectModal(false)}
              className="flex-1 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Fetch & Analyze <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        // EMPTY STATE CHECK
        if (!dashboardData) {
          return (
            <div className="h-[80vh] flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
                <LayoutDashboard className="w-10 h-10 text-slate-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">No Active Sprints</h2>
              <p className="text-slate-500 max-w-md mb-8">
                Your dashboard is currently empty. Connect a Jira project to start tracking risks, velocity, and implementation blockers.
              </p>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Project
              </button>

              {showAddProjectModal && <AddProjectModal />}
            </div>
          );
        }

        // FULL DASHBOARD
        return (
          <>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Sprint Overview</h1>
                <p className="text-slate-500">Real-time risk analysis for current sprint cycle.</p>
              </div>
              <button
                onClick={() => setLogicModalOpen(true)}
                className="text-xs font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
              >
                <Construction className="w-3 h-3" /> How AI Judges Risk
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1">
                <RiskScoreCard score={dashboardData.overview.riskScore} trend={dashboardData.overview.velocityTrend} />
              </div>

              <div className="lg:col-span-1">
                <JiraSync projectKey={dashboardData.jiraSync.projectKey} />
                <div className="mt-6 glass-panel p-6 rounded-2xl">
                  <h4 className="text-sm font-medium text-slate-500 mb-2 font-mono uppercase">Sprint Progress</h4>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${dashboardData.overview.sprintProgress}%` }}></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>Day 7 of 14</span>
                    <span>{dashboardData.overview.sprintProgress}% Complete</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 h-full">
                <RiskFactors />
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Actionable Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <h4 className="font-semibold text-blue-700 mb-2">Resource Bottleneck</h4>
                  <p className="text-sm text-slate-600">Backend team capacity is at 110%. Consider moving 2 low-priority tickets to next sprint.</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <h4 className="font-semibold text-purple-700 mb-2">Scope Creep</h4>
                  <p className="text-sm text-slate-600">Feature "Auth v2" was added 3 days ago. Recommended Action: Renegotiate delivery date.</p>
                </div>
              </div>
            </div>
          </>
        );
      case 'analysis':
        return <RiskAnalysis data={dashboardData} />;
      case 'insights':
        return <RecoveryPlan data={dashboardData} />;
      case 'settings':
        return (
          <SettingsPage
            teamMembers={teamMembers}
            onAddMember={addTeamMember}
            onRemoveMember={removeTeamMember}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ToastProvider>
      <DashboardLayout
        activeView={currentView}
        onNavigate={setCurrentView}
        onSearch={setSearchQuery}
        onLogout={handleLogout}
        user={user}
        teamMembers={teamMembers}
      >
        {searchQuery ? (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-lg mb-6">
            Searching for: <span className="font-bold">{searchQuery}</span> (Demo: No filter logic implemented yet)
          </div>
        ) : null}
        {renderView()}

        {/* Floating Chat Button */}
        {isAuthenticated && dashboardData && <SprintChat isOpen={chatOpen} toggleChat={() => setChatOpen(!chatOpen)} />}

        {/* Logic Explanation Modal */}
        <RovoLogicModal isOpen={logicModalOpen} onClose={() => setLogicModalOpen(false)} />

        {/* Helper when Add Project Modal is open in Empty State */}
        <AnimatePresence>
          {showAddProjectModal && (!dashboardData) && <AddProjectModal />}
        </AnimatePresence>

      </DashboardLayout>
    </ToastProvider>
  );
}

export default App;
