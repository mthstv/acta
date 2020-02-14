<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Requests\NumberTextValidation;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::all();
        return response()->json(['success' => true, 'data' => $articles]);
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
        $data = $request->except(['title','chapter','section','sub_section']);
        $article = new Article;
        $request->title ? $article->title()->associate($request->title) : null;
        $request->chapter ? $article->chapter()->associate($request->chapter) : null;
        $request->section ? $article->section()->associate($request->section) : null;
        $request->sub_section ? $article->sub_section()->associate($request->sub_section) : null;
        $article->fill($data);
        $article->save();
        return response()->json(['success' => true, 'data' => $article]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        return response()->json(['success' => true, 'data' => $article]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        $article->update($request->all());
        return response()->json(['success' => true, 'data' => $article]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['success' => true, 'data' => trans('api.article.delete')]);
    }
}
