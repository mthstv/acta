<?php

namespace App\Http\Controllers;

use App\Models\SubSection;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class SubSectionController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return SubSection::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberNameValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberNameValidation $request)
    {
        $data = $request->except(['section']);
        $subSection = new SubSection;
        $request->section ? $subSection->section()->associate($request->section) : null;
        $subSection->fill($data);
        $subSection->save();
        return response()->json(['success' => true, 'data' => $subSection]);
    }
}
