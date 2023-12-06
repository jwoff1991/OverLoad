import { useModal } from '../../../context/Modal.tsx';

interface OpenModalButtonProps {
  modalComponent: React.ReactNode;
  buttonText: string;
  onButtonClick?: () => void;
  onModalClose?: () => void;
  onItemClick?: () => void;
}

function OpenModalButton ({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}: OpenModalButtonProps) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;
