import React from 'react';

import styles from './VisuallyHidden.module.css';

function VisuallyHidden({ children, className, ...delegated }) {
  const [forceShow, setForceShow] = React.useState(false);

  // NOTE: dev-only affordance — holding Alt reveals hidden text so you can
  // check what a screen reader would announce.
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === 'Alt') {
        setForceShow(true);
      }
    }

    function handleKeyUp(event) {
      if (event.key === 'Alt') {
        setForceShow(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const wrapperClass = forceShow
    ? styles.showWrapper
    : styles.wrapper;

  return (
    <span
      className={
        className ? `${className} ${wrapperClass}` : wrapperClass
      }
      {...delegated}
    >
      {children}
    </span>
  );
}

export default VisuallyHidden;
