-- Creación de la tabla de pedidos
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

-- Creación de la tabla de detalles de pedido
CREATE TABLE IF NOT EXISTS detalles_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id VARCHAR(50) REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id VARCHAR(50) NOT NULL,
    producto_nombre VARCHAR(150) NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL
);

-- Índices para mejorar el rendimiento de las consultas comunes
CREATE INDEX IF NOT EXISTS idx_pedidos_fecha ON pedidos(fecha_creacion DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_email ON pedidos(cliente_email);
CREATE INDEX IF NOT EXISTS idx_detalles_pedido_id ON detalles_pedido(pedido_id);
