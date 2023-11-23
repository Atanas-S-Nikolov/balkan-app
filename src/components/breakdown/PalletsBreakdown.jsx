'use client';

import '@/styles/breakdown/Breakdown.css';

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
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';

import Row from '../utils/Row';
import EmptyRow from '../utils/EmptyRow';
import PalletBuilder from './PalletBuilder';

import { useRouter, usePathname } from 'next/navigation';

import { getProduct } from '@/app/services/ProductConstraintsService';
import { deleteInputProducts, getInputProducts } from '@/app/services/InputProductsService';
import { copyTextToClipboard } from '@/utils/TextUtils';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  fontWeight: theme.typography.fontWeightBold
}));

export default function PalletsBreakdown() {
  const standardPalletsTitle = 'Стандартни палета';
  const leftoverProductsTitle = 'Остатъчни изделия';
  const [palletNumber, setPalletNumber] = useState();
  const [isPalletBuilderVisible, setIsPalletBuilderVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCopyBtnVisible, setIsCopyBtnVisible] = useState(false);
  const [isNewBreakdownBtnVisible, setIsNewBreakdownBtnVisible] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [standardPallets, setStandardPallets] = useState([]);
  const [leftoverProducts, setLeftoverProducts] = useState([]);
  const hasLeftovers = leftoverProducts.length > 0;
  const router = useRouter();
  const pathname = usePathname();

  const breakdownProducts = useCallback(async () => {
    const standards = [];
    const leftovers = [];
    let palletNum = 1;
    const inputProducts = await getInputProducts();
    const promises = inputProducts.map(item => getProduct(item.productId));
    const resolved = await Promise.all(promises);
    inputProducts.forEach((item, index) => {
      const response = resolved[index];
      const productConstraint = response[0];
      if (!productConstraint) {
        console.log(item);
        return;
      }
      const { productId, quantityPerPallet, palletType } = productConstraint;
      if (quantityPerPallet) {
        const breakdownQuantity = item.quantity;
        const standardPalletsCount = parseInt(breakdownQuantity / quantityPerPallet);
        const leftoversCount = breakdownQuantity % quantityPerPallet;
        for (let index = 0; index < standardPalletsCount; index++) {
          standards.push({
            palletName: `Пале ${palletNum}`,
            productId,
            quantity: quantityPerPallet,
            palletType
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
    setIsLoaded(true);
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
    setStandardPallets(pallets);
    handleSnackbarOpen();
    if (!hasLeftovers) {
      setIsCopyBtnVisible(true);
      setIsNewBreakdownBtnVisible(true);
    }
  }

  function handleCopyBtnClick(event) {
    event.preventDefault();
    const text = standardPallets
      .map((pallet, index) => {
        const { palletName, productId, quantity } = pallet;
        const previousPallet = index > 0 ? standardPallets[index - 1] : pallet;
        const isTheSamePallet = previousPallet.palletName === palletName;
        const row = `${palletName} ${productId} ${quantity}`;
        return isTheSamePallet ? row : `\n${row}`;
      })
      .join('\n');
    copyTextToClipboard(text);
  }

  async function navigateToBreakdownInput(event) {
    event.preventDefault();
    await deleteInputProducts();
    router.replace(`${pathname}/input`);
  }

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
    <div className='wrapper'>
      {
        isLoaded
          ? (
            <TableContainer className='table' component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <StyledTableCell colSpan={4}>{standardPalletsTitle}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderStandardPallets()}
              </TableBody>
            </Table>
          </TableContainer>
        )
        : <CircularProgress disableShrink/>
      }
      
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
                    }).sort((leftover1, leftover2) => leftover1.productId > leftover2.productId)}
                  </TableBody>
                </Table>
              </TableContainer>
            )
            : null
        }
        {
          isLoaded & isPalletBuilderVisible
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
      <div>
        {
          isCopyBtnVisible
            ? <Button
                className='copy-btn'
                variant='contained'
                startIcon={<ContentCopyIcon/>}
                onClick={handleCopyBtnClick}
              >
                Копирай всичко
              </Button>
            : null
        }
        <br/>
        <br/>
        {
          isNewBreakdownBtnVisible
            ? <Button
                className='copy-btn'
                variant='contained'
                startIcon={<ReplayIcon/>}
                onClick={navigateToBreakdownInput}
              >
                Нова разбивка
              </Button>
            : null
        }
      </div>
    </div>
  )
}
