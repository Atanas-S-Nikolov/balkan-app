import styles from '@/styles/utils/CreateProductForm.module.css';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMediaQuery } from '@react-hookz/web';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import ActionButton from './ActionButton';
import PalletTypeSelect from './PalletTypeSelect';

import { createProduct } from '@/services/ProductConstraintsService';
import { inputValues } from '@/constants/PalletTypeSelectConstants';

const CustomTextField = (props) => (<TextField variant='filled' {...props}/>);

export default function CreateProductForm() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const isMobile = useMediaQuery('(max-width: 700px)', false);
  const [product, setProduct] = useState({
    productId: '',
    quantityPerPallet: '',
    palletType: ''
  });
  const { productId, quantityPerPallet, palletType } = product;

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

  function handleCreateButtonClick(event) {
    event.preventDefault();
    handleDialogOpen();
  }

  function handleProductIdChange(event) {
    const productCopy = {...product, productId: event.target.value};
    setProduct(productCopy);
  }

  function handleQuantityPerPalletChange(event) {
    const productCopy = {...product, quantityPerPallet: event.target.value};
    setProduct(productCopy);
  }

  function handleSelectChange(event) {
    const productCopy = {...product, palletType: event.target.value};
    setProduct(productCopy);
  }

  async function handleCreateProduct(event) {
    event.preventDefault();
    const product = {
      productId: productId,
      quantityPerPallet: quantityPerPallet,
      palletType: inputValues.get(palletType)
    };
    const { message } = await createProduct(product);
    handleSnackbarOpen(message);
    handleDialogClose();
    router.reload();
  }

  return (
    <>
      <Button className={styles.create_button} variant='contained' onClick={handleCreateButtonClick}>
        Ново изделие
      </Button>
      <Snackbar
        open={isSnackbarOpen}
        message={snackbarMessage}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      />
      <Dialog open={isDialogOpen} fullScreen={isMobile} maxWidth='fit-content' onClose={handleDialogClose}>
        <DialogTitle>Създаване на ново изделие</DialogTitle>
        <DialogContent className={styles.dialog_content}>
          <CustomTextField value={productId} label='Номер на изделие' onChange={handleProductIdChange}/>
          <CustomTextField value={quantityPerPallet} label='Брой изделия в пале' onChange={handleQuantityPerPalletChange}/>
          <PalletTypeSelect className={styles.pallet_type_select} value={palletType} variant='filled' onChange={handleSelectChange}/>
        </DialogContent>
        <DialogActions className={styles.dialog_actions}>
          <ActionButton startIcon={<CloseIcon/>} onClick={handleDialogClose}>
            Отказ
          </ActionButton>
          <ActionButton startIcon={<AddIcon/>} color='success' onClick={handleCreateProduct}>
            Създай
          </ActionButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
