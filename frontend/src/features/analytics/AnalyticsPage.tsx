import EmotionModal from '@/features/reflections/EmotionModal';
import { useState } from 'react';

const AnalyticsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h1>Analytics Page!</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <EmotionModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />
    </>
  );
};

export default AnalyticsPage;
