const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/:gameID/:homeTeam/:awayTeam/:date', async (req, res)=>{
        console.log(req.params)
        let gameID = req.params.gameID
        let homeTeam = req.params.homeTeam
        let awayTeam = req.params.awayTeam
        let date = req.params.date;
        let Data = []
        let idArray = []
        let teamOneArr = []
        let teamTwoArr = []
        for(let i = 1; i < 3; i++){
    try{
        await fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameID}&start_date=${date}&end_date=${date}&page=${i}`)
        .then(res => res.json())
        .then((data)=>{
            for (let i = 0; i< data.data.length; i++) {
            if(!idArray.includes(data.data[i].id)){
                idArray.push(data.data[i].id)
                Data.push(data.data[i])
            }
            }
            const teamOne = Data[0].team.full_name
            for (let i = 0; i< Data.length; i++){
                if(Data[i].team.full_name === teamOne){
                    if(!teamOneArr.includes(Data[i])){
                    teamOneArr.push(Data[i])
                    }
                } else{
                    if(!teamTwoArr.includes(Data[i])){
                    teamTwoArr.push(Data[i])
                    }
                }
            }
        })
    } catch(err){
        console.log(err)
    }
}
    res.render('boxScore', {teamOneArr, teamTwoArr, homeTeam, awayTeam});
})

module.exports = router

