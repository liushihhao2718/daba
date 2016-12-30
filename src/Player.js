class Player {
	/**
	 * @param {string} _name
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
}

export default Player;