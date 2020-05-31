<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Requests\NumberNameValidation;

class BookController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Book::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberNameValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberNameValidation $request)
    {
        $data = $request->except(['rule', 'part']);
        $book = new Book;
        $request->rule ? $book->rule()->associate($request->rule) : null;
        $request->part ? $book->part()->associate($request->part) : null;
        $book->fill($data);
        $book->save();
        return response()->json(['success' => true, 'data' => $book, 'message' => trans('api.generic_element.new')]);
    }
}
