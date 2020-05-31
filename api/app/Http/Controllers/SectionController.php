<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class SectionController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Section::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberNameValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberNameValidation $request)
    {
        $data = $request->except(['chapter']);
        $section = new Section;
        $request->chapter ? $section->chapter()->associate($request->chapter) : null;
        $section->fill($data);
        $section->save();
        return response()->json(['success' => true, 'data' => $section, 'message' => trans('api.generic_element.new')]);
    }
}
