import type { Dict } from '../dict';

// Machine translated from en.ts; native review welcome.
const ko: Dict = {
  meta: {
    title: 'LinMBC — 리눅스용 게임별 마우스 버튼 재지정',
    description:
      '리눅스에서 마우스 측면 버튼을 게임마다 다르게 지정하세요. KDE Plasma(Wayland)에서는 활성 창에 따라 프로필이 바뀝니다. 무료 오픈 소스.',
    keywords:
      '리눅스 마우스 재지정, 마우스 버튼, wayland, kde plasma, steam, proton, arpg, x-mouse button control 대안',
  },
  nav: {
    skipToContent: '본문으로 건너뛰기',
    languageLabel: '언어',
    features: '기능',
    install: '설치',
    source: '소스 코드',
  },
  hero: {
    badge: '알파',
    title: '마우스 버튼을 게임마다 다른 배치로.',
    tagline:
      'LinMBC는 리눅스에서 마우스 버튼에 키와 키 조합을 지정하고, Alt+Tab으로 게임에 들어가면 알아서 프로필을 바꿉니다. Windows용 X-Mouse Button Control에서 영감을 받았습니다.',
    ctaInstall: '설치',
    ctaSource: 'GitHub에서 보기',
    note: '무료 오픈 소스 · MIT · Wayland 우선',
    pause: '애니메이션 일시 정지',
    play: '애니메이션 재생',
    eggTip: '측면 버튼이 있는 마우스라면 여기서 눌러 보세요.',
    eggRear: '측면 뒤쪽 → Q',
    eggFront: '측면 앞쪽 → Ctrl+2 · 다시 클릭할 때까지 반복',
    eggFrontOff: '측면 앞쪽 → 반복 중지',
    eggHint:
      'LinMBC: 페이지 위쪽 아무 곳이나 클릭하거나 마우스 측면 버튼을 눌러 보세요(뒤쪽은 Q, 앞쪽은 Ctrl+2 반복).',
  },
  screens: {
    mainAlt:
      'LinMBC 기본 창: 게임 A 프로필에서 뒤쪽 측면 버튼은 Q를, 앞쪽 측면 버튼은 Ctrl+2를 반복 전송합니다.',
    mappingAlt: '버튼 설정: 키 Ctrl+2, 다시 클릭할 때까지 반복, 80~140 ms 사이의 무작위 지연.',
    mappingCaption: '버튼마다: 보낼 키, 클릭 시 보내는 방식, 지연.',
  },
  features: {
    title: '주요 기능',
    items: [
      {
        title: '게임마다 프로필',
        body: '프로필은 활성 창을 따라갑니다. Alt+Tab으로 게임을 벗어나면 버튼이 원래대로 돌아오고, 게임 밖에서는 기본 프로필이 적용됩니다.',
      },
      {
        title: '네 가지 클릭 방식',
        body: '버튼을 누르는 동안 키 유지, 한 번 누르기, 다음 클릭까지 반복, N번 반복 — 고정 또는 무작위 지연과 함께.',
      },
      {
        title: '어떤 키나 조합이든',
        body: '“Ctrl+2”나 “er”을 입력하거나, 녹화를 누르고 키를 누르세요. 키보드 배열과 무관합니다.',
      },
      {
        title: 'Steam 라이브러리',
        body: '“프로필 추가”에서 설치된 Steam 게임 목록을 보여 주고 게임 창을 자동으로 맞춰 줍니다. Proton도 지원합니다.',
      },
      {
        title: 'Wayland에서 동작',
        body: '컴포지터 아래에서 동작하므로 X11에 의존하지 않습니다. 재지정은 백그라운드 서비스가 맡아 창을 닫아도 계속 동작합니다.',
      },
      {
        title: '어떤 마우스든, 언제든',
        body: '모든 마우스를 자동으로 인식합니다. 여러 대를 동시에, 리시버를 뺐다 다시 꽂아도 됩니다.',
      },
    ],
    switches: {
      game: '게임 A',
      otherGame: '게임 B',
      defaultProfile: '기본',
    },
  },
  how: {
    title: '작동 방식',
    intro: '작은 프로그램 두 개: 재지정을 수행하는 백그라운드 서비스와 설정하는 창입니다.',
    steps: [
      {
        title: '마우스 읽기',
        body: '서비스는 데스크톱보다 먼저 마우스 이벤트를 받습니다. 마우스만 열고 키보드는 절대 열지 않습니다.',
      },
      {
        title: '게임 인식',
        body: 'KDE Plasma에서는 작은 KWin 스크립트가 활성 창을 알려 주고, 일치하는 프로필이 활성화됩니다.',
      },
      {
        title: '키 전송',
        body: '재지정된 버튼은 가상 키보드와 마우스로 나가므로 게임은 평범한 입력으로 받습니다.',
      },
      {
        title: '안전한 실패',
        body: '문제가 생기면 모든 마우스를 놓아 주어 다시 정상적으로 동작합니다.',
      },
    ],
  },
  install: {
    title: '설치',
    archTitle: 'Arch Linux와 CachyOS',
    archBody:
      '앱, 마우스 접근 권한 규칙, 백그라운드 서비스, 메뉴 항목을 설치하는 패키지를 빌드합니다.',
    enableTitle: '지금 시작하고 로그인할 때마다 실행',
    enableBody: '그런 다음 애플리케이션 메뉴에서 LinMBC를 열고 켜세요.',
    otherTitle: '다른 배포판',
    otherBody:
      '아직 패키지와 테스트가 없습니다. 패키지에 필요한 내용은 README에 있으며, 다른 시스템에서의 보고를 환영합니다.',
    copy: '복사',
    copied: '복사됨',
  },
  support: {
    title: '지원 환경',
    rows: [
      {
        level: 'tested',
        label: '테스트됨',
        body: 'Arch Linux / CachyOS, KDE Plasma 6(Wayland).',
      },
      {
        level: 'limited',
        label: '제한적으로 동작',
        body: '다른 데스크톱: 버튼은 재지정되지만 기본 프로필만 사용됩니다.',
      },
      {
        level: 'untested',
        label: '아직 테스트 안 됨',
        body: 'Debian, Ubuntu, Fedora, openSUSE 등; X11의 Plasma.',
      },
      {
        level: 'unsupported',
        label: '지원 안 함',
        body: 'systemd-logind가 없는 시스템.',
      },
    ],
  },
  safety: {
    title: '알아 두면 좋은 점',
    items: [
      {
        title: '마우스만',
        body: '접근 권한 규칙은 사용자에게 마우스에 대한 접근만 허용하므로 LinMBC는 입력하는 내용을 읽을 수 없습니다.',
      },
      {
        title: '온라인 게임과 매크로',
        body: '버튼에 키를 1:1로 지정하는 것은 일반적인 입력 변경입니다. 반복과 루프는 클릭 한 번에 여러 입력을 보내며, 일부 온라인 게임은 이용 약관에서 이를 금지합니다. 먼저 규칙을 확인하세요.',
      },
      {
        title: '알파',
        body: '지금까지 한 대의 컴퓨터에서만 테스트했습니다. 다듬어지지 않은 부분이 있을 수 있으니 문제가 있으면 알려 주세요.',
      },
    ],
  },
  footer: {
    license: 'MIT 라이선스',
    notAffiliated: 'X-Mouse Button Control 제작사 Highrez와 관련이 없습니다.',
    issues: '문제 신고',
    madeBy: '제작: Johnson Mauro',
  },
};

export default ko;
