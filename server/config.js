require('dotenv').config();
const githubToken = process.env.GITHUB_TOKEN;

module.exports = {
  api: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
  productsApi: 'http://localhost:3050',
  initialProduct: 1,
  atelierProduct: 71769,
  config: {
    headers: {
      Authorization: `${githubToken}`
    }
  },
};
