import type { Dict } from '../dict';

// Machine translated from en.ts; native review welcome.
const es: Dict = {
  meta: {
    title: 'LinMBC — reasignación de botones del ratón por juego en Linux',
    description:
      'Reasigna los botones laterales del ratón por juego en Linux. Los perfiles cambian con la ventana activa en KDE Plasma (Wayland). Libre y de código abierto.',
    keywords:
      'reasignar ratón linux, botones del ratón, wayland, kde plasma, steam, proton, arpg, alternativa a x-mouse button control',
  },
  nav: {
    skipToContent: 'Saltar al contenido',
    languageLabel: 'Idioma',
    features: 'Funciones',
    install: 'Instalar',
    source: 'Código fuente',
  },
  hero: {
    badge: 'Alpha',
    title: 'Los botones de tu ratón, una distribución distinta para cada juego.',
    tagline:
      'LinMBC reasigna botones del ratón a teclas y combinaciones en Linux, y cambia de perfil por sí solo cuando haces alt-tab a un juego. Inspirado en X-Mouse Button Control para Windows.',
    ctaInstall: 'Instalar',
    ctaSource: 'Ver en GitHub',
    note: 'Libre y de código abierto · MIT · Wayland primero',
  },
  screens: {
    mainAlt:
      'Ventana principal de LinMBC: el perfil de Last Epoch, con el botón lateral trasero enviando Q y el delantero repitiendo Ctrl+2 en bucle.',
    mappingAlt:
      'Ajustes del botón: teclas Ctrl+2, bucle hasta volver a pulsar, retardo aleatorio entre 80 y 140 ms.',
    mappingCaption: 'Cada botón: las teclas, cómo las envía un clic y el retardo.',
  },
  features: {
    title: 'Qué hace',
    items: [
      {
        title: 'Un perfil por juego',
        body: 'Los perfiles siguen a la ventana activa. Sal del juego con alt-tab y tus botones vuelven a la normalidad: fuera de los juegos se aplica el perfil Predeterminado.',
      },
      {
        title: 'Cuatro formas de hacer clic',
        body: 'Mantener las teclas con el botón, pulsarlas una vez, repetirlas en bucle hasta el siguiente clic o repetirlas N veces, con un retardo fijo o aleatorio.',
      },
      {
        title: 'Cualquier tecla o combinación',
        body: 'Escribe «Ctrl+2» o «er», o pulsa Grabar y presiona las teclas. Independiente de la distribución del teclado.',
      },
      {
        title: 'Tu biblioteca de Steam',
        body: '«Añadir perfil» muestra tus juegos de Steam instalados y reconoce la ventana del juego por ti, Proton incluido.',
      },
      {
        title: 'Funciona en Wayland',
        body: 'Trabaja por debajo del compositor, así que no depende de X11. La reasignación corre como servicio en segundo plano y sigue funcionando con la ventana cerrada.',
      },
      {
        title: 'Cualquier ratón, en cualquier momento',
        body: 'Cualquier ratón se detecta automáticamente, varios a la vez, incluido un receptor desconectado y vuelto a conectar.',
      },
    ],
  },
  how: {
    title: 'Cómo funciona',
    intro:
      'Dos programas pequeños: un servicio en segundo plano que hace la reasignación y la ventana donde la configuras.',
    steps: [
      {
        title: 'Lee el ratón',
        body: 'El servicio recibe los eventos del ratón antes que el escritorio. Solo abre ratones, nunca teclados.',
      },
      {
        title: 'Sabe qué juego es',
        body: 'En KDE Plasma, un pequeño script de KWin informa de la ventana activa y se activa el perfil que coincide.',
      },
      {
        title: 'Envía las teclas',
        body: 'Los botones reasignados salen por un teclado y un ratón virtuales, así que el juego ve una entrada normal.',
      },
      {
        title: 'Falla de forma segura',
        body: 'Si algo sale mal, todos los ratones se liberan y vuelven a funcionar con normalidad.',
      },
    ],
  },
  install: {
    title: 'Instalar',
    archTitle: 'Arch Linux y CachyOS',
    archBody:
      'Genera un paquete que instala la aplicación, la regla de permisos para ratones, el servicio en segundo plano y la entrada del menú.',
    enableTitle: 'Inícialo ahora y en cada inicio de sesión',
    enableBody: 'Luego abre LinMBC desde el menú de aplicaciones y actívalo.',
    otherTitle: 'Otras distribuciones',
    otherBody:
      'Aún sin paquete ni pruebas. El README indica lo que necesita un paquete; los informes desde otros sistemas son bienvenidos.',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  support: {
    title: 'Dónde funciona',
    rows: [
      {
        level: 'tested',
        label: 'Probado',
        body: 'Arch Linux / CachyOS con KDE Plasma 6 en Wayland.',
      },
      {
        level: 'limited',
        label: 'Funciona, con un límite',
        body: 'Otros escritorios: los botones se reasignan, pero solo con el perfil Predeterminado.',
      },
      {
        level: 'untested',
        label: 'Aún sin probar',
        body: 'Debian, Ubuntu, Fedora, openSUSE y otros; Plasma en X11.',
      },
      {
        level: 'unsupported',
        label: 'No compatible',
        body: 'Sistemas sin systemd-logind.',
      },
    ],
  },
  safety: {
    title: 'Conviene saber',
    items: [
      {
        title: 'Solo ratones',
        body: 'La regla de permisos da a tu usuario acceso a los ratones y a nada más, así que LinMBC no puede leer lo que escribes.',
      },
      {
        title: 'Juegos en línea y macros',
        body: 'Reasignar un botón a una tecla es un cambio de entrada normal. Los bucles y repeticiones envían varias entradas por clic, algo que algunos juegos en línea prohíben en sus términos de servicio. Revisa las reglas antes.',
      },
      {
        title: 'Alpha',
        body: 'Probado en una sola máquina por ahora. Habrá detalles por pulir; por favor, informa de lo que falle.',
      },
    ],
  },
  footer: {
    license: 'Licencia MIT',
    notAffiliated: 'Sin relación con Highrez, creadores de X-Mouse Button Control.',
    issues: 'Informar de un problema',
    madeBy: 'Hecho por Johnson Mauro',
  },
};

export default es;
