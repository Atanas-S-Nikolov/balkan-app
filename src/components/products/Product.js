'use client';

import '@/styles/products/Product.css';

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

import { useState } from 'react';
import ActionButton from '../utils/ActionButton';

const CustomTextField = (props) => (<TextField size='small' {...props} />);

export default function Product({ product }) {
  const { productId, quantityPerPallet, palletType } = product;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [productClass, setProductClass] = useState(''); 

  function handleDialogOpen() {
    setIsDialogOpen(true);
  };

  function handleDialogClose() {
    setIsDialogOpen(false);
  };

  function handleUpdateBtnClick() {
    setIsUpdating(true);
    setProductClass('product_white-background');
  }

  function handleCancelBtnClick() {
    setProductClass('');
    setIsUpdating(false);
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
          <CustomTextField value={quantityPerPallet} />
        </section>
        <section className='product-update_section'>
          <p>Тип на пале:</p>&nbsp;
          <CustomTextField value={palletType} />
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
          onClick={handleDialogOpen}
          color='error'
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
          <Button onClick={handleDialogClose} color='error'>Да, изтрий изделието</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
