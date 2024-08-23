'use client';

import { PiArrowLineDownBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Button } from 'rizzui';

type ExportButtonProps = {
  modalView: React.ReactNode;
};

export default function UploadButtonOutlined({ modalView }: ExportButtonProps) {
  const { openModal } = useModal();
  return (
    <Button
      className="w-full @lg:mt-0 @lg:w-auto border"
      variant='outline'
      onClick={() =>
        openModal({
          view: modalView,
        })
      }
    >
      <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
      Upload
    </Button>
  );
}
