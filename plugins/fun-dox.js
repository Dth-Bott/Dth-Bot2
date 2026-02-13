import { performance } from 'perf_hooks';

let handler = async (m, { conn, text }) => {
    let user = `@${m.sender.split('@')[0]}`;

    await m.reply('⏳ *Inizializzazione modulo DOX...*');

    const steps = [
        '██░░░░░░░░ 25%',
        '█████░░░░░ 50',
        '███████░░░ 75%',
        '██████████ 100%'
    ];

    for (let step of steps) {
        await new Promise(r => setTimeout(r, 400));
        await m.reply(`🔍 *Analisi dati in corso...*\n${step}`);
    }

    let old = performance.now();
    let neww = performance.now();
    let speed = `${(neww - old).toFixed(2)} ms`;

    let doxeo = `
*✔️ DOX COMPLETATO*  
Dox By ${user}
━━━━━━━━━━━━━━━━━━━━━
👤 *Target:* ${text || 'Sconosciuto'}
🌐 *IP:* 192.168.${pickRandom([0,1,2,10,50])}.${pickRandom([1,20,42,69,100])}
🔐 *IPv6:* fe80::${pickRandom(['1a2b','3c4d','5e6f'])}:${pickRandom(['aa12','bb34','cc56'])}
📶 *ISP:* ${pickRandom(['FakeNet', 'Mock Telecom', 'Test Provider'])}
📡 *DNS:* 1.1.1.1
🖥️ *MAC:* ${pickRandom(['AA:BB:CC:DD:EE:FF','11:22:33:44:55:66'])}
📟 *Device:* ${pickRandom(['Android', 'iPhone', 'Router WiFi', 'Smart Fridge'])}
━━━━━━━━━━━━━━━━━━━━━
🕒 *Tempo di esecuzione:* ${speed}
`.trim();

    await m.reply(doxeo, null, { mentions: [m.sender] });
};

handler.help = ['dox <nome | @tag>'];
handler.tags = ['fun', 'troll'];
handler.command = /^dox$/i;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}