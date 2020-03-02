<?php

use Illuminate\Database\Seeder;

class ArticlesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('articles')->delete();
        
        \DB::table('articles')->insert(array (
            0 => 
            array (
                'id' => 1,
                'number' => 1,
                'text' => 'Não há crime sem lei anterior que o defina. Não há pena sem prévia cominação legal.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:28:14',
                'updated_at' => '2020-02-15 04:31:03',
            ),
            1 => 
            array (
                'id' => 2,
                'number' => 2,
                'text' => 'Ninguém pode ser punido por fato que lei posterior deixa de considerar crime, cessando em virtude dela a execução e os efeitos penais da sentença condenatória.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:30:03',
                'updated_at' => '2020-02-15 04:30:45',
            ),
            2 => 
            array (
                'id' => 3,
                'number' => 3,
                'text' => 'A lei excepcional ou temporária, embora decorrido o período de sua duração ou cessadas as circunstâncias que a determinaram, aplica-se ao fato praticado durante sua vigência.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:35:28',
                'updated_at' => '2020-02-15 04:35:53',
            ),
            3 => 
            array (
                'id' => 4,
                'number' => 4,
                'text' => 'Considera-se praticado o crime no momento da ação ou omissão, ainda que outro seja o momento do resultado.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:36:47',
                'updated_at' => '2020-02-15 04:37:26',
            ),
            4 => 
            array (
                'id' => 5,
                'number' => 5,
                'text' => 'Aplica-se a lei brasileira, sem prejuízo de convenções, tratados e regras de direito internacional, ao crime cometido no território nacional.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:38:49',
                'updated_at' => '2020-02-15 04:39:09',
            ),
            5 => 
            array (
                'id' => 6,
                'number' => 6,
                'text' => 'Considera-se praticado o crime no lugar em que ocorreu a ação ou omissão, no todo ou em parte, bem como onde se produziu ou deveria produzir-se o resultado.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:42:34',
                'updated_at' => '2020-02-15 04:42:55',
            ),
            6 => 
            array (
                'id' => 7,
                'number' => 7,
                'text' => 'Ficam sujeitos à lei brasileira, embora cometidos no estrangeiro:',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 04:44:25',
                'updated_at' => '2020-02-15 04:44:25',
            ),
            7 => 
            array (
                'id' => 8,
                'number' => 8,
                'text' => 'A pena cumprida no estrangeiro atenua a pena imposta no Brasil pelo mesmo crime, quando diversas, ou nela é computada, quando idênticas.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:01:18',
                'updated_at' => '2020-02-15 05:01:31',
            ),
            8 => 
            array (
                'id' => 9,
                'number' => 9,
                'text' => 'A sentença estrangeira, quando a aplicação da lei brasileira produz na espécie as mesmas conseqüências, pode ser homologada no Brasil para:',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:02:14',
                'updated_at' => '2020-02-15 05:02:30',
            ),
            9 => 
            array (
                'id' => 10,
                'number' => 10,
                'text' => 'O dia do começo inclui-se no cômputo do prazo. Contam-se os dias, os meses e os anos pelo calendário comum.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:07:52',
                'updated_at' => '2020-02-15 05:08:04',
            ),
            10 => 
            array (
                'id' => 11,
                'number' => 11,
                'text' => 'Desprezam-se, nas penas privativas de liberdade e nas restritivas de direitos, as frações de dia, e, na pena de multa, as frações de cruzeiro.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:08:42',
                'updated_at' => '2020-02-15 05:08:55',
            ),
            11 => 
            array (
                'id' => 12,
                'number' => 12,
                'text' => 'As regras gerais deste Código aplicam-se aos fatos incriminados por lei especial, se esta não dispuser de modo diverso.',
                'title_id' => 1,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:09:20',
                'updated_at' => '2020-02-15 05:09:30',
            ),
            12 => 
            array (
                'id' => 13,
                'number' => 13,
                'text' => 'O resultado, de que depende a existência do crime, somente é imputável a quem lhe deu causa. Considera-se causa a ação ou omissão sem a qual o resultado não teria ocorrido.',
                'title_id' => 2,
                'chapter_id' => NULL,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 1,
                'created_at' => '2020-02-15 05:11:05',
                'updated_at' => '2020-02-15 05:11:17',
            ),
            13 => 
            array (
                'id' => 14,
                'number' => 1,
                'text' => 'Toda pessoa é capaz de direitos e deveres na ordem civil.',
                'title_id' => NULL,
                'chapter_id' => 1,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 2,
                'created_at' => '2020-02-15 05:27:49',
                'updated_at' => '2020-02-15 05:27:49',
            ),
            14 => 
            array (
                'id' => 15,
                'number' => 2,
                'text' => 'A personalidade civil da pessoa começa do nascimento com vida; mas a lei põe a salvo, desde a concepção, os direitos do nascituro.',
                'title_id' => NULL,
                'chapter_id' => 1,
                'section_id' => NULL,
                'subsection_id' => NULL,
                'rule_reference' => 2,
                'created_at' => '2020-02-15 05:28:13',
                'updated_at' => '2020-02-15 05:28:28',
            ),
        ));
        
        
    }
}