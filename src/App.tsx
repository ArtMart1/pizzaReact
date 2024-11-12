import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import React, { useState, createContext } from 'react';
import LoginForm from './pages/LoginForm';

// Типизация для контекста
interface SearchContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType | null>(null);

function App() {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/pizzaReact" />} />
          <Route path="/pizzaReact" element={<Home />} />
          <Route path="/cartPizza" element={<Cart />} />
          <Route path="/loginForm" element={<LoginForm />} />

          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
