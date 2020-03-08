<?php

namespace App\Repositories;

use App\Models\Rule;
use App\Repositories\Contracts\RuleRepositoryInterface;

/**
 * @method Rule[] queryToPaginate()
 */
class RuleRepository extends AbstractRepository implements RuleRepositoryInterface
{
    public function __construct(Rule $model)
    {
        $this->model = $model;
    }
}