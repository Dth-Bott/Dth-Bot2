import axios from "axios";
import yts from "yt-search";

let handler = async (m, { conn, args }) => {
  if (!args.length)
    return m.reply("⚠️ Inserisci il nome della canzone!");

  try {
    await m.reply("🔎 Cerco la canzone...");

    const query = args.join(" ");
    const search = await yts(query);

    if (!search.videos.length)
      return m.reply("❌ Nessun risultato trovato.");

    const vid = search.videos[0];

    const title = vid.title;
    const duration = vid.timestamp;
    const views = vid.views.toLocaleString();
    const url = vid.url;
    const thumbnail = vid.thumbnail;

    /* ===== INVIA ANTEPRIMA ===== */
    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption:
`🎵 *${title}*

⏱ Durata: ${duration}
👁️ Views: ${views}
🔗 Link: ${url}

⏳ Download audio in corso...`
    }, { quoted: m });

    /* ===== API DOWNLOAD AUDIO ===== */
    const api = `https://api.vevioz.com/@api/button/mp3?url=${encodeURIComponent(url)}`;

    const { data } = await axios.get(api, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!data?.url)
      return m.reply("❌ Errore nel recupero dell'audio.");

    /* ===== INVIA AUDIO ===== */
    await conn.sendMessage(m.chat, {
      audio: { url: data.url },
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`
    }, { quoted: m });

  } catch (err) {
    console.error("ERRORE PLAY:", err.response?.data || err.message);
    m.reply("❌ Errore durante il download.");
  }
};

handler.help = ['play <nome canzone>'];
handler.tags = ['downloader'];
handler.command = /^play$/i;

export default handler;