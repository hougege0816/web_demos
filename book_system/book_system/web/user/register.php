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
    <title>注册</title>
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
            padding: 5px 10px;
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
        .container #register_btn{
            display: block;
            float: none;
            margin: 10px auto 0 auto;
            height:35px;
            line-height:35px;
        }
    </style>
</head>
<body>
<div class="container col-md-6">
    <div class="col-md-12">
        <p class="text-center">Web网上书店注册</p>
    </div>
    <div class="col-md-12">
        <div class="form-group col-md-8 col-md-offset-2">
            <input type="text" id="name" class="form-control" placeholder="姓名">
        </div>
        <div class="form-group col-md-8 col-md-offset-2">
            <input type="text" id="user_name" class="form-control" placeholder="用户名">
        </div>
        <div class="form-group col-md-8 col-md-offset-2">
            <input type="password" id="password" class="form-control" placeholder="密码">
        </div>
        <div class="form-group col-md-8 col-md-offset-2">
            <input type="password" id="again_password" class="form-control" placeholder="再次输入密码">
        </div>
        <div class="form-group col-md-8 col-md-offset-2">
            <input type="number" id="age" class="form-control" placeholder="年龄">
        </div>
        <div class="form-group col-md-8 col-md-offset-2">
            <select id="sex" class="form-control">
                <option value="男">男</option>
                <option value="女">女</option>
            </select>
        </div>
        <div class="form-group col-md-8 col-md-offset-2">
            <input type="text" id="phone" class="form-control" placeholder="联系电话">
        </div>
        <div class="form-group col-md-8 col-md-offset-2">
            <input type="text" id="email" class="form-control" placeholder="邮箱">
        </div>
        <div class="col-md-12">
            <button id="register_btn" class="button button-pill button-primary center-block">注册</button>
        </div>
        <div class="col-md-10">
            <a class="pull-right" href="login.php">去登录</a>
        </div>
    </div>
</div>
<script src="../js/pub/bookSystem.js"></script>
<script src="../js/user/register.js"></script>
</body>
</html>