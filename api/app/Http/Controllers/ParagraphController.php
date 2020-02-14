<?php

namespace App\Http\Controllers;

use App\Models\Paragraph;
use Illuminate\Http\Request;
use App\Http\Requests\NumberTextValidation;

class ParagraphController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $paragraphs = Paragraph::all();
        return response()->json(['success' => true, 'data' => $paragraphs]);
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
        $data = $request->except(['article']);
        $paragraph = new Paragraph;
        $request->article ? $paragraph->article()->associate($request->article) : null;
        $paragraph->fill($data);
        $paragraph->save();
        return response()->json(['success' => true, 'data' => $paragraph]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Paragraph  $paragraph
     * @return \Illuminate\Http\Response
     */
    public function show(Paragraph $paragraph)
    {
        return response()->json(['success' => true, 'data' => $paragraph]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Paragraph  $paragraph
     * @return \Illuminate\Http\Response
     */
    public function edit(Paragraph $paragraph)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Paragraph  $paragraph
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Paragraph $paragraph)
    {
        $paragraph->update($request->all());
        return response()->json(['success' => true, 'data' => $paragraph]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Paragraph  $paragraph
     * @return \Illuminate\Http\Response
     */
    public function destroy(Paragraph $paragraph)
    {
        $paragraph->delete();
        return response()->json(['success' => true, 'data' => trans('api.paragraph.delete')]);
    }
}
