<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Requests\NumberTextValidation;

class ItemController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Item::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberTextValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberTextValidation $request)
    {
        $data = $request->except(['line']);
        $item = new Item;
        $request->line ? $item->line()->associate($request->line) : null;
        $item->fill($data);
        $item->save();
        return response()->json(['success' => true, 'data' => $item, 'message' => trans('api.generic_element.new')]);
    }
}
