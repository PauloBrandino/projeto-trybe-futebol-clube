export const listMatches = [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Grêmio"
      }
    },
    {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Internacional"
      }
    }
  ];

export const inProgress = listMatches.filter((match) => match.inProgress === true);

export const createdMatch = {
  id: 49,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 1,
  awayTeamGoals: 2,
  inProgress: true
} 

export const dataToCreate = {
  homeTeamId: 16,
  awayTeamId: 1,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}