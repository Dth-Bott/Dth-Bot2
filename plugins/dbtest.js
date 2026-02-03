import fs from 'fs'

let handler = async (m) => {
  let raw = fs.readFileSync('./database.json', 'utf8')

  let text = '*DEBUG AVANZATO*\n\n'
  text += 'Lunghezza file: ' + raw.length + '\n\n'
  text += 'Prime 300 lettere:\n'
  text += raw.slice(0, 300)

  m.reply(text)
}

handler.command = ['dbtest2']
export default handler