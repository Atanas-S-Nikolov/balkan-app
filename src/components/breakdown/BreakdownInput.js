import styles from '@/styles/breakdown/BreakdownInput.module.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CustomDatePicker from '@/components/utils/CustomDatePicker';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createOrder } from '@/services/OrderService';
import { isBlank } from 'underscore.string';

import { PRODUCT_INPUT_ROW_PATTERN } from '@/constants/RegexConstants';
import dayjs from 'dayjs';

export default function BreakdownInput() {
  const router = useRouter();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [orderId, setOrderId] = useState('');
  const [orderIdError, setOrderIdError] = useState(false);
  const [orderIdErrorMessage, setOrderIdErrorMessage] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderDateError, setOrderDateError] = useState(false);
  const [orderDateErrorMessage, setOrderDateErrorMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);
  const [productsErrorMessage, setProductsErrorMessage] = useState('');

  function handleOrderIdChange(event) {
    event.preventDefault();
    const value = event.target.value;
    if (!value || isBlank(value)) {
      setOrderIdErrorMessage('Номерът на поръчката е задължителен');
      setOrderIdError(true);
      return;
    }
    setOrderIdErrorMessage('');
    setOrderIdError(false);
    setOrderId(value);
  }

  function handleOrderDateChange(value) {
    if (!value || isBlank(value)) {
      setOrderDateErrorMessage('Датата е задължителена');
      setOrderDateError(true);
      return;
    }
    setOrderDateErrorMessage('');
    setOrderDateError(false);
    setOrderDate(value);
  }

  function handleProductsChange(event) {
    event.preventDefault();
    const value = event.target.value;
    const rows = value.split('\n');
    const inputProducts = rows.map(row => {
      if (!PRODUCT_INPUT_ROW_PATTERN.test(row)) {
        setProductsErrorMessage('Всеки един ред трябва да бъде във формат: "<Номер на изделие> <бройка>"');
        setProductsError(true);
        return;
      }
      const [productId, quantity] = row.split(/\s+/);
      return { productId, quantity };
    });
    if (!inputProducts.includes(undefined)) {
      setProductsErrorMessage('');
      setProductsError(false);
      setProducts(inputProducts);
    }
  }

  async function navigateToBreakdown(event) {
    event.preventDefault();
    setIsBtnDisabled(true);
    const bodyEl = document.querySelector('body');
    bodyEl.classList.add(styles.loading_cursor);
    await createOrder({
      orderId,
      orderDate: dayjs(orderDate).format('MM/DD/YYYY'),
      inputProducts: products
    });
    bodyEl.classList.remove(styles.loading_cursor);
    router.replace(`./${orderId}`);
  }

  useEffect(() => {
    const anyInputIsBlank = isBlank(orderId) || isBlank(orderDate) || products.length === 0;
    if (!orderIdError && !orderDateError && !productsError && !anyInputIsBlank) {
      setIsBtnDisabled(false);
      return;
    }
    setIsBtnDisabled(true);
  }, [orderDate, orderDateError, orderId, orderIdError, products.length, productsError])

  return (
    <>
      <div className={styles.order_identifiers_section}>
        <TextField
          id='order-id_input'
          label='Номер на поръчка'
          variant='filled'
          error={orderIdError}
          helperText={orderIdErrorMessage}
          onChange={handleOrderIdChange}
          required
        />
        <CustomDatePicker
          onChange={handleOrderDateChange}
          slotProps={{ textField: {
              variant: "filled",
              error: orderDateError,
              helperText: orderDateErrorMessage,
              required: true
            }
          }}
        />
      </div>
      <TextField
        id={styles.breakdown_input}
        label='Изделия'
        variant='filled'
        multiline
        maxRows={30}
        error={productsError}
        helperText={productsErrorMessage}
        onChange={handleProductsChange}
        required
      />
      <Button
        id={styles.breakdown_pallets_btn}
        variant='contained' 
        disabled={isBtnDisabled}
        onClick={navigateToBreakdown}
      >
        Направи разбивка
      </Button>
    </>
  )
}
