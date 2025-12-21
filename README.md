# Lingua — Szkoła Języków Obcych (Legionowo)

Strona internetowa szkoły językowej przygotowana w **Astro** + **Tailwind CSS** oraz gotowa konfiguracja do uruchomienia na **Cloudflare Workers** przez **Wrangler**.

## Wymagania

- Node.js (zalecane LTS)
- npm / pnpm / yarn
- Konto Cloudflare + zalogowany Wrangler (`npx wrangler login`)

## Start lokalnie (Astro)

```bash
npm install
npm run dev
```

## Konfiguracja kontaktu

Ustaw publiczne dane kontaktowe w `.env` (lub skopiuj `.env.example`):

```
PUBLIC_CONTACT_EMAIL=
PUBLIC_CONTACT_PHONE=
PUBLIC_CONTACT_CITY=Legionowo
PUBLIC_CONTACT_ADDRESS=
```

## Styling (Tailwind CSS)

- Konfiguracja: `tailwind.config.cjs`
- CSS wejściowy: `src/styles/global.css`

W razie potrzeby możesz rozszerzać theme (kolory, cienie, spacing) w `tailwind.config.cjs`.

Aplikacja uruchomi się lokalnie pod adresem z konsoli (domyślnie `http://localhost:4321`).

## Budowanie

```bash
npm run build
npm run preview
```

## Cloudflare Workers (Wrangler)

Projekt zawiera **dwa** pliki konfiguracyjne dla Wrangler:
- `wrangler.jsonc` (z komentarzami)
- `wrangler.toml`

Możesz zostawić jeden z nich — Wrangler obsłuży oba formaty.

### 1) Zaktualizuj `compatibility_date`

W pliku `wrangler.jsonc` lub `wrangler.toml` ustaw `compatibility_date` na bieżącą datę, gdy wdrażasz.

### 2) Lokalny podgląd przez Workers runtime

```bash
npm run cf:dev
```

To wykona:
- `astro build`
- `wrangler dev`

### 3) Deploy na Cloudflare Workers

```bash
npm run cf:deploy
```

To wykona:
- `astro build`
- `wrangler deploy`

Po deployu Wrangler zwróci adres `*.workers.dev`.

## Formularz „Zapisy 2025/2026”

Strona `/zapisy-2025-2026` wysyła dane do endpointu:

- `POST /api/zapisy` (demo)

Endpoint zwraca JSON. W produkcji możesz podłączyć wysyłkę e-mail, bazę (KV/D1) oraz zabezpieczenia anty‑spam.

## Pliki statyczne

- PDF z cennikiem: `/cennik-lingua.pdf` (2025/2026)
- Ilustracje (SVG, gotowe do użycia / podmiany): `/images/*.svg`
- Favicon: `/favicon.svg`

## Struktura

- `/` — Strona główna
- `/o-nas` — O nas
- `/nasi-lektorzy` — Lektorzy
- `/kontakt` — Kontakt
- `/zapisy-2025-2026` — Zapisy (formularz)
- `/regulamin-i-wsparcie`, `/polityka-prywatnosci` — dokumenty

---
