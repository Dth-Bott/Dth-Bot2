import fetch from "node-fetch";

// Dati strutturati per i lavori, inclusa una prima e una seconda opzione
const jobData = {
    "14-16": {
        age: "14 - 16 ANNI (Lavoro Minorile)",
        jobs: [
            {
                name: "🐕 Dogsitter / 👶 Baby Sitter",
                app: "Subito.it / Gruppi Facebook Locali",
                earnings: "5€ - 10€ all'ora",
                tutorial: "Crea un volantino o un annuncio online specificando che operi con il consenso dei genitori. Concentrati sul tuo quartiere per ottimizzare gli spostamenti. Inizia con amici e vicini per ottenere le prime referenze.",
                note: "⚠️ *Legale:* Devi avere il consenso scritto dei tuoi genitori e rispettare le ore massime di lavoro minorile (variano in base alla legge locale)."
            },
            {
                name: "⛱️ Aiuto Estivo (Spiaggia/Montagna)",
                app: "Ricerca locale diretta (Passaparola)",
                earnings: "200€ - 400€ a settimana (a seconda del contratto)",
                tutorial: "Durante la stagione estiva, cerca stabilimenti balneari, bar o rifugi in montagna. Presentati di persona, chiedi se hanno bisogno di aiuto per pulizia, raccolta ordini o come 'runner'. È un ottimo modo per fare esperienza.",
                note: "⚠️ *Legale:* Ottimo per brevi periodi; assicurati che ci sia un contratto di collaborazione occasionale."
            }
        ]
    },
    "16-18": {
        age: "16 - 18 ANNI (Esperienza Flessibile)",
        jobs: [
            {
                name: "📚 Tutor (Ripetizioni e Aiuto Compiti)",
                app: "Sostegno Scuola (piattaforme di tutoring) / Annunci in Biblioteca",
                earnings: "10€ - 15€ all'ora",
                tutorial: "Identifica le materie in cui sei eccellente. Crea un profilo sui siti di ripetizioni o affiggi annunci cartacei nelle bacheche scolastiche. Offri la prima lezione a un prezzo ridotto per attirare clienti.",
                note: "✅ *Vantaggi:* Orari molto flessibili che si adattano agli impegni scolastici. Ottima aggiunta al curriculum."
            },
            {
                name: "💻 Social Media Assistant (Micro-aziende)",
                app: "Instagram, LinkedIn (per la ricerca)",
                earnings: "50€ - 150€ al mese per piccola gestione",
                tutorial: "Contatta piccole attività locali (parrucchieri, negozi di artigianato). Proponi di gestire le loro storie e post IG per 1-2 ore al giorno. È un lavoro creativo che puoi fare da casa.",
                note: "💡 *Skills:* Richiede base di editing foto/video e conoscenza dei trend social."
            }
        ]
    },
    "18-20": {
        age: "18 - 20 ANNI (Piena Capacità Legale)",
        jobs: [
            {
                name: "🛵 Rider di Consegna / 🍽️ Cameriere",
                app: "Just Eat, Glovo, Deliveroo (Rider) / Indeed, Subito.it (Cameriere)",
                earnings: "8€ - 12€ all'ora + Mance",
                tutorial: "Per il Rider: Iscriviti all'app, carica i documenti richiesti (Patente/ID) e attendi l'attivazione. Per il Cameriere: Invia il CV a ristoranti e bar; la disponibilità serale è un grande vantaggio.",
                note: "🔥 *Richiesta:* Molto richiesto, offre massima flessibilità, ma richiede resistenza fisica."
            },
            {
                name: "📢 Promoter / Hostess per Eventi",
                app: "Agenzie interinali (ad esempio, Lavoropiù) / Eventbrite (per la ricerca di eventi)",
                earnings: "10€ - 18€ all'ora (spesso pagato a giornata)",
                tutorial: "Contatta le agenzie di lavoro interinale specializzate in eventi. Il lavoro è occasionale ma paga bene. Ti verrà chiesto di promuovere prodotti o accogliere ospiti a fiere ed eventi.",
                note: "📸 *Importante:* Richiede ottima presenza, comunicazione e un approccio amichevole con il pubblico."
            }
        ]
    }
};

let handler = async (m, { conn, usedPrefix, text: rawText }) => {
    try {
        // --- 1. Parsing Input (Stile Pizza.js) ---
        const btnId = m?.message?.buttonsResponseMessage?.selectedButtonId || "";
        const input = m.text || btnId || rawText || "";

        // Estrai il comando base
        const command = input.replace(usedPrefix, "").trim().split(/\s+/)[0].toLowerCase();

        // Se non è il comando giusto, ignora (necessario se si usa handler.all)
        // Ma visto che usiamo handler.command, questo check è una sicurezza
        if (command !== 'lavoro' && command !== 'trovalavoro') {
            return;
        }

        // Estrai gli argomenti (tutto ciò che viene dopo '.lavoro')
        const argsString = input.replace(new RegExp(`^${usedPrefix}(lavoro|trovalavoro)\\s*`), "").trim();
        const args = argsString.split(/\s+/);
        const arg1 = args[0] || ""; // Fascia d'età (e.g., '14-16')
        const arg2 = args[1] || ""; // 'change'

        const targetAge = Object.keys(jobData).find(key => key === arg1);

        // --- 2. Gestione della Richiesta Dettagliata (Dopo la selezione) ---
        if (targetAge) {
            const data = jobData[targetAge];
            const jobIndex = arg2.toLowerCase() === "change" ? 1 : 0;
            const job = data.jobs[jobIndex];

            let finalNote = job.note;

            if (jobIndex === 0) {
                 finalNote += `\n\nNon ti piace? Digita *${usedPrefix}lavoro ${targetAge} change* per un'alternativa.`;
            }

            const jobText = `
💼 *OPPORTUNITÀ: ${data.age}* 💼

╔══════════════════════╗
║ 🟢 *LAVORO PROPOSTO:* ${job.name}
╠══════════════════════╣
║ 💰 *GUADAGNO STIMATO:* ${job.earnings}
║ 📱 *APP/METODO:* ${job.app}
╚══════════════════════╝

*TUTORIAL & CONSIGLI:*
${job.tutorial}

${finalNote}
`;

            // Pulsanti per tornare al menu di selezione età
            const backButton = [{
                buttonId: `${usedPrefix}lavoro`,
                buttonText: { displayText: "⬅️ Scegli un'altra età" },
                type: 1
            }];

            await conn.sendMessage(
                m.chat,
                { text: jobText.trim(), buttons: backButton, headerType: 1 },
                { quoted: m }
            );
            return;
        }

        // --- 3. Menu Iniziale (SOSTITUITO CON Button Message) ---
        const menuText = `
🌟 *GUIDA AL LAVORO* 🌟
━━━━━━━━━━━━━━━━━━━
Per quale fascia d'età stai cercando un impiego?
Seleziona un'opzione qui sotto.
━━━━━━━━━━━━━━━━━━━
`;

        // Usiamo i Pulsanti Standard (come pizza.js) invece del List Message
        const buttons = [
            { 
                buttonId: `${usedPrefix}lavoro 14-16`, 
                buttonText: { displayText: "🧑‍💻 14 - 16 Anni" }, 
                type: 1 
            },
            { 
                buttonId: `${usedPrefix}lavoro 16-18`, 
                buttonText: { displayText: "👨‍🎓 16 - 18 Anni" }, 
                type: 1 
            },
            { 
                buttonId: `${usedPrefix}lavoro 18-20`, 
                buttonText: { displayText: "👷 18 - 20 Anni" }, 
                type: 1 
            }
        ];

        // INVIA MESSAGGIO CON PULSANTI
        await conn.sendMessage(m.chat, {
            text: menuText.trim(),
            footer: "Seleziona un'opzione",
            buttons: buttons,
            headerType: 1
        }, { quoted: m });

    } catch (error) {
        console.error("Errore nel plugin Lavoro:", error);
        await conn.reply(m.chat, `⚠︎ Si è verificato un errore.\n_Dettagli: ${error.message}_`, m);
    }
};

handler.command = ['lavoro', 'trovalavoro'];
handler.tags = ['utility'];
handler.help = ['.lavoro'];
handler.group = true; 

export default handler;