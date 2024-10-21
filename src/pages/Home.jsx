import React, { useContext } from 'react';
import Categories from '../components/Categories';
import Sort, { popup } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { useEffect, useState } from 'react';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizza } from '../redux/pizzaSlice';
import Pagination from '../components/Pagination';
import { setCategoryId, setFilters } from '../redux/filterSlice';

export default function Home() {
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();
  const { searchValue } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const pizzasRender = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  useEffect(() => {
    async function fetchData() {
      dispatch(
        fetchPizza({
          categoryId,
          sortType,
          currentPage,
          searchValue,
        }),
      );
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage, searchValue]);
  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage: currentPage + 1,
    });

    navigate(`?${queryString}`);
  }, [categoryId, currentPage, searchValue]);
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = popup.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onClickCategory={onClickCategory}></Categories>
          <Sort></Sort>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(8)].map((_, i) => <Sceleton key={i} />)
            : pizzasRender}
        </div>
        <Pagination onChangePage={(num) => setCurrentPage(num)}></Pagination>
      </div>
    </div>
  );
}
