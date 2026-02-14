import axios from 'axios';

let handler = async (m, { conn, args }) => {

    if (!args[0]) 
        return m.reply('⚠️ Inserisci un link TikTok!\n\nEsempio:\n.ttdl https://vm.tiktok.com/xxxx');

    let url = args[0];

    if (!url.includes('tiktok.com'))
        return m.reply('❌ Link non valido!');

    try {

        m.reply('⏳ Scaricando video...');

        // ESEMPIO API (puoi cambiarla con quella che preferisci)
        const api = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`;
        const { data } = await axios.get(api);

        if (!data || !data.video)
            return m.reply('❌ Errore nel download.');

        await conn.sendMessage(m.chat, {
            video: { url: data.video },
            caption: '🎥 Ecco il tuo TikTok!\n\n> 𝐒𝚫𝐂𝐑𝐈𝐅𝐈𝐂𝚵 𝚩𝚯𝐓'
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        m.reply('❌ Errore durante il download.');
    }
};

handler.help = ['ttdl <link>'];
handler.tags = ['downloader'];
handler.command = /^(ttdl)$/i;
handler.register = true;

export default handler;