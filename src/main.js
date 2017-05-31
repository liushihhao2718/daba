import * as Rule from './Rule';
import state from './State';
import Flag from './Flag';
import Player from './Player';
import React from 'react';
import ReactDOM from 'react-dom';
import GameMap from './tag/GameMap.jsx';
import {PlayerList} from './tag/Player.jsx';
import randomColor from 'randomColor';


const game_map_tag = document.getElementById('game_map');
const playListRoot = document.getElementById('player-list');
init();

function init(){
	state.players = setPlayer(3);

	state.round = round;
	ReactDOM.render(<GameMap state={state}/>, game_map_tag);
	ReactDOM.render(<PlayerList />, playListRoot);
}
function setPlayer(number) {
	let players = [];
	let colors = randomColor({luminosity: 'light',count: number});
	for (var i = 1; i <= number; i++) {
		const p = new Player(i, colors[i]);
		players.push(p);
	}
	return players;
}

function round() {
	let dice = Rule.throwDice3();
	let 采色 = Rule._采色(dice);
	
	const flag = Flag(采色);
	state.flag = flag;
	console.log(flag);
	console.log(state);
	console.log(采色);

	if( flag['真撞'] || flag['傍撞'])
		handleCollision(flag, 采色);
	else
		handleColor(flag, 采色);

	state.上回采色 = 采色;

	ReactDOM.render(<GameMap state={state}/>, game_map_tag);
	ReactDOM.render(<PlayerList />, playListRoot);
}

function handleCollision(flag, 采色){
	let N;
	if(flag['真撞']) N = 3;
	else if(flag['傍撞']) N = 2;
	state.current_player.giveTo(state.prev_player, N);
	Action(state.prev_player, N, 采色);
	state.current_player_index = state.next_player_index;
}

function handleColor(flag, 采色){
	let player = state.current_player;
	let N = 1;
	switch(采色.type) {
		case '賞色':
			N = Rule._賞采賞帖(采色);
			console.log(`賞 ${player.name} 帖數 ${player.帖數} => ${player.帖數+N}`);
			state.giveTo(state.current_player, N);
			if(!flag['渾花']) state.current_player_index = state.next_player_index;
			Action(player, N, 采色);
			break;
		case '罰色':
			N = 2;
			console.log(`罰 ${player.name} 帖數 ${player.帖數} => ${player.帖數-2}`);
			state.current_player.giveTo(state, N);
			Action(state.next_player, N, 采色);
			state.current_player_index = state.next_player_index;

			break;
		case '散采':
			handleScatters(flag, 采色);
	}
}
function handleScatters(flag, 采色){
	let horse = 1;
	let current_player = state.current_player;
	let action_player = current_player;
	let next_player_index = state.next_player_index;
	if( flag['初次散采'] ) {
		horse = 1;
		current_player.本采 = 采色;
		next_player_index = state.next_player_index;
		action_player = current_player;
	}
	else if( flag['自己真本彩'] ) {
		horse = 3;
		state.giveTo(current_player, 3);
		next_player_index = state.current_player_index;
		action_player = current_player;
	}
	else if( flag['別人真本采'] ) {
		horse = 2;
		current_player.giveTo(flag['別人真本采'], 3);
		next_player_index = state.players.indexOf(flag['別人真本采']);
		action_player = flag['別人真本采'];
	}
	else if( flag['自己傍本采'] ) {
		horse = 2;
		state.giveTo(current_player, 2);
		next_player_index = state.current_player_index;
		action_player = current_player;
	}
	else if( flag['別人傍本采'] ) {
		horse = 2;
		current_player.giveTo(flag['別人傍本采'], 2);
		next_player_index = state.players.indexOf(flag['別人傍本采']);
		action_player = flag['別人傍本采'];
	}
	Action(action_player, horse, 采色);
	state.current_player_index = next_player_index;

}

/**
 * @param {Player} player
 * @param {N} number
 */
function Action(player, N, 采色) {
	if(player.handleHorse > 0)
		_下馬(player, N, 采色);
	else
		_行馬(player, 采色);	
}

function _下馬(action_player, horse, 采色) {
	action_player.馬.handle -= horse;
	let locate = 采色.point;
	let hited = state.players.find(p => p.馬[locate]);

	if(hited)
		_打馬(hited, action_player, horse, locate);
	else
		locateHorse(action_player, horse, locate);
}

function _打馬(hited, action_player, horse_count, locate){
	if(hited === action_player) {
		console.log(action_player.name + ' 疊加' + locate);
		action_player.馬[locate] += horse_count;
	}else if(hited.馬[locate] <= horse_count) {
		console.log(action_player.name + ' 打馬' + locate);
		hited.giveTo(action_player, hited.馬[locate]);

		backToHandle(hited, locate);
		action_player.馬[locate] = horse_count;
	}
}

function backToHandle(player, locate){
	player.馬.handle += player.馬[locate];
	delete player.馬[locate];
}
/**
 * @param {Player} action_player
 * @param {number} horse 下幾疋馬
 * @param {number} locate 放哪一格 1~18
 */
function locateHorse(action_player, horse, locate) {
	if( action_player.馬.handle < horse )
		horse  = action_player.馬.handle;
	
	action_player.馬[locate] = horse;
}

function _行馬(action_player, flag, 采色) {
	let horse = 0;
	let current_player = state.current_player;

	if( flag['自己真本彩'] ) {
		horse = 3;
	}
	else if( flag['別人真本采'] ) {
		horse = 3;
		current_player.giveTo(action_player, 3);
	}
	else if( flag['自己傍本采'] ) horse = 2;
	else if( flag['別人傍本采'] ) {
		horse = 3;
		current_player.giveTo(action_player, 2);
	}
	if( flag['真撞'] ){
		horse = 3;
		current_player.giveTo(state, 3);
	}
	else if(flag['傍撞']){
		horse = 2;
		current_player.giveTo(state, 2);
	}
	else if(采色.type === '散采') {
		horse = 1;
	}
	else {
		horse = Rule._賞罰采(采色);
		state.giveTo(current_player, horse);
	}

	action_player.馬.handle -= horse;
	let locate = 采色.point;
	let hited = state.players.find(p => p.馬[locate]);

	if(hited)
		_打馬(hited, action_player, horse, locate);
	else
		locateHorse(action_player, horse, locate);
}

function go(action_player, from, to){
	
}