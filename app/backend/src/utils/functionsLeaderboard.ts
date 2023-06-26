import { IMatchWithTeam } from '../Interfaces/IMatch';
import {
  awaySumTotalDraws,
  awayTotalGames,
  awayTotalGoalsFavor,
  awayTotalGoalsOwn,
  awayTotalLosses,
  awayTotalPoints,
  awayTotalVictories,
  generalSumPoints,
  generalSumTotalDraws,
  generalTotalGames,
  generalTotalGoalsFavor,
  generalTotalGoalsOwn,
  generalTotalLosses,
  generalTotalVictories,
  homeSumTotalDraws,
  homeTotalGames,
  homeTotalGoalsFavor,
  homeTotalGoalsOwn,
  homeTotalLosses,
  homeTotalPoints,
  homeTotalVictories,
} from './auxFunctionLeaderboard';

export type route = 'home' | 'away' | undefined;

export function sumTotalPoints(matches: IMatchWithTeam[], teamName: string, router: route) {
  if (router === 'home') {
    return homeTotalPoints(matches, teamName);
  }
  if (router === 'away') {
    return awayTotalPoints(matches, teamName);
  }
  return generalSumPoints(matches, teamName);
}

export function sumTotalGames(matches: IMatchWithTeam[], teamName: string, router: route) {
  if (router === 'home') return homeTotalGames(matches, teamName);
  if (router === 'away') return awayTotalGames(matches, teamName);
  return generalTotalGames(matches, teamName);
}

export function sumVictories(matches: IMatchWithTeam[], teamName: string, router: route): number {
  if (router === 'home') return homeTotalVictories(matches, teamName);
  if (router === 'away') return awayTotalVictories(matches, teamName);
  return generalTotalVictories(matches, teamName);
}

export function sumTotalDraws(matches: IMatchWithTeam[], teamName: string, router: route): number {
  if (router === 'home') return homeSumTotalDraws(matches, teamName);
  if (router === 'away') return awaySumTotalDraws(matches, teamName);
  return generalSumTotalDraws(matches, teamName);
}

export function sumTotalLosses(matches: IMatchWithTeam[], teamName: string, router: route): number {
  if (router === 'home') return homeTotalLosses(matches, teamName);
  if (router === 'away') return awayTotalLosses(matches, teamName);
  return generalTotalLosses(matches, teamName);
}

export function sumGoalsFavor(matches: IMatchWithTeam[], teamName: string, router: route): number {
  if (router === 'home') return homeTotalGoalsFavor(matches, teamName);
  if (router === 'away') return awayTotalGoalsFavor(matches, teamName);
  return generalTotalGoalsFavor(matches, teamName);
}

export function sumGoalsOwn(matches: IMatchWithTeam[], teamName: string, router: route): number {
  if (router === 'home') return homeTotalGoalsOwn(matches, teamName);
  if (router === 'away') return awayTotalGoalsOwn(matches, teamName);
  return generalTotalGoalsOwn(matches, teamName);
}

export function efficiencyCalc(matches: IMatchWithTeam[], teamName: string, router: route): string {
  if (router === 'home') {
    return ((homeTotalPoints(matches, teamName) / (homeTotalGames(matches, teamName) * 3)) * 100)
      .toFixed(2);
  }
  if (router === 'away') {
    return (
      (awayTotalPoints(matches, teamName) / (awayTotalGames(matches, teamName) * 3)) * 100)
      .toFixed(2);
  }
  return (
    (generalSumPoints(matches, teamName) / (generalTotalGames(matches, teamName) * 3)) * 100)
    .toFixed(2);
}
