'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function PalletTypeSelect(props) {
  return (
    <FormControl>
      <InputLabel id="pallet-type-select-label">Тип на пале</InputLabel>
      <Select
        className='pallet-type_select'
        labelId="pallet-type-select-label"
        id="pallet-type-select"
        label="Тип на пале"
        variant='filled'
        {...props}
      >
        <MenuItem value='euro'>евро</MenuItem>
        <MenuItem value='ikea'>икеа</MenuItem>
      </Select>
    </FormControl>
  )
}
