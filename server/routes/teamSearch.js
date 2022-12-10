const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', async (req, res)=>{
    try{
        await fetch(`https://www.balldontlie.io/api/v1/teams`)
        .then(res => res.json())
        .then((teams)=>{
            res.render('teamSearch', {teams})
        })
    }catch(err){

    }
})



router.put('/', async(req, res)=>{
    let team = req.body.teamSelect
    let teamID
   await fetch(`https://www.balldontlie.io/api/v1/teams`)
        .then(res => res.json())
        .then((teams)=>{
            for (let i=0; i<teams.data.length; i++){
                if(teams.data[i].full_name === team){
                    teamID = teams.data[i].id
                }
            }
        })
        let schedule = []
        let wins = 0
        let losses = 0
        for(let i=1; i<5;i++){
            await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2022&team_ids[]=${teamID}&page=${i}`)
            .then(res => res.json())
            .then((data)=>{
                for(let i=0; i<data.data.length; i++){
                    schedule.push(data.data[i])
                }
            })
        }
        for (let i=0; i<schedule.length; i++){
            if(schedule[i].home_team.full_name === team && schedule[i].home_team_score > schedule[i].visitor_team_score || schedule[i].visitor_team.full_name === team && schedule[i].visitor_team_score > schedule[i].home_team_score){
                wins += 1;
            } if(schedule[i].home_team.full_name === team && schedule[i].home_team_score < schedule[i].visitor_team_score || schedule[i].visitor_team.full_name === team && schedule[i].visitor_team_score < schedule[i].home_team_score){
                losses += 1;
            }
        }
        console.log(wins)
        console.log(losses)
        // console.log(Date.parse(schedule[81].date))  
        schedule.sort((a, b)=> Date.parse(a.date) - Date.parse(b.date))
        res.render('teamPage', {schedule, team, wins, losses})  
              
})







// router.put('/', async (req, res)=>{
//     let team = req.body.teamSelect
//     console.log(team)
//     let schedule = []
//     let page
//     try{
//         await fetch(`https://www.balldontlie.io/api/v1/teams`)
//         .then(res => res.json())
//         .then((allTeams)=>{
//             for(let i = 0; i< allTeams.data.length; i++){
//                 if(allTeams.data[i].full_name === team){
//                     let teamID = allTeams.data[i].id
//                     console.log(teamID)
//                     for(let i=1; i<4;i++){
//                     fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2022&team_ids[]=${teamID}&page=${i}`)
//                     .then(res => res.json())
//                     .then((data)=>{
//                         for(let i=0; i< data.data.length; i++){
//                             page += 1
//                             schedule.push(data.data[i])
//                             // console.log(schedule)
//                             // console.log(page)
//                         }
//                     })
//                     }
//                 }
//                 console.log(schedule)
//                 res.render('teamPage', {schedule});
//             }
//         })
//         // console.log(page)
//         // if(page===4){
//         //     res.render('teamPage', {schedule});
//         // }
//     }
//     catch(err){
//         console.log(err)
//     }
// })

module.exports = router