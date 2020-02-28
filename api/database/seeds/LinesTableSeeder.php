<?php

use Illuminate\Database\Seeder;

class LinesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('lines')->delete();
        
        \DB::table('lines')->insert(array (
            0 => 
            array (
                'id' => 1,
                'letter' => 'a',
                'text' => 'contra a vida ou a liberdade do Presidente da República;',
                'article_id' => NULL,
                'paragraph_id' => NULL,
                'incise_id' => 1,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:47:46',
                'updated_at' => '2020-02-15 04:47:46',
            ),
            1 => 
            array (
                'id' => 2,
                'letter' => 'b',
                'text' => 'contra o patrimônio ou a fé pública da União, do Distrito Federal, de Estado, de Território, de Município, de empresa pública, sociedade de economia mista, autarquia ou fundação instituída pelo Poder Público;',
                'article_id' => NULL,
                'paragraph_id' => NULL,
                'incise_id' => 1,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:48:22',
                'updated_at' => '2020-02-15 04:48:42',
            ),
            2 => 
            array (
                'id' => 3,
                'letter' => 'c',
                'text' => 'contra a administração pública, por quem está a seu serviço;',
                'article_id' => NULL,
                'paragraph_id' => NULL,
                'incise_id' => 1,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:49:36',
                'updated_at' => '2020-02-15 04:49:36',
            ),
            3 => 
            array (
                'id' => 4,
                'letter' => 'd',
                'text' => 'de genocídio, quando o agente for brasileiro ou domiciliado no Brasil;',
                'article_id' => NULL,
                'paragraph_id' => NULL,
                'incise_id' => 1,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:49:56',
                'updated_at' => '2020-02-15 04:49:56',
            ),
            4 => 
            array (
                'id' => 5,
                'letter' => 'a',
                'text' => 'que, por tratado ou convenção, o Brasil se obrigou a reprimir;',
                'article_id' => NULL,
                'paragraph_id' => NULL,
                'incise_id' => 2,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:50:57',
                'updated_at' => '2020-02-15 04:50:57',
            ),
            5 => 
            array (
                'id' => 6,
                'letter' => 'b',
                'text' => 'praticados por brasileiro;',
                'article_id' => NULL,
                'paragraph_id' => NULL,
                'incise_id' => 2,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:51:21',
                'updated_at' => '2020-02-15 04:51:21',
            ),
            6 => 
            array (
                'id' => 7,
                'letter' => 'c',
                'text' => 'praticados em aeronaves ou embarcações brasileiras, mercantes ou de propriedade privada, quando em território estrangeiro e aí não sejam julgados.',
                'article_id' => NULL,
                'paragraph_id' => NULL,
                'incise_id' => 2,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:51:41',
                'updated_at' => '2020-02-15 04:51:53',
            ),
            7 => 
            array (
                'id' => 8,
                'letter' => 'a',
                'text' => 'entrar o agente no território nacional;',
                'article_id' => NULL,
                'paragraph_id' => 5,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:55:03',
                'updated_at' => '2020-02-15 04:55:03',
            ),
            8 => 
            array (
                'id' => 9,
                'letter' => 'b',
                'text' => 'ser o fato punível também no país em que foi praticado;',
                'article_id' => NULL,
                'paragraph_id' => 5,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:55:18',
                'updated_at' => '2020-02-15 04:55:18',
            ),
            9 => 
            array (
                'id' => 10,
                'letter' => 'c',
                'text' => 'estar o crime incluído entre aqueles pelos quais a lei brasileira autoriza a extradição;',
                'article_id' => NULL,
                'paragraph_id' => 5,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:55:35',
                'updated_at' => '2020-02-15 04:55:35',
            ),
            10 => 
            array (
                'id' => 11,
                'letter' => 'd',
                'text' => 'não ter sido o agente absolvido no estrangeiro ou não ter aí cumprido a pena;',
                'article_id' => NULL,
                'paragraph_id' => 5,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:55:51',
                'updated_at' => '2020-02-15 04:55:51',
            ),
            11 => 
            array (
                'id' => 12,
                'letter' => 'e',
                'text' => 'não ter sido o agente perdoado no estrangeiro ou, por outro motivo, não estar extinta a punibilidade, segundo a lei mais favorável.',
                'article_id' => NULL,
                'paragraph_id' => 5,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:56:12',
                'updated_at' => '2020-02-15 04:56:26',
            ),
            12 => 
            array (
                'id' => 13,
                'letter' => 'a',
                'text' => 'não foi pedida ou foi negada a extradição;',
                'article_id' => NULL,
                'paragraph_id' => 6,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:59:58',
                'updated_at' => '2020-02-15 04:59:58',
            ),
            13 => 
            array (
                'id' => 14,
                'letter' => 'b',
                'text' => 'houve requisição do Ministro da Justiça.',
                'article_id' => NULL,
                'paragraph_id' => 6,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:00:16',
                'updated_at' => '2020-02-15 05:00:16',
            ),
            14 => 
            array (
                'id' => 15,
                'letter' => 'a',
                'text' => 'para os efeitos previstos no inciso I, de pedido da parte interessada;',
                'article_id' => NULL,
                'paragraph_id' => 7,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:05:24',
                'updated_at' => '2020-02-15 05:05:24',
            ),
            15 => 
            array (
                'id' => 16,
                'letter' => 'b',
                'text' => 'para os outros efeitos, da existência de tratado de extradição com o país de cuja autoridade judiciária emanou a sentença, ou, na falta de tratado, de requisição do Ministro da Justiça.',
                'article_id' => NULL,
                'paragraph_id' => 7,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:05:44',
                'updated_at' => '2020-02-15 05:06:02',
            ),
            16 => 
            array (
                'id' => 17,
                'letter' => 'a',
                'text' => 'tenha por lei obrigação de cuidado, proteção ou vigilância;',
                'article_id' => NULL,
                'paragraph_id' => 10,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:14:06',
                'updated_at' => '2020-02-15 05:14:06',
            ),
            17 => 
            array (
                'id' => 18,
                'letter' => 'b',
                'text' => 'de outra forma, assumiu a responsabilidade de impedir o resultado;',
                'article_id' => NULL,
                'paragraph_id' => 10,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:14:40',
                'updated_at' => '2020-02-15 05:14:40',
            ),
            18 => 
            array (
                'id' => 19,
                'letter' => 'c',
                'text' => 'com seu comportamento anterior, criou o risco da ocorrência do resultado.',
                'article_id' => NULL,
                'paragraph_id' => 10,
                'incise_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:14:57',
                'updated_at' => '2020-02-15 05:14:57',
            ),
        ));
        
        
    }
}