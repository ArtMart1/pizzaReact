import React from 'react';
import { useState } from 'react';

export default function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeIndex, setActiveIndex] = useState(0);
  const onClickCategory = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
