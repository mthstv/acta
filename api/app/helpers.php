<?php

function element_label_to_object(string $elementLabel, int $elementId) {
    switch($elementLabel) {
        case 'part':
            return App\Models\Part::where('id', $elementId)->first();
        case 'book':
            return App\Models\Book::where('id', $elementId)->first();
        case 'title':
            return App\Models\Title::where('id', $elementId)->first();
        case 'chapter':
            return App\Models\Chapter::where('id', $elementId)->first();
        case 'section':
            return App\Models\Section::where('id', $elementId)->first();
        case 'subsection':
            return App\Models\Subsection::where('id', $elementId)->first();
        case 'article':
            return App\Models\Article::where('id', $elementId)->first();
        case 'paragraph':
            return App\Models\Paragraph::where('id', $elementId)->first();
        case 'incise':
            return App\Models\Incise::where('id', $elementId)->first();
        case 'line':
            return App\Models\Line::where('id', $elementId)->first();
        case 'item':
            return App\Models\Item::where('id', $elementId)->first();
    }
}