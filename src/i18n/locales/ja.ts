import type { Dict } from '../dict';

// Machine translated from en.ts; native review welcome.
const ja: Dict = {
  meta: {
    title: 'LinMBC — Linux 向け ゲームごとのマウスボタン割り当て',
    description:
      'Linux でマウスのサイドボタンをゲームごとに割り当て。KDE Plasma（Wayland）ではアクティブなウィンドウに合わせてプロファイルが切り替わります。無料のオープンソース。',
    keywords:
      'linux マウス 割り当て, マウスボタン, wayland, kde plasma, steam, proton, arpg, x-mouse button control 代替',
  },
  nav: {
    skipToContent: '本文へ移動',
    languageLabel: '言語',
    features: '機能',
    install: 'インストール',
    source: 'ソースコード',
  },
  hero: {
    badge: 'アルファ版',
    title: 'マウスのボタンを、ゲームごとに別の配置で。',
    tagline:
      'LinMBC は Linux でマウスのボタンにキーやキーの組み合わせを割り当て、Alt+Tab でゲームに切り替えると自動でプロファイルを切り替えます。Windows 用の X-Mouse Button Control に着想を得ています。',
    ctaInstall: 'インストール',
    ctaSource: 'GitHub で見る',
    note: '無料のオープンソース · MIT · Wayland 優先',
    pause: 'アニメーションを一時停止',
    play: 'アニメーションを再生',
    eggTip: 'サイドボタン付きのマウスなら、ここで押してみてください。',
    eggRear: 'サイド（後ろ） → Q',
    eggFront: 'サイド（前） → Ctrl+2 · もう一度クリックするまでループ',
    eggFrontOff: 'サイド（前） → ループ停止',
    eggHint:
      'LinMBC：ページ上部のどこかをクリックするか、マウスのサイドボタンを押してみてください（後ろは Q、前は Ctrl+2 をループ）。',
  },
  screens: {
    mainAlt:
      'LinMBC のメインウィンドウ：Last Epoch のプロファイル。後ろのサイドボタンが Q を、前のサイドボタンが Ctrl+2 をループ送信。',
    mappingAlt:
      'ボタンの設定：キー Ctrl+2、もう一度クリックするまでループ、遅延は 80〜140 ms のランダム。',
    mappingCaption: 'ボタンごとに：送るキー、クリック時の送り方、遅延。',
  },
  features: {
    title: 'できること',
    items: [
      {
        title: 'ゲームごとのプロファイル',
        body: 'プロファイルはアクティブなウィンドウに追従します。Alt+Tab でゲームを離れればボタンは元どおり。ゲーム外では「既定」プロファイルが使われます。',
      },
      {
        title: '4 つのクリック方式',
        body: 'ボタンを押している間キーを押し続ける、1 回だけ押す、次のクリックまでループする、N 回繰り返す。遅延は固定またはランダム。',
      },
      {
        title: 'どんなキーや組み合わせも',
        body: '「Ctrl+2」や「er」と入力するか、「記録」を押してキーを押すだけ。キーボード配列に依存しません。',
      },
      {
        title: 'Steam ライブラリ対応',
        body: '「プロファイルを追加」でインストール済みの Steam ゲームが一覧表示され、ゲームのウィンドウを自動で照合します。Proton にも対応。',
      },
      {
        title: 'Wayland で動作',
        body: 'コンポジターより下の層で動くため X11 に依存しません。割り当てはバックグラウンドサービスが担当し、ウィンドウを閉じても動き続けます。',
      },
      {
        title: 'どのマウスでも、いつでも',
        body: 'どのマウスも自動で認識。複数台の同時接続や、レシーバーの抜き差しにも対応します。',
      },
    ],
  },
  how: {
    title: '仕組み',
    intro:
      '小さなプログラムが 2 つ：割り当てを行うバックグラウンドサービスと、設定用のウィンドウです。',
    steps: [
      {
        title: 'マウスを読む',
        body: 'サービスはデスクトップより先にマウスのイベントを受け取ります。開くのはマウスだけで、キーボードは決して開きません。',
      },
      {
        title: 'ゲームを知る',
        body: 'KDE Plasma では小さな KWin スクリプトがアクティブなウィンドウを伝え、一致するプロファイルが有効になります。',
      },
      {
        title: 'キーを送る',
        body: '割り当てたボタンは仮想キーボードと仮想マウスから出力されるので、ゲームには普通の入力として届きます。',
      },
      {
        title: '安全に止まる',
        body: '問題が起きたときは、すべてのマウスを解放して通常どおり使える状態に戻します。',
      },
    ],
  },
  install: {
    title: 'インストール',
    archTitle: 'Arch Linux と CachyOS',
    archBody:
      'アプリ本体、マウス用のアクセス権ルール、バックグラウンドサービス、メニュー項目をインストールするパッケージをビルドします。',
    enableTitle: '今すぐ起動し、ログインのたびに自動起動',
    enableBody: 'その後、アプリケーションメニューから LinMBC を開いてオンにします。',
    otherTitle: 'その他のディストリビューション',
    otherBody:
      'まだパッケージもテストもありません。パッケージに必要なものは README にまとめています。他のシステムでの報告を歓迎します。',
    copy: 'コピー',
    copied: 'コピーしました',
  },
  support: {
    title: '動作環境',
    rows: [
      {
        level: 'tested',
        label: 'テスト済み',
        body: 'Arch Linux / CachyOS、KDE Plasma 6（Wayland）。',
      },
      {
        level: 'limited',
        label: '制限付きで動作',
        body: 'その他のデスクトップ：ボタンは割り当てられますが、「既定」プロファイルのみです。',
      },
      {
        level: 'untested',
        label: '未テスト',
        body: 'Debian、Ubuntu、Fedora、openSUSE など。X11 上の Plasma。',
      },
      {
        level: 'unsupported',
        label: '非対応',
        body: 'systemd-logind のないシステム。',
      },
    ],
  },
  safety: {
    title: '知っておきたいこと',
    items: [
      {
        title: 'マウスだけ',
        body: 'アクセス権ルールがあなたのユーザーに許可するのはマウスだけです。LinMBC があなたの入力した文字を読むことはできません。',
      },
      {
        title: 'オンラインゲームとマクロ',
        body: 'ボタンにキーを 1 対 1 で割り当てるのは普通の入力の変更です。ループや繰り返しは 1 クリックで複数の入力を送り、オンラインゲームによっては利用規約で禁止されています。先にルールを確認してください。',
      },
      {
        title: 'アルファ版',
        body: '現時点では 1 台のマシンでのみテストしています。粗い部分があるはずなので、動かない点はぜひ報告してください。',
      },
    ],
  },
  footer: {
    license: 'MIT ライセンス',
    notAffiliated: 'X-Mouse Button Control の開発元 Highrez とは無関係です。',
    issues: '問題を報告',
    madeBy: '制作：Johnson Mauro',
  },
};

export default ja;
