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
    <script src="../bootstrap/Highcharts-6.0.3/code/highcharts.js"></script>
    <script src="../bootstrap/Highcharts-6.0.3/code/modules/exporting.js"></script>
    <title>首页</title>
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
            <li class="active">
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
                    首页
                </button>
                <button type="button" class="button button-primary button-small">
                    <span class="icon-info-sign"></span>
                    系统信息
                </button>
            </div>
            <div class="content-wrap col-md-12">
                <div id="index-box" class="col-md-6">
                    <div class="text">
                        <h2>Web 网上书店</h2>
                        <p>
                            书店现有正式职工49人，其中正高职称1人，副高职称14人，中级职称19人，具有大学本科以上学历36人，
                            专科学历 5人，形成了一支结构合理的图书馆员队伍，为展开现代化的图书馆服务提供了保障。
                            图书馆设有办公室、采编部、期刊部、 参考咨询部、阅览部、流通部、技术部、城区分馆八个部（室）。
                            图书馆现有4000多个阅览座位，1200个信息点，拥有纸本藏书100余万册，电子图书镜像40.6万册，共享77万册，
                            试用240万种；纸文中文期刊1388种，电子版中文期刊10100种；纸文外文期刊298种，电子版外文期刊近400余种。
                            图书馆已拥有国内较大型的文献信息资源数据库：如中国期刊网、超星电子图书、万丈数据库、
                            Springer电子期刊全文 数据库、维普科技期刊、网上报告厅、视频教育资源等正式数据库及博爱网、
                            人大数据库、中国经济信息网、搜数网、圣典 E-BOOK、北大法意数据库、方略学科导航等多个试用数据库，
                            为学校教师的教学与科研以及学生的学习与考研提供了极为丰富的 文献信息资源。
                        </p>
                        <div id="highcharts_container"></div>
                    </div>
                </div>
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
                    <table class="table table-responsive" id="system-info-table"
                           data-classes="table table-hover">
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
<div class="modal fade" id="info-message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">维护信息</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <p class="modal-info-content">
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                        这是一段系统维护的信息内容。。
                    </p>
                    <p class="time">2017-12-14</p>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="../js/pub/bookSystem.js"></script>
<script src="../js/pub/init.js"></script>
<script src="../js/pub/init_highcharts.js"></script>
<script src="../js/admin/SystemInfo.js"></script>
</body>
</html>