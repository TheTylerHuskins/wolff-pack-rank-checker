const { findMembersEligibleForRankUp, createRankUpsEmbed, noRankUpsMessage } = require('./rank-up-check');
const { rankMap } = require('../library/constants');

const memberToRankUp = {
  name: 'doug423',
  rank: 'Recruit',
  experience: rankMap.get('Recruit') + 20,
  rankXp: rankMap.get('Recruit')
};

const memberList = [
  memberToRankUp, {
    name: 'Bobert7',
    rank: 'Recruit',
    experience: 4000,
  }];

// findMembersEligibleForRankUp

test('"findMembersEligibleForRankUp" correctly finds Members eligible for rank up from a list: correct number of items', () => {
  const result = findMembersEligibleForRankUp(memberList);
  expect(result.length).toBe(1);
});

test('"findMembersEligibleForRankUp" correctly finds Members eligible for rank up from a list: correct name', () => {
  const result = findMembersEligibleForRankUp(memberList);
  expect(result[0].experience).toBe(memberToRankUp.experience);
});

test('"findMembersEligibleForRankUp" correctly finds Members eligible for rank up from a list: correct experience', () => {
  const result = findMembersEligibleForRankUp(memberList);
  expect(result[0].experience).toBe(memberToRankUp.experience);
});

test('"findMembersEligibleForRankUp" correctly finds Members eligible for rank up from a list: correct rankXp', () => {
  const result = findMembersEligibleForRankUp(memberList);
  expect(result[0].rankXp).toBe(memberToRankUp.rankXp);
});

// createRankUpsEmbed

test('"createRankUpsEmbed" correctly creates a discord embed: embed.description for 0 length rank up', () => {
  const result = createRankUpsEmbed([]);
  console.log(result);
  expect(result.description).toBe(noRankUpsMessage);
});

test('"createRankUpsEmbed" correctly creates a discord embed: embed fields has the correct length', () => {
  const result = createRankUpsEmbed([memberToRankUp]);
  console.log(result);
  expect(result.fields.length).toBe(1);
});

test('"createRankUpsEmbed" correctly creates a discord embed: embed fields has correct name', () => {
  const result = createRankUpsEmbed([memberToRankUp]);
  console.log(result);
  expect(result.fields[0].name).toBe(memberToRankUp.name);
});