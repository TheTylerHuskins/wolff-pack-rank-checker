const clan_name = 'The Wolff Pack';

const rankMap = new Map([
  ['Recruit', 10000000],
  ['Corporal', 25000000],
  ['Sergeant', 50000000],
  ['Lieutenant', 100000000],
  ['Captain', 150000000],
]);

const inverseRankMap = new Map([...rankMap.entries()].map(([key, value]) => [value, key]));

const specialRanks = ['General', 'Admin', 'Organiser', 'Coordinator', 'Overseer', 'Deputy Owner', 'Owner'];


module.exports = { clan_name, rankMap, inverseRankMap, specialRanks };