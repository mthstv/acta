<?php

namespace App\Http\Controllers;

use App\Models\Incise;
use Illuminate\Http\Request;
use App\Http\Requests\NumberTextValidation;

class InciseController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Incise::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberTextValidation   $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberTextValidation $request)
    {
        $data = $request->except(['article', 'paragraph']);
        $incise = new Incise;
        $request->article ? $incise->article()->associate($request->article) : null;
        $request->paragraph ? $incise->paragraph()->associate($request->paragraph) : null;
        $incise->fill($data);
        $incise->save();
        return response()->json(['success' => true, 'data' => $incise]);
    }
}
