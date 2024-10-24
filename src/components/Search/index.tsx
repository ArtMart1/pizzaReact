import React, { useCallback, useRef, useState } from 'react';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';
export default function Search() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContext = React.useContext(SearchContext);

  if (!searchContext) {
    throw new Error('ОшибОЧКА');
  }

  const { setSearchValue } = searchContext;

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  };
  const searchCallback = useCallback(
    debounce((str: any) => {
      setSearchValue(str);
    }, 300),
    [],
  );

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    searchCallback(event.target.value);
  };
  return (
    <div className={styles.root}>
      <input
        value={value}
        ref={inputRef}
        onChange={(event) => onChangeSearchValue(event)}
        className={styles.root}
        placeholder="Поиск пиццы"
        type="text"
      />

      <svg
        onClick={onClickClear}
        className={styles.closeImg}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </div>
  );
}
