import Modal, { type ModalProps } from '@/components/modal/Modal';
import styles from './EmotionModal.module.css';

// TODO: Change these later, it's not set in stone.
const EmotionModalButtons = () => {
  return (
    <div className={styles.buttonContainer}>
      <button>Bad 😭</button>
      <button>Not Good 😔 </button>
      <button>Meh 😐</button>
      <button>Ok 🙂</button>
      <button>Great! 😊</button>
    </div>
  );
};

// TODO: Use context to store show/hide state
const EmotionModal = ({ isOpen, onClose }: ModalProps) => {
  //! BUG: Only the modal re-renders on close, this component never re-renders. isOpen stays true, so
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h1>How are you feeling?</h1>
        <EmotionModalButtons />
      </div>
    </Modal>
  );
};

export default EmotionModal;
