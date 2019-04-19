const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.post("/task", async (req, res) => {
  const task = new Task(req.body);

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

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(404).send(e);
  }
  //   Task.find({})
  //     .then(tasks => {
  //       res.send(tasks);
  //     })
  //     .catch(err => res.send(err));
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("user not found!");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(err);
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

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "complete"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "invalid updated" });
  }
  try {
    const task = await Task.findById(req.params.id);
    updates.forEach(update => (task[update] = req.body[task]));
    await task.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    if (!task) {
      res.status(404).send("cannot find this user.");
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send("not exits this task.");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
