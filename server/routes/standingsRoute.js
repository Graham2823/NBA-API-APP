const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', async (req, res)=>{
   let western_conference = []
   let wcNumber = 1
   let eastern_conference = []
   let ecNumber = 1
   let wdivisions = []
   let edivisions = []
   let wc_teams = []
   let wcTeams
   let ec_teams = []
    try{
        fetch (`https://api.sportradar.com/nba/trial/v7/en/seasons/2022/REG/standings.json?api_key=${process.env.API_KEY}`)
        .then(res => res.json())
        .then((data)=>{
            for(let i =0; i< data.conferences.length; i++){
                if(data.conferences[i].name === 'WESTERN CONFERENCE'){
                    western_conference.push(data.conferences[i])
                } if(data.conferences[i].name === 'EASTERN CONFERENCE'){
                    eastern_conference.push(data.conferences[i])
                }
            }
            for(let i=0; i< western_conference[0].divisions.length; i++){
                wdivisions.push(western_conference[0].divisions[i])
            }
            for(let i=0; i< eastern_conference[0].divisions.length; i++){
                edivisions.push(eastern_conference[0].divisions[i])
            }
            for(let i=0; i<wdivisions.length; i++){
                wc_teams.push(wdivisions[i].teams)  
            }
            for(let i=0; i<edivisions.length; i++){
                ec_teams.push(edivisions[i].teams);
            }
            // wc_teams.sort((a,b)=> a.calc_rank.conf_rank - b.calc_rank.conf_rank)
            // console.log(wdivisions)
            res.render('standings', {wc_teams, ec_teams})
        })
    } catch(err){
        console.log(err)
    }
})

module.exports = router