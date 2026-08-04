import '@/styles/legal.css';

export const metadata = {
  title: 'Aviso Legal y Términos de Servicio | Muebles Castaño',
  description: 'Información legal, condiciones de uso y propiedad intelectual del portal Muebles Castaño.',
};

export default function LegalNoticePage() {
  return (
    <>
      <div className="legal-header">
        <div className="container">
          <h1>Aviso Legal</h1>
          <p>Condiciones generales de uso e información del titular.</p>
        </div>
      </div>

      <div className="container">
        <div className="legal-content">
          <div className="legal-card">
            <h2>1. Información General</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa a los usuarios que el titular de este sitio web es:
            </p>
            <ul>
              <li><strong>Titular:</strong> Muebles Castaño S.L.</li>
              <li><strong>NIF:</strong> B-12345678</li>
              <li><strong>Domicilio Social:</strong> Calle Mayor, 15, 18830 Huéscar, Granada, España</li>
              <li><strong>Teléfono:</strong> +34 958 74 01 23</li>
              <li><strong>Email:</strong> info@mueblescastano.com</li>
            </ul>

            <h2>2. Propiedad Intelectual e Industrial</h2>
            <p>
              Todos los contenidos de este sitio web, incluyendo textos, imágenes, logotipos, marcas, combinaciones de colores, estructura y diseño, son propiedad exclusiva de Muebles Castaño o de sus colaboradores autorizados. Queda terminantemente prohibida cualquier reproducción, distribución, comunicación pública o transformación de los citados contenidos sin la autorización previa por escrito del titular del sitio.
            </p>

            <h2>3. Condiciones de Uso del Portal</h2>
            <p>
              El acceso a este portal atribuye la condición de USUARIO e implica la aceptación plena de las presentes condiciones de uso. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que Muebles Castaño ofrece a través de su web y a no emplearlos para:
            </p>
            <ul>
              <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
              <li>Difundir contenidos o propaganda de carácter racista, xenófobo o de apología del terrorismo.</li>
              <li>Provocar daños en los sistemas físicos y lógicos de Muebles Castaño, de sus proveedores o de terceras personas.</li>
              <li>Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico o de datos de otros usuarios o modificar sus mensajes.</li>
            </ul>

            <h2>4. Exclusión de Responsabilidad</h2>
            <p>
              Muebles Castaño no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos, a pesar de haber adoptado todas las medidas tecnológicas de seguridad necesarias en los servidores web.
            </p>

            <h2>5. Ley Aplicable y Jurisdicción</h2>
            <p>
              Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de Huéscar y Granada.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
