class Player {
	/**
	 * @param {string} _name
	 * @property {string} name
	 * @property {Object} 本采
	 * @property {number} 帖數
	 * @property {Object} 馬
	 */
	constructor(_name) {
		this.name = _name;
		this.本采 = undefined;
		this.帖數 = 0;
		this.馬 = {
			handle: 20
		};
	}

	get _未設本采() {
		return (this.本采 === undefined);
	}
/**
 * @returns {number}
 */
	get handleHorse() {
		return this.馬.handle;
	}

	giveTo(player, count){
		this.帖數 -= count;
		player.帖數 += count;
	}
}

export default Player;