import axios from 'axios';

/* =========================
   OSINT FUNCTIONS
========================= */

// --- PHONE OSINT ---
async function phoneOSINT(phoneNumber) {
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
    const results = {
        tipo: 'Telefono',
        numero: cleanNumber,
        info: {},
        timestamp: new Date().toISOString()
    };

    if (cleanNumber.startsWith('+39') || cleanNumber.startsWith('39')) {
        results.info.paese = 'Italia 🇮🇹';
        const num = cleanNumber.replace(/^\+?39/, '');
        if (num.startsWith('3')) {
            results.info.tipo_linea = 'Mobile';
            const prefix = num.substring(0, 3);
            const op = {
                '330':'TIM','331':'TIM','333':'TIM','334':'TIM','335':'TIM',
                '340':'Vodafone','347':'Vodafone','348':'Vodafone','349':'Vodafone',
                '320':'Wind/Tre','327':'Wind/Tre','328':'Wind/Tre','329':'Wind/Tre',
                '360':'Iliad','361':'Iliad','362':'Iliad'
            };
            results.info.operatore = op[prefix] || 'Operatore Mobile';
        } else {
            results.info.tipo_linea = 'Fisso';
        }
    } else {
        results.info.paese = 'Sconosciuto';
    }

    return results;
}

// --- IP OSINT ---
async function ipOSINT(ip) {
    const res = await axios.get(`http://ip-api.com/json/${ip}`);
    if (res.data.status !== 'success') {
        return { tipo: 'IP', errore: 'IP non valido' };
    }

    return {
        tipo: 'IP',
        ip,
        timestamp: new Date().toISOString(),
        info: {
            paese: `${res.data.country} ${res.data.countryCode}`,
            città: res.data.city,
            isp: res.data.isp,
            proxy: res.data.proxy ? 'Sì' : 'No',
            mobile: res.data.mobile ? 'Sì' : 'No',
            mappa: `https://maps.google.com/?q=${res.data.lat},${res.data.lon}`
        }
    };
}

// --- EMAIL OSINT ---
async function emailOSINT(email) {
    const domain = email.split('@')[1];
    return {
        tipo: 'Email',
        email,
        timestamp: new Date().toISOString(),
        info: {
            dominio: domain
        }
    };
}

// --- MAIN OSINT ---
async function osintSearch(query) {
    const phone = /^[\+0-9\s\-]{7,}$/;
    const ip = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (phone.test(query)) return await phoneOSINT(query);
    if (ip.test(query)) return await ipOSINT(query);
    if (email.test(query)) return await emailOSINT(query);

    return { errore: 'Formato non valido' };
}

// --- FORMAT MESSAGE ---
function formatOSINTResults(r) {
    if (r.errore) return `❌ ${r.errore}`;

    let msg = `🔍 *DEADLYX OSINT*\n\n`;
    msg += `📌 Tipo: ${r.tipo}\n`;
    msg += `⏰ Data: ${new Date(r.timestamp).toLocaleString('it-IT')}\n\n`;

    if (r.numero) msg += `📞 Numero: ${r.numero}\n`;
    if (r.ip) msg += `🌐 IP: ${r.ip}\n`;
    if (r.email) msg += `📧 Email: ${r.email}\n`;

    msg += `\n📊 *Info*\n`;
    for (const [k, v] of Object.entries(r.info || {})) {
        msg += `• ${k}: ${v}\n`;
    }

    return msg;
}

/* =========================
   WHATSAPP COMMAND
========================= */

export async function deadlyxodCommand(sock, msg) {
    const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text;

    if (!text) return;

    if (!text.startsWith('.deadlyxod')) return;

    const args = text.split(' ').slice(1);
    if (!args.length) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: '❌ Uso:\n.deadlyxod <numero | ip | email>'
        });
        return;
    }

    const query = args.join(' ');

    await sock.sendMessage(msg.key.remoteJid, {
        text: '🔎 Ricerca OSINT in corso...'
    });

    const result = await osintSearch(query);
    const reply = formatOSINTResults(result);

    await sock.sendMessage(msg.key.remoteJid, { text: reply });
}