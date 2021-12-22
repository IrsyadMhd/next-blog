import { useState, useRef, useContext } from 'react';

import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const [error, setError] = useState(false);
  const emailInputRef = useRef();

  const notifCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    // optional: validate input
    if (!enteredEmail) {
      setError(true);
      return;
    }

    notifCtx.showNotification({
      title: 'Signing up...',
      text: 'Registering newsletter...',
      status: 'pending',
    });

    // send valid data to API
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then(data => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(data => {
        notifCtx.showNotification({
          title: 'Success',
          text: 'Registered successfully',
          status: 'success',
        });

        emailInputRef.current.value = '';
      })
      .catch(error => {
        notifCtx.showNotification({
          title: 'Error',
          text: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type='email'
            id='email'
            placeholder={
              !error ? 'Your email' : 'Please enter the correct email'
            }
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
