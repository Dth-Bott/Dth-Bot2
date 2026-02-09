let handler = async (m, { conn }) => {
    let utentiMenzionati = m.mentionedJid;

    if (!utentiMenzionati.length) {
        return m.reply("😏 *Devi menzionare qualcuno per farti fare un pompino!*\nEsempio: _.pompino @utente_");
    }

    let utenteScelto = utentiMenzionati[0];
    let mittente = m.sender;

    let messaggio = `💋 *@${mittente.split("@")[0]} 𝐬𝐢 è 𝐟𝐚𝐭𝐭𝐨 𝐟𝐚𝐫𝐞 𝐮𝐧 𝐩𝐨𝐦𝐩𝐢𝐧𝐨 𝐝𝐚 @${utenteScelto.split("@")[0]}!* 🔥

😏 𝐒𝐩𝐞𝐫𝐢𝐚𝐦𝐨 𝐜𝐡𝐞 𝐬𝐢𝐚 𝐬𝐭𝐚𝐭𝐨 𝐝𝐢 𝐭𝐮𝐨 𝐠𝐫𝐚𝐝𝐢𝐦𝐞𝐧𝐭𝐨...`;

    await conn.sendMessage(
        m.chat,
        { 
            text: messaggio, 
            mentions: [mittente, utenteScelto] 
        },
        { quoted: m }
    );
};

handler.command = ["pompino"];
export default handler;