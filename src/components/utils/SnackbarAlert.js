import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { INFO_SEVERITY } from "@/constants/SeverityUtils";

export default function SnackbarAlert(props) {
  const {severity = INFO_SEVERITY, message, ...snackbarProps} = props;
  const { onClose } = snackbarProps;
  return (
    <Snackbar {...snackbarProps}>
      <Alert
        variant="filled"
        severity={severity}
        onClose={onClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
