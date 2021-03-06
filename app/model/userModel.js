'user strict';
var sql = require('./db.js');

//User object constructor
var User = function(user){
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.cin = user.cin;
    this.contact = user.contact;
    this.email = user.email;
    this.password = user.password;
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

User.searchUser = function searchUser(newUser, result) {    
    sql.query("Select userid from user where email = ? and password = ?", [newUser.email, newUser.password], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });          
};
User.getUserById = function createUser(userid, result) {
        sql.query("Select * from user where userid = ? ", userid, function (err, res) {             
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
                  res.forEach(user => {
                      delete user.password;
                  });
                 result(null, res);
                }
            });   
};
User.updateById = function(id, user, result){
  sql.query("UPDATE user SET user = ? WHERE userid = ?", [user.user, id], function (err, res) {
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
     sql.query("DELETE FROM user WHERE userid = ?", [id], function (err, res) {

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