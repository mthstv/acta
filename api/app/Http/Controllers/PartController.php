<?php

namespace App\Http\Controllers;

use App\Models\Part;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class PartController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Part::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberNameValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberNameValidation $request)
    {
        $data = $request->except(['rule']);
        $part = new Part;
        $part->rule()->associate($request->rule);
        $part->fill($data);
        $part->save();
        return response()->json(['success' => true, 'data' => $part]);
    }
}
