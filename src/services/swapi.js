import axios from 'axios';

const SWAPI = 'https://swapi.py4e.com/api';

export const searchCharacters = (query = '', page = 1) =>
  axios.get(`${SWAPI}/people/?search=${query}&page=${page}`);

export const getCharacter = (id) =>
  axios.get(`${SWAPI}/people/${id}/`);

export const getHomeworld = (url) =>
  axios.get(url);

export const getFilms = (urls) =>
  Promise.all(urls.map(url => axios.get(url)));

export const searchPlanets = (query = '', page = 1) =>
  axios.get(`${SWAPI}/planets/?search=${query}&page=${page}`);

export const getPlanet = (id) =>
  axios.get(`${SWAPI}/planets/${id}/`);

export const searchSpecies = (query = '', page = 1) =>
  axios.get(`${SWAPI}/species/?search=${query}&page=${page}`);

export const getSpecies = (id) =>
  axios.get(`${SWAPI}/species/${id}/`);