export function validateEnv() {
  const var_requeridas = [
    'DB_CONNECTION_STRING',
    'JWT_SECRET',
    'CLIENT_URL'
  ];

  const faltando = var_requeridas.filter(varName => !process.env[varName]);

  if (faltando.length > 0) {
    console.error('Variáveis de ambiente faltando:');
    faltando.forEach(varName => console.error(`  - ${varName}`));
    process.exit(1);
  }

  console.log('Todas as variáveis de ambiente foram validadas');
}