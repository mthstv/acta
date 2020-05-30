<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangeRequestValidation extends FormRequest
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
            'consultant' => 'numeric',
            'element_name' => 'required|max:20',
            'element_id' => 'required|numeric',
            'old_text' => 'required',
            'new_text' => 'required',
            'admin' => 'numeric'
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
            'consultant.numeric' => 'O Consultor deve ser um campo numérico.',
            'element_name.required' => 'O nome do elemento é obrigatório.',
            'element_name.max' => 'Máximo de caractéres excedido para o nome do elemento.',
            'element_id.required' => 'O id do elemento é um campo obrigatório.',
            'element_id.numeric' => 'O id do elemento deve ser um campo inteiro.',
            'old_text.required' => 'O campo de texto antigo é um campo obrigatório.',
            'new_text.required' => 'O campo de texto novo é um campo obrigatório.',
            'admin.numeric' => 'O Admin deve ser um campo numérico.'
        ];
    }
}
