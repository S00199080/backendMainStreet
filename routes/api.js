const mongoose = require('mongoose');
const express = require('express');

const { UserInfo, validate } = require('../models/api');

const router = express.Router();

router.post('/', async (req, res) => {

  let result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  let userinfo = new UserInfo(req.body);

  try {

    userinfo = await userinfo.save();
    res.location(`/${userinfo._id}`)
      .status(201)
      .json(userinfo);
  }
  catch {
    res.status(500).json(result.error);
  }


});

router.get('/', async (req, res) => {

  try {

    const userinfo = await UserInfo.find();
    res.json(userinfo);
  }
  catch {
    res.status(500).json('db error')
  }
})


router.get('/:id', async (req, res) => {

  try {

    const userinfo = await UserInfo.findById(req.params.id);
    if (userinfo) {
      res.json(userinfo);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch {
    res.status(404).json('Not found: id is odd');
  }

})


router.delete('/:id', async (req, res) => {

  try {
    const userinfo = await UserInfo.findByIdAndDelete(req.params.id)
    res.send(userinfo)
  }
  catch {
    res.status(404).json(`userinfo with that ID ${req.params.id} was not found`);
  }

})

router.put('/:id', async (req, res) => {



  const result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  try {

    const userinfo = await UserInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (userinfo) {
      res.json(userinfo);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch {
    res.status(404).json('Not found: id is weird');
  }

})





module.exports = router;