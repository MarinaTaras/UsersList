import './Pagination.css'

function Pagination({ itemsAmount, pageList, makePagin, nextPage, prevPage, currentPage }) {
  const pagesAmount = []

  for (let i = 1; i <= Math.ceil(itemsAmount / pageList); i++) {
    pagesAmount.push(i)
  }
  return (
    <div className='pagination'>
      <ul className='pagination__list'>
        <li className='pagination__page' >
          <a href="#" className={'pagination__button flip' + (currentPage <= 1 ? ' disabled' : '')} onClick={() => prevPage()}>назад</a>
        </li>
        {
          pagesAmount.map(number => (
            <li className={'pagination__page' + (currentPage === number ? ' border' : '')} key={number}>
              <a href="#" className='pagination__button number' onClick={() => makePagin(number)} >{number}</a>
            </li>
          ))
        }
        <li className='pagination__page' >
          <a href="#" className={'pagination__button flip' + (currentPage >= pagesAmount.length ? ' disabled' : '')} onClick={() => nextPage()} >вперед</a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination