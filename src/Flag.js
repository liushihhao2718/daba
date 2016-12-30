import state from'./State';
/**
 * @param {采色} 采色
 * @return
 * @property {Object} flag
 * @property {Player} flag.別人真本采
 * @property {Player} flag.別人傍本采
 **/
export default function _確立Flag(采色) {
	
	return {
		'初次散采':_初次散采(采色),
		'自己真本彩':_自己真本彩(采色),	
		'別人真本采':_別人真本采(采色),
		'自己傍本采':_自己傍本采(采色),
		'別人傍本采':_別人傍本采(采色),
		'真撞':_真撞(采色),
		'傍撞':_傍撞(采色),
		'罰色': (采色.type === '罰色')
	};
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
function _初次散采(采色) {
	let player = state.current_player;
	return (
		player._未設本采
		&& 采色.type === '散采'
		&& _別人傍本采(采色) === undefined
	);
}
/**
 * @typedef {Object} Player
 */

/**
 * @returns {Player}
 */
function _別人真本采(采色) {
	let player =  state.players.find(x => {
		return (x.本采 === 采色);
	});

	return (player === state.current_player) ? undefined : player;
}
function _自己傍本采(采色){
	let player = state.current_player;
	if(player.point === 采色.point && 采色.type !== '罰色')
		return true;
	else
		return false;
}
/**
 * @returns {Player}
 */
function _別人傍本采(采色){
	if(采色.type === '賞色')
		return undefined;
	else{
		let player = state.players.find(player => {
			return (player.point === 采色.point);
		});

		return (player === state.current_player) ? undefined : player;
	}
}

function _真撞(采色) {
	return state.上回采色 === 采色;
}
function _傍撞(采色) {
	if(state.上回采色 === undefined) return false;
	
	return state.上回采色.point === 采色.point;
}