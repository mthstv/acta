import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY
);

export default searchClient;