import PropTypes from 'prop-types'
import './Modal.scss'

function Modal({ isVisible, openModal, closeModal, buttonText, modalTitle, children }) {
  return (
    <>
      <div className={isVisible ? 'modal' : 'modal modal--hidden'}>
        <div className="modal__window">
          <button type="button" className="modal__close" onClick={closeModal}>
            X
          </button>
          <div className="modal__title">{modalTitle}</div>
          <div className="modal__content">{children || 'This modal is empty...'}</div>
        </div>
      </div>
      <button type="button" className="btn btn--primary" onClick={openModal}>
        {buttonText}
      </button>
    </>
  )
}

Modal.defaultProps = {
  children: null
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Modal
