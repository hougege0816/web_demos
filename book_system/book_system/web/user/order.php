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
    <title>我的订单</title>
    <style>
        .content{
            height:120vh;
        }
        #modal-order-message{
            overflow: hidden;
        }
        #modal-order-message .modal-body{
            height:80vh;
            overflow-y: auto;
        }
        #modal-order-message .modal-order-message-content{
            height:40vh;
            background: red;
            margin-bottom:15px;
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
            <li class="active">
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
                    订单管理
                </button>
            </div>
            <div class="content-wrap col-md-12">
                <div id="book-box" class="col-md-6">
                    <div class="query-wrap col-md-12">
                        <div class="form-group col-md-4">
                            <div class="col-md-4">
                                <label for="query_order_id">订单编号</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_order_id" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-md-5">
                            <div class="col-md-4">
                                <label for="query_book_name_id">书名</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_book_name" class="form-control">
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
                                data-toggle="modal" data-target="#modal-add-book">
                            <span class="icon-ok"></span>
                            催单
                        </button>
                    </div>
                    <table class="table table-responsive" id="order-table"
                           data-classes="table table-hover"
                           data-toolbar="#book-toolbar">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="footer col-md-12">
        <span>@广州大学华软软件学院    计算机系   16web2  1640706178  蔡敏华</span>
    </div>
</div>
<!-- 弹出框 -->
<!-- 订单详情 -->
<div class="modal fade" id="modal-order-message" tabindex="-1" role="dialog" aria-labelledby="modal-order-message-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-order-message-title">订单详情</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>订单编号：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="id">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>收货人姓名：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="user_name">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>联系电话：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="phone">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>书籍id：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="book_id">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>书名：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="book_name">
                        </div>
                    </div><div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>作者：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="author">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>图书类型：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="book_type">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>订购数量：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="order_count">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>总价：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="total">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>收货地址：</label>
                        </div>
                        <div class="col-md-8">
                            <textarea class="aInput form-control" data-field="receiving_address"></textarea>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>备注：</label>
                        </div>
                        <div class="col-md-8">
                            <textarea class="aInput form-control"  data-field="message"></textarea>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>状态：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="state">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label>订购时间：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="created_at">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../js/pub/bookSystem.js"></script>
<script src="../js/pub/init.js"></script>
<script src="../js/user/Order.js"></script>
</body>
</html>