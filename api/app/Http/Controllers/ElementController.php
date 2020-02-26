<?php

namespace App\Http\Controllers;

use App\Models\Element;
use Illuminate\Http\Request;
use App\Http\Requests\NumberTextValidation;

class ElementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = Element::all();
        return response()->json(['success' => true, 'data' => $elements]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberTextValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberTextValidation $request)
    {
        $data = $request->all();
        $element = new Element;
        $element->fill($data);
        $element->save();
        return response()->json(['success' => true, 'data' => $element]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Element  $element
     * @return \Illuminate\Http\Response
     */
    public function show(Element $element)
    {
        return response()->json(['success' => true, 'data' => $element]);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function findByLabel(string $label)
    {
        $element = Element::where('label', $label)->first();
        return response()->json(['success' => true, 'data' => $element]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Element  $element
     * @return \Illuminate\Http\Response
     */
    public function edit(Element $element)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Element  $element
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Element $element)
    {
        $element->update($request->all());
        return response()->json(['success' => true, 'data' => $element]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Element  $element
     * @return \Illuminate\Http\Response
     */
    public function destroy(Element $element)
    {
        $element->delete();
        return response()->json(['success' => true, 'data' => trans('api.element.delete')]);
    }
}
