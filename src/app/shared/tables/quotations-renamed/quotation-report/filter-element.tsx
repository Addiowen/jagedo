'use client';
import StatusField from '@/components/controlled-table/status-field';
import { Button } from 'rizzui';
import { PiTrashDuotone } from 'react-icons/pi';

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};
export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 @[29rem]:flex-row @[42rem]:w-auto @[57rem]:-ms-4">
      <div className="flex w-full flex-col gap-3 @[22rem]:flex-row @[42rem]:w-auto"></div>
      {isFiltered ? (
        <Button
          size="sm"
          onClick={() => {
            handleReset();
          }}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </div>
  );
}
