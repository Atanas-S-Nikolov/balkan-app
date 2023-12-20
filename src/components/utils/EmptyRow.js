import styles from '@/styles/utils/EmptyRow.module.css';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function EmptyRow() {
  const EmptyTableCell = () => <TableCell className={styles.empty_table_cell}>&nbsp;</TableCell>;
  return (
    <TableRow>
      <EmptyTableCell />
      <EmptyTableCell />
      <EmptyTableCell />
    </TableRow>
  );
}
