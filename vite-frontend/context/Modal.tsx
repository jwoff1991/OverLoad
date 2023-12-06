import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

type ModalContextType = {
  modalRef: React.RefObject<HTMLDivElement>;
  modalContent: React.ReactNode;
  closeModal: () => void;
  setModalContent: (content: React.ReactNode) => void;
  setOnModalClose: (callback: () => void) => void;
}

const ModalContext = React.createContext({} as ModalContextType);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);;
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState<(() => void) | null>(null);;

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      onModalClose();
      setOnModalClose(null);
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal(): React.ReactPortal | null {
  const { modalRef, modalContent, closeModal } = useContext<ModalContextType>(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
