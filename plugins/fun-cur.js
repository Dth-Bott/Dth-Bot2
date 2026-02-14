import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USERS_FILE = path.join(__dirname, '..', 'lastfm_users.json')
const LIKES_FILE = path.join(__dirname, '..', 'song_likes.json')

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

function getLikesReceived(username) {
  const likes = loadLikes()
  let total = 0
  for (const id in likes) {
    if (id.startsWith(username.toLowerCase()))
      total += likes[id].likes
  }
  return total
}

// ================= API =================

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

async function getTrackInfo(username, artist, track) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&username=${username}&format=json`
  const data = await fetchJson(url)
  return data?.track
}

async function getUserInfo(username) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${LASTFM_API_KEY}&format=json`
  const data = await fetchJson(url)
  return data?.user
}

async function getTopArtists(username) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${LASTFM_API_KEY}&format=json&period=7day&limit=10`
  const data = await fetchJson(url)
  return data?.topartists?.artist || []
}

// ================= HANDLER =================

const handler = async (m, { conn, usedPrefix, text, command }) => {

  // ===== SETUSER =====
  if (command === 'setuser') {
    if (!text)
      return conn.sendMessage(m.chat, { text: `⚠️ Usa:\n${usedPrefix}setuser username` })

    setLastfmUsername(m.sender, text.trim())

    return conn.sendMessage(m.chat, {
      text: `🎉 Profilo collegato!\n👤 Username: *${text.trim()}*`
    })
  }

  // ===== USERNAME TARGET =====
  let username = text ? text.trim() : getLastfmUsername(m.sender)

  if (!username)
    return conn.sendMessage(m.chat, {
      text: `❌ Specifica un username o collegane uno con:\n${usedPrefix}setuser username`
    })

  // ===== CUR =====
  // ===== CUR =====
if (command === 'cur') {

  const track = await getRecentTrack(username)
  if (!track)
    return conn.sendMessage(m.chat, { text: '❌ Nessuna traccia trovata.' })

  const nowPlaying = track['@attr']?.nowplaying === 'true'
  const artist = track.artist?.['#text']
  const title = track.name
  const album = track.album?.['#text']
  const image = track.image?.pop()?.['#text']

  const info = await getTrackInfo(username, artist, title)
  const userInfo = await getUserInfo(username)
  const likes = getLikesReceived(username)

  const caption =
`🎧 ${nowPlaying ? '*IN RIPRODUZIONE ORA* 🔥' : '*Ultimo brano ascoltato*'}

👤 Last.fm: ${username}
🎵 *${title}*
🎤 ${artist}
💿 ${album}

📈 Riproduzioni utente: ${info?.userplaycount || 0}
🌍 Riproduzioni globali: ${info?.playcount || 0}
📊 Totale scrobble: ${userInfo?.playcount || 0}
🔥 Likes ricevuti: ${likes}

━━━━━━━━━━━━━━━`

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
  },
  {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
      display_text: "👑 Top Artists",
      id: `${usedPrefix}topartists ${username}`
    })
  }
]

await conn.sendMessage(m.chat, {
  text: caption,
  footer: '🎵 Last.fm Bot',
  interactiveButtons: buttons
}, { quoted: m })
  }
}

  // ===== LIKE =====
  if (command === 'like') {

    const track = await getRecentTrack(username)
    if (!track)
      return conn.sendMessage(m.chat, { text: '❌ Nessuna traccia trovata.' })

    const artist = track.artist?.['#text']
    const title = track.name
    const songId = generateSongId(username, artist, title)

    const result = addLike(songId, m.sender)

    if (result.already)
      return conn.sendMessage(m.chat, {
        text: `💔 Hai già messo like alla traccia di ${username}.`
      })

    return conn.sendMessage(m.chat, {
      text:
`🔥 Like aggiunto!

👤 Utente: ${username}
🎵 Brano: ${title}
🔥 Totale like: ${result.total}`
    })
  }

  // ===== TESTO =====
  if (command === 'testo') {

    const track = await getRecentTrack(username)
    if (!track)
      return conn.sendMessage(m.chat, { text: '❌ Nessuna traccia trovata.' })

    const artist = track.artist?.['#text']
    const title = track.name

    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`)
      const data = await res.json()

      if (!data.lyrics)
        return conn.sendMessage(m.chat, { text: '❌ Testo non trovato.' })

      const preview = data.lyrics.split('\n').slice(0, 12).join('\n')

      await conn.sendMessage(m.chat, {
        text:
`📝 Anteprima Testo

🎵 ${title}
🎤 ${artist}

━━━━━━━━━━━━━━
${preview}
━━━━━━━━━━━━━━`
      }, { quoted: m })

    } catch {
      return conn.sendMessage(m.chat, { text: '⚠️ Errore nel recupero del testo.' })
    }
  }

  // ===== TOP ARTISTS =====
  if (command === 'topartists') {

    const artists = await getTopArtists(username)
    if (!artists.length)
      return conn.sendMessage(m.chat, { text: '❌ Nessun dato trovato.' })

    const list = artists.map((a, i) =>
      `${i + 1}. ${a.name} — ${a.playcount} scrobble`
    ).join('\n')

    return conn.sendMessage(m.chat, {
      text: `👑 Top Artisti di ${username}\n\n${list}`
    })
  }

}

handler.command = ['setuser', 'cur', 'like', 'testo', 'topartists']
handler.group = true
handler.tags = ['lastfm']

export default handler