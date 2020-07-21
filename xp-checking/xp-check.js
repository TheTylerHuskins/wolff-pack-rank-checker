const { rankMap } = require('../library/constants');
const Discord = require('discord.js');

const notFoundMessage = 'No one in the clan goes by that name.';

/**
 * Creates a Discord Message Embed for the given list of clan members
 * @param rankUps rank
 */
const createRankXpEmbed = (members) => {
  const embed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Clan xp:')
    .setTimestamp();

  if (members.length === 0) { embed.setDescription(notFoundMessage); return embed; }

  members.forEach(m => embed.addField(m.name, createMessage(m, rankMap.get(m.rank))));
  return embed;
};

const getMember = (memberName, members) => members.filter(m => m.name.toLowerCase() === memberName.toLowerCase());

const createMessage = ({ experience, rank }, rankXp) => !rankXp ? getNoRankXpMessage(rank) : `${(rankXp - experience).toLocaleString()} more xp to be eligable to rank up`;

const getNoRankXpMessage = (rank) => `The rank of ${rank} has no xp threshold for rank up.  See an Admin+ about any questions about ranking up.`;

module.exports = { getMember, createRankXpEmbed };
