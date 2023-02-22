var Taskdb = require('../model/model');

//create and save new user

exports.create = (req, res) =>{
    //validate request

    if(!req.body){
        res.status(400).send({
            message:"content can not be empty"
        });
        return;
    }
    //new user
    const user = new Taskdb({
        title:req.body.title,
        note:req.body.note,
        gender:req.body.gender,
        status:req.body.status 
    })
    //save user in the database
    user
    .save(user)
    .then(data =>{
        // res.send(data)
        res.redirect('/add-users');
    })
    .catch(err =>{
        res.status(500).send({
            message:err.message || "some error occurred while creating a user"
        });
    });


}

//retrieve and return all users/retrieve and return a single user

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Taskdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    Taskdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error Occurred while retriving user information",
          });
      });
  }
};
//to update user
exports.update =(req,res)=> {
    if(!req.body){
        return res
        .status(400)
        .send({
            message:"Data to update can not be empty"
        });
    }
    const id = req.params.id;
    Taskdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data =>{
        if(!data){
            res.status(404).send({message:`Cannont update user with${id}.Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error update user information"}) 
    })

}

//delete a user with specified user id in the request

exports.delete = (req, res)=>{
    const id = req.params.id;

    Taskdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

