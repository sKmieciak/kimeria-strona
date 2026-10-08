// Generuje statyczną stronę Kimeria: node tools/build.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const MAIL = 'seb.kmieciak@gmail.com';
const PUBLISHER = 'Kmieciak Sebastian - SK Software';
const UPDATED = '2 października 2026';
// Własna domena (bez https://), np. 'kimeria.pl'. Pusta = brak pliku CNAME/sitemap.
const DOMAIN = 'kimeria.pl';
const ORIGIN = DOMAIN ? `https://${DOMAIN}` : '';

const MARK = '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><polygon points="32,8 56,32 32,56 8,32" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><polygon points="32,8 11.2,44 52.8,44" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="2.5"/></svg>';
const ICONS = {
  dobitka: '<svg viewBox="0 0 456 456" aria-hidden="true"><circle cx="228" cy="228" r="128" fill="none" stroke="#fff" stroke-width="36"/><circle cx="228" cy="228" r="40" fill="#fff"/></svg>',
  agrobilans: '<svg viewBox="0 0 456 456" aria-hidden="true"><path d="M228 98C334 150 336 300 228 348 120 300 122 150 228 98Z" fill="#fff"/><path d="M228 140V312" stroke="var(--accent)" stroke-width="24" stroke-linecap="round"/></svg>',
  wykonbilans: '<svg viewBox="0 0 456 456" aria-hidden="true"><path d="M140 110V316H346" fill="none" stroke="#fff" stroke-width="40" stroke-linejoin="round" stroke-linecap="round"/><path d="M190 160V266H296" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/></svg>',
};
const mail = `<a href="mailto:${MAIL}">${MAIL}</a>`;

const page = ({ title, desc, rel, bodyClass = '', content, canonical }) => `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">${ORIGIN && canonical !== undefined ? `
<link rel="canonical" href="${ORIGIN}/${canonical}">` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Baloo+2:wght@700&display=swap">
<link rel="stylesheet" href="${rel}style.css">
<link rel="icon" href="${rel}favicon.svg" type="image/svg+xml">
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<div class="wrap">
<header class="topbar"><a class="brand" href="${rel}">${MARK} Kimeria</a><nav><a href="${rel}#kontakt">Kontakt</a></nav></header>
${content}
<footer class="site"><span class="mark">${MARK} Kimeria · ${PUBLISHER}</span>${mail}</footer>
</div>
</body>
</html>
`;

const apps = [
  {
    slug: 'dobitka', play: '', cls: 'app-dobitka', name: 'Dobitka', updated: '8 października 2026',
    blurb: 'Piłkarska gra towarzyska. Losujecie klub, wybieracie jego piłkarza i odejmujecie jego gole, próbując zejść dokładnie do zera.',
    // Strona aplikacji (kimeria.pl/dobitka/), podana w Google Play jako strona internetowa.
    landing: {
      lead: 'Piłkarska gra imprezowa dla znajomych, oparta na zasadzie znanej z rzutek: zaczynasz z pulą punktów i musisz zejść dokładnie do zera.',
      image: 'dobitka/grafika.png',
      sections: [
        ['Jak się gra', [
          'Każda runda losuje klub, np. Liverpool, Celtic albo AC Milan.',
          'Wybierasz piłkarza, który w nim grał. Jego bramki dla tego klubu odejmujesz od swojej puli.',
          'Kto pierwszy zejdzie dokładnie do zera, wygrywa. Przestrzelisz? Ruch przepada.',
        ]],
        ['Trzy tryby', [
          '<strong>Rywalizacyjny</strong>: każdy gra na własną pulę.',
          '<strong>Kooperacyjny</strong>: wspólna pula, gracie razem.',
          '<strong>Błyskawiczny</strong>: jedna runda na szybko.',
        ]],
        ['Dopasuj grę do wieczoru', [
          'Cel punktowy, liczba rund i limit czasu na ruch.',
          'Wybór lig i poziom klubów: tylko topowe, topowe i mniej znane albo wszystkie.',
          'Ponad 1100 zawodników i legend z 29 klubów i 10 lig: od Premier League, La Ligi i Serie A po Ekstraklasę.',
        ]],
      ],
      note: 'Gra działa bez internetu, bo baza zawodników jest wbudowana. Reklamy wyłączysz jednorazowym zakupem.',
    },
    summary: [
      'Rozgrywka (gracze, wyniki rund, ustawienia meczu) zostaje <strong>tylko na Twoim urządzeniu</strong>. Nie ma konta, logowania ani własnego serwera.',
      'Baza zawodników i klubów jest dołączona do aplikacji i działa offline.',
      'Aplikacja wyświetla reklamy (Google AdMob) i oferuje jednorazowy zakup „Usuń reklamy” (Google Play Billing). Oba korzystają z internetu i przetwarzają dane zgodnie z zasadami Google, opisanymi niżej.',
      'Nie zbieramy danych osobowych do własnych celów i nikomu ich nie sprzedajemy.',
    ],
    body: `
<section><h2>Kim jesteśmy</h2><p>Dobitka to piłkarska gra towarzyska na telefon, w której gracze na zmianę wybierają piłkarza z wylosowanego klubu i odejmują liczbę jego bramek, próbując zejść dokładnie do zera. Aplikację wydaje ${PUBLISHER} (marka Kimeria), który jest administratorem danych w rozumieniu tej polityki. Kontakt: ${mail}.</p></section>
<section><h2>Gdzie przechowujemy Twoje dane</h2><p>Nazwy graczy, wybrany tryb, ligi i poziom trudności oraz przebieg rozgrywki zapisują się wyłącznie lokalnie na Twoim urządzeniu. Aplikacja nie ma konta użytkownika ani backendu, do którego wysyłałaby te dane. Baza zawodników i klubów jest wgrywana przy pierwszym uruchomieniu z pliku dołączonego do aplikacji, bez komunikacji z serwerem. Odinstalowanie aplikacji trwale usuwa dane rozgrywki.</p></section>
<section><h2>Uprawnienia</h2><p>Aplikacja deklaruje uprawnienia <code>INTERNET</code> i <code>ACCESS_NETWORK_STATE</code>, potrzebne wyłącznie do wyświetlania reklam i obsługi zakupów (patrz niżej). Dobitka nie prosi o dostęp do lokalizacji, aparatu, mikrofonu ani kontaktów.</p></section>
<section><h2>Reklamy (Google AdMob)</h2><p>Aplikacja korzysta z Google AdMob do wyświetlania reklam. AdMob może zbierać identyfikator reklamowy urządzenia i inne dane techniczne, żeby wyświetlać reklamy i mierzyć ich skuteczność, zgodnie z <a href="https://policies.google.com/privacy" rel="noopener">polityką prywatności Google</a>. Więcej o tym, jak Google wykorzystuje dane z aplikacji partnerów: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>. Zakup „Usuń reklamy” wyłącza reklamy w aplikacji.</p></section>
<section><h2>Zakupy w aplikacji</h2><p>Dobitka oferuje jeden jednorazowy zakup „Usuń reklamy”, obsługiwany przez Google Play Billing. Płatność (dane karty, historia zakupów) przebiega w całości po stronie Google. Aplikacja przechowuje lokalnie tylko informację, czy zakup został dokonany.</p></section>
<section><h2>Twoje prawa</h2><p>Dane rozgrywki nie opuszczają Twojego urządzenia. Możesz je usunąć w każdej chwili, odinstalowując aplikację lub czyszcząc jej dane w ustawieniach Androida. Pytania dotyczące tej polityki, także reklam AdMob i zakupów Google Play: ${mail}.</p></section>
<section><h2>Zmiany tej polityki</h2><p>Jeśli zakres funkcji aplikacji się zmieni, zaktualizujemy tę stronę i datę na górze dokumentu.</p></section>`,
  },
  {
    slug: 'agrobilans', play: '', cls: 'app-agro', name: 'AgroBilans',
    blurb: 'Rachunkowość gospodarstwa warzywnego: pola, uprawy, zbiory, sprzedaż, koszty i kontrahenci.',
    summary: [
      'Dane gospodarstwa zostają <strong>na Twoim telefonie</strong>.',
      'Jedyny wyjątek to opcjonalna Giełda ogłoszeń, która z założenia jest publiczna.',
      'Lokalizacja tylko za Twoją zgodą, do pomiaru pola.',
      'Niczego nie sprzedajemy ani nie udostępniamy poza Giełdą.',
      'Obecnie brak reklam i analityki.',
    ],
    body: `
<section><h2>Kim jesteśmy</h2><p>AgroBilans to aplikacja do prowadzenia rachunkowości gospodarstwa (pola, uprawy, zbiory, sprzedaże, koszty, kontrahenci) dla drobnych producentów warzyw i owoców. Aplikację wydaje ${PUBLISHER} (marka Kimeria), który jest administratorem danych w rozumieniu RODO. Kontakt: ${mail}.</p></section>
<section><h2>Gdzie przechowujemy Twoje dane</h2><p>Wszystko, co wpisujesz do AgroBilansu (pola, uprawy, sprzedaże, koszty, dane kontrahentów, zbiory, dziennik zabiegów), trafia wyłącznie do lokalnej bazy danych na Twoim telefonie. Aplikacja nie wysyła tych danych na serwer, nie synchronizuje ich w chmurze i nie udostępnia ich nam ani firmom trzecim. Po odinstalowaniu aplikacji lub wyczyszczeniu jej danych informacje znikają; bez kopii zapasowej nie da się ich odzyskać.</p><p><strong>Jedyny wyjątek to opcjonalna Giełda ogłoszeń</strong>, opisana niżej.</p></section>
<section><h2>Giełda ogłoszeń (opcjonalna)</h2><p>Giełda (w aplikacji „🧺 Giełda” oraz na stronie Giełda Plonów) pozwala wystawiać i przeglądać ogłoszenia sprzedaży płodów rolnych widoczne dla innych. Wymaga to wspólnego miejsca na dane, więc to jedyny element AgroBilansu korzystający z zewnętrznego serwera (Supabase, serwery w Unii Europejskiej). Z całej reszty aplikacji korzystasz bez konta. Konto (e-mail i hasło) zakładasz dopiero, gdy chcesz wystawić ogłoszenie.</p>
<div class="card table">
<div class="row"><div class="k">Co trafia do Giełdy</div><div>Adres e-mail konta, treść ogłoszenia, którą sam wpisujesz (rodzaj płodu, ilość, cena, opis, województwo, opcjonalnie gmina i nazwa gospodarstwa), oraz numer telefonu kontaktowego, który sam podajesz.</div></div>
<div class="row"><div class="k">Kto to widzi</div><div>Treść aktywnego ogłoszenia, łącznie z numerem telefonu, widzi każdy odwiedzający Giełdę, także bez logowania. Adres e-mail konta nie jest nigdzie publicznie pokazywany.</div></div>
<div class="row"><div class="k">Jak długo</div><div>Ogłoszenie jest widoczne 30 dni albo do oznaczenia jako sprzedane lub usunięcia, zależnie od tego, co nastąpi wcześniej. Własne ogłoszenie usuniesz w dowolnym momencie.</div></div>
</div><p>Dane Giełdy nie są łączone z prywatną bazą Twojego gospodarstwa. To dwa osobne magazyny danych.</p></section>
<section><h2>Uprawnienia</h2><div class="card table">
<div class="row"><div class="k">Lokalizacja</div><div>Tylko w funkcji Premium „Pomiar granic pola”, gdy sam ją uruchomisz. Aplikacja odczytuje wtedy pozycję GPS, żeby zapisać obrys i powierzchnię pola w lokalnej bazie. Poza tą funkcją lokalizacja nie jest sprawdzana.</div></div>
<div class="row"><div class="k">Pliki</div><div>Eksport kopii zapasowej lub raportu CSV oraz import kopii, zawsze z Twojej inicjatywy.</div></div>
<div class="row"><div class="k">Internet</div><div>Wyłącznie dla opcjonalnej Giełdy ogłoszeń. Reszta aplikacji nie łączy się z żadnym serwerem.</div></div>
</div></section>
<section><h2>Kopia zapasowa</h2><p>Funkcja „Kopia zapasowa” w Ustawieniach tworzy plik z pełną zawartością bazy i zapisuje go tam, gdzie wskażesz (np. w pamięci telefonu albo na Twoim dysku w chmurze przez systemowe okno udostępniania). Ten plik nie trafia do nas.</p></section>
<section><h2>Reklamy i analityka</h2><p>Obecna wersja nie wyświetla reklam i nie zawiera narzędzi analitycznych ani śledzących. Jeśli to się zmieni, zaktualizujemy tę politykę przed wprowadzeniem zmiany i opiszemy, jaki dostawca jest używany i jakie dane przetwarza.</p></section>
<section><h2>Zakupy w aplikacji (Premium)</h2><p>Premium odblokowuje się przez zakupy Google Play. AgroBilans nie widzi ani nie przechowuje Twoich danych płatniczych; obsługuje je wyłącznie Google.</p></section>
<section><h2>Twoje prawa</h2><p>Dane gospodarstwa nie opuszczają Twojego urządzenia, więc masz nad nimi pełną kontrolę: możesz je wyeksportować, usunąć pojedyncze wpisy albo odinstalować aplikację. W sprawie danych Giełdy (dostęp, poprawienie, usunięcie konta) napisz na ${mail}. Przysługuje Ci też prawo skargi do Prezesa UODO.</p></section>
<section><h2>Zmiany tej polityki</h2><p>Jeśli zmienimy sposób przetwarzania danych, np. wprowadzając reklamy, synchronizację w chmurze lub analitykę, zaktualizujemy ten dokument i datę na górze przed wprowadzeniem zmiany do aplikacji.</p></section>`,
  },
  {
    slug: 'wykonbilans', play: '', cls: 'app-wykon', name: 'WykonBilans',
    blurb: 'Dla ekip wykończeniowych: wyceny, cennik materiałów, rzuty pomieszczeń i rozliczenia zleceń.',
    summary: [
      'Klienci, zlecenia, wyceny, cennik, koszty, płatności i rzuty pomieszczeń zostają <strong>tylko na Twoim telefonie</strong>.',
      'Nie zbieramy danych osobowych do własnych celów i nie przekazujemy ich firmom trzecim.',
      'Aplikacja nie zawiera obecnie reklam ani narzędzi analitycznych.',
      'Kopia zapasowa to funkcja lokalna: plik trafia tam, gdzie sam go wyślesz, nie do nas.',
    ],
    body: `
<section><h2>Kim jesteśmy</h2><p>WykonBilans to aplikacja dla ekip i firm wykończeniowych: wyceny, cennik materiałów i usług, koszty oraz rozliczenia zleceń. Aplikację wydaje ${PUBLISHER} (marka Kimeria), który jest administratorem danych w rozumieniu tej polityki. Kontakt: ${mail}.</p></section>
<section><h2>Gdzie przechowujemy Twoje dane</h2><p>Wszystkie dane wpisane do aplikacji zapisują się wyłącznie lokalnie, w bazie na Twoim urządzeniu. Aplikacja nie wysyła ich na żaden serwer i nie ma konta użytkownika. Odinstalowanie aplikacji lub wyczyszczenie jej danych trwale je usuwa, chyba że wcześniej wykonasz kopię zapasową.</p></section>
<section><h2>Uprawnienia</h2><p>Aplikacja deklaruje uprawnienia <code>INTERNET</code> i <code>ACCESS_NETWORK_STATE</code>, ale obecnie nie wykonuje żadnych połączeń sieciowych. Nie prosi o dostęp do lokalizacji, aparatu, mikrofonu ani kontaktów. Jeśli pojawi się funkcja, która tego wymaga, zaktualizujemy tę politykę z wyprzedzeniem.</p></section>
<section><h2>Kopia zapasowa</h2><p>Funkcja „Kopia zapasowa” w Ustawieniach tworzy pełną kopię bazy i przekazuje ją do systemowego okna udostępniania. Ty decydujesz, gdzie plik trafi (dysk w chmurze, e-mail, zapis lokalny). Przywrócenie kopii nadpisuje bieżące dane dopiero po Twoim potwierdzeniu. Żaden z tych plików nie przechodzi przez nasze serwery.</p></section>
<section><h2>Reklamy i analityka</h2><p>Aplikacja nie zawiera reklam, narzędzi analitycznych ani bibliotek śledzących. Jeśli to się zmieni, zaktualizujemy politykę i opiszemy, jakie dane są wtedy przetwarzane i przez kogo.</p></section>
<section><h2>Zakupy w aplikacji (Premium)</h2><p>Płatności za Premium nie są jeszcze uruchomione. Gdy pojawi się Google Play Billing, opiszemy tu dane przetwarzane w tym procesie przez Google. Danych płatniczych nigdy nie przechowujemy.</p></section>
<section><h2>Twoje prawa</h2><p>Dane nie opuszczają Twojego urządzenia, chyba że sam wyślesz plik kopii zapasowej, więc masz nad nimi pełną kontrolę: możesz je wyeksportować, usunąć pojedyncze wpisy albo odinstalować aplikację. Pytania: ${mail}.</p></section>
<section><h2>Zmiany tej polityki</h2><p>Jeśli zakres funkcji się zmieni (reklamy, płatności, funkcje wymagające internetu), zaktualizujemy tę stronę i datę na górze dokumentu.</p></section>`,
  },
];

const write = (rel, html) => {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log('wrote', rel);
};

write('index.html', page({
  title: 'Kimeria',
  desc: 'Kimeria: polskie aplikacje mobilne Dobitka, AgroBilans i WykonBilans.',
  rel: '',
  canonical: '',
  content: `
<section class="hero">
  <h1>Kimeria</h1>
  <p>Małe, porządnie zrobione aplikacje na Androida, robione w Polsce dla konkretnych ludzi: kibiców, rolników i ekip wykończeniowych.</p>
</section>
<div class="apps">
${apps.map(a => `  <article class="card app ${a.cls}">
    <span class="icon">${ICONS[a.slug]}</span>
    <h2>${a.name}</h2>
    <p>${a.blurb}</p>
    <div class="links">${a.landing ? `<a class="pill" href="${a.slug}/">O grze</a>` : ''}<a class="pill" href="${a.slug}/prywatnosc/">Polityka prywatności</a>${a.play ? `<a class="pill" href="${a.play}" rel="noopener">Google Play</a>` : '<span class="pill muted">Google Play: wkrótce</span>'}</div>
  </article>`).join('\n')}
</div>
<section class="section" id="kontakt">
  <h2>Kontakt</h2>
  <div class="card contact"><dl>
    <dt>Wydawca</dt><dd>${PUBLISHER}</dd>
    <dt>Marka</dt><dd>Kimeria</dd>
    <dt>E-mail</dt><dd>${mail}</dd>
  </dl></div>
</section>`,
}));

for (const a of apps) {
  write(`${a.slug}/prywatnosc/index.html`, page({
    title: `${a.name} — Polityka prywatności`,
    desc: `Polityka prywatności aplikacji ${a.name}.`,
    rel: '../../',
    bodyClass: a.cls,
    canonical: `${a.slug}/prywatnosc/`,
    content: `
<div class="doc-head">
  <span class="app-badge"><span class="icon">${ICONS[a.slug]}</span>${a.name}</span>
  <h1>Polityka prywatności</h1>
  <div class="updated">Ostatnia aktualizacja: ${a.updated || UPDATED}</div>
</div>
<main>
<div class="card summary"><p class="label">W skrócie</p><ul>
${a.summary.map(s => `<li>${s}</li>`).join('\n')}
</ul></div>
${a.body}
</main>`,
  }));
}

for (const a of apps.filter(a => a.landing)) {
  const l = a.landing;
  write(`${a.slug}/index.html`, page({
    title: `${a.name} — ${a.blurb.split('.')[0]}`,
    desc: l.lead,
    rel: '../',
    bodyClass: a.cls,
    canonical: `${a.slug}/`,
    content: `
<div class="doc-head">
  <span class="app-badge"><span class="icon">${ICONS[a.slug]}</span>${a.name}</span>
  <h1>${a.blurb.split('.')[0]}</h1>
  <p class="lead">${l.lead}</p>
</div>
<main>
${l.image ? `<img class="card shot" src="../${l.image}" alt="${a.name}" width="1024" height="500">` : ''}
${l.sections.map(([h, items]) => `<section><h2>${h}</h2><ul>
${items.map(i => `<li>${i}</li>`).join('\n')}
</ul></section>`).join('\n')}
<p>${l.note}</p>
<div class="links">${a.play ? `<a class="pill" href="${a.play}" rel="noopener">Pobierz z Google Play</a>` : '<span class="pill muted">Google Play: wkrótce</span>'}<a class="pill" href="prywatnosc/">Polityka prywatności</a></div>
</main>`,
  }));
}

write('favicon.svg', MARK.replace('aria-hidden="true"', 'xmlns="http://www.w3.org/2000/svg"').replaceAll('currentColor', '#211D18'));
write('.nojekyll', '');

write('404.html', page({
  title: 'Nie znaleziono strony — Kimeria',
  desc: 'Nie ma takiej strony.',
  rel: '/',
  content: `
<section class="hero">
  <h1>Nie ma takiej strony</h1>
  <p>Adres mógł się zmienić. <a href="/">Wróć na stronę główną Kimerii</a>.</p>
</section>`,
}));

const urls = ['', ...apps.filter(a => a.landing).map(a => `${a.slug}/`), ...apps.map(a => `${a.slug}/prywatnosc/`)];
if (DOMAIN) {
  write('CNAME', DOMAIN + '\n');
  write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`);
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${ORIGIN}/${u}</loc></url>`).join('\n')}
</urlset>
`);
} else {
  for (const f of ['CNAME', 'robots.txt', 'sitemap.xml']) fs.rmSync(path.join(root, f), { force: true });
}
