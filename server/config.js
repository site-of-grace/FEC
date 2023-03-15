require('dotenv').config();
const githubToken = process.env.GITHUB_TOKEN;

module.exports = {
  api: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
  initialProduct: 71697,
  config: {
    headers: {
      Authorization: `${githubToken}`
    }
  }, 
};
