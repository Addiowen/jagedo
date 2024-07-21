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
  AltButton,
}: {
  title?: string;
  message?: string;
  route?: string;
  AltButton?: boolean;
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
    <Button
      variant={AltButton ? 'outline' : 'solid'} // Conditionally set the variant
      className="w-full @lg:w-auto"
      onClick={handleClick}
    >
      {title}
    </Button>
  );
}
