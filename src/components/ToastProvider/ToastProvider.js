import React from 'react';

import useKeydown from '../../hooks/use-keydown';

const ToastContext = React.createContext(null);

let fallbackId = 0;

// crypto.randomUUID is secure-context only, so it's undefined when the
// dev server is reached over plain http on a LAN IP (phone testing).
function generateToastId() {
  return crypto.randomUUID?.() ?? `toast-${fallbackId++}`;
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function createToast(message, variant) {
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: generateToastId(), message, variant },
    ]);
  }

  function dismissToast(id) {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }

  // NOTE: memoised on purpose — useKeydown tears down and re-attaches its
  // window listener whenever the callback identity changes.
  const dismissAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', dismissAllToasts);

  return (
    <ToastContext.Provider
      value={{ toasts, createToast, dismissToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const value = React.useContext(ToastContext);

  if (value === null) {
    throw new Error('useToasts must be used within a ToastProvider');
  }

  return value;
}

export default ToastProvider;
