/**
 * Created by Administrator on 2018/4/22.
 */

var CONFIG = {};

CONFIG.CURRENT_CONTENT_BOX = 0;

// body 状态（不同状态不同的背景颜色）
CONFIG.BODY_STATES = ['home','what-is-ai','future-ai','area','about'];

// 音乐面板 音乐列表
CONFIG.MUSIC_LIST = [
    {
        url: './assets/music/bg.mp3',
    }
];

// 音乐可视化
CONFIG.MUSIC_PANEL_CANVAS_WIDTH = 200;
CONFIG.MUSIC_PANEL_CANVAS_HEIGHT = 120;
CONFIG.MUSIC_PANEL_CANVAS_F_WIDTH = 2;
CONFIG.MUSIC_PANEL_CANVAS_F_HEIGHT = 0;
CONFIG.MUSIC_PANEL_CANVAS_COLOR = "rgba(69,233,203,0.8)";

//  粒子系统
CONFIG.PARTICLE_SYSTEM_COUNT = 250;
CONFIG.PARTICLE_SYSTEM_LINE_RANGE = 200;
CONFIG.PARTICLE_SYSTEM_VX_RANDOM_RANGE = [-1,1];
CONFIG.PARTICLE_SYSTEM_VX_RANDOM_RADIUS = [1,2];
CONFIG.PARTICLE_SYSTEM_COLOR = "rgba(69,233,203,0.2)";
CONFIG.PARTICLE_SYSTEM_LINE_COLOR = "rgba(69,233,203,0.12)";