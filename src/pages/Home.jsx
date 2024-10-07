import React, { useContext } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchContext } from '../App';

import Pagination from '../components/Pagination';

export default function Home() {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const pizzasRender = items

    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const itemsResponse = await axios.get('http://localhost:4000/items?category=' + categoryId);
      setItems(itemsResponse.data);
      setIsLoading(false);
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onClickCategory={(id) => setCategoryId(id)}></Categories>
          <Sort sortType={sortType} onClickSortType={(i) => setSortType(i)}></Sort>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading ? [...new Array(8)].map((_, i) => <Sceleton key={i} />) : pizzasRender}
        </div>
        <Pagination></Pagination>
      </div>
    </div>
  );
}
