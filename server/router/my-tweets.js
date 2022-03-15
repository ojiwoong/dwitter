app.get('/tweets/:id', (req, res) => {
  const searchId = Number(req.params.id);
  let searchedTweet = {};

  tweets.forEach((tweet, idx) => {
    if (tweet.id === searchId) {
      console.log(tweet);
      searchedTweet = tweet;
      return false;
    }
  });

  if (Object.keys(searchedTweet).length !== 0 || searchedTweet === undefined) {
    res.status(200).send(searchedTweet);
  } else {
    res.sendStatus(204);
  }
});

app.post('/tweets', (req, res) => {
  const tweet = req.body;
  tweet.id = tweets.length;

  tweets.push(tweet);

  res.status(201).send(tweet);
});

app.put('/tweets/:id', (req, res) => {
  const searchId = Number(req.params.id);
  let text = req.body.text;
  let updatedTweet = {};
  let updateYn = false;

  tweets.forEach((tweet, idx) => {
    if (tweet.id === searchId) {
      tweet.text = text;
      updatedTweet = tweet;
      updateYn = true;
      return false;
    }
  });

  if (updateYn) {
    res.status(200).send(updatedTweet);
  } else {
    res.sendStatus(204);
  }
});

app.delete('/tweets/:id', (req, res) => {
  const searchId = Number(req.params.id);
  let deleteIdx = -1;

  tweets.forEach((tweet, idx) => {
    if (tweet.id === searchId) {
      deleteIdx = idx;
      return false;
    }
  });

  if (deleteIdx !== -1) {
    delete tweets.splice(deleteIdx, 1);
    res.status(200).send(`${deleteIdx}번 트윗 삭제 완료`);
  } else {
    res.sendStatus(204);
  }
});
