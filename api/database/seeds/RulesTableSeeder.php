<?php

use Illuminate\Database\Seeder;

class RulesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('rules')->delete();
        
        \DB::table('rules')->insert(array (
            0 => 
            array (
                'id' => 1,
                'rule_title' => 'Código Penal',
                'description' => 'Descrição sobre o Código penal',
                'preamble' => 'PREÂMBULO',
                'created_at' => '2020-02-15 04:24:39',
                'updated_at' => '2020-02-15 04:24:39',
            ),
            1 => 
            array (
                'id' => 2,
                'title' => 'Código Civil',
                'description' => 'Descrição sobre o Código Civil',
                'preamble' => NULL,
                'created_at' => '2020-02-15 05:22:07',
                'updated_at' => '2020-02-15 05:22:51',
            ),
            2 => 
            array (
                'id' => 3,
                'title' => 'Constituição Federal',
                'description' => 'CONSTITUIÇÃO DA REPÚBLICA FEDERATIVA DO BRASIL DE 1988',
                'preamble' => 'Nós, representantes do povo brasileiro, reunidos em Assembléia Nacional Constituinte para instituir um Estado Democrático, destinado a assegurar o exercício dos direitos sociais e individuais, a liberdade, a segurança, o bem-estar, o desenvolvimento, a igualdade e a justiça como valores supremos de uma sociedade fraterna, pluralista e sem preconceitos, fundada na harmonia social e comprometida, na ordem interna e internacional, com a solução pacífica das controvérsias, promulgamos, sob a proteção de Deus, a seguinte CONSTITUIÇÃO DA REPÚBLICA FEDERATIVA DO BRASIL.',
                'created_at' => '2020-02-15 05:22:07',
                'updated_at' => '2020-02-15 05:22:51',
            ),
        ));
        
        
    }
}