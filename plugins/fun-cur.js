// gp-cur.js — Last.fm CUR + SETUSER (Mood & Popularity + Buttons)

import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/* ───────────── PATH & FILE ───────────── */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const USERS_FILE = path.join(__dirname, '..', 'lastfm_users.json')

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '{}', 'utf8')
}

/* ───────────── CONFIG ───────────── */

const LASTFM_API_KEY = '36f859a1fc4121e7f0e931806507d5f9'

/* ───────────── USER STORAGE ───────────── */

const loadUsers = () =>
  JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'))

const saveUsers = (users) =>
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))

const getUser = (id) => loadUsers()[id] || null

const setUser = (id, username) => {
  const users = loadUsers()
  users[id] = username
  saveUsers(users)
}

/* ───────────── FETCH UTILS ───────────── */

async function fetchNoCache(url) {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch {
    return null
  }
}

/* ───────────── LAST.FM API ───────────── */

async function getRecentTrack(user) {
  const url =
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
  const json = await fetchNoCache(url)
  return json?.recenttracks?.track?.[0]
}

async function getTrackInfo(user, artist, track) {
  const url =
    `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&username=${user}&format=json`
  const json = await fetchNoCache(url)
  return json?.track
}

async function getArtistInfo(artist) {
  const url =
    `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(artist)}&format=json`
  const json = await fetchNoCache(url)
  return json?.artist
}

/* ───────────── POPULARITY ───────────── */

function popularityBar(listeners) {
  const max = 2_000_000
  let level = Math.min(10, Math.max(1, Math.round((listeners / max) * 10)))
  if (listeners === 0) level = 0
  return '█'.repeat(level) + '░'.repeat(10 - level)
}

function popularityLabel(listeners) {
  if (listeners < 15000) return '🖤 Underground'
  if (listeners < 150000) return '✨ Niche'
  if (listeners < 600000) return '🔥 Popolare'
  return '🌍 HIT'
}

/* ───────────── HANDLER ───────────── */

const handler = async (m, { conn, usedPrefix, command, text }) => {

  /* ───── SETUSER ───── */

  if (command === 'setuser') {
    const username = text.trim()
    if (!username)
      return m.reply(`❌ Usa: ${usedPrefix}setuser <username>`)

    setUser(m.sender, username)
    return m.reply(`✅ Username Last.fm *${username}* salvato!`)
  }

  /* ───── CUR ───── */

  if (command === 'cur') {
    const targetId = m.mentionedJid?.[0] || m.sender
    const user = getUser(targetId)

    if (!user) {
      return conn.sendMessage(
        m.chat,
        {
          text: `❌ Registrati con ${usedPrefix}setuser <username>`,
          mentions: [targetId]
        },
        { quoted: m }
      )
    }

    const track = await getRecentTrack(user)
    if (!track) return m.reply('❌ Nessun ascolto trovato.')

    const artistName = track.artist['#text']
    const trackName = track.name
    const album = track.album?.['#text'] || '—'
    const image =
      track.image?.find(i => i.size === 'extralarge')?.['#text']

    const info = await getTrackInfo(user, artistName, trackName)

    let tagsArr = info?.toptags?.tag || []
    if (!tagsArr.length) {
      const artistInfo = await getArtistInfo(artistName)
      tagsArr = artistInfo?.tags?.tag || []
    }

    const tags =
      tagsArr.slice(0, 4).map(t => `#${t.name.toLowerCase()}`).join(' ') || '#music'

    const listeners = parseInt(info?.listeners || 0)
    const playcount = parseInt(info?.userplaycount || 0)
    const durationMs = parseInt(info?.duration || 0)

    const minutes = durationMs
      ? Math.round((playcount * durationMs) / 60000)
      : '—'

    const displayName = '@' + targetId.split('@')[0]

    const caption = `
🖥️ sto hackerando Last.fm...
█▒▒▒▒▒▒▒▒▒ 12%

🎧 Trovato!!
${displayName} ascolta:
${trackName} — ${artistName}

💿 Album: ${album}
🎨 Mood intercettato: ${tags}

⏱️ Tempo buttato qui: ${minutes} min

🔥 Livello di fama:
${popularityBar(listeners)}
👥 ${listeners.toLocaleString()} ascoltatori random
🏷️ Stato attuale: ${popularityLabel(listeners)}
`.trim()

    const buttons = [
      {
        buttonId: `like_${trackName}`,
        buttonText: { displayText: '👍 Ti piace' },
        type: 1
      },
      {
        buttonId: `dislike_${trackName}`,
        buttonText: { displayText: '👎 Non ti piace' },
        type: 1
      }
    ]

    return conn.sendMessage(
      m.chat,
      {
        image: image ? { url: image } : undefined,
        caption,
        footer: `Last.fm di ${user}`,
        buttons,
        headerType: image ? 4 : 1,
        mentions: [targetId]
      },
      { quoted: m }
    )
  }
}

handler.command = ['cur', 'setuser']
handler.group = true

export default handler