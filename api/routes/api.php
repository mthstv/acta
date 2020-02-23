<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt.auth','api-header']], function () {
  
    // all routes to protected resources are registered here  
    Route::get('users/list', function(){
        $users = App\Models\User::all();
        
        $response = ['success'=>true, 'data'=>$users];
        return response()->json($response, 200);
    });
});

Route::group(['middleware' => 'api-header'], function () {
  
    // The registration and login requests doesn't come with tokens 
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them

    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
    Route::get('user/by-token', 'UserController@getUserByToken');
    /**
     * /rule        => 'GET'    @ index()
     * /rule        => 'POST'   @ store()
     * /rule/{id}   => 'GET'    @ show()
     * /rule/{id}   => 'PATCH'  @ update()
     * /rule/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('rule', 'RuleController');

    /**
     * /part        => 'GET'    @ index()
     * /part        => 'POST'   @ store()
     * /part/{id}   => 'GET'    @ show()
     * /part/{id}   => 'PATCH'  @ update()
     * /part/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('part', 'PartController');

    /**
     * /book        => 'GET'    @ index()
     * /book        => 'POST'   @ store()
     * /book/{id}   => 'GET'    @ show()
     * /book/{id}   => 'PATCH'  @ update()
     * /book/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('book', 'BookController');

    /**
     * /title        => 'GET'    @ index()
     * /title        => 'POST'   @ store()
     * /title/{id}   => 'GET'    @ show()
     * /title/{id}   => 'PATCH'  @ update()
     * /title/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('title', 'TitleController');

    /**
     * /chapter        => 'GET'    @ index()
     * /chapter        => 'POST'   @ store()
     * /chapter/{id}   => 'GET'    @ show()
     * /chapter/{id}   => 'PATCH'  @ update()
     * /chapter/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('chapter', 'ChapterController');

    /**
     * /section        => 'GET'    @ index()
     * /section        => 'POST'   @ store()
     * /section/{id}   => 'GET'    @ show()
     * /section/{id}   => 'PATCH'  @ update()
     * /section/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('section', 'SectionController');

    /**
     * /subsection        => 'GET'    @ index()
     * /subsection        => 'POST'   @ store()
     * /subsection/{id}   => 'GET'    @ show()
     * /subsection/{id}   => 'PATCH'  @ update()
     * /subsection/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('subsection', 'SubSectionController');

    /**
     * /article        => 'GET'    @ index()
     * /article        => 'POST'   @ store()
     * /article/{id}   => 'GET'    @ show()
     * /article/{id}   => 'PATCH'  @ update()
     * /article/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('article', 'ArticleController');

    /**
     * /paragraph        => 'GET'    @ index()
     * /paragraph        => 'POST'   @ store()
     * /paragraph/{id}   => 'GET'    @ show()
     * /paragraph/{id}   => 'PATCH'  @ update()
     * /paragraph/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('paragraph', 'ParagraphController');

    /**
     * /incise        => 'GET'    @ index()
     * /incise        => 'POST'   @ store()
     * /incise/{id}   => 'GET'    @ show()
     * /incise/{id}   => 'PATCH'  @ update()
     * /incise/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('incise', 'InciseController');

    /**
     * /line        => 'GET'    @ index()
     * /line        => 'POST'   @ store()
     * /line/{id}   => 'GET'    @ show()
     * /line/{id}   => 'PATCH'  @ update()
     * /line/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('line', 'LineController');

    /**
     * /item        => 'GET'    @ index()
     * /item        => 'POST'   @ store()
     * /item/{id}   => 'GET'    @ show()
     * /item/{id}   => 'PATCH'  @ update()
     * /item/{id}   => 'DELETE' @ destroy()
     *
     */
    Route::resource('item', 'ItemController');
});