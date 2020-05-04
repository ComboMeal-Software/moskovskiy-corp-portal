var express = require('express');
var app = require('../app')
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();

/* GET home page. */
router.get('/', (req,res)=>{
  if(!require.session.userLogin) {
  res.render('login.hbs')
} else{
  res.render('index.hbs')
}
});
router.post('login',jsonParser,(req,res)=>{
  const login = req.body.login;
  const password = req.body.password;

  //функция проверки полей на заполненность, Ajax'ом отрендерится, надеюсь


  let checkFields = (fields) =>{
    let fieldsErr = [];
    for(let prop in fields){
      if (!fields[prop]){
        fieldsErr.push(prop);
        }
    };
    return fieldsErr;
  }
  let fieldsErr = checkFields(req.body);
  
  if(fieldsErr){
    res.json({
      ok: false,
      error:'Все поля должны быть заполнены',
      fields:fieldsErr,
    }); 
  }
  else {
    models.User.findOne({login})
      .then(user => {
        if (!user) {
          res.json({
            ok: false,
            error: 'Такого логина нет!',
            fields: ['login', 'password']
          });
        } else {
          bcrypt.compare(password, user.password, function(err, result) {
            if (!result) {
              res.json({
                ok: false,
                error: 'Логин и пароль неверны!',
                fields: ['login', 'password']
              });
            } else {
              req.session.Name = user.name + " " + user.lastName;
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              res.json({
                ok:true,
              });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({
          ok: false,
          error: 'Ошибка, попробуйте позже!'
        });
      });
    }
  });

module.exports = router;
