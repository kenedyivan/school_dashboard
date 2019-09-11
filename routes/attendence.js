var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:name_of_school', function(req, res, next) {

    
    const limit = 10;

    let nameOfSchool = req.params.name_of_school;

    const aQuery =`select distinct(name_of_school) as schools, p1__attendance_on_visit_day__boys as p1_boys, 
    p1__attendance_on_visit_day__girls as p1_girls, p2__attendance_on_visit_day__boys as p2_boys, 
    p2__attendance_on_visit_day__girls as p2_girls, p3__attendance_on_visit_day__boys as p3_boys, 
    p3__attendance_on_visit_day__girls as p3_girls, p4__attendance_on_visit_day__boys as p4_boys, 
    p4__attendance_on_visit_day__girls as p4_girls, p5__attendance_on_visit_day__boys as p5_boys, 
    p5__attendance_on_visit_day__girls as p5_girls, p6__attendance_on_visit_day__boys as p6_boys, 
    p6__attendance_on_visit_day__girls as p6_girls, p7__attendance_on_visit_day__boys as p7_boys, 
    p7__attendance_on_visit_day__girls as p7_girls from tbl_random where name_of_school = '${nameOfSchool}' limit ${limit}`;


    connection.query(aQuery, function fill(err, result,){
            if (err) throw err;
            let schoolsArray = [];
            let attendenceBoysArray = [];
            let attendenceGirlsArray = [];
            //let flag = 0;
            for(let i = 0; i < result.length; i++){
                // School
                let school = result[i].schools;
        
                schoolsArray.push(school)

        
                // Processing boys for each school and each class
                let boysArray = [];
                for(let b = 1; b <= 7; b++){
                let sClass = `p${b}_boys`;
                boysArray.push(result[i][sClass]);
                }
                attendenceBoysArray.push(boysArray);
        
                // Processing girls for each school and each class
                let girlsArray = [];
                for(let g = 1; g <= 7; g++){
                let sClass = `p${g}_girls`;
                girlsArray.push(result[i][sClass]);
                }
                attendenceGirlsArray.push(girlsArray);
        
            }
            console.log("SCHOOLS",schoolsArray);
            console.log("BOYS",attendenceBoysArray);
            console.log("GIRLS", attendenceGirlsArray);
            
            
        
            let school = schoolsArray[0];
            let boysPlot = JSON.stringify(attendenceBoysArray[0]);
            let girlsPlot = JSON.stringify(attendenceGirlsArray[0]);

            res.send({school:school, boys: boysPlot, girls: girlsPlot});
      
        })

});


module.exports = router;















