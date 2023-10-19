'use client';

import '../../styles/breakdown/PalletBuilder.css';

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

export default function PalletBuilder({ palletNumber, leftoverProducts, standardPallets, onUpdateLeftovers, onUpdateStandardPallets,
  onUpdatePalletNumber, setIsVisibleCallback }) {
  const [products, setProducts] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [dropZoneClassName, setDropZoneClassName] = useState('');
  const hasProducts = products.length > 0;

  function handleOnDrop(event) {
    const rowIndex = event.dataTransfer.getData('rowIndex');
    const { productId, quantity } = leftoverProducts[rowIndex] || {};
    if (!(productId && quantity)) {
      return;
    }
    const leftoversCopy = [...leftoverProducts];
    leftoversCopy.splice(rowIndex, 1);
    const newStandardPallet = {
      palletName: `Пале ${palletNumber}`,
      productId,
      quantity
    }
    onUpdateLeftovers(leftoversCopy);
    setProducts([...products, newStandardPallet]);
    setIsButtonDisabled(false);
    setDropZoneClassName('table_drop-zone');
  }

  function handleAddPallet(event) {
    event.preventDefault();
    const newProducts = products.map(product => {
      const { productId, quantity } = product;
      return {
        palletName: `Пале ${palletNumber}`,
        productId,
        quantity
      }
    })
    onUpdateStandardPallets([...standardPallets, ...newProducts]);
    onUpdatePalletNumber(prev => prev + 1);
    setProducts([]);
    setIsButtonDisabled(true);
    if (leftoverProducts.length === 0) {
      setIsVisibleCallback(false);
    }
  }

  function handleReturnProductClick(event, index) {
    event.preventDefault();
    const productToReturn = products[index];
    products.splice(index, 1);
    onUpdateLeftovers([...leftoverProducts, productToReturn]);
  }

  useEffect(() => {
    if (!hasProducts) {
      setDropZoneClassName('');
      setIsButtonDisabled(true);
    }
  }, [hasProducts])

  return (
    <div className='pallet-builder'>
      <Typography>Създай пале:</Typography>
      <TableContainer
        className={`pallet_drop-zone ${dropZoneClassName}`}
        component={Box}
        onDrop={handleOnDrop}
        onDragOver={e => e.preventDefault()}
        style={{ aspectRatio: dropZoneClassName }}
      >
        {
          hasProducts
            ? (
              <Table size='small'>
                <TableBody>
                  {
                    products.map((product, index) => {
                      const { productId, quantity } = product;
                      return (
                        <TableRow key={productId}>
                          <TableCell align='center'>{productId}</TableCell>
                          <TableCell align='center'>{quantity}</TableCell>
                          <TableCell className='return-product_cell'>
                            <IconButton size='small' onClick={event => handleReturnProductClick(event, index)}>
                              <CloseIcon fontSize='small'/>
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
      <Button
        className='add-pallet_btn'
        variant='contained'
        disabled={isButtonDisabled}
        onClick={handleAddPallet}
      >
        Ново пале
      </Button>
    </div>
  )
}
