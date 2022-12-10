const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/:firstName/:lastName', async (req, res) =>{
    let firstName = req.params.firstName;
    let lastName = req.params.lastName;
    const playerName = firstName + "_" + lastName
    console.log(playerName)
    if (playerName != '_'){
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
                fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${firstName}%20${lastName}`)
                .then(res => res.json())
                .then((details)=>{
                    gamelog.data.sort((a,b)=> Date.parse(a.game.date) - Date.parse(b.game.date) )
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