import './Item.css';
import RemoveIcon from '../Icons/RemoveIcon/RemoveIcon';


function Item({ item, remove }) {

  const date = new Date(item.registration_date).toLocaleDateString() || '-'

  return (
    <tr className="item" key={item.id}>
      <td className="item__td item--blue">{item.username}</td>
      <td className="item__td">{item.email}</td>
      <td className="item__td">{date}</td>
      <td className="item__td">{item.rating}</td>
      <td className="item__td">
        <span className='btn' onClick={() => remove(item.id)}>
          <RemoveIcon />
        </span>
      </td>
    </tr>
  );
}

export default Item;
