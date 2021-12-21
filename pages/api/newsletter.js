const handler = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    res.status(201).json({ message: 'success', email: email });
  } else {
    res.status(200).json({ message: 'Coba Lagi!' });
  }
};

export default handler;
