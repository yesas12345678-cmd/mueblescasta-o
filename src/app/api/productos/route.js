import { NextResponse } from 'next/server';
import { productos as staticProducts } from '@/data/productos';
import { query } from '@/utils/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const hasDb = !!process.env.DATABASE_URL;

  try {
    if (hasDb) {
      let sql = 'SELECT * FROM productos';
      let params = [];
      
      if (category) {
        sql += ' WHERE LOWER(category) = LOWER($1)';
        params.push(category);
      }
      
      sql += ' ORDER BY id ASC';
      const result = await query(sql, params);
      
      // Mapear los resultados para asegurar compatibilidad con tipos del frontend
      const formattedProducts = result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        price: parseFloat(row.price),
        category: row.category,
        image: row.image,
        features: Array.isArray(row.features) ? row.features : [],
        dimensions: row.dimensions,
        stock: parseInt(row.stock, 10),
      }));

      return NextResponse.json(formattedProducts);
    }
  } catch (error) {
    console.error('Error al obtener productos de la base de datos, usando datos estáticos:', error);
  }

  // Fallback a productos estáticos si falla la base de datos o no está configurada
  if (category) {
    const filtered = staticProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    return NextResponse.json(filtered);
  }

  return NextResponse.json(staticProducts);
}
