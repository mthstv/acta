<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Log;

abstract class AbstractRepository
{
    /**
     * @var Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * Query for filters
     */
    public function queryToPaginate(array $params)
    {
        try {
            unset($params['page']);

            $query = $this->model;

            if (isset($params['sort'])) {
                if (isset($params['direction'])) {
                    $query = $query->orderBy($params['sort'], $params['direction']);                    
                } else {
                    $query = $query->orderBy($params['sort']);
                }
            }

            unset($params['sort'], $params['direction']);

            if (!empty($params)) {
                foreach ($params as $field => $value) {
                    $query = $query->where($field, 'like', '%'.$value.'%');
                }                
            }
            
            return $query->paginate();
        } catch (\PDOException $e) {
            Log::error($e->getMessage());

            return [];
        }
    }

    /**
     * Search for a query
     */
    public function searchQuery(string $searchData, bool $agregate = false)
    {

        $result = [];
        $ruleResult = \DB::table('rules')->where('rule_title', 'like', '%' . $searchData . '%')
          ->orWhere('description', 'like', '%' . $searchData . '%')
          ->orWhere('preamble', 'like', '%' . $searchData . '%')
          ->get();
        if(count($ruleResult) > 0) {
          foreach ($ruleResult as $value) {
            $value->label = 'rule';
            $agregate ? '' : $result[] = $value;
            
          }
          $agregate ? $result[]['rule'] = $ruleResult : '';
        }
        
        $partResult = \DB::table('parts')->where('name', 'like', '%' . $searchData . '%')->get();
        if(count($partResult) > 0) {
          foreach ($partResult as $value) {
            $value->label = 'part';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['part'] = $partResult : '';
        }

        $bookResult = \DB::table('books')->where('name', 'like', '%' . $searchData . '%')->get();
        if(count($bookResult) > 0) {
          foreach ($bookResult as $value) {
            $value->label = 'book';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['book'] = $bookResult : '';
        }

        $titleResult = \DB::table('titles')->where('name', 'like', '%' . $searchData . '%')->get();
        if(count($titleResult) > 0) {
          foreach ($titleResult as $value) {
            $value->label = 'title';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['title'] = $titleResult : '';
        }

        $chapterResult = \DB::table('chapters')->where('name', 'like', '%' . $searchData . '%')->get();
        if(count($chapterResult) > 0) {
          foreach ($chapterResult as $value) {
            $value->label = 'chapter';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['chapter'] = $chapterResult : '';
        }

        $sectionResult = \DB::table('sections')->where('name', 'like', '%' . $searchData . '%')->get();
        if(count($sectionResult) > 0) {
          foreach ($sectionResult as $value) {
            $value->label = 'section';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['section'] = $sectionResult : '';
        }

        $subsectionResult = \DB::table('subsections')->where('name', 'like', '%' . $searchData . '%')->get();
        if(count($subsectionResult) > 0) {
          foreach ($subsectionResult as $value) {
            $value->label = 'subsection';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['subsection'] = $subsectionResult : '';
        }

        $articleResult = \DB::table('articles')->where('text', 'like', '%' . $searchData . '%')->get();
        if(count($articleResult) > 0) {
          foreach ($articleResult as $value) {
            $value->label = 'article';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['article'] = $articleResult : '';
        }

        $paragraphResult = \DB::table('paragraphs')->where('text', 'like', '%' . $searchData . '%')->get();
        if(count($paragraphResult) > 0) {
          foreach ($paragraphResult as $value) {
            $value->label = 'paragraph';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['paragraph'] = $paragraphResult : '';
        }

        $inciseResult = \DB::table('incises')->where('text', 'like', '%' . $searchData . '%')->get();
        if(count($inciseResult) > 0) {
          foreach ($inciseResult as $value) {
            $value->label = 'incise';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['incise'] = $paragraphResult : '';
        }
        
        $lineResult = \DB::table('lines')->where('text', 'like', '%' . $searchData . '%')->get();
        if(count($lineResult) > 0) {
          foreach ($lineResult as $value) {
            $value->label = 'line';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['line'] = $paragraphResult : '';
        }

        $itemResult = \DB::table('items')->where('text', 'like', '%' . $searchData . '%')->get();
        if(count($itemResult) > 0) {
          foreach ($itemResult as $value) {
            $value->label = 'item';
            $agregate ? '' : $result[] = $value;
          }
          $agregate ? $result[]['item'] = $itemResult : '';
        }

        return $result;
    }
}