import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'invalid input' });
      return;
    }

    const newMessage = {
      name,
      email,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(
        'mongodb+srv://dbird:2t7FQs-auK4EM65@cluster0.sn1xx.mongodb.net/my-site?retryWrites=true&w=majority'
      );
    } catch (error) {
      res.status(500).json({ message: 'Failed connected to database' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('message').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: 'Failed insert message!' });
      client.close();
      return;
    }

    client.close();

    res.status(201).json({ message: 'success', newMessage });
  }
};

export default handler;
