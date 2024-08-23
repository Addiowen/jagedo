// formatted-date-cell.tsx
interface FormattedDateCellProps {
    formattedDate: string;
  }
  
  const FormattedDateCell: React.FC<FormattedDateCellProps> = ({ formattedDate }) => {
    return <span>{formattedDate}</span>;
  };
  
  export default FormattedDateCell;
  