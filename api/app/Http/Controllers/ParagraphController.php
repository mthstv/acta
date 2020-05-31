<?php

namespace App\Http\Controllers;

use App\Models\Paragraph;
use Illuminate\Http\Request;
use App\Http\Requests\NumberTextValidation;

class ParagraphController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Paragraph::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberTextValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberTextValidation $request)
    {
        $data = $request->except(['article']);
        $paragraph = new Paragraph;
        $request->article ? $paragraph->article()->associate($request->article) : null;
        $paragraph->fill($data);
        $paragraph->save();
        return response()->json(['success' => true, 'data' => $paragraph, 'message' => trans('api.generic_element.new')]);
    }
}
