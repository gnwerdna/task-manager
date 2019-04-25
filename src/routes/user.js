const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const multer = require("multer");
const storage = multer.memoryStorage();
const { sendWelcomeEmail, sendCancelledEmail } = require("../emails/account");

//login in user
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

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
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

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
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

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // console.log(user.getPublicProfile());
    res.send({ user: user.getPublicProfile(), token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user[0].tokens = [];
    console.log(req.user);
    await req.user[0].save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "invalid updated" });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("cannot find this user.");
    }
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password", "age"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     res.status(400).send({ error: "invalid updated" });
//   }
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       res.status(404).send("cannot find this user.");
//     }
//     updates.forEach(update => (user[update] = req.body[update]));
//     // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     //   new: true,
//     //   runValidators: true
//     // });
//     await user.save();
//     res.send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user[0].remove();
    sendCancelledEmail(req.user[0].email, req.user[0].name);
    res.send(req.user[0]);
  } catch (e) {
    res.status(500).send(e);
  }
});

const upload = multer({
  dest: "avatars",
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".jpg")) {
      return cb(new Error("please upload a jpg file."));
    }
    cb(undefined, true);
    req.file = file;
    console.log(file);
  },
  storage: storage
});
//can use sharp when resize image
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // console.log(req.file.buffer);
    req.user[0].avatar = req.file.buffer;
    // console.log(req.user[0]);
    // console.log(req.file.buffer);
    await req.user[0].save();
    res.send("success.");
  },
  (error, req, res) => {
    res.status(400).send({ error: error });
  }
);

// router.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).send("cannot find this user");
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user[0].avatar = undefined;
    await req.user[0].save();
    res.send("success.");
  } catch (e) {
    res.send(e);
  }
});

//get avatar via user id
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
