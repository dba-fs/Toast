import React from 'react';

import Toast from '../Toast';
import { useToasts } from '../ToastProvider';

import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts, dismissToast } = useToasts();

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.map((toast) => (
        <li
          key={toast.id}
          className={styles.toastWrapper}
          aria-atomic="true"
        >
          <Toast
            variant={toast.variant}
            onDismiss={() => dismissToast(toast.id)}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
