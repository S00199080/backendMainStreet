const mongoose = require('mongoose');
const express = require('express');

const { UploadInfo, validate } = require('../models/uploadinfo');

const router = express.Router();

router.post('/', async (req, res) => {

  let result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  let uploadinfo = new UploadInfo(req.body);

  try {

    uploadinfo = await uploadinfo.save();
    res.location(`/${uploadinfo._id}`)
      .status(201)
      .json(uploadinfo);
  }
  catch {
    res.status(500).json(result.error);
  }


});

router.get('/', async (req, res) => {

  try {

    const uploadinfo = await UploadInfo.find();
    res.json(uploadinfo);
  }
  catch {
    res.status(500).json('db error')
  }
})


router.get('/:id', async (req, res) => {

  try {

    const uploadinfo = await UploadInfo.findById(req.params.id);
    if (uploadinfo) {
      res.json(uploadinfo);
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
    const uploadinfo = await UploadInfo.findByIdAndDelete(req.params.id)
    res.send(uploadinfo)
  }
  catch {
    res.status(404).json(`uploadinfo with that ID ${req.params.id} was not found`);
  }

})

router.put('/:id', async (req, res) => {



  const result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  try {

    const uploadinfo = await UploadInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (uploadinfo) {
      res.json(uploadinfo);
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