export function validateEnv() {
  const requiredVars = [
    'DB_CONNECTION_STRING',
    'JWT_SECRET',
    'CLIENT_URL'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    console.error('Variáveis de ambiente faltando:');
    missing.forEach(varName => console.error(`  - ${varName}`));
    process.exit(1);
  }

  console.log('Todas as variáveis de ambiente foram validadas');
}