import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
export default function Pagination() {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=" >"
      //   onPageChange={handlePageClick}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="< "
      renderOnZeroPageCount={null}
    />
  );
}
