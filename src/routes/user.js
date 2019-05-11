const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user"); 
const multer = require("multer");
const { sendWelcomeEmail, sendCancelledEmail } = require("../emails/account");

//get all user
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send({user: req.user});
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

//create an user
router.post("/user/register", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await User.findOne({ email: req.body.email});
    if(user) {
      throw new Error("Email is exist!");
    }
    await newUser.save();
    // sendWelcomeEmail(user.email, user.name);
    const token = await newUser.generateAuthToken();
    res.send({ user:user, token: token });
  } catch (e) {
    res.send({error: e.message} );
  }
});

router.post("/users/login", async (req, res) => { 
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // console.log(user.getPublicProfile());
    res.send({ token: token });
  } catch (e) {
    res.send({ error: e });
  }
});

router.post("/me/logout", auth, async (req, res) => {
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

router.post("/me/logoutAll", auth, async (req, res) => {
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
  const user = req.user[0];
  try {
    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    res.send({user :req.user});
  } catch (e) {
    res.status(400).send(e);
  }
});




////////upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/images/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload =multer({storage: storage}).single("myImage");
router.post("/users/me/avatar", auth, (req, res) => {
  upload(req, res, err => {
    if(err instanceof multer.MulterError) {
      return res.status(200).json("fiest");
    } else if (err) {
      return res.status(200).json("two");
    }
    req.user[0].avatar = req.file.filename;
    // console.log(req.user);
    // console.log(req.file);
    req.user[0].save();
  })
  return res.status(200).send({user: req.user[0].avatar});
})



router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user[0].remove();
    sendCancelledEmail(req.user[0].email, req.user[0].name);
    res.send(req.user[0]);
  } catch (e) {
    res.status(500).send(e);
  }
});

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
// router.get("/users/:id/avatar", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user || !user.avatar) {
//       throw new Error();
//     }
//     res.set("Content-Type", "image/jpg");
//     res.send(user.avatar);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });
module.exports = router;
