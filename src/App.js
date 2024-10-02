import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get('http://localhost:4000/items');
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);
  return (
    <div class="wrapper">
      <Header></Header>
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories></Categories>
            <Sort></Sort>
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
