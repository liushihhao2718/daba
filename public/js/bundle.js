(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
	function Player(_name) {
		_classCallCheck(this, Player);

		this.name = _name;
		this.本采 = undefined;
		this.帖數 = 0;
		this.馬 = [];
	}

	_createClass(Player, [{
		key: "\u672A\u8A2D\u672C\u91C7",
		get: function get() {
			return this.本采 === undefined;
		}
	}]);

	return Player;
}();

module.exports = Player;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var state = {
	players: [],
	current_player_index: 0,
	get current_player() {
		return this.players[this.current_player_index];
	},
	上回采色: undefined
};
exports.default = state;

},{}],3:[function(require,module,exports){
'use strict';

var _ = require('./\u6253\u99AC');

var 打馬 = _interopRequireWildcard(_);

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _rule = require('./rule');

var Rule = _interopRequireWildcard(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var 獎金 = 100;

function init() {
	_State2.default.players = setPlayer(3);
	document.body.addEventListener('click', function () {
		round({
			type: 'round'
		});
	});
}
function setPlayer(number) {
	var Player = require('./Player.js');

	var players = [];
	for (var i = 1; i <= number; i++) {
		var p = new Player('player-' + i);
		players.push(p);
	}
	return players;
}

function round(action) {
	switch (action.type) {
		case 'round':
			diceAction();
			break;
		case 'penalty':
			horseAction();
			break;
	}
}

function diceAction() {
	var dice = 打馬.throwDice3();
	var result = 打馬._采色(dice);
	var player = _State2.default.current_player;

	if (Rule._初次散采(采色)) {
		打馬.set本采(result, player);
	} else if (Rule._自己真本彩(采色)) {} else if (Rule.find真本采(采色)) {
		var _player = Rule._別人真本采(采色);
	}
	_State2.default.上回采色 = result;
	打馬.nextPlayer();
}

function horseAction() {}
init();

},{"./Player.js":1,"./State":2,"./rule":4,"./打馬":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.find真本采 = find真本采;
exports._真撞 = _真撞;
exports._傍撞 = _傍撞;
exports._自己真本彩 = _自己真本彩;
exports._初次散采 = _初次散采;
exports._別人真本采 = _別人真本采;
exports._別人傍本采 = _別人傍本采;
exports._自己傍本采 = _自己傍本采;

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function find真本采(采色) {
	return _State2.default.players.some(function (p) {
		return p.本采 == 采色;
	});
}

function _真撞(采色) {
	return _State2.default.上回采色 === 采色;
}
function _傍撞(采色) {
	return _State2.default.上回采色.point === 采色.point;
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
	return player.未設本采 && 采色.type === '散采' && _別人傍本采(采色) === undefined;
}
/**
 * @typedef {Object} Player
 * @returns {Player}
 */
function _別人真本采(采色) {
	return _State2.default.players.find(function (x) {
		return x.本采 === 采色;
	});
}
/**
 * @returns {Player} 別人
 */
function _別人傍本采(采色) {
	if (采色.type === '賞色') return undefined;else return _State2.default.players.find(function (player) {
		return player.point === 采色.point;
	});
}

function _自己傍本采(采色) {
	var player = _State2.default.current_player;
	if (player.point === 采色.point && 采色.type !== '罰色') return true;else return false;
}

},{"./State":2}],5:[function(require,module,exports){
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
	switch (采色.type) {
		case '賞采':

			break;
		case '罰采':
			break;
	}
}

function 賞采賞帖(采色) {
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
			N = 6;
			break;
		default:
	}

	return N;
}

},{"./State":2,"./rule":4,"./采色圖.json":6}],6:[function(require,module,exports){
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
},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvUGxheWVyLmpzIiwic3JjL1N0YXRlLmpzIiwic3JjL21haW4uanMiLCJzcmMvcnVsZS5qcyIsInNyYy/miZPppqwuanMiLCJzcmMv6YeH6Imy5ZyWLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7SUNBTSxNO0FBQ0wsaUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUNsQixPQUFLLElBQUwsR0FBWSxLQUFaO0FBQ0EsT0FBSyxFQUFMLEdBQVUsU0FBVjtBQUNBLE9BQUssRUFBTCxHQUFVLENBQVY7QUFDQSxPQUFLLENBQUwsR0FBUyxFQUFUO0FBQ0E7Ozs7c0JBRVU7QUFDVixVQUFRLEtBQUssRUFBTCxLQUFZLFNBQXBCO0FBQ0E7Ozs7OztBQUdGLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7Ozs7QUNiQSxJQUFJLFFBQVE7QUFDWCxVQUFTLEVBREU7QUFFWCx1QkFBc0IsQ0FGWDtBQUdYLEtBQUksY0FBSixHQUFxQjtBQUNwQixTQUFPLEtBQUssT0FBTCxDQUFhLEtBQUssb0JBQWxCLENBQVA7QUFDQSxFQUxVO0FBTVgsT0FBTTtBQU5LLENBQVo7a0JBUWUsSzs7Ozs7QUNSZjs7SUFBWSxFOztBQUNaOzs7O0FBQ0E7O0lBQVksSTs7Ozs7O0FBQ1osSUFBSSxLQUFLLEdBQVQ7O0FBR0EsU0FBUyxJQUFULEdBQWU7QUFDZCxpQkFBTSxPQUFOLEdBQWdCLFVBQVUsQ0FBVixDQUFoQjtBQUNBLFVBQVMsSUFBVCxDQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFlBQUk7QUFDM0MsUUFBTTtBQUNMLFNBQUs7QUFEQSxHQUFOO0FBR0EsRUFKRDtBQUtBO0FBQ0QsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCO0FBQzFCLEtBQU0sU0FBUyxRQUFRLGFBQVIsQ0FBZjs7QUFFQSxLQUFJLFVBQVUsRUFBZDtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIFBsYXllciB7XG5cdGNvbnN0cnVjdG9yKF9uYW1lKSB7XG5cdFx0dGhpcy5uYW1lID0gX25hbWU7XG5cdFx0dGhpcy7mnKzph4cgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy7luJbmlbggPSAwO1xuXHRcdHRoaXMu6aasID0gW107XG5cdH1cblxuXHRnZXQg5pyq6Kit5pys6YeHKCkge1xuXHRcdHJldHVybiAodGhpcy7mnKzph4cgPT09IHVuZGVmaW5lZCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7IiwibGV0IHN0YXRlID0ge1xuXHRwbGF5ZXJzOiBbXSxcblx0Y3VycmVudF9wbGF5ZXJfaW5kZXg6IDAsXG5cdGdldCBjdXJyZW50X3BsYXllcigpIHtcblx0XHRyZXR1cm4gdGhpcy5wbGF5ZXJzW3RoaXMuY3VycmVudF9wbGF5ZXJfaW5kZXhdO1xuXHR9LFxuXHTkuIrlm57ph4foibI6IHVuZGVmaW5lZFxufTtcbmV4cG9ydCBkZWZhdWx0IHN0YXRlOyIsImltcG9ydCAqIGFzIOaJk+mmrCBmcm9tICcuL+aJk+mmrCc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi9TdGF0ZSc7XG5pbXBvcnQgKiBhcyBSdWxlIGZyb20gJy4vcnVsZSc7XG5sZXQg542O6YeRID0gMTAwO1xuXG5cbmZ1bmN0aW9uIGluaXQoKXtcblx0c3RhdGUucGxheWVycyA9IHNldFBsYXllcigzKTtcblx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG5cdFx0cm91bmQoe1xuXHRcdFx0dHlwZToncm91bmQnLFxuXHRcdH0pO1xuXHR9KTtcbn1cbmZ1bmN0aW9uIHNldFBsYXllcihudW1iZXIpIHtcblx0Y29uc3QgUGxheWVyID0gcmVxdWlyZSgnLi9QbGF5ZXIuanMnKTtcblxuXHRsZXQgcGxheWVycyA9IFtdO1xuXHRmb3IgKHZhciBpID0gMTsgaSA8PSBudW1iZXI7IGkrKykge1xuXHRcdGNvbnN0IHAgPSBuZXcgUGxheWVyKGBwbGF5ZXItJHtpfWApO1xuXHRcdHBsYXllcnMucHVzaChwKTtcblx0fVxuXHRyZXR1cm4gcGxheWVycztcbn1cblxuZnVuY3Rpb24gcm91bmQoYWN0aW9uKSB7XG5cdHN3aXRjaChhY3Rpb24udHlwZSl7XG5cdFx0Y2FzZSAncm91bmQnOlxuXHRcdFx0ZGljZUFjdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAncGVuYWx0eSc6XG5cdFx0XHRob3JzZUFjdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdH1cbn1cblxuXG5mdW5jdGlvbiBkaWNlQWN0aW9uKCl7XG5cdGxldCBkaWNlID0g5omT6aasLnRocm93RGljZTMoKTtcblx0bGV0IHJlc3VsdCA9IOaJk+mmrC5f6YeH6ImyKGRpY2UpO1xuXHRsZXQgcGxheWVyID0gc3RhdGUuY3VycmVudF9wbGF5ZXI7XG5cdFxuXHRpZiggUnVsZS5f5Yid5qyh5pWj6YeHKOmHh+iJsikgKSB7XG5cdFx05omT6aasLnNldOacrOmHhyhyZXN1bHQscGxheWVyKTtcblx0fVxuXHRlbHNlIGlmKCBSdWxlLl/oh6rlt7HnnJ/mnKzlvako6YeH6ImyKSApIHtcblx0fWVsc2UgaWYoIFJ1bGUuZmluZOecn+acrOmHhyjph4foibIpICkge1xuXHRcdGxldCBwbGF5ZXIgPSBSdWxlLl/liKXkurrnnJ/mnKzph4co6YeH6ImyKTtcblx0XHRcblx0fVxuXHRzdGF0ZS7kuIrlm57ph4foibIgPSByZXN1bHQ7XG5cdOaJk+mmrC5uZXh0UGxheWVyKCk7XG59XG5cbmZ1bmN0aW9uIGhvcnNlQWN0aW9uKCl7XG5cbn1cbmluaXQoKTtcbiIsImltcG9ydCBzdGF0ZSBmcm9tJy4vU3RhdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZOecn+acrOmHhyjph4foibIpIHtcblx0cmV0dXJuIHN0YXRlLnBsYXllcnMuc29tZSgocCk9Pntcblx0XHRyZXR1cm4gcC7mnKzph4cgPT0g6YeH6ImyO1xuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF/nnJ/mkp4o6YeH6ImyKSB7XG5cdHJldHVybiBzdGF0ZS7kuIrlm57ph4foibIgPT09IOmHh+iJsjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBf5YKN5pKeKOmHh+iJsikge1xuXHRyZXR1cm4gc3RhdGUu5LiK5Zue6YeH6ImyLnBvaW50ID09PSDph4foibIucG9pbnQ7XG59XG4vKipcbiAqIEByZXR1cm5zIHtib29sfVxuICovXG5leHBvcnQgZnVuY3Rpb24gX+iHquW3seecn+acrOW9qSjph4foibIpIHtcblx0bGV0IHBsYXllciA9IHN0YXRlLmN1cnJlbnRfcGxheWVyO1xuXHRyZXR1cm4gcGxheWVyLuacrOmHhyA9PSDph4foibI7XG59XG4vKipcbiAqIEByZXR1cm5zIHtib29sfVxuICovXG5leHBvcnQgZnVuY3Rpb24gX+WIneasoeaVo+mHhyjph4foibIpIHtcblx0bGV0IHBsYXllciA9IHN0YXRlLmN1cnJlbnRfcGxheWVyO1xuXHRyZXR1cm4gKFxuXHRcdHBsYXllci7mnKroqK3mnKzph4dcblx0XHQmJiDph4foibIudHlwZSA9PT0gJ+aVo+mHhydcblx0XHQmJiBf5Yil5Lq65YKN5pys6YeHKOmHh+iJsikgPT09IHVuZGVmaW5lZFxuXHQpO1xufVxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQbGF5ZXJcbiAqIEByZXR1cm5zIHtQbGF5ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBf5Yil5Lq655yf5pys6YeHKOmHh+iJsikge1xuXHRyZXR1cm4gc3RhdGUucGxheWVycy5maW5kKHggPT4ge1xuXHRcdHJldHVybiAoeC7mnKzph4cgPT09IOmHh+iJsik7XG5cdH0pO1xufVxuLyoqXG4gKiBAcmV0dXJucyB7UGxheWVyfSDliKXkurpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF/liKXkurrlgo3mnKzph4co6YeH6ImyKXtcblx0aWYo6YeH6ImyLnR5cGUgPT09ICfos57oibInKVxuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdGVsc2VcdFxuXHRcdHJldHVybiBzdGF0ZS5wbGF5ZXJzLmZpbmQocGxheWVyID0+IHtcblx0XHRcdHJldHVybiAocGxheWVyLnBvaW50ID09PSDph4foibIucG9pbnQpO1xuXHRcdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX+iHquW3seWCjeacrOmHhyjph4foibIpe1xuXHRsZXQgcGxheWVyID0gc3RhdGUuY3VycmVudF9wbGF5ZXI7XG5cdGlmKHBsYXllci5wb2ludCA9PT0g6YeH6ImyLnBvaW50ICYmIOmHh+iJsi50eXBlICE9PSAn572w6ImyJylcblx0XHRyZXR1cm4gdHJ1ZTtcblx0ZWxzZVxuXHRcdHJldHVybiBmYWxzZTtcbn0iLCJpbXBvcnQgc3RhdGUgZnJvbScuL1N0YXRlJztcbmltcG9ydCAqIGFzIHJ1bGUgZnJvbSAnLi9ydWxlJztcblxuZXhwb3J0XHRmdW5jdGlvbiBuZXh0UGxheWVyKCkge1xuXHRsZXQgaW5kZXggPSBzdGF0ZS5jdXJyZW50X3BsYXllcl9pbmRleDtcblx0aW5kZXggPSAoaW5kZXggKyAxKSAlIHN0YXRlLnBsYXllcnMubGVuZ3RoO1xuXHRzdGF0ZS5jdXJyZW50X3BsYXllcl9pbmRleCA9IGluZGV4O1xufVxuXG5leHBvcnRcdGZ1bmN0aW9uIF/ph4foibIoZGljZTMpIHtcblx0Y29uc3QgdGFibGUgPSByZXF1aXJlKCcuL+mHh+iJsuWcli5qc29uJyk7XG5cblx0cmV0dXJuIHRhYmxlW3RvS2V5KGRpY2UzKV07XG5cblx0ZnVuY3Rpb24gdG9LZXkoZGljZTMpIHtcblx0XHRsZXQgc29ydGVkID0gZGljZTMuc29ydCgpO1xuXHRcdHJldHVybiBgJHtzb3J0ZWRbMF19JHtzb3J0ZWRbMV19JHtzb3J0ZWRbMl19YDtcblx0fVxufVxuZXhwb3J0XHRmdW5jdGlvbiB0aHJvd0RpY2UzKCkge1xuXHRyZXR1cm4gW1xuXHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMSxcblx0XHRNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDEsXG5cdFx0TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxXG5cdF07XG59XG5cbmV4cG9ydFx0ZnVuY3Rpb24gc2V05pys6YeHKOmHh+iJsiwgcGxheWVyKSB7XG5cdGlmICjph4foibIudHlwZSA9PT0gJ+aVo+mHhycgXG5cdFx0JiYgIXJ1bGUuZmluZOecn+acrOmHhyjph4foibIpXG5cdClcblx0XHRwbGF5ZXIu5pys6YeHID0g6YeH6ImyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX+iznue9sOmHhyjph4foibIpIHtcblx0bGV0IHBsYXllciA9IHN0YXRlLmN1cnJlbnRfcGxheWVyO1xuXHRzd2l0Y2go6YeH6ImyLnR5cGUpIHtcblx0XHRjYXNlICfos57ph4cnOlxuXHRcdFx0XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICfnvbDph4cnOlxuXHRcdFx0YnJlYWs7XG5cdH1cbn1cblxuZnVuY3Rpb24g6LOe6YeH6LOe5biWKCDph4foibIgKXtcblx0bGV0IE4gPSAwO1xuXHRzd2l0Y2go6YeH6ImyLm5hbWUpIHtcblx0XHRjYXNlICfloILljbAnOlxuXHRcdFx0TiA9IDg7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICfnoqfmsrknOlxuXHRcdFx0TiA9IDY7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICfmoYPoirHph43kupQnOlxuXHRcdFx0TiA9IDU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICfmi43mnb/lhZInOlxuXHRcdGNhc2UgJ+m0iOihjOWFkic6XG5cdFx0Y2FzZSAn5ru/55uG5pifJzpcblx0XHRcdE4gPSA2O1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0fVxuXG5cdHJldHVybiBOO1xufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiMTExXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuiznuiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIua7v+ebhuaYn1wiLFxuICAgICAgICBcIuW4llwiOjExLFxuICAgICAgICBcInBvaW50XCI6M1xuICAgIH0sXG4gICAgXCIxMTJcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi572w6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5bCP5aiY5a2QXCIsXG4gICAgICAgIFwi5biWXCI6MixcbiAgICAgICAgXCJwb2ludFwiOjRcbiAgICB9LFxuICAgIFwiMTEzXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuiRq+iYhlwiLFxuICAgICAgICBcIuW4llwiOjIsXG4gICAgICAgIFwicG9pbnRcIjo1XG4gICAgfSxcbiAgICBcIjExNFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmi5DkuINcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6NlxuICAgIH0sXG4gICAgXCIxMTVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi55m95LiDXCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjdcbiAgICB9LFxuICAgIFwiMTIyXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWwj+WYtFwiLFxuICAgICAgICBcIuW4llwiOjIsXG4gICAgICAgIFwicG9pbnRcIjo1XG4gICAgfSxcbiAgICBcIjEyM1wiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLnvbDoibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlsI/mta7lnJZcIixcbiAgICAgICAgXCLluJZcIjoyLFxuICAgICAgICBcInBvaW50XCI6NlxuICAgIH0sXG4gICAgXCIxMjVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5ouQ5YWrXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjhcbiAgICB9LFxuICAgIFwiMTI2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuaLkOS5nVwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo5XG4gICAgfSxcbiAgICBcIjEzM1wiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlt53kuINcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6N1xuICAgIH0sXG4gICAgXCIxMzRcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5pKu5YWrXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjhcbiAgICB9LFxuICAgIFwiMTM1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuaSruS5nVwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo5XG4gICAgfSxcbiAgICBcIjEzNlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmkq7ljYFcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjEwXG4gICAgfSxcbiAgICBcIjE0NFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLkuIHkuZ1cIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6OVxuICAgIH0sXG4gICAgXCIxNDVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5oCl54Gr6ZG9XCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEwXG4gICAgfSxcbiAgICBcIjE1NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlsI/pjpdcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTFcbiAgICB9LFxuICAgIFwiMTU2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuiFsOabsue4t1wiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMlxuICAgIH0sXG4gICAgXCIxNjFcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5aSn6IKaXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjhcbiAgICB9LFxuICAgIFwiMTY2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWkp+mOl1wiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxM1xuICAgIH0sXG4gICAgXCIyMjJcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi6LOe6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5ouN5p2/5YWSXCIsXG4gICAgICAgIFwi5biWXCI6MTEsXG4gICAgICAgIFwicG9pbnRcIjo2XG4gICAgfSxcbiAgICBcIjIyM1wiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlpL7kuINcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6N1xuICAgIH0sXG4gICAgXCIyMjRcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5aS+5YWrXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjhcbiAgICB9LFxuICAgIFwiMjI1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWkvuS5nVwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo5XG4gICAgfSxcbiAgICBcIjIyNlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlpL7ljYFcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6MTBcbiAgICB9LFxuICAgIFwiMjMzXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIum0iOWFq1wiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo4XG4gICAgfSxcbiAgICBcIjIzNFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlprnkuZ1cIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6OVxuICAgIH0sXG4gICAgXCIyMzVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6IOh5Y2BXCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjEwXG4gICAgfSxcbiAgICBcIjIzNlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLpnbTmpaZcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjExXG4gICAgfSxcbiAgICBcIjI0NFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLphonljYFcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6MTBcbiAgICB9LFxuICAgIFwiMjQ1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuS5neS6jFwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMVxuICAgIH0sXG4gICAgXCIyNDZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6LWk5Y2B5LqMXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEyXG4gICAgfSxcbiAgICBcIjI1NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLjhJrop5LlhZJcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTJcbiAgICB9LFxuICAgIFwiMjU2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuaaruWuv1wiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxM1xuICAgIH0sXG4gICAgXCIyNjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi56+z56+lXCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjE0XG4gICAgfSxcbiAgICBcIjMzM1wiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLptIjooYzlhZJcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjlcbiAgICB9LFxuICAgIFwiMzM0XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuibvueciVwiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjoxMFxuICAgIH0sXG4gICAgXCIzMzVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5Kyj8KmfkOWFklwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMVxuICAgIH0sXG4gICAgXCIzMzZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5qKd5be+XCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEyXG4gICAgfSxcbiAgICBcIjM0NFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLntIXptrRcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTFcbiAgICB9LFxuICAgIFwiMzQ1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuiKsee+lFwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMlxuICAgIH0sXG4gICAgXCIzNDZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6YeO6Zue6aCCXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEzXG4gICAgfSxcbiAgICBcIjM1NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLnmoHptrRcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTNcbiAgICB9LFxuICAgIFwiMzU2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuinkuaQnFwiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjoxNFxuICAgIH0sXG4gICAgXCIzNjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6ami5Zi0XCIsXG4gICAgICAgIFwi5biWXCI6MSxcbiAgICAgICAgXCJwb2ludFwiOjE1XG4gICAgfSxcbiAgICBcIjQ0NFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLloILljbBcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjEyXG4gICAgfSxcbiAgICBcIjQ0NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlhavkupRcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTNcbiAgICB9LFxuICAgIFwiNDQ2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWkp+mWi+mWgFwiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjoxNFxuICAgIH0sXG4gICAgXCI0NTVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5q2j6Ie6XCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjE0XG4gICAgfSxcbiAgICBcIjQ1NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLppqzou41cIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjE1XG4gICAgfSxcbiAgICBcIjQ2NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLotaTniZtcIixcbiAgICAgICAgXCLluJZcIjoyLFxuICAgICAgICBcInBvaW50XCI6MTZcbiAgICB9LFxuICAgIFwiNTU1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuiznuiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIuahg+iKsemHjeS6lFwiLFxuICAgICAgICBcIuW4llwiOjExLFxuICAgICAgICBcInBvaW50XCI6MTVcbiAgICB9LFxuICAgIFwiNTU2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIum7keeJm1wiLFxuICAgICAgICBcIuW4llwiOjIsXG4gICAgICAgIFwicG9pbnRcIjoxNlxuICAgIH0sXG4gICAgXCI1NjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi6LOe6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6buR5Y2B5LiDXCIsXG4gICAgICAgIFwi5biWXCI6MTEsXG4gICAgICAgIFwicG9pbnRcIjoxN1xuICAgIH0sXG4gICAgXCI2NjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi6LOe6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi56Kn5rK5XCIsXG4gICAgICAgIFwi5biWXCI6MTEsXG4gICAgICAgIFwicG9pbnRcIjoxOFxuICAgIH1cbn0iXX0=
