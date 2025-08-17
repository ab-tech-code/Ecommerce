import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

/**
 * A reusable modal component that renders its children in a portal.
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the modal is currently open.
 * @param {function} props.onClose - The function to call when the modal should be closed.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  // Use a portal to render the modal at the end of the body
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body // The modal will be appended to the body element
  );
};

export default Modal;
