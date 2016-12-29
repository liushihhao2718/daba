class Player {
	constructor(_name) {
		this.name = _name;
		this.本采 = undefined;
		this.帖數 = 0;
		this.馬 = [];
	}

	get 未設本采() {
		return (this.本采 === undefined);
	}
}

module.exports = Player;