import { useState } from 'react';
import CustomSnackbar from '../components/snackbar/SnackBar';

type Variant = 'success' | 'warning' | 'error' | 'info';


interface UseSnackbarReturn {
  showSnackbar: (message: string, variant?: Variant) => void;
  snackbar: JSX.Element;
}

/**
 * A custom hook that provides a function to show a snackbar
 * with a message and a variant (optional).
 * @returns An object containing the `showSnackbar` function.
 */
export const useSnackbar = (): UseSnackbarReturn => {
  const [message, setMessage] = useState<string>('');
  const [variant, setVariant] = useState<Variant>('info');
  const [open, setOpen] = useState<boolean>(false);

  const showSnackbar = (message: string, variant: Variant = 'info') => {
    setMessage(message);
    setVariant(variant);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const snackbar = <CustomSnackbar message={message} variant={variant} open={open} onClose={handleClose}  />;

  return {
    showSnackbar,
    snackbar,
  };
};