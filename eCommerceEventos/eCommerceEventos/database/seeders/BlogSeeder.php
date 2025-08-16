<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('blog')->insert(
            [
                [
                'titulo' => "Cómo elegir los equipos adecuados según el evento",
                'resumen' => "Guía práctica para seleccionar sonido, iluminación y estructuras según el tipo y tamaño de tu evento.",
                'contenido' => "
                <p>Organizar un evento exitoso depende en gran medida de la elección correcta del equipamiento técnico. No todos los eventos requieren el mismo tipo de sonido, iluminación o estructura, por eso es clave adaptar las herramientas según la naturaleza del encuentro.</p><h3>&nbsp;Conocé el tipo de evento:</h3><p>¿Es un casamiento? ¿Un congreso? ¿Un recital al aire libre? Cada tipo de evento tiene requerimientos diferentes. Un evento social puede priorizar la ambientación y el diseño estético, mientras que uno corporativo necesita un audio claro para discursos y presentaciones.</p><h3>2. Evaluá el espacio:</h3><p>No es lo mismo sonorizar un salón cerrado que un predio abierto. La acústica varía mucho, y eso influye directamente en la potencia de los parlantes o en la cantidad de luces necesarias.</p><h3>3. No escatimes en iluminación:</h3><p>Una iluminación bien colocada realza la ambientación y puede transformar por completo la experiencia de los asistentes. Pensá en luz ambiental, luces móviles, y efectos si es un evento nocturno.</p><h3>4. El valor de una prueba técnica:</h3><p>Siempre que sea posible, realizá un ensayo general. Esto permite detectar errores de conexión, fallos en el sonido o detalles de iluminación que se pueden ajustar.</p><h3>Conclusión:</h3><p>Elegir el equipamiento correcto no solo mejora la experiencia del público, sino que también refleja profesionalismo. Asesorate con proveedores confiables y considerá contratar a un técnico de sonido e iluminación si el evento lo amerita.</p>",
                'cover'=>"covers/InOTnxhdaIoXRHQesInA8unx9s65L4Ewn5iytt4b.webp",
                'cover_description'=>"imagen",
                'fecha_publicacion' => "2025-05-05 ",
                ],

                [
                'titulo' => "Novedades en iluminación y sonido para 2025",
                'resumen' => "Descubrí las últimas tecnologías en iluminación LED y sistemas de sonido envolvente para eventos.",
                'contenido' => "
                <p>El mundo de los eventos está en constante evolución, y 2025 no es la excepción. Este año trae consigo innovaciones en tecnología de iluminación y sonido que están revolucionando la forma de vivir una experiencia en vivo.</p><h3>Iluminación inteligente:</h3><p>Se están imponiendo sistemas de iluminación LED que pueden ser controlados desde aplicaciones móviles, lo que permite crear escenas dinámicas y programaciones en tiempo real sin necesidad de consolas físicas.</p><h3>Sistemas de sonido envolvente 360°:</h3><p>Gracias a avances en diseño de audio espacial, muchos eventos ya están adoptando parlantes que ofrecen una experiencia envolvente, ideal para presentaciones inmersivas, shows o experiencias sensoriales.</p><h3>Equipos inalámbricos mejorados:</h3><p>&nbsp;Los micrófonos y parlantes inalámbricos ahora tienen mejor alcance, más autonomía y menos interferencias, permitiendo montajes más limpios y con menos cables.</p><h3>Sostenibilidad tecnológica:</h3><p>&nbsp;Cada vez más proveedores están optando por tecnologías más amigables con el ambiente, desde luces con menor consumo hasta equipos reutilizables y reciclables.</p><h3>Conclusión:</h3><p>Mantenerse actualizado con estas novedades puede darte una ventaja competitiva importante, tanto si organizás eventos como si sos proveedor técnico.</p>",
                'cover'=>"covers/m4iwZq99MDBsS8fRrI87eU93wpnRev5Ndoio8o4S.jpg",
                'cover_description'=>"imagen",
                'fecha_publicacion' => "2025-05-01 "
                ],

                [
                'titulo' => "5 consejos para que tu evento sea un éxito",
                'resumen' => "Tips esenciales para planificar y ejecutar eventos inolvidables.",
                'contenido' => "
                <p>La organización de eventos es un arte que combina planificación, creatividad y atención al detalle. Acá te dejamos cinco consejos clave que harán que tu próximo evento sea un verdadero éxito:</p><h3>1. Planificá con tiempo:</h3><p>Empezar la planificación con anticipación te permitirá tener más opciones de proveedores, ajustar presupuestos y responder a imprevistos sin estrés.</p><h3>2. Definí un objetivo claro:</h3><p>¿Qué querés lograr con tu evento? Establecer un objetivo (informar, celebrar, vender, fidelizar) te permitirá tomar mejores decisiones en cuanto al contenido y logística.</p><h3>3. Elegí bien a tus proveedores:</h3><p>&nbsp;Son tu equipo aliado. Asegurate de que cuenten con experiencia, buenos equipos y referencias. Una falla técnica puede arruinar toda la experiencia.</p><h3>4. Creá una experiencia memorable:</h3><p>&nbsp;Pensá en el recorrido del invitado, desde la bienvenida hasta la despedida. ¿Hay momentos sorpresa? ¿Espacios para fotos? ¿Regalos? Todo suma.</p><h3>5. Tené un plan B:</h3><p>Siempre existe la posibilidad de que algo salga mal. Tené planes alternativos para lluvia, cortes de energía o ausencias de última hora.</p><h3>Conclusión:</h3><p>&nbsp;Un evento exitoso no se trata solo de suerte, sino de preparación. Con estos consejos estás un paso más cerca de lograrlo.</p>",
                'cover' => null,
                'cover_description' => null,
                'fecha_publicacion' => "2025-04-25 "
                ],

                [
                'titulo' => "Tendencias en escenarios para eventos sociales",
                'resumen' => "Conocé los estilos de escenario más innovadores para bodas, cumpleaños y eventos temáticos.",
                'contenido' => "
                <p>En los últimos años, el diseño de escenarios para eventos sociales se volvió una pieza clave en la ambientación general. Te contamos qué se está usando en 2025:</p><h3>1. Escenarios modulares:</h3><p>Permiten adaptarse a diferentes espacios y estilos. Son ideales para eventos al aire libre donde el terreno puede ser irregular.</p><h3>2. Fondos con pantalla LED:</h3><p>Las pantallas gigantes se integran como parte del fondo del escenario, permitiendo mostrar videos, animaciones o mensajes personalizados durante la celebración.</p><h3>3. Integración floral y natural:</h3><p>&nbsp;Se usa cada vez más vegetación, flores y estructuras en madera que combinan con estilos boho, rústicos o románticos.</p><h3>4. Iluminación decorativa:</h3><p>Luces cálidas, luces colgantes, guirnaldas LED y reflectores suaves crean ambientes mágicos y sofisticados.</p><h3>5. Escenarios interactivos:</h3><p>&nbsp;Algunos eventos incluyen zonas del escenario que invitan al público a participar, como cabinas fotográficas o espacios para brindar discursos espontáneos.</p><h3>Conclusión:</h3><p>El escenario no es solo el lugar donde ocurre algo: es parte de la narrativa del evento. Invertí en diseño y originalidad para dejar una impresión duradera.</p>",
                'cover' => null,
                'cover_description' => null,
                'fecha_publicacion' => "2025-04-15 "
                ],

                [
                'titulo' => "Checklist de sonido para tu próximo evento",
                'resumen' => "Todo lo que tenés que revisar antes de montar el sistema de sonido.",
                'contenido' => "
                <p>Antes de empezar cualquier montaje de sonido, es fundamental contar con un checklist que te asegure que todo esté preparado para que el evento se escuche de maravilla:</p><ol><li>✅ <strong>Consola de sonido (probada y limpia) &nbsp;</strong></li><li><strong>✅ Micrófonos (inalámbricos y con cable) &nbsp;</strong></li><li><strong>✅ Cables XLR y adaptadores &nbsp;</strong></li><li><strong>✅ Parlantes (principales y de retorno) &nbsp;</strong></li><li><strong>✅ Soportes para parlantes y micrófonos &nbsp;</strong></li><li><strong>✅ Reproductores o conexión de música &nbsp;</strong></li><li><strong>✅ Amplificadores, si es necesario &nbsp;</strong></li><li><strong>✅ Estabilizador de tensión eléctrica &nbsp;</strong></li><li><strong>✅ Baterías y pilas de repuesto &nbsp;</strong></li><li><strong>✅ Computadora o dispositivo para audio digital &nbsp;</strong></li><li><strong>✅ Técnicos capacitados o apoyo en caso de emergencia</strong></li></ol><h3>Recomendaciones extra:&nbsp;</h3><ul><li>Llegá con anticipación y probá todos los equipos. &nbsp;</li><li>Tené un plan alternativo si algo falla. &nbsp;</li><li>Cuidá la estética del montaje, los cables deben estar ocultos y bien asegurados.</li></ul><h3>Conclusión:</h3><p>La calidad del sonido es uno de los aspectos más recordados por los asistentes. Asegurate de que todo funcione perfectamente y tendrás medio evento ganado.</p>",
                'cover' => null,
                'cover_description' => null,
                'fecha_publicacion' => "2025-03-30 "
                ],

                [
                'titulo' => "La importancia de la iluminación en eventos corporativos",
                'resumen' => "Una iluminación correcta potencia la imagen de tu empresa durante un evento.",
                'contenido' => "
                <p>En los eventos empresariales, cada detalle comunica. La iluminación cumple un rol estratégico para resaltar la identidad visual de una marca y generar sensaciones positivas entre los asistentes.</p><h3>1. Luz para destacar:</h3><p>Usá spots o luces direccionales para resaltar stands, banners, o productos clave. Esto ayuda a dirigir la atención del público donde querés.</p><h3>2. Branding con iluminación:</h3><p>&nbsp;Es posible usar proyectores para mostrar el logo de la empresa sobre paredes o estructuras. Esto refuerza la imagen institucional.</p><h3>3. Evitá excesos:</h3><p>&nbsp;Una luz mal ubicada puede incomodar o distraer. El equilibrio entre intensidad y calidez es clave, sobre todo en salones cerrados.</p><h3>4. Ambientación general:</h3><p>Las luces LED programables permiten adaptar la atmósfera según el momento del evento: una luz fría para charlas formales y una más cálida para momentos sociales.</p><h3>5. Tecnología y sostenibilidad:</h3><p>Apostar por sistemas de bajo consumo y control inteligente te da mejor control y ayuda al cuidado ambiental.</p><h3>Conclusión:</h3><p>No subestimes la iluminación. Es una herramienta poderosa para comunicar, emocionar y posicionar la imagen de tu empresa.</p>",
                'cover' => null,
                'cover_description' => null,
                'fecha_publicacion' => "2025-03-10 "
                ],
                [
    'titulo' => "Guía para montar un bar exitoso en tu evento",
    'resumen' => "Consejos clave para incorporar un servicio de bar y coctelería que eleve la experiencia de tu fiesta o evento privado.",
    'contenido' => "
    <p>Un bar bien montado puede transformar un evento común en una experiencia inolvidable. Ya sea una fiesta privada, casamiento o evento corporativo, el servicio de coctelería aporta estilo, dinamismo y un toque gourmet que tus invitados valorarán.</p>

    <h3>1. Elegí el tipo de barra:</h3>
    <p>Hay opciones móviles, temáticas (tiki, minimalista, vintage) o incluso autos antiguos adaptados como barra. Elegí una que combine con la estética general del evento.</p>

    <h3>2. Definí la carta de tragos:</h3>
    <p>Podés optar por cócteles clásicos (como mojito, caipirinha, daiquiri) o sumar tragos personalizados con nombres relacionados al evento. No olvides incluir opciones sin alcohol.</p>

    <h3>3. Contratá bartenders profesionales:</h3>
    <p>No es lo mismo servir bebidas que hacer coctelería. Un bartender capacitado aporta técnica, seguridad y show. Algunos incluso ofrecen barras con fuego, flair o decoración exótica.</p>

    <h3>4. Pensá en la logística:</h3>
    <p>La barra debe tener acceso a electricidad, agua y un espacio cómodo para el bartender. Además, asegurate de que haya vasos suficientes, insumos frescos y hielo en cantidad.</p>

    <h3>5. Considerá una estación de autoservicio:</h3>
    <p>En eventos más relajados, podés sumar una estación de gin tonic o vermut, donde los invitados se preparen su bebida. Esto reduce tiempos de espera y aporta interacción.</p>

    <h3>Conclusión:</h3>
    <p>Un servicio de bar bien planificado no solo cumple una función práctica, sino que se convierte en uno de los focos principales del evento. Apostá por la calidad y creatividad para brindar una experiencia inolvidable, siempre con responsabilidad.</p>",
    'cover' => null,
    'cover_description' => null,
    'fecha_publicacion' => "2025-06-03",
],



            ]);
        DB::table('blog_have_categories')->insert([
            ['blog_fk'=>1, 'categories_fk'=>1],
            ['blog_fk'=>2, 'categories_fk'=>2],
            ['blog_fk'=>3, 'categories_fk'=>1],
            ['blog_fk'=>4, 'categories_fk'=>6],
            ['blog_fk'=>5, 'categories_fk'=>1],
            ['blog_fk'=>6, 'categories_fk'=>3],
            ['blog_fk'=>7, 'categories_fk'=>7],

        ]);
    }
}
