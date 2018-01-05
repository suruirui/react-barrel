var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'reactbarrel'
});

connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a users resource');
});

//查询所有用户
router.get('/list', function(req, res, next) {
    connection.query("select * from user",function(err,rows){
    	if(!err){
    		res.json(rows);
    	}else{
    		res.send({ message: 'error'});
    	}
    });
});

//用户登录
router.post('/login', function(req, res, next) {
	const {username, pwd} = req.query;
    connection.query("select * from user where user_name = ? and pwd = ?",[username,pwd],function(err,rows){
    	if(rows.length != 0){
			res.send({ message: 'ok'});
    	}else{
    		res.send({ message: '用户名或密码错误'});
    	}
    });
});
//用户注册
router.post('/reg', function(req, res, next) {
	const {username, pwd, type} = req.query;
    connection.query("insert into user(user_name,pwd,user_type) values(?,?,?)",[username,pwd,type],function(err,rows){
    	if(!err){
			res.send({ message: 'ok'});
    	}else{
    		res.send({ message: 'error'});
    	}
    });
});

//检测用户名是否重复
router.post('/checkName', function(req, res, next) {
	const {username} = req.query;
    connection.query("select * from user where user_name = ?",[username],function(err,rows){
    	if(rows.length != 0){
			res.send({ message: '用户名已存在'});
    	}else{
    		res.send({ message: 'ok'});
    	}
    });
});

//根据id获得用户信息
router.post('/info', function(req, res, next) {
	const {userId} = req.query;
	//const {userid} = req.cookies  //或从cookie发送get请求
	console.log(userId);
    connection.query("select * from user where id = ?",[userId],function(err,rows){
    	res.json(rows);
    });
});
module.exports = router;
