import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortId } from '../redux/filterSlice';
import { RootState } from '../redux/store';

type SortItem = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

export const popup: SortItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];
export default function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);
  const [visibleSort, setVisibleSort] = useState(false);
  const sortRef = useRef(null);

  const onClickActiveSort = (obj: SortItem) => {
    dispatch(setSortId(obj));
    setVisibleSort(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setVisibleSort(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    // return () => document.body.romoveEventListener('click', handleClickOutside());
  }, []);
  return (
    <div ref={sortRef} className="sort">
      <div onClick={() => setVisibleSort(!visibleSort)} className="sort__label">
        <svg
          className={visibleSort ? 'rotate' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sort.name}</span>
      </div>
      {visibleSort && (
        <div className="sort__popup">
          <ul>
            {popup.map((obj, i) => (
              <li
                onClick={() => onClickActiveSort(obj)}
                key={i}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
