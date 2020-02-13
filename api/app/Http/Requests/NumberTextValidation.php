<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NumberTextValidation extends FormRequest
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
             'number' => 'required|numeric',
             'text' => 'required|max:100',
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
             'number.required' => 'A numeração é obrigatória',
             'number.numeric' => 'Numeração inválida',
             'text.required'  => 'O texto é obrigatório',
             'text.max'  => 'O texto ultrapassou 100 caracteres',
         ];
     }
}
