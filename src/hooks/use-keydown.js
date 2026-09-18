import React from 'react';

function useKeydown(code, callback) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === code) {
        callback(event);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [code, callback]);
}

export default useKeydown;
