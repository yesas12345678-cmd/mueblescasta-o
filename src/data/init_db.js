const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL variable is not set!");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: connectionString.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : false
});

const run = async () => {
  try {
    await client.connect();
    console.log("Connected to the database successfully!");

    // 1. Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
          id VARCHAR(50) PRIMARY KEY,
          cliente_nombre VARCHAR(100) NOT NULL,
          cliente_email VARCHAR(150) NOT NULL,
          cliente_telefono VARCHAR(20) NOT NULL,
          direccion VARCHAR(200) NOT NULL,
          codigo_postal VARCHAR(10) NOT NULL,
          localidad VARCHAR(100) NOT NULL,
          provincia VARCHAR(100) NOT NULL,
          total NUMERIC(10, 2) NOT NULL,
          estado_pago VARCHAR(20) NOT NULL DEFAULT 'pendiente',
          fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          stripe_session_id VARCHAR(255)
      );
    `);
    console.log("Table 'pedidos' verified/created.");

    await client.query(`
      CREATE TABLE IF NOT EXISTS detalles_pedido (
          id SERIAL PRIMARY KEY,
          pedido_id VARCHAR(50) REFERENCES pedidos(id) ON DELETE CASCADE,
          producto_id VARCHAR(50) NOT NULL,
          producto_nombre VARCHAR(150) NOT NULL,
          cantidad INTEGER NOT NULL,
          precio_unitario NUMERIC(10, 2) NOT NULL
      );
    `);
    console.log("Table 'detalles_pedido' verified/created.");

    await client.query(`
      CREATE TABLE IF NOT EXISTS productos (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          slug VARCHAR(150) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          price NUMERIC(10, 2) NOT NULL,
          category VARCHAR(50) NOT NULL,
          image VARCHAR(255) NOT NULL,
          features TEXT[] NOT NULL,
          dimensions VARCHAR(150) NOT NULL,
          stock INTEGER NOT NULL DEFAULT 0,
          fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'productos' verified/created.");

    // Create Indexes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_pedidos_fecha ON pedidos(fecha_creacion DESC);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_pedidos_email ON pedidos(cliente_email);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_detalles_pedido_id ON detalles_pedido(pedido_id);`);
    console.log("Indexes verified/created.");

    // Seed products
    const res = await client.query("SELECT COUNT(*) FROM productos");
    const count = parseInt(res.rows[0].count, 10);
    
    if (count === 0) {
      console.log("Seeding products...");
      const seedProducts = [
        {
          id: 'prod_1',
          name: 'Sofá Premium "Huéscar"',
          slug: 'sofa-premium-huescar',
          description: 'Elegante y cómodo sofá de 3 plazas con tapizado de alta calidad antimanchas. Su estructura de madera de pino y suspensión de muelles garantizan el máximo confort y durabilidad en el corazón de tu hogar.',
          price: 599.00,
          category: 'Salón',
          image: '/images/sofa-huescar.jpg',
          features: ['Estructura de madera maciza', 'Tela antimanchas lavable', '3 plazas espaciosas', 'Fabricación artesanal'],
          dimensions: '210cm x 95cm x 90cm',
          stock: 12
        },
        {
          id: 'prod_2',
          name: 'Mesa de Comedor "Altiplano"',
          slug: 'mesa-comedor-altiplano',
          description: 'Mesa de comedor rectangular fabricada en madera maciza de roble con acabado natural aceitado y patas de metal en negro mate. Perfecta combinación de estilo rústico e industrial para tu comedor.',
          price: 349.00,
          category: 'Salón',
          image: '/images/mesa-altiplano.jpg',
          features: ['Madera maciza de roble', 'Patas metálicas industriales', 'Capacidad para 6-8 personas', 'Acabado resistente a manchas'],
          dimensions: '160cm (extensible a 200cm) x 90cm x 76cm',
          stock: 8
        },
        {
          id: 'prod_3',
          name: 'Dormitorio de Matrimonio "Granada"',
          slug: 'dormitorio-matrimonio-granada',
          description: 'Conjunto completo de dormitorio que incluye cabecero de madera rústica tallada a mano y dos mesitas de noche con dos cajones cada una. Aporta calidez y estilo clásico andaluz a tu dormitorio.',
          price: 450.00,
          category: 'Dormitorio',
          image: '/images/dormitorio-granada.jpg',
          features: ['Cabecero tallado a mano', 'Incluye 2 mesitas de noche', 'Madera maciza ecológica', 'Estilo rústico chic'],
          dimensions: 'Cabecero: 160cm x 120cm | Mesitas: 50cm x 40cm x 60cm',
          stock: 5
        },
        {
          id: 'prod_4',
          name: 'Aparador de Madera "Castaño"',
          slug: 'aparador-madera-castano',
          description: 'Aparador de gran capacidad con estructura de castaño y chapa de roble natural. Cuenta con 4 cajones con guías amortiguadas y 2 grandes puertas con estantes interiores para organizar tu vajilla.',
          price: 399.00,
          category: 'Almacenamiento',
          image: '/images/aparador-castano.jpg',
          features: ['Madera noble de castaño', 'Guías con freno suave', 'Gran capacidad de almacenaje', 'Estilo contemporáneo'],
          dimensions: '180cm x 45cm x 85cm',
          stock: 6
        }
      ];

      for (const p of seedProducts) {
        await client.query(
          `INSERT INTO productos (id, name, slug, description, price, category, image, features, dimensions, stock)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [p.id, p.name, p.slug, p.description, p.price, p.category, p.image, p.features, p.dimensions, p.stock]
        );
      }
      console.log("Products seeded successfully.");
    } else {
      console.log("Products already exist in the database, skipped seeding.");
    }

    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Database initialization failed:", err);
  } finally {
    await client.end();
  }
};

run();
