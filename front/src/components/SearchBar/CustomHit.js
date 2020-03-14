import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import MenuItem from "@material-ui/core/MenuItem";
import { handleTranslateBackToUrl } from '../../helpers';

const Hits = (props) => {

  const handleSearchRedirect = async (rule, label, id) => {
    const newLabel = handleTranslateBackToUrl(label)
    if (props.history.location.pathname.includes('regra')) {
      await props.history.push(`/regra`)
      await props.history.push(`/regra/${rule}/busca/${newLabel}/${id}`)
    } else {
      await props.history.push(`/regra/${rule}/busca/${newLabel}/${id}`)
    }
  }
  return (
    <div>
    {props.hits.map(hit => (
      <div key={hit.id}>
        <MenuItem key={hit.id} onClick={() => handleSearchRedirect(hit.rule_reference, hit.label, hit.id)}>
          {hit.name && <div key={hit.id}>{hit.name}</div>}
          {hit.rule_title && <div key={hit.id}>{hit.rule_title}</div>}
          {hit.text && <div key={hit.id}>{hit.text}</div>}
        </MenuItem>
      </div>
    ))}
    </div>
  );
}


const CustomHit = connectHits(Hits);

export default CustomHit;