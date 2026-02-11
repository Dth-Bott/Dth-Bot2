import { WAMessageStubType } from '@realvare/based'
import axios from 'axios'

/* =======================
   INIT
======================= */
export async function before(m, { conn, groupMetadata }) {
    if (!m.isGroup || !m.messageStubType) return true

    const chat = global.db?.data?.chats?.[m.chat]
    if (!chat) return true

    const who = m.messageStubParameters?.[0]
    if (!who) return true

    const jid = conn.decodeJid(who)
    const cleanUserId = jid.split('@')[0]

    /* =======================
       EVENT TYPES (FIX)
    ======================= */
    const isWelcome =
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD ||
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_INVITE

    const isGoodbye =
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_KICK

    /* =======================
       BLOCK WRONG EVENTS
    ======================= */
    if (!isWelcome && !isGoodbye) return true
    if (isWelcome && !chat.welcome) return true
    if (isGoodbye && !chat.goodbye) return true

    const groupName = groupMetadata?.subject || 'Gruppo'
    const memberCount = groupMetadata?.participants?.length || 0

    /* =======================
       CAPTION (ELEGANTE)
    ======================= */
    const caption = isGoodbye
        ? `
☠️ 𝐀𝐃𝐃𝐈𝐎 𝐃𝐀 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄
👤 @${cleanUserId}
📉 Membri: ${memberCount}
`
        : `
🔥 𝐁𝐄𝐍𝐕𝐄𝐍𝐔𝐓𝐎 𝐒𝐔 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄
👤 @${cleanUserId}
👥 Membri: ${memberCount}
`

    /* =======================
       SEND MESSAGE
    ======================= */
    await conn.sendMessage(m.chat, {
        text: caption,
        mentions: [jid]
    })

    return true
}