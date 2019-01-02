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
    <title>图书管理</title>
    <style>
        .content{
            height:120vh;
        }
        #modal-book-message{
            overflow: hidden;
            height:100vh !important;
        }
        #modal-book-message h4{

        }
        #modal-book-message  .row-content{
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
            <li><a href="../index.php">
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
            <li class="active">
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
            <li>
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
                    图书管理
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
                        <button type="button" class="get-class-btn button button-small button-pill button-primary"
                                data-toggle="modal" data-target="#modal-add-book">
                            <span class="glyphicon glyphicon-plus"></span>
                            添加新书
                        </button>
                        <button type="button" class="open-update-btn get-class-btn button button-small button-pill button-primary"
                            data-table="#book-table" data-toggle="modal" data-target="#modal_update_book">
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            修改图书信息
                        </button>
                        <button type="button" class="remove-book-btn button button-small button-pill button-primary">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            删除图书
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
        <span>@广州大学华软软件学院    计算机系   16web2 1640706178  蔡敏华   </span>
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
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-add-book" tabindex="-1" role="dialog" aria-labelledby="modal-add-book-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-add-book-title">添加新书</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_book_name">书名：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="add_book_name" class="add_aInput form-control" placeholder="书名">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_author">作者：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="add_author" class="add_aInput form-control" placeholder="作者">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_book_type">图书类型：</label>
                        </div>
                        <div class="col-md-8">
                            <select id="add_book_type" class="book-class-wrap add_aInput form-control">

                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_publishing_time">出版时间：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="date" id="add_publishing_time" class="add_aInput form-control" placeholder="出版时间">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_press">出版社：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="add_press" class="add_aInput form-control" placeholder="出版社">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_price">价格：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="add_price" class="add_aInput form-control" placeholder="价格">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_stock">库存：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="number" id="add_stock" class="add_aInput form-control" placeholder="库存">
                        </div>
                    </div>
                    
                    
                    
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_message">简介：</label>
                        </div>
                        <div class="col-md-8">
                            <textarea id="add_message" class="add_aInput form-control" placeholder="简介"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" class="add-book-btn btn btn-primary btn-sm" data-dismiss="modal">添加</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal_update_book" tabindex="-1" role="dialog" aria-labelledby="modal-add-book-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-add-book-title">修改《<span id="update_book_name_title"></span>》信息</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_book_name">书名：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="update_book_name" class="update_aInput form-control" placeholder="书名">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_author">作者：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="update_author" class="update_aInput form-control" placeholder="作者">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_book_type">图书类型：</label>
                        </div>
                        <div class="col-md-8">
                            <select id="update_book_type" class="book-class-wrap update_aInput form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="updte_publishing_time">出版时间：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="date" id="update_publishing_time" class="update_aInput form-control" placeholder="出版时间">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_press">出版社：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="update_press" class="update_aInput form-control" placeholder="出版社">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_price">价格：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="update_price" class="update_aInput form-control" placeholder="价格">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_stock">库存：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="number" id="update_stock" class="update_aInput form-control" placeholder="库存">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_message">简介：</label>
                        </div>
                        <div class="col-md-8">
                            <textarea id="update_message" class="update_aInput form-control" placeholder="简介"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" class="update-btn btn btn-primary btn-sm" data-dismiss="modal">添加</button>
            </div>
        </div>
    </div>
</div>

<script src="../js/pub/bookSystem.js"></script>
<script src="../js/pub/init.js"></script>
<script src="../js/admin/Book.js"></script>
</body>
</html>