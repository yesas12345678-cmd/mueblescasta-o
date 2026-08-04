import { Pool } from 'pg';

let pool;

if (!pool) {
  const connectionString = process.env.DATABASE_URL;
  
  // Si estamos en desarrollo y no se ha definido DATABASE_URL, avisamos al desarrollador
  if (!connectionString && process.env.NODE_ENV !== 'production') {
    console.warn(
      'ADVERTENCIA: La variable de entorno DATABASE_URL no está configurada. Las consultas a la base de datos fallarán.'
    );
  }

  // Configuración de SSL para servicios en la nube (como Supabase/Neon)
  const isProduction = process.env.NODE_ENV === 'production';
  const hasSqlmodeRequire = connectionString && connectionString.includes('sslmode=require');
  const hasSqlmodeDisable = connectionString && connectionString.includes('sslmode=disable');
  
  pool = new Pool({
    connectionString,
    ssl: (isProduction && !hasSqlmodeDisable) || hasSqlmodeRequire
      ? { rejectUnauthorized: false }
      : false,
  });
}

/**
 * Helper para ejecutar consultas SQL de forma segura y consistente.
 * @param {string} text Consulta SQL parametrizada
 * @param {any[]} params Parámetros para la consulta
 * @returns {Promise<any>} Resultado de la consulta de pg
 */
export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production') {
      console.log('Query ejecutada:', { text, duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('Error al ejecutar query:', { text, error });
    throw error;
  }
}

export { pool };
