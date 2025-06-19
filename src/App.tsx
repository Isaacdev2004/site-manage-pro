
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Sites from './components/Sites';
import Orders from './components/Orders';
import CalendarPage from './components/CalendarPage';
import Notes from './components/Notes';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Mock user role - in a real app this would come from authentication
  const [userRole] = useState<'admin' | 'manager' | 'collaborator'>('admin');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navigation userRole={userRole} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Dashboard userRole={userRole} />} />
                <Route path="/sites" element={<Sites userRole={userRole} />} />
                <Route path="/orders" element={<Orders userRole={userRole} />} />
                <Route path="/calendar" element={<CalendarPage userRole={userRole} />} />
                <Route path="/notes" element={<Notes userRole={userRole} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
