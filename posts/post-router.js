const express = require('express');
const dbconfig = require('../data/db-config')
// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {        
        const posts = await db('posts').toSQL().toNative();
        console.log(posts)
    }
    catch (err) {
        res.status(500).json({message: err})
    }
    
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const post = await db('posts').where('id', '=' , id);
    res.status(200).json(post);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
});

router.post('/', async (req, res) => {
    const postData = req.body;
    try {
        const post = await db('posts').insert(postData);
        res.status(201).json(post);
    }
    catch (err) {
        res.status(500).status({message: "Could not add your post"});
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params.id;
    const changes = req.body;

    try {
        const count = await db('posts').where('id', '=', id).update(changes);
    }
    catch (err) {

    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params.id;
    try {
        const count = await db('posts').where({id}).del();

        if (count) {
            res.status(200).json({deleted: count});
        } else {
            res.status(404).json({message: 'could not find id'});
        }
    }

    catch (err) {
        res.status(500).json({message: ''})
    }
});

module.exports = router;