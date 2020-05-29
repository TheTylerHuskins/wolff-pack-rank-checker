const RankUpCheck = require('./rank-checking/rank-up-check');
const Discord = require('discord.js');

require('dotenv').config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

bot.on('ready', () => { console.info(`Logged in as ${bot.user.tag}!`); });

bot.on('message', (msg) => {
  try {
    if (!msg.content.startsWith('!')) { return; }

    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;


    if (!msg.content.startsWith('!rank')) { return; }
    RankUpCheck.createDiscordEmbed().then(embed => msg.channel.send(embed));
  } catch (error) { msg.channel.send("An error occured while processing the request.  Please try again later."); console.error(error); }
});
