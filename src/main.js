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
const dice_btn = document.getElementById('dice');
const playListRoot = document.getElementById('player-list');
init();

function init(){
	state.players = setPlayer(3);
	dice_btn.addEventListener('click', ()=>{
		round();
	});
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
	console.log(flag);
	/** @type {Player} */
	let player = actionPlayer(flag);

	if(player.handleHorse > 0)
		_下馬(player, flag, 采色);
	else _行馬();


	state.上回采色 = 采色;
	Rule.nextPlayer();

	ReactDOM.render(<GameMap state={state}/>, game_map_tag);
	ReactDOM.render(<PlayerList />, playListRoot);
	console.log(state);
	console.log(采色.name);
}
/**
 * @param {flag} flag
 */
function actionPlayer(flag){
	
	if( flag['罰色'] )
		return state.next_player;
	if(flag['別人真本采'])
		return flag['別人真本采'];

	if( flag['別人傍本采'] )
		return flag['別人傍本采'];

	if( flag['真撞'] || flag['傍撞'])
		return state.prev_player;
	
	return state.current_player;
}

function _下馬(action_player, flag, 采色) {
	let horse = 0;
	let current_player = state.current_player;

	if( flag['初次散采'] ) {
		horse = 1;
		current_player.本采 = 采色;
	}
	else if( flag['自己真本彩'] ) horse = 3;
	else if( flag['別人真本采'] ) {
		horse = 3;
		current_player.giveTo(actionPlayer, 3);
	}
	else if( flag['自己傍本采'] ) horse = 2;
	else if( flag['別人傍本采'] ) {
		horse = 3;
		current_player.giveTo(actionPlayer, 2);
	}
	if( flag['真撞'] ){
		horse = 3;
		current_player.giveTo(state, 3);
	}
	else if(flag['傍撞']){
		horse = 2;
		current_player.giveTo(state, 2);
	}
	else {
		let horse = Rule._賞罰采(采色);
		state.giveTo(current_player, horse);
	}


	

	locateHorse(action_player, horse, 采色.point);
}
/**
 * @param {Player} actionPlayer
 * @param {number} horse 下幾疋馬
 * @param {number} locate 放哪一格 1~18
 */
function locateHorse(actionPlayer, horse, locate) {
	if( actionPlayer.馬.handle < horse )
		horse  = actionPlayer.馬.handle;
	
	actionPlayer.馬.handle -= horse;
	actionPlayer.馬[locate] = horse;
}

function _行馬() {}