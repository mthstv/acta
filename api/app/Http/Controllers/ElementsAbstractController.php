<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class ElementsAbstractController extends Controller
{
    abstract protected function getModel();

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $request->all();
        if($query && $query['rule_reference']) {
            $elements = ($this->getModel())::where('rule_reference', $query['rule_reference'])->get();
        } else {
            $elements = ($this->getModel())::all();
        }
        return response()->json(['success' => true, 'data' => $elements]);
    }


    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($elementId)
    {
        $element = ($this->getModel())::find($elementId);
        if($element) {
            return response()->json(['success' => true, 'data' => $element]);
        } else {
            return response()->json(['success' => false, 'data' => []], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $elementId)
    {
        $element = ($this->getModel())::find($elementId);
        if($element) {
            $element->update($request->all());
            return response()->json(['success' => true, 'data' => $element, 'message' => trans('api.generic_element.update')]);
        } else {
            return response()->json(['success' => false, 'data' => [], 'message' => trans('api.generic_element.fail.update')], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($elementId)
    {
        $element = ($this->getModel())::find($elementId);
        if($element) {
            $element->delete();
            return response()->json(['success' => true, 'data' => [], 'message' => trans('api.generic_element.delete')]);
        } else {
            return response()->json(['success' => false, 'data' => [], 'message' => trans('api.generic_element.fail.delete')], 404);
        }
    }
}