<?php

namespace App\Http\Controllers;

use App\Models\Incise;
use Illuminate\Http\Request;
use App\Http\Requests\NumberTextValidation;

class InciseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $incises = Incise::all();
        return response()->json(['success' => true, 'data' => $incises]);
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Incise  $incise
     * @return \Illuminate\Http\Response
     */
    public function show(Incise $incise)
    {
        return response()->json(['success' => true, 'data' => $incise]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Incise  $incise
     * @return \Illuminate\Http\Response
     */
    public function edit(Incise $incise)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Incise  $incise
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Incise $incise)
    {
        $incise->update($request->all());
        return response()->json(['success' => true, 'data' => $incise]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Incise  $incise
     * @return \Illuminate\Http\Response
     */
    public function destroy(Incise $incise)
    {
        $incise->delete();
        return response()->json(['success' => true, 'data' => trans('api.incise.delete')]);
    }
}
