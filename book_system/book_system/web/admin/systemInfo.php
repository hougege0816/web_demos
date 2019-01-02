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
    <title>系统信息管理</title>
    <style>
        .content{
            height:100vh;
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
                <button type="button" class="button button-action button-primary button-small">
                    <span class="icon-info-sign"></span>
                    系统信息
                </button>
            </div>
            <div class="content-wrap col-md-12">
                <div id="systemInfo-box" class="col-md-6">
                    <div class="query-wrap col-md-12">
                        <div class="form-group col-md-4">
                            <div class="col-md-6">
                                <label for="query_info_type" class="btn">信息类型</label>
                            </div>
                            <div class="col-md-6">
                                <select id="query_info_type" class="form-control">
                                    <option value="all">全部</option>
                                    <option value="维护信息">维护信息</option>
                                    <option value="系统信息">系统信息</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <div class="col-md-4">
                                <label for="query_info_content" class="btn">信息内容</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="query_info_content" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <button type="button" class="query-btn btn btn-primary">
                                <span class="icon-search"></span>
                                查询
                            </button>
                        </div>
                    </div>
                    <div id="system-info-toolbar" class="btn-group table-wrap-header">
                        <button type="button" class="button button-small button-pill button-primary"
                        data-toggle="modal" data-target="#add-system-info">
                            <span class="glyphicon glyphicon-plus"></span>
                            发布
                        </button>
                        <button type="button" class="open-update-btn button button-small button-pill button-primary"
                         data-table="#system-info-table" data-toggle="modal" data-target="#update-system-info">
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            修改
                        </button>
                        <button type="button" class="remove-info-btn button button-small button-pill button-primary">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            删除
                        </button>
                    </div>
                    <table class="table table-responsive" id="system-info-table"
                           data-classes="table table-hover"
                           data-toolbar="#system-info-toolbar">
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
<!-- 发布系统信息 -->
<div class="modal fade" id="add-system-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">发布系统信息</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_info_type">信息类型：</label>
                        </div>
                        <div class="col-md-8">
                            <select id="add_info_type" class="aInput form-control">
                                <option value="系统信息">系统信息</option>
                                <option value="维护信息">维护信息</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="add_info_content">信息内容：</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" id="add_info_content" class="aInput form-control" placeholder="信息内容">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" class="add-system-info-btn btn btn-primary btn-sm" data-dismiss="modal">发布</button>
            </div>
        </div>
    </div>
</div>
<!-- 系统信息详情 -->
<div class="modal fade" id="info-message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="myModalLabel"></h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <p class="modal-info-content">

                    </p>
                    <p class="time"></p>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 秀海系统信息 -->
<div class="modal fade" id="update-system-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">修改系统信息</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_info_type">信息类型：</label>
                        </div>
                        <div class="col-md-8">
                            <select id="update_info_type" class="aInput form-control">
                                <option value="系统信息">系统信息</option>
                                <option value="维护信息">维护信息</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3">
                            <label for="update_info_content">信息内容：</label>
                        </div>
                        <div class="col-md-8">
                            <textarea id="update_info_content" class="aInput form-control"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" class="update-btn btn btn-primary btn-sm" data-dismiss="modal">更新</button>
            </div>
        </div>
    </div>
</div>
<script src="../js/pub/bookSystem.js"></script>
<script src="../js/pub/init.js"></script>
<script src="../js/admin/SystemInfo.js"></script>
</body>
</html>