// plugins/mc.js
// Consigliatore di panini McDonald's 🇮🇹

const panini = [
  {
    nome: "🍔 Big Mac",
    prezzoLocale: "5-6€",
    prezzo: 5.50,
    ingredienti: [
      "2 hamburger di manzo (90g ciascuno)",
      "Pane con semi di sesamo",
      "Insalata iceberg",
      "Formaggio cheddar",
      "Salsa Big Mac",
      "Cetriolini",
      "Cipolla"
    ],
    costoCasa: "≈3,5€",
    patatine: "Patatine medie +1,80€"
  },
  {
    nome: "🍔 McChicken",
    prezzoLocale: "4,50-5,50€",
    prezzo: 5,
    ingredienti: [
      "Pane morbido",
      "Filetto di pollo impanato (100g)",
      "Maionese",
      "Lattuga"
    ],
    costoCasa: "≈3€",
    patatine: "Patatine piccole +1,50€"
  },
  {
    nome: "🍔 Crispy McBacon",
    prezzoLocale: "5-6,50€",
    prezzo: 5.8,
    ingredienti: [
      "Pane morbido",
      "Hamburger di manzo 100g",
      "Formaggio cheddar",
      "Bacon croccante",
      "Salsa BBQ"
    ],
    costoCasa: "≈3,8€",
    patatine: "Patatine medie +1,80€"
  },
  {
    nome: "🍔 McVeggie",
    prezzoLocale: "4,50-5,50€",
    prezzo: 4.8,
    ingredienti: [
      "Pane morbido",
      "Burger vegetale di legumi",
      "Pomodoro",
      "Lattuga",
      "Maionese vegetale"
    ],
    costoCasa: "≈3,2€",
    patatine: "Patatine piccole +1,50€"
  },
  {
    nome: "🍔 Double Cheeseburger",
    prezzoLocale: "3-4€",
    prezzo: 3.5,
    ingredienti: [
      "2 hamburger di manzo (45g ciascuno)",
      "2 fette cheddar",
      "Ketchup",
      "Cetriolini",
      "Pane classico"
    ],
    costoCasa: "≈2,5€",
    patatine: "Patatine piccole +1,50€"
  },
  {
    nome: "🍔 McToast",
    prezzoLocale: "1,50-2€",
    prezzo: 1.8,
    ingredienti: [
      "2 fette di pane tostato",
      "Formaggio fuso",
      "Prosciutto cotto"
    ],
    costoCasa: "≈1€",
    patatine: "— (non previste)"
  }
];

const sceltaPanino = {}; // salva l’ultimo panino proposto per utente

function formatPrezzo(n) {
  return "€" + n.toFixed(2);
}

let handler = async (m, { conn, usedPrefix }) => {
  const btnId = m?.message?.buttonsResponseMessage?.selectedButtonId || "";
  const text = m.text || btnId || "";
  const arg = text.replace(usedPrefix, "").trim().split(/\s+/)[1] || "";

  // --- se l’utente vuole vedere la ricetta ---
  if (/^ricetta$/i.test(arg)) {
    const panino = sceltaPanino[m.sender];
    if (!panino) return m.reply("❌ Prima scegli un panino con *.mc*");

    const lista = panino.ingredienti.map(x => `- ${x}`).join("\n");
    const dettagli = `📜 *Ricetta ${panino.nome}*\n\n${lista}\n\n🍟 ${panino.patatine}\n💰 Costo a casa: ${panino.costoCasa}`;
    return m.reply(dettagli);
  }

  // --- propone un panino casuale ---
  const randomPanino = panini[Math.floor(Math.random() * panini.length)];
  sceltaPanino[m.sender] = randomPanino;

  const txt = `🍔 *Panino consigliato:* ${randomPanino.nome}
💶 Prezzo al McDonald's: ${randomPanino.prezzoLocale}
💵 Prezzo stimato: ${formatPrezzo(randomPanino.prezzo)}

Ti piace? Puoi vedere la ricetta completa o cambiarlo 👇`;

  const buttons = [
    { buttonId: `${usedPrefix}mc ricetta`, buttonText: { displayText: "📖 Ricetta & Prezzo Casa" }, type: 1 },
    { buttonId: `${usedPrefix}mc`, buttonText: { displayText: "🔄 Cambia Panino" }, type: 1 }
  ];

  await conn.sendMessage(
    m.chat,
    { text: txt, buttons, headerType: 1 },
    { quoted: m }
  );
};

handler.help = ["mc"];
handler.tags = ["fun"];
handler.command = ["mc"];

export default handler;