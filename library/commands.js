const { findMembersEligibleForRankUp, createRankUpsEmbed } = require('../rank-checking/rank-up-check');
const { getMember, createRankXpEmbed } = require('../xp-checking/xp-check');
const { clan_name } = require('../library/constants');
const { clan } = require('runescape-api');


module.exports = {
  rank: {
    name: 'ranks',
    execute: (args) => clan.getMembers(clan_name)
      .then(findMembersEligibleForRankUp)
      .then(createRankUpsEmbed)
  },
  xp: {
    name: 'xp',
    execute: (args) => clan.getMembers(clan_name)
      .then(members => getMember(args[0], members))
      .then(createRankXpEmbed)
  },
};