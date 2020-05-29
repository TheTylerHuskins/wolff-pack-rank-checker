const { specialRanks, rankMap, inverseRankMap, one_million } = require('../library/constants');

const isSpecialRank = (rank) => specialRanks.includes(rank);

const getRankExp = (rank) => (rankMap.get(rank) || 0) * one_million;

const createRankUpMessage = ({ rankXp, experience }) => `
Current Rank: ${inverseRankMap.get(rankXp / one_million)}
Current Exp:  ${experience.toLocaleString()}
Rank Exp:     ${rankXp.toLocaleString()}`;


const findMembersEligibleForRankUp = (members) => {
  return members
    .filter(member => !isSpecialRank(member.rank))
    .map(member => { const obj = { name, experience } = member; obj.rankXp = getRankExp(member.rank); return obj; })
    .filter(member => member.experience >= member.rankXp);
};

module.exports = { findMembersEligibleForRankUp, createRankUpMessage };
