<?php
include_once '../../php/admin/isLogin.php';
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
    <title>用户管理</title>
    <style>
        .content{
            height:120vh;
        }
        #modal-add-user label{
            font-size:12px;
        }
        #modal-user-message{
            overflow: hidden;
        }
        #modal-user-message .row-content{
            height:70vh;
            overflow-y: auto;
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
                <a href="systemInfo.php">
                    <span class="icon-info-sign"></span>
                    系统信息管理
                </a>
            </li>
            <li>
                <a href="book.php">
                    <span class="icon-book"></span>
                    图书管理
                </a>
            </li>
            <li>
                <a href="bookClass.php">
                    <span class="icon-list-alt"></span>
                    图书分类管理
                </a>
            </li>
            <li>
                <a href="order.php">
                    <span class="icon-folder-open"></span>
                    订单管理
                </a>
            </li>
            <li>
                <a href="comment.php">
                    <span class="icon-comments"></span>
                    评论管理
                </a>
            </li>
            <li class="active">
                <a href="user.php">
                    <span class="icon-user"></span>
                    用户管理
                </a>
            </li>
            <li>
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
                    用户管理
                </button>
            </div>
            <div class="content-wrap col-md-12">
                <div id="book-box" class="col-md-6">
                    <div class="query-wrap col-md-12">
                        <div class="form-group col-md-4">
                            <div class="col-md-4">
                                <label for="query_user_id" class="btn">用户id</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_user_id" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <div class="col-md-4">
                                <label for="query_user_name" class="btn">用户名</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_user_name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <button type="button" class="query-btn btn btn-primary">
                                <span class="icon-search"></span>
                                查询
                            </button>
                        </div>
                    </div>
                    <div id="book-toolbar" class="btn-group table-wrap-header">
                        <button type="button" class="button button-small button-pill button-primary"
                                data-toggle="modal" data-target="#modal-add-user">
                            <span class="glyphicon glyphicon-plus"></span>
                            新增用户
                        </button>
                        <button type="button" class="open-update-btn button button-small button-pill button-primary"
                        data-toggle="modal" data-target="#modal-update-user" data-table="#user-table">
                            <span class="icon-pencil" aria-hidden="true"></span>
                            修改用户信息
                        </button>
                        <button type="button" class="remove-user-btn button button-small button-pill button-primary">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            删除用户
                        </button>
                    </div>
                    <table class="table table-responsive" id="user-table"
                           data-classes="table table-hover"
                           data-toolbar="#book-toolbar">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="footer col-md-12">
        <span>@广州大学华软软件学院    计算机系   16web2 1640706178  蔡敏华</span>
    </div>
</div>
<!-- 弹出框 -->
<!-- 用户信息 -->
<div class="modal fade" id="modal-user-message" tabindex="10"  aria-labelledby="modal-user-message-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-user-message-title"><span class="modal_message_user_name_title"></span>详情</h4>
            </div>
            <div class="modal-body">
                <div class="row row-content">
                    <div class="col-md-12 center-block">
                        <div class="message_box">
                            <h4>信息</h4>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_user_id">用户id：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="modal_message_user_id aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_name">姓名：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="modal_message_name aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_user_name">用户名：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text"  class="modal_message_user_name aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_sex">性别：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="modal_message_sex aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_book_name">年龄：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="modal_message_age aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_email">邮箱：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="modal_message_email aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_phone">电话：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="modal_message_phone aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_comment_state">收货地址：</label>
                                </div>
                                <div class="col-md-8">
                                    <textarea  class="modal_message_receiving_address aInput form-control">
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_created_time">注册时间：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text"  class="modal_message_created_time aInput form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-add-user" tabindex="-1" role="dialog"
     aria-labelledby="modal-add-user-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-add-book-title">新增用户</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="col-md-6">
                            <div class="col-md-4">
                                <label for="add_name">姓名</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text"  id="add_name" class="add_aInput form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-md-4">
                                <label for="add_userName">用户名</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text"  id="add_userName" class="add_aInput form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-6">
                            <div class="col-md-4">
                                <label for="add_password">密码</label>
                            </div>
                            <div class="col-md-8">
                                <input type="password"  id="add_password" class="add_aInput form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-md-4">
                                <label for="add_again_password">密码</label>
                            </div>
                            <div class="col-md-8">
                                <input type="password"  id="add_again_password" class="add_aInput form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-6">
                            <div class="col-md-4">
                                <label for="add_age">年龄</label>
                            </div>
                            <div class="col-md-8">
                                <input type="number"  id="add_age" class="add_aInput form-control" max="120" min="0">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-md-4">
                                <label for="add_sex">性别</label>
                            </div>
                            <div class="col-md-8">
                                <select id="add_sex" class="aInput form-control">
                                    <option value="未知">未知</option>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-6">
                            <div class="col-md-4">
                                <label for="add_phone">电话</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text"  id="add_phone" class="add_aInput form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-md-4">
                                <label for="add_email">邮箱</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text"  id="add_email" class="add_aInput form-control">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" class="add-user-btn btn btn-primary btn-sm"  data-dismiss="modal">添加</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-update-user" tabindex="10"  aria-labelledby="modal-user-message-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-user-message-title">
                    修改<span class="modal_message_user_name_title"></span>信息</h4>
            </div>
            <div class="modal-body">
                <div class="row row-content">
                    <div class="col-md-12 center-block">
                        <div class="message_box">
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_name">姓名：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="modal_message_name aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_user_name">用户名：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text"  class="modal_message_user_name aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_sex">性别：</label>
                                </div>
                                <div class="col-md-8">
                                    <select class="modal_message_sex aInput form-control">
                                        <option value="未知">未知</option>
                                        <option value="男">男</option>
                                        <option value="女">女</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_book_name">年龄：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="number" class="modal_message_age aInput form-control" min="0" max="120">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_email">邮箱：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="modal_message_email aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_message_phone">电话：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="modal_message_phone aInput form-control">
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <div class="col-md-3">
                                    <label for="modal_comment_state">收货地址：</label>
                                </div>
                                <div class="col-md-8">
                                    <textarea  class="modal_message_receiving_address aInput form-control">
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" class="update-btn btn btn-primary btn-sm"  data-dismiss="modal">更新</button>
            </div>
        </div>
    </div>
</div>

<script src="../js/pub/bookSystem.js"></script>
<script src="../js/pub/init.js"></script>
<script src="../js/admin/User.js"></script>
</body>
</html>