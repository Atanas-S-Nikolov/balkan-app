import breakdownStyles from '@/styles/breakdown/Breakdown.module.css';
import styles from '@/styles/breakdown/LeftoverProductsTable.module.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import StyledTableCell from "../styled/StyledTableCell";

const leftoverProductsTitle = 'Остатъчни изделия';

function handleOnDrag(event, row) {
  event.dataTransfer.setData('rowIndex', row);
}

export default function LeftoverProductsTable({ leftoverProducts }) {
  return (
    <TableContainer className={breakdownStyles.table} component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <StyledTableCell component='th' colSpan={2}>{leftoverProductsTitle}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leftoverProducts.map((leftover, index) => {
            const { productId, quantity } = leftover;
            return (
              <TableRow
                className={styles.leftover_row}
                key={productId}
                draggable
                onDragStart={event => handleOnDrag(event, index)}
              >
                <TableCell align='center'>{productId}</TableCell>
                <TableCell align='center'>{quantity}</TableCell>
              </TableRow>
            );
          }).sort((leftover1, leftover2) => leftover1.productId > leftover2.productId)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
