import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const useClickTracking = () => {
  const ref = useRef(null);

  const postInteraction = async payload => {
    try {
      console.log('payload', payload);
      const response = await axios.post('/interaction', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        console.log('Interaction recorded successfully.');
      } else if (response.status === 422) {
        console.log('Invalid parameters.');
      } else {
        console.log('Error recording interaction.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClick = useCallback(
    event => {
      if (ref.current && ref.current.contains(event.target)) {
        const element = event.target.tagName;
        const widget = event.target.closest('[data-widget]').dataset.widget;
        const time = new Date().toISOString();

        postInteraction({ element, widget, time });
      }
    },
    [ref]
  );

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('click', handleClick);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('click', handleClick);
      }
    };
  }, [handleClick]);

  return ref;
};

export default useClickTracking;
