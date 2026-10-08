import type { Dict } from '../dict';

// Machine translated from en.ts; native review welcome.
const zhCn: Dict = {
  meta: {
    title: 'LinMBC — Linux 上按游戏重新映射鼠标按键',
    description:
      '在 Linux 上为每个游戏单独映射鼠标侧键。在 KDE Plasma（Wayland）上，配置随当前活动窗口自动切换。免费开源。',
    keywords:
      'linux 鼠标映射, 鼠标按键, wayland, kde plasma, steam, proton, arpg, x-mouse button control 替代',
  },
  nav: {
    skipToContent: '跳到正文',
    languageLabel: '语言',
    features: '功能',
    install: '安装',
    source: '源代码',
  },
  hero: {
    badge: 'Alpha 版',
    title: '你的鼠标按键，每个游戏一套布局。',
    tagline:
      'LinMBC 在 Linux 上把鼠标按键映射为按键和组合键，并在你 Alt+Tab 切入游戏时自动切换配置。灵感来自 Windows 上的 X-Mouse Button Control。',
    ctaInstall: '安装',
    ctaSource: '在 GitHub 上查看',
    note: '免费开源 · MIT · Wayland 优先',
    pause: '暂停动画',
    play: '播放动画',
    eggTip: '鼠标有侧键吗？在这里按一下试试。',
    eggRear: '侧键（后） → Q',
    eggFront: '侧键（前） → Ctrl+2 · 循环直到再次点击',
    eggFrontOff: '侧键（前） → 循环已停止',
    eggHint:
      'LinMBC：在页面顶部任意位置点击，或按下鼠标侧键（后侧键发送 Q，前侧键循环发送 Ctrl+2）。',
  },
  screens: {
    mainAlt: 'LinMBC 主窗口：Last Epoch 的配置，后侧键发送 Q，前侧键循环发送 Ctrl+2。',
    mappingAlt: '按键设置：按键 Ctrl+2，循环直到再次点击，随机延迟 80–140 ms。',
    mappingCaption: '每个按键：发送的按键、点击时的发送方式，以及延迟。',
  },
  features: {
    title: '功能',
    items: [
      {
        title: '每个游戏一套配置',
        body: '配置跟随当前活动窗口。Alt+Tab 离开游戏，按键就恢复正常：游戏之外使用“默认”配置。',
      },
      {
        title: '四种点击方式',
        body: '按住按键期间一直按住、按一次、循环直到下次点击，或重复 N 次——延迟可固定也可随机。',
      },
      {
        title: '任意按键或组合键',
        body: '输入“Ctrl+2”或“er”，或点击“录制”后按下按键。与键盘布局无关。',
      },
      {
        title: '你的 Steam 游戏库',
        body: '“添加配置”会列出已安装的 Steam 游戏，并自动匹配游戏窗口，Proton 游戏也可以。',
      },
      {
        title: '支持 Wayland',
        body: '它工作在合成器之下，因此不依赖 X11。映射由后台服务完成，关闭窗口后依然有效。',
      },
      {
        title: '任何鼠标，随时接入',
        body: '任何鼠标都会被自动识别，可同时使用多个，接收器拔出再插入也没问题。',
      },
    ],
    switches: {
      game: '游戏 A',
      otherGame: '游戏 B',
      defaultProfile: '默认',
    },
  },
  how: {
    title: '工作原理',
    intro: '两个小程序：负责映射的后台服务，以及用来设置的窗口。',
    steps: [
      {
        title: '读取鼠标',
        body: '后台服务在桌面之前接收鼠标事件。它只打开鼠标，从不打开键盘。',
      },
      {
        title: '识别游戏',
        body: '在 KDE Plasma 上，一个小小的 KWin 脚本报告当前活动窗口，匹配的配置随即生效。',
      },
      {
        title: '发送按键',
        body: '映射后的按键通过虚拟键盘和虚拟鼠标发出，游戏看到的是普通输入。',
      },
      {
        title: '安全失败',
        body: '一旦出错，所有鼠标都会被释放，恢复正常使用。',
      },
    ],
  },
  install: {
    title: '安装',
    archTitle: 'Arch Linux 与 CachyOS',
    archBody: '构建一个软件包，安装应用、鼠标访问权限规则、后台服务和菜单项。',
    enableTitle: '立即启动，并在每次登录时启动',
    enableBody: '然后从应用程序菜单打开 LinMBC 并开启。',
    otherTitle: '其他发行版',
    otherBody: '尚未打包或测试。README 列出了打包所需的内容，欢迎反馈其他系统上的情况。',
    copy: '复制',
    copied: '已复制',
  },
  support: {
    title: '运行环境',
    rows: [
      {
        level: 'tested',
        label: '已测试',
        body: 'Arch Linux / CachyOS，KDE Plasma 6（Wayland）。',
      },
      {
        level: 'limited',
        label: '可用，但有限制',
        body: '其他桌面：按键可以映射，但只能使用“默认”配置。',
      },
      {
        level: 'untested',
        label: '尚未测试',
        body: 'Debian、Ubuntu、Fedora、openSUSE 等；X11 上的 Plasma。',
      },
      {
        level: 'unsupported',
        label: '不支持',
        body: '没有 systemd-logind 的系统。',
      },
    ],
  },
  safety: {
    title: '须知',
    items: [
      {
        title: '只访问鼠标',
        body: '访问权限规则只允许你的用户访问鼠标设备，因此 LinMBC 无法读取你输入的内容。',
      },
      {
        title: '在线游戏与宏',
        body: '把一个按键一对一映射为另一个按键是普通的输入更改。循环和重复会在一次点击中发送多个输入，部分在线游戏的服务条款禁止这样做。请先查看规则。',
      },
      {
        title: 'Alpha 版',
        body: '目前只在一台机器上测试过。可能还有粗糙之处，遇到问题请反馈。',
      },
    ],
  },
  footer: {
    license: 'MIT 许可证',
    notAffiliated: '与 X-Mouse Button Control 的开发者 Highrez 无关。',
    issues: '报告问题',
    madeBy: '作者：Johnson Mauro',
  },
};

export default zhCn;
