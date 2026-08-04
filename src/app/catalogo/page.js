import { productos as staticProducts } from '@/data/productos';
import { query } from '@/utils/db';
import CatalogList from '@/components/CatalogList';
import '@/styles/catalog.css';

export const metadata = {
  title: 'Catálogo de Muebles en Huéscar | Muebles Castaño',
  description:
    'Explora nuestra selección exclusiva de muebles en Huéscar (Granada). Encuentra sofás, cabeceros de cama rústicos, mesas industriales y aparadores de castaño.',
  keywords: [
    'catálogo de muebles Huéscar',
    'sofás en Huéscar',
    'mesas de comedor Granada',
    'cabeceros de cama Huéscar',
    'aparador de castaño',
  ],
};

export default async function CatalogPage() {
  let productsList = staticProducts;
  const hasDb = !!process.env.DATABASE_URL;

  if (hasDb) {
    try {
      const result = await query('SELECT * FROM productos ORDER BY id ASC');
      productsList = result.rows.map((row) => ({
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
    } catch (error) {
      console.error('Error al cargar productos de PostgreSQL para catálogo:', error);
    }
  }

  return (
    <>
      <div className="catalog-header">
        <div className="container">
          <h1>Nuestro Catálogo</h1>
          <p>
            Muebles diseñados con pasión y fabricados para perdurar. Encuentra las piezas perfectas para vestir cada rincón de tu casa.
          </p>
        </div>
      </div>
      <CatalogList initialProducts={productsList} />
    </>
  );
}
