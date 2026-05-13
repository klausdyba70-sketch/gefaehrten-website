import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Reusable SEO Fields for AEO/SEO Optimization
const seoFields: any = {
  type: "object",
  name: "seo",
  label: "SEO & AEO Optimierung",
  description: "Einstellungen für Suchmaschinen und KI-Beantwortungs-Systeme.",
  fields: [
    { 
      type: "string", 
      name: "title", 
      label: "SEO Titel", 
      description: "Wird in Google & Tabs angezeigt. (Empfohlen: 50-60 Zeichen)" 
    },
    { 
      type: "string", 
      name: "description", 
      label: "Meta Beschreibung", 
      description: "Kurze Zusammenfassung für Suchergebnisse. (Empfohlen: 150-160 Zeichen)",
      ui: { component: "textarea" } 
    },
    { 
      type: "string", 
      name: "canonical", 
      label: "Canonical URL", 
      description: "Nur ausfüllen, wenn diese Seite auf eine andere verweisen soll (z.B. https://gefaehrten.de/zielseite)." 
    },
    { 
      type: "image", 
      name: "ogImage", 
      label: "Social Share Bild (OG Image)", 
      description: "Dieses Bild wird beim Teilen auf WhatsApp/Social Media angezeigt." 
    },
    { 
      type: "boolean", 
      name: "noIndex", 
      label: "Seite von Google/KI ausschließen (No-Index)", 
      description: "Aktivieren, wenn diese Seite NICHT in Suchergebnissen erscheinen soll." 
    },
  ],
};

export default defineConfig({
  branch,
  ...(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && { clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID }),
  ...(process.env.TINA_TOKEN && { token: process.env.TINA_TOKEN }),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Startseite",
        path: "content/homepage",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          seoFields,
          {
            type: "object",
            name: "hero",
            label: "Hero Bereich",
            fields: [
              { type: "string", name: "label", label: "Kleines Label" },
              { type: "string", name: "title", label: "Großer Titel" },
              { type: "string", name: "subtitle", label: "Unterzeile (Italic)" },
              { type: "string", name: "text", label: "Haupttext", ui: { component: "textarea" } },
              { type: "image", name: "video", label: "Hintergrund Video (mp4)" },
              { type: "string", name: "externalVideoUrl", label: "ODER Vimeo/YouTube URL", description: "Hintergrund-Video (Autoplay, Loop, Stumm)." },
              { type: "image", name: "image", label: "Hintergrund Bild" },
              { type: "string", name: "imageAlt", label: "Hintergrund Bild Alternativtext" },
            ],
          },
          {
            type: "object",
            name: "offer",
            label: "Angebot Einleitung",
            fields: [
              { type: "string", name: "label", label: "Kleines Label (Rose)", description: "Z.B. 'Das Angebot'" },
              { type: "rich-text", name: "headline", label: "Haupt-Headline" },
              { type: "image", name: "offerImage", label: "Angebot Einleitungs-Bild", description: "Erscheits neben dem Text." },
              { type: "string", name: "offerImageAlt", label: "Bild Alternativtext" },
              { type: "rich-text", name: "text", label: "Einleitungstext" },
              { type: "string", name: "formatsHeadline", label: "Überschrift Formate (Training/Seminare...)" },
              { type: "rich-text", name: "formatsIntro", label: "Intro Text Formate" },
              { type: "image", name: "trainingImage", label: "Vorschaubild: Training" },
              { type: "string", name: "trainingSummary", label: "Kurzbeschreibung: Training", ui: { component: "textarea" } },
              { type: "image", name: "seminarImage", label: "Vorschaubild: Seminare" },
              { type: "string", name: "seminarSummary", label: "Kurzbeschreibung: Seminare", ui: { component: "textarea" } },
              { type: "image", name: "praxiskreisImage", label: "Vorschaubild: Praxiskreis" },
              { type: "string", name: "praxiskreisSummary", label: "Kurzbeschreibung: Praxiskreis", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "Über Dariusz Kurz-Info",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "title", label: "Name" },
              { type: "rich-text", name: "content", label: "Inhalt" },
              { type: "image", name: "image", label: "Portrait Bild" },
              { type: "string", name: "imageAlt", label: "Bild Alternativtext" },
              { type: "string", name: "buttonLabel", label: "Button Text" },
            ],
          },
          {
            type: "object",
            name: "quote",
            label: "Zitat Bereich (Dunkel)",
            fields: [
              { type: "string", name: "text", label: "Zitat Text", ui: { component: "textarea" } },
              { type: "string", name: "label", label: "Label unten" },
              { type: "string", name: "subline", label: "Subline unten" },
            ],
          },
          {
            type: "object",
            name: "testimonials",
            list: true,
            label: "Testimonials (Kundenstimmen)",
            ui: {
              itemProps: (item) => ({ label: item?.name || "Neues Testimonial" }),
            },
            fields: [
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "training", label: "Training / Rolle" },
              { type: "string", name: "quote", label: "Zitat", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Profilbild" },
              { type: "string", name: "imageAlt", label: "Bild Alternativtext" },
            ],
          },
        ],
      },
      {
        name: "seminars",
        label: "Ausbildungen & Seminare",
        path: "content/seminars",
        format: "mdx",
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
        },
        fields: [
          seoFields,
          { 
            type: "string", 
            name: "category", 
            label: "Kategorie", 
            options: ["Training", "Seminar", "Praxiskreis"],
            description: "WICHTIG: Bestimmt, in welchem Bereich das Programm im Anmeldeformular erscheint."
          },
          { 
            type: "string", 
            name: "label", 
            label: "Ober-Überschrift (Label)", 
            description: "Erscheint ganz oben in kleiner, rosafarbener Schrift (z.B. 'Gefährten · Training')."
          },
          { 
            type: "string", 
            name: "title", 
            label: "Haupt-Titel", 
            isTitle: true, 
            required: true,
            description: "Die große Hauptüberschrift der Seite. HINWEIS: Um die URL zu ändern (z.B. /trauma), benennen Sie dieses Dokument in der Liste links um."
          },
           { 
            type: "image", 
            name: "videoSrc", 
            label: "Hintergrund-Video (mp4)", 
            description: "Der Pfad zum Video, das hinter dem Titel läuft (z.B. /videos/hero-video.mp4)."
          },
          { type: "string", name: "externalVideoUrl", label: "ODER Vimeo/YouTube URL" },
          { type: "image", name: "heroImage", label: "Hintergrund-Bild (Hero)" },
          { type: "string", name: "heroImageAlt", label: "Hintergrund-Bild Alternativtext" },
          { 
            type: "boolean", 
            name: "isFull", 
            label: "Programm Ausgebucht / Warteliste?", 
            description: "Wenn aktiv, ändert sich der Button zu 'WARTELISTE'." 
          },
          {
            type: "object",
            name: "headerIntro",
            label: "Header Einleitung",
            fields: [
              { type: "string", name: "headline", label: "Headline" },
              { type: "rich-text", name: "text", label: "Text" },
            ],
          },
          {
            type: "object",
            name: "intro",
            label: "Detail Einleitung",
            fields: [
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "detailedHeadline", label: "Kleine Headline" },
              { type: "string", name: "summary", label: "Kurz-Zusammenfassung (für Startseite)", ui: { component: "textarea" } },
              { type: "rich-text", name: "text1", label: "Absatz 1" },
              { type: "rich-text", name: "text2", label: "Absatz 2" },
              { type: "rich-text", name: "text3", label: "Absatz 3" },
            ],
          },
          { type: "boolean", name: "showHighlight", label: "Highlight Box (Rose) anzeigen?" },
          {
            type: "object",
            name: "highlight",
            label: "Highlight Box",
            fields: [
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "subline", label: "Subline" },
              { type: "rich-text", name: "text", label: "Text" },
            ],
          },
          { type: "boolean", name: "showWeekends", label: "Wochenenden/Module (Akkordeon) anzeigen?" },
          {
            type: "object",
            list: true,
            name: "weekends",
            label: "Wochenenden / Blöcke (Akkordeon)",
            description: "Die aufklappbaren Bereiche für die einzelnen Termine.",
            ui: {
              itemProps: (item) => ({ label: item?.title || "Neuer Block" }),
            },
            fields: [
              { type: "string", name: "title", label: "Block Titel (z.B. Block 1)" },
              { type: "string", name: "subtitle", label: "Thema (z.B. Die Haltung)" },
              { type: "string", name: "duration", label: "Dauer Label (z.B. 4 TAGE)" },
              { type: "string", list: true, name: "items", label: "Inhalt / Aufzählungspunkte" },
              { type: "rich-text", name: "text", label: "Beschreibung (Rich Text)" },
            ],
          },
          { type: "boolean", name: "showCurriculum", label: "Curriculum (Raster) anzeigen?" },
          { type: "string", name: "curriculumLabel", label: "Curriculum Über-Überschrift (Label)", description: "Standard: Curriculum · Module" },
          { type: "string", name: "curriculumHeadline", label: "Curriculum Überschrift", description: "Standard: Module im Überblick." },
          { type: "string", name: "curriculumIntro", label: "Curriculum Einleitungstext", description: "Erscheint rechts neben der Überschrift." },
          {
            type: "object",
            list: true,
            name: "curriculum",
            label: "Curriculum / Module",
            description: "Die Liste der Lerninhalte im Raster-Layout.",
            ui: { itemProps: (item) => ({ label: item?.title || "Neues Modul" }) },
            fields: [
              { type: "string", name: "id", label: "Nummer (z.B. 01)" },
              { type: "string", name: "title", label: "Modul Name" },
              { type: "string", name: "duration", label: "Dauer Label (z.B. 4 TAGE)" },
              { type: "string", list: true, name: "items", label: "Aufzählungspunkte" },
              { type: "rich-text", name: "description", label: "Inhalt / Beschreibung" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "dateGroups",
            label: "Termin-Gruppen (Sidebar)",
            description: "Hier können Sie eine oder mehrere Termin-Listen für die Sidebar anlegen.",
            ui: { 
              itemProps: (item) => ({ label: item?.headline || "Neue Termin-Gruppe" }) 
            },
            fields: [
              { type: "string", name: "headline", label: "Termine Überschrift", description: "Z.B. 'Termine 2026' oder 'Gruppe A'" },
              { type: "string", name: "subline", label: "Termine Unterzeile", description: "Erscheint unter der Überschrift." },
              {
                type: "object",
                list: true,
                name: "dates",
                label: "Termine",
                description: "Die einzelnen Termine dieser Gruppe.",
                ui: { itemProps: (item) => ({ label: `${item?.date || "Neuer Termin"} ${item?.isFull ? '(VOLL)' : ''}` }) },
                fields: [
                  { type: "string", name: "date", label: "Datum" },
                  { type: "string", name: "location", label: "Länge/Zeit" },
                  { type: "boolean", name: "isFull", label: "Termin voll? (Warteliste)" },
                  { type: "string", name: "status", label: "Zusatz-Info (z.B. 'Nur noch 1 Platz')" },
                ],
              },
            ],
          },
          { 
            type: "string", 
            name: "price", 
            label: "Regulärer Preis", 
            description: "Erscheint in der Sidebar und im Anmeldeformular (z.B. '2.400 €')."
          },
          { 
            type: "string", 
            name: "discountPrice", 
            label: "Rabatt-Preis (Optional)", 
            description: "Falls ausgefüllt, wird dieser Preis als reduzierter Preis angezeigt."
          },
          {
            type: "object",
            name: "installment",
            label: "Ratenzahlung (Formular)",
            fields: [
              { type: "boolean", name: "available", label: "Ratenzahlung möglich?" },
              { type: "string", name: "text", label: "Frei editierbarer Text (z.B. '4 Raten à 600 €')" },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Seiten (Über mich, Haltung...)",
        path: "content/pages",
        format: "mdx",
        fields: [
          seoFields,
          { type: "string", name: "title", label: "Titel", isTitle: true, required: true },
          { type: "string", name: "heroLabel", label: "Hero Label (klein, oben)" },
          { type: "string", name: "heroSubline", label: "Hero Unterzeile (unter Titel)" },
          { type: "image", name: "heroImage", label: "Hero Bild" },
          { type: "string", name: "heroImageAlt", label: "Hero Bild Alternativtext" },
          { type: "string", name: "heroVideo", label: "Hero Video URL (mp4)" },
          { type: "string", name: "externalVideoUrl", label: "ODER Vimeo/YouTube URL" },
          {
            type: "object",
            list: true,
            name: "sections",
            label: "Inhaltsabschnitte",
            ui: {
              itemProps: (item) => ({ label: `${item?.type || 'Abschnitt'}: ${item?.headline || '(ohne Headline)'}` }),
            },
            fields: [
              { type: "string", name: "type", label: "Typ", options: ["text", "highlight", "image"] },
              { type: "string", name: "headline", label: "Headline (Optional)" },
              { type: "rich-text", name: "content", label: "Inhalt" },
              { type: "image", name: "image", label: "Bild (nur bei Typ Image)" },
              { type: "string", name: "imageAlt", label: "Bild Alternativtext" },
              {
                type: "object",
                name: "button",
                label: "Button (Optional)",
                fields: [
                  { type: "string", name: "label", label: "Button Text" },
                  { type: "string", name: "url", label: "Button Link" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "anmelden",
        label: "Anmelde-Seite Texte",
        path: "content/anmelden",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          seoFields,
          { type: "string", name: "pageIntro", label: "Kurze Beschreibung", description: "Satz oben auf der Seite." },
          { 
            type: "string", 
            name: "seminarLabel", 
            label: "Überschrift Seminar-Auswahl", 
            description: "HINWEIS: Die Daten, Zeiten sowie Preise werden direkt auf der jeweiligen Seminar-Seite eingegeben." 
          },
          { type: "image", name: "heroImage", label: "Hero Bild" },
          { type: "string", name: "heroImageAlt", label: "Hero Bild Alternativtext" },
          { type: "string", name: "heroVideo", label: "Hero Video URL (mp4)" },
          { type: "string", name: "externalVideoUrl", label: "ODER Vimeo/YouTube URL" },
          { type: "rich-text", name: "introTraining", label: "Intro Training", description: "Text unter der Überschrift TRAINING" },
          { type: "rich-text", name: "introSeminar", label: "Intro Seminar", description: "Text unter der Überschrift PRAXISVERTIEFUNG-SEMINAR" },
          { type: "rich-text", name: "introPraxiskreis", label: "Intro Praxiskreis", description: "Text unter der Überschrift PRAXISKREIS" },
          { type: "rich-text", name: "legalDatenschutz", label: "Datenschutzerklärung (Text)" },
          { type: "rich-text", name: "legalTeilnahme", label: "Teilnahmebedingungen (Text)" },
          { type: "rich-text", name: "legalVerschwiegenheit", label: "Verschwiegenheit (Text)" },
          { type: "rich-text", name: "legalRuecktritt", label: "Rücktrittsbedingungen (Text)" },
          { type: "rich-text", name: "bankDetails", label: "Bankverbindung & Rechnungshinweis" }
        ],
      },
      {
        name: "kontakt",
        label: "Kontakt-Seite Texte",
        path: "content/kontakt",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          seoFields,
          { type: "string", name: "heroTitle", label: "Hero Titel" },
          { type: "string", name: "heroLabel", label: "Hero Label (klein)" },
          { type: "image", name: "heroImage", label: "Hero Bild" },
          { type: "string", name: "heroImageAlt", label: "Hero Bild Alternativtext" },
          { type: "string", name: "heroVideo", label: "Hero Video URL (mp4)" },
          { type: "string", name: "externalVideoUrl", label: "ODER Vimeo/YouTube URL" },
          { type: "rich-text", name: "introHeadline", label: "Einleitung Headline" },
          { type: "rich-text", name: "introText", label: "Einleitung Text" },
          {
            type: "object",
            name: "details",
            label: "Kontaktdetails (Sidebar)",
            fields: [
              { type: "string", name: "addressHeadline", label: "Headline Anschrift" },
              { type: "rich-text", name: "address1", label: "Anschrift 1" },
              { type: "rich-text", name: "address2", label: "Anschrift 2 (Optional)" },
              { type: "string", name: "directHeadline", label: "Headline Direkt" },
              { type: "rich-text", name: "directText", label: "Direkt Text (Email/Telefon)" },
            ]
          },
        ],
      },
      {
        name: "ueberuns",
        label: "Über uns Seite",
        path: "content/ueberuns",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          seoFields,
          { type: "string", name: "heroLabel", label: "Hero Label (klein, oben)" },
          { type: "string", name: "heroTitle", label: "Hero Titel (groß)" },
          { type: "string", name: "heroSubline", label: "Hero Unterzeile (unter Titel)" },
          { type: "image", name: "heroImage", label: "Hero Bild" },
          { type: "string", name: "heroImageAlt", label: "Hero Bild Alternativtext" },
          { type: "string", name: "heroVideo", label: "Hero Video URL (mp4)" },
          { type: "string", name: "externalVideoUrl", label: "ODER Vimeo/YouTube URL" },
          {
            type: "object",
            list: true,
            name: "sections",
            label: "Inhalts-Blöcke",
            ui: {
              itemProps: (item) => ({ label: item?.title || "Neuer Block" }),
            },
            fields: [
              { type: "string", name: "label", label: "Label (über Headline)" },
              { type: "string", name: "title", label: "Headline" },
              { type: "rich-text", name: "content", label: "Inhalt" },
              { type: "image", name: "image", label: "Bild" },
              { type: "string", name: "imageAlt", label: "Bild Alternativtext" },
              { type: "boolean", name: "imageRight", label: "Bild rechts? (Standard links)" },
            ],
          },
          {
            type: "object",
            name: "quote",
            label: "Zitat Bereich (Dunkel)",
            fields: [
              { type: "string", name: "text", label: "Zitat Text", ui: { component: "textarea" } },
              { type: "string", name: "label", label: "Label unten" },
              { type: "string", name: "subline", label: "Subline unten" },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Button am Ende (CTA)",
            fields: [
              { type: "string", name: "label", label: "Button Text" },
              { type: "string", name: "url", label: "Button Link" },
            ],
          },
        ],
      },
      {
        name: "settings",
        label: "Grundeinstellungen",
        path: "content/settings",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "siteMeta",
            label: "Globale SEO / Seite Meta",
            fields: [
              { type: "string", name: "siteUrl", label: "Haupt-Domain (z.B. https://gefaehrten.de)" },
              { type: "string", name: "siteName", label: "Seitenname (Suffix)" },
              { type: "string", name: "defaultDescription", label: "Standard-Beschreibung", ui: { component: "textarea" } },
              { type: "image", name: "defaultOgImage", label: "Standard-Vorschaubild" },
            ],
          },
          { type: "string", name: "mailchimpUrl", label: "Mailchimp Newsletter URL" },
          { type: "string", name: "contactEmail", label: "Kontakt E-Mail" },
          { type: "string", name: "contactPhone", label: "Telefonnummer" },
          {
            type: "object",
            name: "address",
            label: "Anschrift",
            fields: [
              { type: "string", name: "name", label: "Name/Institut" },
              { type: "string", name: "street", label: "Straße & Hausnummer" },
              { type: "string", name: "city", label: "PLZ & Ort" },
            ],
          },
          {
            type: "object",
            name: "socials",
            label: "Social Media",
            fields: [
              { type: "string", name: "instagram", label: "Instagram Link" },
              { type: "string", name: "facebook", label: "Facebook Link" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "navLinks",
            label: "Haupt-Navigation",
            description: "Hier können Sie die Links im Menü oben verwalten.",
            ui: {
              itemProps: (item) => ({ label: item?.label || "Neuer Link" }),
            },
            fields: [
              { type: "string", name: "label", label: "Anzeigename" },
              { 
                type: "reference", 
                name: "pageRef", 
                label: "Seite aus Liste auswählen (Empfohlen)", 
                collections: ["page", "seminars"],
                description: "Automatische Verknüpfung zur Seite."
              },
              { 
                type: "string", 
                name: "url", 
                label: "ODER Manuelle URL (z.B. /anmelden)",
                description: "Wird nur genutzt, wenn oben keine Seite ausgewählt ist."
              },
              {
                type: "object",
                list: true,
                name: "subLinks",
                label: "Unter-Links (Optional)",
                description: "Erscheinen als Dropdown-Menü.",
                ui: {
                  itemProps: (item) => ({ label: item?.label || "Unter-Link" }),
                },
                fields: [
                  { type: "string", name: "label", label: "Anzeigename" },
                  { 
                    type: "reference", 
                    name: "pageRef", 
                    label: "Seite aus Liste auswählen", 
                    collections: ["page", "seminars"] 
                  },
                  { type: "string", name: "url", label: "ODER Manuelle URL" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "redirects",
        label: "Weiterleitungen (Redirects)",
        path: "content/redirects",
        format: "json",
        ui: {
          allowedActions: { create: true, delete: false },
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "items",
            label: "Weiterleitungs-Regeln",
            ui: {
              itemProps: (item) => ({ label: `${item?.from || "..."} → ${item?.to || "..."}` }),
            },
            fields: [
              { type: "string", name: "from", label: "Alte URL (von)", description: "Z.B. /alte-seite" },
              { type: "string", name: "to", label: "Neue URL (zu)", description: "Z.B. /neue-seite" },
              {
                type: "string",
                name: "status",
                label: "Status Code",
                options: [
                  { label: "301 (Permanent)", value: "301" },
                  { label: "302 (Temporär)", value: "302" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
