<?php

namespace App\Http\Controllers;

use App\Models\ChangeRequest;
use Illuminate\Http\Request;
use App\Http\Requests\ChangeRequestValidation;
use Tymon\JWTAuth\Facades\JWTAuth;

class ChangeRequestController extends Controller
{
    private $queryOrder = "CASE WHEN status = 'PENDING' THEN 1 WHEN status = 'ACCEPTED' THEN 2 ELSE 3 END";
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = JWTAuth::user();
        if($user->is_admin) {
            $changeRequests = ChangeRequest::orderByRaw($this->queryOrder)->get();
        } else {
            $changeRequests = ChangeRequest::where('consultant_id', $user->id)->orderByRaw($this->queryOrder)->get();
        }
        return response()->json(['success' => true, 'data' => $changeRequests]);
    }

    /**
     * Display already reviewed requests of authenticated admin.
     *
     * @return \Illuminate\Http\Response
     */
    public function adminReviewedRequests()
    {
        $admin = JWTAuth::user();
        if(!$admin->is_admin) {
            return response()->json(['success' => false, 'data' => [], 'message' => trans('api.change_requests.fail.reviewed_list')]);
        }
        $changeRequests = ChangeRequest::where('admin_id', $admin->id)->orderByRaw($this->queryOrder)->get();
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

        return response()->json(['success' => true, 'data' => $changeRequest, 'message' => trans('api.change_request.new')]);
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
        // check if status is equal to pending, accepted or rejected
        if($request->status !== 'PENDING' && $request->status !== 'REJECTED' && $request->status !== 'ACCEPTED') {
            return response()->json(['success' => false, 'data' => [], 'message' => trans('api.change_request.fail.review_status')]);
        }

        if($changeRequest->status != 'PENDING') {
            return response()->json(['success' => false, 'data' => [], 'message' => trans('api.change_request.fail.review')]);
        }

        $data = $request->except(['admin']);
        $data['reviewed_at'] = date("Y-m-d H:i:s");
        $changeRequest->admin()->associate($request->admin ? $request->admin : JWTAuth::user()->id);
        $changeRequest->update($data);

        if($changeRequest->status === 'ACCEPTED') {
            $element = element_label_to_object($changeRequest->element_name, $changeRequest->element_id);

            if(isset($element->name)) {
                $element->update(['name' => $changeRequest->new_text]);
            } else {
                $element->update(['text' => $changeRequest->new_text]);
            }
        }
        return response()->json(['success' => true, 'data' => $changeRequest, 'message' => trans('api.change_request.review')]);
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
        if($changeRequest->status != 'PENDING') {
            return response()->json(['success' => false, 'data' => [], 'message' => trans('api.change_request.fail.update')]);
        }

        $changeRequest->update($request->all());
        return response()->json(['success' => true, 'data' => $changeRequest, 'message' => trans('api.change_request.update')]);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ChangeRequest  $changeRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy(ChangeRequest $changeRequest)
    {
        if($changeRequest->status != 'PENDING') {
            return response()->json(['success' => false, 'data' => [], 'message' => trans('api.change_request.fail.delete')]);
        }

        $changeRequest->delete();
        return response()->json(['success' => true, 'data' => [], 'message' => trans('api.change_request.delete')]);
    }
}
