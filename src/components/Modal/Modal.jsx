
import './Modal.css';
import { useModal } from '../../App';

function Modal() {

  const { modalContext, setModalContext } = useModal();

  const close = () => setModalContext({ ...modalContext, showModal: false });
  const execute = () => {
    modalContext.callBack()
    close()
  };

  return modalContext.showModal && (
    <div className='modal__overlay'>
      <div className='modal__window'>
        <div className='modal__text'>{modalContext.text || 'Вы уверены?'}</div>
        <div className='modal__buttons'>
          <button className="modal__btn modal__btn--ok" onClick={execute}>Да</button>
          <button className="modal__btn modal__btn--cancel" onClick={close}>Нет</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;