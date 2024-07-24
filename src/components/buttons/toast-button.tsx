'use client';

import { useRouter } from 'next/navigation';
import { Button, Text } from 'rizzui';
import toast from 'react-hot-toast';
// import { Text } from 'rizzui';
import { routes } from '@/config/routes';

export default function ToastButton({
  title,
  message,
  route,
}: {
  title?: string;
  message?: string;
  route?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (message) {
      toast.success(<Text as="b">{message}</Text>);
    }

    if (route) {
      router.push(route);
    }
  };

  return (
    <Button className="w-32 @lg:w-auto" onClick={handleClick}>
      {title}
    </Button>
  );
}
