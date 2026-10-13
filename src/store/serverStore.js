import {create} from 'zustand';
import {fetchGlobalStats,fetchLeaderboard,fetchServerStatus,fallbackLeaderboard,fallbackStats} from '../api/serverApi';

let statusTimer=null;
let statsTimer=null;

export const useServerStore=create((set,get)=>({
  online:0,
  maxOnline:0,
  totalPurchases:0,
  totalPlayers:0,
  leaderboard:[],
  lastUpdated:0,
  isLive:false,
  fetchStatus:async()=>{
    try{
      const data=await fetchServerStatus();
      set({online:data.online,maxOnline:data.max||1000,lastUpdated:Date.now(),isLive:true});
    }catch{set({online:fallbackStats.onlineNow,maxOnline:1000,isLive:false,lastUpdated:Date.now()})}
  },
  fetchGlobalStats:async()=>{
    try{
      const data=await fetchGlobalStats();
      set({totalPurchases:data.totalPurchases,totalPlayers:data.totalPlayers,online:data.onlineNow??get().online});
    }catch{set({totalPurchases:fallbackStats.totalPurchases,totalPlayers:fallbackStats.totalPlayers})}
  },
  fetchLeaderboard:async()=>{
    try{const leaderboard=await fetchLeaderboard(5);set({leaderboard:Array.isArray(leaderboard)?leaderboard:fallbackLeaderboard});}catch{set({leaderboard:fallbackLeaderboard})}
  },
  startPolling:()=>{
    if(statusTimer)return;
    get().fetchStatus();
    get().fetchGlobalStats();
    get().fetchLeaderboard();
    statusTimer=setInterval(()=>get().fetchStatus(),30000);
    statsTimer=setInterval(()=>{get().fetchGlobalStats();get().fetchLeaderboard()},300000);
  },
  stopPolling:()=>{clearInterval(statusTimer);clearInterval(statsTimer);statusTimer=null;statsTimer=null;},
}));
