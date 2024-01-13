import { ReactNode, useCallback, useEffect } from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  hasCloseButton?: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({
  isOpen,
  hasCloseButton = true,
  onClose,
  children,
}: ModalProps) => {
  const handleEscapeKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, [handleEscapeKeyDown]);

  return (
    isOpen && (
      <>
        <div onClick={() => onClose()} className={styles.backdrop} />
        <dialog className={styles.modal}>
          {hasCloseButton && (
            <div className={styles.header}>
              <button onClick={() => onClose()}>Close</button>
            </div>
          )}
          {children}
        </dialog>
      </>
    )
  );
};

export default Modal;
