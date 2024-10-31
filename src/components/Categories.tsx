import { memo } from 'react';

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (index: number) => void;
};
const Categories: React.FC<CategoriesProps> = memo(({ categoryId, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            className={categoryId === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
