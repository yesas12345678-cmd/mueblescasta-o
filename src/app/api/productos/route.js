import { NextResponse } from 'next/server';
import { productos } from '@/data/productos';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (category) {
    const filtered = productos.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    return NextResponse.json(filtered);
  }

  return NextResponse.json(productos);
}
