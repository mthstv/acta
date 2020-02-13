<?php

namespace App\Http\Controllers;

use App\Models\Line;
use Illuminate\Http\Request;
use App\Http\Requests\LetterTextValidation;

class LineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lines = Line::all();
        return response()->json(['data' => $lines]);
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
        return response()->json(['data' => $line]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Line  $line
     * @return \Illuminate\Http\Response
     */
    public function show(Line $line)
    {
        return response()->json(['data' => $line]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Line  $line
     * @return \Illuminate\Http\Response
     */
    public function edit(Line $line)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Line  $line
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Line $line)
    {
        $line->update($request->all());
        return response()->json(['data' => $line]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Line  $line
     * @return \Illuminate\Http\Response
     */
    public function destroy(Line $line)
    {
        $line->delete();
        return response()->json(['success' => trans('api.line.delete')]);
    }
}
