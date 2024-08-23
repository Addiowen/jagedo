'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'rizzui';
import toast from 'react-hot-toast';
import { Text } from 'rizzui';
import { routes } from '@/config/routes';

export default function ToastButton({
  title,
  message,
  route,
  onSuccess,
  delay = 3000, // Default delay of 3 seconds
}: {
  title?: string;
  message?: string;
  route?: string;
  onSuccess?: () => void;
  delay?: number;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (message) {
      toast.success(<Text as="b">{message}</Text>);
    }

    if (onSuccess) {
      onSuccess();
    }

    if (route) {
      setTimeout(() => {
        router.push(route);
      }, delay);
    }
  };

  return (
    <Button className="w-full @lg:w-auto" onClick={handleClick}>
      {title}
    </Button>
  );
}
