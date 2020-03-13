import React from 'react';
import { connectStateResults, Index} from 'react-instantsearch-dom';

const AllResults = connectStateResults(({ allSearchResults, children }) => {
  const hasResults =
    allSearchResults &&
    allSearchResults.nbHits > 0;
    // Object.values(allSearchResults).some(results => results.nbHits > 0);
  return !hasResults ? (
      <div>
      <div>No results in category, products or brand</div>
      <Index indexName="rules" />
      <Index indexName="parts" />
      <Index indexName="books" />
      <Index indexName="titles" />
      <Index indexName="chapters" />
      <Index indexName="sections" />
      <Index indexName="subsections" />
      <Index indexName="articles" />
      <Index indexName="paragraphs" />
      <Index indexName="incises" />
      <Index indexName="lines" />
      <Index indexName="items" />
      </div>
  ) : (
      children
  );
});

export default AllResults;