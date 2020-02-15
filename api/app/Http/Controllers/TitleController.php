<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class TitleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $titles = Title::all();
        return response()->json(['success' => true, 'data' => $titles]);
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
        $data = $request->except(['rule', 'book']);
        $title = new Title;
        $request->rule ? $title->rule()->associate($request->rule) : null;
        $request->book ? $title->book()->associate($request->book) : null;
        $request->part ? $title->part()->associate($request->part) : null;
        $title->fill($data);
        $title->save();
        return response()->json(['success' => true, 'data' => $title]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Title  $title
     * @return \Illuminate\Http\Response
     */
    public function show(Title $title)
    {
        return response()->json(['success' => true, 'data' => $title]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Title  $title
     * @return \Illuminate\Http\Response
     */
    public function edit(Title $title)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Title  $title
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Title $title)
    {
        $title->update($request->all());
        return response()->json(['success' => true, 'data' => $title]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Title  $title
     * @return \Illuminate\Http\Response
     */
    public function destroy(Title $title)
    {
        $title->delete();
        return response()->json(['success' => true, 'data' => trans('api.title.delete')]);
    }
}
