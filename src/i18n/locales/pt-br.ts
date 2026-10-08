import type { Dict } from '../dict';

// Machine translated from en.ts; native review welcome.
const ptBr: Dict = {
  meta: {
    title: 'LinMBC — remapeamento de botões do mouse por jogo no Linux',
    description:
      'Remapeie os botões laterais do mouse por jogo no Linux. Os perfis trocam com a janela em foco no KDE Plasma (Wayland). Livre e de código aberto.',
    keywords:
      'remapear mouse linux, botões do mouse, wayland, kde plasma, steam, proton, arpg, alternativa ao x-mouse button control',
  },
  nav: {
    skipToContent: 'Pular para o conteúdo',
    languageLabel: 'Idioma',
    features: 'Recursos',
    install: 'Instalar',
    source: 'Código-fonte',
  },
  hero: {
    badge: 'Alpha',
    title: 'Os botões do seu mouse, um layout diferente para cada jogo.',
    tagline:
      'O LinMBC remapeia botões do mouse para teclas e combinações no Linux e troca de perfil sozinho quando você dá alt-tab para um jogo. Inspirado no X-Mouse Button Control do Windows.',
    ctaInstall: 'Instalar',
    ctaSource: 'Ver no GitHub',
    note: 'Livre e de código aberto · MIT · Wayland primeiro',
    pause: 'Pausar animação',
    play: 'Continuar animação',
    eggTip: 'Mouse com botões laterais? Aperte um aqui em cima.',
    eggRear: 'Lateral de trás → Q',
    eggFront: 'Lateral da frente → Ctrl+2 · Loop até clicar de novo',
    eggFrontOff: 'Lateral da frente → loop parado',
    eggHint:
      'LinMBC: no topo da página, clique em qualquer lugar ou aperte os botões laterais do mouse (o de trás manda Q, o da frente repete Ctrl+2 em loop).',
  },
  screens: {
    mainAlt:
      'Janela principal do LinMBC: perfil do Last Epoch, com o botão lateral de trás enviando Q e o da frente repetindo Ctrl+2 em loop.',
    mappingAlt:
      'Configuração do botão: teclas Ctrl+2, loop até clicar de novo, delay aleatório entre 80 e 140 ms.',
    mappingCaption: 'Cada botão: as teclas, como o clique as envia e o delay.',
  },
  features: {
    title: 'O que ele faz',
    items: [
      {
        title: 'Um perfil por jogo',
        body: 'Os perfis seguem a janela em foco. Deu alt-tab para fora do jogo, os botões voltam ao normal: fora dos jogos vale o perfil Padrão.',
      },
      {
        title: 'Quatro jeitos de clicar',
        body: 'Segurar as teclas junto com o botão, apertar uma vez, repetir em loop até o próximo clique ou repetir N vezes — com delay fixo ou aleatório.',
      },
      {
        title: 'Qualquer tecla ou combinação',
        body: 'Digite “Ctrl+2” ou “er”, ou clique em Gravar e aperte as teclas. Não depende do layout do teclado.',
      },
      {
        title: 'Sua biblioteca da Steam',
        body: '“Adicionar perfil” lista os jogos da Steam instalados e reconhece a janela do jogo para você, Proton incluído.',
      },
      {
        title: 'Funciona no Wayland',
        body: 'Ele trabalha abaixo do compositor, então não depende do X11. O remapeamento roda como serviço em segundo plano e continua com a janela fechada.',
      },
      {
        title: 'Qualquer mouse, a qualquer hora',
        body: 'Todo mouse é reconhecido automaticamente, vários ao mesmo tempo, inclusive um receptor desconectado e conectado de novo.',
      },
    ],
  },
  how: {
    title: 'Como funciona',
    intro:
      'Dois programas pequenos: um serviço em segundo plano que faz o remapeamento e a janela onde você configura.',
    steps: [
      {
        title: 'Lê o mouse',
        body: 'O serviço recebe os eventos do mouse antes do desktop. Ele só abre mouses, nunca teclados.',
      },
      {
        title: 'Sabe qual é o jogo',
        body: 'No KDE Plasma, um pequeno script do KWin informa a janela em foco, e o perfil correspondente entra em ação.',
      },
      {
        title: 'Envia as teclas',
        body: 'Os botões remapeados saem por um teclado e um mouse virtuais, então o jogo vê uma entrada comum.',
      },
      {
        title: 'Falha com segurança',
        body: 'Se algo der errado, todos os mouses são liberados e voltam a funcionar normalmente.',
      },
    ],
  },
  install: {
    title: 'Instalar',
    archTitle: 'Arch Linux e CachyOS',
    archBody:
      'Gera um pacote que instala o app, a regra de permissão para mouses, o serviço em segundo plano e o atalho no menu.',
    enableTitle: 'Ligue agora e a cada login',
    enableBody: 'Depois abra o LinMBC pelo menu de aplicativos e ligue o remapeamento.',
    otherTitle: 'Outras distribuições',
    otherBody:
      'Ainda sem pacote nem teste. O README lista o que um pacote precisa; relatos de outros sistemas são bem-vindos.',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  support: {
    title: 'Onde roda',
    rows: [
      {
        level: 'tested',
        label: 'Testado',
        body: 'Arch Linux / CachyOS com KDE Plasma 6 no Wayland.',
      },
      {
        level: 'limited',
        label: 'Funciona, com limite',
        body: 'Outros desktops: os botões são remapeados, mas só com o perfil Padrão.',
      },
      {
        level: 'untested',
        label: 'Ainda não testado',
        body: 'Debian, Ubuntu, Fedora, openSUSE e outros; Plasma no X11.',
      },
      {
        level: 'unsupported',
        label: 'Não suportado',
        body: 'Sistemas sem systemd-logind.',
      },
    ],
  },
  safety: {
    title: 'Bom saber',
    items: [
      {
        title: 'Só mouses',
        body: 'A regra de permissão dá ao seu usuário acesso aos mouses e a nada mais, então o LinMBC não consegue ler o que você digita.',
      },
      {
        title: 'Jogos online e macros',
        body: 'Remapear um botão para uma tecla é uma troca de entrada comum. Loops e repetições mandam vários comandos por clique, o que alguns jogos online proíbem nos termos de uso. Confira as regras antes.',
      },
      {
        title: 'Alpha',
        body: 'Testado em uma máquina até agora. Espere arestas e, por favor, relate o que quebrar.',
      },
    ],
  },
  footer: {
    license: 'Licença MIT',
    notAffiliated: 'Sem vínculo com a Highrez, criadora do X-Mouse Button Control.',
    issues: 'Relatar um problema',
    madeBy: 'Feito por Johnson Mauro',
  },
};

export default ptBr;
