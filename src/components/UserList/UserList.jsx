import './UserList.css';
import Filter from '../Filter/Filter';
import Table from '../Table/Table';

function UserList() {
  return (
    <div className="userlist">
      <h1 className='userlist__title'>Список пользователей</h1>
      <Filter />
      <Table />
    </div>
  );
}

export default UserList;
