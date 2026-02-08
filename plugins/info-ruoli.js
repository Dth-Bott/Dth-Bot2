const handler = m => m;

async function handlePromotion(message) {
  const text = `@${message.sender.split('@')[0]} ha dato i poteri a @${message.messageStubParameters[0].split('@')[0]}`;
  
  await conn.sendMessage(message.chat, {
    text,
    mentions: [message.sender, message.messageStubParameters[0]]
  });
}

async function handleDemotion(message) {
  const text = `@${message.sender.split('@')[0]} ha levato i poteri a @${message.messageStubParameters[0].split('@')[0]}`;
  
  await conn.sendMessage(message.chat, {
    text,
    mentions: [message.sender, message.messageStubParameters[0]]
  });
}

handler.all = async function(m) {
  if (m.messageStubType === 29) {
    await handlePromotion(m);
  } else if (m.messageStubType === 30) {
    await handleDemotion(m);
  }
};

export default handler;