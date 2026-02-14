const playAgainButtons = (prefix) => [
    {
        buttonId: `${prefix}tiktokmeme`,
        buttonText: { displayText: '🎥 Altro Meme TikTok' },
        type: 1
    }
];

let handler = async (m, { conn, usedPrefix }) => {

    const cooldownKey = `tiktokmeme_${m.chat}`;
    const now = Date.now();
    const lastUse = global.cooldowns?.[cooldownKey] || 0;
    const cooldownTime = 5000;

    if (now - lastUse < cooldownTime) {
        const remaining = Math.ceil((cooldownTime - (now - lastUse)) / 1000);
        return m.reply(`⏳ Aspetta ${remaining}s prima di richiedere un altro meme!`);
    }

    global.cooldowns = global.cooldowns || {};
    global.cooldowns[cooldownKey] = now;

    const categorie = {
        meme: [
            "https://www.tiktok.com/@khaby.lame/video/7012345678901234561",
            "https://www.tiktok.com/@funnyclips/video/7123456789012345678",
            "https://vm.tiktok.com/ZGJabc01/",
            "https://vm.tiktok.com/ZGJabc02/",
            "https://vm.tiktok.com/ZGJabc03/",
            "https://vm.tiktok.com/ZGJabc04/",
            "https://vm.tiktok.com/ZGJabc05/",
            "https://vm.tiktok.com/ZGJabc06/"
        ],
        fail: [
            "https://vm.tiktok.com/ZGJfail01/",
            "https://vm.tiktok.com/ZGJfail02/",
            "https://vm.tiktok.com/ZGJfail03/",
            "https://vm.tiktok.com/ZGJfail04/",
            "https://vm.tiktok.com/ZGJfail05/",
            "https://vm.tiktok.com/ZGJfail06/"
        ],
        dance: [
            "https://vm.tiktok.com/ZGJdance01/",
            "https://vm.tiktok.com/ZGJdance02/",
            "https://vm.tiktok.com/ZGJdance03/",
            "https://vm.tiktok.com/ZGJdance04/",
            "https://vm.tiktok.com/ZGJdance05/",
            "https://vm.tiktok.com/ZGJdance06/"
        ],
        viral: [
            "https://vm.tiktok.com/ZGJviral01/",
            "https://vm.tiktok.com/ZGJviral02/",
            "https://vm.tiktok.com/ZGJviral03/",
            "https://vm.tiktok.com/ZGJviral04/",
            "https://vm.tiktok.com/ZGJviral05/",
            "https://vm.tiktok.com/ZGJviral06/"
        ],
        audio: [
            "https://vm.tiktok.com/ZGJaudio01/",
            "https://vm.tiktok.com/ZGJaudio02/",
            "https://vm.tiktok.com/ZGJaudio03/",
            "https://vm.tiktok.com/ZGJaudio04/",
            "https://vm.tiktok.com/ZGJaudio05/",
            "https://vm.tiktok.com/ZGJaudio06/"
        ]
    };

    const keys = Object.keys(categorie);
    const randomCategory = keys[Math.floor(Math.random() * keys.length)];
    const lista = categorie[randomCategory];
    const randomLink = lista[Math.floor(Math.random() * lista.length)];

    const emojiCategoria = {
        meme: "😂",
        fail: "💀",
        dance: "🕺",
        viral: "🔥",
        audio: "🎵"
    };

    await conn.sendMessage(m.chat, {
        text: `${emojiCategoria[randomCategory]} *TikTok ${randomCategory.toUpperCase()} Random!*\n\n🔗 ${randomLink}`,
        buttons: playAgainButtons(usedPrefix),
        headerType: 1
    }, { quoted: m });
};

handler.help = ['tiktokmeme'];
handler.tags = ['divertimento'];
handler.command = /^(meme)$/i;
handler.group = true;
handler.register = true;

export default handler;