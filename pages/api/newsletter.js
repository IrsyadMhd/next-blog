import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email' });
      return;
    }

    const client = await MongoClient.connect(process.env.MONGO_DB);
    const db = client.db();

    await db.collection('newsletter').insertOne({ email });

    client.close();

    res.status(201).json({ message: 'success', email });
  } else {
    res.status(200).json({ message: 'Coba Lagi!' });
  }
};

export default handler;
