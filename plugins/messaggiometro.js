const livelli = [
  { nome: "Sacrificio Iniziale", soglia: 0 },
  { nome: "Discepolo Oscuro", soglia: 100 },
  { nome: "Cultista del Vuoto", soglia: 300 },
  { nome: "Schiavo dell'Oscurità", soglia: 600 },
  { nome: "Predicatore della Luce Nera", soglia: 1000 },
  { nome: "Apostolo dell'Abisso", soglia: 1500 },
  { nome: "Inquisitore Supremo", soglia: 2200 },
  { nome: "Mago delle Ombre", soglia: 3000 },
  { nome: "Sacerdote delle Tenebre", soglia: 4000 },
  { nome: "Signore del Sacrificio", soglia: 5000 },
  { nome: "Arcano delle Profondità", soglia: 6500 },
  { nome: "Divinità del Vuoto", soglia: 8000 }
];

function getGrado(messaggi) {
  return livelli.findLast(l => messaggi >= l.soglia) || livelli[0];
}

export async function before(m, { conn }) {
  const user = global.db.data.users[m.sender];
  const chat = global.db.data.chats[m.chat] || {};

  if (!user) return;

  // Inizializza i dati dell'utente se non esistono
  if (user.messaggi == null) user.messaggi = 0;
  if (user.money == null) user.money = 0;
  if (user.grado == null) user.grado = "Sacrificio Iniziale";
  if (chat.level == null) chat.level = true; 

  // Aumenta il contatore dei messaggi dell'utente
  user.messaggi += 1;

  // Trova il grado attuale e il nuovo grado
  const gradoAttuale = livelli.find(l => l.nome === user.grado) || livelli[0];
  const nuovoGrado = getGrado(user.messaggi);

  // Se l'utente ha raggiunto un nuovo grado, aggiorna il grado e la ricompensa
  if (gradoAttuale.nome !== nuovoGrado.nome) {
    const reward = Math.floor(nuovoGrado.soglia / 2);
    user.money += reward;
    user.grado = nuovoGrado.nome;

    // Se i livelli sono attivi per la chat, invia il messaggio di notifica
    if (!chat.level) return;

    // Crea il messaggio di notifica con il tema "sacrifice"
    let milestoneMessage = {
      key: {
        participants: "0@s.whatsapp.net",
        fromMe: false,
        id: "Sacrifice"
      },
      message: {
        textMessage: {
          text: `🔥 **Sacrificio del Potere!** 🔥\n\nUn nuovo sacrificio è stato completato da *@${m.sender.split('@')[0]}*!\n🎯 Grado: *${nuovoGrado.nome}*\n💬 Messaggi inviati: *${user.messaggi}*\n💰 *${reward}€* sono stati offerti al culto del Sacrificio.\n\nUn altro passo verso il potere supremo. Che il sacrificio continui...`
        }
      },
      participant: "0@s.whatsapp.net"
    };

    // Risponde al messaggio di gruppo con il nuovo grado e la ricompensa
    conn.reply(
      m.chat,
      `🔥 **Sacrificio del Potere!** 🔥\n\nUn nuovo sacrificio è stato completato da *@${m.sender.split('@')[0]}*!\n🎯 Grado: *${nuovoGrado.nome}*\n💬 Messaggi inviati: *${user.messaggi}*\n💰 *${reward}€* sono stati offerti al culto del Sacrificio.\n\nUn altro passo verso il potere supremo. Che il sacrificio continui...`,
      milestoneMessage,
      { mentions: [m.sender] }
    );
  }
}