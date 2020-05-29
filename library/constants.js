const one_million = 1000000;

const clan_name = 'The Wolff Pack';

const rankMap = new Map([
  ['Recruit', 10],
  ['Corporal', 25],
  ['Sergeant', 50],
  ['Lieutenant', 100],
  ['Captain', 150],
]);

const inverseRankMap = new Map([...rankMap.entries()].map(([key, value]) => [value, key]));

const specialRanks = ['General', 'Admin', 'Organiser', 'Coordinator', 'Overseer', 'Deputy Owner', 'Owner'];


module.exports = { clan_name, rankMap, inverseRankMap, specialRanks, one_million };