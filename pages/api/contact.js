const handler = (req, res) => {
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
    console.log(newMessage);

    res.status(201).json({ message: 'success', newMessage });
  }
};

export default handler;
