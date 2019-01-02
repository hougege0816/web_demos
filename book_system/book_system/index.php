<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./web/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="./web/bootstrap/Font-Awesome-3.2.1/css/font-awesome.min.css">
    <link rel="stylesheet" href="./web/bootstrap/css/buttons.css">
    <script src="./web/bootstrap/js/jquery-3.2.1.min.js"></script>
    <script src="./web/bootstrap/js/bootstrap.min.js"></script>
    <title>登录</title>
    <style>
        html,body{
            width:100%;
            height:100%;
        }
        body{
            display: flex;
            align-items:center;
            justify-content:center;
            background:#333;
            background-size:cover;
        }
        h1{
            margin:10% 0 5% 0;
            font-size:32px;
            letter-spacing: .2em;
            text-align: center;
            color:white;

        }

        .button-royal{
            color:white;
            background:#428cff;!important;
        }
        .button-royal:hover{
            background: #8869ff;
        }
        .container{
            margin: 0 auto;
            height:80%;
        }
        .box{
            margin: 0 auto;
            width:50%;
            display: flex;
            align-items:center;
            justify-content:space-around;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Web网上书店</h1>
    <div class="box">
            <a href="./web/user/index.php" class="button button-3d button-royal">
                <span class="icon-group" style="color:#333"></span>前台页面</a>
            <a href="./web/admin/index.php" class="button button-3d button-royal">
                <span class="icon-user"  style="color:#333"></span>后台管理</a>
    </div>
</div>
</body>
</html>