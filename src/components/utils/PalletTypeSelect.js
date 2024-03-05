import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function PalletTypeSelect(props) {
  const {withoutLabel, required, error, helperText, ...selectProps} = props;
  const label = withoutLabel ? "" : "Тип на пале";
  return (
    <FormControl required={required} error={error}>
      {!withoutLabel ? <InputLabel id="pallet-type-select-label">Тип на пале</InputLabel> : null}
      <Select
        className='pallet_type_select'
        labelId="pallet-type-select-label"
        id="pallet-type-select"
        label={label}
        {...selectProps}
      >
        <MenuItem value='euro'>евро</MenuItem>
        <MenuItem value='ikea'>икеа</MenuItem>
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
