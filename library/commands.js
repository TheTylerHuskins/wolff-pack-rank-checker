const { findMembersEligibleForRankUp, createRankUpsEmbed } = require('../rank-checking/rank-up-check');
const { clan_name } = require('../library/constants');
const { clan } = require('runescape-api');


module.exports = {
  rank: {
    name: 'ranks',
    execute: () => clan.getMembers(clan_name)
      .then(findMembersEligibleForRankUp)
      .then(createRankUpsEmbed)
  },
};