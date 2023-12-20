import styles from '@/styles/breakdown/Breakdown.module.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Row from '../utils/Row';
import EmptyRow from '../utils/EmptyRow';
import { Fragment } from 'react';
import StyledTableCell from '../styled/StyledTableCell';

const standardPalletsTitle = 'Стандартни палета';

export default function StandardPalletsTable({ standardPallets}) {
  function renderStandardPallets() {
    return standardPallets.map((pallet, index) => {
      const previousPallet = index > 0 ? standardPallets[index - 1] : pallet;
      const isTheSamePallet = previousPallet.palletName === pallet.palletName;
      const key = pallet.palletName + pallet.productId;
      if (isTheSamePallet || index === 0) {
        return <Row key={key} item={pallet} />;
      }
      return (
        <Fragment key={key}>
          <EmptyRow />
          <Row item={pallet} />
        </Fragment>
      );
    })
  }

  return (
    <TableContainer className={styles.table} component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <StyledTableCell component='th' colSpan={4}>{standardPalletsTitle}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderStandardPallets()}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
