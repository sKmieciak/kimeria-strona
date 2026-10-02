# Wdrożenie strony Kimeria

Strona statyczna na GitHub Pages (darmowy hosting) pod własną domeną.
Zawartość edytujesz w `tools/build.js`, potem `node tools/build.js` i commit.

## 1. Domena w generatorze

W `tools/build.js` ustaw `const DOMAIN = 'twojadomena.pl';` i uruchom `node tools/build.js`.
Powstaną pliki `CNAME`, `robots.txt`, `sitemap.xml` i znaczniki canonical.

## 2. Repozytorium

Publiczne repo na GitHubie (dowolna nazwa, np. `kimeria-strona`), gałąź `main`.
Settings → Pages → Source: *Deploy from a branch*, `main`, folder `/ (root)`.
Custom domain: `twojadomena.pl`, potem zaznacz **Enforce HTTPS**, kiedy będzie dostępne.

## 3. Rekordy DNS u rejestratora

| Typ   | Nazwa (host)  | Wartość                      |
|-------|---------------|------------------------------|
| A     | `@` (pusta)   | `185.199.108.153`            |
| A     | `@`           | `185.199.109.153`            |
| A     | `@`           | `185.199.110.153`            |
| A     | `@`           | `185.199.111.153`            |
| AAAA  | `@`           | `2606:50c0:8000::153`        |
| AAAA  | `@`           | `2606:50c0:8001::153`        |
| AAAA  | `@`           | `2606:50c0:8002::153`        |
| AAAA  | `@`           | `2606:50c0:8003::153`        |
| CNAME | `www`         | `LOGIN.github.io.`           |

Usuń domyślne rekordy A/AAAA/CNAME rejestratora dla `@` i `www` (parking), jeśli są.
Propagacja trwa od kilku minut do kilku godzin, certyfikat HTTPS GitHub wystawia sam.

Zalecane: GitHub → Settings (konto) → Pages → **Add a verified domain**. GitHub poda rekord TXT
`_github-pages-challenge-LOGIN`, który chroni domenę przed przejęciem przez cudze repo.

## 4. Weryfikacja w Google (Play Console)

1. https://search.google.com/search-console → Dodaj usługę → typ **Domena** → `twojadomena.pl`.
2. Google poda rekord TXT (`google-site-verification=...`), dodaj go w DNS dla `@`.
3. Kliknij „Zweryfikuj” (jeśli nie przejdzie od razu, spróbuj po godzinie).
4. Play Console: konto dewelopera → witryna: `https://twojadomena.pl`.
   Przy każdej aplikacji URL polityki prywatności:
   - `https://twojadomena.pl/dobitka/prywatnosc/`
   - `https://twojadomena.pl/agrobilans/prywatnosc/`
   - `https://twojadomena.pl/wykonbilans/prywatnosc/`

## 5. Później

- `app-ads.txt` (AdMob, Dobitka): w katalogu głównym, treść
  `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` z prawdziwym ID wydawcy AdMob.
  Strona dewelopera w Play musi wskazywać tę samą domenę.
- Linki do Google Play: pole `play` przy każdej aplikacji w `tools/build.js`.
- Opcjonalnie poczta `kontakt@domena` → Gmail przez Cloudflare Email Routing (wymaga DNS w Cloudflare).
