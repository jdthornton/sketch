module.exports = {
  WS_URL: JSON.stringify('ws://localhost:3000'),
  JWT_SECRET: JSON.stringify('JWT_SECRET'),
  MAX_ROUNDS_VAR: 8,
  ROUND_TIME_VAR: 60,
  BONUS_TIME_VAR: 20,
  DOMAIN_URL: JSON.stringify("http://localhost:3000"),
  PORT: 3000,
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}
