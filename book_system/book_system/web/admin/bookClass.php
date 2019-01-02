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
    <title>图书分类管理</title>
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
        #modal-book-message  .content{
            height:60vh;
            overflow-y: auto;
        }
        #modal-book-message .message_box{
            padding-bottom:15px;
            margin-bottom:15px;
            border-bottom: 1px solid #ccc;
        }
        #modal-book-message .content .comment-box{
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
            <li><a href="../book_system/index.php">
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
            <li class="active">
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
                    图书分类管理
                </button>
            </div>
            <div class="content-wrap col-md-12">
                <div id="book-box" class="col-md-6">
                    <div class="query-wrap col-md-12">
                        <div class="form-group col-md-5">
                            <div class="col-md-4">
                                <label for="query_class_id" class="btn">图书分类号</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_class_id" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-md-5">
                            <div class="col-md-4">
                                <label for="query_class_name" class="btn">图书分类名称</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_class_name" class="form-control">
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
                                data-toggle="modal" data-target="#modal-add-book-class">
                            <span class="glyphicon glyphicon-plus"></span>
                            添加图书分类
                        </button>
                        <button type="button" class="open-update-btn button button-small button-pill button-primary"
                                data-toggle="modal" data-target="#modal-update-book-class" data-table="#book-class-table">
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            修改图书分类信息
                        </button>
                        <button type="button" class="remove-book-class-btn button button-small button-pill button-primary">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            删除图书分类
                        </button>
                    </div>
                    <table class="table table-responsive" id="book-class-table"
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
<div class="modal fade" id="modal-add-book-class" tabindex="-1" role="dialog" aria-labelledby="modal-add-book-title">
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
                            <label for="add_class_name">图书分类名称：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="add_class_name" class="aInput form-control" placeholder="图书分类名称">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_class_message">备注：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="add_class_message" class="aInput form-control" placeholder="备注">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" class="add-book-class-btn btn btn-primary btn-sm" data-dismiss="modal">添加</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-update-book-class" tabindex="-1" role="dialog" aria-labelledby="modal-add-book-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="modal-add-book-title">修改图书分类<span>123</span>信息</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_class_name">图书分类名称：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="update_class_name" class="update_aInput form-control" placeholder="图书分类名称">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_class_message">备注：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="update_class_message" class="update_aInput form-control" placeholder="备注">
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
<script src="../js/admin/BookClass.js"></script>

</body>
</html>