// one-off: node gen-images.mjs
// Generates a flat illustration (free, Pollinations/FLUX) for each word in SCENES
// that has no image in imgs/. Lesson learned: quoting the word in the prompt makes
// the model write gibberish text — so each word gets a hand-written scene instead.
// Re-runnable: skips existing files; delete a bad image and re-run to redo it.
// Rebuilds images.js from disk at the end.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

const here = p => new URL(p, import.meta.url);
const src = readFileSync(here('game.js'), 'utf8');
const VOCAB = eval(src.match(/const VOCAB = (\[[\s\S]*?\n\]);/)[1]);
const sleep = ms => new Promise(r => setTimeout(r, ms));
mkdirSync(here('imgs'), { recursive: true });

const SCENES = {
  "l'entretien": 'job interview, candidate and interviewer shaking hands across a desk',
  'le patron': 'boss in a suit at his office door giving instructions to an employee',
  'la réunion': 'team meeting around a conference table with laptops and coffee',
  'le congé': 'office worker relaxing in a beach chair next to a closed laptop',
  'la formation': 'instructor teaching a small group at a whiteboard in a training room',
  'embaucher': 'manager welcoming a new employee with a handshake and a contract folder',
  'démissionner': 'employee leaving a resignation letter on the desk and packing a cardboard box',
  'le loyer': 'person handing euro banknotes to a landlord in front of an apartment door',
  'le bail': 'two people signing a rental contract at a table with house keys on it',
  'le locataire': 'person receiving apartment keys from a landlord at the front door',
  'les charges': 'hands holding utility bills next to a radiator and a water tap',
  'déménager': 'moving truck and people carrying cardboard boxes into a house',
  "l'assurance": 'large umbrella protecting a family and their house',
  'le traitement': 'pill organizer, calendar and medicine bottles on a bedside table',
  'guérir': 'happy recovered patient leaving hospital while a doctor waves goodbye',
  'le dossier': 'thick paper folder stuffed with documents on an office desk',
  'le formulaire': 'person filling in a paper form with a pen at a counter',
  'la demande': 'person handing an envelope of documents through an office window counter',
  'le délai': 'hourglass next to a wall calendar with a circled date',
  'la mairie': 'French town hall building with a French flag and a clock on the facade',
  'le justificatif': 'hand presenting a utility bill and an ID document at a counter',
  'la carte de séjour': 'hand holding an ID residence card, French flag in the background',
  'renouveler': 'person exchanging an old faded card for a shiny new one at an office counter',
  'signer': 'close-up of a hand signing a document with a fountain pen',
  'le compte': 'piggy bank in front of a classical bank building',
  'le virement': 'money flying as an arrow between two smartphones held by two people',
  'les frais': 'small coins being deducted from a stack of money with tiny price tags',
  'le prêt': 'banker handing a money bag to a customer, house in the background',
  'la facture': 'paper bill with a lightbulb and a water drop drawn on it',
  'dépenser': 'person with many shopping bags while banknotes fly out of an open wallet',
  "l'inscription": 'student registering at a university desk, clerk with a clipboard',
  'le diplôme': 'graduate in cap and gown holding a rolled diploma with a ribbon',
  'le niveau': 'person climbing a staircase of ascending steps toward a flag',
  'la note': 'graded exam paper with a gold star and a smiling teacher',
  "l'épreuve": 'students taking an exam at separate desks in a big hall, clock on the wall',
  'réussir': 'student jumping with joy, confetti around, holding an exam paper',
  'échouer': 'sad student with head down on a desk over an exam paper',
  'le stage': 'young intern at a desk while a mentor points at a computer screen',
  'le trajet': 'dotted path from a house through a metro station to an office building',
  'le voisin': 'two neighbors greeting each other over adjacent balconies',
  'en retard': 'person running after a departing bus while checking a wristwatch',
  'tôt': 'person stretching awake at sunrise with a ringing alarm clock',
  'postuler': 'person at a laptop sending a paper CV that flies out as an envelope',
  'remplir': 'close-up of a hand ticking checkboxes on a form with a pen',
  'joindre': 'giant paperclip attaching a CV page to a letter',
  'prévenir': 'person on the phone with an alert speech bubble warning a friend',
  'exiger': 'stern manager firmly pointing at a document on the desk',
  'améliorer': 'person watering a plant that grows into an upward arrow',
  'augmenter': 'bar chart with rising bars and a big upward arrow',
  'éviter': 'pedestrian taking a detour arrow around a big puddle',
  'obtenir': 'happy person holding up a trophy and a certificate',
  'le collègue': 'two coworkers at adjacent desks sharing a fist bump',
  'la candidature': 'stack of CV papers with photo portraits, one being picked up',
  'licencier': 'sad employee carrying a cardboard box out of an office',
  'le rez-de-chaussée': 'apartment building entrance at street level with a small shop',
  'les travaux': 'construction workers with helmets on scaffolding in a street',
  'la caution': 'hand placing a stack of banknotes into a safe next to house keys',
  'emménager': 'family opening the door of a new home full of moving boxes',
  'se sentir': 'person with hand on chest smiling with little hearts around',
  'la piqûre': 'nurse giving an injection in a patient arm',
  'la préfecture': 'official French government building with flag and people queueing outside',
  "l'attestation": 'official document with a big stamp and a ribbon seal',
  'le rendez-vous': 'two people meeting under a big calendar with a circled day and a clock',
  'valable': 'passport with a green check mark shield above it',
  'expirer': 'calendar page with a red cross over an old faded card',
  'déposer': 'person placing a folder of documents into an office inbox tray',
  'le montant': 'shop receipt with stacked coins and banknotes beside it',
  'la dette': 'empty wallet next to a pile of unpaid bills',
  'rembourser': 'one hand returning banknotes into another open hand',
  'le cours': 'teacher at a blackboard with students listening at desks',
  'le devoir': 'child doing homework at a desk with a notebook and a lamp',
  'la rentrée': 'kids with backpacks entering a school gate among autumn leaves',
  'la matière': 'stack of school books with an atlas, paint palette and microscope',
  'la lessive': 'person loading a washing machine, laundry basket and clothes line',
  'il faut': 'finger pointing at a checklist with one urgent item highlighted',
  'pouvoir': 'confident person giving a thumbs up under a green traffic light',
  'attendre': 'person sitting on a bench at a bus stop checking a watch',
  'chercher': 'person with a magnifying glass searching under furniture',
  'trouver': 'delighted person holding up found keys with sparkles',
  'envoyer': 'hand dropping a letter into a yellow French mailbox',
  'recevoir': 'person opening a mailbox full of letters and a small package',
};

const slugOf = fr => fr.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]+/gi, '-');
const onDisk = slug => ['jpg', 'png', 'webp', 'gif'].map(e => `imgs/${slug}.${e}`).find(f => existsSync(here(f)));

const todo = Object.keys(SCENES).filter(fr => !onDisk(slugOf(fr)));
console.log(`generating ${todo.length} images…`);
let ok = 0, fail = 0;
for (const fr of todo) {
  const prompt = `simple flat vector illustration for a language learning flashcard, ${SCENES[fr]}, ` +
    `everyday life in France, soft pastel colors, minimal, clean, no text, no words, no letters, no numbers, no writing`;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=320&nologo=true&seed=7`;
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(120000) });
    const buf = Buffer.from(await r.arrayBuffer());
    if (!r.ok || buf.length < 5000) throw new Error('bad response ' + r.status);
    writeFileSync(here(`imgs/${slugOf(fr)}.jpg`), buf);
    console.log(`${++ok + fail}/${todo.length} ${fr} ✓`);
  } catch (e) {
    fail++;
    console.log(`${ok + fail}/${todo.length} ${fr} ✗ ${e.message}`);
  }
  await sleep(1500);
}

const images = {};
for (const v of VOCAB) {
  const f = onDisk(slugOf(v.fr));
  if (f) images[v.fr] = f;
}
writeFileSync(here('images.js'),
  '// generated by fetch-images.mjs / gen-images.mjs — do not edit by hand\nconst IMAGES = ' +
  JSON.stringify(images, null, 1) + ';\n');
console.log(`done: ${ok} generated, ${fail} failed — images.js now maps ${Object.keys(images).length}/${VOCAB.length} words`);
