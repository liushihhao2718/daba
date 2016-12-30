import React from 'react';
import { readFileSync } from 'fs';
import state from './State';

const text = readFileSync(__dirname + '/game_map.txt', 'utf8');

export default function GameMap() {
	let game_map = processGameMap( state );
	return (
		<div dangerouslySetInnerHTML={{__html: game_map}} />
	);
}

function processGameMap(state) {
	let game_map = new String(text);
	state.players.forEach( p => {
		game_map = replaceWithPlayer(p, game_map);
	});

	return game_map.toString();
}
/**
 * @param {String} game_map
 */
function replaceWithPlayer(player, game_map) {
	
	for(let h in player.馬) {
		if(h === 'handle') continue;

		let locate = parseInt(h);
		if(locate < 10) h = '$' + h;

		let tag = `<span style="background-color:${player.color};">${player.馬[locate]}</span>`;
		game_map = game_map.replace(h, tag);
	}
	
	return game_map;
}