import fs from 'fs';

const handler = m => m;

handler.before = async function (message, { conn }) {
const imageFallback = 'media/fallback.png';

const fetchBuffer = async (url) => {  
    if (!url) return null;  

    // file locale  
    if (!/^https?:\/\//i.test(url)) {  
        try {  
            return fs.readFileSync(url);  
        } catch {  
            return null;  
        }  
    }  

    // URL remoto  
    try {  
        const fetchFn = globalThis.fetch || (await import('node-fetch').then(m => m.default));  
        const res = await fetchFn(url);  
        if (!res.ok) return null;  
        const ab = await res.arrayBuffer();  
        return Buffer.from(ab);  
    } catch {  
        return null;  
    }  
};  

const chat = global.db.data.chats[message.chat] || {};  
const detectEnabled = chat.detect;  

// prende sempre il JID corretto  
const sender = message.participant || message.sender;  

// PROMOZIONE  
if (message.messageStubType === 29 && detectEnabled) {  
    const promotedUser = message.messageStubParameters[0];  

    let profilePicture;  
    try {  
        profilePicture = await conn.profilePictureUrl(promotedUser, 'image');  
    } catch {  
        profilePicture = null;  
    }  

    await conn.sendMessage(message.chat, {  
        text: `@${sender.split('@')[0]} 𝐡𝐚 𝐝𝐚𝐭𝐨 𝐢 𝐩𝐨𝐭𝐞𝐫𝐢 𝐚 @${promotedUser.split('@')[0]}`,  
        contextInfo: {  
            mentionedJid: [sender, promotedUser],  
            externalAdReply: {  
                title: '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐩𝐫𝐨𝐦𝐨𝐳𝐢𝐨𝐧𝐞 👑',  
                thumbnail: await fetchBuffer(profilePicture || imageFallback),  
            },  
        },  
    });  
}  

// RETROCESSIONE  
if (message.messageStubType === 30 && detectEnabled) {  
    const demotedUser = message.messageStubParameters[0];  

    let profilePicture;  
    try {  
        profilePicture = await conn.profilePictureUrl(demotedUser, 'image');  
    } catch {  
        profilePicture = null;  
    }  

    await conn.sendMessage(message.chat, {  
        text: `@${sender.split('@')[0]} 𝐡𝐚 𝐭𝐨𝐥𝐭𝐨 𝐢 𝐩𝐨𝐭𝐞𝐫𝐢 𝐚 @${demotedUser.split('@')[0]} 𝐨𝐫𝐚 𝐩𝐢𝐚𝐧𝐠𝐢`,  
        contextInfo: {  
            mentionedJid: [sender, demotedUser],  
            externalAdReply: {  
                title: '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐨𝐧𝐞 🙇🏻‍♂',  
                thumbnail: await fetchBuffer(profilePicture || imageFallback),  
            },  
        },  
    });  
}

};

export default handler;