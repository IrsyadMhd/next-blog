import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    console.log(email);

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email' });
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGO}:${process.env.MONGO_PASS}@cluster0.sn1xx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    const db = client.db();

    await db.collection('newsletter').insertOne({ email });

    client.close();

    res.status(201).json({ message: 'success', email });
  } else {
    res.status(200).json({ message: 'Coba Lagi!' });
  }
};

export default handler;
