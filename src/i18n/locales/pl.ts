import type { Dict } from '../dict';

// Machine translated from en.ts; native review welcome.
const pl: Dict = {
  meta: {
    title: 'LinMBC — przypisywanie przycisków myszy osobno dla każdej gry w Linuksie',
    description:
      'Przypisuj boczne przyciski myszy osobno dla każdej gry w Linuksie. Profile przełączają się razem z aktywnym oknem w KDE Plasma (Wayland). Wolne i otwarte oprogramowanie.',
    keywords:
      'przypisanie przycisków myszy linux, przyciski myszy, wayland, kde plasma, steam, proton, arpg, alternatywa dla x-mouse button control',
  },
  nav: {
    skipToContent: 'Przejdź do treści',
    languageLabel: 'Język',
    features: 'Funkcje',
    install: 'Instalacja',
    source: 'Kod źródłowy',
  },
  hero: {
    badge: 'Alfa',
    title: 'Przyciski myszy — inny układ dla każdej gry.',
    tagline:
      'LinMBC przypisuje przyciskom myszy klawisze i skróty w Linuksie i sam zmienia profil, gdy przełączysz się do gry przez Alt+Tab. Inspirowany programem X-Mouse Button Control dla Windows.',
    ctaInstall: 'Zainstaluj',
    ctaSource: 'Zobacz na GitHubie',
    note: 'Wolne i otwarte · MIT · najpierw Wayland',
  },
  screens: {
    mainAlt:
      'Główne okno LinMBC: profil Last Epoch, tylny przycisk boczny wysyła Q, a przedni powtarza Ctrl+2 w pętli.',
    mappingAlt:
      'Ustawienia przycisku: klawisze Ctrl+2, pętla do następnego kliknięcia, losowe opóźnienie od 80 do 140 ms.',
    mappingCaption: 'Dla każdego przycisku: klawisze, sposób ich wysyłania i opóźnienie.',
  },
  features: {
    title: 'Co potrafi',
    items: [
      {
        title: 'Profil dla każdej gry',
        body: 'Profile podążają za aktywnym oknem. Wyjdź z gry przez Alt+Tab, a przyciski wrócą do normy: poza grami działa profil Domyślny.',
      },
      {
        title: 'Cztery sposoby kliknięcia',
        body: 'Przytrzymywanie klawiszy razem z przyciskiem, jedno naciśnięcie, pętla do następnego kliknięcia albo N powtórzeń — ze stałym lub losowym opóźnieniem.',
      },
      {
        title: 'Dowolny klawisz lub skrót',
        body: 'Wpisz „Ctrl+2” albo „er” lub kliknij Nagraj i naciśnij klawisze. Niezależne od układu klawiatury.',
      },
      {
        title: 'Twoja biblioteka Steam',
        body: '„Dodaj profil” pokazuje zainstalowane gry ze Steam i sam rozpoznaje okno gry, także pod Protonem.',
      },
      {
        title: 'Działa w Waylandzie',
        body: 'Działa poniżej kompozytora, więc nie zależy od X11. Przypisania obsługuje usługa w tle, która działa także po zamknięciu okna.',
      },
      {
        title: 'Każda mysz, w każdej chwili',
        body: 'Każda mysz jest wykrywana automatycznie, kilka naraz, również odbiornik odłączony i podłączony ponownie.',
      },
    ],
  },
  how: {
    title: 'Jak to działa',
    intro:
      'Dwa małe programy: usługa w tle, która przypisuje przyciski, i okno, w którym to ustawiasz.',
    steps: [
      {
        title: 'Czyta mysz',
        body: 'Usługa odbiera zdarzenia myszy, zanim zobaczy je pulpit. Otwiera tylko myszy, nigdy klawiatury.',
      },
      {
        title: 'Rozpoznaje grę',
        body: 'W KDE Plasma mały skrypt KWin zgłasza aktywne okno i włącza się pasujący profil.',
      },
      {
        title: 'Wysyła klawisze',
        body: 'Przypisane przyciski wychodzą przez wirtualną klawiaturę i mysz, więc gra widzi zwykłe wejście.',
      },
      {
        title: 'Bezpieczna awaria',
        body: 'Gdy coś pójdzie nie tak, wszystkie myszy zostają zwolnione i znów działają normalnie.',
      },
    ],
  },
  install: {
    title: 'Instalacja',
    archTitle: 'Arch Linux i CachyOS',
    archBody:
      'Buduje pakiet, który instaluje aplikację, regułę dostępu do myszy, usługę w tle i pozycję w menu.',
    enableTitle: 'Uruchom teraz i przy każdym logowaniu',
    enableBody: 'Następnie otwórz LinMBC z menu aplikacji i włącz go.',
    otherTitle: 'Inne dystrybucje',
    otherBody:
      'Jeszcze bez pakietów i testów. README opisuje, czego potrzebuje pakiet; zgłoszenia z innych systemów są mile widziane.',
    copy: 'Kopiuj',
    copied: 'Skopiowano',
  },
  support: {
    title: 'Gdzie działa',
    rows: [
      {
        level: 'tested',
        label: 'Przetestowane',
        body: 'Arch Linux / CachyOS z KDE Plasma 6 w Waylandzie.',
      },
      {
        level: 'limited',
        label: 'Działa, z ograniczeniem',
        body: 'Inne środowiska: przyciski są przypisywane, ale tylko z profilem Domyślnym.',
      },
      {
        level: 'untested',
        label: 'Jeszcze nieprzetestowane',
        body: 'Debian, Ubuntu, Fedora, openSUSE i inne; Plasma na X11.',
      },
      {
        level: 'unsupported',
        label: 'Nieobsługiwane',
        body: 'Systemy bez systemd-logind.',
      },
    ],
  },
  safety: {
    title: 'Warto wiedzieć',
    items: [
      {
        title: 'Tylko myszy',
        body: 'Reguła dostępu daje twojemu użytkownikowi dostęp do myszy i do niczego więcej, więc LinMBC nie może czytać tego, co piszesz.',
      },
      {
        title: 'Gry online i makra',
        body: 'Przypisanie przyciskowi klawisza to zwykła zmiana wejścia. Pętle i powtórzenia wysyłają kilka naciśnięć na kliknięcie, czego niektóre gry online zabraniają w regulaminie. Najpierw sprawdź zasady.',
      },
      {
        title: 'Alfa',
        body: 'Na razie przetestowane na jednym komputerze. Mogą zdarzyć się niedoróbki — zgłaszaj, proszę, co nie działa.',
      },
    ],
  },
  footer: {
    license: 'Licencja MIT',
    notAffiliated: 'Brak powiązań z Highrez, twórcą X-Mouse Button Control.',
    issues: 'Zgłoś problem',
    madeBy: 'Autor: Johnson Mauro',
  },
};

export default pl;
