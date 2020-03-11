import React from 'react';

export const RuleHit = (props) => {
    return (
        <div>
            <p>{props.hit.rule_title}</p>
            <p>{props.hit.description}</p>
        </div>
    );
    
}
