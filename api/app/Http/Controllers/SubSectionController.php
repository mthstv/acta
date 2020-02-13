<?php

namespace App\Http\Controllers;

use App\Models\SubSection;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class SubSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subSections = SubSection::all();
        return response()->json(['data' => $subSections]);
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
        $data = $request->except(['section']);
        $subSection = new SubSection;
        $request->section ? $subSection->section()->associate($request->section) : null;
        $subSection->fill($data);
        $subSection->save();
        return response()->json(['data' => $subSection]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SubSection  $subSection
     * @return \Illuminate\Http\Response
     */
    public function show(SubSection $subSection)
    {
        return response()->json(['data' => $subSection]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\SubSection  $subSection
     * @return \Illuminate\Http\Response
     */
    public function edit(SubSection $subSection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SubSection  $subSection
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SubSection $subSection)
    {
        $subSection->update($request->all());
        return response()->json(['data' => $subSection]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SubSection  $subSection
     * @return \Illuminate\Http\Response
     */
    public function destroy(SubSection $subSection)
    {
        $subSection->delete();
        return response()->json(['success' => trans('api.subSection.delete')]);
    }
}
