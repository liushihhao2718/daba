import * as 打馬 from './打馬';
import state from './State';
import Flag from './Flag';
import Player from './Player';

init();

function init(){
	state.players = setPlayer(3);
	document.body.addEventListener('click', ()=>{
		round();
	});
}
function setPlayer(number) {
	let players = [];
	for (var i = 1; i <= number; i++) {
		const p = new Player(`player-${i}`);
		players.push(p);
	}
	return players;
}

function round() {
	let dice = 打馬.throwDice3();
	let 采色 = 打馬._采色(dice);
	let N = 打馬._賞罰采(采色);
	const flag = Flag(采色);

	/**
	 * @type {Player}
	 */
	let player = actionPlayer(flag);

	if(player.handleHorse > 0)
		_下馬();
	else _行馬();

	state.上回采色 = 采色;
	打馬.nextPlayer();
}
/**
 * @param {Flag} flag
 */
function actionPlayer(flag){
	
	if(flag['別人真本采'])
		return flag['別人真本采'];

	if( flag['別人傍本采'] )
		return flag['別人傍本采'];

	if( flag['真撞'] )
		return flag['真撞'];

	if( flag['傍撞'] )
		return flag['傍撞'];
	
	return state.current_player;
}

function _下馬() {

}

function _行馬() {}