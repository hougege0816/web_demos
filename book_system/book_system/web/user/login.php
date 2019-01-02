<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../bootstrap/css/buttons.css">
    <script src="../bootstrap/js/jquery-3.2.1.min.js"></script>
    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <title>登陆</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        html,body{
            background:#333;
            width:100%;
            height:100%;
            display: flex;
            justify-content:center;
        }
        .container{
            padding: 20px 10px;
        }
        .container .head{
            display: flex;
            align-items:center;
            justify-content:center;
            width:100%;
            height:160px;
            margin:30px 0;
        }
        .container .head img{
            width:160px;
            height:160px;
            border-radius: 50%;
            overflow: hidden;
        }
        .container p,
        .container a{
            color:#eee;
        }
        .form-group{
            margin-top:15px;
        }
        .container #login_btn{
            display: block;
            float: none;
            margin: 10px auto 0 auto;
            height:35px;
            line-height:35px;
        }
        #v_container{
            height:50px;
        }
        #v_container canvas{
            padding: 0;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="container col-md-6">
        <div class="head">
            <img src="../image/portrait/1.jpg">
        </div>
        <div class="col-md-12">
            <p class="text-center">Web网上书店登陆</p>
        </div>
        <div class="col-md-12">
            <div class="form-group col-md-8 col-md-offset-2">
                <input type="text" id="userName" class="form-control" placeholder="用户名">
            </div>
            <div class="form-group col-md-8 col-md-offset-2">
                <input type="password" id="userPassword" class="form-control" placeholder="密码">
            </div>

            <div class="form-group col-md-8 col-md-offset-2">
                <input type="text" id="code_input" class="form-control" placeholder="请输入验证码"/>
            </div>
            <div id="v_container"  class="form-group col-md-8 col-md-offset-2">

            </div>


            <div class="col-md-12">
                <button id="login_btn" class="button button-pill button-primary center-block">登陆</button>
            </div>
            <div class="col-md-10">
                <a class="pull-right" href="register.php">去注册</a>
            </div>
        </div>
    </div>
    <script src="../js/pub/bookSystem.js"></script>
    <script src="../js/pub/gVerify.js"></script>
    <script src="../js/user/login.js"></script>
</body>
</html>