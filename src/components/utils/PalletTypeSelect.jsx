'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function PalletTypeSelect(props) {
  const {withoutLabel, ...selectProps} = props;
  const label = withoutLabel ? "" : "Тип на пале";
  return (
    <FormControl>
      {!withoutLabel ? <InputLabel id="pallet-type-select-label">Тип на пале</InputLabel> : null}
      <Select
        className='pallet-type_select'
        labelId="pallet-type-select-label"
        id="pallet-type-select"
        label={label}
        {...selectProps}
      >
        <MenuItem value='euro'>евро</MenuItem>
        <MenuItem value='ikea'>икеа</MenuItem>
      </Select>
    </FormControl>
  )
}
