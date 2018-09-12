/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('load', function () {

    var init = function () {

        //  获得节点元素
        var oContainer = document.getElementById('container'),
            oBox = document.querySelector('#content .box'),
            oTable = oBox.getElementsByTagName('table')[0],
            oOptions = document.getElementById('options'),
            oStartBtn = document.getElementById('startBtn'),
            aCustomParameter = Array.from(document.getElementsByClassName('custom')),
            aDifficulty = Array.from(document.querySelectorAll('#difficulty input[type=radio]')),
            oPop = document.getElementsByClassName('pop')[0],
            oTime = document.getElementById('time'),
            oMineCount = document.getElementById('mineCount'),
            oRestartBtn = document.getElementById('restart'),


        // 每个格子尺寸
        singleSize = 25,


        // 地雷的符号
        mineSymbol = "<img src='./images/boom.png'>",


        // 难度级别 col为纵列 row为行列 mine为雷数
        aCount = [{ col: 9, row: 9, mine: 10 }, // 初级
        { col: 16, row: 16, mine: 40 }, // 中级
        { col: 16, row: 30, mine: 99 }, // 高级
        { col: 0, row: 0, mine: 0 // 自定义
        }],

        // 存储游戏配置
        config = {};

        var aData = [],
            // 游戏数据
        lattices = [],
            // 每个格子
        signs = [],
            // 每个格子的标记情况
        time = 0,
            // 时间
        nMineCount = 0,
            // 剩余雷数
        play = null; // 定时器


        function init() {

            // 禁用鼠标右键
            document.addEventListener('contextmenu', function (e) {
                return e.preventDefault();
            });
            // 禁用拖放
            document.addEventListener('dragstart', function (e) {
                return e.preventDefault();
            });

            // 点击开始
            oStartBtn.addEventListener('click', function () {
                var difficulty = getDifficulty(),
                    count = getCount(difficulty);
                count.singleSize = singleSize;
                initSetting(count);
            });
            // 重新开始
            oRestartBtn.addEventListener('click', function () {
                return history.go(0);
            });
        }

        // 开始
        async function start() {

            // 初始化游戏数据
            aData = new Array(config.col * config.row).fill(null);

            // 初始化标记情况
            signs = new Array(config.col * config.row).fill(false);

            // 填充格子
            oTable.innerHTML = new Array(config.col + 1).join('<tr>' + new Array(config.row + 1).join('<td></td>') + '</tr>');

            // 隐藏选项卡
            oOptions.style.display = 'none';

            lattices = Array.from(document.querySelectorAll('.container table td'));

            var buttonNum = void 0,
                isDown = false;

            document.addEventListener('mousedown', function () {
                return isDown = true;
            });
            document.addEventListener('mouseup', function () {
                isDown = false;
                lattices.forEach(function (el) {
                    return removeClass(el, 'at-open');
                });
            });

            // 定义格子大小
            lattices.forEach(function (el, index) {
                el.setAttribute('data-isSing', true);
                el.width = singleSize + 'px';
                el.height = singleSize + 'px';

                el.addEventListener('mousedown', function (e) {
                    buttonNum = e.button;
                    if (buttonNum === 1) {
                        addOpening(el, index);
                    }
                });
                el.addEventListener('mouseout', function () {
                    if (!isDown) return;
                    removeOpening(el, index);
                });
                el.addEventListener('mouseover', function () {
                    if (!isDown) return;
                    addOpening(el, index);
                });
                el.addEventListener('mouseup', function () {
                    switch (buttonNum) {
                        case 0:
                            open(el, index);
                            break;
                        case 1:
                            opens(el, index);
                            break;
                        case 2:
                            sign(el, index);
                            break;
                    }
                });
            });

            addMine();
            addNum();

            oContainer.style.display = 'block';
            nMineCount = config.mine;
            oMineCount.innerHTML = nMineCount;
            update();
        }

        // 添加边界格子样式
        function addOpening(el, index) {
            if (hasClass(el, 'sign')) return;
            addClass(el, 'at-open');
            isBoundary(index).then(function (pos) {
                pos.forEach(function (el) {
                    if (!hasClass(lattices[el], 'sign')) {
                        addClass(lattices[el], 'at-open');
                    }
                });
            });
        }

        // 删除边界格子样式
        function removeOpening(el, index) {
            removeClass(el, 'at-open');
            isBoundary(index).then(function (pos) {
                pos.forEach(function (el) {
                    return removeClass(lattices[el], 'at-open');
                });
            });
        }

        // 一键开雷
        function opens(el, index) {
            removeOpening(el, index);
            if (!hasClass(el, 'open')) return;
            var num = aData[index],
                count = 0;
            isBoundary(index).then(async function (pos) {
                pos.forEach(function (el) {
                    if (hasClass(lattices[el], 'sign')) {
                        count++;
                    }
                });
            }).then(function () {
                if (num > count) return;
                isBoundary(index).then(function (pos) {
                    pos.forEach(function (el) {
                        var elem = lattices[el];
                        if (!hasClass(elem, 'open') && !hasClass(elem, 'sign')) {
                            open(lattices[el], el);
                            if (aData[el] === mineSymbol) {
                                end(false);
                            }
                        }
                    });
                });
            });
        }

        // 点击开雷
        function open(el, index) {
            // 如何点击的格子已标记则不做任何事直接返回
            if (hasClass(el, 'sign')) return;
            addClass(el, 'open'); // 否则添加类
            el.innerHTML = aData[index] !== 0 ? aData[index] : ''; // 显示相应数据
            // 如何点击的是雷 则结束
            if (aData[index] === mineSymbol) {
                addClass(el, 'mine');
                end(false);
                return;
            }
            // 使用递归开雷
            openMine(index);
        }

        // 标记
        function sign(el, index) {
            if (!hasClass(el, 'open')) {
                signs[index] = !signs[index];
                signs[index] ? nMineCount-- : nMineCount++;
                signs[index] ? addClass(el, 'sign') : removeClass(el, 'sign');
                oMineCount.innerHTML = nMineCount;
                if (nMineCount === 0) {
                    isEnd();
                }
            }
        }

        // 开雷
        function openMine(index) {
            if (aData[index] !== '' && aData[index] !== 0) return;
            isBoundary(index).then(function (pos) {
                pos.forEach(function (el) {
                    if (hasClass(lattices[el], 'sign')) return;
                    if (aData[el] === '') {
                        aData[el] = 0;
                        aData[index] = 0;
                        addClass(lattices[el], 'open');
                        openMine(el);
                    } else if (aData[el] !== 0) {
                        lattices[el].innerHTML = aData[el];
                        addClass(lattices[el], 'open');
                    }
                });
            });
        }

        // 添加数字
        function addNum() {
            var _addNum = function _addNum(pos, index) {
                aData[index] = 0;
                pos.forEach(function (el) {
                    if (aData[el] && aData[el] === mineSymbol) {
                        aData[index]++;
                    }
                });
                if (aData[index] === 0) {
                    aData[index] = '';
                }
            };
            aData.forEach(function (el, index) {
                if (el === mineSymbol) {
                    return;
                }
                isBoundary(index).then(function (pos) {
                    _addNum(pos, index);
                }).catch(function (err) {
                    return console.log(err);
                });
            });
        }

        // 放雷
        function addMine() {
            for (var i = 0; i < config.mine; i++) {
                var rnd1 = ~~(Math.random() * aData.length),
                    data = aData[rnd1];
                if (data !== null) {
                    i--;
                } else {
                    data = mineSymbol;
                    aData[rnd1] = data;
                }
            }
        }

        // 检测边界
        async function isBoundary(index) {
            var pos = [];
            switch (true) {
                // 第一行第一个
                case index === 0:
                    pos = [index + 1, index + config.row, index + config.row + 1];
                    break;
                // 第一行倒数第一个
                case index === config.row - 1:
                    pos = [index - 1, index + config.row, index + config.row - 1];
                    break;
                // 最后一行最后一个
                case index === config.row * config.col - 1:
                    pos = [index - 1, index - config.row, index - config.row - 1];
                    break;
                // 最后一行第一个
                case index === config.row * config.col - config.row:
                    pos = [index + 1, index - config.row, index - config.row + 1];
                    break;
                // 第一行
                case index > 0 && index < config.col:
                    pos = [index - 1, index + 1, index + config.row, index + config.row - 1, index + config.row + 1];
                    break;
                // 最后一列
                case index < config.row * config.col && index > config.row * config.col - config.row:
                    pos = [index - 1, index + 1, index - config.row, index - config.row - 1, index - config.row + 1];
                    break;
                // 第一列
                case (index - 0) % config.row === 0:
                    pos = [index + 1, index + config.row, index - config.row, index - config.row + 1, index + config.row + 1];
                    break;
                // 最后一行
                case (index - (config.row - 1)) % config.row === 0:
                    pos = [index - 1, index + config.row, index - config.row, index - config.row - 1, index + config.row - 1];
                    break;
                // 其他
                default:
                case 2:
                    pos = [index - 1, index + 1, index + config.row, index - config.row, index - config.row - 1, index - config.row + 1, index + config.row - 1, index + config.row + 1];
                    break;
            }
            return pos;
        }

        // 获得难度级别
        function getDifficulty() {
            for (var i = 0; i < aDifficulty.length; i++) {
                if (aDifficulty[i].checked) {
                    return aDifficulty[i].value;
                }
            }
        }

        // 获得格子数量及雷数
        function getCount(difficulty) {
            var count = {};
            if (parseInt(difficulty) === 3) {
                count.row = parseInt(aCustomParameter[0].value);
                count.col = parseInt(aCustomParameter[1].value);
                count.mine = parseInt(aCustomParameter[2].value);
                return count;
            }
            count.row = aCount[difficulty].row;
            count.col = aCount[difficulty].col;
            count.mine = aCount[difficulty].mine;
            return count;
        }

        // 初始化设置
        function initSetting(options) {
            for (var i in options) {
                config[i] = options[i];
            }
            start();
        }

        // 计时
        function update() {
            play = setInterval(function () {
                time++;
                oTime.innerHTML = time;
            }, 1000);
        }

        // 游戏结束
        function end(start) {
            clearInterval(play);
            aData.forEach(function (el, index) {
                if (el === mineSymbol) {
                    lattices[index].innerHTML = mineSymbol;
                    addClass(lattices[index], 'mine');
                }
            });
            var oSpan = oPop.getElementsByTagName('span')[0];
            addClass(oPop, 'display');
            oSpan.innerHTML = start ? '成功！' : '失败！';
            setTimeout(function () {
                addClass(oSpan, 'display');
            }, 500);
        }

        // 判断结束
        function isEnd() {
            var _count = 0;
            aData.forEach(function (el, index) {
                if (el === mineSymbol) {
                    if (!hasClass(lattices[index], 'sign')) {
                        _count++;
                    }
                }
            });
            end(_count === 0);
        }

        /* 辅助操作函数类 */

        // 判断某个节点是否存在某个类名
        function hasClass(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }
        // 添加类名
        function addClass(obj, cls) {
            if (!hasClass(obj, cls)) obj.className += " " + cls;
        }
        // 删除类名
        function removeClass(obj, cls) {
            if (hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }

        return init;
    }();

    init();
});

/***/ })
/******/ ]);