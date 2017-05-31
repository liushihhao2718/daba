/**
 * @property {Player[]]} players
*/
let state = {	
	players: [],
	current_player_index: 0,
	flag: {},
	get current_player() {
		return this.players[this.current_player_index];
	},
	get prev_player() {
		const size = this.players.length;
		let prev = (this.current_player_index + size - 1) % size;
		return this.players[prev];
	},
	get next_player() {
		const size = this.players.length;
		let next = (this.current_player_index + size + 1) % size;
		return this.players[next];
	},
	get prev_player_index() {
		const size = this.players.length;
		return (this.current_player_index + size - 1) % size;
	},
	get next_player_index() {
		const size = this.players.length;
		return (this.current_player_index + size + 1) % size;
	},
	上回采色: undefined,
	帖數: 100,
	giveTo(player, count){
		this.帖數 -= count;
		player.帖數 += count;
	}
};
export default state;