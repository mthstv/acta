import React from 'react';

export const RuleHit = (props) => (
	<div>
			{props.hit.rule_title}
			<p>{props.hit.description}</p>
	</div>
);

export const NameHit = (props) => (props.hit.name !== '' && <div> {props.hit.name} </div>);

export const TextHit = (props) => (props.hit.text !== '' && <div> {props.hit.text} </div>);