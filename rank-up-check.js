const { clan } = require("runescape-api");
const Discord = require('discord.js');

const one_million = 1000000;
const clan_name = "The Wolff Pack";
const rankMap = new Map([
  ["Recruit", 10],
  ["Corporal", 25],
  ["Sergeant", 50],
  ["Lieutenant", 100],
  ["Captain", 150],
]);
const inverseRankMap = new Map([...rankMap.entries()].map(([key, value]) => [value, key]));

const isSpecialRank = (rank) => ['General', 'Admin', 'Organiser', 'Coordinator', 'Overseer', 'Deputy Owner', 'Owner'].includes(rank);
const getRankExp = (rank) => (rankMap.get(rank) || 0) * one_million;
const checkForRankUps = (members) => {
  const rankUps = members
    .filter(mem => !isSpecialRank(mem.rank))
    .map(mem => { const obj = { name, experience } = mem; obj.RankXp = getRankExp(mem.rank); return obj; })
    .filter(mem => mem.experience >= mem.RankXp);

  const embed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Clan Members eligible for a rank up:')
    .setTimestamp();

  if (rankUps.length === 0) { embed.setDescription("Currently no one is eligible for a rank up."); }
  else {
    rankUps.forEach(m => embed.addField(m.name, `
    New Rank:    ${inverseRankMap.get(m.RankXp / one_million)}
    Current Exp: ${m.experience.toLocaleString()}
    Rank Exp:    ${m.RankXp.toLocaleString()}`));
  }
  return embed;
};

module.exports = { execute: async () => clan.getMembers(clan_name).then(checkForRankUps) };
