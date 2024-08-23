// import { Collapse } from 'rizzui';
// import { PiCaretDownBold } from 'react-icons/pi';
// import cn from '@/utils/class-names';
import ViewAttachmentsBlock from '../../view-attachments-block';
import ViewMilestonesTable from './view-milestones-table';

export default function ViewSubmissions() {
    return (
        <>
        {/* <Collapse
            defaultOpen={false}
            className={cn('py-5 md:py-7')}
            header={({ open, toggle }) => (
            <button
                type="button"
                onClick={toggle}
                className="flex w-full cursor-pointer items-center justify-between text-left font-lexend text-xl font-semibold text-gray-700"
            >
                Submissions
                <PiCaretDownBold
                className={cn(
                    'h-5 w-5 -rotate-90 transform transition-transform duration-300 rtl:rotate-90',
                    open && '-rotate-0 rtl:rotate-0'
                )}
                />
            </button>
            )}
        > */}
            <ViewAttachmentsBlock />
            <ViewMilestonesTable />
        {/* </Collapse> */}
        </>
    )
}