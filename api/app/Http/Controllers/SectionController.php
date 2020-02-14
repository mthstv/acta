<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sections = Section::all();
        return response()->json(['success' => true, 'data' => $sections]);
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
        $data = $request->except(['chapter']);
        $section = new Section;
        $request->chapter ? $section->chapter()->associate($request->chapter) : null;
        $section->fill($data);
        $section->save();
        return response()->json(['success' => true, 'data' => $section]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function show(Section $section)
    {
        return response()->json(['success' => true, 'data' => $section]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function edit(Section $section)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Section $section)
    {
        $section->update($request->all());
        return response()->json(['success' => true, 'data' => $section]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function destroy(Section $section)
    {
        $section->delete();
        return response()->json(['success' => true, 'data' => trans('api.section.delete')]);
    }
}
