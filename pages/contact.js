import { Fragment } from 'react';
import Head from 'next/head';

import ContactForm from '../components/contact/contact-form';

const ContactPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="send me your message" />
      </Head>
      <ContactForm />
    </Fragment>
  );
};

export default ContactPage;
