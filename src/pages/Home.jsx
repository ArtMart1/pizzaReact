import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get('http://localhost:4000/items');
      setItems(itemsResponse.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories></Categories>
          <Sort></Sort>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(8)].map((_, i) => <Sceleton key={i} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
    </div>
  );
}
