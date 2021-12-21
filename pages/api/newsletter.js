import { dbConn, insertDoc } from '../../helpers/db-util';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email' });
      return;
    }

    let client;

    try {
      client = await dbConn();
    } catch (error) {
      res.status(500).json({ message: 'Gagal terhubung ke database!' });
      return;
    }

    try {
      await insertDoc(client, 'newsletter', { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Gagal insert dokumen!' });
      return;
    }

    res.status(201).json({ message: 'success', email });
  }
};

export default handler;
