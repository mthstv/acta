<?php

namespace App\Observers;

use App\Models\ChangeRequest;

class ChangeRequestObserver
{
    /**
     * Handle the change request "created" event.
     *
     * @param  \App\ChangeRequest  $changeRequest
     * @return void
     */
    public function created(ChangeRequest $changeRequest)
    {
        //
    }

    /**
     * Handle the change request "updated" event.
     *
     * @param  \App\ChangeRequest  $changeRequest
     * @return void
     */
    public function updated(ChangeRequest $changeRequest)
    {
        //
    }

    /**
     * Handle the change request "deleted" event.
     *
     * @param  \App\ChangeRequest  $changeRequest
     * @return void
     */
    public function deleted(ChangeRequest $changeRequest)
    {
        //
    }

    /**
     * Handle the change request "restored" event.
     *
     * @param  \App\ChangeRequest  $changeRequest
     * @return void
     */
    public function restored(ChangeRequest $changeRequest)
    {
        //
    }

    /**
     * Handle the change request "force deleted" event.
     *
     * @param  \App\ChangeRequest  $changeRequest
     * @return void
     */
    public function forceDeleted(ChangeRequest $changeRequest)
    {
        //
    }
}
