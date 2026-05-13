export interface ContentPage {
  slug: string;
  parentSlug?: string;
  title: string;
  label: string;
  videoSrc?: string;
  headerIntro: {
    headline: string;
    text: string;
  };
  sections: {
    type: "text" | "quote" | "image" | "highlight";
    content: string;
    headline?: string;
    subtitle?: string;
    image?: string;
    button?: {
      label: string;
      url: string;
    };
  }[];
}

export const contentPages: ContentPage[] = [
  {
    slug: "was-wirkt-im-training",
    parentSlug: "haltung-und-ansatz",
    title: "Was wirkt im Training",
    label: "Haltung & Ansatz",
    videoSrc: "/videos/hero-video.mp4",
    headerIntro: {
      headline: "Warum Begegnung oft tiefer wirkt als Methode",
      text: "1. Was wirkt im Gefährten Traumatraining? Humanistische Haltung in traumasicherer Begleitung.\nDie humanistischen Therapieformen haben über viele Jahre einen Raum geschaffen, in dem Entwicklung möglich wird – getragen von Empathie, Echtheit und der Würde des Menschen. Auf diesem Boden baut das Gefährten Traumatraining auf. Und erweitert ihn um eine Perspektive, die heute nicht mehr wegzudenken ist:\ndas Verständnis des Nervensystems und die Dynamik von Trauma. Denn Erkenntnis allein reguliert kein Nervensystem. Was sich dabei verändert, ist nicht die Haltung – sondern der Zugang. Wir schauen nicht nur auf Konflikte, sondern auf die Zustände, in denen sie entstehen. Nicht nur auf Verhalten, sondern auf die Überlebensmuster, die es geprägt haben. Nicht nur auf das, was verstanden werden will, sondern auf das, was zuerst Sicherheit braucht, um überhaupt erfahrbar zu werden."
    },
    sections: [
      {
        type: "text",
        headline: "Traumasichere Arbeit: Erfahrung statt reiner Erkenntnis",
        content: "Im Zentrum unserer Arbeit steht die Erfahrung. Wir arbeiten weniger am Verhalten und mehr mit den inneren Überlebensmustern, die es hervorgebracht haben. Statt Lösungen zu suchen, begünstigen wir Bedingungen, unter denen sich etwas lösen kann.\n\nWir arbeiten nicht nach festen Plänen, sondern folgen einer klaren Intention: Kontakt, Regulation und Würde. Das bedeutet auch: Du lernst nicht, Schritte abzuarbeiten, sondern im Kontakt zu bleiben – und daraus zu begleiten.\n\nIntegration: Vier Ansätze – eine Praxis\nDie Verbindung von humanistischen Methoden mit einer traumasicheren Perspektive ist keine Wiederholung bestehender Ansätze.\n\nIm Gegenteil: Du lernst gleichzeitig mehrere therapeutische Zugänge kennen:\nGestalt, Körperarbeit, klientenzentrierte Haltung und systemisches Denken – und verstehst, wie sie sich im traumasicheren Kontext verändern. So entsteht keine Sammlung von Methoden, sondern eine integrierte Praxis. Daraus entsteht etwas Neues: mehr Präzision, mehr Mitgefühl und mehr Wirksamkeit. Denken und Fühlen im Zusammenspiel Die Arbeit verbindet kognitive Klarheit mit verkörpertem Erleben. Eine regulierende Herz–Kopf-Achse unterstützt diesen Prozess: Denken und Fühlen wirken nicht getrennt,\nsondern im Zusammenspiel. Das ermöglicht eine Begleitung, die gleichzeitig differenziert und mitfühlend ist. Was traumasichere Begleitung ermöglicht Veränderung geschieht nicht durch Druck. Sondern dort, wo Menschen sich sicher genug fühlen, um sich selbst zu begegnen.\n\nGenau hier setzt das Gefährten Traumatraining an.\n\nEs vermittelt nicht nur Wissen oder Methoden, sondern eine Haltung, die trägt –\nin der Arbeit mit Klientinnen und Klienten ebenso wie im eigenen Erleben. Der Kern: Verbindung statt Trennung:\n\nWir überleben durch Trennung.\n\nUnd wir heilen durch Verbindung."
      },
      {
        type: "text",
        headline: "Begleitung",
        content: "Unsere Begleitung folgt keinem starren Plan. Sie entsteht im Kontakt. Nicht als Gebrauchsanleitung, sondern als ein Angebot, das sich am Menschen orientiert. Jeder bringt seine Geschichte mit, sein eigenes Tempo und die Formen von Schutz, die sich entwickelt haben.\n\nWir richten uns nicht am Allgemeinen aus, sondern am Persönlichen – in der Begleitung und in der Art, wie Wissen vermittelt wird. So entsteht Entwicklung, die nicht gemacht ist, sondern sich zeigt."
      }
    ]
  },
  {
    slug: "ueber-mich",
    parentSlug: "haltung-und-ansatz",
    title: "Über mich",
    label: "Gefährten · Dariusz",
    videoSrc: "/videos/hero-video.mp4",
    headerIntro: {
      headline: "Wer wir sind... unter anderem",
      text: "Dariusz Dahlmann"
    },
    sections: [
      {
        type: "image",
        content: "Dariusz Portrait",
        image: "/images/dariusz_portrait.webp"
      },
      {
        type: "text",
        content: "Ich wurde 1970 in Polen im Zeichen des Wassermanns geboren. Meine Eltern gaben mir den Namen Dariusz – nach dem persischen König. Sein Name bedeutet: das Gute bewahren und weitergeben. Ein Geschenk. Und eine Aufgabe. Nicht im moralischen Sinn, sondern als eine innere Ausrichtung: in allem das Gute erkennen zu können.\n\nVieles davon hat sich erst später in meinem Dasein gezeigt. Wirklich greifen konnte ich es, als ich begann, Trauma zu verstehen. Dort wurde klar, was mich schon lange begleitet hat. Mit dem Trauma-Blick auf meine Kindheit kann ich sagen: Mir ist Unmenschliches widerfahren. Und ich erlebe immer wieder, wie viele Menschen ähnliche Spuren in sich tragen.\n\nIch frage mich, wie wir gesunde Gemeinschaften gestalten wollen, wenn ihre Wurzeln verletzt sind. Es ist keine Anklage und kein Urteil, sondern eine Form von Präsenz, die das Vergangene sichtbar werden lässt. In dieser Klarheit liegt Hoffnung. Die Entwicklung der Traumaarbeit ermöglicht heute vielen Menschen, den Weg zurück zu sich zu finden – zurück zur eigenen Würde. Menschen, die in sich ein Zuhause gefunden haben, können es teilen. So entsteht menschliche Gemeinschaft.\n\nIn der Traumahaltung geht es nicht darum, Menschen zu verändern, sondern Umstände zu begünstigen, unter denen Menschen sich selbst wieder begegnen können. Wenn wir über Empathie in therapeutischer Arbeit sprechen, möchte ich etwas teilen: Ich erlebe oft diese beruhigende Wirkung, wenn ich spiegele. Ich sehe und benenne, was ich wahrnehme – so offen wie möglich, sodass es ein Angebot bleibt und der Mensch Wahl hat. Dabei entsteht eine sanfte Klarheit, etwas Fließendes, das Zusammenhänge fast von selbst verbindet.\n\nManchmal erreicht mich dabei auch etwas im Körper. Ich spüre eine Gefühlsregung, ohne sie benennen zu müssen, und bin berührt – gelegentlich sogar sichtbarer als der Mensch selbst. Das fühlt sich stimmig an. Und gerade deshalb frei. Oft braucht es dann keine Worte. Für mich zeigt sich darin ein einfacher Zusammenhang: Wenn Emotionen verkörpert sind, reagiert der Körper. Wenn sie eher auf der geistigen Ebene bleiben, wird mehr der fühlende Verstand angesprochen. Und vielleicht ist das das Wesentliche: Was sich in uns bewegt, bleibt nicht ohne Wirkung.",
        button: {
          label: "ZUR WEBSITE",
          url: "https://www.dariusz-dahlmann.de" // Replace with actual URL if different
        }
      }
    ]
  },
  {
    slug: "haltung-und-ansatz",
    title: "Haltung & Ansatz",
    label: "Philosophie",
    videoSrc: "/videos/hero-video.mp4",
    headerIntro: {
      headline: "Ein gemeinsamer Weg.",
      text: "Unsere Haltung ist geprägt von tiefer Wertschätzung für die Einzigartigkeit jedes Menschen. Wir sehen Trauma nicht als Defekt, sondern als eine Antwort auf überwältigende Erfahrungen, die heute neue Wege der Heilung sucht."
    },
    sections: [
      {
        type: "text",
        headline: "Humanistische Haltung",
        content: "Wir arbeiten auf Augenhöhe. In einer Atmosphäre von Respekt und Offenheit schaffen wir die Grundlage für tiefgehende Veränderungsprozesse."
      }
    ]
  }
];
