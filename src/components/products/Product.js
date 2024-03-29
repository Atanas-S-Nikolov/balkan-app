import styles from '@/styles/products/Product.module.css';

import { useRouter } from 'next/router';
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

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import ActionButton from '../utils/ActionButton';
import PalletTypeSelect from '../utils/PalletTypeSelect';

import { deleteProduct, updateProduct } from '@/services/ProductConstraintsService';
import { inputValues, selectValues } from '@/constants/PalletTypeSelectConstants';
import { validateProductQuantity } from '@/utils/ValidationUtils';
import SnackbarAlert from '../utils/SnackbarAlert';

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
  const [quantityErrorMessageMessage, setQuantityErrorMessage] = useState("");
  const router = useRouter();

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

  function resetUpdateState() {
    setProductClass('');
    setIsUpdating(false);
    setUpdatedQuantity(quantityPerPallet);
    setUpdatedPalletType(selectValues.get(palletType));
  }

  function resetErrorState() {
    setQuantityErrorMessage("");
  }

  function validateInput() {
    resetErrorState();
    if (!validateProductQuantity(updatedQuantity)) {
      setQuantityErrorMessage("'Брой изделия в пале' е задължителен или неправилен");
      return false;
    }
    return true;
  }

  function handleUpdateBtnClick(event) {
    event.preventDefault();
    setIsUpdating(true);
    setProductClass(styles.product_white_background);
  }

  function handleCancelBtnClick(event) {  
    event.preventDefault();
    resetUpdateState();
    resetErrorState();
  }

  async function handleProductUpdate(event) {
    event.preventDefault();
    const productToUpdate = {
      productId: productId,
      quantityPerPallet: updatedQuantity,
      palletType: inputValues.get(updatedPalletType)
    };
    if (validateInput()) {
      const { message } = await updateProduct(productToUpdate);
      handleSnackbarOpen(message);
      resetUpdateState();
      router.reload();
    }
  }

  async function handleProductDelete(event) {
    event.preventDefault();
    const { message } = await deleteProduct(productId);
    handleSnackbarOpen(message);
    handleDialogClose();
    router.reload();
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
        <section className={styles.product_update_section}>
          <p>Брой изделия в пале:</p>&nbsp;
          <CustomTextField
            value={updatedQuantity}
            error={!!quantityErrorMessageMessage}
            helperText={quantityErrorMessageMessage}
            onChange={handleQuantityChange}
          />
        </section>
        <section className={styles.product_update_section}>
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
      <Card className={`${styles.product} ${productClass}`}>
        {isUpdating ? renderUpdateCardContent() : renderDefaultCardContent()}
        <CardActions className={styles.card_actions}>
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
      <SnackbarAlert
        open={isSnackbarOpen}
        autoHideDuration={5000}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  )
}
