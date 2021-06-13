// Not actually used during tests as the requests to this route are mocked
export default (req, res) => {
  res.status(200).json([
    {
      id: '10333292-7ca1-4361-bf38-b6b43b90cb11',
      author: 'Mellenn Domanais',
      text:
        'Great read. Definitely earned its title of being the "bible of investing".',
    },
  ])
}
