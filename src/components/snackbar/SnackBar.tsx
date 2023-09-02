import React, { useState, useEffect } from 'react';
import styles from './snackbar.module.css';

type Variant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  message: string;
  variant: Variant;
  open: boolean;
  onClose: () => void;
  style?: React.CSSProperties
}

const variantColors = {
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
};
/**
 * This is a TypeScript React component for a custom snackbar with a message, variant, and onClose
 * function that automatically closes after 2 seconds.
 * @param  - - `message`: the message to be displayed in the snackbar
 * @returns The `CustomSnackbar` component is being returned.
 */

const CustomSnackbar: React.FC<Props> = ({ message, variant, open, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      if (open) {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          onClose();
        }, 2000);
      }
    }, [open, onClose]);
  
    return (
      <div className={`${styles.snackbar} ${isVisible ? styles.open : ''}`} style={{ backgroundColor: variantColors[variant] }}>
        <span className={styles.message}>{message}</span>
        <button className={styles.closeButton} onClick={() => setIsVisible(false)}>
          X
        </button>
      </div>
    );
  };
  
export default CustomSnackbar;