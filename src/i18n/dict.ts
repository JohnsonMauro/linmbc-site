export interface Item {
  title: string;
  body: string;
}

export interface SupportRow {
  level: 'tested' | 'limited' | 'untested' | 'unsupported';
  label: string;
  body: string;
}

/** Every user-visible string of the page. Commands and code stay in the components. */
export interface Dict {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    skipToContent: string;
    languageLabel: string;
    features: string;
    install: string;
    source: string;
  };
  hero: {
    badge: string;
    title: string;
    tagline: string;
    ctaInstall: string;
    ctaSource: string;
    note: string;
    /** Pause control of the backdrop animation (WCAG 2.2.2). */
    pause: string;
    play: string;
    /** Visible invitation to the side-button easter egg (fine pointers only). */
    eggTip: string;
    /** Feedback when a side button is pressed over the hero; button names as in the app. */
    eggRear: string;
    eggFront: string;
    eggFrontOff: string;
    /** Console hint, for whoever opens DevTools. */
    eggHint: string;
  };
  screens: {
    mainAlt: string;
    mappingAlt: string;
    mappingCaption: string;
  };
  features: {
    title: string;
    items: Item[];
  };
  how: {
    title: string;
    intro: string;
    steps: Item[];
  };
  install: {
    title: string;
    archTitle: string;
    archBody: string;
    enableTitle: string;
    enableBody: string;
    otherTitle: string;
    otherBody: string;
    copy: string;
    copied: string;
  };
  support: {
    title: string;
    rows: SupportRow[];
  };
  safety: {
    title: string;
    items: Item[];
  };
  footer: {
    license: string;
    notAffiliated: string;
    issues: string;
    madeBy: string;
  };
}
