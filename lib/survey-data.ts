export type QuestionType = "radio" | "checkbox" | "textarea" | "scale" | "code" | "generated-code";

export interface Question {
  id: string;
  text: string;
  examples?: string;
  note?: string;
  type: QuestionType;
  options?: string[];
  scaleLabels?: { low: string; high: string };
  optional?: boolean;
  placeholder?: string;
}

export interface Section {
  id: string;
  title: string;
  preface: string;
  scored?: boolean;
  questions: Question[];
}

export const sections: Section[] = [
  {
    id: "intro",
    title: "Over jou",
    preface:
      "We maken een willekeurige code voor je aan. Hiermee kunnen we je antwoorden later vergelijken met een eventuele vervolgmeting, zonder te weten wie je bent.",
    scored: false,
    questions: [
      {
        id: "code",
        text: "Jouw persoonlijke code",
        note: "Het systeem heeft een willekeurige code voor je aangemaakt. Schrijf deze op of maak een foto - je hebt hem nodig als we later een vervolgmeting doen. Niemand kan aan deze code zien wie je bent.",
        type: "generated-code",
        placeholder: "",
      },
    ],
  },
  {
    id: "sound",
    title: "Geluid",
    preface: "Deze vragen gaan over geluid en lawaai op je werkplek.",
    scored: true,
    questions: [
      {
        id: "q1",
        text: "Hoe vaak maakt achtergrondgeluid het moeilijker om je te concentreren?",
        examples: "(gesprekken, telefoons, printers, ventilatie)",
        type: "scale",
        scaleLabels: { low: "Nooit", high: "Bijna altijd" },
      },
      {
        id: "q2",
        text: "Als er een onverwacht geluid klinkt, hoeveel impact heeft dat op jou?",
        examples: "(een alarm, iets dat valt, een plotseling harde stem)",
        type: "scale",
        scaleLabels: { low: "Geen impact", high: "Veel impact" },
      },
      {
        id: "q3",
        text: "Hoe tevreden ben je over de mogelijkheid om een stillere plek op te zoeken als je dat nodig hebt?",
        type: "scale",
        scaleLabels: { low: "Zeer ontevreden", high: "Zeer tevreden" },
      },
    ],
  },
  {
    id: "light",
    title: "Licht",
    preface: "Deze vragen gaan over verlichting op je werkplek.",
    scored: true,
    questions: [
      {
        id: "q4",
        text: "Hoe vaak bezorgt de verlichting op je werkplek je fysiek ongemak?",
        examples: "(hoofdpijn, vermoeide ogen, sneller moe worden)",
        type: "scale",
        scaleLabels: { low: "Nooit", high: "Bijna altijd" },
      },
      {
        id: "q5",
        text: "Welk type verlichting wordt er vooral gebruikt op jouw werkplek?",
        type: "checkbox",
        options: [
          "TL-buizen",
          "LED-panelen aan het plafond",
          "Gewone lampen of peertjes",
          "Natuurlijk daglicht via ramen",
          "Bureaulampen",
          "Dat weet ik niet zeker",
          "Anders",
        ],
      },
      {
        id: "q6",
        text: "Hoe tevreden ben je over de mogelijkheid om de verlichting bij je werkplek aan te passen?",
        examples:
          "(plafondlamp uitzetten, bureaulamp gebruiken, bij het raam gaan zitten)",
        type: "scale",
        scaleLabels: { low: "Zeer ontevreden", high: "Zeer tevreden" },
      },
    ],
  },
  {
    id: "temperature",
    title: "Temperatuur en lucht",
    preface:
      "Deze vragen gaan over hoe temperatuur en luchtkwaliteit je beïnvloeden op het werk.",
    scored: true,
    questions: [
      {
        id: "q7",
        text: "Hoe comfortabel is de temperatuur op je werkplek meestal voor jou?",
        type: "scale",
        scaleLabels: { low: "Zeer oncomfortabel", high: "Zeer comfortabel" },
      },
      {
        id: "q8",
        text: "Hoeveel last heb je van de luchtkwaliteit op je werkplek?",
        examples: "(benauwde lucht, geurtjes, airconditioning)",
        type: "scale",
        scaleLabels: { low: "Geen last", high: "Veel last" },
      },
    ],
  },
  {
    id: "space",
    title: "Ruimte en indeling",
    preface:
      "Deze vragen gaan over de fysieke indeling van je werkplek.",
    scored: true,
    questions: [
      {
        id: "q9",
        text: "Hoe comfortabel voel je je bij de afstand tot je collega's terwijl je werkt?",
        type: "scale",
        scaleLabels: { low: "Zeer oncomfortabel", high: "Zeer comfortabel" },
      },
      {
        id: "q10",
        text: "Hoeveel invloed heeft de nabijheid van collega's op hoe goed je kunt werken?",
        type: "scale",
        scaleLabels: { low: "Geen invloed", high: "Veel invloed" },
      },
      {
        id: "q11",
        text: "Hoe tevreden ben je over de vrijheid om zelf te kiezen waar je werkt?",
        examples:
          "(naar een stillere ruimte gaan, een ander bureau, of een buitenruimte)",
        type: "scale",
        scaleLabels: { low: "Zeer ontevreden", high: "Zeer tevreden" },
      },
    ],
  },
  {
    id: "control",
    title: "Controle en voorspelbaarheid",
    preface:
      "Deze vragen gaan over hoeveel controle je hebt over je omgeving en hoe veranderingen je beïnvloeden.",
    scored: true,
    questions: [
      {
        id: "q12",
        text: "Hoeveel impact hebben veranderingen in je werkplek op jou?",
        examples: "(meubilair verplaatst, nieuwe indeling, verbouwing in de buurt)",
        type: "scale",
        scaleLabels: { low: "Geen impact", high: "Veel impact" },
      },
      {
        id: "q13",
        text: "Hoe tevreden ben je over de mate waarin je zelf dingen kunt aanpassen aan je werkomgeving?",
        examples: "(temperatuur, verlichting, achtergrondgeluid)",
        type: "scale",
        scaleLabels: { low: "Zeer ontevreden", high: "Zeer tevreden" },
      },
    ],
  },
  {
    id: "wellbeing",
    title: "Welzijn en impact",
    preface:
      "Deze laatste vragen gaan over hoe je werkplek je algehele welzijn beïnvloedt.",
    scored: true,
    questions: [
      {
        id: "q14",
        text: "Hoe vaak beïnvloedt de fysieke omgeving je energieniveau gedurende de dag?",
        type: "scale",
        scaleLabels: { low: "Nooit", high: "Bijna altijd" },
      },
      {
        id: "q15",
        text: "Hoe vaak voel je je aan het einde van een werkdag leeg specifiek door de omgeving?",
        note: "(Hiermee bedoelen we de fysieke ruimte, niet het werk zelf)",
        type: "scale",
        scaleLabels: { low: "Nooit", high: "Bijna altijd" },
      },
      {
        id: "q16",
        text: "Hoe graag kom je naar kantoor (vanwege de fysieke werkplek)?",
        note: "(Onafhankelijk van je collega's of het werk zelf - puur de ruimte)",
        type: "scale",
        scaleLabels: { low: "Zeer ongaarne", high: "Zeer graag" },
      },
      {
        id: "q17",
        text: "Hoe goed ondersteunt de werkplek jou om gefocust en productief te zijn?",
        type: "scale",
        scaleLabels: { low: "Helemaal niet", high: "Heel erg goed" },
      },
      {
        id: "q18",
        text: "Hoe zou je je algehele gevoel over je werkplek omschrijven?",
        type: "scale",
        scaleLabels: { low: "Zeer onprettig", high: "Zeer prettig" },
      },
      {
        id: "q19_open",
        text: "Is er iets aan je werkplek dat je helpt om goed te werken?",
        type: "textarea",
        optional: true,
        placeholder:
          "Je mag zoveel of zo weinig schrijven als je wilt. Dit veld is optioneel.",
      },
      {
        id: "q20_open",
        text: "Is er iets aan je werkplek dat het moeilijker maakt om te werken?",
        type: "textarea",
        optional: true,
        placeholder:
          "Je mag zoveel of zo weinig schrijven als je wilt. Dit veld is optioneel.",
      },
      {
        id: "q21_open",
        text: "Is er iets over hoe jij je werkplek ervaart waar nog nooit naar gevraagd is, maar dat je wel belangrijk vindt?",
        type: "textarea",
        optional: true,
        placeholder:
          "Hier komen vaak de meest waardevolle inzichten vandaan. Helemaal optioneel.",
      },
    ],
  },
];

export const totalSections = sections.length;
