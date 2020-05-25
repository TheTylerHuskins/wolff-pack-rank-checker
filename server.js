require('dotenv').config();
const rankUpCheck = require("./rank-up-check");
const Discord = require("discord.js");

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);
//
bot.on('ready', () => { console.info(`Logged in as ${bot.user.tag}!`); });

bot.on('message', (msg) => {
  try {
    if (!msg.content.startsWith('!ranks')) { return; }
    rankUpCheck.execute().then(embed => msg.channel.send(embed));
  } catch (error) { msg.channel.send("An error occured while processing the request.  Please try again later."); }
});
