// import ExportButton from '@/app/shared/export-button';
import TableColumnDnd from '@/components/tan-table/column-dnd';
import ImportButton from '@/app/shared/commons/import-button';
import PageHeader from '@/app/shared/commons/page-header';
import { routes } from '@/config/routes';
import TableRowDnd from '@/components/tan-table/row-dnd';

const pageHeader = {
  title: 'Drag and Drop Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Table',
    },
    {
      name: 'Drag and Drop Table',
    },
  ],
};

export default function TanStackTableDnD() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton data={data} fileName={fileName} header={header} /> */}
          <ImportButton title={'Import File'} />
        </div>
      </PageHeader>
      <div className="grid grid-cols-1 gap-6">
        <TableColumnDnd />
        <TableRowDnd />
      </div>
    </>
  );
}
