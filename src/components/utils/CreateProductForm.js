import styles from '@/styles/utils/CreateProductForm.module.css';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMediaQuery } from '@react-hookz/web';

import Button from '@mui/material/Button';
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
import { validateProductId, validateProductQuantity, validatePalletType } from '@/utils/ValidationUtils';
import { ERROR_SEVERITY, INFO_SEVERITY } from '@/constants/SeverityUtils';
import SnackbarAlert from './SnackbarAlert';

const DEFAULT_PRODUCT = {
  productId: '',
  quantityPerPallet: '',
  palletType: ''
};
const CustomTextField = (props) => (<TextField variant='filled' {...props}/>);

export default function CreateProductForm() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(INFO_SEVERITY);
  const [productIdErrorMessage, setProductIdErrorMessage] = useState("");
  const [quantityErrorMessageMessage, setQuantityErrorMessage] = useState("");
  const [palletTypeErrorMessageMessage, setPalletTypeErrorMessage] = useState("");
  const isMobile = useMediaQuery('(max-width: 700px)', false);
  const [product, setProduct] = useState(DEFAULT_PRODUCT);
  const { productId, quantityPerPallet, palletType } = product;

  function resetErrorState() {
    setProductIdErrorMessage("");
    setQuantityErrorMessage("");
    setPalletTypeErrorMessage("");
  }

  function handleDialogOpen() {
    setIsDialogOpen(true);
  };

  function handleDialogClose() {
    setIsDialogOpen(false);
    resetErrorState();
    setProduct(DEFAULT_PRODUCT);
  };

  function handleSnackbarOpen(message, severity) {
    setSnackbarMessage(message);
    setAlertSeverity(severity);
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

  function validateInput() {
    resetErrorState();

    const isProductIdValid = validateProductId(productId);
    const isQuantityValid = validateProductQuantity(quantityPerPallet);
    const isPalletTypeValid = validatePalletType(palletType);
    let hasErrors;

    if (!isProductIdValid || !isQuantityValid || !isPalletTypeValid) {
      hasErrors = true;

      if (!isProductIdValid) {
        setProductIdErrorMessage("'Номер на изделие' е задължителен или неправилен");
      }

      if (!isQuantityValid) {
        setQuantityErrorMessage("'Брой изделия в пале' е задължителен или неправилен");
      }

      if (!isPalletTypeValid) {
        setPalletTypeErrorMessage("'Тип пале' е задължителен");
      }
    }
    
    return !hasErrors;
  }

  async function handleCreateProduct(event) {
    event.preventDefault();
    const product = {
      productId: productId.trim(),
      quantityPerPallet: quantityPerPallet.trim(),
      palletType: inputValues.get(palletType)
    };
    if (validateInput()) {
      const { message, errorMessage } = await createProduct(product);
      if (errorMessage) {
        handleSnackbarOpen(errorMessage, ERROR_SEVERITY);
        return;
      }
      handleSnackbarOpen(message, INFO_SEVERITY);
      handleDialogClose();
      router.reload();
    }
  }

  return (
    <>
      <Button className={styles.create_button} variant='contained' onClick={handleCreateButtonClick}>
        Ново изделие
      </Button>
      <SnackbarAlert
        open={isSnackbarOpen}
        message={snackbarMessage}
        severity={alertSeverity}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      />
      <Dialog open={isDialogOpen} fullScreen={isMobile} maxWidth='fit-content' onClose={handleDialogClose}>
        <DialogTitle>Създаване на ново изделие</DialogTitle>
        <DialogContent className={styles.dialog_content}>
          <CustomTextField
            value={productId}
            label='Номер на изделие'
            required
            error={!!productIdErrorMessage}
            helperText={productIdErrorMessage}
            onChange={handleProductIdChange}
          />
          <CustomTextField
            value={quantityPerPallet}
            label='Брой изделия в пале'
            required
            error={!!quantityErrorMessageMessage}
            helperText={quantityErrorMessageMessage}
            onChange={handleQuantityPerPalletChange}
          />
          <PalletTypeSelect
            className={styles.pallet_type_select}
            value={palletType}
            variant='filled'
            required
            error={!!palletTypeErrorMessageMessage}
            helperText={palletTypeErrorMessageMessage}
            onChange={handleSelectChange}
          />
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
