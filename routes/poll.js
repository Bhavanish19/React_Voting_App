const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

const keys = require('../config/keys');

const pusher = new Pusher({
  appId: "1173846",
  key: "3160f88015ada2e74050",
  secret: "cf798ded93cb5437948c",
  cluster: "ap2",
  useTLS: true
});

router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  };

  new Vote(newVote).save().then(vote => {
    pusher.trigger("os-poll", "os-vote", {
      points = 1,
      os: req.body.os
    });
  });

    return res.json({ success: true, message: 'Thank you for voting' });
  });

module.exports = router;

