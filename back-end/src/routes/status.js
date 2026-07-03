import express from express;
const app = express();

app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(), 
    checks: {
      database: 'unknown'
    }
  };

  try {
    await checkDatabase();
    health.checks.database = 'ok';
    res.status(200).json(health);
  } catch (error) {
    health.status = 'error';
    health.checks.database = 'fail';
    health.error = error.message;
    res.status(503).json(health); // 503 = Service Unavailable
  }
});

app.listen(3000, () => console.log('Server rodando na porta 3000'));