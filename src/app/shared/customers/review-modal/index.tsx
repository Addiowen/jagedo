// components/ReviewModal.tsx
import { Modal } from 'rizzui';
import { useState, FC, FormEvent } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Review submitted:', { name, rating, comments });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Review Fundi</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:ring focus:ring-opacity-50"
              min="0"
              max="5"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:ring focus:ring-opacity-50"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
