const handler = (req, res) => {
  const eventId = req.query.eventId;

  const { email, name, text } = req.body;

  if (req.method === 'POST') {
    console.log(email, name, text);
    res.status(201).json({ message: 'success...' });
  }

  if (req.method === 'GET') {
    res.status(200).json([
      { id: 'c1', name: 'irsyad', text: 'the first comment' },
      { id: 'c2', name: 'ahmad', text: 'the second comment' },
    ]);
  }
};

export default handler;
