// import ExportButton from '@/app/shared/export-button';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/commons/page-header';
import ImportButton from '@/app/shared/commons/import-button';
import TableResizable from '@/components/tan-table/resizable';

const pageHeader = {
  title: 'Resizable Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Table',
    },
    {
      name: 'Resizable',
    },
  ],
};

export default function TanTableResizable() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton data={data} fileName={fileName} header={header} /> */}
          <ImportButton title={'Import File'} />
        </div>
      </PageHeader>

      <TableResizable />
    </>
  );
}
