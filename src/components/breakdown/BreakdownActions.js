import styles from '@/styles/breakdown/Breakdown.module.css';

import { useEffect, useState, useCallback } from "react"

import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

import ReplayIcon from '@mui/icons-material/Replay';

import PalletBuilder from './PalletBuilder';

import { useRouter } from 'next/router';

import { deleteOrder } from '@/services/OrderService';
import LeftoverProductsTable from './LeftoverProductsTable';
import StandardPalletsTable from './StandardPalletsTable';
import ExcelFileDownloader from '../utils/ExcelFileDownloader';
import dayjs from 'dayjs';

export default function BreakdownActions({ order }) {
  const [isExcelDownloaderVisible, setIsExcelDownloaderVisible] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [orderResponse, setOrderResponse] = useState(order);
  const { standardPallets, leftoverProducts, builderProducts } = orderResponse;
  const hasLeftovers = leftoverProducts?.length > 0;
  const hasBuilderProducts = builderProducts?.length > 0;
  const router = useRouter();
  const { orderId, orderDate } = order
  function handleSnackbarOpen() {
    setIsSnackbarOpen(true);
  }

  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  function handleAfterStandardPalletsUpdate() {
    handleSnackbarOpen();
  }

  function handleSetOrderCallback(order) {
    setOrderResponse(order);
    router.reload();
  }

  const createExcelData = useCallback(() => {
    const data = [{
      'Номер на поръчка': orderId.toString(),
      'Дата на поръчка': dayjs(orderDate).format('MM/DD/YYYY')
    }];
    standardPallets
      .forEach((pallet, index) => {
        const { palletName } = pallet;
        const previousPallet = index > 0 ? standardPallets[index - 1] : pallet;
        const isTheSamePallet = previousPallet.palletName === palletName;
        const row = {
          'Номер на пале': palletName,
          'Номер на изделие': pallet.productId,
          'Бройка изделия в пале': pallet.quantity.toString(),
          'Вид пале': pallet.palletType
        };
        const emptyRow = {
          'Номер на пале': '',
          'Номер на изделие': '',
          'Бройка изделия в пале': '',
          'Вид пале': '',
        };
        if (isTheSamePallet) {
          data.push(row);  
        } else {
          data.push(emptyRow, row);
        }
      })
    setExcelData(data);
  }, [orderId, orderDate, standardPallets]);

  useEffect(() => {
    if (!hasLeftovers && !hasBuilderProducts) {
      setIsExcelDownloaderVisible(true);
      createExcelData();
    }
  }, [hasLeftovers, hasBuilderProducts, createExcelData])

  async function navigateToBreakdownInput(event) {
    event.preventDefault();
    await deleteOrder(orderId);
    router.replace('./input');
  }

  return (
    <>
      <div className={styles.wrapper}>
        <StandardPalletsTable standardPallets={standardPallets} />
        <div className={styles.drag_and_drop_container}>
          {hasLeftovers ? <LeftoverProductsTable leftoverProducts={leftoverProducts} /> : null}
          <PalletBuilder
            order={order}
            setOrderCallback={handleSetOrderCallback}
            afterStandardPalletsUpdateCallback={handleAfterStandardPalletsUpdate}
          />
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={5000}
            message='Довавихте ново пале!'
            onClose={handleSnackbarClose}
          />
          <div>
            {
              isExcelDownloaderVisible
                ? <>
                  <ExcelFileDownloader fileName={orderId} excelData={excelData}/>
                  <br />
                </>
                : null
            }
            <br />
            <Button
              variant='contained'
              startIcon={<ReplayIcon />}
              onClick={navigateToBreakdownInput}
            >
              Нова разбивка
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
