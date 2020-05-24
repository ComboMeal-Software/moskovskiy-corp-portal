var express = require('express');
var app = require('../app');
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');
const pattern =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const router = express.Router();
const bodyParser = require("body-parser");

var department_list = [];
models.Departments.find().sort({id:1}).then(departments => department_list = departments);
console.log(department_list);
//парсить будем Json

const jsonParser = bodyParser.json();

//get

router.use('/Admin_emp_new',(req,res)=>{
  console.log('Admin_emp_new');
  if(req.session.admin){
  res.render('Admin_emp_edit.hbs',{department_list})
}else{
  res.redirect('/');
}
})

//отправка формы регистрации

router.post('/Admin_emp_new',jsonParser,(req,res)=>{
 let checkFields = (fields) =>{
    let fieldsErr = [];
    for(let prop in fields){
      if (!fields[prop]){
        fieldsErr.push(prop);
        }
    };
    return fieldsErr;
  }
  
  const login = req.body.login;
  const password = req.body.password;

  //проверка на заполненность полей

  let fieldsErr = checkFields(req.body);
  if(fieldsErr.length){
    res.json({
      ok: false,
      error:'Все поля должны быть заполнены',
      fields:fieldsErr,
    });
  } 

  //проверка на верность login

  else if (!pattern.test(login)) {
    fieldsErr.push("login");
    res.json({
      ok: false,
      error: 'Введите корректный Email',
      fields:fieldsErr,
    });
  }

    //проверка на верность пароля

  else if(password.length<5){
    fieldsErr.push("password");
    res.json({
      ok: false,
      error: 'Пароль не менее 5 символов',
      fields:fieldsErr,
    })
  }

  //в случае верных полей

    else {

    // поиск юзера с таким же логином

    models.User.findOne({login: login}).then(user => {

      // если такого юзера не обнаружено - создаем

      if (!user) {
        let fullName = req.body.name.split(' ');
        filename = './public/avatars/'+ login + Date.now();
        avatar.mv(filename, (err)=>{
          if (err)
          return res.status(500).send(err);
        });
        bcrypt.hash(password, null, null, (err, hash) => {
          models.User.create({
            lastName:fullName[0],
            name: fullName[1],
            patronymic:fullName[3],
            department:req.body.department,
            phoneNumber:req.body.phoneNumber,
            login,
            password:hash,
            birthdate: new Date (req.body.birthdate),
            avatar:filename,
          })          
            .then(user => {
              res.json({
                ok:true,
                user,
              });
            })
            .catch(err => {
              console.log(err);
              res.json({
                ok: false,
                error: 'Ошибка, попробуйте позже!'
              });
            });
        });
      }

      //Если login занят

       else 
       {
        res.json({
          ok: false,
          error: 'Имя занято!',
          fields: ['login']
        });
      }
    });
  }
})

module.exports = router;