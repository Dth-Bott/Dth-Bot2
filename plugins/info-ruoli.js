export async function participantsUpdate(m, { conn }) {
  const { id, participants, action, author } = m

  if (!id || !participants || !author) return

  // PROMOZIONE ADMIN
  if (action === 'promote') {
    for (let user of participants) {
      await conn.sendMessage(
        id,
        {
          text: `🩸 *@${author.split('@')[0]}* ha donato i poteri a *@${user.split('@')[0]}*`,
          mentions: [author, user]
        }
      )
    }
  }

  // RETROCESSIONE ADMIN
  if (action === 'demote') {
    for (let user of participants) {
      await conn.sendMessage(
        id,
        {
          text: `⛓️ *@${author.split('@')[0]}* ha tolto i poteri a *@${user.split('@')[0]}*`,
          mentions: [author, user]
        }
      )
    }
  }
}