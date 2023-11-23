import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function EmptyRow() {
  const EmptyTableCell = () => <TableCell className='empty-table-cell'>&nbsp;</TableCell>;
  return (
    <TableRow>
      <EmptyTableCell />
      <EmptyTableCell />
      <EmptyTableCell />
    </TableRow>
  );
}
