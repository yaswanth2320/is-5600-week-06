import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import productData from './data/full-products';

function App() {
  return (
    <div className="App">
      <h1>Hello There.</h1>
      <Header />
      <Routes>
        <Route path="/" element={<CardList data={productData} />} />
        <Route path="/product/:id" element={<SingleView data={productData} />} />
      </Routes>
    </div>
  );
}

export default App;
export default App;