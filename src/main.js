import * as 打馬 from './打馬';
import state from './State';
import * as Rule from './rule';
let 獎金 = 100;


function init(){
	state.players = setPlayer(3);
	document.body.addEventListener('click', ()=>{
		round({
			type:'round',
		});
	});
}
function setPlayer(number) {
	const Player = require('./Player.js');

	let players = [];
	for (var i = 1; i <= number; i++) {
		const p = new Player(`player-${i}`);
		players.push(p);
	}
	return players;
}

function round(action) {
	switch(action.type){
		case 'round':
			diceAction();
			break;
		case 'penalty':
			horseAction();
			break;
	}
}


function diceAction(){
	let dice = 打馬.throwDice3();
	let result = 打馬._采色(dice);
	let player = state.current_player;
	
	if( Rule._初次散采(采色) ) {
		打馬.set本采(result,player);
	}
	else if( Rule._自己真本彩(采色) ) {
	}else if( Rule.find真本采(采色) ) {
		let player = Rule._別人真本采(采色);
		
	}
	state.上回采色 = result;
	打馬.nextPlayer();
}

function horseAction(){

}
init();
