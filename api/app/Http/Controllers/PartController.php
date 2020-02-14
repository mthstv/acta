<?php

namespace App\Http\Controllers;

use App\Models\Part;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parts = Part::all();
        return response()->json(['success' => true, 'data' => $parts]);
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Part  $part
     * @return \Illuminate\Http\Response
     */
    public function show(Part $part)
    {
        return response()->json(['success' => true, 'data' => $part]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Part  $part
     * @return \Illuminate\Http\Response
     */
    public function edit(Part $part)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Part  $part
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Part $part)
    {
        $part->update($request->all());
        return response()->json(['success' => true, 'data' => $part]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Part  $part
     * @return \Illuminate\Http\Response
     */
    public function destroy(Part $part)
    {
        $part->delete();
        return response()->json(['success' => true, 'data' => trans('api.part.delete')]);
    }
}
