import {gameApi, siteApi} from './client';

const fallbackLeaderboard=[
  {rank:1,nickname:'Maks_Roberts',avatar:'M',money:'₽ 2.4M',xp:'18 420',level:42,clan:'NOVEX FAMILY',delta24h:2},
  {rank:2,nickname:'Luna_Vega',avatar:'L',money:'₽ 1.9M',xp:'16 890',level:39,clan:'Vega Crew',delta24h:1},
  {rank:3,nickname:'Nikita_Sky',avatar:'N',money:'₽ 1.6M',xp:'15 240',level:37,clan:'Skyline',delta24h:-1},
  {rank:4,nickname:'Rex_Morgan',avatar:'R',money:'₽ 1.4M',xp:'14 780',level:35,clan:'Morgan Inc.',delta24h:0},
  {rank:5,nickname:'Margo_Lee',avatar:'M',money:'₽ 1.2M',xp:'13 420',level:33,clan:'Free City',delta24h:3},
];

const fallbackStats={totalPlayers:12847,totalPurchases:12000,totalHours:342100,onlineNow:2847};

export async function fetchServerStatus(){
  const {data}=await gameApi.get('/server/status');
  return data;
}

export async function fetchGlobalStats(){
  const {data}=await siteApi.get('/stats/global');
  return data;
}

export async function fetchLeaderboard(limit=5){
  const {data}=await gameApi.get(`/players/leaderboard?limit=${limit}&sort=xp`);
  const players=data?.players ?? data?.data?.players ?? data?.data ?? data;
  return Array.isArray(players)?players:[];
}

export {fallbackLeaderboard,fallbackStats};
