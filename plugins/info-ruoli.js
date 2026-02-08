export async function onParticipantsUpdate(update, { conn }) {
  const { id, participants, action, author } = update

  // serve solo nei gruppi
  if (!id || !participants || !author) return

  // promozione admin
  if (action === 'promote') {
    for (let user of participants) {
      conn.sendMessage(
        id,
        {
          text: `🩸 *@${author.split('@')[0]}* ha donato i poteri a *@${user.split('@')[0]}*`,
          mentions: [author, user]
        }
      )
    }
  }

  // retrocessione admin
  if (action === 'demote') {
    for (let user of participants) {
      conn.sendMessage(
        id,
        {
          text: `⛓️ *@${author.split('@')[0]}* ha tolto i poteri a *@${user.split('@')[0]}*`,
          mentions: [author, user]
        }
      )
    }
  }
}