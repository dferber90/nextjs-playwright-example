// Not actually used during tests as the requests to this route are mocked
export default (req, res) => {
  res.status(200).json({
    title: 'The Intelligent Investor',
    imageUrl: '/the-intelligent-investor.jpg',
    description:
      'The Intelligent Investor by Benjamin Graham, first published in 1949, is a widely acclaimed book on value investing.',
  })
}
