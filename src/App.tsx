import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/contexts/UserContext';
import Navbar from '@/components/Navbar';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Reports from '@/components/Reports';
import CreatePost from '@/components/CreatePost';
import Dashboard from '@/components/Dashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="container mx-auto py-8 px-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
          <Toaster />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;