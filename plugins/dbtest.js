import fs from 'fs'

let handler = async (m) => {
  let db = JSON.parse(fs.readFileSync('./database.json'))
  let keys = Object.keys(db)

  let text = '*DEBUG DATABASE*\n\n'
  text += 'Chiavi root:\n'
  text += keys.slice(0, 10).join('\n')

  m.reply(text)
}

handler.command = ['dbtest']
export default handler