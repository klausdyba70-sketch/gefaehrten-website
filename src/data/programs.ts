export interface Program {
  slug: string;
  parentSlug?: string;
  title: string;
  subtitle: string;
  label: string;
  videoSrc: string;
  headerIntro: {
    headline: string;
    text: string;
  };
  intro: {
    headline: string;
    detailedHeadline?: string;
    text1: string;
    text2: string;
    text3: string;
  };
  highlight: {
    headline: string;
    subline: string;
    text: string;
  };
  weekends: {
    title: string;
    subtitle: string;
    text: string;
  }[];
  curriculum: {
    id: string;
    title: string;
    items: string[];
  }[];
  dates: {
    date: string;
    location: string;
    status?: string;
  }[];
  price: string;
  bookingOptions: {
    id: string;
    label: string;
    date?: string;
    price: string;
    type: "main" | "extra" | "financing" | "course";
  }[];
  isDirectLink: boolean;
  category: "Ausbildung" | "Seminar" | "Praxiskreis";
}

export const programs: Program[] = [
  {
    slug: "traumatraining",
    title: "Traumatraining",
    subtitle: "6 Blöcke / 3 Tage",
    label: "Gefährten · Training",
    videoSrc: "/videos/hero-video.mp4",
    isDirectLink: true,
    headerIntro: {
      headline: "Was wir für uns tun, wirkt weiter.",
      text: "Ein Mensch, der sich selbst begegnet, verändert auch das, womit er verbunden ist. Unsere Lehrweise folgt einem roten Faden, der Orientierung gibt – im Verstehen und im Erleben. Zu Beginn entsteht ein Zugang über das Nervensystem und die Frage, wie sich Trauma im Körper zeigt. Darauf aufbauend vertieft sich die Haltung und die Qualität des Kontakts. Im weiteren Verlauf rückt die Arbeit im Hier und Jetzt in den Mittelpunkt – nicht die Geschichte, sondern das, was sich im Moment zeigt. \n\nSo entsteht Schritt für Schritt eine Praxis, die sich nicht an festen Abläufen orientiert, sondern am Menschen. Eine Begleitung, die klar ist und gleichzeitig mitfühlend. Die nicht aus Anstrengung entsteht, sondern aus innerer Stabilität. \n\nAus dieser Verbindung entsteht eine Form von Begleitung, die nicht gesteuert werden muss, sondern sich im Kontakt entfaltet."
    },
    intro: {
      headline: "TRAUMA VERSTEHEN. MENSCHEN SICHER BEGLEITEN.",
      text1: "In diesem Jahrestraining lernst du, traumatische Erfahrungen traumasicher und humanistisch zu begleiten – mit einem einzigartigen Mix aus Körperarbeit, Gestalt- und systemischen Ansätzen.",
      text2: "Über 6 Wochenenden vertiefst du Haltung, Praxis und Selbsterfahrung gleichzeitig und wendest die Inhalte direkt an.",
      text3: "Dieses Training macht dich bereit, sicher, präsent und kreativ in der Arbeit mit Klient*innen zu sein – ob als Einstieg oder zur Vertiefung."
    },
    highlight: {
      headline: "Wissen – Werkzeug – Haltung",
      subline: "6 Module | 6 Wochenenden | 1 Haltung",
      text: "An 6 Wochenenden erlebst du einen einzigartigen Mix – gewürzt mit einem tieferen Verständnis und einem wegweisenden Rahmen – aus Körperarbeit, Gestalttherapie, klientenzentrierter Haltung und systemischen Perspektiven. Alles praxisnah, erfahrungsorientiert und direkt anwendbar. Wir arbeiten mit Blick auf den gesunden Kern eines Menschen und darauf, wie er sich in der Realität entfalten kann: sichtbar, verkörpert, lebendig."
    },
    weekends: [
      { title: "Wochenende 1", subtitle: "Trauma verstehen – Nervensystem, Sprache und Orientierung", text: "Am ersten Wochenende entsteht die Grundlage für alles Weitere. Wir beginnen nicht mit Methoden, sondern mit einem Perspektivwechsel. Trauma wird hier nicht nur als Ereignis verstanden, sondern als Zustand im Nervensystem, der sich im Erleben, im Kontakt und in der Beziehung zeigt. Die Polyvagal-Theorie dient dabei als Orientierung – nicht als concept, das man „weiß“, sondern als etwas, das im eigenen Erleben nachvollziehbar wird. Ein zentraler Unterschied in unserer Arbeit liegt darin, dass wir beginnen, Zustände nicht nur zu erkennen, sondern auch sprachlich zu differenzieren. Sprache wird zu einem Teil der Begleitung – nicht erklärend, sondern verbindend. So entsteht ein erstes Gefühl dafür, wie traumasichere Begleitung aussehen kann: weniger eingreifen, mehr wahrnehmen, präziser benennen – und damit Regulation ermöglichen." },
      { title: "Wochenende 2", subtitle: "Haltung & Beziehung – Co-Regulation im Kontakt", text: "Im zweiten Wochenende rückt die Haltung in den Mittelpunkt. Hier wird spürbar, dass Begleitung nicht primär durch Techniken entsteht, sondern durch den Zustand der begleitenden Person. Die klientenzentrierte Haltung wird vertieft und in einen traumasicheren Kontext übersetzt. Es geht nicht mehr nur um Empathie oder Verstehen, sondern um die Frage, wie sich Beziehung regulierend auswirkt. Co-Regulation wird dabei nicht als „etwas tun für den anderen“ verstanden, sondern als ein Geschehen im Kontakt. Der eigene Zustand, die eigene Präsenz und das eigene Nervensystem werden Teil der Begleitung. So entsteht ein Verständnis dafür, dass das, was zwischen zwei Menschen geschieht, oft wirksamer ist als jede Intervention." },
      { title: "Wochenende 3", subtitle: "Körper & Beziehungstrauma – verkörperte Muster verstehen", text: "Im dritten Wochenende kommt der Körper stärker in den Fokus – nicht als Technik, sondern als Ausdruck von Erfahrung. Die bekannten körperorientierten Ansätze werden neu gelesen: Die sogenannten „Strukturen“ erscheinen nicht mehr als Typologien, sondern als verkörperte Formen von Anpassung, die in Beziehung entstanden sind. Der Körper wird dabei nicht interpretiert oder „bearbeitet“, sondern als Informationsquelle verstanden. Wir lernen, ihn wahrzunehmen, ohne ihn zu drängen – und mit ihm zu arbeiten, ohne ihn zu überfordern. So entsteht eine körperorientierte Begleitung, die Halt gibt, statt zu intensivieren." },
      { title: "Wochenende 4", subtitle: "Gestalt & Gegenwart – Arbeiten im Hier und Jetzt", text: "Im vierten Wochenende wird die Gestalttherapie in einen neuen Zusammenhang gestellt. Der Fokus verschiebt sich weg von Konfrontation und intensiver Aufarbeitung hin zur Gegenwart. Wir arbeiten mit dem, was sich im Moment zeigt – im Kontakt, im Erleben, in der Beziehung. Nicht das „Warum“ steht im Vordergrund, sondern das „Wie zeigt es sich jetzt“. Kreative Methoden wie Imagination oder Arbeit mit inneren Anteilen werden so eingesetzt, dass sie Sicherheit unterstützen und Wahlmöglichkeiten eröffnen. So wird Gestalt zu einem Raum für Erfahrung – nicht für Überforderung." },
      { title: "Wochenende 5", subtitle: "Systemisches Arbeiten – Fragen, die Verbindung schaffen", text: "Das fünfte Wochenende widmet sich der systemischen Perspektive – mit einer entscheidenden Verschiebung. Fragen bleiben ein zentrales Werkzeug. Doch sie dienen nicht mehr in erster Linie dazu, Zusammenhänge zu erklären oder Informationen zu sammeln. Stattdessen unterstützen sie den inneren Kontakt des Menschen zu sich selbst. Sie helfen, Wahrnehmung zu vertiefen, statt nur Verständnis zu erweitern. So entsteht eine Form des Fragens, die nicht neugierig im Außen sucht, sondern Verbindung im Inneren ermöglicht." },
      { title: "Wochenende 6", subtitle: "Integration & Verkörperung – eine eigene Praxis entsteht", text: "Im letzten Wochenende werden die verschiedenen Ansätze zusammengeführt. Es geht nicht mehr um einzelne Methoden, sondern um die Entwicklung einer eigenen Form der Begleitung. Eine Praxis, die aus Wahrnehmung, Erfahrung und Haltung entsteht. Die Teilnehmenden beginnen, ihren eigenen Stil zu finden – jenseits von Vorgaben, aber getragen von einem klaren inneren Verständnis. So entsteht eine Form von Begleitung, die nicht gesteuert werden muss – sondern sich im Kontakt entfaltet." },
    ],
    curriculum: [
      { id: "WE 1", title: "Trauma verstehen", items: ["Trauma als Zustand im Nervensystem (nicht nur Ereignis)", "Grundlagen der Polyvagal-Theorie im Erleben", "Zustände erkennen: Aktivierung, Dämpfung, Kontakt", "Sprache als regulierendes und verbindendes Werkzeug", "Erste Schritte in Selbst- und Co-Regulation"] },
      { id: "WE 2", title: "Haltung & Beziehung", items: ["Haltung als zentraler Wirkfaktor in der Begleitung", "Co-Regulation als Geschehen im Kontakt", "Eigenen Zustand wahrnehmen und einbeziehen", "Kontaktfenster erkennen und halten", "Präsenz statt Intervention"] },
      { id: "WE 3", title: "Körper & Beziehungstrauma", items: ["Körper als Ausdruck von Anpassung und Erfahrung", "Fünf Strukturen als verkörperte Beziehungsmuster", "Körpersprache wahrnehmen ohne zu interpretieren", "Traumasichere Körperarbeit (Tempo, Dosierung, Wahl)", "Erdung und körperliche Orientierung im Kontakt"] },
      { id: "WE 4", title: "Gestalt & Gegenwart", items: ["Arbeiten im Hier & Jetzt statt in der Geschichte", "Kontaktunterbrechungen erkennen", "Imagination und inneranteile traumasicher nutzen", "Präsenz statt Konfrontation", "Begleitung im aktuellen Erleben"] },
      { id: "WE 5", title: "Systemisches Arbeiten", items: ["Fragen als Zugang zu innerem Kontakt", "Unterschied zwischen Verstehen und Verbinden", "Sprache, die Orientierung gibt statt überfordert", "Arbeit mit Beziehungssystemen und Dynamiken", "Klarheit ohne Deutung"] },
      { id: "WE 6", title: "Integration & Verkörperung", items: ["Verbindung aller Ansätze in eine eigene Praxis", "Entwicklung einer individuellen therapeutischen Haltung", "Zusammenspiel von Körper, Beziehung und Sprache", "Praxis, Reflexion und Supervision", "Verkörperung und Transfer in den Alltag"] }
    ],
    dates: [
      { date: "20.02.2026 – 22.02.2026", location: "Wochenende 1" },
      { date: "17.04.2026 – 19.04.2026", location: "Wochenende 2" },
      { date: "05.06.2026 – 07.06.2026", location: "Wochenende 3" },
      { date: "10.07.2026 – 12.07.2026", location: "Wochenende 4" },
      { date: "18.09.2026 – 20.09.2026", location: "Wochenende 5" },
      { date: "13.11.2026 – 15.11.2026", location: "Wochenende 6" },
    ],
    price: "€ 3240,-",
    bookingOptions: [
      { id: "tt-main", label: "JAHRESTRAINING", date: "20.02.2026 - 15.11.2026", price: "3240,- €", type: "main" },
      { id: "tt-fin", label: "Finanzierungshilfe: 6 Raten á 550,- €", price: "3300,- €", type: "financing" }
    ],
    category: "Ausbildung"
  },
  {
    slug: "vertiefungsseminare",
    title: "Vertiefungsseminare",
    subtitle: "Weiterbildung & Selbsterfahrung",
    label: "Angebot · Wochenenden",
    videoSrc: "/videos/hero-video.mp4",
    isDirectLink: true,
    headerIntro: {
      headline: "Vertiefung braucht Raum.",
      text: "Unsere Vertiefungsseminare bieten die Möglichkeit, spezifische Themen der traumasicheren Begleitung zu erkunden und die eigene therapeutische Haltung zu festigen. \n\nIn einem geschützten Rahmen verbinden wir Theorie mit tiefer Selbsterfahrung. Hier geht es nicht nur um das Erlernen neuer Techniken, sondern um die Integration des Erlernten in die eigene Persönlichkeit."
    },
    intro: {
      headline: "RAUM FÜR ENTWICKLUNG.",
      text1: "Diese Seminare richten sich an Absolventen des Traumatrainings sowie an erfahrene Begleiter aus psychosozialen Berufen.",
      text2: "In themenspezifischen Modulen tauchen wir tief in die Dynamiken von Trauma, Bindung und Verkörperung ein.",
      text3: "Jedes Seminar ist eine Einladung, die eigene Präsenz zu verfeinern und neue Perspektiven für die Praxis zu gewinnen."
    },
    highlight: {
      headline: "Fokus – Tiefe – Integration",
      subline: "Spezialisierte Module | Erfahrene Leitung",
      text: "Wir arbeiten in kleinen Gruppen, um eine hohe Prozessqualität und individuelle Begleitung zu gewährleisten. Die Seminare sind praxisorientiert und bieten viel Raum für Reflexion und Austausch."
    },
    weekends: [
      { title: "Seminar A", subtitle: "Frühkindliche Bindungsmuster", text: "In diesem Seminar untersuchen wir, wie frühe Beziehungserfahrungen unser Nervensystem prägen und wie wir diese Muster in der heutigen Begleitung achtsam adressieren können." },
      { title: "Seminar B", subtitle: "Schocktrauma & Regulation", text: "Der Fokus liegt hier auf der Arbeit mit akuten Belastungsreaktionen und der Wiederherstellung der Selbstregulation nach überwältigenden Ereignissen." }
    ],
    curriculum: [
      { id: "Modul 1", title: "Theoretische Vertiefung", items: ["Aktuelle Forschungsergebnisse der Psychotraumatologie", "Bindungstheorie in der Praxis", "Neurobiologische Grundlagen der Heilung"] },
      { id: "Modul 2", title: "Praxis & Supervision", items: ["Fallarbeit und Supervision", "Live-Demos und Übungsgruppen", "Transfer in den eigenen Berufsalltag"] }
    ],
    dates: [
      { date: "Termine auf Anfrage", location: "Köln / Online" }
    ],
    price: "auf Anfrage",
    bookingOptions: [],
    category: "Seminar"
  },
  {
    slug: "tanzkomplizen",
    title: "Tanzkomplizen",
    subtitle: "Der Praxiskreis",
    label: "Angebot · Praxiskreis",
    videoSrc: "/videos/hero-video.mp4",
    isDirectLink: true,
    headerIntro: {
      headline: "Gemeinsam wachsen.",
      text: "Die Tanzkomplizen sind ein fortlaufender Praxiskreis für Menschen, die sich in einer lebendigen, verkörperten Gemeinschaft weiterentwickeln wollen. \n\nHier verbinden wir die Weisheit des Körpers mit der Kraft der Begegnung. Es ist ein Raum zum Üben, Ausprobieren und zum ehrlichen Austausch über die Herausforderungen in der Arbeit mit Menschen."
    },
    intro: {
      headline: "VERKÖRPERTE GEMEINSCHAFT.",
      text1: "Ein regelmäßiges Treffen für alle, die dranbleiben wollen – an sich selbst und an ihrer professionellen Entwicklung.",
      text2: "Wir nutzen Bewegung, Atem und achtsamen Dialog, um wieder in Verbindung mit unserer Kraft und Intuition zu kommen.",
      text3: "Ein Ort der Inspiration und des gegenseitigen Halts."
    },
    highlight: {
      headline: "Lebendigkeit – Kontakt – Flow",
      subline: "Regelmäßige Termine | Offene Gruppe",
      text: "Keine festen Abläufe, sondern ein Fließen mit dem, was im Moment präsent ist. Wir tanzen mit den Schatten und dem Licht, um mehr Ganzheit in unser Leben und unsere Arbeit zu bringen."
    },
    weekends: [
      { title: "Praxisabend", subtitle: "Themenoffene Abende", text: "Wir starten mit einer Bewegungsphase und gehen dann in den Austausch und die gemeinsame Reflexion über." }
    ],
    curriculum: [
      { id: "Fokus", title: "Die Säulen der Tanzkomplizen", items: ["Body-Mind Centering Elemente", "Authentic Movement", "Systemische Aufstellungsarbeit im Raum", "Sharing & Reflection"] }
    ],
    dates: [
      { date: "Jeden 1. Dienstag im Monat", location: "Köln" }
    ],
    price: "€ 35,- pro Abend",
    bookingOptions: [
      { id: "tanz-main", label: "Praxisabend", date: "Jeden 1. Dienstag im Monat", price: "35,- €", type: "main" }
    ],
    category: "Praxiskreis"
  },
  {
    slug: "beruehrung",
    parentSlug: "vertiefungsseminare",
    title: "Berührung",
    subtitle: "Die Kraft der achtsamen Begegnung",
    label: "Vertiefung · Seminar",
    videoSrc: "/videos/hero-video.mp4",
    isDirectLink: false,
    headerIntro: {
      headline: "Wo Worte enden, beginnt Berührung.",
      text: "In der Arbeit mit Trauma ist Berührung ein mächtiges, aber auch sensibles Werkzeug. In diesem Seminar erforschen wir, wie achtsame, absichtslose Berührung zur Regulation des Nervensystems beitragen kann."
    },
    intro: {
      headline: "KÖRPERLICHE RESONANZ.",
      text1: "Wir lernen, die Grenzen unserer Klient*innen zu achten und gleichzeitig einen Raum tiefer Sicherheit durch physische Präsenz zu schaffen.",
      text2: "Themen sind unter anderem die Qualität des Kontakts, energetische Grenzen und die Integration von Körperarbeit in die therapeutische Sitzung.",
      text3: "Ein Seminar für alle, die ihre Begleitung um eine körperliche Dimension erweitern möchten."
    },
    highlight: {
      headline: "Präsenz – Grenze – Heilung",
      subline: "Körperorientierte Vertiefung",
      text: "Erfahre die transformative Kraft der Berührung jenseits von Techniken – als reine Haltung der Einstimmung."
    },
    weekends: [
      { title: "Modul 1", subtitle: "Einstimmung & Resonanz", text: "Wir beginnen mit der eigenen Körperwahrnehmung als Basis für jeden Kontakt." }
    ],
    curriculum: [
      { id: "Inhalt", title: "Schwerpunkte", items: ["Ethische Grundlagen der Berührung", "Nervensystem & Co-Regulation", "Arbeit mit dem Faszien-Gewebe", "Energetische Präsenz"] }
    ],
    dates: [{ date: "Termine 2026", location: "Köln" }],
    price: "€ 480,-",
    bookingOptions: [
      { id: "ber-main", label: "1 Wochenende / 3 Tage", date: "Termin folgt", price: "480,- €", type: "main" }
    ],
    category: "Seminar"
  },
  {
    slug: "projektion-beziehung",
    parentSlug: "vertiefungsseminare",
    title: "Projektion & Beziehung",
    subtitle: "Klarheit im therapeutischen Kontakt",
    label: "Vertiefung · Seminar",
    videoSrc: "/videos/hero-video.mp4",
    isDirectLink: false,
    headerIntro: {
      headline: "Der Spiegel des Gegenübers.",
      text: "Was geschieht zwischen uns, wenn wir arbeiten? Übertragungen und Projektionen sind keine Hindernisse, sondern wertvolle Informationen für den Prozess."
    },
    intro: {
      headline: "BEZIEHUNG ALS RAUM.",
      text1: "Wir untersuchen die Dynamiken von Übertragung und Gegenübertragung im Kontext von Trauma.",
      text2: "Wie erkenne ich meine eigenen Anteile im Kontakt? Wie bleibe ich klar und präsent, wenn alte Muster im Raum stehen?",
      text3: "Ein Seminar zur Verfeinerung der therapeutischen Wahrnehmung."
    },
    highlight: {
      headline: "Klarheit – Spiegel – Kontakt",
      subline: "Beziehungsorientierte Vertiefung",
      text: "Lerne, Projektionen als Brücken zum tieferen Verständnis deines Gegenübers zu nutzen."
    },
    weekends: [
      { title: "Modul 1", subtitle: "Übertragung verstehen", text: "Theoretische Grundlagen und praktische Übungen zur Wahrnehmung von Beziehungsdynamiken." }
    ],
    curriculum: [
      { id: "Inhalt", title: "Schwerpunkte", items: ["Gegenübertragung als Werkzeug", "Grenzmanagement", "Arbeit mit dem 'Dritten Raum'", "Selbsterfahrung"] }
    ],
    dates: [{ date: "Termine 2026", location: "Köln" }],
    price: "€ 480,-",
    bookingOptions: [
      { id: "proj-main", label: "1 Wochenende / 3 Tage", date: "Termin folgt", price: "480,- €", type: "main" }
    ],
    category: "Seminar"
  },
  {
    slug: "liebe-sexualitaet",
    parentSlug: "vertiefungsseminare",
    title: "Liebe & Sexualität",
    subtitle: "1 Wochenende / 3 Tage",
    label: "PRAXISVERTIEFUNG-SEMINAR",
    videoSrc: "/videos/hero-video.mp4",
    isDirectLink: false,
    headerIntro: {
      headline: "Wo Worte enden, beginnt Berührung.",
      text: "In diesen Seminaren vertiefen wir zentrale Aspekte traumasicheren Begleitung. Jedes Thema steht für sich – und gleichzeitig gehören sie zusammen. Es geht um das, was im therapeutischen Kontakt geschieht: wie Beziehung entsteht, wie sie sich verändert, und wie sie uns Informationen gibt. Manchmal zeigt sich das im Spiegel der Beziehung. Manchmal im Körper. Und manchmal in Bereichen, die besonders sensibel sind – wie Nähe, Intimität und Sexualität. \n\nDie Seminare laden dazu ein, diese Dynamiken nicht nur zu verstehen, sondern im eigenen Erleben zu erforschen. Nicht als Technik. Sondern als Entwicklung einer Haltung, die differenziert, wahrnehmend und tragfähig ist. So entsteht eine Begleitung, die nicht trennt – sondern verbindet."
    },
    intro: {
      headline: "WENN LIEBE IM KÖRPER KEINEN KONTAKT FINDET",
      detailedHeadline: "Verletzte Intimität verstehen und begleiten",
      text1: "Anziehung, Intimität und Sexualität gehören zum Menschsein. Und gleichzeitig können sie sich auf eine Weise entwickeln, die den Kontakt verwirrend macht – innerlich und im Miteinander.",
      text2: "Wenn der Übergang von Liebe als Gefühl in die körperliche Erfahrung nicht gesehen oder gehalten wird, entsteht oft eine Form von Beziehung, in der Intimität an Bedingungen geknüpft ist. Das kann Herz und Körper voneinander trennen – statt sie zu verbinden.",
      text3: "Dieses Seminar richtet den Blick auf genau diese sensiblen Zusammenhänge. Nicht, um zu erklären oder zu bewerten, sondern um einen Zugang zu öffnen, der Orientierung gibt. Ein Zugang, der es ermöglicht, sich selbst wahrzunehmen – und im Kontakt zu bleiben, auch wenn es widersprüchlich wird."
    },
    highlight: {
      headline: "Intimität – Scham – Vitalität",
      subline: "Themenspezifische Vertiefung",
      text: "Entwickle eine sichere Haltung, um Klient*innen in ihren intimsten Veränderungsprozessen zu begleiten."
    },
    weekends: [
      { 
        title: "Inhalt", 
        subtitle: "Themenschwerpunkte", 
        text: "Wir erforschen die Verbindung von Bindungstrauma und sexueller Entwicklung. Wie schaffen wir Sicherheit für Themen, die oft mit Scham besetzt sind? Wie fördern wir die Integration von Körper und Lust?" 
      }
    ],
    curriculum: [
      { 
        id: "Fokus", 
        title: "Lerninhalte", 
        items: [
          "wahrnehmen, wie sich Nähe, Spannung und Rückzug im eigenen Erleben zeigen",
          "Unterschiede spüren zwischen Wunsch, Bedürfnis und körperlicher Reaktion",
          "erste Zugänge, die Herz und Körper wieder miteinander verbinden",
          "Begleitung von Momenten, in denen Intimität unsicher oder widersprüchlich wird",
          "mehr Orientierung im Umgang mit intensiven Beziehungsdynamiken"
        ] 
      }
    ],
    dates: [
      { 
        date: "Termin folgt", 
        location: "1 Wochenende / 3 Tage",
        status: ""
      }
    ],
    price: "€ 480,-",
    bookingOptions: [
      { id: "ls-main", label: "1 Wochenende / 3 Tage", date: "Termin folgt", price: "480,- €", type: "main" }
    ],
    category: "Seminar"
  }
];
