<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'product_id'=> 1,
                'name'=>  'Cabezal Movil 4 Luces Led Rgb Robotico Dmx Eventos',
                'description'=> 'Cabezal Móvil 4 Led Mini Rgb Robótico Dmx Dj Fiestas YT601C
                Este cabezal móvil es ideal para utilizar en fiestas o eventos, ya que, se puede cambiar de color, y manejar la velocidad junto a la dirección que se mueva el aparato.
                Es compacto y ligero, muy fácil de transportar.
                También es un excelente complemento para utilizar en un escenario, en obras de teatro o certámenes y competencias de danza.',
                'price'=> 8000,
                'manufacturer'=> 'DMX',
                'category'=> 'illuminacion',
                'cover'=> 'principal.jpg',
                'cover_description'=> 'imagen del Cabezal Movil 4 Luces',

                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'product_id'=> 2,
                'name'=>  'Luces Láser Profesionales 4 En 1 Para Fiestas Dj',
                'description'=> 'Efectos de espectáculo de luz láser: la luz láser de fiesta cuenta con un escáner óptico de alta velocidad mejorado, combinado con luces gobo rojas, azules, rojas, luces láser verdes, luces estroboscópicas RGB. Esta potente combinación de luces de DJ genera más de 100 patrones y más de 200 iluminación láser, diferentes ocasiones y necesidades para crear un ambiente diverso',
                'price'=> 23000,
                'manufacturer'=> 'Warmdance',
                'category'=> 'illuminacion',
                'cover'=> 'principal2.jpg',
                'cover_description'=> 'imagen de Luces Láser Profesionales 4 En 1',

                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'product_id'=> 3,
                'name'=>  'Carpas Cristal Premiun',
                'description'=> 'Esta carpa transparente de estructura reforzada es ideal para eventos sociales o corporativos al aire libre, como casamientos, fiestas o cenas formales. Ofrece un diseño elegante con cortinas laterales enrollables, techado de lona cristal y sistema de iluminación LED colgante que realza el ambiente, especialmente al atardecer. Su estructura resistente permite decorarla con plantas, telas o luces, adaptándose a diferentes estilos. Es perfecta para crear un espacio cerrado sin perder la vista del entorno natural.',
                'price'=> 6000,
                'manufacturer'=> 'La Beduina',
                'category'=> 'carpas-escenarios',
                'cover'=> 'principal3.jpg',
                'cover_description'=> 'imagen de la Carpas Cristal',

                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'product_id'=> 4,
                'name'=>  'Bafle Activo Dbtechnologies B-hype 8 - Ideal Vivo Dj Eventos',
                'description'=> 'El nuevo B-HYPE 8 es un altavoz activo versátil. Está equipado con un motor de compresión de 1” (bobina móvil de 1”) y un woofer de 8” (bobina móvil de 1,5”). El patrón de dispersión es asimétrico en el eje vertical y diversificado (arriba y abajo) en el horizontal. Esto permite una cobertura de sonido más estrecha y eficiente, y un mejor rendimiento en el caso de entornos reverberantes. La entrada combo (con selección de tipo de fuente) permite un uso fácil y versátil, adecuado para un micrófono dinámico y una entrada de línea estándar. El usuario puede mejorar las frecuencias bajas y altas con la práctica función preestablecida DSP. Una salida de enlace balanceada permite la conexión de audio a un segundo altavoz.',
                'price'=> 10000,
                'manufacturer'=> 'B-hype',
                'category'=> 'Audio',
                'cover'=> 'principal4.jpg',
                'cover_description'=> 'imagen del producto',

                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'product_id'=> 5,
                'name'=>  'Parlante JBL VL8A negro 220V',
                'description'=> 'JBL VL8A ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.',
                'price'=> 35000,
                'manufacturer'=> 'JBL',
                'category'=> 'Audio',
                'cover'=> 'principal5.jpg',
                'cover_description'=> 'imagen del producto',

                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'product_id'=> 6,
                'name'=>  'Carpas Beduinas px4',
                'description'=> 'Esta carpa con estructura reforzada es ideal para eventos sociales o corporativos al aire libre, como casamientos, fiestas o cenas formales. Ofrece un diseño elegante, techado de lona beige y sistema de iluminación LED colgante que realza el ambiente, especialmente al atardecer. Su estructura resistente permite decorarla con plantas, telas o luces, adaptándose a diferentes estilos. Es perfecta para crear un espacio cerrado sin perder la vista del entorno',
                'price'=> 70000,
                'manufacturer'=> 'JBL',
                'category'=> 'Audio',
                'cover'=> 'principal6.jpg',
                'cover_description'=> 'imagen del producto',

                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'product_id'=> 7,
                'name'=>  'Maquina De Niebla De 1500w',
                'description'=> 'Características:
                • 100-240V - 50/60Hz
                • Potencia: 1500W
                • Tiempo de calentamiento: 8 minutos
                • Salida de humo: 10000 pies cúbicos/min
                • Capacidad del tanque de aceite: 3L
                • Distancia de pulverización: 12 metros
                • Control de cable, ajuste de tiempo y volumen
                • Control: control remoto, control de cable de alimentación',
                'price'=> 21000,
                'manufacturer'=> 'Spark',
                'category'=> 'MAQUINA DE NIEBLA',
                'cover'=> 'principal7.jpg',
                'cover_description'=> 'imagen del producto',

                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'product_id'=> 8,
                'name'=>  'Maquina De Chispa Fria 600w Control Remoto + Dmx V-s',
                'description'=> 'Máquina de fuente de chispa fría. Adopta un nuevo principio de calentamiento electro magnetico para hacer que el calor de polvo de metal especial sea un control DMX estándar para realizar efectos especiales de múltiples etapas. El producto es seguro y respetuoso con el medio ambiente. Fácil de transportar. Es un nuevo equipo subversivo en comparación con la tradicional fuente de fuegos artificiales fríos, es ampliamente utilizado en varios tipos de actuaciones grandes y medianas, efectos de atmósfera de bar.',
                'price'=> 30000,
                'manufacturer'=> 'Vision Elite',
                'category'=> 'Chispa',
                'cover'=> 'principal8.jpg',
                'cover_description'=> 'imagen del producto',

                'created_at'=> now(),
                'updated_at'=> now(),
            ],
        ]);
    }
}
