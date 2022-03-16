let tweets = [
  {
    id: '1',
    text: 'dwitter project',
    name: 'Jiwoong',
    username: 'jiwoong',
    createdAt: new Date(),
    url: 'https://media.vlpt.us/images/potter/post/76303932-4916-4c24-9252-7e530a57bf0c/1_XP-mZOrIqX7OsFInN2ngRQ.png',
  },
  {
    id: '2',
    text: 'Hi, my name is Bob',
    name: 'Bob',
    username: 'bob',
    createdAt: new Date(),
    url: 'https://media.vlpt.us/images/potter/post/76303932-4916-4c24-9252-7e530a57bf0c/1_XP-mZOrIqX7OsFInN2ngRQ.png',
  },
];

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter(tweet => tweet.username === username);
}

export async function getAllById(id) {
  return tweets.find(tweet => tweet.id === id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };

  tweets = [tweet, ...tweets];

  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find(tweet => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }

  return tweet;
}

export async function remove(id) {
  const tweet = tweets.filter(tweet => tweet.id !== id);
}
