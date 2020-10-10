const db = require("../models/workout.js");
const router = require("express").Router();

module.exports = (app) => {

    app.use(function timeLog(req, res, next) {
        console.log("Time: ", Date.now());
        next();
    });

    app.get("/api/workouts", (req, res) => {
      Workout.find({}, (err, workouts) => {
          if(err){
              console.log(err);
          } else {
              res.json(workouts)
          }
      });
  });

    app.post("/api/workouts", (req, res) => {
        Workout.create({})
          .then(newWorkout => {
            res.json(newWorkout);
          })
          .catch(err => {
            res.json(err);
          });
    });
      
    app.put("/api/workouts/:workout", ({ params, body }, res) => {
      Workout.findOneAndUpdate(
                                { _id: params.id},
                                {$push: {excercises:body }},
                                { upsert: true, useFindandModify:false},
                                updatedWorkout => {
                                    res.json(updatedWorkout);
                                })
  });
      
    app.get("/api/workouts/range", (req, res) => {
        Workout.find({})
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
    });
};


