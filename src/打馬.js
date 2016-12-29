import state from'./State';
import * as rule from './rule';

export	function nextPlayer() {
	let index = state.current_player_index;
	index = (index + 1) % state.players.length;
	state.current_player_index = index;
}

export	function _采色(dice3) {
	const table = require('./采色圖.json');

	return table[toKey(dice3)];

	function toKey(dice3) {
		let sorted = dice3.sort();
		return `${sorted[0]}${sorted[1]}${sorted[2]}`;
	}
}
export	function throwDice3() {
	return [
		Math.floor(Math.random() * 6) + 1,
		Math.floor(Math.random() * 6) + 1,
		Math.floor(Math.random() * 6) + 1
	];
}

export	function set本采(采色, player) {
	if (采色.type === '散采' 
		&& !rule.find真本采(采色)
	)
		player.本采 = 采色;
}

export function _賞罰采(采色) {
	let player = state.current_player;
	switch(采色.type) {
		case '賞采':
			
			break;
		case '罰采':
			break;
	}
}

export function _下馬(采色){
	let horse = 0;
	if( _自己真本彩(采色) ) {
		horse = 3;
	}else if( _自己初次真本彩(采色) ) {
		horse = 1;
	}else if( rule.find真本采(采色) ) {
		let player = _別人真本采(采色);
		
	}
}
/**
 * @returns {bool}
 */
function _自己真本彩(采色) {
	let player = state.current_player;
	return player.本采 == 采色;
}
/**
 * @returns {bool}
 */
function _自己初次真本彩(采色) {
	let player = state.current_player;
	return (
		player.未設本采
		&& 采色.type == '散采'
		&& !rule.find真本采(采色)
	);
}

/**
 * @typedef {Object} Player
 * @returns {Player}
 */
function _別人真本采(采色) {
	return state.players.find(x => {
		return (x.本采 === 采色);
	});
}