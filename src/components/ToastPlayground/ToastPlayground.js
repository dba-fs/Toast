import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';
import { VARIANT_OPTIONS } from '../Toast';
import { useToasts } from '../ToastProvider';

import styles from './ToastPlayground.module.css';

const DEFAULT_VARIANT = VARIANT_OPTIONS[0];

function ToastPlayground() {
  const { createToast } = useToasts();

  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(DEFAULT_VARIANT);

  function handleSubmit(event) {
    event.preventDefault();

    createToast(message, variant);

    setMessage('');
    setVariant(DEFAULT_VARIANT);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <picture>
          <source srcSet="/toast.avif" type="image/avif" />
          <img
            alt="Cute toast mascot"
            src="/toast.png"
            width={749}
            height={1006}
          />
        </picture>
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form
        className={styles.controlsWrapper}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={`${styles.label} ${styles.messageLabel}`}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;

              return (
                <label key={option} htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={() => setVariant(option)}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
