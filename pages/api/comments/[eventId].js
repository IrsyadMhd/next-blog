import { dbConn, insertDoc, getDocuments } from '../../../helpers/db-util';

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await dbConn();
  } catch (error) {
    res.status(500).json({ message: 'Gagal terhubung ke database!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const comments = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDoc(client, 'comments', comments);
      comments._id = result.insertedId;

      res.status(201).json({ message: 'success...', comments });
    } catch (error) {
      res.status(500).json({ message: 'Gagal insert data!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getDocuments(
        client,
        'comments',
        { eventId },
        { _id: -1 }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Gagal fetching data!' });
    }
  }

  client.close();
};

export default handler;
