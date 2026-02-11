let handler = async (m) => {
  global.db.data.chats[m.chat].isBanned = false;
  let message = '𝐌𝐨𝐝𝐚𝐥𝐢𝐭à 𝐀𝐅𝐊 𝐝𝐢𝐬𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚, 𝐬𝐨𝐧𝐨 𝐭𝐨𝐫𝐧𝐚𝐭𝐨 𝐑𝐈𝐊𝐊𝐈𝐎𝐍𝐈 ✓';
  await conn.sendMessage(m.chat, { 
      text: message,
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '',
              serverMessageId: '',
              newsletterName: '𝔻𝕋ℍ-𝔹𝕆𝕋'
          }
      }
  }, { quoted: m });
};

handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = /^wakeywakey$/i;
handler.rowner = true;
export default handler;