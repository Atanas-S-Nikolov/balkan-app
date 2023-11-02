'use client';

import '@/styles/utils/CreateProductForm.css';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { useMediaQuery } from '@react-hookz/web';
import ActionButton from './ActionButton';

const CustomTextField = (props) => (<TextField variant='filled' {...props}/>);

export default function CreateProductForm({ request }) {
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

  function handleSelectChange(event) {
    const productCopy = {...product, palletType: event.target.value};
    setProduct(productCopy);
  }

  return (
    <>
      <Button className='create-button' variant='contained' onClick={handleCreateButtonClick}>
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
        <DialogContent className='dialog-content'>
          <CustomTextField value={productId} label='Номер на изделие'/>
          <CustomTextField value={quantityPerPallet} label='Брой изделия в пале'/>
          <FormControl>
            <InputLabel id="pallet-type-select-label">Тип на пале</InputLabel>
            <Select
              className='pallet-type_select'
              labelId="pallet-type-select-label"
              id="pallet-type-select"
              label="Тип на пале"
              variant='filled'
              value={palletType}
              onChange={handleSelectChange}
            >
              <MenuItem value='euro'>евро</MenuItem>
              <MenuItem value='ikea'>икеа</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className='dialog-actions'>
          <ActionButton startIcon={<CloseIcon/>} onClick={handleDialogClose}>
            Отказ
          </ActionButton>
          <ActionButton startIcon={<AddIcon/>} color='success' onClick={handleDialogClose}>
            Създай
          </ActionButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
