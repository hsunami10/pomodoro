import { ReactNode } from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ isOpen, hasCloseBtn = true, onClose, children }: ModalProps) =>
  isOpen && (
    <dialog className={styles.container}>
      <div className={styles.header}>
        {hasCloseBtn && (
          <button onClick={() => onClose && onClose()}>Close</button>
        )}
      </div>
      {children}
    </dialog>
  );

export default Modal;
