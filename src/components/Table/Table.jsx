import { useEffect, useState } from 'react';
import './Table.css';
import Item from '../Item/Item';
import getItems from '../../utils/getItems';
import { useModal } from '../../App';
import Pagination from '../Pagination/Pagination';


const DATE = 'registration_date'
const RATING = 'rating'

function Table() {

  //получаем список пользователей
  const [items, setItems] = useState([]);
  const [initialItems, setInitialItems] = useState([]);
  const [sortedColumn, setSortedColumn] = useState('');

  const { modalContext, setModalContext } = useModal();

  //пагинация
  const [currentPage, setCurrentPage] = useState(1);
  //задаем количество записей на странице
  const [pageList] = useState(5);
  //индекс последней записи на странице
  const lastNote = currentPage * pageList;
  //индекс первой записи на странице
  const firstNote = lastNote - pageList;
  //индекс записей текущей страницы
  const currentItems = items.slice(firstNote, lastNote);
  //задаем номер страницы
  const makePagin = pageNumber => setCurrentPage(pageNumber);
  //перелистываем страницу
  const nextPage = () => setCurrentPage(prev => prev + 1);
  const prevPage = () => setCurrentPage(prev => prev - 1);

  //сброс фильтра
  useEffect(() => {
    if (!modalContext.sorted) {
      setSortedColumn('');
      initialItems.length && setItems(initialItems);
    }
  }, [modalContext.sorted])

  //фильтр по значению
  useEffect(() => {
    if (modalContext.filterValue) {
      filterByValue();
    }
    else setItems(initialItems);
  }, [modalContext.filterValue])

  // запрос списка
  useEffect(() => {
    getItems()
      .then((result) => {
        setItems(result);
        setInitialItems(result);
      })
      .catch(e => console.log(e));
  }, [])

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    setInitialItems(initialItems.filter(item => item.id !== id));
  }

  const remove = (id) => {
    setModalContext({
      ...modalContext,
      text: 'Вы уверены, что хотите удалить пользователя?',
      callBack: () => removeItem(id),
      showModal: true,
    })
  }

  function sortBy(column) {
    if (sortedColumn === column) {
      setItems([...items].reverse());
      return
    }
    switch (column) {
      case DATE:
        setItems([...items].sort((a, b) => {
          return (new Date(a[DATE]) - new Date(b[DATE]))
        }));
        break
      case RATING:
        setItems([...items].sort((a, b) => a[RATING] - b[RATING]));
        break
      default:
        setItems([...items].sort((a, b) => a - b));
    }
    setSortedColumn(column);
    setModalContext({ ...modalContext, sorted: true });
  }

  function filterByValue() {
    setItems(initialItems.filter(item => (item.username.toUpperCase() === modalContext.filterValue.toUpperCase() || item.email.toUpperCase() == modalContext.filterValue.toUpperCase())));
  }

  return (
    <>
      <div className="table__sort">
        <span >Сортировка:</span>
        <span className={'table__sortby' + (sortedColumn === DATE ? ' active' : '')} onClick={() => sortBy(DATE)}>Дата регистрации</span>
        <span className={'table__sortby' + (sortedColumn === RATING ? ' active' : '')} onClick={() => sortBy(RATING)}>Рейтинг</span>
      </div>

      <div className="table">
        <table className="table__unit">
          <thead>
            <tr>
              <th className="table__th">Имя пользователя</th>
              <th className="table__th">E-mail</th>
              <th className="table__th">Дата регистрации</th>
              <th className="table__th">Рейтинг</th>
              <th className="table__th"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(item => Item({ item, remove }))}
          </tbody>
        </table>
      </div>

      <Pagination
        itemsAmount={items.length}
        pageList={pageList}
        makePagin={makePagin}
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage} />
    </>
  );
}

export default Table;
