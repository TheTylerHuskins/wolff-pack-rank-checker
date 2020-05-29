const { specialRanks, rankMap, inverseRankMap } = require('../library/constants');
const Discord = require('discord.js');

const noRankUpsMessage = 'Currently no one is eligible for a rank up.';

/**
 * Determines if the given rank string is in the list of special ranks
 * @param rank string
 */
const isSpecialRank = (rank) => specialRanks.includes(rank);

/**
 * Gets the Experience for a rank up for a given rank string
 * @param rank string
 */
const getRankExp = (rank) => (rankMap.get(rank) || 0);

/**
 * creates the rank up message for a given rank object
 * @param rank
 */
const createRankUpMessage = ({ experience, rankXp }) => `
  Current Rank: ${inverseRankMap.get(rankXp)}
  Current Exp:  ${experience.toLocaleString()}
  Rank Exp:     ${rankXp.toLocaleString()}`;

/**
 * From the given list of clan members returns the subset that are members 
 * who should be given a rank up
 * @param members Array<ClanMembers>
 */
const findMembersEligibleForRankUp = (members) => {
  return members
    .filter(m => !isSpecialRank(m.rank))
    .map(({ name, experience, rank }) => { return { name, experience, rankXp: getRankExp(rank) }; })
    .filter(m => m.experience >= m.rankXp);
};

/**
 * Creates a Discord Message Embed for the given list of clan members
 * @param rankUps rank
 */
const createRankUpsEmbed = (rankUps) => {
  const embed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Clan Members eligible for a rank up:')
    .setTimestamp();

  if (rankUps.length === 0) { embed.setDescription(noRankUpsMessage); return embed; }

  rankUps.forEach(m => embed.addField(m.name, createRankUpMessage(m)));
  return embed;
};

module.exports = { findMembersEligibleForRankUp, createRankUpsEmbed, noRankUpsMessage };
