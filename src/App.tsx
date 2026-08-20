import React, { useState, useEffect } from 'react';
import { ScreenId, UserProfile, UserRole } from './types';
import { CURRENT_USER, INITIAL_MISSIONS } from './data/mockData';

// Navigation Components
import { Sidebar } from './components/navigation/Sidebar';
import { TopHeaderBar } from './components/navigation/TopHeaderBar';
import { MobileTabBar } from './components/navigation/MobileTabBar';
import { CommandPalette } from './components/navigation/CommandPalette';

// Auth Screens
import { LoginScreen } from './components/screens/auth/LoginScreen';
import { RegisterScreen } from './components/screens/auth/RegisterScreen';
import { OnboardingScreen } from './components/screens/auth/OnboardingScreen';

// System Screens
import { Error404Screen } from './components/screens/system/Error404Screen';
import { Error500Screen } from './components/screens/system/Error500Screen';
import { OfflineScreen } from './components/screens/system/OfflineScreen';

// Student Screens
import { DashboardScreen } from './components/screens/student/DashboardScreen';
import { ProfileScreen } from './components/screens/student/ProfileScreen';
import { LeaderboardScreen } from './components/screens/student/LeaderboardScreen';
import { AnalyticsScreen } from './components/screens/student/AnalyticsScreen';
import { TestCenterScreen } from './components/screens/student/TestCenterScreen';
import { ActiveTestScreen } from './components/screens/student/ActiveTestScreen';
import { TestFeedbackScreen } from './components/screens/student/TestFeedbackScreen';
import { TestHistoryScreen } from './components/screens/student/TestHistoryScreen';
import { RevisionScreen } from './components/screens/student/RevisionScreen';
import { BattleArenaScreen } from './components/screens/student/BattleArenaScreen';
import { TimelineGameScreen } from './components/screens/student/TimelineGameScreen';
import { MapChallengeScreen } from './components/screens/student/MapChallengeScreen';
import { PersonQuizScreen } from './components/screens/student/PersonQuizScreen';
import { LearningCenterScreen } from './components/screens/student/LearningCenterScreen';
import { AIMentorScreen } from './components/screens/student/AIMentorScreen';
import { ShopScreen } from './components/screens/student/ShopScreen';
import { PremiumScreen } from './components/screens/student/PremiumScreen';

// Teacher Screens
import { TeacherDashboardScreen } from './components/screens/teacher/TeacherDashboardScreen';
import { TeacherGroupsScreen } from './components/screens/teacher/TeacherGroupsScreen';
import { TeacherTestBuilderScreen } from './components/screens/teacher/TeacherTestBuilderScreen';

// Admin Screens
import { AdminDashboardScreen } from './components/screens/admin/AdminDashboardScreen';
import { AdminUsersScreen } from './components/screens/admin/AdminUsersScreen';
import { AdminQuestionsScreen } from './components/screens/admin/AdminQuestionsScreen';
import { AdminSettingsScreen } from './components/screens/admin/AdminSettingsScreen';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Theme synchronization with document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentUser((prev) => ({ ...prev, role }));
    if (role === 'teacher') {
      setCurrentScreen('teacher_dashboard');
    } else if (role === 'admin') {
      setCurrentScreen('admin_dashboard');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleEarnRewards = (xp: number, coins: number) => {
    setCurrentUser((prev) => {
      const newXp = prev.xp + xp;
      const newLevel = Math.floor(newXp / 500) + 1;
      return {
        ...prev,
        xp: newXp,
        coins: prev.coins + coins,
        level: newLevel,
      };
    });
  };

  const handleBuyItem = (_itemId: string, cost: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      coins: Math.max(0, prev.coins - cost),
    }));
  };

  const handleUpgradePremium = () => {
    setCurrentUser((prev) => ({
      ...prev,
      isPremium: true,
      subscriptionPlan: '1 Yillik Cheksiz',
    }));
  };

  const handleStartTest = (_testId: string) => {
    setCurrentScreen('test_active');
  };

  const handleFinishTest = (_answers: Record<string, any>) => {
    handleEarnRewards(180, 25);
    setCurrentScreen('test_feedback');
  };

  // Offline display
  if (!isOnline) {
    return <OfflineScreen onRetry={() => setIsOnline(navigator.onLine)} />;
  }

  // Auth Screens (Fullscreen, no standard sidebar)
  if (currentScreen === 'auth_login') {
    return (
      <LoginScreen
        onLogin={(phone) => {
          setCurrentUser((prev) => ({ ...prev, phone }));
          setCurrentScreen('dashboard');
        }}
        onNavigate={setCurrentScreen}
      />
    );
  }

  if (currentScreen === 'auth_register') {
    return (
      <RegisterScreen
        onRegister={(_userData) => {
          setCurrentScreen('auth_onboarding');
        }}
        onNavigate={setCurrentScreen}
      />
    );
  }

  if (currentScreen === 'auth_onboarding') {
    return (
      <OnboardingScreen
        onComplete={(_target, _sub) => {
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  // Error Screens
  if (currentScreen === 'error_404') {
    return <Error404Screen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'error_500') {
    return <Error500Screen onRetry={() => setCurrentScreen('dashboard')} />;
  }

  // Render main screen component
  const renderScreen = () => {
    switch (currentScreen) {
      // Student
      case 'dashboard':
        return (
          <DashboardScreen
            user={currentUser}
            missions={INITIAL_MISSIONS}
            onNavigate={setCurrentScreen}
          />
        );
      case 'profile':
        return <ProfileScreen user={currentUser} onNavigate={setCurrentScreen} />;
      case 'leaderboard':
        return <LeaderboardScreen user={currentUser} />;
      case 'analytics':
        return <AnalyticsScreen user={currentUser} onNavigate={setCurrentScreen} />;
      case 'tests':
        return <TestCenterScreen onNavigate={setCurrentScreen} onStartTest={handleStartTest} />;
      case 'test_active':
        return <ActiveTestScreen onFinishTest={handleFinishTest} onNavigate={setCurrentScreen} />;
      case 'test_feedback':
        return <TestFeedbackScreen onNavigate={setCurrentScreen} />;
      case 'test_history':
        return <TestHistoryScreen onNavigate={setCurrentScreen} />;
      case 'revision':
        return <RevisionScreen onNavigate={setCurrentScreen} />;
      case 'arena':
        return (
          <BattleArenaScreen
            user={currentUser}
            onNavigate={setCurrentScreen}
            onEarnRewards={handleEarnRewards}
          />
        );
      case 'game_timeline':
        return (
          <TimelineGameScreen
            onNavigate={setCurrentScreen}
            onEarnRewards={handleEarnRewards}
          />
        );
      case 'game_map':
        return (
          <MapChallengeScreen
            onNavigate={setCurrentScreen}
            onEarnRewards={handleEarnRewards}
          />
        );
      case 'game_person':
        return (
          <PersonQuizScreen
            onNavigate={setCurrentScreen}
            onEarnRewards={handleEarnRewards}
          />
        );
      case 'learning':
        return (
          <LearningCenterScreen
            isPremium={currentUser.isPremium}
            onNavigate={setCurrentScreen}
          />
        );
      case 'ai_mentor':
        return <AIMentorScreen user={currentUser} onNavigate={setCurrentScreen} />;
      case 'shop':
        return (
          <ShopScreen
            user={currentUser}
            onBuyItem={handleBuyItem}
            onNavigate={setCurrentScreen}
          />
        );
      case 'premium':
        return (
          <PremiumScreen
            isPremium={currentUser.isPremium}
            onUpgrade={handleUpgradePremium}
            onNavigate={setCurrentScreen}
          />
        );

      // Teacher
      case 'teacher_dashboard':
        return <TeacherDashboardScreen user={currentUser} onNavigate={setCurrentScreen} />;
      case 'teacher_groups':
        return <TeacherGroupsScreen onNavigate={setCurrentScreen} />;
      case 'teacher_builder':
        return <TeacherTestBuilderScreen onNavigate={setCurrentScreen} />;

      // Admin
      case 'admin_dashboard':
        return <AdminDashboardScreen onNavigate={setCurrentScreen} />;
      case 'admin_users':
        return <AdminUsersScreen onNavigate={setCurrentScreen} />;
      case 'admin_questions':
        return <AdminQuestionsScreen onNavigate={setCurrentScreen} />;
      case 'admin_settings':
        return <AdminSettingsScreen onNavigate={setCurrentScreen} />;

      default:
        return <DashboardScreen user={currentUser} onNavigate={setCurrentScreen} />;
    }
  };

  const isZenMode = currentScreen === 'test_active';

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex transition-colors duration-300">
      {/* 1. Left Sidebar Navigation (Desktop) - Hidden in Zen Mode */}
      {!isZenMode && (
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          role={currentUser.role}
          isPremium={currentUser.isPremium}
          onLogout={() => setCurrentScreen('auth_login')}
        />
      )}

      {/* 2. Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${isZenMode ? 'pl-0' : 'md:pl-64'}`}>
        {/* Top Header Bar - Hidden in Zen Mode */}
        {!isZenMode && (
          <TopHeaderBar
            user={currentUser}
            activeRole={currentUser.role}
            onChangeRole={handleRoleChange}
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            isDarkMode={theme === 'dark'}
            onToggleTheme={handleToggleTheme}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        )}

        {/* Dynamic Screen View */}
        <main className={`flex-1 w-full mx-auto ${isZenMode ? 'p-3 sm:p-6 max-w-5xl' : 'p-4 sm:p-6 lg:p-8 max-w-7xl pb-24 md:pb-8'}`}>
          {renderScreen()}
        </main>
      </div>

      {/* 3. Mobile Tab Bar (Bottom) - Hidden in Zen Mode */}
      {!isZenMode && (
        <MobileTabBar
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          role={currentUser.role}
        />
      )}

      {/* 4. Global Command Palette (Cmd + K / Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setCurrentScreen}
      />
    </div>
  );
}
