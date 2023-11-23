import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function Row({ item }) {
  const { palletName, productId, quantity, palletType } = item;
  const PalletCell = ({ children }) => <TableCell className='pallet-cell'>{children}</TableCell>;
  return (
    <TableRow>
      <PalletCell>{palletName}</PalletCell>
      <PalletCell>{productId}</PalletCell>
      <PalletCell>{quantity}</PalletCell>
      <PalletCell>{palletType}</PalletCell>
    </TableRow>
  );
}
