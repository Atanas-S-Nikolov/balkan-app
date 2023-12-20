import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  fontWeight: theme.typography.fontWeightBold
}));

export default function StyledTableCell(props) {
  return (
    <CustomTableCell {...props}>{props.children}</CustomTableCell>
  )
}
