// import ExportButton from '@/app/shared/export-button';

import TableColumnPinning from '@/components/tan-table/column-pinning';
import TableRowPinning from '@/components/tan-table/row-pinning';
import ImportButton from '@/app/shared/commons/import-button';
import PageHeader from '@/app/shared/commons/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Column Row Pinning',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Column Row Pinning',
    },
  ],
};

export default function TanStackTablePinning() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton data={data} fileName={fileName} header={header} /> */}
          <ImportButton title={'Import File'} />
        </div>
      </PageHeader>
      <div className="grid grid-cols-1 gap-6">
        <TableColumnPinning />
        <TableRowPinning />
      </div>
    </>
  );
}
