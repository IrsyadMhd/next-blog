import { useState, useEffect } from 'react';

import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [reqNotif, setReqNotif] = useState();

  useEffect(() => {
    if (reqNotif?.status === 'success' || reqNotif?.status === 'error') {
      const timer = setTimeout(() => {
        setReqNotif(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [reqNotif]);

  const sendMessageHandler = event => {
    event.preventDefault();

    setReqNotif({
      status: 'pending',
      message: 'sending message...',
      title: 'process...',
    });

    fetch('api/contact', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(data => {
          throw new Error(data.message || 'something went wrong!');
        });
      })
      .then(data => {
        setEnteredEmail('');
        setEnteredName('');
        setEnteredMessage('');

        setReqNotif({
          status: 'success',
          message: 'your message has been sent',
          title: 'success',
        });
      })
      .catch(error => {
        setReqNotif({
          status: 'error',
          message: error.message,
          title: 'error',
        });
      });
  };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={event => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={event => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            name='message'
            id='message'
            rows='5'
            required
            value={enteredMessage}
            onChange={event => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {reqNotif && (
        <Notification
          status={reqNotif.status}
          title={reqNotif.title}
          message={reqNotif.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
