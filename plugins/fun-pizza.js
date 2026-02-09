// plugins/pizza.js
// Consigliatore di pizze 🍕

const pizze = [
  {
    nome: "Margherita",
    prezzo: 5.00,
    ingredienti: ["Pomodoro", "Mozzarella", "Basilico", "Olio EVO"]
  },
  {
    nome: "Diavola",
    prezzo: 7.00,
    ingredienti: ["Pomodoro", "Mozzarella", "Salame piccante"]
  },
  {
    nome: "Quattro Formaggi",
    prezzo: 8.50,
    ingredienti: ["Mozzarella", "Gorgonzola", "Fontina", "Parmigiano"]
  },
  {
    nome: "Capricciosa",
    prezzo: 8.00,
    ingredienti: ["Pomodoro", "Mozzarella", "Prosciutto cotto", "Carciofi", "Funghi", "Olive nere"]
  },
  {
    nome: "Vegetariana",
    prezzo: 7.50,
    ingredienti: ["Pomodoro", "Mozzarella", "Peperoni", "Zucchine", "Melanzane", "Cipolla"]
  },
  {
    nome: "Tonno e Cipolla",
    prezzo: 7.50,
    ingredienti: ["Pomodoro", "Mozzarella", "Tonno", "Cipolla rossa"]
  }
];

const sceltaPizza = {}; // memorizza ultima pizza proposta per utente

function formatPrezzo(n) {
  return "€" + n.toFixed(2);
}

let handler = async (m, { conn, usedPrefix }) => {
  const btnId = m?.message?.buttonsResponseMessage?.selectedButtonId || "";
  const text = m.text || btnId || "";
  const arg = text.replace(usedPrefix, "").trim().split(/\s+/)[1] || "";

  // se l'utente ha cliccato "ingredienti"
  if (/^ingredienti$/i.test(arg)) {
    const pizza = sceltaPizza[m.sender];
    if (!pizza) return m.reply("❌ Prima scegli una pizza con il comando .pizza");
    const lista = pizza.ingredienti.map(x => `- ${x}`).join("\n");
    return m.reply(`📜 *Ingredienti della ${pizza.nome}*\n${lista}`);
  }

  // propone una pizza casuale
  const randomPizza = pizze[Math.floor(Math.random() * pizze.length)];
  sceltaPizza[m.sender] = randomPizza;

  const txt = `🍕 *Pizza consigliata:* ${randomPizza.nome}\n💶 Prezzo: ${formatPrezzo(randomPizza.prezzo)}\n\nTi piace? Puoi vedere gli ingredienti o cambiarla 👇`;

  const buttons = [
    { buttonId: `${usedPrefix}pizza ingredienti`, buttonText: { displayText: "📜 Ingredienti" }, type: 1 },
    { buttonId: `${usedPrefix}pizza`, buttonText: { displayText: "🔄 Cambia pizza" }, type: 1 }
  ];

  await conn.sendMessage(
    m.chat,
    { text: txt, buttons, headerType: 1 },
    { quoted: m }
  );
};

handler.help = ["pizza"];
handler.tags = ["fun"];
handler.command = ["pizza"];

export default handler;