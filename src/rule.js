import state from'./State';

export function find真本采(采色) {
	return state.players.some((p)=>{
		return p.本采 == 采色;
	});
}

export function _真撞(采色) {
	return state.上回采色 === 采色;
}
export function _傍撞(采色) {
	return state.上回采色.point === 采色.point;
}
/**
 * @returns {bool}
 */
export function _自己真本彩(采色) {
	let player = state.current_player;
	return player.本采 == 采色;
}
/**
 * @returns {bool}
 */
export function _初次散采(采色) {
	let player = state.current_player;
	return (
		player.未設本采
		&& 采色.type === '散采'
		&& _別人傍本采(采色) === undefined
	);
}
/**
 * @typedef {Object} Player
 * @returns {Player}
 */
export function _別人真本采(采色) {
	return state.players.find(x => {
		return (x.本采 === 采色);
	});
}
/**
 * @returns {Player} 別人
 */
export function _別人傍本采(采色){
	if(采色.type === '賞色')
		return undefined;
	else	
		return state.players.find(player => {
			return (player.point === 采色.point);
		});
}

export function _自己傍本采(采色){
	let player = state.current_player;
	if(player.point === 采色.point && 采色.type !== '罰色')
		return true;
	else
		return false;
}