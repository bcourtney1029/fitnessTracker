const db = require("../models/workout.js");
const router = require("express").Router();

module.exports = (app) => {

    router.use(function timeLog(req, res, next) {
        console.log("Time: ", Date.now());
        next();
    });

    router.get("/api/workouts", (req, res) => {
        db.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    router.post("/api/workouts", (req, res) => {
        db.create({})
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
    });
      
    router.put("/api/workouts/:id", ({ body, params }, res) => {
        db.findByIdAndUpdate(
          params.id,
          { $push: { exercises: body } },
      
          { new: true, runValidators: true }
        )
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
    });
      
    router.get("/api/workouts/range", (req, res) => {
        db.find({})
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
    });
};


