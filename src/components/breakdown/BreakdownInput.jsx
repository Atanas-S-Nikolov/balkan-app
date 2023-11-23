'use client';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCT_INPUT_ROW_PATTERN } from '@/constants/RegexConstants';
import { createInputProducts } from '@/app/services/InputProductsService';

export default function BreakdownInput() {
  const router = useRouter();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState([]);

  function handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    const rows = value.split('\n');
    setIsBtnDisabled(true);
    const inputProducts = rows.map(row => {
      if (!PRODUCT_INPUT_ROW_PATTERN.test(row)) {
        setErrorMessage('Всеки един ред трябва да бъде във формат: "<Номер на изделие> <бройка>"');
        setError(true);
        return;
      }
      const [productId, quantity] = row.split(/\s+/);
      return { productId, quantity };
    });
    if (!inputProducts.includes(undefined)) {
      setErrorMessage('');
      setError(false);
      setProducts(inputProducts);
      setIsBtnDisabled(false);
    }
  }

  async function navigateToBreakdown(event) {
    event.preventDefault();
    await createInputProducts(products);
    router.replace('./');
  }

  return (
    <>
      <TextField
        id='breakdown-input'
        label='Изделия'
        variant='filled'
        multiline
        maxRows={30}
        error={error}
        helperText={errorMessage}
        onChange={handleChange}
      />
      <Button
        id='breakdown-pallets_btn'
        variant='contained' 
        disabled={isBtnDisabled}
        onClick={navigateToBreakdown}
      >
        Направи разбивка
      </Button>
    </>
  )
}
