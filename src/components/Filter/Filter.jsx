import { useState } from 'react';
import ClearIcon from '../Icons/ClearIcon/ClearIcon';
import './Filter.css';
import { useModal } from '../../App';

function Filter() {
  const [inputValue, setInputValue] = useState('');

  const { modalContext, setModalContext } = useModal();

  function onInput(e) {
    const value = e.target.value;
    setInputValue(value);
    setModalContext({ ...modalContext, filterValue: value });
  }

  function clearFilter() {
    setInputValue('');
    setModalContext({ ...modalContext, sorted: false, filterValue: '' });
  }
  return (
    <div className="filter">
      <input
        value={inputValue}
        className="filter__input"
        placeholder='&#128269; &#160; Поиск по имени или e-mail'
        onChange={onInput} />
      {
        (inputValue || modalContext.sorted) && <div className="filter__clean" onClick={clearFilter}>
          <ClearIcon />
          <span className="filter__text">Очистить фильтр</span>
        </div>
      }

    </div>
  );
}

export default Filter;
