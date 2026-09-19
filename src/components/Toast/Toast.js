import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

export const VARIANT_OPTIONS = Object.keys(ICONS_BY_VARIANT);

function Toast({ variant, onDismiss, children }) {
  const Icon = ICONS_BY_VARIANT[variant];

  if (!Icon) {
    throw new Error(`Unrecognized Toast variant: ${variant}`);
  }

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} aria-hidden="true" />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} -</VisuallyHidden> {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={onDismiss}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} aria-hidden="true" />
      </button>
    </div>
  );
}

export default Toast;
