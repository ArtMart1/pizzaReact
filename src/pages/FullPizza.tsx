import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export default function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  useEffect(() => {
    const fetchFullPizza = async () => {
      try {
        const { data } = await axios.get(
          'https://json-server-heroku-4ed1462f6bda.herokuapp.com/items-pizza/' + id,
        );

        setPizza(data);
      } catch (error) {
        console.error('Ошибка при получении пиццы', error);
      }
    };
    fetchFullPizza();
  }, []);
  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }
  return (
    <div className="container">
      <img className="fullPizzaImg" src={pizza.imageUrl} alt="" />
      <h1>{pizza.title}</h1>
      <h2>{pizza.price}</h2>
    </div>
  );
}
