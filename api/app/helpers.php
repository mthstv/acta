<?php

function element_label_to_object(string $elementLabel, int $elementId) {
    switch($elementLabel) {
        case 'article':
            return App\Models\Article::where('id', $elementId)->first();
    }
}