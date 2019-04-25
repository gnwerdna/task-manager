const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();
 
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user[0]._id
  });
  // res.send(req.user[0]._id);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
  //   task
  //     .save()
  //     .then(() => {
  //       res.send(task);
  //     })
  //     .catch(err => {
  //       res.status(400);
  //       res.send(err);
  //     });
});
//GET /tasks?complete=true
//GET /tasks?limit=true&skip=
//pagination skip =sum - count before % limit
//GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  try {
    const match = {};
    const sort = {};
    if (req.query.complete) {
      match.complete = req.query.complete === true;
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? 1 : -1;
    }
    // const tasks = await Task.findOne({owner: req.user._id});
    await req.user[0]
      .populate({
        path: "tasks",
        match,
        option: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    // console.log("tasks: " + req.user[0].tasks);
    res.status(200).send(req.user[0].tasks);
  } catch (e) {
    res.status(404).send(e);
  }
  //   Task.find({})
  //     .then(tasks => {
  //       res.send(tasks);
  //     })
  //     .catch(err => res.send(err));
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({ _id, owner: req.user[0]._id });
    if (!task) {
      return res.status(404).send("user not found!");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
  //   Task.findById(req.params.id)
  //     .then(task => {
  //       if (!task) {
  //         return res.status(404).send("user not found!");
  //       }
  //       res.send(task);
  //     })
  //     .catch(err => res.status(500).send(err));
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "complete"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "invalid updated" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user[0]._id
    });
    // const task = await Task.findById(req.params.id);
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    if (!task) {
      res.status(404).send("cannot find this user.");
    }
    updates.forEach(update => (task[update] = req.body[task]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user[0]._id
    });
    if (!task) {
      res.status(404).send("not exits this task.");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
