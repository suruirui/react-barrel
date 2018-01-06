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
        res.json({code:0,data:rows});
    });
});

//用户登录
router.post('/login', function(req, res, next) {
	const {username, pwd} = req.body;
    console.log(username, pwd)
    connection.query("select id from user where user_name = ? and pwd = ?",[username,pwd],function(err,rows){
    	if(rows.length){
             res.cookie('userId', rows[0].id);
             res.json({code:0,data:rows});
        }else{
             res.json({code:1,msg:'用户名或者密码错误'});
        }
    });
});
//用户注册
router.post('/reg', function(req, res, next) {
    const {username, pwd, type} = req.body;
    connection.query("insert into user(user_name,pwd,user_type) values(?,?,?)",[username,pwd,type],function(err,rows){
        if(!err){
            res.json({code:0,data:rows});
        }else{
            res.json({code:1,msg:'注册不成功'});
    	}
    });
});

//检测用户名是否重复
router.post('/checkName', function(req, res, next) {
	const {username} = req.body;
    console.log('username',username);
    connection.query("select * from user where user_name = ?",[username],function(err,rows){
    	if(rows.length){
            res.json({code:0,data:rows});
    	}else{
    		res.json({code:1,msg:'用户名已存在'});
    	}
    });
});

//根据id获得用户信息
router.post('/info', function(req, res, next) {
	const {userId} = req.cookies  //或从cookie发送get请求
	console.log('用户信息id',userId);
    if (!userId) {
        return res.json({code:1});
    }
    connection.query("select * from user where id = ?",[userId],function(err,rows){
        if(err){
            res.json({code:1,msg:'error'});
        }
        if(rows){
            res.json({code:0,data:rows})
        }
    });
});

//编辑用户信息
router.post('/edit', function(req, res, next) {
    const {userId} = req.cookies  //或从cookie发送get请求
    console.log('用户信息id',userId);
    if (!userId) {
        return json.dumps({code:1})
    }
    const body = req.body;
    // const body = req.query;  //测试用
    console.log('body',body);
    let userName = req.body.userName;
    let userType = req.body.userType;
    let userAvatar = req.body.userAvatar;
    let title = req.body.title;
    let userCompany = req.body.userCompany;
    let userAsset = req.body.userAsset;
    let userIntro = req.body.userIntro;
    let pwd = req.body.pwd;
    console.log(userName,userType,userAvatar,title,userCompany,userAsset,userIntro,pwd);
    connection.query("update user set user_name = ?,user_type = ?,user_avatar = ?,title=?,user_company = ?,user_asset = ?,user_intro = ?,pwd = ? where id = ?",[userName,userType,userAvatar,title,userCompany,userAsset,userIntro,pwd,userId],function(err,rows){
        if(err){
            res.json({code:1,msg:'error'});
        }
        if(rows){
            res.json({code:0,data:rows})
        }
    });
});
module.exports = router;
