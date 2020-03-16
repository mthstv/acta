import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import MenuItem from "@material-ui/core/MenuItem";
import { handleTranslateBackToUrl, elementToString } from '../../helpers';
import FormHelperText from '@material-ui/core/FormHelperText';

const Hits = (props) => {
  const handleSearchRedirect = async (rule, label, id) => {
    props.handleClose()
    const newLabel = handleTranslateBackToUrl(label)
    if (props.history.location.pathname.includes('regra')) {
      await props.history.push(`/regra`)

      if (rule) {
        await props.history.push(`/regra/${rule}/busca/${newLabel}/${id}`)
      } else {
        await props.history.push(`/regra/${id}`)
      }

    } else {
      if (rule) {
        await props.history.push(`/regra/${rule}/busca/${newLabel}/${id}`)
      } else {
        await props.history.push(`/regra/${id}`)
      }
    }
  }

  return (
    <div>
    {props.hits.map(hit => (
      <div key={hit.id}>
        <MenuItem key={hit.id} onClick={() => handleSearchRedirect(hit.rule_reference, hit.label, hit.id)}>
          {hit.rule_title && 
            <div key={hit.id}>
              {hit.rule_title}
              <FormHelperText>
                {props.ruleData.map(rule => parseInt(hit.rule_reference) === parseInt(rule.id) ? rule.rule_title : null)}
              </FormHelperText>
            </div>
          }
          {hit.name && 
            <div key={hit.id}>
              {elementToString(hit.label, hit)}
              <FormHelperText>
                {props.ruleData.map(rule => parseInt(hit.rule_reference) === parseInt(rule.id) ? rule.rule_title : null)}
              </FormHelperText>
            </div>
          }
          {hit.text && 
            <div key={hit.id}>
              {elementToString(hit.label, hit)}
              <FormHelperText>
                {props.ruleData.map(rule => parseInt(hit.rule_reference) === parseInt(rule.id) ? rule.rule_title : null)}
              </FormHelperText>
            </div>
          }
        </MenuItem>
      </div>
    ))}
    </div>
  );
}


const CustomHit = connectHits(Hits);

export default CustomHit;