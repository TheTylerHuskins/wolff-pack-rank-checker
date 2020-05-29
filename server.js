const botCommands = require('./library/commands');
const Discord = require('discord.js');

require('dotenv').config();
const TOKEN = process.env.TOKEN;

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

Object.keys(botCommands).map(key => { bot.commands.set(botCommands[key].name, botCommands[key]); });


bot.login(TOKEN);

bot.on('ready', () => { console.info(`Logged in as ${bot.user.tag}!`); });

bot.on('message', (msg) => {
  try {
    if (!msg.content.startsWith('!')) { return; }

    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase().replace('!', '');

    if (!bot.commands.has(command)) return;

    bot.commands.get(command).execute().then(embed => msg.channel.send(embed));
  } catch (error) { msg.channel.send("An error occured while processing the request.  Please try again later."); console.error(error); }
});
