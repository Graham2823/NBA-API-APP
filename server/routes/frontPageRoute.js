const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', async (req, res)=>{
    let date = new Date();
    let todaysDate =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    try{
        await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2022&start_date=${todaysDate}&end_date=${todaysDate}`)
            .then(res=>res.json())
            .then((tscores)=>{
                let yesterdaysDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()-1);
                fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2022&start_date=${yesterdaysDate}&end_date=${yesterdaysDate}`)
                .then(res=>res.json())
                .then((yscores)=>{
                    res.render('frontPage', {tscores, yscores});
                })
            })
    } catch(err){
        console.log(err)
    }
})

router.put('/', async (req, res)=>{
    const playerName = req.body.firstName + "_" + req.body.lastName
    if (playerName != 'undefined_undefined'){
    try{
        await fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
        .then(res => res.json())
        .then((data)=>{
            const playerID = data.data[0].id
            fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerID}`)
            .then(res => res.json())
            .then((stats)=>{
               fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=2022&player_ids[]=${playerID}&postseason=false`)
               .then(res => res.json())
               .then((gamelog)=>{
                fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${req.body.firstName}%20${req.body.lastName}`)
                .then(res => res.json())
                .then((details)=>{
                    res.render('playerPage', {stats, data, gamelog, details});
                })
              
               })
            })
            
        })
    } catch(err){
        console.log(err);
    }
    }
})

module.exports = router
