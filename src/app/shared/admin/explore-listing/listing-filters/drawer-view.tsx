'use client';

import { Button, Title, ActionIcon } from 'rizzui';
import SimpleBar from '@/components/ui/simplebar';
import { useMedia } from '@/hooks/use-media';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import ForSaleFilter from './for-sale-filter';
import PriceFilter from './price-filter';
import AccommodationFilter from './accommodation-filter';
import HometypeFilter from './hometype-filter';
import MaxHOAFilter from './max-hoa-filter';
import ListingTypeFilter from './listing-type-filter';
import {
  amenitiesOptions,
  initialState,
  propertyStatusOptions,
  tourOptions,
  viewOptions,
} from './filter-utils';
import ParkingFilter from './parking-filter';
import SquareFeetFilter from './square-feet-filter';
import LotSizeFilter from './lot-size-filter';
import SoldInFilter from './sold-in-filter';
import KeywordFilter from './keyword-filter';
import BuiltYearFilter from './built-year-filter';
import { PiXBold } from 'react-icons/pi';
import FilterWithSearch from '@/components/filter-with-search';
import hasSearchedParams from '@/utils/has-searched-params';

export default function FilterDrawerView() {
  const { state, reset, applyFilter, clearFilter } = useFilterControls<
    typeof initialState,
    any
  >(initialState);
  const isWide = useMedia('(min-width: 1537px)', false);
  const { closeDrawer } = useDrawer();

  return (
    <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
      <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
        <Title as="h5" className="font-semibold">
          Filters
        </Title>
        <ActionIcon
          size="sm"
          rounded="full"
          variant="text"
          onClick={() => closeDrawer()}
        >
          <PiXBold className="h-4 w-4" />
        </ActionIcon>
      </div>

      <SimpleBar className="-mx-5 min-h-[calc(100%-10rem)]">
        <div className="space-y-9 px-5">
          {!isWide && (
            <>
              {/* <div className="flex flex-col space-y-3">
                <Title as="h6" className="mb-2 font-medium">
                  For Sale
                </Title>
                <ForSaleFilter state={state} applyFilter={applyFilter} />
              </div> */}

              <div>
                <Title as="h6" className="mb-5 font-semibold">
                  Classes
                </Title>
                <HometypeFilter state={state} applyFilter={applyFilter} />
              </div>
            </>
          )}
        </div>
      </SimpleBar>

      <div className="sticky bottom-0 flex items-center justify-center gap-3 bg-white pb-3 pt-5 dark:bg-gray-50">
        {hasSearchedParams() ? (
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              reset();
              closeDrawer();
            }}
            className="flex-shrink-0"
          >
            Reset All
          </Button>
        ) : null}
        <Button size="lg" className="w-full" onClick={() => closeDrawer()}>
          Show results
        </Button>
      </div>
    </div>
  );
}
