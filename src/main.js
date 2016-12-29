import * as 打馬 from './打馬';
import state from'./State';

let 獎金 = 100;


function init(){
	state.players = setPlayer(3);
	document.body.addEventListener('click', ()=>{
		round();
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

function round() {
	let dice = 打馬.throwDice3();
	let result = 打馬._采色(dice);
	let player = state.current_player;
	try{
		打馬._下馬();

		if (player.未設本采) 打馬.set本采(result,player);

		state.上回采色 = result;
		打馬.nextPlayer();
	}
	catch(index){
		
	}
	
	console.log(result);
	console.log(state);
}

init();
