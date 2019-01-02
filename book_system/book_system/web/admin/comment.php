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
    <title>评论管理</title>
    <style>
        .content{
            height:120vh;
        }
        #modal-order-message{
            overflow: hidden;
        }
        #modal-order-message .modal-order-message-content{
            height:40vh;
            background: red;
            margin-bottom:15px;
        }
        #modal-comment-message{
            overflow: hidden;
        }
        #modal-comment-message .modal-body{
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
            <li class="active">
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
                    评论管理
                </button>
            </div>
            <div class="content-wrap col-md-12">
                <div id="book-box" class="col-md-6">
                    <div class="query-wrap col-md-12">
                        <div class="form-group col-md-4">
                            <div class="col-md-12">
                                <div class="col-md-4">
                                    <label for="query_book_type" class="control-label">图书类型</label>
                                </div>
                                <div class="col-md-8">
                                    <select id="query_book_type" class="form-control">

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                            <div class="col-md-4">
                                <label for="query_book_name" class="control-label">书名</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_book_name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                            <button type="button" class="query-btn btn btn-primary">
                                <span class="icon-search"></span>
                                查询
                            </button>
                        </div>
                    </div>
                    <div id="book-toolbar" class="btn-group table-wrap-header">
                        <button type="button" class="adopt-comment-btn button button-small button-pill button-primary">
                            <span class="icon-ok"></span>
                            通过审核
                        </button>
                        <button type="button" class="remove-comment-btn button button-small button-pill button-primary">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            屏蔽评论
                        </button>
                        <button type="button" class="display-all-btn button button-small button-pill button-primary">
                            <span class="icon-eye-open" aria-hidden="true"></span>
                            显示所有
                        </button>
                        <button type="button" class="display-wait-btn button-small button-pill button-primary">
                            <span class="icon-eye-open" aria-hidden="true"></span>
                            显示待审核
                        </button>
                        <button type="button" class="display-adopt-btn button-small button-pill button-primary">
                            <span class="icon-eye-open" aria-hidden="true"></span>
                            显示已通过
                        </button>
                    </div>
                    <table class="table table-responsive" id="comment-table"
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
<!-- 评论详情 -->
<div class="modal fade" id="modal-comment-message" tabindex="-1" role="dialog" aria-labelledby="modal-order-message-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-order-message-title">评论详情</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="modal_comment_user_id">用户id：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="user_id">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="modal_comment_user_name">用户姓名：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text"  class="aInput form-control" data-field="user_name">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="modal_comment_book_id">图书id：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text"  class="aInput form-control" data-field="book_id">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="modal_comment_book_name">书名：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="book_name">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="modal_comment_book_type">图书类型：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text"  class="aInput form-control" data-field="book_type">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="modal_comment_content">评论内容：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="content">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="modal_comment_time">评论时间：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="created_at">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="modal_comment_state">审核状态：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="aInput form-control" data-field="state">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../js/pub/bookSystem.js"></script>
<script src="../js/pub/init.js"></script>
<script src="../js/admin/Comment.js"></script>
</body>
</html>