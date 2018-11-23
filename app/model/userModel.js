'user strict';
var sql = require('./db.js');

//User object constructor
var User = function(user){
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.cin = user.cin;
    this.contact = user.contact;
    this.email = user.email;
};
User.createUser = function createUser(newUser, result) {    
        sql.query("INSERT INTO user set ?", newUser, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
User.getUserById = function createUser(userid, result) {
        sql.query("Select user from user where id = ? ", userid, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
User.getAllUser = function getAllUser(result) {
        sql.query("Select * from user", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('user : ', res);  

                 result(null, res);
                }
            });   
};
User.updateById = function(id, user, result){
  sql.query("UPDATE user SET user = ? WHERE id = ?", [user.user, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
User.remove = function(id, result){
     sql.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= User;