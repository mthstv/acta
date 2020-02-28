<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class TitleController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Title::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberNameValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberNameValidation $request)
    {
        $data = $request->except(['rule', 'book', 'part']);
        $title = new Title;
        $request->rule ? $title->rule()->associate($request->rule) : null;
        $request->book ? $title->book()->associate($request->book) : null;
        $request->part ? $title->part()->associate($request->part) : null;
        $title->fill($data);
        $title->save();
        return response()->json(['data' => $title]);
    }
}
