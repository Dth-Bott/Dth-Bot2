process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
import './config.js';
import { createRequire } from 'module';
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
import fs, { readdirSync, statSync, unlinkSync, existsSync, readFileSync, mkdirSync, rmSync, watch } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import { tmpdir } from 'os';
import { format } from 'util';
import pino from 'pino';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import NodeCache from 'node-cache';
import { ripristinaTimer } from './plugins/gp-configgruppo.js';

const DisconnectReason = {
    connectionClosed: 428,
    connectionLost: 408,
    connectionReplaced: 440,
    timedOut: 408,
    loggedOut: 401,
    badSession: 500,
    restartRequired: 515,
    multideviceMismatch: 411,
    forbidden: 403,
    unavailableService: 503
};
const { useMultiFileAuthState, makeCacheableSignalKeyStore, Browsers, jidNormalizedUser, getPerformanceConfig, setPerformanceConfig, Logger, makeInMemoryStore } = await import('@realvare/based');
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
protoType();
serialize();
global.isLogoPrinted = false;
global.qrGenerated = false;
global.connectionMessagesPrinted = {};
let methodCodeQR = process.argv.includes("qr");
let methodCode = process.argv.includes("code");
let MethodMobile = process.argv.includes("mobile");
let phoneNumber = global.botNumberCode;

function redefineConsoleMethod(methodName, filterStrings) {
    const originalConsoleMethod = console[methodName];
    console[methodName] = function () {
        const message = arguments[0];
        if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
            arguments[0] = "";
        }
        originalConsoleMethod.apply(console, arguments);
    };
}

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
};

global.__dirname = function dirname(pathURL) {
    return path.dirname(global.__filename(pathURL, true));
};

global.__require = function require(dir = import.meta.url) {
    return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '');
global.timestamp = { start: new Date };
const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@').replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']');
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new JSONFile('database.json') : new JSONFile('database.json'));
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) {
        return new Promise((resolve) => setInterval(async function () {
            if (!global.db.READ) {
                clearInterval(this);
                resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
            }
        }, 1 * 1000));
    }
    if (global.db.data !== null) return;
    global.db.READ = true;
    await global.db.read().catch(console.error);
    global.db.READ = null;
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        settings: {},
        ...(global.db.data || {}),
    };
    global.db.chain = chain(global.db.data);
};
loadDatabase();

if (global.conns instanceof Array) {
    console.log('Connessioni già inizializzate...');
} else {
    global.conns = [];
}

global.creds = 'creds.json';
global.authFile = 'varesession';
global.authFileJB = 'varebot-sub';

setPerformanceConfig({
    performance: {
        enableCache: true,
        enableMetrics: true
    },
    debug: {
        enableLidLogging: true,
        logLevel: 'debug'
    }
});

const { state, saveCreds } = await useMultiFileAuthState(global.authFile);
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache();
const question = (t) => {
    process.stdout.write(t);
    return new Promise((resolve) => {
        process.stdin.once('data', (data) => {
            resolve(data.toString().trim());
        });
    });
};

let opzione;
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
    do {
        const violet1 = chalk.hex('#9B59B6');
        const violet2 = chalk.hex('#8E44AD');
        const violet3 = chalk.hex('#7D3C98');
        const violet4 = chalk.hex('#5B2C6F');
        const softText = chalk.hex('#D7BDE2');

        const a = violet1('╭━━━━━━━━━━━━━• ✧˚🩸 varebot 🕊️˚✧ •━━━━━━━━━━━━━');
        const b = violet1('╰━━━━━━━━━━━━━• ☾⋆₊✧ 𝓿𝓪𝓻𝓮𝓫𝓸𝓽 ✧₊⋆☽ •━━━━━━━━━━━━━');
        const linea = violet2('   ✦━━━━━━✦✦━━━━━━༺༻━━━━━━༺༻━━━━━━✦✦━━━━━━✦');
        const sm = violet3('SELEZIONE METODO DI ACCESSO ✦');
        const qr = violet4(' ┌─⭓') + ' ' + chalk.bold.hex('#D2B4DE')('1. Scansione con QR Code');
        const codice = violet4(' └─⭓') + ' ' + chalk.bold.hex('#D2B4DE')('2. Codice di 8 cifre');
        const istruzioni = [
            violet4(' ┌─⭓') + softText.italic(' Digita solo il numero corrispondente.'),
            violet4(' └─⭓') + softText.italic(' Premi Invio per confermare.'),
            softText.italic(''),
            violet1.italic('                   by sam'),
        ];
        const prompt = chalk.hex('#BB8FCE').bold('\n⌯ Inserisci la tua scelta ---> ');

        opzione = await question(`\n
${a}

          ${sm}
${linea}

${qr}
${codice}

${linea}
${istruzioni.join('\n')}

${b}
${prompt}`);

        if (!/^[1-2]$/.test(opzione)) {
            console.log(`\n${chalk.hex('#E74C3C').bold('✖ INPUT NON VALIDO')}

${chalk.hex('#F5EEF8')('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
${chalk.hex('#EC7063').bold('⚠️ Sono ammessi solo i numeri')} ${chalk.bold.green('1')} ${chalk.hex('#EC7063').bold('o')} ${chalk.bold.green('2')}
${chalk.hex('#FADBD8')('┌─⭓ Nessuna lettera o simbolo')}
${chalk.hex('#FADBD8')('└─⭓ Copia il numero dell\'opzione desiderata e incollalo')}
${chalk.hex('#BB8FCE').italic('\n✧ Suggerimento: Se hai dubbi, scrivi al creatore +393476686131')}
`);
        }
    } while ((opzione !== '1' && opzione !== '2') || fs.existsSync(`./${authFile}/creds.json`));
}

const filterStrings = [
    "Q2xvc2luZyBzdGFsZSBvcGVu",
    "Q2xvc2luZyBvcGVuIHNlc3Npb24=",
    "RmFpbGVkIHRvIGRlY3J5cHQ=",
    "U2Vzc2lvbiBlcnJvcg==",
    "RXJyb3I6IEJhZCBNQUM=",
    "RGVjcnlwdGVkIG1lc3NhZ2U="
];
console.info = () => {};
console.debug = () => {};
['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings));
const groupMetadataCache = new NodeCache();
global.groupCache = groupMetadataCache;
const logger = pino({
    level: 'silent',
});
global.jidCache = new NodeCache({ stdTTL: 600, useClones: false });
global.store = makeInMemoryStore({ logger });
const connectionOptions = {
    logger: logger,
    mobile: MethodMobile,
    browser: opzione === '1' ? Browsers.windows('Chrome') : methodCodeQR ? Browsers.windows('Chrome') : Browsers.macOS('Safari'),
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    decodeJid: (jid) => {
        if (!jid) return jid;
        const cached = global.jidCache.get(jid);
        if (cached) return cached;
        let decoded = jid;
        if (/:\d+@/gi.test(jid)) {
            decoded = jidNormalizedUser(jid);
        }
        if (typeof decoded === 'object' && decoded.user && decoded.server) {
            decoded = `${decoded.user}@${decoded.server}`;
        }
        if (typeof decoded === 'string' && decoded.endsWith('@lid')) {
            decoded = decoded.replace('@lid', '@s.whatsapp.net');
        }
        global.jidCache.set(jid, decoded);
        return decoded;
    },
    printQRInTerminal: opzione === '1' || methodCodeQR ? true : false,
    cachedGroupMetadata: async (jid) => {
        const cached = global.groupCache.get(jid);
        if (cached) return cached;
        try {
            const metadata = await global.conn.groupMetadata(global.conn.decodeJid(jid));
            global.groupCache.set(jid, metadata, { ttl: 300 });
            return metadata;
        } catch (err) {
            console.error('Errore nel recupero dei metadati del gruppo:', err);
            return {};
        }
    },
    getMessage: async (key) => {
        try {
            const jid = global.conn.decodeJid(key.remoteJid);
            const msg = await global.store.loadMessage(jid, key.id);
            return msg?.message || undefined;
        } catch (error) {
            console.error('Errore in getMessage:', error);
            return undefined;
        }
    },
    msgRetryCounterCache,
    msgRetryCounterMap,
    retryRequestDelayMs: 500,
    maxMsgRetryCount: 5,
    shouldIgnoreJid: jid => false,
};
global.conn = makeWASocket(connectionOptions);
global.store.bind(global.conn.ev);
if (!fs.existsSync(`./${authFile}/creds.json`)) {
    if (opzione === '2' || methodCode) {
        opzione = '2';
        if (!conn.authState.creds.registered) {
            let addNumber;
            if (phoneNumber) {
                addNumber = phoneNumber.replace(/[^0-9]/g, '');
            } else {
                phoneNumber = await question(chalk.bgBlack(chalk.bold.bgMagentaBright(`Inserisci il numero di WhatsApp.\n${chalk.bold.yellowBright("Esempio: +393471234567")}\n${chalk.bold.magenta('━━► ')}`)));
                addNumber = phoneNumber.replace(/\D/g, '');
                if (!phoneNumber.startsWith('+')) phoneNumber = `+${phoneNumber}`;
            }
            setTimeout(async () => {
                let codeBot = await conn.requestPairingCode(addNumber, 'VAR3BOT2');
                codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
                console.log(chalk.bold.white(chalk.bgMagenta('『 🔗 』– CODICE DI ABBINAMENTO:')), chalk.bold.white(chalk.white(codeBot)));
            }, 3000);
        }
    }
}
conn.isInit = false;
conn.well = false;
async function bysamakavare() {
    try {
        const mainChannelId = global.IdCanale?.[0] || '120363418582531215@newsletter';
        await global.conn.newsletterFollow(mainChannelId);
    } catch (error) {}
}
if (!opts['test']) {
    if (global.db) setInterval(async () => {
        if (global.db.data) await global.db.write();
        if (opts['autocleartmp'] && (global.support || {}).find) {
            const tmp = [tmpdir(), 'tmp', "varebot-sub"];
            tmp.forEach(filename => spawn('find', [filename, '-amin', '2', '-type', 'f', '-delete']));
        }
    }, 30 * 1000);
}
if (opts['server']) (await import('./server.js')).default(global.conn, PORT);
async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin, qr } = update;
    global.stopped = connection;
    if (isNewLogin) conn.isInit = true;
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
    if (code && code !== DisconnectReason.loggedOut) {
        await global.reloadHandler(true).catch(console.error);
        global.timestamp.connect = new Date;
    }
    if (global.db.data == null) loadDatabase();
    if (qr && (opzione === '1' || methodCodeQR) && !global.qrGenerated) {
        console.log(chalk.bold.yellow(`\n 🪐 SCANSIONA IL CODICE QR - SCADE TRA 45 SECONDI 🪐`));
        global.qrGenerated = true;
    }
    if (connection === 'open') {
        global.qrGenerated = false;
        global.connectionMessagesPrinted = {};
        if (!global.isLogoPrinted) {
            const finchevedotuttoviolaviola = [
                '#3b0d95', '#3b0d90', '#3b0d85', '#3b0d80', '#3b0d75',
                '#3b0d70', '#3b0d65', '#3b0d60', '#3b0d55', '#3b0d50', '#3b0d45'
            ];
            const varebot = [
                ` ██▒   █▓ ▄▄▄       ██▀███  ▓█████  ▄▄▄▄    ▒█████  ▄▄▄█████▓   `,
                `▓██░   █▒▒████▄    ▓██ ▒ ██▒▓█   ▀ ▓█████▄ ▒██▒  ██▒▓  ██▒ ▓▒   `,
                ` ▓██  █▒░▒██  ▀█▄  ▓██ ░▄█ ▒▒███   ▒██▒ ▄██▒██░  ██▒▒ ▓██░ ▒░   `,
                `  ▒██ █░░░██▄▄▄▄██ ▒██▀▀█▄  ▒▓█  ▄ ▒██░█▀  ▒██   ██░░ ▓██▓ ░    `,
                `   ▒▀█░   ▓█   ▓██▒░██▓ ▒██▒░▒████▒░▓█  ▀█▓░ ████▓▒░  ▒██▒ ░    `,
                `   ░ ▐░   ▒▒   ▓▒█░░ ▒▓ ░▒▓░░░ ▒░ ░░▒▓███▀▒░ ▒░▒░▒░   ▒ ░░      `,
                `   ░ ░░    ▒   ▒▒ ░  ░▒ ░ ▒░ ░ ░  ░▒░▒   ░   ░ ▒ ▒░     ░       `,
                `     ░░    ░   ▒     ░░   ░    ░    ░    ░ ░ ░ ▒░    ░         `,
                `      ░        ░  ░   ░        ░  ░ ░          ░ ░              `,
                `     ░                                   ░                      `
            ];
            varebot.forEach((line, i) => {
                const color = finchevedotuttoviolaviola[i] || finchevedotuttoviolaviola[finchevedotuttoviolaviola.length - 1];
                console.log(chalk.hex(color)(line));
            });
            global.isLogoPrinted = true;
            await bysamakavare();
        }
        const perfConfig = getPerformanceConfig();
        Logger.info('Performance Config:', perfConfig);
    }
    if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (reason === DisconnectReason.badSession && !global.connectionMessagesPrinted.badSession) {
            console.log(chalk.bold.redBright(`\n⚠️❗ SESSIONE NON VALIDA, ELIMINA LA CARTELLA ${global.authFile} E SCANSIONA IL CODICE QR ⚠️`));
            global.connectionMessagesPrinted.badSession = true;
            await global.reloadHandler(true).catch(console.error);
        } else if (reason === DisconnectReason.connectionLost && !global.connectionMessagesPrinted.connectionLost) {
            console.log(chalk.bold.blueBright(`\n╭⭑⭒━━━✦❘༻ ⚠️ CONNESSIONE PERSA COL SERVER ༺❘✦━━━⭒⭑\n┃ 🔄 RICONNESSIONE IN CORSO... \n╰⭑⭒━━━✦❘༻☾⋆₊✧ 𝓿𝓪𝓻𝓮𝓫𝓸𝓽 ✧₊⁺⋆☽༺❘✦━━━⭒⭑`));
            global.connectionMessagesPrinted.connectionLost = true;