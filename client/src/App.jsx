import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="hotels" element={<SearchResultsPage />} />
            <Route path="hotels/:id" element={<HotelDetailsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
