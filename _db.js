let games = [
  { id: '6', title: 'Cyber Nexus', platform: ['PS5', 'Xbox', 'PC'] },
  { id: '7', title: 'Galactic Adventure', platform: ['Switch'] },
  { id: '8', title: 'Mystic Chronicles', platform: ['PS5', 'Xbox'] },
  { id: '9', title: 'Space Odyssey', platform: ['PC'] },
  { id: '10', title: 'Dragon Quest IX', platform: ['Switch', 'PS5'] },
]

let authors = [
  { id: '4', name: 'luigi', verified: true },
  { id: '5', name: 'toad', verified: false },
  { id: '6', name: 'bowser', verified: true },
]

let reviews = [
  {
    id: '8',
    rating: 8,
    content: 'Lorem ipsum dolor sit amet.',
    author_id: '4',
    game_id: '6',
  },
  {
    id: '9',
    rating: 9,
    content: 'Consectetur adipiscing elit.',
    author_id: '5',
    game_id: '7',
  },
  {
    id: '10',
    rating: 6,
    content:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author_id: '6',
    game_id: '8',
  },
  {
    id: '11',
    rating: 7,
    content: 'Ut enim ad minim veniam.',
    author_id: '4',
    game_id: '9',
  },
  {
    id: '12',
    rating: 9,
    content:
      'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author_id: '5',
    game_id: '10',
  },
]

export default { games, authors, reviews }
