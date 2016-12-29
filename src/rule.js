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