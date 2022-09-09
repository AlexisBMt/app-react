import React, { useEffect, useState } from 'react'

export default function PaginationData ({ dataPerPage, totalData, currentPage, paginate }) {
  const pageNumber = Math.ceil( totalData / dataPerPage )
  const [page, setPage] = useState(currentPage)

  return(
    <>
      <nav aria-label='Pagination Data'>
        <ul className='pagination'>
          <li className='page-item'>
            <button className='page-link' aria-label='Previus' value='-1' onClick={() => paginate(currentPage - 1)}>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className='page-item'><button className='page-link disabled'>{currentPage}</button></li>
          <li className='page-item'>
            <button className='page-link' aria-label='Next' value='1' onClick={() => paginate(currentPage + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}