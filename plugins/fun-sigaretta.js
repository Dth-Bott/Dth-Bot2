import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import '../lib/language.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ──────────────────────────────
//   STEP DEL TUTORIAL
// ──────────────────────────────
const STEPS = {
  'sig-step1': `🟢 *Step 1 — Materiali necessari*  
Prima di iniziare, assicurati di avere tutto pronto! 🔧🪬

📦 *Materiali:*
• 📜 Cartine per rollare (qualsiasi marca)  
• 🧩 Filtro/tip (opzionale ma consigliatissimo)  
• 🌿 Tabacco legale (scegli la quantità che preferisci)  
• 🛋️ Un ripiano/tavolo stabile  
• ✨ Eventuale vassoio per rollare (utile per non perdere tabacco)

💡 *Consigli:*  
• Evita mani bagnate, la cartina si rovina!  
• Lavora in un posto senza vento o correnti d’aria.  
• Solo per adulti e solo tabacco legale.  
`,

  'sig-step2': `🟡 *Step 2 — Preparare cartina e filtro*  
Andiamo a impostare la base! 🧱

1️⃣ Se usi il filtro, arrotolalo creando un cilindro compatto.  
2️⃣ Apri la cartina con la *parte adesiva verso l’alto* e rivolta lontano da te.  
3️⃣ Posiziona il filtro su uno dei due lati della cartina.  

💡 Il filtro ti aiuta a non inalare tabacco e mantiene stabile la rollata.`,

  'sig-step3': `🟠 *Step 3 — Aggiungere il tabacco*  
Ora mettiamo il “cuore” della sigaretta ❤️‍🔥

1️⃣ Distribuisci il tabacco lungo la cartina in modo uniforme.  
2️⃣ Evita grumi: sbriciola con delicatezza ✨  
3️⃣ Lato del filtro leggermente più pieno = chiusura più semplice.  

🎯 *Obiettivo:* una linea uniforme di tabacco, né troppo né troppo poca.`,

  'sig-step4': `🔵 *Step 4 — Rollare e sigillare*  
Il momento più importante! 🎬

1️⃣ Tieni la cartina tra pollice e indice e inizia un movimento rollante avanti/indietro.  
2️⃣ Compatta il tabacco finché non prende una forma cilindrica.  
3️⃣ Inserisci il bordo inferiore della cartina sotto il tabacco.  
4️⃣ Passa la parte con la colla sopra e leccala leggermente.  
5️⃣ Premi per sigillare tutto.  

🎉 *Complimenti!* Hai quasi finito.`,

  'sig-step5': `⚫ *Step 5 — Rifiniture finali*  
E ora la rendiamo perfetta 🔧😎

1️⃣ Eventualmente batti leggermente la sigaretta sul tavolo per compattarla.  
2️⃣ Sistema l'estremità aperta con una penna o il dito.  
3️⃣ Accendi e fai tiri leggeri.  

⚠️ *Avvertenza importante:*  
Fumare è dannoso per la salute. Consuma solo se maggiorenne e consapevole dei rischi.`
};


// ──────────────────────────────
//   HANDLER PRINCIPALE
// ──────────────────────────────
const handler = async (m, { conn, usedPrefix = '.' }) => {

  // MENU PRINCIPALE (.sigaretta)
  if (/^\.?sigaretta$/i.test(m.text || '')) {

    const title = `🚬💨 SACRIFICE-BOT — *Guida Completa per Rollare*`;

    const caption = `${title}

Benvenuto nella *guida passo-passo* per rollare una sigaretta oppure un cannone!  

👇 *Scegli uno step* per proseguire:`;

    await conn.sendMessage(
      m.chat,
      {
        text: caption,
        footer: 'Premi i bottoni per seguire il tutorial',
        buttons: [
          { buttonId: `${usedPrefix}sig-step1`, buttonText: { displayText: '🟢 Step 1' }, type: 1 },
          { buttonId: `${usedPrefix}sig-step2`, buttonText: { displayText: '🟡 Step 2' }, type: 1 },
          { buttonId: `${usedPrefix}sig-step3`, buttonText: { displayText: '🟠 Step 3' }, type: 1 },
          { buttonId: `${usedPrefix}sig-step4`, buttonText: { displayText: '🔵 Step 4' }, type: 1 },
          { buttonId: `${usedPrefix}sig-step5`, buttonText: { displayText: '⚫ Step 5' }, type: 1 }
        ],
        headerType: 1
      },
      { quoted: m }
    );
    return;
  }

  // STEP (es. .sig-step3)
  const normalized = (m.text || '').trim().toLowerCase();
  const key = normalized.replace('.', '');

  if (STEPS[key]) {
    await conn.sendMessage(
      m.chat,
      { text: STEPS[key] },
      { quoted: m }
    );
    return;
  }

  return; // evita crash
};


// ──────────────────────────────
//   META DEL PLUGIN
// ──────────────────────────────
handler.help = ['sigaretta'];
handler.tags = ['utility'];
handler.command = /^(sigaretta|sig-step1|sig-step2|sig-step3|sig-step4|sig-step5)$/i;

export default handler;