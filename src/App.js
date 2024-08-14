import { createContext, useContext, useState } from 'react';
import './App.css';
import UserList from './components/UserList/UserList';
import Modal from './components/Modal/Modal';

const ModalContext = createContext(null);

function App() {
  const [modalContext, setModalContext] = useState(
    {
      sorted: false,
      showModal: false,
      filterValue: '',
    }
  );
  return (
    <div className="App">
      <ModalContext.Provider
        value={{
          modalContext,
          setModalContext
        }}>
        <UserList />
        <Modal />
      </ModalContext.Provider>
    </div>
  );
}

export default App;

export function useModal() {
  return useContext(ModalContext);
}
