const express = require("express");
const router = new express.Router();
const User = require("../models/user");
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }

  //   user
  //     .save()
  //     .then(() => {
  //       res.send(user);
  //     })
  //     .catch(err => {
  //       res.status(400);
  //       res.send(err);
  //     });
});

//login in user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.send(e);
  }
  //   User.find({})
  //     .then(users => {
  //       res.send(users);
  //     })
  //     .catch(err => res.send(err));
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("user not found!");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
  //   User.findById(req.params.id)
  //     .then(user => {
  //       if (!user) {
  //         return res.status(404).send("user not found!");
  //       }
  //       res.send(user);
  //     })
  //     .catch(err => res.status(500).send(err));
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(() =>
    allowedUpdates.includes(updates)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "invalid updated" });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("cannot find this user.");
    }
    updates.forEach(update => (user[update] = req.body[update]));
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("cannot find this user");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;