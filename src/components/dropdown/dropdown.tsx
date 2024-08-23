'use client';

import { Dropdown, Button } from 'rizzui';
import TrendingDownIcon from '../icons/trending-down';
import { PiPlusBold } from 'react-icons/pi';
import { BsArrowDown, BsChevronDown } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

export default function DropDownComponent() {
  const router = useRouter();

  const handleRedirect = (requestType: any) => {
    router.push(`${routes.admin.createRequest}?type=${requestType}`);
  };
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button as="span">
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          New Request <BsChevronDown size="lg" className="ml-2 w-5" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleRedirect('professional')}>
          Professional
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleRedirect('contractor')}>
          Contractor
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleRedirect('fundi')}>
          Fundi
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
