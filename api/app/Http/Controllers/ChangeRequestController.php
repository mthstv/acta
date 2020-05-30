<?php

namespace App\Http\Controllers;

use App\Models\ChangeRequest;
use Illuminate\Http\Request;
use App\Http\Requests\ChangeRequestValidation;
use Tymon\JWTAuth\Facades\JWTAuth;

class ChangeRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $changeRequests = ChangeRequest::all();
        return response()->json(['success' => true, 'data' => $changeRequests]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ChangeRequestValidation $request)
    {
        $data = $request->except(['consultant', 'admin']);
        $changeRequest = new ChangeRequest;
        $changeRequest->consultant()->associate($request->consultant ? $request->consultant : JWTAuth::user()->id);
        $request->admin ? $changeRequest->admin()->associate($request->admin) : null;
        $changeRequest->fill($data);
        $changeRequest->save();
        return response()->json(['success' => true, 'data' => $changeRequest]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ChangeRequest  $changeRequest
     * @return \Illuminate\Http\Response
     */
    public function show(ChangeRequest $changeRequest)
    {
        return response()->json(['success' => true, 'data' => $changeRequest]);
    }

    /**
     * Review a change request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ChangeRequest  $changeRequest
     * @return \Illuminate\Http\Response
     */
    public function review(Request $request, ChangeRequest $changeRequest)
    {
        dd($changeRequest);
        $data = $request->except(['admin']);
        $data['reviewed_at'] = date("Y-m-d H:i:s");
        $changeRequest->admin()->associate($request->admin ? $request->admin : JWTAuth::user()->id);
        $changeRequest->update($data);
        return response()->json(['success' => true, 'data' => $changeRequest]);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ChangeRequest  $changeRequest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ChangeRequest $changeRequest)
    {
        dd($changeRequest);
        $changeRequest->update($request->all());
        return response()->json(['success' => true, 'data' => $changeRequest]);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ChangeRequest  $changeRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy(ChangeRequest $changeRequest)
    {
        $changeRequest->delete();
        return response()->json(['success' => true, 'data' => trans('api.change_request.delete')]);
    }
}
