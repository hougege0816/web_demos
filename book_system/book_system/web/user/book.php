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
    <title>图书订购</title>
    <style>
        .content{
            height:120vh;
        }
        #modal-book-message,
        #modal-book-order{
            overflow: hidden;
            height:100vh !important;
        }
        #modal-book-message h4{

        }
        #modal-book-message  .row-content,
        #modal-book-order .row-content{
            height:60vh;
            overflow-y: auto;
        }
        #modal-book-message .message_box{
            padding-bottom:15px;
            margin-bottom:15px;
            border-bottom: 1px solid #ccc;
        }
        #modal-book-message .row-content .comment-box{
            margin-bottom:5px;
            border-bottom: 1px dashed #ccc;
        }
        #modal-book-message .comment-box .time{
            text-align: right;
            font-size:12px;
        }
        .order_message_box:nth-of-type(n+2),
        .order_message_receiving_address_box{
            margin-top:20px;
        }
        .order_message_box{
            border-bottom: 1px dashed #ccc;
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
            <li class="active">
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
                    图书订购
                </button>
            </div>
            <div class="content-wrap col-md-12">
                <div id="book-box" class="col-md-6">
                    <div class="query-wrap col-md-12">
                        <div class="form-group col-md-3">
                            <div class="col-md-4">
                                <label for="query_book_class" class="btn">图书分类</label>
                            </div>
                            <div class="col-md-8">
                                <select id="query_book_class" class="book-class-wrap all-book-class form-control">
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                            <div class="col-md-4">
                                <label for="query_book_name" class="btn">书名</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_book_name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <div class="col-md-4">
                                <label for="query_author" class="btn">作者</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_author" class="form-control">
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
                        <button type="button" class="open-order-btn button button-small button-pill button-primary"
                                data-toggle="modal" data-target="#modal-book-order" data-table="#book-table">
                            <span class="glyphicon glyphicon-plus"></span>
                            订购
                        </button>
                    </div>
                    <table class="table table-responsive" id="book-table"
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
<!-- 图书详情 -->
<div class="modal fade" id="modal-book-message" tabindex="10"  aria-labelledby="modal-book-message-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-book-message-title">《<span id="modal_book_name">思想品德</span>》详情</h4>
            </div>
            <div class="modal-body">
                <div class="row row-content">
                    <div class="col-md-12 center-block">
                        <div class="message_box">
                            <h4>简介</h4>
                            <p id="modal_book_message"></p>
                        </div>
                        <h4 class="text-center">书评</h4>
                        <div class="book_message_comment_container">

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-md-12">
                        <textarea  id="modal_add_comment_content" class="form-control" placeholder="添加书评"
                        style="margin-bottom: 15px;"></textarea>
                    </div>
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                    <button type="submit" class="add-comment-btn btn btn-primary btn-sm">添加</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-book-order" tabindex="10"  aria-labelledby="modal-book-message-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-book-message-title">订购</h4>
            </div>
            <div class="modal-body">
                <div class="row row-content">
                    <div class="col-md-12 center-block">
                        <div id="modal_order_message_container" class="col-md-12">

                        </div>
                        <div id="1" class="col-md-12">
                            <div class="order_message_receiving_address_box row">
                                <div class="col-md-12 form-group">
                                    <div class="col-md-3">
                                        <label for="">收货人</label>
                                    </div>
                                    <div class="col-md-9">
                                        <input id="modal_order_user_name" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12 form-group">
                                    <div class="col-md-3">
                                        <label for="">收货人电话</label>
                                    </div>
                                    <div class="col-md-9">
                                        <input id="modal_order_phone" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12 form-group">
                                    <div class="col-md-3">
                                        <label for="">收货地址</label>
                                    </div>
                                    <div class="col-md-9">
                                        <textarea id="modal_order_receiving_address" class="form-control"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-12 form-group">
                                    <h5 class="pull-right">总价：￥<span id="modal_order_total"></span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-md-12">
                        <textarea  id="modal_order_comment_content" class="form-control" placeholder="备注"
                                   style="margin-bottom: 15px;"></textarea>
                    </div>
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                    <button type="submit" class="order-btn btn btn-primary btn-sm" data-dismiss="modal">订购</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../js/pub/bookSystem.js"></script>
<script src="../js/pub/init.js"></script>
<script src="../js/user/Book.js"></script>
</body>
</html>