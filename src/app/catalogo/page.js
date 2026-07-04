import { productos } from '@/data/productos';
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

export default function CatalogPage() {
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
      <CatalogList initialProducts={productos} />
    </>
  );
}
