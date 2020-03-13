import React from 'react';
import { connectStateResults }from 'react-instantsearch-dom';

const IndexResults = connectStateResults(
    ({ searchState, searchResults, children }) =>
        searchResults && searchResults.nbHits !== 0 ? (
        children
        ) : (
        <div>
            No results have been found for {searchState.query} and index{' '}
            {searchResults ? searchResults.index : ''}
        </div>
        )
    );
    
    export default IndexResults;