<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class ChapterController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Chapter::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberNameValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberNameValidation $request)
    {
        $data = $request->except(['title']);
        $chapter = new Chapter;
        $request->title ? $chapter->title()->associate($request->title) : null;
        $chapter->fill($data);
        $chapter->save();
        return response()->json(['success' => true, 'data' => $chapter, 'message' => trans('api.generic_element.new')]);
    }
}
