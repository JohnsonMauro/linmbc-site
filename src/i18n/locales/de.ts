import type { Dict } from '../dict';

// Machine translated from en.ts; native review welcome.
const de: Dict = {
  meta: {
    title: 'LinMBC — Maustasten pro Spiel neu belegen unter Linux',
    description:
      'Belege die Seitentasten deiner Maus pro Spiel neu, unter Linux. Profile wechseln mit dem aktiven Fenster unter KDE Plasma (Wayland). Frei und quelloffen.',
    keywords:
      'maus neu belegen linux, maustasten, wayland, kde plasma, steam, proton, arpg, alternative zu x-mouse button control',
  },
  nav: {
    skipToContent: 'Zum Inhalt springen',
    languageLabel: 'Sprache',
    features: 'Funktionen',
    install: 'Installieren',
    source: 'Quellcode',
  },
  hero: {
    badge: 'Alpha',
    title: 'Deine Maustasten – für jedes Spiel eine eigene Belegung.',
    tagline:
      'LinMBC legt Maustasten unter Linux auf Tasten und Tastenkombinationen und wechselt das Profil von selbst, sobald du per Alt-Tab ins Spiel gehst. Inspiriert von X-Mouse Button Control für Windows.',
    ctaInstall: 'Installieren',
    ctaSource: 'Auf GitHub ansehen',
    note: 'Frei und quelloffen · MIT · Wayland zuerst',
  },
  screens: {
    mainAlt:
      'LinMBC-Hauptfenster: das Profil für Last Epoch – die hintere Seitentaste sendet Q, die vordere wiederholt Ctrl+2 in Schleife.',
    mappingAlt:
      'Tasteneinstellung: Tasten Ctrl+2, Schleife bis zum nächsten Klick, zufällige Verzögerung zwischen 80 und 140 ms.',
    mappingCaption: 'Pro Taste: die Tasten, wie ein Klick sie sendet, und die Verzögerung.',
  },
  features: {
    title: 'Was es kann',
    items: [
      {
        title: 'Ein Profil pro Spiel',
        body: 'Profile folgen dem aktiven Fenster. Per Alt-Tab aus dem Spiel, und deine Tasten sind wieder normal: Außerhalb von Spielen gilt das Standard-Profil.',
      },
      {
        title: 'Vier Arten zu klicken',
        body: 'Tasten mit der Maustaste halten, einmal drücken, bis zum nächsten Klick in Schleife wiederholen oder N-mal wiederholen – mit fester oder zufälliger Verzögerung.',
      },
      {
        title: 'Jede Taste, jede Kombination',
        body: 'Tippe „Ctrl+2“ oder „er“, oder klicke auf Aufnehmen und drücke die Tasten. Unabhängig vom Tastaturlayout.',
      },
      {
        title: 'Deine Steam-Bibliothek',
        body: '„Profil hinzufügen“ listet deine installierten Steam-Spiele und erkennt das Spielfenster für dich, auch mit Proton.',
      },
      {
        title: 'Läuft unter Wayland',
        body: 'Es arbeitet unterhalb des Compositors und braucht daher kein X11. Die Neubelegung läuft als Hintergrunddienst weiter, auch wenn das Fenster zu ist.',
      },
      {
        title: 'Jede Maus, jederzeit eingesteckt',
        body: 'Jede Maus wird automatisch erkannt, auch mehrere gleichzeitig und ein abgezogener und wieder eingesteckter Empfänger.',
      },
    ],
  },
  how: {
    title: 'So funktioniert es',
    intro:
      'Zwei kleine Programme: ein Hintergrunddienst, der die Tasten neu belegt, und das Fenster, in dem du es einrichtest.',
    steps: [
      {
        title: 'Liest die Maus',
        body: 'Der Dienst bekommt die Mausereignisse, bevor der Desktop sie sieht. Er öffnet nur Mäuse, niemals Tastaturen.',
      },
      {
        title: 'Erkennt das Spiel',
        body: 'Unter KDE Plasma meldet ein kleines KWin-Skript das aktive Fenster, und das passende Profil wird aktiv.',
      },
      {
        title: 'Sendet die Tasten',
        body: 'Neu belegte Tasten kommen aus einer virtuellen Tastatur und Maus – das Spiel sieht ganz normale Eingaben.',
      },
      {
        title: 'Fällt sicher aus',
        body: 'Wenn etwas schiefgeht, werden alle Mäuse freigegeben und funktionieren wieder normal.',
      },
    ],
  },
  install: {
    title: 'Installieren',
    archTitle: 'Arch Linux und CachyOS',
    archBody:
      'Baut ein Paket, das die App, die Zugriffsregel für Mäuse, den Hintergrunddienst und den Menüeintrag installiert.',
    enableTitle: 'Jetzt und bei jeder Anmeldung starten',
    enableBody: 'Öffne dann LinMBC über das Anwendungsmenü und schalte es ein.',
    otherTitle: 'Andere Distributionen',
    otherBody:
      'Noch nicht paketiert oder getestet. Das README listet, was ein Paket braucht; Rückmeldungen von anderen Systemen sind willkommen.',
    copy: 'Kopieren',
    copied: 'Kopiert',
  },
  support: {
    title: 'Wo es läuft',
    rows: [
      {
        level: 'tested',
        label: 'Getestet',
        body: 'Arch Linux / CachyOS mit KDE Plasma 6 unter Wayland.',
      },
      {
        level: 'limited',
        label: 'Läuft, mit Einschränkung',
        body: 'Andere Desktops: Die Tasten werden neu belegt, aber nur mit dem Standard-Profil.',
      },
      {
        level: 'untested',
        label: 'Noch nicht getestet',
        body: 'Debian, Ubuntu, Fedora, openSUSE und andere; Plasma unter X11.',
      },
      {
        level: 'unsupported',
        label: 'Nicht unterstützt',
        body: 'Systeme ohne systemd-logind.',
      },
    ],
  },
  safety: {
    title: 'Gut zu wissen',
    items: [
      {
        title: 'Nur Mäuse',
        body: 'Die Zugriffsregel gibt deinem Benutzer Zugriff auf Mäuse und auf nichts anderes – LinMBC kann nicht lesen, was du tippst.',
      },
      {
        title: 'Onlinespiele und Makros',
        body: 'Eine Taste auf eine andere zu legen ist eine gewöhnliche Eingabeänderung. Schleifen und Wiederholungen senden mehrere Eingaben pro Klick, was manche Onlinespiele in ihren Nutzungsbedingungen verbieten. Prüfe vorher die Regeln.',
      },
      {
        title: 'Alpha',
        body: 'Bisher auf einem einzigen Rechner getestet. Rechne mit Ecken und Kanten und melde bitte, was nicht klappt.',
      },
    ],
  },
  footer: {
    license: 'MIT-Lizenz',
    notAffiliated: 'Nicht verbunden mit Highrez, den Machern von X-Mouse Button Control.',
    issues: 'Problem melden',
    madeBy: 'Erstellt von Johnson Mauro',
  },
};

export default de;
