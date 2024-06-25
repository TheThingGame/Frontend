import axios from "axios";

const {VITE_API_KEY} = import.meta.env;

let headers = {"Content-Type": "application/json"};

export const create = async (data) => {
  return axios.post(`${VITE_API_KEY}new-match`, data, {headers});
};

export const join = async (data) => {
  return axios.post(`${VITE_API_KEY}join-match`, data, {headers});
};

export const leave = async (match_id, player_id) => {
  return axios.post(`${import.meta.env.VITE_API_KEY}leave/${match_id}`, {player_id}, {headers});
};

export const start = async (match_id, player_id) => {
  return axios.put(`${import.meta.env.VITE_API_KEY}start-match/${match_id}`, {player_id}, {headers});
};

export const playCard = async (match_id, player_id, card_id) => {
  return axios.put(`${import.meta.env.VITE_API_KEY}play-card/${match_id}`, {player_id, card_id}, {headers});
};

export const stealCard = async (match_id, player_id) => {
  return axios.put(`${import.meta.env.VITE_API_KEY}steal-card/${match_id}`, {player_id}, {headers});
};

export const nextTurn = async (match_id, player_id) => {
  return axios.put(`${import.meta.env.VITE_API_KEY}next-turn/${match_id}`, {player_id}, {headers});
};

export const changeColor = async (match_id, player_id, color) => {
  return axios.put(`${import.meta.env.VITE_API_KEY}change-color/${match_id}`, {player_id, color}, {headers});
};

export const uno = async (match_id, player_id) => {
  return axios.put(`${import.meta.env.VITE_API_KEY}uno/${match_id}`, {player_id}, {headers});
};

export const playAgain = async (match_id, player_id) => {
  return axios.put(`${import.meta.env.VITE_API_KEY}play_again/${match_id}`, {player_id}, {headers});
};
