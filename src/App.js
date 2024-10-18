import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import { useState } from 'react';

import React from 'react';
export const SearchContext = React.createContext('');
function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Navigate to="/pizzaReact" />} />
          <Route path="/pizzaReact" element={<Home></Home>}></Route>
          <Route path="/cartPizza" element={<Cart></Cart>}></Route>
          <Route path="/pizza/:id" element={<FullPizza></FullPizza>}></Route>

          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
