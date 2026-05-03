const dailyContent = {
  motivation: "Du verlierst nur, wenn du aufgibst.",
  words: [
    { article: "die", word: "Prüfung", meaningTr: "sınav", exampleDe: "Die Prüfung ist am 3. Juni." },
    { article: "der", word: "Erfolg", meaningTr: "başarı", exampleDe: "Der Erfolg kommt mit regelmäßigem Lernen." },
    { article: "das", word: "Ziel", meaningTr: "hedef", exampleDe: "Mein Ziel ist das B1-Zertifikat." },
    { article: "die", word: "Bewerbung", meaningTr: "başvuru", exampleDe: "Ich schreibe eine Bewerbung für den Kurs." },
    { article: "der", word: "Fortschritt", meaningTr: "ilerleme", exampleDe: "Ich sehe jeden Tag einen kleinen Fortschritt." },
    { article: "das", word: "Gespräch", meaningTr: "konuşma", exampleDe: "Gespräche auf Deutsch machen mich sicherer." },
    { article: "die", word: "Aufgabe", meaningTr: "görev", exampleDe: "Die heutige Aufgabe ist ein kurzer Text." },
    { article: "der", word: "Fehler", meaningTr: "hata", exampleDe: "Jeder Fehler hilft beim Lernen." },
    { article: "das", word: "Vertrauen", meaningTr: "özgüven / güven", exampleDe: "Mit Üben wächst mein Vertrauen." },
    { article: "die", word: "Wiederholung", meaningTr: "tekrar", exampleDe: "Die Wiederholung ist sehr wichtig für B1." }
  ]
};

const fallbackTopicLevels = {
  "Plusquamperfekt": "B1",
  "Futur I": "A2",
  "Konjunktiv II": "B1+",
  "Infinitiv": "A2",
  "Relativpronomen": "B1",
  "Konjunktiv I": "B1",
  "Nominalisierung": "B1",
  "Plural": "A1",
  "Personalpronomen": "A1",
  "Verben mit Präposition": "B1+",
  "Hilfsverben": "A1",
  "Fragesätze": "A1",
  "Akkusativ": "A1",
  "Dativ": "A2",
  "Modalverben": "A1",
  "Trennbare Verben": "A1",
  "Präsens": "A1",
  "Perfekt": "A2",
  "Präpositionen": "A2",
  "Adjektivdeklination": "A2-B1",
  "Possessivpronomen": "A1",
  "Konjunktionen": "A2",
  "Imperativ": "A1",
  "Nebensätze": "A2-B1",
  "Genitiv": "B1+",
  "Passiv": "B1",
  "zu + Infinitiv": "B1",
  "Reflexivpronomen": "A2"
};

const fallbackGrammarTopics = [
  "Plusquamperfekt", "Futur I", "Konjunktiv II", "Infinitiv", "Relativpronomen", "Konjunktiv I",
  "Nominalisierung", "Plural", "Personalpronomen", "Verben mit Präposition", "Hilfsverben",
  "Fragesätze", "Akkusativ", "Dativ", "Modalverben", "Trennbare Verben", "Präsens", "Perfekt",
  "Präpositionen", "Adjektivdeklination", "Possessivpronomen", "Konjunktionen", "Imperativ",
  "Nebensätze", "Genitiv", "Passiv", "zu + Infinitiv", "Reflexivpronomen"
].map((name) => ({
  id: name.toLowerCase().replaceAll(" ", "-").replaceAll("+", "plus"),
  level: fallbackTopicLevels[name] || "B1",
  title: name,
  summary: `${name} konusu B1 düzeyinde cümle kurma ve sınav sorularında sık kullanılır.`,
  rule: `${name} konusunda temel hedef, yapının cümledeki görevini görmek ve fiil/artikel yerini doğru kurmaktır.`,
  studyAdvice: `${name} için önce kısa kuralı oku, sonra iki örnek cümleyi değiştirerek kendi cümleni üret.`,
  examples: [
    { de: `Ich übe heute das Thema ${name}.`, tr: `Bugün ${name} konusunu çalışıyorum.` },
    { de: `Dieses Thema hilft mir bei der B1-Prüfung.`, tr: "Bu konu B1 sınavında bana yardımcı olur." }
  ],
  commonMistake: "Kuralı ezberleyip cümlede fiilin ve kasus/artikel değişiminin yerini kontrol etmemek.",
  tips: [
    `${name} için kısa kuralı öğren ve 3 örnek yaz.`,
    "Önce kalıp cümleyi ezberle, sonra kendi cümleni üret.",
    "Sınav tarzı sorularda zaman/kasus uyumunu kontrol et."
  ],
  sourceName: "Evde Almanca",
  sourceUrl: "https://evdealmanca.com/"
}));

const state = {
  views: ["home", "grammar", "dictionary"],
  wordQuiz: { questions: [], index: 0, score: 0, wrong: [] },
  grammarQuiz: { questions: [], index: 0, score: 0, wrong: [] },
  difficulty: "medium",
  grammarDifficulty: "medium",
  dailyGrammarId: "",
  selectedGrammarId: "",
  grammarTopics: fallbackGrammarTopics,
  dictionaryWords: [],
  dailyPlan: null
};

const grammarSentencePool = [
  { prompt: "Ich gehe jeden Morgen spazieren, _____ ich Zeit habe.", answer: "wenn", options: ["wenn", "dass", "ob"] },
  { prompt: "Wir bleiben zu Hause, _____ es stark regnet.", answer: "weil", options: ["weil", "damit", "obwohl"] },
  { prompt: "Er sagt, _____ er morgen kommt.", answer: "dass", options: ["dass", "wenn", "als"] },
  { prompt: "_____ ich klein war, wohnte ich in Ankara.", answer: "Als", options: ["Als", "Wenn", "Weil"] },
  { prompt: "Ich lerne Deutsch, _____ ich in Deutschland arbeiten möchte.", answer: "weil", options: ["weil", "ob", "wenn"] },
  { prompt: "Könnten Sie mir bitte helfen? Bu cümle hangi kiptedir?", answer: "Konjunktiv II", options: ["Konjunktiv II", "Imperativ", "Präsens"] },
  { prompt: "Das Haus _____ 2020 gebaut.", answer: "wurde", options: ["wurde", "ist", "hat"] },
  { prompt: "Ich _____ gestern lange gelernt.", answer: "habe", options: ["habe", "bin", "werde"] },
  { prompt: "Sie interessiert sich _____ Musik.", answer: "für", options: ["für", "mit", "bei"] },
  { prompt: "Der Mann, _____ dort steht, ist mein Lehrer.", answer: "der", options: ["der", "den", "dem"] },
  { prompt: "Ich gebe _____ Frau das Buch.", answer: "der", options: ["der", "die", "den"] },
  { prompt: "Hast du _____ neuen Film gesehen?", answer: "den", options: ["den", "dem", "der"] },
  { prompt: "Bitte _____ die Tür zu!", answer: "mach", options: ["mach", "macht", "machen"] },
  { prompt: "Wir fahren morgen nach İzmir; das ist _____ Plan.", answer: "unser", options: ["unser", "unsere", "unserem"] },
  { prompt: "Ich versuche, früher _____ schlafen.", answer: "zu", options: ["zu", "um", "für"] },
  { prompt: "Er hat das Auto repariert. (Passiv) Das Auto _____ repariert worden.", answer: "ist", options: ["ist", "hat", "wird"] },
  { prompt: "Ich _____ gern mehr Zeit für Deutsch.", answer: "hätte", options: ["hätte", "hatte", "habe"] },
  { prompt: "Das ist die Frau, _____ ich gestern getroffen habe.", answer: "die", options: ["die", "der", "das"] },
  { prompt: "Die Prüfung ist schwer, _____ ich bleibe motiviert.", answer: "aber", options: ["aber", "denn", "oder"] },
  { prompt: "Ich mache jeden Tag Übungen, _____ ich Fortschritt sehe.", answer: "damit", options: ["damit", "wenn", "als"] }
];

const supplementalDictionaryWords = [
  ["der", "Tisch", "masa"], ["der", "Stuhl", "sandalye"], ["der", "Schrank", "dolap"], ["der", "Computer", "bilgisayar"],
  ["der", "Bildschirm", "ekran"], ["der", "Drucker", "yazıcı"], ["der", "Kugelschreiber", "tükenmez kalem"], ["der", "Bleistift", "kurşun kalem"],
  ["der", "Radiergummi", "silgi"], ["der", "Rucksack", "sırt çantası"], ["der", "Koffer", "valiz"], ["der", "Pass", "pasaport"],
  ["der", "Schlüssel", "anahtar"], ["der", "Boden", "zemin"], ["der", "Himmel", "gökyüzü"], ["der", "Baum", "ağaç"],
  ["der", "Park", "park"], ["der", "Fluss", "nehir"], ["der", "Berg", "dağ"], ["der", "See", "göl"],
  ["der", "Wald", "orman"], ["der", "Strand", "sahil"], ["der", "Wind", "rüzgar"], ["der", "Regen", "yağmur"],
  ["der", "Schnee", "kar"], ["der", "Sommer", "yaz"], ["der", "Winter", "kış"], ["der", "Frühling", "ilkbahar"],
  ["der", "Herbst", "sonbahar"], ["der", "Montag", "pazartesi"], ["der", "Dienstag", "salı"], ["der", "Mittwoch", "çarşamba"],
  ["der", "Donnerstag", "perşembe"], ["der", "Freitag", "cuma"], ["der", "Samstag", "cumartesi"], ["der", "Sonntag", "pazar"],
  ["der", "Monat", "ay"], ["der", "Januar", "ocak"], ["der", "Februar", "şubat"], ["der", "März", "mart"],
  ["der", "April", "nisan"], ["der", "Mai", "mayıs"], ["der", "Juni", "haziran"], ["der", "Juli", "temmuz"],
  ["der", "August", "ağustos"], ["der", "September", "eylül"], ["der", "Oktober", "ekim"], ["der", "November", "kasım"],
  ["der", "Dezember", "aralık"], ["der", "Morgen", "sabah"], ["der", "Mittag", "öğle"], ["der", "Abend", "akşam"],
  ["der", "Norden", "kuzey"], ["der", "Süden", "güney"], ["der", "Westen", "batı"], ["der", "Osten", "doğu"],
  ["der", "Lehrer", "öğretmen"], ["der", "Arzt", "doktor"], ["der", "Student", "öğrenci"], ["der", "Ingenieur", "mühendis"],
  ["der", "Chef", "şef"], ["der", "Kollege", "iş arkadaşı"], ["der", "Kunde", "müşteri"], ["der", "Vertrag", "sözleşme"],
  ["der", "Preis", "fiyat"], ["der", "Rabatt", "indirim"], ["der", "Markt", "pazar"], ["der", "Laden", "mağaza"],
  ["der", "Bahnhof", "istasyon"], ["der", "Flughafen", "havaalanı"], ["der", "Bus", "otobüs"], ["der", "Zug", "tren"],
  ["der", "Fahrer", "sürücü"], ["der", "Urlaub", "tatil"], ["der", "Plan", "plan"], ["der", "Kalender", "takvim"],
  ["der", "Empfang", "karşılama"], ["der", "Anruf", "telefon araması"], ["der", "Brief", "mektup"], ["der", "Befehl", "komut"],
  ["der", "Sinn", "anlam"], ["der", "Mut", "cesaret"], ["der", "Wunsch", "dilek"], ["der", "Traum", "hayal"],
  ["der", "Gedanke", "düşünce"], ["der", "Stress", "stres"], ["der", "Lärm", "gürültü"], ["der", "Ruhe", "sakinlik"],
  ["die", "Tasche", "çanta"], ["die", "Tür", "kapı"], ["die", "Wand", "duvar"], ["die", "Lampe", "lamba"],
  ["die", "Uhr", "saat"], ["die", "Brille", "gözlük"], ["die", "Jacke", "ceket"], ["die", "Hose", "pantolon"],
  ["die", "Schule", "okul"], ["die", "Universität", "üniversite"], ["die", "Klasse", "sınıf"], ["die", "Bibliothek", "kütüphane"],
  ["die", "Stadt", "şehir"], ["die", "Straße", "sokak"], ["die", "Kreuzung", "kavşak"], ["die", "Brücke", "köprü"],
  ["die", "Insel", "ada"], ["die", "Natur", "doğa"], ["die", "Sonne", "güneş"], ["die", "Wolke", "bulut"],
  ["die", "Temperatur", "sıcaklık"], ["die", "Woche", "hafta"], ["die", "Minute", "dakika"], ["die", "Sekunde", "saniye"],
  ["die", "Firma", "şirket"], ["die", "Karriere", "kariyer"], ["die", "Sitzung", "oturum"], ["die", "Nachricht", "mesaj"],
  ["die", "E-Mail", "e-posta"], ["die", "Rechnung", "fatura"], ["die", "Kasse", "kasa"], ["die", "Lieferung", "teslimat"],
  ["die", "Reise", "seyahat"], ["die", "Buchung", "rezervasyon"], ["die", "Fahrkarte", "bilet"], ["die", "Abfahrt", "kalkış"],
  ["die", "Ankunft", "varış"], ["die", "Richtung", "yön"], ["die", "Geschwindigkeit", "hız"], ["die", "Pause", "mola"],
  ["die", "Freizeit", "boş zaman"], ["die", "Gesundheit", "sağlık"], ["die", "Krankheit", "hastalık"], ["die", "Medizin", "ilaç"],
  ["die", "Apotheke", "eczane"], ["die", "Familie", "aile"], ["die", "Freundin", "kadın arkadaş"], ["die", "Nachbarin", "kadın komşu"],
  ["die", "Sprache", "dil"], ["die", "Grammatik", "dilbilgisi"], ["die", "Aussage", "ifade"], ["die", "Geschichte", "hikaye"],
  ["die", "Zeitung", "gazete"], ["die", "Zeitschrift", "dergi"], ["die", "Musik", "müzik"], ["die", "Kunst", "sanat"],
  ["die", "Kultur", "kültür"], ["die", "Liebe", "sevgi"], ["die", "Freude", "sevinç"], ["die", "Angst", "korku"],
  ["die", "Chance", "şans"], ["die", "Hoffnung", "umut"], ["die", "Entscheidung", "karar"], ["die", "Lösung", "çözüm"],
  ["die", "Verantwortung", "sorumluluk"], ["die", "Miete", "kira"], ["die", "Wohnung", "daire"], ["die", "Heizung", "ısıtma"],
  ["die", "Küche", "mutfak"], ["die", "Dusche", "duş"], ["die", "Seife", "sabun"], ["die", "Bürste", "fırça"],
  ["die", "Flasche", "şişe"], ["die", "Tasse", "fincan"], ["die", "Gabel", "çatal"], ["die", "Messer", "bıçak"],
  ["die", "Suppe", "çorba"], ["die", "Salat", "salata"], ["die", "Banane", "muz"], ["die", "Orange", "portakal"],
  ["die", "Tomate", "domates"], ["die", "Kartoffel", "patates"], ["die", "Frage", "soru"], ["die", "Antwort", "cevap"],
  ["das", "Haus", "ev"], ["das", "Zimmer", "oda"], ["das", "Fenster", "pencere"], ["das", "Bett", "yatak"],
  ["das", "Sofa", "kanepe"], ["das", "Regal", "raf"], ["das", "Bild", "resim"], ["das", "Handy", "telefon"],
  ["das", "Tablet", "tablet"], ["das", "Kabel", "kablo"], ["das", "Licht", "ışık"], ["das", "Papier", "kağıt"],
  ["das", "Buch", "kitap"], ["das", "Heft", "defter"], ["das", "Wort", "kelime"], ["das", "Thema", "konu"],
  ["das", "Beispiel", "örnek"], ["das", "Niveau", "seviye"], ["das", "Zertifikat", "sertifika"], ["das", "Examen", "sınav"],
  ["das", "Land", "ülke"], ["das", "Dorf", "köy"], ["das", "Meer", "deniz"], ["das", "Gebirge", "dağlık bölge"],
  ["das", "Klima", "iklim"], ["das", "Wetter", "hava durumu"], ["das", "Jahr", "yıl"], ["das", "Datum", "tarih"],
  ["das", "Wochenende", "hafta sonu"], ["das", "Büro", "ofis"], ["das", "Team", "takım"], ["das", "Meeting", "toplantı"],
  ["das", "Protokoll", "tutanak"], ["das", "Budget", "bütçe"], ["das", "Gehalt", "maaş"], ["das", "Produkt", "ürün"],
  ["das", "Geschäft", "işletme"], ["das", "Formular", "form"], ["das", "Ticket", "bilet"], ["das", "Hotel", "otel"],
  ["das", "Restaurant", "restoran"], ["das", "Café", "kafe"], ["das", "Museum", "müze"], ["das", "Kino", "sinema"],
  ["das", "Theater", "tiyatro"], ["das", "Spiel", "oyun"], ["das", "Training", "antrenman"], ["das", "Hobby", "hobi"],
  ["das", "Interesse", "ilgi"], ["das", "Problem", "problem"], ["das", "Ziel", "hedef"], ["das", "Ergebnis", "sonuç"],
  ["das", "Gefühl", "duygu"], ["das", "Leben", "yaşam"], ["das", "Kind", "çocuk"], ["das", "Elternteil", "ebeveyn"],
  ["das", "Foto", "fotoğraf"], ["das", "Video", "video"], ["das", "Gerät", "cihaz"], ["das", "System", "sistem"],
  ["das", "Netz", "ağ"], ["das", "Internet", "internet"], ["das", "Programm", "program"], ["das", "Update", "güncelleme"],
  ["das", "Signal", "sinyal"], ["das", "Lernziel", "öğrenme hedefi"], ["das", "Sprachniveau", "dil seviyesi"], ["das", "Selbstvertrauen", "özgüven"],
  ["das", "Gespräch", "konuşma"], ["das", "Vertrauen", "güven"], ["das", "Brot", "ekmek"], ["das", "Wasser", "su"],
  ["das", "Obst", "meyve"], ["das", "Gemüse", "sebze"], ["das", "Fleisch", "et"], ["das", "Ei", "yumurta"],
  ["das", "Frühstück", "kahvaltı"], ["das", "Mittagessen", "öğle yemeği"], ["das", "Abendessen", "akşam yemeği"], ["das", "Getränk", "içecek"]
].map(([article, word, meaningTr]) => ({
  article,
  word,
  meaningTr
}));

const el = {
  motivationText: document.querySelector("#motivationText"),
  topicTitle: document.querySelector("#topicTitle"),
  topicSummary: document.querySelector("#topicSummary"),
  topicLesson: document.querySelector("#topicLesson"),
  topicRule: document.querySelector("#topicRule"),
  topicStudyAdvice: document.querySelector("#topicStudyAdvice"),
  topicExamples: document.querySelector("#topicExamples"),
  topicMistake: document.querySelector("#topicMistake"),
  dailyTopicTitle: document.querySelector("#dailyTopicTitle"),
  dailyTopicSummary: document.querySelector("#dailyTopicSummary"),
  dailyTopicRule: document.querySelector("#dailyTopicRule"),
  dailyTopicExample: document.querySelector("#dailyTopicExample"),
  topicTips: document.querySelector("#topicTips"),
  topicSourceLink: document.querySelector("#topicSourceLink"),
  wordList: document.querySelector("#wordList"),
  dictionaryList: document.querySelector("#dictionaryList"),
  countdownText: document.querySelector("#countdownText"),
  grammarSelect: document.querySelector("#grammarSelect"),
  grammarSearch: document.querySelector("#grammarSearch"),
  grammarLevelFilter: document.querySelector("#grammarLevelFilter"),
  grammarFilterInfo: document.querySelector("#grammarFilterInfo"),
  difficultySelect: document.querySelector("#difficultySelect"),
  grammarDifficultySelect: document.querySelector("#grammarDifficultySelect"),
  startQuizBtn: document.querySelector("#startQuizBtn"),
  startGrammarQuizBtn: document.querySelector("#startGrammarQuizBtn"),
  closeQuizBtn: document.querySelector("#closeQuizBtn"),
  closeGrammarQuizBtn: document.querySelector("#closeGrammarQuizBtn"),
  menuBtn: document.querySelector("#menuBtn"),
  menuPanel: document.querySelector("#menuPanel"),
  quizSection: document.querySelector("#quizSection"),
  quizProgress: document.querySelector("#quizProgress"),
  quizQuestion: document.querySelector("#quizQuestion"),
  quizOptions: document.querySelector("#quizOptions"),
  quizFeedback: document.querySelector("#quizFeedback"),
  grammarQuizSection: document.querySelector("#grammarQuizSection"),
  grammarQuizProgress: document.querySelector("#grammarQuizProgress"),
  grammarQuizQuestion: document.querySelector("#grammarQuizQuestion"),
  grammarQuizOptions: document.querySelector("#grammarQuizOptions"),
  grammarQuizFeedback: document.querySelector("#grammarQuizFeedback"),
  retryWrongWordBtn: document.querySelector("#retryWrongWordBtn"),
  retryWrongGrammarBtn: document.querySelector("#retryWrongGrammarBtn"),
  progressPercent: document.querySelector("#progressPercent"),
  progressMeter: document.querySelector("#progressMeter"),
  progressFill: document.querySelector("#progressFill"),
  progressSummary: document.querySelector("#progressSummary"),
  wordProgressValue: document.querySelector("#wordProgressValue"),
  wordProgressFill: document.querySelector("#wordProgressFill"),
  grammarProgressValue: document.querySelector("#grammarProgressValue"),
  grammarProgressFill: document.querySelector("#grammarProgressFill"),
  dailyTasks: document.querySelector("#dailyTasks"),
  dictionarySearch: document.querySelector("#dictionarySearch"),
  dictionaryArticleFilter: document.querySelector("#dictionaryArticleFilter")
};

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getDeclension(article, word) {
  if (article === "der") return { nominativ: `der ${word}`, akkusativ: `den ${word}`, dativ: `dem ${word}`, genitiv: `des ${word}s` };
  if (article === "die") return { nominativ: `die ${word}`, akkusativ: `die ${word}`, dativ: `der ${word}`, genitiv: `der ${word}` };
  return { nominativ: `das ${word}`, akkusativ: `das ${word}`, dativ: `dem ${word}`, genitiv: `des ${word}s` };
}

function getTopicById(topicId) {
  return state.grammarTopics.find((topic) => topic.id === topicId) || state.grammarTopics[0];
}

function normalizeGrammarTopic(topic) {
  const title = topic.title || "Grammar Konusu";
  const level = topic.level || fallbackTopicLevels[title] || "B1";
  const summary = topic.summary || `${title} konusu Almanca cümle yapısını daha doğru kurmak için çalışılır.`;
  const rule = topic.rule || `${title} konusunda önce cümledeki görevi bul, sonra fiil yeri ve artikel/zamir değişimini kontrol et.`;
  const examples = topic.examples?.length
    ? topic.examples
    : [
        { de: `Ich übe heute das Thema ${title}.`, tr: `Bugün ${title} konusunu çalışıyorum.` },
        { de: "Das Beispiel macht die Regel klar.", tr: "Örnek, kuralı netleştirir." }
      ];
  return {
    ...topic,
    id: topic.id || title.toLowerCase().replaceAll(" ", "-").replaceAll("+", "plus"),
    level,
    title,
    summary,
    rule,
    studyAdvice: topic.studyAdvice || `${title} konusunu önce kural, sonra örnek, sonra kendi cümlen sırasıyla çalış.`,
    examples,
    commonMistake: topic.commonMistake || "Kuralı tek başına ezberleyip örnek cümlede uygulamamak.",
    tips: topic.tips?.length ? topic.tips : ["Kuralı oku.", "Örneği incele.", "Kendi cümleni kur."],
    sourceName: topic.sourceName || "Evde Almanca",
    sourceUrl: topic.sourceUrl || "https://evdealmanca.com/almanca-gramer-konulari/"
  };
}

function getDailyGrammarId() {
  if (!state.grammarTopics.length) return "";
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return state.grammarTopics[dayOfYear % state.grammarTopics.length].id;
}

function getTopicExampleText(topic) {
  const example = topic.examples?.[0];
  if (!example) return "Bu konu için örnek cümle konu kartında gösterilir.";
  return `${example.de} (${example.tr})`;
}

function buildTopicLesson(topic) {
  if (topic.lesson) return topic.lesson;
  const exampleText = getTopicExampleText(topic);
  const summary = topic.summary || `${topic.title} konusu Almanca cümlelerde anlamı ve yapıyı netleştirir.`;
  const rule = topic.rule || `${topic.title} konusunu tanımak için cümledeki görevine ve fiil yerine bakılır.`;
  return `${summary} Temel mantık şudur: ${rule} Bu yapıyı cümlede tanımak için önce fiilin yerini, sonra artikel veya zamir değişimini kontrol et. Örnek: ${exampleText}`;
}

function topicMatchesLevel(topic, level) {
  if (level === "all") return true;
  const topicLevel = String(topic.level || fallbackTopicLevels[topic.title] || "");
  return topicLevel.includes(level);
}

function getFilteredGrammarTopics() {
  const query = el.grammarSearch.value.trim().toLowerCase();
  const level = el.grammarLevelFilter.value;
  return state.grammarTopics.filter((topic) => {
    const searchable = `${topic.title} ${topic.summary} ${topic.rule || ""}`.toLowerCase();
    return topicMatchesLevel(topic, level) && (!query || searchable.includes(query));
  });
}

function buildExampleSentence(entry, idx) {
  const templates = [
    `Heute lerne ich das Wort "${entry.word}" für die B1-Prüfung.`,
    `Im Unterricht benutzen wir oft das Wort "${entry.word}".`,
    `Ich schreibe einen Satz mit "${entry.word}" in mein Heft.`,
    `Die Lehrerin erklärt heute "${entry.word}" mit einem Beispiel.`,
    `Beim Sprechen hilft mir das Wort "${entry.word}" sehr.`,
    `In der Prüfung könnte "${entry.word}" vorkommen.`,
    `Zu Hause wiederhole ich das Wort "${entry.word}" laut.`,
    `Im Dialog nutze ich "${entry.word}" ganz bewusst.`
  ];
  return templates[idx % templates.length];
}

function renderWordList() {
  el.motivationText.textContent = state.dailyPlan?.motivation || dailyContent.motivation;
  el.wordList.innerHTML = "";
  const words = state.dailyPlan?.words?.length ? state.dailyPlan.words : dailyContent.words;
  words.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "word-item";
    li.innerHTML = `<strong>${entry.article} ${entry.word}</strong><p class="meaning">${entry.meaningTr}</p><p class="example"><em>Beispiel:</em> ${entry.exampleDe}</p>`;
    el.wordList.appendChild(li);
  });
}

function renderDictionary() {
  const q = el.dictionarySearch.value.trim().toLowerCase();
  const art = el.dictionaryArticleFilter.value;
  const filtered = state.dictionaryWords
    .filter((w) => (art === "all" ? true : w.article === art))
    .filter((w) => (!q ? true : `${w.word} ${w.meaningTr}`.toLowerCase().includes(q)));
  el.dictionaryList.innerHTML = "";
  filtered.slice(0, 200).forEach((entry) => {
    const item = document.createElement("details");
    item.className = "dictionary-item";
    const d = getDeclension(entry.article, entry.word);
    item.innerHTML = `
      <summary>${entry.article} ${entry.word} - ${entry.meaningTr}</summary>
      <div class="declension">
        <p><em>Beispiel:</em> ${entry.exampleDe}</p>
        <p><strong>Nominativ:</strong> ${d.nominativ}</p>
        <p><strong>Akkusativ:</strong> ${d.akkusativ}</p>
        <p><strong>Dativ:</strong> ${d.dativ}</p>
        <p><strong>Genitiv:</strong> ${d.genitiv}</p>
      </div>`;
    el.dictionaryList.appendChild(item);
  });
}

function buildDailyDictionaryFromRealWords() {
  const source = state.dictionaryWords.length ? state.dictionaryWords : dailyContent.words;
  const today = new Date();
  const dailyCount = 200;
  const dayIndex = Math.floor(today.getTime() / 86400000);
  const offset = (dayIndex * dailyCount) % source.length;
  const result = [];
  for (let i = 0; i < Math.min(dailyCount, source.length); i += 1) {
    result.push({ ...source[(offset + i) % source.length] });
  }
  return result;
}

function renderGrammarTopic() {
  const topic = getTopicById(state.selectedGrammarId);
  const dailyTopic = getTopicById(state.dailyGrammarId);
  el.dailyTopicTitle.textContent = dailyTopic.title;
  el.dailyTopicSummary.textContent = dailyTopic.summary;
  el.dailyTopicRule.textContent = dailyTopic.rule || "";
  el.dailyTopicExample.textContent = getTopicExampleText(dailyTopic);
  el.topicTitle.textContent = topic.title;
  el.topicSummary.textContent = topic.summary;
  el.topicLesson.textContent = buildTopicLesson(topic);
  el.topicSourceLink.href = topic.sourceUrl;
  el.topicSourceLink.textContent = topic.sourceName || "Evde Almanca";
  el.topicRule.textContent = topic.rule || `${topic.title} için temel kuralı örnek cümleyle birlikte öğren.`;
  el.topicStudyAdvice.textContent = topic.studyAdvice || "Kuralı okuduktan sonra 5 kısa cümle yaz, sonra aynı cümleleri sesli tekrar et.";
  el.topicExamples.innerHTML = "";
  (topic.examples || []).forEach((example) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${example.de}</strong><span>${example.tr}</span>`;
    el.topicExamples.appendChild(li);
  });
  el.topicMistake.textContent = topic.commonMistake ? `Sık hata: ${topic.commonMistake}` : "";
  el.topicTips.innerHTML = "";
  (topic.tips || []).forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    el.topicTips.appendChild(li);
  });
}

function renderDailyTasks() {
  const tasks = state.dailyPlan?.tasks || [
    { type: "Lesen", text: "Kısa bir B1 metnini oku ve 3 cümle özet yaz." },
    { type: "Hören", text: "10 dakikalık Almanca bir kayıt dinle, 5 kelime çıkar." },
    { type: "Schreiben", text: "80 kelimelik kısa bir e-posta yaz." },
    { type: "Sprechen", text: "Bugünkü konudan 2 dakika sesli konuş." }
  ];
  el.dailyTasks.innerHTML = "";
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-item";
    div.innerHTML = `<strong>${task.type}</strong><span>${task.text}</span>`;
    el.dailyTasks.appendChild(div);
  });
}

function renderGrammarOptions() {
  const filteredTopics = getFilteredGrammarTopics();
  el.grammarSelect.innerHTML = "";
  if (!filteredTopics.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Konu bulunamadı";
    el.grammarSelect.appendChild(option);
    el.grammarSelect.disabled = true;
    el.grammarFilterInfo.textContent = "Bu arama veya filtre için konu bulunamadı.";
    return;
  }

  el.grammarSelect.disabled = false;
  filteredTopics.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic.id;
    option.textContent = topic.level ? `${topic.level} - ${topic.title}` : topic.title;
    el.grammarSelect.appendChild(option);
  });

  if (!filteredTopics.some((topic) => topic.id === state.selectedGrammarId)) {
    state.selectedGrammarId = filteredTopics[0].id;
  }
  el.grammarSelect.value = state.selectedGrammarId;
  el.grammarFilterInfo.textContent = `${filteredTopics.length} konu gösteriliyor.`;
  renderGrammarTopic();
}

function buildWordQuizQuestions() {
  const settings = { easy: { count: 8, wrong: 2 }, medium: { count: 10, wrong: 3 }, hard: { count: 12, wrong: 4 } };
  const cfg = settings[state.difficulty];
  const words = state.dailyPlan?.words?.length ? state.dailyPlan.words : dailyContent.words;
  const articleQ = words.map((w) => ({ prompt: `"${w.word}" kelimesinin artikeli hangisi?`, answer: w.article, options: shuffle([w.article, ...["der", "die", "das"].filter((a) => a !== w.article)]) }));
  const meaningQ = words.map((w) => {
    const wrong = shuffle(words.filter((x) => x.word !== w.word).map((x) => x.meaningTr)).slice(0, cfg.wrong);
    return { prompt: `"${w.article} ${w.word}" ne demek?`, answer: w.meaningTr, options: shuffle([w.meaningTr, ...wrong]) };
  });
  return shuffle([...articleQ, ...meaningQ]).slice(0, cfg.count);
}

function buildGrammarQuizQuestions() {
  const settings = { easy: 2, medium: 3, hard: 3 };
  const optCount = settings[state.grammarDifficulty];
  return shuffle(grammarSentencePool)
    .slice(0, 10)
    .map((q) => ({ ...q, options: shuffle(q.options.slice(0, optCount + 1)) }));
}

function showFeedback(node, correct) {
  node.className = "feedback pulse";
  node.classList.add(correct ? "ok" : "err");
  node.textContent = correct ? "✅ Richtig!" : "❌ Falsch!";
}

function bindQuestion(quiz, qEl, oEl, fEl, pEl, onFinish) {
  const q = quiz.questions[quiz.index];
  pEl.textContent = `Soru ${quiz.index + 1} / ${quiz.questions.length} - Doğru: ${quiz.score}`;
  qEl.textContent = q.prompt;
  oEl.innerHTML = "";
  fEl.textContent = "";
  fEl.className = "feedback";
  q.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => {
      const correct = option === q.answer;
      if (correct) quiz.score += 1;
      if (!correct) quiz.wrong.push(q);
      showFeedback(fEl, correct);
      Array.from(oEl.children).forEach((x) => (x.disabled = true));
      setTimeout(() => {
        quiz.index += 1;
        if (quiz.index >= quiz.questions.length) onFinish();
        else bindQuestion(quiz, qEl, oEl, fEl, pEl, onFinish);
      }, 900);
    });
    oEl.appendChild(button);
  });
}

function finishQuiz(quiz, pEl, qEl, oEl, restartFn) {
  const total = quiz.questions.length;
  const percent = Math.round((quiz.score / total) * 100);
  pEl.textContent = `Test bitti - Skor: ${quiz.score}/${total} (%${percent})`;
  qEl.textContent = percent >= 70 ? "Harika gidiyorsun!" : "İyi deneme, bir tur daha!";
  oEl.innerHTML = "";
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "Tekrar Çöz";
  btn.addEventListener("click", restartFn);
  oEl.appendChild(btn);
}

function saveProgress(type, score, total) {
  const key = "almanca-progress";
  const old = JSON.parse(localStorage.getItem(key) || "{}");
  const today = new Date().toISOString().slice(0, 10);
  old[today] = old[today] || {};
  old[today][type] = { score, total };
  localStorage.setItem(key, JSON.stringify(old));
  renderProgressSummary();
}

function getProgressPercent(result) {
  if (!result || !result.total) return 0;
  return Math.round((result.score / result.total) * 100);
}

function renderProgressSummary() {
  const key = "almanca-progress";
  const all = JSON.parse(localStorage.getItem(key) || "{}");
  const today = new Date().toISOString().slice(0, 10);
  const t = all[today] || {};
  const wordPercent = getProgressPercent(t.wordQuiz);
  const grammarPercent = getProgressPercent(t.grammarQuiz);
  const completedParts = [t.wordQuiz, t.grammarQuiz].filter(Boolean).length || 1;
  const totalPercent = Math.round((wordPercent + grammarPercent) / completedParts);
  const wordText = t.wordQuiz ? `${t.wordQuiz.score}/${t.wordQuiz.total}` : "-";
  const grammarText = t.grammarQuiz ? `${t.grammarQuiz.score}/${t.grammarQuiz.total}` : "-";
  el.progressPercent.textContent = `%${totalPercent}`;
  el.progressMeter.setAttribute("aria-valuenow", String(totalPercent));
  el.progressFill.style.width = `${totalPercent}%`;
  el.wordProgressValue.textContent = wordText;
  el.wordProgressFill.style.width = `${wordPercent}%`;
  el.grammarProgressValue.textContent = grammarText;
  el.grammarProgressFill.style.width = `${grammarPercent}%`;
  el.progressSummary.textContent = `Bugün: Kelime ${wordText} | Grammar ${grammarText}`;
}

function startWordQuiz() {
  state.wordQuiz = { questions: buildWordQuizQuestions(), index: 0, score: 0, wrong: [] };
  el.retryWrongWordBtn.classList.add("hidden");
  el.quizSection.classList.remove("hidden");
  bindQuestion(state.wordQuiz, el.quizQuestion, el.quizOptions, el.quizFeedback, el.quizProgress, () =>
    (finishQuiz(state.wordQuiz, el.quizProgress, el.quizQuestion, el.quizOptions, startWordQuiz),
    saveProgress("wordQuiz", state.wordQuiz.score, state.wordQuiz.questions.length),
    el.retryWrongWordBtn.classList.toggle("hidden", state.wordQuiz.wrong.length === 0))
  );
}

function startGrammarQuiz() {
  state.grammarQuiz = { questions: buildGrammarQuizQuestions(), index: 0, score: 0, wrong: [] };
  el.retryWrongGrammarBtn.classList.add("hidden");
  el.grammarQuizSection.classList.remove("hidden");
  bindQuestion(
    state.grammarQuiz,
    el.grammarQuizQuestion,
    el.grammarQuizOptions,
    el.grammarQuizFeedback,
    el.grammarQuizProgress,
    () => (
      finishQuiz(state.grammarQuiz, el.grammarQuizProgress, el.grammarQuizQuestion, el.grammarQuizOptions, startGrammarQuiz),
      saveProgress("grammarQuiz", state.grammarQuiz.score, state.grammarQuiz.questions.length),
      el.retryWrongGrammarBtn.classList.toggle("hidden", state.grammarQuiz.wrong.length === 0)
    )
  );
}

function retryWrongWordQuiz() {
  if (!state.wordQuiz.wrong.length) return;
  state.wordQuiz = { questions: [...state.wordQuiz.wrong], index: 0, score: 0, wrong: [] };
  bindQuestion(state.wordQuiz, el.quizQuestion, el.quizOptions, el.quizFeedback, el.quizProgress, () =>
    finishQuiz(state.wordQuiz, el.quizProgress, el.quizQuestion, el.quizOptions, retryWrongWordQuiz)
  );
}

function retryWrongGrammarQuiz() {
  if (!state.grammarQuiz.wrong.length) return;
  state.grammarQuiz = { questions: [...state.grammarQuiz.wrong], index: 0, score: 0, wrong: [] };
  bindQuestion(state.grammarQuiz, el.grammarQuizQuestion, el.grammarQuizOptions, el.grammarQuizFeedback, el.grammarQuizProgress, () =>
    finishQuiz(state.grammarQuiz, el.grammarQuizProgress, el.grammarQuizQuestion, el.grammarQuizOptions, retryWrongGrammarQuiz)
  );
}

function updateCountdown() {
  const target = new Date("2026-06-03T09:00:00+03:00");
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    el.countdownText.textContent = "Sınav günü geldi! Başarılar 🍀";
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  el.countdownText.textContent = `${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye`;
}

function setView(name) {
  state.views.forEach((v) => {
    const section = document.querySelector(`#${v}View`);
    if (section) section.classList.toggle("hidden", v !== name);
  });
}

async function loadJsonData() {
  try {
    const [gRes, dRes, pRes] = await Promise.all([
      fetch("./data/grammar-topics.json"),
      fetch("./data/dictionary-words.json"),
      fetch("./data/daily-plan.json")
    ]);
    if (gRes.ok) state.grammarTopics = (await gRes.json()).map(normalizeGrammarTopic);
    if (dRes.ok) state.dictionaryWords = await dRes.json();
    if (pRes.ok) {
      const plans = await pRes.json();
      const day = new Date().toISOString().slice(0, 10);
      state.dailyPlan = plans.find((p) => p.date === day) || plans[0] || null;
    }
  } catch (_err) {
    state.dictionaryWords = dailyContent.words.map((w) => ({ ...w }));
  }
  state.grammarTopics = state.grammarTopics.map(normalizeGrammarTopic);
  if (!state.dictionaryWords.length) state.dictionaryWords = dailyContent.words.map((w) => ({ ...w }));
  const merged = [...state.dictionaryWords, ...supplementalDictionaryWords];
  const seen = new Set();
  state.dictionaryWords = merged.filter((item) => {
    const key = `${item.article}-${item.word.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((item, idx) => ({
    ...item,
    exampleDe: item.exampleDe && item.exampleDe.trim().length > 0 ? item.exampleDe : buildExampleSentence(item, idx)
  }));
  state.dictionaryWords = buildDailyDictionaryFromRealWords();
  state.dailyGrammarId = state.dailyPlan?.grammarTopicId || getDailyGrammarId();
  state.selectedGrammarId = state.dailyGrammarId;
}

function bindEvents() {
  el.menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    el.menuPanel.classList.toggle("hidden");
  });
  el.menuPanel.addEventListener("click", (event) => event.stopPropagation());
  document.querySelectorAll(".menu-item").forEach((button) => button.addEventListener("click", () => {
    setView(button.dataset.view);
    el.menuPanel.classList.add("hidden");
  }));
  document.addEventListener("click", () => el.menuPanel.classList.add("hidden"));
  el.startQuizBtn.addEventListener("click", startWordQuiz);
  el.startGrammarQuizBtn.addEventListener("click", startGrammarQuiz);
  el.closeQuizBtn.addEventListener("click", () => el.quizSection.classList.add("hidden"));
  el.closeGrammarQuizBtn.addEventListener("click", () => el.grammarQuizSection.classList.add("hidden"));
  el.retryWrongWordBtn.addEventListener("click", retryWrongWordQuiz);
  el.retryWrongGrammarBtn.addEventListener("click", retryWrongGrammarQuiz);
  el.dictionarySearch.addEventListener("input", renderDictionary);
  el.dictionaryArticleFilter.addEventListener("change", renderDictionary);
  el.difficultySelect.addEventListener("change", (e) => {
    state.difficulty = e.target.value;
  });
  el.grammarDifficultySelect.addEventListener("change", (e) => {
    state.grammarDifficulty = e.target.value;
  });
  el.grammarSearch.addEventListener("input", renderGrammarOptions);
  el.grammarLevelFilter.addEventListener("change", renderGrammarOptions);
  el.grammarSelect.addEventListener("change", (e) => {
    state.selectedGrammarId = e.target.value;
    renderGrammarTopic();
  });
}

async function init() {
  await loadJsonData();
  bindEvents();
  renderGrammarOptions();
  renderWordList();
  renderDictionary();
  renderDailyTasks();
  renderProgressSummary();
  setView("home");
  updateCountdown();
  setInterval(updateCountdown, 1000);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
}

init();
