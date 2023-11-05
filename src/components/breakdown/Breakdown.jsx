'use client';

import '../../styles/breakdown/Breakdown.css';

import { useCallback, useEffect, useState, Fragment } from "react"

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';

import { breakdownTest, constraints } from "../../breakdownsTest";
import PalletBuilder from './PalletBuilder';

function Row({ item }) {
  const { palletName, productId, quantity } = item;
  const PalletCell = ({ children }) => <TableCell className='pallet-cell'>{children}</TableCell>;
  return (
    <TableRow>
      <PalletCell>{palletName}</PalletCell>
      <PalletCell>{productId}</PalletCell>
      <PalletCell>{quantity}</PalletCell>
    </TableRow>
  );
}

function EmptyRow() {
  const EmptyTableCell = () => <TableCell className='empty-table-cell'>&nbsp;</TableCell>;
  return (
    <TableRow>
      <EmptyTableCell />
      <EmptyTableCell />
      <EmptyTableCell />
    </TableRow>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  fontWeight: theme.typography.fontWeightBold
}));

export default function Breakdown() {
  const standardPalletsTitle = 'Стандартни палета';
  const leftoverProductsTitle = 'Остатъчни изделия';
  const [standardPallets, setStandardPallets] = useState([]);
  const [leftoverProducts, setLeftoverProducts] = useState([]);
  const [palletNumber, setPalletNumber] = useState();
  const [isPalletBuilderVisible, setIsPalletBuilderVisible] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const hasLeftovers = leftoverProducts.length > 0;

  const breakdownProducts = useCallback(() => {
    const standards = [];
    const leftovers = [];
    let palletNum = 1;
    breakdownTest.forEach(breakdown => {
      const productId = breakdown.productId;
      const productQuantityConstraint = constraints.get(productId);
      if (productQuantityConstraint) {
        const breakdownQuantity = breakdown.quantity;
        const standardPalletsCount = parseInt(breakdownQuantity / productQuantityConstraint);
        const leftoversCount = breakdownQuantity % productQuantityConstraint;
        for (let index = 0; index < standardPalletsCount; index++) {
          standards.push({
            palletName: `Пале ${palletNum}`,
            productId,
            quantity: productQuantityConstraint
          });
          ++palletNum;
        }
        if (leftoversCount > 0) {
          leftovers.push({
            productId,
            quantity: leftoversCount
          });
        }
      }
    });
    setPalletNumber(palletNum);
    setStandardPallets(standards);
    setLeftoverProducts(leftovers);
  }, [setStandardPallets, setLeftoverProducts]);

  useEffect(() => {
    breakdownProducts();
  }, [breakdownProducts]);

  function handleOnDrag(event, row) {
    event.dataTransfer.setData('rowIndex', row);
  }

  function handleSnackbarOpen() {
    setIsSnackbarOpen(true);
  }

  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  function handleBuilderStandardPalletsUpdate(pallets) {
    setStandardPallets(pallets)
    handleSnackbarOpen();
  }

  function renderStandardPallets() {
    return standardPallets.map((pallet, index) => {
      const previousPallet = index > 0 ? standardPallets[index - 1] : undefined;
      const isTheSamePallet = previousPallet && previousPallet.palletName === pallet.palletName;
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
    <div className='wrapper'>
      <TableContainer className='table' component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={3}>{standardPalletsTitle}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderStandardPallets()}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='drag-and-drop_container'>
        {
          hasLeftovers
            ? (
              <TableContainer className='table' component={Paper}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={2}>{leftoverProductsTitle}</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leftoverProducts.map((leftover, index) => {
                      const { productId, quantity } = leftover;
                      return (
                        <TableRow
                          className='leftover-row'
                          key={productId}
                          draggable
                          onDragStart={event => handleOnDrag(event, index)}
                        >
                          <TableCell align='center'>{productId}</TableCell>
                          <TableCell align='center'>{quantity}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )
            : null
        }
        {
          isPalletBuilderVisible
            ? <PalletBuilder
              palletNumber={palletNumber}
              leftoverProducts={leftoverProducts}
              standardPallets={standardPallets}
              onUpdateLeftovers={setLeftoverProducts}
              onUpdateStandardPallets={handleBuilderStandardPalletsUpdate}
              onUpdatePalletNumber={setPalletNumber}
              setIsVisibleCallback={setIsPalletBuilderVisible}
            />
            : null
        }
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={5000}
          message='Довавихте ново пале!'
          onClose={handleSnackbarClose}
        />
      </div>
    </div>
  )
}
