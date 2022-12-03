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
        for(let i=1; i<5;i++){
            await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2022&team_ids[]=${teamID}&page=${i}`)
            .then(res => res.json())
            .then((data)=>{
                for(let i=0; i<data.data.length; i++){
                    schedule.push(data.data[i])
                }
            })
        }
        console.log(schedule[81])  
        res.render('teamPage', {schedule})  
              
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