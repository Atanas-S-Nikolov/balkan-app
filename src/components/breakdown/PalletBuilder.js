import styles from '@/styles/breakdown/PalletBuilder.module.css';

import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import PalletTypeSelect from '../utils/PalletTypeSelect';
import { inputValues } from '@/constants/PalletTypeSelectConstants';
import { updateOrder } from '@/services/OrderService';

export default function PalletBuilder({ order, setOrderCallback, afterStandardPalletsUpdateCallback }) {
  let { orderId, orderDate, standardPallets, leftoverProducts, builderProducts = [], palletNumber } = order;
  const hasProducts = builderProducts.length > 0;
  const hasLeftovers = leftoverProducts.length > 0;
  const isVisible = hasLeftovers || hasProducts;
  const [isButtonDisabled, setIsButtonDisabled] = useState(!hasProducts);
  const [dropZoneClassName, setDropZoneClassName] = useState('');
  const [palletType, setPalletType] = useState('euro');


  async function handleOnDrop(event) {
    const rowIndex = event.dataTransfer.getData('rowIndex');
    const { productId, quantity } = leftoverProducts[rowIndex] || {};
    if (!(productId && quantity)) {
      return;
    }
    leftoverProducts.splice(rowIndex, 1);
    const newProduct = {
      palletName: `Пале ${palletNumber}`,
      productId,
      quantity
    }
    builderProducts.push(newProduct);
    const respone = await updateOrder({
      orderId,
      orderDate,
      standardPallets,
      leftoverProducts,
      palletNumber,
      builderProducts
    });
    setOrderCallback(respone);
    setIsButtonDisabled(false);
    setDropZoneClassName(styles.table_drop_zone);
  }

  async function handleAddPallet(event) {
    event.preventDefault();
    const newProducts = builderProducts.map(product => {
      const { productId, quantity } = product;
      return {
        palletName: `Пале ${palletNumber}`,
        productId,
        quantity,
        palletType: inputValues.get(palletType)
      }
    })
    standardPallets = [...standardPallets, ...newProducts];
    palletNumber += 1;
    const respone = await updateOrder({
      orderId,
      orderDate,
      standardPallets,
      leftoverProducts,
      palletNumber,
      builderProducts: []
    });
    setOrderCallback(respone);
    setIsButtonDisabled(true);
    afterStandardPalletsUpdateCallback();
  }

  async function handleReturnProductClick(event, index) {
    event.preventDefault();
    const productToReturn = builderProducts[index];
    builderProducts.splice(index, 1);
    leftoverProducts.push(productToReturn);
    const respone = await updateOrder({
      orderId,
      orderDate,
      standardPallets,
      leftoverProducts,
      builderProducts,
      palletNumber
    });
    setOrderCallback(respone);
  }

  function handlePalletTypeChange(event) {
    setPalletType(event.target.value);
  }

  useEffect(() => {
    if (!hasProducts) {
      setDropZoneClassName('');
      setIsButtonDisabled(true);
      return;
    }
    setDropZoneClassName(styles.table_drop_zone);
  }, [hasProducts, order])

  return (
    <>
      {
        isVisible
          ? (
            <div className={styles.pallet_builder}>
              <Typography>Създай пале:</Typography>
              <TableContainer
                className={`${styles.pallet_drop_zone} grid_center ${dropZoneClassName}`}
                component={Box}
                onDrop={handleOnDrop}
                onDragOver={e => e.preventDefault()}
              >
                {
                  hasProducts
                    ? (
                      <Table size='small'>
                        <TableBody>
                          {
                            builderProducts.map((product, index) => {
                              const { productId, quantity } = product;
                              return (
                                <TableRow key={productId}>
                                  <TableCell align='center'>{productId}</TableCell>
                                  <TableCell align='center'>{quantity}</TableCell>
                                  <TableCell className={styles.return_product_cell}>
                                    <IconButton size='small' onClick={event => handleReturnProductClick(event, index)}>
                                      <CloseIcon fontSize='small' />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          }
                        </TableBody>
                      </Table>
                    )
                    : <Typography variant='body2'><i>Постави изделията тук:</i></Typography>
                }
              </TableContainer>
              <div className={styles.actions}>
                <Button
                  className={styles.add_pallet_btn}
                  variant='contained'
                  disabled={isButtonDisabled}
                  onClick={handleAddPallet}
                >
                  Ново пале
                </Button>
                <PalletTypeSelect
                  className={styles.pallet_type_select}
                  disabled={isButtonDisabled}
                  value={palletType}
                  onChange={handlePalletTypeChange}
                />
              </div>
            </div>
          )
          : null
      }
    </>
  )
}
