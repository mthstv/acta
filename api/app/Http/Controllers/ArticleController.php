<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Requests\NumberTextValidation;

class ArticleController extends ElementsAbstractController
{
    /**
     * Define the Model for abstract Element Controller
     */
    protected function getModel()
    {
        return Article::class;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\NumberTextValidation  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NumberTextValidation $request)
    {
        $data = $request->except(['title','chapter','section','subsection']);
        $article = new Article;
        $request->title ? $article->title()->associate($request->title) : null;
        $request->chapter ? $article->chapter()->associate($request->chapter) : null;
        $request->section ? $article->section()->associate($request->section) : null;
        $request->subsection ? $article->subsection()->associate($request->subsection) : null;
        $article->fill($data);
        $article->save();
        return response()->json(['success' => true, 'data' => $article]);
    }
}
