module.exports.getId = async function(req, res) {
  const userInf = {
      name:req.user.name,
      age:25
  }
  console.log(userInf)
  res.status(200).json(userInf)
}