const hisabModel = require("../model/hisab-model")
const userModel = require("../model/user-model")

module.exports.createHisabController = async function (req, res) {
   try {
      let { title, content, encrypted, passcode, shareable, editable } = req.body
      let user = await userModel.findOne({ email: req.user.email })
      if (!title || !content) return res.send("empty field!!")
      encrypted = encrypted === "on" ? true : false
      shareable = shareable === "on" ? true : false
      editable = editable === "on" ? true : false
      if (encrypted && !passcode) {
         return res.send("passcode required!!")
      }
      let hisab = await hisabModel.create({
         title,
         content,
         user: user._id,
         encrypted,
         passcode,
         shareable,
         editable
      })
      user.hisabs.push(hisab._id)
      await user.save()
      res.redirect("/profile")
   }
   catch (err) {
      res.send(err._message)
   }
}

module.exports.viewHisabController = async function (req, res) {
   try {
      let hisab = await hisabModel.findOne({ _id: req.params.id })
      if (hisab.encrypted) return res.render("passcode", { hisabid: hisab._id })
      res.render("view", { hisab })
   }
   catch (err) {
      res.send(err._message)
   }
}

module.exports.hisabVerifyController = async function (req, res) {
   try {
      let { passcode } = req.body
      let hisab = await hisabModel.findOne({ _id: req.params.id })
      if (!passcode) return res.send("passcode Required !!")
      if (passcode === hisab.passcode) {
         req.session.hisabid = hisab._id
         res.redirect(`/hisab/${hisab._id}`)
      }
      else {
         res.send("Incorrect passcode!!")
      }
   }
   catch (err) {
      res.send(err._message)
   }

}

module.exports.verifiedHisabController = async function (req, res) {
   try {
      let hisab = await hisabModel.findOne({ _id: req.params.id })
      res.render("view", { hisab })
   }
   catch (err) {
      res.send(err._message)
   }
}

module.exports.deleteHisabController = async function (req, res) {
   try {
      let hisab = await hisabModel.findOne({ _id: req.params.id })
      if (req.user._id === hisab.user.toString()) {
         await hisabModel.findOneAndDelete({ _id: hisab._id })
         res.redirect("/profile")
      } else {
         res.send("You don't have permission!!")
      }
   }
   catch (err) {
      res.send(err._message)
   }
}


module.exports.editHisabController = async function (req, res) {
   try {
      let hisab = await hisabModel.findOne({ _id: req.params.id })
      if (!hisab.editable) return res.send("you dont have permission to edit this hisab!!")
      if (hisab.encrypted && req.session.hisabid !== req.params.id) return res.redirect(`/hisab/view/${req.params.id}`)
      res.render("edit", { hisab })
   }
   catch (err) {
      res.send(err._message)
   }
}

module.exports.updateHisabController = async function (req, res) {
   try {
      let { title, content, encrypted, passcode, shareable, editable } = req.body
      if (!title || !content) return res.send("empty field!!")
      encrypted = encrypted === "on" ? true : false
      shareable = shareable === "on" ? true : false
      editable = editable === "on" ? true : false
      if (encrypted && !passcode) {
         return res.send("passcode required!!")
      }
      let hisab = await hisabModel.findOneAndUpdate({ _id: req.params.id }, {
         title,
         content,
         encrypted,
         passcode,
         shareable,
         editable
      })
      res.redirect("/profile")
   }
   catch (err) {
      res.send(err._message)
   }
}