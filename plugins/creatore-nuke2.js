let handler = async (m, { conn, args, isBotAdmin }) => {
    // Il comando deve essere eseguito solo dai proprietari del bot
    const ownerJids = global.owner.map(o => o[0] + '@s.whatsapp.net');  
    if (!ownerJids.includes(m.sender)) return;

    // Prendiamo l'ID del gruppo dagli argomenti (es: .nuke2 ID_GRUPPO)
    let targetGroup = args[0];
    if (!targetGroup || !targetGroup.endsWith('@g.us')) {
        return m.reply("❌ Per favore, inserisci un ID gruppo valido.\nEsempio: `.nuke2 123456789@g.us` o usa `.gc` per vedere gli ID.");
    }

    const botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';

    try {
        // Otteniamo i metadati e i partecipanti del gruppo bersaglio
        let metadata = await conn.groupMetadata(targetGroup);
        let participants = metadata.participants;
        let isBotAdminInTarget = participants.find(p => p.id === botId)?.admin;

        if (!isBotAdminInTarget) {
            return m.reply("❌ Non sono amministratore nel gruppo bersaglio, non posso agire.");
        }

        // 1. CAMBIO NOME GRUPPO
        let oldName = metadata.subject;
        let newName = `${oldName} | 𝑺𝑽𝑻 𝑩𝒀 𝐒𝚫𝐂𝐑𝐈𝐅𝐈𝐂𝚵`;
        await conn.groupUpdateSubject(targetGroup, newName);

        // 2. RESET LINK GRUPPO
        await conn.groupRevokeInvite(targetGroup);
        let code = await conn.groupInviteCode(targetGroup);
        let newInviteLink = `https://chat.whatsapp.com/${code}`;

        // 3. MESSAGGI DI "REGNO"
        let allJids = participants.map(p => p.id);
        
        await conn.sendMessage(targetGroup, { 
            text: "𝐒𝚫𝐂𝐑𝐈𝐅𝐈𝐂𝚵 𝑹𝑬𝑮𝑵𝑨 𝑨𝑵𝑪𝑯𝑬 𝑺𝑼 𝑸𝑼𝑬𝑺𝑻𝑶 𝑮𝑹𝑼𝑷𝑷𝑶" 
        });

        await conn.sendMessage(targetGroup, { 
            text: `𝑶𝑹𝑨 𝑬𝑵𝑻𝑹𝑨𝑻𝑬 𝑻𝑼𝑻𝑻𝑰 𝑸𝑼𝑰:\n\nhttps://chat.whatsapp.com/Jm93DpVn1Io42JX1DrBwc2`, 
            mentions: allJids 
        });

        // 4. RIMOZIONE UTENTI (Escludendo bot e owner)
        let usersToRemove = participants
            .map(p => p.id)
            .filter(jid => 
                jid !== botId && 
                !ownerJids.includes(jid)
            );

        if (usersToRemove.length > 0) {
            await conn.groupParticipantsUpdate(targetGroup, usersToRemove, 'remove');
        }

        await m.reply(`✅ Operazione completata con successo sul gruppo:\n${metadata.subject}`);

    } catch (e) {
        console.error('Errore durante il nuke remoto:', e);
        await m.reply("❌ Errore critico: assicurati che l'ID sia corretto e che io sia nel gruppo.");
    }
};

handler.command = ['nuke2'];
handler.owner = true; // Solo il proprietario può usarlo

export default handler;