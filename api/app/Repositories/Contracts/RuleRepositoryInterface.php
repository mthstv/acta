<?php

namespace App\Repositories\Contracts;

interface RuleRepositoryInterface
{
    public function queryToPaginate(array $params);

    public function searchQuery(string $query, bool $agregate = false);
}