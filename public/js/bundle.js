(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = _確立Flag;

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {采色} 采色
 * @return
 * @property {Object} flag
 * @property {Player} flag.別人真本采
 * @property {Player} flag.別人傍本采
 **/
function _確立Flag(采色) {

	return {
		'初次散采': _初次散采(采色),
		'自己真本彩': _自己真本彩(采色),
		'別人真本采': _別人真本采(采色),
		'自己傍本采': _自己傍本采(采色),
		'別人傍本采': _別人傍本采(采色),
		'真撞': _真撞(采色),
		'傍撞': _傍撞(采色)
	};
}

/**
 * @returns {bool}
 */
function _自己真本彩(采色) {
	var player = _State2.default.current_player;
	return player.本采 == 采色;
}
/**
 * @returns {bool}
 */
function _初次散采(采色) {
	var player = _State2.default.current_player;
	return player._未設本采 && 采色.type === '散采' && _別人傍本采(采色) === undefined;
}
/**
 * @typedef {Object} Player
 */

/**
 * @returns {Player}
 */
function _別人真本采(采色) {
	var player = _State2.default.players.find(function (x) {
		return x.本采 === 采色;
	});

	return player === _State2.default.current_player ? undefined : player;
}
function _自己傍本采(采色) {
	var player = _State2.default.current_player;
	if (player.point === 采色.point && 采色.type !== '罰色') return true;else return false;
}
/**
 * @returns {Player}
 */
function _別人傍本采(采色) {
	if (采色.type === '賞色') return undefined;else {
		var player = _State2.default.players.find(function (player) {
			return player.point === 采色.point;
		});

		return player === _State2.default.current_player ? undefined : player;
	}
}

function _真撞(采色) {
	return _State2.default.上回采色 === 采色;
}
function _傍撞(采色) {
	if (_State2.default.上回采色 === undefined) return false;

	return _State2.default.上回采色.point === 采色.point;
}

},{"./State":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
	/**
  * @param {string} _name
  * @property {string} name
  * @property {Object} 本采
  * @property {number} 帖數
  * @property {Object} 馬
  */
	function Player(_name) {
		_classCallCheck(this, Player);

		this.name = _name;
		this.本采 = undefined;
		this.帖數 = 0;
		this.馬 = {
			handle: 20
		};
	}

	_createClass(Player, [{
		key: "giveTo",
		value: function giveTo(player, count) {
			this.帖數 -= count;
			player.帖數 += count;
		}
	}, {
		key: "_\u672A\u8A2D\u672C\u91C7",
		get: function get() {
			return this.本采 === undefined;
		}
		/**
   * @returns {number}
   */

	}, {
		key: "handleHorse",
		get: function get() {
			return this.馬.handle;
		}
	}]);

	return Player;
}();

exports.default = Player;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.nextPlayer = nextPlayer;
exports._采色 = _采色;
exports.throwDice3 = throwDice3;
exports.set本采 = set本采;
exports._賞罰采 = _賞罰采;

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _rule = require('./rule');

var rule = _interopRequireWildcard(_rule);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nextPlayer() {
	var index = _State2.default.current_player_index;
	index = (index + 1) % _State2.default.players.length;
	_State2.default.current_player_index = index;
}

function _采色(dice3) {
	var table = require('./采色圖.json');

	return table[toKey(dice3)];

	function toKey(dice3) {
		var sorted = dice3.sort();
		return '' + sorted[0] + sorted[1] + sorted[2];
	}
}
function throwDice3() {
	return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
}

function set本采(采色, player) {
	if (采色.type === '散采' && !rule.find真本采(采色)) player.本采 = 采色;
}

function _賞罰采(采色) {
	var player = _State2.default.current_player;
	var N = 0;
	switch (采色.type) {
		case '賞采':
			N = _賞采賞帖;
			break;
		case '罰采':
			N = 2;
			player.帖數 -= 2;
			break;
	}
	return N;
}

function _賞采賞帖(采色) {
	var N = 0;
	switch (采色.name) {
		case '堂印':
			N = 8;
			break;
		case '碧油':
			N = 6;
			break;
		case '桃花重五':
			N = 5;
			break;
		case '拍板兒':
		case '鴈行兒':
		case '滿盆星':
			N = 4;
			break;
		default:
			N = 2;
	}

	return N;
}

},{"./State":4,"./rule":6,"./采色圖.json":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @property {Player[]]} players
*/
var state = {
	players: [],
	current_player_index: 0,
	get current_player() {
		return this.players[this.current_player_index];
	},
	get prev_player() {
		var size = this.players.length;
		var prev = (this.current_player_index + size - 1) % size;
		return this.players[prev];
	},
	上回采色: undefined,
	帖數: 100,
	giveTo: function giveTo(player, count) {
		this.帖數 -= count;
		player.帖數 += count;
	}
};
exports.default = state;

},{}],5:[function(require,module,exports){
'use strict';

var _Rule = require('./Rule');

var Rule = _interopRequireWildcard(_Rule);

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _Flag = require('./Flag');

var _Flag2 = _interopRequireDefault(_Flag);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

init();

function init() {
	_State2.default.players = setPlayer(3);
	document.body.addEventListener('click', function () {
		round();
	});
}
function setPlayer(number) {
	var players = [];
	for (var i = 1; i <= number; i++) {
		var p = new _Player2.default('player-' + i);
		players.push(p);
	}
	return players;
}

function round() {
	var dice = Rule.throwDice3();
	var 采色 = Rule._采色(dice);

	var flag = (0, _Flag2.default)(采色);

	/** @type {Player} */
	var player = actionPlayer(flag);

	if (player.handleHorse > 0) _下馬(player, flag, 采色);else _行馬();

	_State2.default.上回采色 = 采色;
	Rule.nextPlayer();
}
/**
 * @param {flag} flag
 */
function actionPlayer(flag) {

	if (flag['別人真本采']) return flag['別人真本采'];

	if (flag['別人傍本采']) return flag['別人傍本采'];

	if (flag['真撞'] || flag['傍撞']) return _State2.default.prev_player;

	return _State2.default.current_player;
}

function _下馬(action_player, flag, 采色) {
	var horse = 0;
	var current_player = _State2.default.current_player;

	if (flag['初次散采']) {
		horse = 1;
		current_player.本采 = 采色;
	} else if (flag['自己真本彩']) horse = 3;else if (flag['別人真本采']) {
		horse = 3;
		current_player.giveTo(actionPlayer, 3);
	} else if (flag['自己傍本采']) horse = 2;else if (flag['別人傍本采']) {
		horse = 3;
		current_player.giveTo(actionPlayer, 2);
	}
	if (flag['真撞']) {
		horse = 3;
		current_player.giveTo(_State2.default, 3);
	} else if (flag['傍撞']) {
		horse = 2;
		current_player.giveTo(_State2.default, 2);
	}

	var count = Rule._賞罰采(采色);
	_State2.default.giveTo(current_player, count);

	locateHorse(action_player, horse, 采色.point);
}
/**
 * @param {Player} actionPlayer
 * @param {number} horse 下幾疋馬
 * @param {number} locate 放哪一格 1~18
 */
function locateHorse(actionPlayer, horse, locate) {
	if (actionPlayer.馬.handle < horse) horse = actionPlayer.馬.handle;

	actionPlayer.馬.handle -= horse;
	actionPlayer.馬[locate] = horse;
}

function _行馬() {}

},{"./Flag":1,"./Player":2,"./Rule":3,"./State":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.nextPlayer = nextPlayer;
exports._采色 = _采色;
exports.throwDice3 = throwDice3;
exports.set本采 = set本采;
exports._賞罰采 = _賞罰采;

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _rule = require('./rule');

var rule = _interopRequireWildcard(_rule);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nextPlayer() {
	var index = _State2.default.current_player_index;
	index = (index + 1) % _State2.default.players.length;
	_State2.default.current_player_index = index;
}

function _采色(dice3) {
	var table = require('./采色圖.json');

	return table[toKey(dice3)];

	function toKey(dice3) {
		var sorted = dice3.sort();
		return '' + sorted[0] + sorted[1] + sorted[2];
	}
}
function throwDice3() {
	return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
}

function set本采(采色, player) {
	if (采色.type === '散采' && !rule.find真本采(采色)) player.本采 = 采色;
}

function _賞罰采(采色) {
	var player = _State2.default.current_player;
	var N = 0;
	switch (采色.type) {
		case '賞采':
			N = _賞采賞帖;
			break;
		case '罰采':
			N = 2;
			player.帖數 -= 2;
			break;
	}
	return N;
}

function _賞采賞帖(采色) {
	var N = 0;
	switch (采色.name) {
		case '堂印':
			N = 8;
			break;
		case '碧油':
			N = 6;
			break;
		case '桃花重五':
			N = 5;
			break;
		case '拍板兒':
		case '鴈行兒':
		case '滿盆星':
			N = 4;
			break;
		default:
			N = 2;
	}

	return N;
}

},{"./State":4,"./rule":6,"./采色圖.json":7}],7:[function(require,module,exports){
module.exports={
    "111":{
        "type":"賞色",
        "name":"滿盆星",
        "帖":11,
        "point":3
    },
    "112":{
        "type":"罰色",
        "name":"小娘子",
        "帖":2,
        "point":4
    },
    "113":{
        "type":"散采",
        "name":"葫蘆",
        "帖":2,
        "point":5
    },
    "114":{
        "type":"散采",
        "name":"拐七",
        "帖":4,
        "point":6
    },
    "115":{
        "type":"散采",
        "name":"白七",
        "帖":4,
        "point":7
    },
    "122":{
        "type":"散采",
        "name":"小嘴",
        "帖":2,
        "point":5
    },
    "123":{
        "type":"罰色",
        "name":"小浮圖",
        "帖":2,
        "point":6
    },
    "125":{
        "type":"散采",
        "name":"拐八",
        "帖":5,
        "point":8
    },
    "126":{
        "type":"散采",
        "name":"拐九",
        "帖":5,
        "point":9
    },
    "133":{
        "type":"散采",
        "name":"川七",
        "帖":4,
        "point":7
    },
    "134":{
        "type":"散采",
        "name":"撮八",
        "帖":5,
        "point":8
    },
    "135":{
        "type":"散采",
        "name":"撮九",
        "帖":5,
        "point":9
    },
    "136":{
        "type":"賞色",
        "name":"撮十",
        "帖":11,
        "point":10
    },
    "144":{
        "type":"散采",
        "name":"丁九",
        "帖":5,
        "point":9
    },
    "145":{
        "type":"散采",
        "name":"急火鑽",
        "帖":5,
        "point":10
    },
    "155":{
        "type":"散采",
        "name":"小鎗",
        "帖":5,
        "point":11
    },
    "156":{
        "type":"散采",
        "name":"腰曲縷",
        "帖":5,
        "point":12
    },
    "161":{
        "type":"散采",
        "name":"大肚",
        "帖":5,
        "point":8
    },
    "166":{
        "type":"散采",
        "name":"大鎗",
        "帖":5,
        "point":13
    },
    "222":{
        "type":"賞色",
        "name":"拍板兒",
        "帖":11,
        "point":6
    },
    "223":{
        "type":"散采",
        "name":"夾七",
        "帖":4,
        "point":7
    },
    "224":{
        "type":"散采",
        "name":"夾八",
        "帖":5,
        "point":8
    },
    "225":{
        "type":"散采",
        "name":"夾九",
        "帖":5,
        "point":9
    },
    "226":{
        "type":"散采",
        "name":"夾十",
        "帖":4,
        "point":10
    },
    "233":{
        "type":"散采",
        "name":"鴈八",
        "帖":5,
        "point":8
    },
    "234":{
        "type":"散采",
        "name":"妹九",
        "帖":5,
        "point":9
    },
    "235":{
        "type":"散采",
        "name":"胡十",
        "帖":4,
        "point":10
    },
    "236":{
        "type":"賞色",
        "name":"靴楦",
        "帖":11,
        "point":11
    },
    "244":{
        "type":"散采",
        "name":"醉十",
        "帖":4,
        "point":10
    },
    "245":{
        "type":"散采",
        "name":"九二",
        "帖":5,
        "point":11
    },
    "246":{
        "type":"散采",
        "name":"赤十二",
        "帖":5,
        "point":12
    },
    "255":{
        "type":"散采",
        "name":"ㄚ角兒",
        "帖":5,
        "point":12
    },
    "256":{
        "type":"散采",
        "name":"暮宿",
        "帖":5,
        "point":13
    },
    "266":{
        "type":"散采",
        "name":"篳篥",
        "帖":4,
        "point":14
    },
    "333":{
        "type":"賞色",
        "name":"鴈行兒",
        "帖":11,
        "point":9
    },
    "334":{
        "type":"散采",
        "name":"蛾眉",
        "帖":4,
        "point":10
    },
    "335":{
        "type":"散采",
        "name":"䬣𩟐兒",
        "帖":5,
        "point":11
    },
    "336":{
        "type":"散采",
        "name":"條巾",
        "帖":5,
        "point":12
    },
    "344":{
        "type":"散采",
        "name":"紅鶴",
        "帖":5,
        "point":11
    },
    "345":{
        "type":"散采",
        "name":"花羔",
        "帖":5,
        "point":12
    },
    "346":{
        "type":"散采",
        "name":"野雞頂",
        "帖":5,
        "point":13
    },
    "355":{
        "type":"散采",
        "name":"皁鶴",
        "帖":5,
        "point":13
    },
    "356":{
        "type":"散采",
        "name":"角搜",
        "帖":4,
        "point":14
    },
    "366":{
        "type":"散采",
        "name":"驢嘴",
        "帖":1,
        "point":15
    },
    "444":{
        "type":"賞色",
        "name":"堂印",
        "帖":11,
        "point":12
    },
    "445":{
        "type":"散采",
        "name":"八五",
        "帖":5,
        "point":13
    },
    "446":{
        "type":"散采",
        "name":"大開門",
        "帖":4,
        "point":14
    },
    "455":{
        "type":"散采",
        "name":"正臺",
        "帖":4,
        "point":14
    },
    "456":{
        "type":"賞色",
        "name":"馬軍",
        "帖":11,
        "point":15
    },
    "466":{
        "type":"散采",
        "name":"赤牛",
        "帖":2,
        "point":16
    },
    "555":{
        "type":"賞色",
        "name":"桃花重五",
        "帖":11,
        "point":15
    },
    "556":{
        "type":"散采",
        "name":"黑牛",
        "帖":2,
        "point":16
    },
    "566":{
        "type":"賞色",
        "name":"黑十七",
        "帖":11,
        "point":17
    },
    "666":{
        "type":"賞色",
        "name":"碧油",
        "帖":11,
        "point":18
    }
}
},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvRmxhZy5qcyIsInNyYy9QbGF5ZXIuanMiLCJzcmMvUnVsZS5qcyIsInNyYy9TdGF0ZS5qcyIsInNyYy9tYWluLmpzIiwic3JjL3J1bGUuanMiLCJzcmMv6YeH6Imy5ZyWLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztrQkNRd0IsTzs7QUFSeEI7Ozs7OztBQUNBOzs7Ozs7O0FBT2UsU0FBUyxPQUFULENBQWlCLEVBQWpCLEVBQXFCOztBQUVuQyxRQUFPO0FBQ04sVUFBTyxNQUFNLEVBQU4sQ0FERDtBQUVOLFdBQVEsT0FBTyxFQUFQLENBRkY7QUFHTixXQUFRLE9BQU8sRUFBUCxDQUhGO0FBSU4sV0FBUSxPQUFPLEVBQVAsQ0FKRjtBQUtOLFdBQVEsT0FBTyxFQUFQLENBTEY7QUFNTixRQUFLLElBQUksRUFBSixDQU5DO0FBT04sUUFBSyxJQUFJLEVBQUo7QUFQQyxFQUFQO0FBU0E7O0FBR0Q7OztBQUdBLFNBQVMsTUFBVCxDQUFnQixFQUFoQixFQUFvQjtBQUNuQixLQUFJLFNBQVMsZ0JBQU0sY0FBbkI7QUFDQSxRQUFPLE9BQU8sRUFBUCxJQUFhLEVBQXBCO0FBQ0E7QUFDRDs7O0FBR0EsU0FBUyxLQUFULENBQWUsRUFBZixFQUFtQjtBQUNsQixLQUFJLFNBQVMsZ0JBQU0sY0FBbkI7QUFDQSxRQUNDLE9BQU8sS0FBUCxJQUNHLEdBQUcsSUFBSCxLQUFZLElBRGYsSUFFRyxPQUFPLEVBQVAsTUFBZSxTQUhuQjtBQUtBO0FBQ0Q7Ozs7QUFJQTs7O0FBR0EsU0FBUyxNQUFULENBQWdCLEVBQWhCLEVBQW9CO0FBQ25CLEtBQUksU0FBVSxnQkFBTSxPQUFOLENBQWMsSUFBZCxDQUFtQixhQUFLO0FBQ3JDLFNBQVEsRUFBRSxFQUFGLEtBQVMsRUFBakI7QUFDQSxFQUZhLENBQWQ7O0FBSUEsUUFBUSxXQUFXLGdCQUFNLGNBQWxCLEdBQW9DLFNBQXBDLEdB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgc3RhdGUgZnJvbScuL1N0YXRlJztcbi8qKlxuICogQHBhcmFtIHvph4foibJ9IOmHh+iJslxuICogQHJldHVyblxuICogQHByb3BlcnR5IHtPYmplY3R9IGZsYWdcbiAqIEBwcm9wZXJ0eSB7UGxheWVyfSBmbGFnLuWIpeS6uuecn+acrOmHh1xuICogQHByb3BlcnR5IHtQbGF5ZXJ9IGZsYWcu5Yil5Lq65YKN5pys6YeHXG4gKiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBf56K656uLRmxhZyjph4foibIpIHtcblx0XG5cdHJldHVybiB7XG5cdFx0J+WIneasoeaVo+mHhyc6X+WIneasoeaVo+mHhyjph4foibIpLFxuXHRcdCfoh6rlt7HnnJ/mnKzlvaknOl/oh6rlt7HnnJ/mnKzlvako6YeH6ImyKSxcdFxuXHRcdCfliKXkurrnnJ/mnKzph4cnOl/liKXkurrnnJ/mnKzph4co6YeH6ImyKSxcblx0XHQn6Ieq5bex5YKN5pys6YeHJzpf6Ieq5bex5YKN5pys6YeHKOmHh+iJsiksXG5cdFx0J+WIpeS6uuWCjeacrOmHhyc6X+WIpeS6uuWCjeacrOmHhyjph4foibIpLFxuXHRcdCfnnJ/mkp4nOl/nnJ/mkp4o6YeH6ImyKSxcblx0XHQn5YKN5pKeJzpf5YKN5pKeKOmHh+iJsilcblx0fTtcbn1cblxuXG4vKipcbiAqIEByZXR1cm5zIHtib29sfVxuICovXG5mdW5jdGlvbiBf6Ieq5bex55yf5pys5b2pKOmHh+iJsikge1xuXHRsZXQgcGxheWVyID0gc3RhdGUuY3VycmVudF9wbGF5ZXI7XG5cdHJldHVybiBwbGF5ZXIu5pys6YeHID09IOmHh+iJsjtcbn1cbi8qKlxuICogQHJldHVybnMge2Jvb2x9XG4gKi9cbmZ1bmN0aW9uIF/liJ3mrKHmlaPph4co6YeH6ImyKSB7XG5cdGxldCBwbGF5ZXIgPSBzdGF0ZS5jdXJyZW50X3BsYXllcjtcblx0cmV0dXJuIChcblx0XHRwbGF5ZXIuX+acquioreacrOmHh1xuXHRcdCYmIOmHh+iJsi50eXBlID09PSAn5pWj6YeHJ1xuXHRcdCYmIF/liKXkurrlgo3mnKzph4co6YeH6ImyKSA9PT0gdW5kZWZpbmVkXG5cdCk7XG59XG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBsYXllclxuICovXG5cbi8qKlxuICogQHJldHVybnMge1BsYXllcn1cbiAqL1xuZnVuY3Rpb24gX+WIpeS6uuecn+acrOmHhyjph4foibIpIHtcblx0bGV0IHBsYXllciA9ICBzdGF0ZS5wbGF5ZXJzLmZpbmQoeCA9PiB7XG5cdFx0cmV0dXJuICh4LuacrOmHhyA9PT0g6YeH6ImyKTtcblx0fSk7XG5cblx0cmV0dXJuIChwbGF5ZXIgPT09IHN0YXRlLmN1cnJlbnRfcGxheWVyKSA/IHVuZGVmaW5lZCA6IHBsYXllcjtcbn1cbmZ1bmN0aW9uIF/oh6rlt7Hlgo3mnKzph4co6YeH6ImyKXtcblx0bGV0IHBsYXllciA9IHN0YXRlLmN1cnJlbnRfcGxheWVyO1xuXHRpZihwbGF5ZXIucG9pbnQgPT09IOmHh+iJsi5wb2ludCAmJiDph4foibIudHlwZSAhPT0gJ+e9sOiJsicpXG5cdFx0cmV0dXJuIHRydWU7XG5cdGVsc2Vcblx0XHRyZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIEByZXR1cm5zIHtQbGF5ZXJ9XG4gKi9cbmZ1bmN0aW9uIF/liKXkurrlgo3mnKzph4co6YeH6ImyKXtcblx0aWYo6YeH6ImyLnR5cGUgPT09ICfos57oibInKVxuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdGVsc2V7XG5cdFx0bGV0IHBsYXllciA9IHN0YXRlLnBsYXllcnMuZmluZChwbGF5ZXIgPT4ge1xuXHRcdFx0cmV0dXJuIChwbGF5ZXIucG9pbnQgPT09IOmHh+iJsi5wb2ludCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gKHBsYXllciA9PT0gc3RhdGUuY3VycmVudF9wbGF5ZXIpID8gdW5kZWZpbmVkIDogcGxheWVyO1xuXHR9XG59XG5cbmZ1bmN0aW9uIF/nnJ/mkp4o6YeH6ImyKSB7XG5cdHJldHVybiBzdGF0ZS7kuIrlm57ph4foibIgPT09IOmHh+iJsjtcbn1cbmZ1bmN0aW9uIF/lgo3mkp4o6YeH6ImyKSB7XG5cdGlmKHN0YXRlLuS4iuWbnumHh+iJsiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG5cdFxuXHRyZXR1cm4gc3RhdGUu5LiK5Zue6YeH6ImyLnBvaW50ID09PSDph4foibIucG9pbnQ7XG59IiwiY2xhc3MgUGxheWVyIHtcblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBfbmFtZVxuXHQgKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuXHQgKiBAcHJvcGVydHkge09iamVjdH0g5pys6YeHXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSDluJbmlbhcblx0ICogQHByb3BlcnR5IHtPYmplY3R9IOmmrFxuXHQgKi9cblx0Y29uc3RydWN0b3IoX25hbWUpIHtcblx0XHR0aGlzLm5hbWUgPSBfbmFtZTtcblx0XHR0aGlzLuacrOmHhyA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLuW4luaVuCA9IDA7XG5cdFx0dGhpcy7ppqwgPSB7XG5cdFx0XHRoYW5kbGU6IDIwXG5cdFx0fTtcblx0fVxuXG5cdGdldCBf5pyq6Kit5pys6YeHKCkge1xuXHRcdHJldHVybiAodGhpcy7mnKzph4cgPT09IHVuZGVmaW5lZCk7XG5cdH1cbi8qKlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuXHRnZXQgaGFuZGxlSG9yc2UoKSB7XG5cdFx0cmV0dXJuIHRoaXMu6aasLmhhbmRsZTtcblx0fVxuXG5cdGdpdmVUbyhwbGF5ZXIsIGNvdW50KXtcblx0XHR0aGlzLuW4luaVuCAtPSBjb3VudDtcblx0XHRwbGF5ZXIu5biW5pW4ICs9IGNvdW50O1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgc3RhdGUgZnJvbScuL1N0YXRlJztcbmltcG9ydCAqIGFzIHJ1bGUgZnJvbSAnLi9ydWxlJztcblxuZXhwb3J0XHRmdW5jdGlvbiBuZXh0UGxheWVyKCkge1xuXHRsZXQgaW5kZXggPSBzdGF0ZS5jdXJyZW50X3BsYXllcl9pbmRleDtcblx0aW5kZXggPSAoaW5kZXggKyAxKSAlIHN0YXRlLnBsYXllcnMubGVuZ3RoO1xuXHRzdGF0ZS5jdXJyZW50X3BsYXllcl9pbmRleCA9IGluZGV4O1xufVxuXG5leHBvcnRcdGZ1bmN0aW9uIF/ph4foibIoZGljZTMpIHtcblx0Y29uc3QgdGFibGUgPSByZXF1aXJlKCcuL+mHh+iJsuWcli5qc29uJyk7XG5cblx0cmV0dXJuIHRhYmxlW3RvS2V5KGRpY2UzKV07XG5cblx0ZnVuY3Rpb24gdG9LZXkoZGljZTMpIHtcblx0XHRsZXQgc29ydGVkID0gZGljZTMuc29ydCgpO1xuXHRcdHJldHVybiBgJHtzb3J0ZWRbMF19JHtzb3J0ZWRbMV19JHtzb3J0ZWRbMl19YDtcblx0fVxufVxuZXhwb3J0XHRmdW5jdGlvbiB0aHJvd0RpY2UzKCkge1xuXHRyZXR1cm4gW1xuXHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMSxcblx0XHRNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDEsXG5cdFx0TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxXG5cdF07XG59XG5cbmV4cG9ydFx0ZnVuY3Rpb24gc2V05pys6YeHKOmHh+iJsiwgcGxheWVyKSB7XG5cdGlmICjph4foibIudHlwZSA9PT0gJ+aVo+mHhycgXG5cdFx0JiYgIXJ1bGUuZmluZOecn+acrOmHhyjph4foibIpXG5cdClcblx0XHRwbGF5ZXIu5pys6YeHID0g6YeH6ImyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX+iznue9sOmHhyjph4foibIpIHtcblx0bGV0IHBsYXllciA9IHN0YXRlLmN1cnJlbnRfcGxheWVyO1xuXHRsZXQgTiA9IDA7XG5cdHN3aXRjaCjph4foibIudHlwZSkge1xuXHRcdGNhc2UgJ+iznumHhyc6XG5cdFx0XHROID0gX+iznumHh+iznuW4ljtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ+e9sOmHhyc6XG5cdFx0XHROID0gMjtcblx0XHRcdHBsYXllci7luJbmlbggLT0gMjtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiBOO1xufVxuXG5mdW5jdGlvbiBf6LOe6YeH6LOe5biWKCDph4foibIgKXtcblx0bGV0IE4gPSAwO1xuXHRzd2l0Y2go6YeH6ImyLm5hbWUpIHtcblx0XHRjYXNlICfloILljbAnOlxuXHRcdFx0TiA9IDg7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICfnoqfmsrknOlxuXHRcdFx0TiA9IDY7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICfmoYPoirHph43kupQnOlxuXHRcdFx0TiA9IDU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICfmi43mnb/lhZInOlxuXHRcdGNhc2UgJ+m0iOihjOWFkic6XG5cdFx0Y2FzZSAn5ru/55uG5pifJzpcblx0XHRcdE4gPSA0O1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdE4gPSAyO1xuXHR9XG5cblx0cmV0dXJuIE47XG59XG4iLCIvKipcbiAqIEBwcm9wZXJ0eSB7UGxheWVyW11dfSBwbGF5ZXJzXG4qL1xubGV0IHN0YXRlID0ge1x0XG5cdHBsYXllcnM6IFtdLFxuXHRjdXJyZW50X3BsYXllcl9pbmRleDogMCxcblx0Z2V0IGN1cnJlbnRfcGxheWVyKCkge1xuXHRcdHJldHVybiB0aGlzLnBsYXllcnNbdGhpcy5jdXJyZW50X3BsYXllcl9pbmRleF07XG5cdH0sXG5cdGdldCBwcmV2X3BsYXllcigpIHtcblx0XHRjb25zdCBzaXplID0gdGhpcy5wbGF5ZXJzLmxlbmd0aDtcblx0XHRsZXQgcHJldiA9ICh0aGlzLmN1cnJlbnRfcGxheWVyX2luZGV4ICsgc2l6ZSAtIDEpICUgc2l6ZTtcblx0XHRyZXR1cm4gdGhpcy5wbGF5ZXJzW3ByZXZdO1xuXHR9LFxuXHTkuIrlm57ph4foibI6IHVuZGVmaW5lZCxcblx05biW5pW4OiAxMDAsXG5cdGdpdmVUbyhwbGF5ZXIsIGNvdW50KXtcblx0XHR0aGlzLuW4luaVuCAtPSBjb3VudDtcblx0XHRwbGF5ZXIu5biW5pW4ICs9IGNvdW50O1xuXHR9XG59O1xuZXhwb3J0IGRlZmF1bHQgc3RhdGU7IiwiaW1wb3J0ICogYXMgUnVsZSBmcm9tICcuL1J1bGUnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vU3RhdGUnO1xuaW1wb3J0IEZsYWcgZnJvbSAnLi9GbGFnJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuXG5pbml0KCk7XG5cbmZ1bmN0aW9uIGluaXQoKXtcblx0c3RhdGUucGxheWVycyA9IHNldFBsYXllcigzKTtcblx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG5cdFx0cm91bmQoKTtcblx0fSk7XG59XG5mdW5jdGlvbiBzZXRQbGF5ZXIobnVtYmVyKSB7XG5cdGxldCBwbGF5ZXJzID0gW107XG5cdGZvciAodmFyIGkgPSAxOyBpIDw9IG51bWJlcjsgaSsrKSB7XG5cdFx0Y29uc3QgcCA9IG5ldyBQbGF5ZXIoYHBsYXllci0ke2l9YCk7XG5cdFx0cGxheWVycy5wdXNoKHApO1xuXHR9XG5cdHJldHVybiBwbGF5ZXJzO1xufVxuXG5mdW5jdGlvbiByb3VuZCgpIHtcblx0bGV0IGRpY2UgPSBSdWxlLnRocm93RGljZTMoKTtcblx0bGV0IOmHh+iJsiA9IFJ1bGUuX+mHh+iJsihkaWNlKTtcblx0XG5cdGNvbnN0IGZsYWcgPSBGbGFnKOmHh+iJsik7XG5cblx0LyoqIEB0eXBlIHtQbGF5ZXJ9ICovXG5cdGxldCBwbGF5ZXIgPSBhY3Rpb25QbGF5ZXIoZmxhZyk7XG5cblx0aWYocGxheWVyLmhhbmRsZUhvcnNlID4gMClcblx0XHRf5LiL6aasKHBsYXllciwgZmxhZywg6YeH6ImyKTtcblx0ZWxzZSBf6KGM6aasKCk7XG5cblx0c3RhdGUu5LiK5Zue6YeH6ImyID0g6YeH6ImyO1xuXHRSdWxlLm5leHRQbGF5ZXIoKTtcbn1cbi8qKlxuICogQHBhcmFtIHtmbGFnfSBmbGFnXG4gKi9cbmZ1bmN0aW9uIGFjdGlvblBsYXllcihmbGFnKXtcblx0XG5cdGlmKGZsYWdbJ+WIpeS6uuecn+acrOmHhyddKVxuXHRcdHJldHVybiBmbGFnWyfliKXkurrnnJ/mnKzph4cnXTtcblxuXHRpZiggZmxhZ1sn5Yil5Lq65YKN5pys6YeHJ10gKVxuXHRcdHJldHVybiBmbGFnWyfliKXkurrlgo3mnKzph4cnXTtcblxuXHRpZiggZmxhZ1sn55yf5pKeJ10gfHwgZmxhZ1sn5YKN5pKeJ10pXG5cdFx0cmV0dXJuIHN0YXRlLnByZXZfcGxheWVyO1xuXHRcblx0cmV0dXJuIHN0YXRlLmN1cnJlbnRfcGxheWVyO1xufVxuXG5mdW5jdGlvbiBf5LiL6aasKGFjdGlvbl9wbGF5ZXIsIGZsYWcsIOmHh+iJsikge1xuXHRsZXQgaG9yc2UgPSAwO1xuXHRsZXQgY3VycmVudF9wbGF5ZXIgPSBzdGF0ZS5jdXJyZW50X3BsYXllcjtcblxuXHRpZiggZmxhZ1sn5Yid5qyh5pWj6YeHJ10gKSB7XG5cdFx0aG9yc2UgPSAxO1xuXHRcdGN1cnJlbnRfcGxheWVyLuacrOmHhyA9IOmHh+iJsjtcblx0fVxuXHRlbHNlIGlmKCBmbGFnWyfoh6rlt7HnnJ/mnKzlvaknXSApIGhvcnNlID0gMztcblx0ZWxzZSBpZiggZmxhZ1sn5Yil5Lq655yf5pys6YeHJ10gKSB7XG5cdFx0aG9yc2UgPSAzO1xuXHRcdGN1cnJlbnRfcGxheWVyLmdpdmVUbyhhY3Rpb25QbGF5ZXIsIDMpO1xuXHR9XG5cdGVsc2UgaWYoIGZsYWdbJ+iHquW3seWCjeacrOmHhyddICkgaG9yc2UgPSAyO1xuXHRlbHNlIGlmKCBmbGFnWyfliKXkurrlgo3mnKzph4cnXSApIHtcblx0XHRob3JzZSA9IDM7XG5cdFx0Y3VycmVudF9wbGF5ZXIuZ2l2ZVRvKGFjdGlvblBsYXllciwgMik7XG5cdH1cblx0aWYoIGZsYWdbJ+ecn+aSniddICl7XG5cdFx0aG9yc2UgPSAzO1xuXHRcdGN1cnJlbnRfcGxheWVyLmdpdmVUbyhzdGF0ZSwgMyk7XG5cdH1cblx0ZWxzZSBpZihmbGFnWyflgo3mkp4nXSl7XG5cdFx0aG9yc2UgPSAyO1xuXHRcdGN1cnJlbnRfcGxheWVyLmdpdmVUbyhzdGF0ZSwgMik7XG5cdH1cblxuXHRsZXQgY291bnQgPSBSdWxlLl/os57nvbDph4co6YeH6ImyKTtcblx0c3RhdGUuZ2l2ZVRvKGN1cnJlbnRfcGxheWVyLCBjb3VudCk7XG5cblx0bG9jYXRlSG9yc2UoYWN0aW9uX3BsYXllciwgaG9yc2UsIOmHh+iJsi5wb2ludCk7XG59XG4vKipcbiAqIEBwYXJhbSB7UGxheWVyfSBhY3Rpb25QbGF5ZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBob3JzZSDkuIvlub7nlovppqxcbiAqIEBwYXJhbSB7bnVtYmVyfSBsb2NhdGUg5pS+5ZOq5LiA5qC8IDF+MThcbiAqL1xuZnVuY3Rpb24gbG9jYXRlSG9yc2UoYWN0aW9uUGxheWVyLCBob3JzZSwgbG9jYXRlKSB7XG5cdGlmKCBhY3Rpb25QbGF5ZXIu6aasLmhhbmRsZSA8IGhvcnNlIClcblx0XHRob3JzZSAgPSBhY3Rpb25QbGF5ZXIu6aasLmhhbmRsZTtcblx0XG5cdGFjdGlvblBsYXllci7ppqwuaGFuZGxlIC09IGhvcnNlO1xuXHRhY3Rpb25QbGF5ZXIu6aasW2xvY2F0ZV0gPSBob3JzZTtcbn1cblxuZnVuY3Rpb24gX+ihjOmmrCgpIHt9IiwiaW1wb3J0IHN0YXRlIGZyb20nLi9TdGF0ZSc7XG5pbXBvcnQgKiBhcyBydWxlIGZyb20gJy4vcnVsZSc7XG5cbmV4cG9ydFx0ZnVuY3Rpb24gbmV4dFBsYXllcigpIHtcblx0bGV0IGluZGV4ID0gc3RhdGUuY3VycmVudF9wbGF5ZXJfaW5kZXg7XG5cdGluZGV4ID0gKGluZGV4ICsgMSkgJSBzdGF0ZS5wbGF5ZXJzLmxlbmd0aDtcblx0c3RhdGUuY3VycmVudF9wbGF5ZXJfaW5kZXggPSBpbmRleDtcbn1cblxuZXhwb3J0XHRmdW5jdGlvbiBf6YeH6ImyKGRpY2UzKSB7XG5cdGNvbnN0IHRhYmxlID0gcmVxdWlyZSgnLi/ph4foibLlnJYuanNvbicpO1xuXG5cdHJldHVybiB0YWJsZVt0b0tleShkaWNlMyldO1xuXG5cdGZ1bmN0aW9uIHRvS2V5KGRpY2UzKSB7XG5cdFx0bGV0IHNvcnRlZCA9IGRpY2UzLnNvcnQoKTtcblx0XHRyZXR1cm4gYCR7c29ydGVkWzBdfSR7c29ydGVkWzFdfSR7c29ydGVkWzJdfWA7XG5cdH1cbn1cbmV4cG9ydFx0ZnVuY3Rpb24gdGhyb3dEaWNlMygpIHtcblx0cmV0dXJuIFtcblx0XHRNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDEsXG5cdFx0TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxLFxuXHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMVxuXHRdO1xufVxuXG5leHBvcnRcdGZ1bmN0aW9uIHNldOacrOmHhyjph4foibIsIHBsYXllcikge1xuXHRpZiAo6YeH6ImyLnR5cGUgPT09ICfmlaPph4cnIFxuXHRcdCYmICFydWxlLmZpbmTnnJ/mnKzph4co6YeH6ImyKVxuXHQpXG5cdFx0cGxheWVyLuacrOmHhyA9IOmHh+iJsjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF/os57nvbDph4co6YeH6ImyKSB7XG5cdGxldCBwbGF5ZXIgPSBzdGF0ZS5jdXJyZW50X3BsYXllcjtcblx0bGV0IE4gPSAwO1xuXHRzd2l0Y2go6YeH6ImyLnR5cGUpIHtcblx0XHRjYXNlICfos57ph4cnOlxuXHRcdFx0TiA9IF/os57ph4fos57luJY7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICfnvbDph4cnOlxuXHRcdFx0TiA9IDI7XG5cdFx0XHRwbGF5ZXIu5biW5pW4IC09IDI7XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gTjtcbn1cblxuZnVuY3Rpb24gX+iznumHh+iznuW4ligg6YeH6ImyICl7XG5cdGxldCBOID0gMDtcblx0c3dpdGNoKOmHh+iJsi5uYW1lKSB7XG5cdFx0Y2FzZSAn5aCC5Y2wJzpcblx0XHRcdE4gPSA4O1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAn56Kn5rK5Jzpcblx0XHRcdE4gPSA2O1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAn5qGD6Iqx6YeN5LqUJzpcblx0XHRcdE4gPSA1O1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAn5ouN5p2/5YWSJzpcblx0XHRjYXNlICfptIjooYzlhZInOlxuXHRcdGNhc2UgJ+a7v+ebhuaYnyc6XG5cdFx0XHROID0gNDtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHROID0gMjtcblx0fVxuXG5cdHJldHVybiBOO1xufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiMTExXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuiznuiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIua7v+ebhuaYn1wiLFxuICAgICAgICBcIuW4llwiOjExLFxuICAgICAgICBcInBvaW50XCI6M1xuICAgIH0sXG4gICAgXCIxMTJcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi572w6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5bCP5aiY5a2QXCIsXG4gICAgICAgIFwi5biWXCI6MixcbiAgICAgICAgXCJwb2ludFwiOjRcbiAgICB9LFxuICAgIFwiMTEzXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuiRq+iYhlwiLFxuICAgICAgICBcIuW4llwiOjIsXG4gICAgICAgIFwicG9pbnRcIjo1XG4gICAgfSxcbiAgICBcIjExNFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmi5DkuINcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6NlxuICAgIH0sXG4gICAgXCIxMTVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi55m95LiDXCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjdcbiAgICB9LFxuICAgIFwiMTIyXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWwj+WYtFwiLFxuICAgICAgICBcIuW4llwiOjIsXG4gICAgICAgIFwicG9pbnRcIjo1XG4gICAgfSxcbiAgICBcIjEyM1wiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLnvbDoibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlsI/mta7lnJZcIixcbiAgICAgICAgXCLluJZcIjoyLFxuICAgICAgICBcInBvaW50XCI6NlxuICAgIH0sXG4gICAgXCIxMjVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5ouQ5YWrXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjhcbiAgICB9LFxuICAgIFwiMTI2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuaLkOS5nVwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo5XG4gICAgfSxcbiAgICBcIjEzM1wiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlt53kuINcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6N1xuICAgIH0sXG4gICAgXCIxMzRcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5pKu5YWrXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjhcbiAgICB9LFxuICAgIFwiMTM1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuaSruS5nVwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo5XG4gICAgfSxcbiAgICBcIjEzNlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmkq7ljYFcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjEwXG4gICAgfSxcbiAgICBcIjE0NFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLkuIHkuZ1cIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6OVxuICAgIH0sXG4gICAgXCIxNDVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5oCl54Gr6ZG9XCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEwXG4gICAgfSxcbiAgICBcIjE1NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlsI/pjpdcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTFcbiAgICB9LFxuICAgIFwiMTU2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuiFsOabsue4t1wiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMlxuICAgIH0sXG4gICAgXCIxNjFcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5aSn6IKaXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjhcbiAgICB9LFxuICAgIFwiMTY2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWkp+mOl1wiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxM1xuICAgIH0sXG4gICAgXCIyMjJcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi6LOe6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5ouN5p2/5YWSXCIsXG4gICAgICAgIFwi5biWXCI6MTEsXG4gICAgICAgIFwicG9pbnRcIjo2XG4gICAgfSxcbiAgICBcIjIyM1wiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlpL7kuINcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6N1xuICAgIH0sXG4gICAgXCIyMjRcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5aS+5YWrXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjhcbiAgICB9LFxuICAgIFwiMjI1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWkvuS5nVwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo5XG4gICAgfSxcbiAgICBcIjIyNlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlpL7ljYFcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6MTBcbiAgICB9LFxuICAgIFwiMjMzXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIum0iOWFq1wiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo4XG4gICAgfSxcbiAgICBcIjIzNFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlprnkuZ1cIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6OVxuICAgIH0sXG4gICAgXCIyMzVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6IOh5Y2BXCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjEwXG4gICAgfSxcbiAgICBcIjIzNlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLpnbTmpaZcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjExXG4gICAgfSxcbiAgICBcIjI0NFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLphonljYFcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6MTBcbiAgICB9LFxuICAgIFwiMjQ1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuS5neS6jFwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMVxuICAgIH0sXG4gICAgXCIyNDZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6LWk5Y2B5LqMXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEyXG4gICAgfSxcbiAgICBcIjI1NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLjhJrop5LlhZJcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTJcbiAgICB9LFxuICAgIFwiMjU2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuaaruWuv1wiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxM1xuICAgIH0sXG4gICAgXCIyNjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi56+z56+lXCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjE0XG4gICAgfSxcbiAgICBcIjMzM1wiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLptIjooYzlhZJcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjlcbiAgICB9LFxuICAgIFwiMzM0XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuibvueciVwiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjoxMFxuICAgIH0sXG4gICAgXCIzMzVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5Kyj8KmfkOWFklwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMVxuICAgIH0sXG4gICAgXCIzMzZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5qKd5be+XCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEyXG4gICAgfSxcbiAgICBcIjM0NFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLntIXptrRcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTFcbiAgICB9LFxuICAgIFwiMzQ1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuiKsee+lFwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMlxuICAgIH0sXG4gICAgXCIzNDZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6YeO6Zue6aCCXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEzXG4gICAgfSxcbiAgICBcIjM1NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLnmoHptrRcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTNcbiAgICB9LFxuICAgIFwiMzU2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuinkuaQnFwiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjoxNFxuICAgIH0sXG4gICAgXCIzNjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6ami5Zi0XCIsXG4gICAgICAgIFwi5biWXCI6MSxcbiAgICAgICAgXCJwb2ludFwiOjE1XG4gICAgfSxcbiAgICBcIjQ0NFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLloILljbBcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjEyXG4gICAgfSxcbiAgICBcIjQ0NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlhavkupRcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTNcbiAgICB9LFxuICAgIFwiNDQ2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWkp+mWi+mWgFwiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjoxNFxuICAgIH0sXG4gICAgXCI0NTVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5q2j6Ie6XCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjE0XG4gICAgfSxcbiAgICBcIjQ1NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLppqzou41cIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjE1XG4gICAgfSxcbiAgICBcIjQ2NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLotaTniZtcIixcbiAgICAgICAgXCLluJZcIjoyLFxuICAgICAgICBcInBvaW50XCI6MTZcbiAgICB9LFxuICAgIFwiNTU1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuiznuiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIuahg+iKsemHjeS6lFwiLFxuICAgICAgICBcIuW4llwiOjExLFxuICAgICAgICBcInBvaW50XCI6MTVcbiAgICB9LFxuICAgIFwiNTU2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIum7keeJm1wiLFxuICAgICAgICBcIuW4llwiOjIsXG4gICAgICAgIFwicG9pbnRcIjoxNlxuICAgIH0sXG4gICAgXCI1NjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi6LOe6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6buR5Y2B5LiDXCIsXG4gICAgICAgIFwi5biWXCI6MTEsXG4gICAgICAgIFwicG9pbnRcIjoxN1xuICAgIH0sXG4gICAgXCI2NjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi6LOe6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi56Kn5rK5XCIsXG4gICAgICAgIFwi5biWXCI6MTEsXG4gICAgICAgIFwicG9pbnRcIjoxOFxuICAgIH1cbn0iXX0=
