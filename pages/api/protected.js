export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing');
  }

  const auth = await req.headers.authorization;

  const { token } = JSON.parse(auth);
  console.log(token);
  return token ? res.status(200).send('') : res.status(400).send('Token missing');
};