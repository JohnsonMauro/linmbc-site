import type { Dict } from '../dict';

const en: Dict = {
  meta: {
    title: 'LinMBC — per-game mouse button remapping for Linux',
    description:
      'Remap your mouse side buttons per game on Linux. Profiles switch with the focused window on KDE Plasma (Wayland). Free and open source.',
    keywords:
      'linux mouse remap, mouse buttons, wayland, kde plasma, steam, proton, arpg, x-mouse button control alternative',
  },
  nav: {
    skipToContent: 'Skip to content',
    languageLabel: 'Language',
    features: 'Features',
    install: 'Install',
    source: 'Source code',
  },
  hero: {
    badge: 'Alpha',
    title: 'Your mouse buttons, a different layout for every game.',
    tagline:
      'LinMBC remaps mouse buttons to keys and combos on Linux, and switches profiles by itself when you alt-tab into a game. Inspired by X-Mouse Button Control for Windows.',
    ctaInstall: 'Install',
    ctaSource: 'View on GitHub',
    note: 'Free and open source · MIT · Wayland first',
    pause: 'Pause animation',
    play: 'Play animation',
    eggTip: 'Mouse with side buttons? Press one up here.',
    eggRear: 'Side — rear → Q',
    eggFront: 'Side — front → Ctrl+2 · Loop until clicked again',
    eggFrontOff: 'Side — front → loop stopped',
    eggHint:
      'LinMBC: over the top of the page, click anywhere, or press your mouse side buttons (rear sends Q, front loops Ctrl+2).',
  },
  screens: {
    mainAlt:
      'LinMBC main window: the Game A profile, with the rear side button sending Q and the front side button looping Ctrl+2.',
    mappingAlt:
      'Button settings: keys Ctrl+2, loop until clicked again, random delay between 80 and 140 ms.',
    mappingCaption: 'Each button: keys, how a click sends them, and the delay.',
  },
  features: {
    title: 'What it does',
    items: [
      {
        title: 'A profile per game',
        body: 'Profiles follow the focused window. Alt-tab out of the game and your buttons are back to normal: outside games the Default profile applies.',
      },
      {
        title: 'Four ways to click',
        body: 'Hold the keys with the button, press them once, loop them until the next click, or repeat them N times — with a fixed or random delay.',
      },
      {
        title: 'Any key or combo',
        body: 'Type “Ctrl+2” or “er”, or press Record and hit the keys. Layout independent.',
      },
      {
        title: 'Your Steam library',
        body: '“Add profile” lists your installed Steam games and matches the game window for you, Proton included.',
      },
      {
        title: 'Works on Wayland',
        body: 'It works below the compositor, so it does not depend on X11. The remapping runs as a background service and keeps working with the window closed.',
      },
      {
        title: 'Every mouse, plugged in any time',
        body: 'Any mouse is picked up automatically, several at once, including a receiver unplugged and plugged back.',
      },
    ],
    switches: {
      game: 'Game A',
      otherGame: 'Game B',
      defaultProfile: 'Default',
    },
  },
  how: {
    title: 'How it works',
    intro:
      'Two small programs: a background service that does the remapping, and the window where you set it up.',
    steps: [
      {
        title: 'Reads the mouse',
        body: 'The service takes the mouse events before the desktop sees them. It only ever opens mice, never keyboards.',
      },
      {
        title: 'Knows the game',
        body: 'On KDE Plasma, a tiny KWin script reports the focused window, and the matching profile becomes active.',
      },
      {
        title: 'Sends the keys',
        body: 'Remapped buttons come out of a virtual keyboard and mouse, so games see ordinary input.',
      },
      {
        title: 'Fails safe',
        body: 'If anything goes wrong, every mouse is released and works normally again.',
      },
    ],
  },
  install: {
    title: 'Install',
    archTitle: 'Arch Linux and CachyOS',
    archBody:
      'Builds a package that installs the app, the permission rule for mice, the background service and the menu entry.',
    enableTitle: 'Start it now and at every login',
    enableBody: 'Then open LinMBC from the application menu and switch it on.',
    otherTitle: 'Other distributions',
    otherBody:
      'Not packaged or tested yet. The README lists what a package needs; reports from other systems are welcome.',
    copy: 'Copy',
    copied: 'Copied',
  },
  support: {
    title: 'Where it runs',
    rows: [
      {
        level: 'tested',
        label: 'Tested',
        body: 'Arch Linux / CachyOS with KDE Plasma 6 on Wayland.',
      },
      {
        level: 'limited',
        label: 'Works, with a limit',
        body: 'Other desktops: buttons are remapped, but only with the Default profile.',
      },
      {
        level: 'untested',
        label: 'Not tested yet',
        body: 'Debian, Ubuntu, Fedora, openSUSE and others; Plasma on X11.',
      },
      {
        level: 'unsupported',
        label: 'Not supported',
        body: 'Systems without systemd-logind.',
      },
    ],
  },
  safety: {
    title: 'Good to know',
    items: [
      {
        title: 'Mice only',
        body: 'The permission rule gives your user access to mouse devices and nothing else, so LinMBC cannot read what you type.',
      },
      {
        title: 'Online games and macros',
        body: 'A 1:1 remap is an ordinary input change. Loops and repeats send several inputs per click, which some online games forbid in their terms of service. Check the rules first.',
      },
      {
        title: 'Alpha',
        body: 'Tested on one machine so far. Expect rough edges, and please report what breaks.',
      },
    ],
  },
  footer: {
    license: 'MIT License',
    notAffiliated: 'Not affiliated with Highrez, the makers of X-Mouse Button Control.',
    issues: 'Report a problem',
    madeBy: 'Made by Johnson Mauro',
  },
};

export default en;
