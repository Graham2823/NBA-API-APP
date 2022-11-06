const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/:gameID', (req, res)=>{
    const gameID = req.params.id;
    console.log(gameID)
    res.render('boxScore')
})

module.exports = router

