const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const USERS_FILE = path.join(__dirname, '../lastfm_users.json')
const LIKES_FILE = path.join(__dirname, '../song_likes.json')

if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '{}')
if (!fs.existsSync(LIKES_FILE)) fs.writeFileSync(LIKES_FILE, '{}')

const LASTFM_API_KEY = '36f859a1fc4121e7f0e931806507d5f9'

// ================= FILE SYSTEM =================

function loadUsers() { return JSON.parse(fs.readFileSync(USERS_FILE)) }
function saveUsers(data) { fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2)) }

function loadLikes() { return JSON.parse(fs.readFileSync(LIKES_FILE)) }
function saveLikes(data) { fs.writeFileSync(LIKES_FILE, JSON.stringify(data, null, 2)) }

function getLastfmUsername(id) {
  return loadUsers()[id] || null
}

function setLastfmUsername(id, username) {
  const users = loadUsers()
  users[id] = username
  saveUsers(users)
}

function generateSongId(username, artist, track) {
  return `${username}_${artist}_${track}`
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '_')
    .toLowerCase()
}

function addLike(songId, userId) {
  const likes = loadLikes()
  if (!likes[songId]) likes[songId] = { likes: 0, users: [] }

  if (likes[songId].users.includes(userId)) {
    return { already: true, total: likes[songId].likes }
  }

  likes[songId].likes++
  likes[songId].users.push(userId)
  saveLikes(likes)

  return { already: false, total: likes[songId].likes }
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

async function getRecentTrack(username) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
  const data = await fetchJson(url)
  return data?.recenttracks?.track?.[0]
}

// ================= HANDLER =================

let handler = async (m, { conn, usedPrefix, text, command }) => {

  if (command === 'setuser') {
    if (!text) return m.reply(`Usa: ${usedPrefix}setuser username`)
    setLastfmUsername(m.sender, text.trim())
    return m.reply(`Profilo collegato: ${text.trim()}`)
  }

  let username = text ? text.trim() : getLastfmUsername(m.sender)
  if (!username) return m.reply(`Specifica username o usa ${usedPrefix}setuser`)

  if (command === 'cur') {

    const track = await getRecentTrack(username)
    if (!track) return m.reply('Nessuna traccia trovata.')

    const artist = track.artist?.['#text']
    const title = track.name
    const album = track.album?.['#text']
    const image = track.image?.pop()?.['#text']

    const caption =
`🎧 Ultimo brano

👤 ${username}
🎵 ${title}
🎤 ${artist}
💿 ${album}`

    // INVIA IMMAGINE
    if (image) {
      await conn.sendMessage(m.chat, {
        image: { url: image },
        caption
      }, { quoted: m })
    }

    // BOTTONI NATIVI VAREBOT
    const buttons = [
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "❤️ Like",
          id: `${usedPrefix}like ${username}`
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "📝 Testo",
          id: `${usedPrefix}testo ${username}`
        })
      }
    ]

    return await conn.sendMessage(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: "Scegli un'opzione:" },
            nativeFlowMessage: { buttons }
          }
        }
      }
    }, { quoted: m })
  }

  if (command === 'like') {
    return m.reply('Like registrato 🔥')
  }

  if (command === 'testo') {
    return m.reply('Funzione testo attiva 📝')
  }
}

handler.command = ['setuser', 'cur', 'like', 'testo']
handler.group = true
handler.tags = ['fun']

module.exports = handler