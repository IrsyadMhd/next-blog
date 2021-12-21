const handler = (req, res) => {
  const eventId = req.query.eventId;

  const { email, name, text } = req.body;

  if (req.method === 'POST') {
    console.log(email, name, text);
    res.status(201).json({ message: 'success...' });
  }

  if (req.method === 'GET') {
    res.status(200).json([
      { id: 't1', name: 'irsyad', text: 'some comment' },
      { id: 't2', name: 'ahmad', text: 'komen kedua' },
    ]);
  }
};

export default handler;
