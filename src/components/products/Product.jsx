'use client';

import '@/styles/products/Product.css';

import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import ActionButton from '../utils/ActionButton';
import PalletTypeSelect from '../utils/PalletTypeSelect';

import { deleteProduct, updateProduct } from '@/app/services/ProductConstraintsService';
import { inputValues, selectValues } from '@/constants/PalletTypeSelectConstants';

const CustomTextField = (props) => (<TextField size='small' {...props} />);

export default function Product({ product }) {
  const { productId, quantityPerPallet, palletType } = product;
  const [updatedQuantity, setUpdatedQuantity] = useState(quantityPerPallet);
  const [updatedPalletType, setUpdatedPalletType] = useState(selectValues.get(palletType));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [productClass, setProductClass] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  function handleDialogOpen() {
    setIsDialogOpen(true);
  };

  function handleDialogClose() {
    setIsDialogOpen(false);
  };

  function handleSnackbarOpen(message) {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  }

  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
    setSnackbarMessage('');
  }

  function handleQuantityChange(event) {
    setUpdatedQuantity(event.target.value);
  }

  function handlePalletTypeChange(event) {
    setUpdatedPalletType(event.target.value);
  }

  function handleCancel() {
    setProductClass('');
    setIsUpdating(false);
  }

  function handleUpdateBtnClick(event) {
    event.preventDefault();
    setIsUpdating(true);
    setProductClass('product_white-background');
  }

  function handleCancelBtnClick(event) {
    event.preventDefault();
    handleCancel();
  }

  async function handleProductUpdate(event) {
    event.preventDefault();
    const productToUpdate = {
      productId: productId,
      quantityPerPallet: updatedQuantity,
      palletType: inputValues.get(updatedPalletType)
    };
    const { message } = await updateProduct(productToUpdate);
    handleSnackbarOpen(message);
    handleCancel();
  }

  async function handleProductDelete(event) {
    event.preventDefault();
    const { message } = await deleteProduct(productId);
    handleSnackbarOpen(message);
    handleDialogClose();
  }

  function renderDefaultCardContent() {
    return (
      <CardContent>
        <p>Номер на изделие: <b>{productId}</b></p>
        <p>Брой изделия в пале: <b>{quantityPerPallet}</b></p>
        <p>Тип на пале: <b>{palletType}</b></p>
      </CardContent>
    );
  }

  function renderUpdateCardContent() {
    return (
      <CardContent>
        <p>Номер на изделие: <b>{productId}</b></p>
        <section className='product-update_section'>
          <p>Брой изделия в пале:</p>&nbsp;
          <CustomTextField value={updatedQuantity} onChange={handleQuantityChange}/>
        </section>
        <section className='product-update_section'>
          <p>Тип на пале:</p>&nbsp;
          <PalletTypeSelect value={updatedPalletType} onChange={handlePalletTypeChange} withoutLabel/>
        </section>
      </CardContent>
    );
  }

  function renderDefaultCardActions() {
    return (
      <>
        <ActionButton
          startIcon={<EditIcon />}
          onClick={handleUpdateBtnClick}
        >
          Промени
        </ActionButton>
        <ActionButton
          startIcon={<DeleteIcon />}
          color='error'
          onClick={handleDialogOpen}
        >
          Изтрий
        </ActionButton>
      </>
    );
  }

  function renderUpdateCardActions() {
    return (
      <>
        <ActionButton
          startIcon={<CloseIcon />}
          onClick={handleCancelBtnClick}
        >
          Отказ
        </ActionButton>
        <ActionButton
          startIcon={<CheckIcon />}
          color='success'
          onClick={handleProductUpdate}
        >
          Запази
        </ActionButton>
      </>
    );
  }

  return (
    <>
      <Card className={`product ${productClass}`}>
        {isUpdating ? renderUpdateCardContent() : renderDefaultCardContent()}
        <CardActions className='card-actions'>
          {isUpdating ? renderUpdateCardActions() : renderDefaultCardActions()}
        </CardActions>
      </Card>
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>
          Наистина ли искате да изтриете изделието?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Изтриването на изделието ще го премахне завинаги.
            Ако искате да използвате изделието отново, ще трябва да създадете ново.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Не, запази изделието</Button>
          <Button onClick={handleProductDelete} color='error'>Да, изтрий изделието</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  )
}
