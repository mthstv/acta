<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RuleValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
     public function rules()
     {
         return [
            'rule_title' => 'required|max:100',
            'description' => 'required|max:255',
         ];
     }
 
    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
     public function messages()
     {
         return [
             'rule_title.required'  => 'O título é obrigatório',
             'rule_title.max'  => 'O título é ultrapassou 100 caracteres',
             'description.required'  => 'O descrição é obrigatório',
             'description.max'  => 'O descrição é ultrapassou 255 caracteres',
         ];
     }
}
