const router = require('express').Router();

router.get('/',  (req, res)=>{
    res.render('playerSearch')
})

module.exports = router