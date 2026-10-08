import type { Dict } from '../dict';

// Machine translated from en.ts; native review welcome.
const fr: Dict = {
  meta: {
    title: 'LinMBC — remappage des boutons de souris par jeu sous Linux',
    description:
      'Remappez les boutons latéraux de votre souris pour chaque jeu sous Linux. Les profils suivent la fenêtre active sur KDE Plasma (Wayland). Libre et open source.',
    keywords:
      'remapper souris linux, boutons de souris, wayland, kde plasma, steam, proton, arpg, alternative à x-mouse button control',
  },
  nav: {
    skipToContent: 'Aller au contenu',
    languageLabel: 'Langue',
    features: 'Fonctionnalités',
    install: 'Installer',
    source: 'Code source',
  },
  hero: {
    badge: 'Alpha',
    title: 'Les boutons de votre souris, une disposition différente pour chaque jeu.',
    tagline:
      'LinMBC associe les boutons de la souris à des touches et combinaisons sous Linux, et change de profil tout seul quand vous passez sur un jeu avec alt-tab. Inspiré de X-Mouse Button Control pour Windows.',
    ctaInstall: 'Installer',
    ctaSource: 'Voir sur GitHub',
    note: 'Libre et open source · MIT · Wayland d’abord',
  },
  screens: {
    mainAlt:
      'Fenêtre principale de LinMBC : le profil Last Epoch, le bouton latéral arrière envoie Q et l’avant répète Ctrl+2 en boucle.',
    mappingAlt:
      'Réglages du bouton : touches Ctrl+2, boucle jusqu’au prochain clic, délai aléatoire entre 80 et 140 ms.',
    mappingCaption:
      'Pour chaque bouton : les touches, la façon dont un clic les envoie, et le délai.',
  },
  features: {
    title: 'Ce qu’il fait',
    items: [
      {
        title: 'Un profil par jeu',
        body: 'Les profils suivent la fenêtre active. Quittez le jeu avec alt-tab et vos boutons redeviennent normaux : hors des jeux, le profil Par défaut s’applique.',
      },
      {
        title: 'Quatre façons de cliquer',
        body: 'Maintenir les touches avec le bouton, les envoyer une fois, les répéter en boucle jusqu’au clic suivant ou N fois, avec un délai fixe ou aléatoire.',
      },
      {
        title: 'N’importe quelle touche ou combinaison',
        body: 'Tapez « Ctrl+2 » ou « er », ou cliquez sur Enregistrer et appuyez sur les touches. Indépendant de la disposition du clavier.',
      },
      {
        title: 'Votre bibliothèque Steam',
        body: '« Ajouter un profil » liste vos jeux Steam installés et reconnaît la fenêtre du jeu pour vous, Proton compris.',
      },
      {
        title: 'Fonctionne sous Wayland',
        body: 'Il agit sous le compositeur et ne dépend donc pas de X11. Le remappage tourne en service d’arrière-plan et continue fenêtre fermée.',
      },
      {
        title: 'Toutes les souris, à tout moment',
        body: 'Chaque souris est prise en charge automatiquement, plusieurs à la fois, y compris un récepteur débranché puis rebranché.',
      },
    ],
  },
  how: {
    title: 'Comment ça marche',
    intro:
      'Deux petits programmes : un service d’arrière-plan qui fait le remappage, et la fenêtre où vous le configurez.',
    steps: [
      {
        title: 'Lit la souris',
        body: 'Le service reçoit les événements de la souris avant le bureau. Il n’ouvre que des souris, jamais de claviers.',
      },
      {
        title: 'Reconnaît le jeu',
        body: 'Sur KDE Plasma, un petit script KWin signale la fenêtre active et le profil correspondant s’active.',
      },
      {
        title: 'Envoie les touches',
        body: 'Les boutons remappés passent par un clavier et une souris virtuels : le jeu voit une saisie ordinaire.',
      },
      {
        title: 'Échoue sans risque',
        body: 'En cas de problème, toutes les souris sont libérées et refonctionnent normalement.',
      },
    ],
  },
  install: {
    title: 'Installer',
    archTitle: 'Arch Linux et CachyOS',
    archBody:
      'Construit un paquet qui installe l’application, la règle d’accès aux souris, le service d’arrière-plan et l’entrée du menu.',
    enableTitle: 'Lancez-le maintenant et à chaque connexion',
    enableBody: 'Ouvrez ensuite LinMBC depuis le menu des applications et activez-le.',
    otherTitle: 'Autres distributions',
    otherBody:
      'Pas encore empaquetées ni testées. Le README liste ce dont un paquet a besoin ; les retours d’autres systèmes sont bienvenus.',
    copy: 'Copier',
    copied: 'Copié',
  },
  support: {
    title: 'Où il fonctionne',
    rows: [
      {
        level: 'tested',
        label: 'Testé',
        body: 'Arch Linux / CachyOS avec KDE Plasma 6 sous Wayland.',
      },
      {
        level: 'limited',
        label: 'Fonctionne, avec une limite',
        body: 'Autres bureaux : les boutons sont remappés, mais seulement avec le profil Par défaut.',
      },
      {
        level: 'untested',
        label: 'Pas encore testé',
        body: 'Debian, Ubuntu, Fedora, openSUSE et autres ; Plasma sous X11.',
      },
      {
        level: 'unsupported',
        label: 'Non pris en charge',
        body: 'Systèmes sans systemd-logind.',
      },
    ],
  },
  safety: {
    title: 'À savoir',
    items: [
      {
        title: 'Souris uniquement',
        body: 'La règle d’accès donne à votre utilisateur l’accès aux souris et à rien d’autre : LinMBC ne peut pas lire ce que vous tapez.',
      },
      {
        title: 'Jeux en ligne et macros',
        body: 'Associer un bouton à une touche est un simple changement de saisie. Les boucles et répétitions envoient plusieurs saisies par clic, ce que certains jeux en ligne interdisent dans leurs conditions d’utilisation. Vérifiez les règles avant.',
      },
      {
        title: 'Alpha',
        body: 'Testé sur une seule machine pour l’instant. Attendez-vous à des imperfections, et signalez ce qui ne marche pas.',
      },
    ],
  },
  footer: {
    license: 'Licence MIT',
    notAffiliated: 'Sans lien avec Highrez, l’éditeur de X-Mouse Button Control.',
    issues: 'Signaler un problème',
    madeBy: 'Réalisé par Johnson Mauro',
  },
};

export default fr;
