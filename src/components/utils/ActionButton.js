import Button from '@mui/material/Button';
import { useState } from 'react';

export default function ActionButton(props) {
  const [btnVariant, setBtnVariant] = useState('outlined');

  function handleBtnMouseOver() {
    setBtnVariant('contained');
  }

  function handleBtnMouseOut() {
    setBtnVariant('outlined');
  }

  return (
    <Button
      variant={btnVariant}
      onMouseOver={handleBtnMouseOver}
      onMouseOut={handleBtnMouseOut}
      {...props}
    >
      {props.children}
    </Button>
  )
}
