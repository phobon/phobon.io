const target = 'chicken';
const invalid = 'Password is invalid!';

// Very simple password check here.
export default async (req, res) => {
  const { pass } = await req.body;

  return pass === target
    ? res.status(200).json({ token: true })
    : res.status(400).json({ invalid });
};