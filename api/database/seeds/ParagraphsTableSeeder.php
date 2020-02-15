<?php

use Illuminate\Database\Seeder;

class ParagraphsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('paragraphs')->delete();
        
        \DB::table('paragraphs')->insert(array (
            0 => 
            array (
                'id' => 1,
                'number' => 1,
                'text' => 'A lei posterior, que de qualquer modo favorecer o agente, aplica-se aos fatos anteriores, ainda que decididos por sentença condenatória transitada em julgado.',
                'article_id' => 2,
                'created_at' => '2020-02-15 04:32:32',
                'updated_at' => '2020-02-15 04:32:58',
            ),
            1 => 
            array (
                'id' => 2,
                'number' => 1,
                'text' => 'Para os efeitos penais, consideram-se como extensão do território nacional as embarcações e aeronaves brasileiras, de natureza pública ou a serviço do governo brasileiro onde quer que se encontrem, bem como as aeronaves e as embarcações brasileiras, mercantes ou de propriedade privada, que se achem, respectivamente, no espaço aéreo correspondente ou em alto-mar.',
                'article_id' => 5,
                'created_at' => '2020-02-15 04:40:42',
                'updated_at' => '2020-02-15 04:40:59',
            ),
            2 => 
            array (
                'id' => 3,
                'number' => 2,
                'text' => 'É também aplicável a lei brasileira aos crimes praticados a bordo de aeronaves ou embarcações estrangeiras de propriedade privada, achando-se aquelas em pouso no território nacional ou em vôo no espaço aéreo correspondente, e estas em porto ou mar territorial do Brasil.',
                'article_id' => 5,
                'created_at' => '2020-02-15 04:42:00',
                'updated_at' => '2020-02-15 04:42:12',
            ),
            3 => 
            array (
                'id' => 4,
                'number' => 1,
                'text' => 'Nos casos do inciso I, o agente é punido segundo a lei brasileira, ainda que absolvido ou condenado no estrangeiro.',
                'article_id' => 7,
                'created_at' => '2020-02-15 04:52:29',
                'updated_at' => '2020-02-15 04:52:41',
            ),
            4 => 
            array (
                'id' => 5,
                'number' => 2,
                'text' => 'Nos casos do inciso II, a aplicação da lei brasileira depende do concurso das seguintes condições:',
                'article_id' => 7,
                'created_at' => '2020-02-15 04:53:02',
                'updated_at' => '2020-02-15 04:53:02',
            ),
            5 => 
            array (
                'id' => 6,
                'number' => 3,
                'text' => 'A lei brasileira aplica-se também ao crime cometido por estrangeiro contra brasileiro fora do Brasil, se, reunidas as condições previstas no parágrafo anterior:',
                'article_id' => 7,
                'created_at' => '2020-02-15 04:58:56',
                'updated_at' => '2020-02-15 04:59:12',
            ),
            6 => 
            array (
                'id' => 7,
                'number' => 1,
                'text' => 'A homologação depende:',
                'article_id' => 9,
                'created_at' => '2020-02-15 05:04:32',
                'updated_at' => '2020-02-15 05:04:32',
            ),
            7 => 
            array (
                'id' => 9,
                'number' => 1,
                'text' => 'A superveniência de causa relativamente independente exclui a imputação quando, por si só, produziu o resultado; os fatos anteriores, entretanto, imputam-se a quem os praticou.',
                'article_id' => 13,
                'created_at' => '2020-02-15 05:12:01',
                'updated_at' => '2020-02-15 05:12:19',
            ),
            8 => 
            array (
                'id' => 10,
                'number' => 2,
                'text' => 'A omissão é penalmente relevante quando o omitente devia e podia agir para evitar o resultado. O dever de agir incumbe a quem:',
                'article_id' => 13,
                'created_at' => '2020-02-15 05:12:46',
                'updated_at' => '2020-02-15 05:13:02',
            ),
        ));
        
        
    }
}