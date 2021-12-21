import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const { email, name, text } = req.body;

  if (req.method === 'POST') {
    const comments = {
      email,
      name,
      text,
      eventId,
    };

    const client = await MongoClient.connect(process.env.MONGO_DB);
    const db = client.db();

    const result = await db.collection('comments').insertOne(comments);
    comments.id = result.insertedId;

    res.status(201).json({ message: 'success...', comments });
  }

  if (req.method === 'GET') {
    res.status(200).json([
      { id: 'c1', name: 'irsyad', text: 'the first comment' },
      { id: 'c2', name: 'ahmad', text: 'the second comment' },
    ]);
  }
};

export default handler;
