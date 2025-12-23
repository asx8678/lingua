# Placeholders

These values are centralized in `src/config/site.ts` and can be supplied via env vars. When empty, the UI falls back or hides the element.

## Booking / primary CTA
- `PUBLIC_BOOKING_URL` -> `BOOKING_URL`: external booking URL. If empty, the primary CTA links to `/kontakt#formularz`. If set to an external URL, the CTA opens in a new tab.

## Recruitment / urgency banner
- `PUBLIC_NEXT_INTAKE_MONTH` -> `NEXT_INTAKE_MONTH`: month label (for example: "wrzesien 2025").
- `PUBLIC_SLOTS_LEFT` -> `SLOTS_LEFT`: numeric slots left. Used only when provided.

## Other language pricing
- `PUBLIC_OTHER_LANG_PRICE_1ON1_FROM` -> `OTHER_LANG_PRICE_1ON1_FROM`: numeric PLN.
- `PUBLIC_OTHER_LANG_PRICE_GROUP_FROM` -> `OTHER_LANG_PRICE_GROUP_FROM`: numeric PLN.

## Test result email (level test)
- `PUBLIC_TEST_RESULT_WEBHOOK_URL` -> `TEST_RESULT_WEBHOOK_URL`: webhook URL to collect test results. If empty, the "Wyślij wynik na e-mail" block is hidden.

## Teacher specializations
- `TEACHER_SPECIALTIES` in `src/config/site.ts`: map of teacher name -> string[] of specializations. Shown on `/nasi-lektorzy` only when provided.

## Contact phone (mobile CTA)
- `PUBLIC_CONTACT_PHONE` -> `CONTACT_PHONE`: controls whether the mobile "Zadzwon" CTA shows.
