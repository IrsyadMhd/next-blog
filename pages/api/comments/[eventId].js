import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const { email, name, text } = req.body;

  const client = await MongoClient.connect(process.env.MONGO_DB);
  const db = client.db();

  if (req.method === 'POST') {
    const comments = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection('comments').insertOne(comments);
    comments.id = result.insertedId;

    res.status(201).json({ message: 'success...', comments });
  }

  if (req.method === 'GET') {
    const documents = await db
      .collection('comments')
      .find({ eventId })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
};

export default handler;
