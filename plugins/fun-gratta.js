// 💰 plugins/gratta.js
// 🌍 Comando Gratta e Vinci — 35 opzioni diverse con Menu a Pulsanti Standard (2 livelli)

// Definizioni delle 35 carte Gratta e Vinci, complete di emoji (le "foto")
const grattaEVinci = {
    // --- EUROPA (11 carte) ---
    gratta1: { id: 1, name: "La Fortuna di Roma", nation: "Italia", emoji: "🇮🇹" },
    gratta2: { id: 2, name: "Paris Étoile", nation: "Francia", emoji: "🇫🇷" },
    gratta3: { id: 3, name: "Royal Scratch", nation: "Regno Unito", emoji: "🇬🇧" },
    gratta4: { id: 4, name: "La Grande Scommessa", nation: "Germania", emoji: "🇩🇪" },
    gratta5: { id: 5, name: "Tesoro della Sagrada", nation: "Spagna", emoji: "🇪🇸" },
    gratta6: { id: 6, name: "Corona di Neve", nation: "Svezia", emoji: "🇸🇪" },
    gratta7: { id: 7, name: "Sogno di Istanbul", nation: "Turchia", emoji: "🇹🇷" },
    gratta8: { id: 8, name: "Montecarlo Jackpot", nation: "Monaco", emoji: "🇲🇨" },
    gratta9: { id: 9, name: "Olimpo d'Oro", nation: "Grecia", emoji: "🇬🇷" },
    gratta10: { id: 10, name: "Varsavia Victor", nation: "Polonia", emoji: "🇵🇱" },
    gratta11: { id: 11, name: "Leprechaun's Luck", nation: "Irlanda", emoji: "🇮🇪" },

    // --- AMERICHE (7 carte) ---
    gratta12: { id: 12, name: "The Million Dollar Jackpot", nation: "USA", emoji: "🇺🇸" },
    gratta13: { id: 13, name: "Ouro do Carnaval", nation: "Brasile", emoji: "🇧🇷" },
    gratta14: { id: 14, name: "Maple Cash", nation: "Canada", emoji: "🇨🇦" },
    gratta15: { id: 15, name: "Cinco de Mayo Win", nation: "Messico", emoji: "🇲🇽" },
    gratta16: { id: 16, name: "Tango di Soldi", nation: "Argentina", emoji: "🇦🇷" },
    gratta17: { id: 17, name: "Tesoro degli Inca", nation: "Perù", emoji: "🇵🇪" },
    gratta18: { id: 18, name: "Smeraldo Fortunato", nation: "Colombia", emoji: "🇨🇴" },

    // --- ASIA, AFRICA, OCEANIA (12 carte) ---
    gratta19: { id: 19, name: "Lotteria dei Ciliegi", nation: "Giappone", emoji: "🇯🇵" },
    gratta20: { id: 20, name: "Dragone d'Oro", nation: "Cina", emoji: "🇨🇳" },
    gratta21: { id: 21, name: "Maharaja's Millions", nation: "India", emoji: "🇮🇳" },
    gratta22: { id: 22, name: "K-Pop Cash", nation: "Corea del Sud", emoji: "🇰🇷" },
    gratta23: { id: 23, name: "Outback Fortune", nation: "Australia", emoji: "🇦🇺" },
    gratta24: { id: 24, name: "Faraone Fortunato", nation: "Egitto", emoji: "🇪🇬" },
    gratta25: { id: 25, name: "Diamante Selvaggio", nation: "Sudafrica", emoji: "🇿🇦" },
    gratta26: { id: 26, name: "Ghiaccio Ricco", nation: "Russia", emoji: "🇷🇺" },
    gratta27: { id: 27, name: "Lagos Lottery", nation: "Nigeria", emoji: "🇳🇬" },
    gratta28: { id: 28, name: "Siam Sunset", nation: "Thailandia", emoji: "🇹🇭" },
    gratta29: { id: 29, name: "Dubai Gold Rush", nation: "Emirati Arabi Uniti", emoji: "🇦🇪" },
    gratta30: { id: 30, name: "Kiwi Cash", nation: "Nuova Zelanda", emoji: "🇳🇿" },

    // --- ANTARTIDE & ARTICO (5 carte) ---
    gratta31: { id: 31, name: "Iceberg Jackpot", nation: "Antartide", emoji: "🧊" },
    gratta32: { id: 32, name: "Aurora Boreale Win", nation: "Artico", emoji: "🌌" },
    gratta33: { id: 33, name: "Orso Polare Lucky", nation: "Polo Nord", emoji: "🐻‍❄️" },
    gratta34: { id: 34, name: "Pinguino Ricco", nation: "Polo Sud", emoji: "🐧" },
    gratta35: { id: 35, name: "Viking Fortune", nation: "Groenlandia", emoji: "🇬🇱" },
}

// Funzione per generare un risultato casuale
function generaRisultato() {
    const probVittoria = 0.30 // 30% di probabilità di vincita
    if (Math.random() < probVittoria) {
        // Logica di vincita
        const vincita = Math.floor(Math.random() * 600) + 100 // tra 100 e 700
        // Simula l'incremento di valuta nel DB (qui è solo una simulazione testuale)
        return `🎉 *HAI VINTO!* 🎉\nHai grattato un premio di *${vincita}€*! Che fortuna!`;
    } else {
        // Logica di perdita
        return `😭 *Non hai vinto...*\nRitenta la fortuna! Magari la prossima carta è quella giusta.`;
    }
}

// Mappatura delle regioni e delle chiavi delle carte
const regioni = {
    europe: {
        name: "Europa 🇪🇺",
        keys: Object.keys(grattaEVinci).slice(0, 11) // gratta1 a gratta11
    },
    americas: {
        name: "Americhe 🌎",
        keys: Object.keys(grattaEVinci).slice(11, 18) // gratta12 a gratta18
    },
    asia_africa: {
        name: "Asia, Africa & Oceania 🌏",
        keys: Object.keys(grattaEVinci).slice(18, 30) // gratta19 a gratta30
    },
    arctic: {
        name: "Artico & Antartide 🥶",
        keys: Object.keys(grattaEVinci).slice(30, 35) // gratta31 a gratta35
    }
}


let handler = async (m, { conn, usedPrefix }) => {
    // Estrae l'ID del pulsante cliccato. L'ID è il comando completo.
    const btnId = m?.message?.buttonsResponseMessage?.selectedButtonId || ""
    const text = m.text || btnId || ""
    // Argomento è la parte dopo il comando (.gratta <arg>)
    const arg = btnId ? btnId.split(/\s+/)[1] : text.replace(usedPrefix, "").trim().split(/\s+/)[1] || ""

    // --- LOGICA DI RISULTATO (Fase 2: Hai scelto la carta specifica) ---
    if (arg.startsWith("gratta") && grattaEVinci[arg]) {
        const cartaScelta = grattaEVinci[arg]
        const risultato = generaRisultato()

        // Messaggio contenente solo il risultato
        const finalMsgText = `
*Hai scelto:* ${cartaScelta.emoji} ${cartaScelta.name} (${cartaScelta.nation})

*GRATTANDO...*

${risultato}
        `.trim()

        // Pulsante per tornare al menu principale
        const playAgainButton = [{
            buttonId: `${usedPrefix}gratta`,
            buttonText: { displayText: "Vuoi scommettere ancora?" },
            type: 1
        }]

        await conn.sendMessage(
            m.chat,
            { text: finalMsgText, buttons: playAgainButton, headerType: 1 },
            { quoted: m }
        )
        return
    }

    // --- LOGICA DI SOTTOMENU REGIONALE (Fase 1.5: Scegli la carta) ---
    // Se l'argomento è una delle regioni (europe, americas, asia_africa, arctic)
    if (regioni[arg]) {
        const regioneScelta = regioni[arg]
        const carteRegionali = regioneScelta.keys.map(key => grattaEVinci[key])

        // Crea i pulsanti per tutte le carte di quella regione
        const buttonsCarte = carteRegionali.map(carta => ({
            // L'ID del pulsante è il comando completo per la Fase 2 (es: .gratta gratta1)
            buttonId: `${usedPrefix}gratta gratta${carta.id}`, 
            // Mostra l'emoji/foto e il nome nel testo del pulsante
            buttonText: { displayText: `${carta.emoji} ${carta.name} (${carta.nation})` }, 
            type: 1
        }))

        const txtCarte = `
✨ *Carte Gratta e Vinci: ${regioneScelta.name}* ✨

Seleziona la tua carta fortunata tra le *${carteRegionali.length}* opzioni disponibili. Clicca il pulsante e gratta!
        `

        await conn.sendMessage(
            m.chat,
            { text: txtCarte, buttons: buttonsCarte, headerType: 1 },
            { quoted: m }
        )
        return
    }

    // --- MENU PRINCIPALE (Fase 1: Scegli la regione) ---
    const txt = `
💰 *GRATTA E VINCI MONDIALE!*

Abbiamo ampliato la collezione a *35* carte! Scegli la regione qui sotto per visualizzare le opzioni.
`

    const buttonsRegioni = [
        // L'ID del pulsante è il comando completo per la Fase 1.5 (es: .gratta europe)
        { buttonId: `${usedPrefix}gratta europe`, buttonText: { displayText: regioni.europe.name }, type: 1 },
        { buttonId: `${usedPrefix}gratta americas`, buttonText: { displayText: regioni.americas.name }, type: 1 },
        { buttonId: `${usedPrefix}gratta asia_africa`, buttonText: { displayText: regioni.asia_africa.name }, type: 1 },
        { buttonId: `${usedPrefix}gratta arctic`, buttonText: { displayText: regioni.arctic.name }, type: 1 }
    ]

    await conn.sendMessage(
        m.chat,
        { text: txt, buttons: buttonsRegioni, headerType: 1 },
        { quoted: m }
    )
}

handler.help = ["gratta"]
handler.tags = ["gioco"]
handler.command = ["gratta"]

export default handler