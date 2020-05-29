const { findMembersEligibleForRankUp, createRankUpMessage } = require('./rank-check');
const { clan_name } = require('../library/constants');
const { clan } = require('runescape-api');
const Discord = require('discord.js');

const checkForRankUps = (members) => {
  const rankUps = findMembersEligibleForRankUp(members);

  const embed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Clan Members eligible for a rank up:')
    .setTimestamp();

  if (rankUps.length === 0) { embed.setDescription('Currently no one is eligible for a rank up.'); return; }

  rankUps.forEach(m => embed.addField(m.name, createRankUpMessage(m)));

  return embed;
};

module.exports = { createDiscordEmbed: async () => clan.getMembers(clan_name).then(checkForRankUps) };
