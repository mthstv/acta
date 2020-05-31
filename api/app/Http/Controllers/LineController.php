<?php

namespace App\Http\Controllers;

use App\Models\Line;
use Illuminate\Http\Request;
use App\Http\Requests\LetterTextValidation;

class LineController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Line::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\LetterTextValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LetterTextValidation $request)
    {
        $data = $request->except(['article', 'paragraph', 'incise']);
        $line = new Line;
        $request->article ? $line->article()->associate($request->article) : null;
        $request->paragraph ? $line->paragraph()->associate($request->paragraph) : null;
        $request->incise ? $line->incise()->associate($request->incise) : null;
        $line->fill($data);
        $line->save();
        return response()->json(['success' => true, 'data' => $line, 'message' => trans('api.generic_element.new')]);
    }
}
