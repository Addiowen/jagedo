import ViewAttachmentsBlock from '../../view-attachments-block';
import ViewMilestonesTable from './view-milestones-table';

export default function ViewSubmissions({ submissions }: { submissions: any }) {
  return (
    <>
      <ViewAttachmentsBlock />
      <ViewMilestonesTable submissions={submissions} />
    </>
  );
}
