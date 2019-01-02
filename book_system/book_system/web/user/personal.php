<?php
include_once '../../php/user/isLogin.php';
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../bootstrap/css/buttons.css">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap-table.min.css">
    <link rel="stylesheet" href="../bootstrap/Font-Awesome-3.2.1/css/font-awesome.min.css">
    <link rel="stylesheet" href="../bootstrap/Font-Awesome-3.2.1/css/font-awesome-ie7.min.css">
    <link rel="stylesheet" href="../css/common.css">
    <script src="../bootstrap/js/jquery-3.2.1.min.js"></script>
    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <script src="../bootstrap/js/bootstrap-table.min.js"></script>
    <script src="../bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
    <title>个人中心</title>
    <style>
        .content{
            height:120vh;
        }
        #modal-add-user label{
            font-size:12px;
        }
        .center-block{
            float: none;
            display: block;
            margin: 2% auto;
        }
        #reset_password_box{
            margin-top:4%;
        }
    </style>
</head>
<body>
<div class="container col-md-12" style="width: 100%;">
    <div class="header pull-right col-md-10 col-sm-12 col-xs-12">
        <div class="logo-wrap">
            <img src="../image/logo.png" class="logo" alt="logo">
            <h1>Web网上书店</h1>
        </div>
        <ul class="nav">
            <li><a href="">
                    <span class="icon-off"></span>
                    退出
                </a></li>
        </ul>
    </div>
    <div class="side-menu col-md-2">
        <div class="side-menu-header col-md-12">
            <div class="portrait">
                <img src="../image/portrait/6.jpg">
            </div>
            <p id="user_name"><?php echo $_SESSION['user']['user_name'] ?></p>
            <h5><?php echo $_SESSION['user']['name'] ?></h5>
        </div>
        <ul class="nav col-md-12">
            <li>
                <a href="index.php">
                    <span class="icon-home"></span>
                    主页
                </a>
            </li>
            <li>
                <a href="book.php">
                    <span class="icon-book"></span>
                    图书订购
                </a>
            </li>
            <li>
                <a href="order.php">
                    <span class="icon-folder-open"></span>
                    我的订单
                </a>
            </li>
            <li>
                <a href="comment.php">
                    <span class="icon-comments"></span>
                    我的评论
                </a>
            </li>
            <li class="active">
                <a href="personal.php">
                    <span class="icon-user-md"></span>
                    个人中心
                </a>
            </li>
        </ul>
    </div>
    <div class="content col-md-10 col-sm-12">
        <div class="content-header">
            <div class="content-nav button-group col-md-12">
                <div class="top">
                    <span></span>
                </div>
                <button type="button" class="button button-primary button-action button-small">
                    <span class="icon-home"></span>
                    个人信息
                </button>
                <button type="button" class="button button-primary button-small">
                    <span class="icon-home"></span>
                    重置密码
                </button>
            </div>
            <div class="content-wrap col-md-12">
                <div id="user_info_box" class="col-md-6">
                    <div class="col-md-8 center-block">
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="message_name">姓名：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="message_name" class="aInput form-control" data-field="name">
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="message_user_name">用户名：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text"  id="message_user_name" class="aInput form-control" data-field="user_name">
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="message_sex">性别：</label>
                            </div>
                            <div class="col-md-8">
                                <select id="message_sex" class="aInput form-control" data-field="sex">
                                    <option value="未知">未知</option>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="message_age">年龄：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="number" id="message_age" class="aInput form-control" min="0" max="120"
                                       data-field="age">
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="message_phone">电话：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="message_phone" class="aInput form-control" data-field="phone">
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="modal_message_email">邮箱：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="message_email" class=" aInput form-control" data-field="email">
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="modal_message_receiving_address">收货地址：</label>
                            </div>
                            <div class="col-md-8">
                                <textarea id="message_receiving_address" class="aInput form-control"
                                          data-field="receiving_address"></textarea>
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="modal_created_at">注册时间：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text"  id="message_created_at" class="aInput form-control"
                                       data-field="created_at">
                            </div>
                        </div>
                        <div class="form-group col-md-11">
                            <button class="edit-btn btn btn-primary pull-right" data-start="0">
                                编辑
                            </button>
                        </div>
                    </div>
                </div>
                <div id="reset_password_box" class="col-md-6">
                    <div class="col-md-7 center-block">
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="reset_old_password">输入旧密码：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="password" id="reset_old_password" class="reset_aInput form-control">
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="reset_password">输入新密码：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="password" id="reset_password" class="reset_aInput form-control">
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="col-md-3">
                                <label for="reset_again_password">再次输入密码：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="password" id="reset_again_password" class="reset_aInput form-control">
                            </div>
                        </div>
                        <div class="col-md-11">
                            <button class="reset-password-btn btn btn-primary pull-right">重置</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer col-md-12">
        <span>@广州大学华软软件学院    计算机系   16web2  1640706178  蔡敏华</span>
    </div>
</div>


<script src="../js/pub/bookSystem.js"></script>
<script src="../js/pub/init.js"></script>
<script src="../js/user/Personal.js"></script>
</body>
</html>