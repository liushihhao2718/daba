/** @module 打馬 */

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
	let N = 0;
	switch(采色.type) {
		case '賞采':
			N = _賞采賞帖;
			break;
		case '罰采':
			N = 2;
			player.帖數 -= 2;
			break;
	}
	return N;
}

function _賞采賞帖( 采色 ){
	let N = 0;
	switch(采色.name) {
		case '堂印':
			N = 8;
			break;
		case '碧油':
			N = 6;
			break;
		case '桃花重五':
			N = 5;
			break;
		case '拍板兒':
		case '鴈行兒':
		case '滿盆星':
			N = 4;
			break;
		default:
			N = 2;
	}

	return N;
}
