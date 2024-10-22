import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
type PaginationProps = {
  onChangePage: any;
};
const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => onChangePage(event.selected)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< "
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
