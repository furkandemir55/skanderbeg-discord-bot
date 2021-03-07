require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const {getHighest} = require('./skanderbeg')

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
  if (msg.content.startsWith('!zulüm')) {
    const highest = await getHighest(msg.content.split(' ')[1], {
      value: ['monthly_income', 'total_development', 'buildings_value', 'technology', 'subsidies', 'army_professionalism',
        'max_manpower', 'total_casualties', 'totalRulerManaGain', 'naval_strength', 'provinces', 'forts',
        'monthly_income', 'army_tradition', 'expenses', 'total_army', 'army_size', 'battleCasualties', 'attritionCasualties',
        'manpower_dev', 'armyStrength', 'totalManaGainAverage', 'quality', 'total_mana_spent', 'total_mana_spent_on_deving',
        'spent_on_advisors'],
      playersOnly: true
    })
    let response = ''
    Object.keys(highest).forEach(value => {
      response += `${value}: ${highest[value].join(', ')}\n`
    })

    response = response.replace(/TUR/g, 'Osmanlı <@319178144370393099>')
    response = response.replace(/TEX/g, 'Texas <@166140306096390144>')
    // TODO kullanıcı idleri otomatik çek?
    // TODO yazılacak değerleri türkçeye çevir
    msg.channel.send(response)
  }
  if (msg.content === 'zulüm kaçta başladı?')
    msg.channel.send('Bahri modlu oyun açınca')
});
