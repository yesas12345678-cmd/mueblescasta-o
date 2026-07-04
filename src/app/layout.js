import './globals.css';
import '@/styles/components.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Muebles Castaño | Tienda de Muebles en Huéscar (Granada)',
  description:
    'Tu tienda de confianza de muebles y decoración en Huéscar, Granada. Descubre nuestro catálogo online de sofás, dormitorios, salones y colchones con envío local.',
  keywords: [
    'Muebles Castaño',
    'comprar muebles en Huéscar',
    'tienda de muebles en Granada',
    'muebles baratos Granada',
    'muebles Huéscar',
    'decoración en Huéscar',
    'sofás Huéscar',
    'colchones Huéscar',
  ],
  openGraph: {
    title: 'Muebles Castaño | Tienda de Muebles en Huéscar (Granada)',
    description:
      'Tu tienda de confianza de muebles y decoración en Huéscar, Granada. Catálogo online de sofás, dormitorios, salones y colchones.',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
