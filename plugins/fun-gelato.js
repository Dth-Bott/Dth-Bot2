// plugins/gelato.js
// Crediti: +393516612216
// Consigliatore di gelati 🍦

// --- Database originale ---
const gelati = [
  { nome: "🍦 Cono Vaniglia", prezzo: 2, ingredientiVeloce: ["Latte", "Zucchero", "Aroma vaniglia"], ingredientiLento: ["Panna fresca", "Bacca di vaniglia", "Tuorlo d’uovo", "Latte intero", "Zucchero di canna"] },
  { nome: "🍫 Cono Cioccolato", prezzo: 2, ingredientiVeloce: ["Latte", "Cacao", "Zucchero"], ingredientiLento: ["Cioccolato fondente", "Latte intero", "Panna fresca", "Zucchero di canna"] },
  { nome: "🍓 Coppa Fragola", prezzo: 3.5, ingredientiVeloce: ["Fragole", "Zucchero", "Acqua"], ingredientiLento: ["Fragole fresche", "Succo di limone", "Latte", "Panna fresca", "Zucchero di canna"] },
  { nome: "🍨 Coppa Pistacchio", prezzo: 4, ingredientiVeloce: ["Latte", "Pasta di pistacchio", "Zucchero"], ingredientiLento: ["Pistacchi", "Latte intero", "Panna fresca", "Zucchero", "Amido di mais"] },
  { nome: "🍧 Sorbetto Limone", prezzo: 2.5, ingredientiVeloce: ["Acqua", "Zucchero", "Succo di limone"], ingredientiLento: ["Limoni freschi", "Zucchero di canna", "Scorza di limone", "Menta"] },
  { nome: "🥥 Gelato al Cocco", prezzo: 3.5, ingredientiVeloce: ["Latte", "Cocco grattugiato", "Zucchero"], ingredientiLento: ["Latte di cocco", "Panna", "Cocco fresco", "Zucchero di canna", "Vaniglia"] },
  { nome: "🍪 Gelato Cookies", prezzo: 4.5, ingredientiVeloce: ["Latte", "Biscotti sbriciolati", "Zucchero"], ingredientiLento: ["Latte intero", "Panna fresca", "Estratto di vaniglia", "Biscotti al burro", "Tuorli d’uovo"] },
  { nome: "🍫 Magnum Classico", prezzo: 3, ingredientiVeloce: ["Gelato vaniglia", "Copertura cioccolato"], ingredientiLento: ["Panna fresca", "Bacca di vaniglia", "Cioccolato fondente belga", "Latte intero", "Zucchero"] },
  { nome: "🥜 Magnum Mandorle", prezzo: 3, ingredientiVeloce: ["Gelato vaniglia", "Mandorle", "Cioccolato"], ingredientiLento: ["Vaniglia del Madagascar", "Mandorle tostate", "Cioccolato fondente", "Panna", "Latte intero"] },
  { nome: "🍦 Cornetto Classico", prezzo: 2.5, ingredientiVeloce: ["Cono", "Gelato panna", "Cioccolato"], ingredientiLento: ["Cono artigianale", "Panna fresca", "Cioccolato fondente", "Granella di nocciole"] }
];

const sceltaGelato = {}; // memorizza ultima scelta per utente

function formatPrezzo(n) {
  return "€" + n.toFixed(2);
}

// --- Handler principale ---
let handler = async (m, { conn, usedPrefix }) => {
  const btnId = m?.message?.buttonsResponseMessage?.selectedButtonId || "";
  const text = m.text || btnId || "";
  const arg = text.replace(usedPrefix, "").trim().split(/\s+/)[1] || "";

  // --- Preparazione veloce ---
  if (/^veloce$/i.test(arg)) {
    const gelato = sceltaGelato[m.sender];
    if (!gelato) return m.reply("❌ Prima scegli un gelato con il comando .gelato");
    const lista = gelato.ingredientiVeloce.map(x => `- ${x}`).join("\n");
    return m.reply(`⚡ *Preparazione veloce di ${gelato.nome}*\n\n${lista}`);
  }

  // --- Preparazione lenta ---
  if (/^lento$/i.test(arg)) {
    const gelato = sceltaGelato[m.sender];
    if (!gelato) return m.reply("❌ Prima scegli un gelato con il comando .gelato");
    const lista = gelato.ingredientiLento.map(x => `- ${x}`).join("\n");
    return m.reply(`🍨 *Preparato per bene: ${gelato.nome}*\n\n${lista}`);
  }

  // --- propone un gelato casuale ---
  const randomGelato = gelati[Math.floor(Math.random() * gelati.length)];
  sceltaGelato[m.sender] = randomGelato;

  const txt = `🍦 *Gelato consigliato:* ${randomGelato.nome}\n💶 Prezzo: ${formatPrezzo(randomGelato.prezzo)}\n\nCome vuoi prepararlo? 👇`;

  const buttons = [
    { buttonId: `${usedPrefix}gelato veloce`, buttonText: { displayText: "⚡ Preparazione veloce" }, type: 1 },
    { buttonId: `${usedPrefix}gelato lento`, buttonText: { displayText: "🍨 Preparato per bene" }, type: 1 },
    { buttonId: `${usedPrefix}gelato`, buttonText: { displayText: "🔄 Cambia gelato" }, type: 1 }
  ];

  await conn.sendMessage(
    m.chat,
    { text: txt, buttons, headerType: 1 },
    { quoted: m }
  );
};

handler.help = ["gelato"];
handler.tags = ["fun"];
handler.command = ["gelato"];

export default handler;