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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var 獎金 = 100;

function init() {
	_State2.default.players = setPlayer(3);
	document.body.addEventListener('click', function () {
		round();
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

function round() {
	var dice = 打馬.throwDice3();
	var result = 打馬._采色(dice);
	var player = _State2.default.current_player;
	try {
		打馬._下馬();

		if (player.未設本采) 打馬.set本采(result, player);

		_State2.default.上回采色 = result;
		打馬.nextPlayer();
	} catch (index) {}

	console.log(result);
	console.log(_State2.default);
}

init();

},{"./Player.js":1,"./State":2,"./打馬":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.find真本采 = find真本采;
exports._真撞 = _真撞;
exports._傍撞 = _傍撞;

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
exports._下馬 = _下馬;

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

function _下馬(采色) {
	var horse = 0;
	if (_自己真本彩(采色)) {
		horse = 3;
	} else if (_自己初次真本彩(采色)) {
		horse = 1;
	} else if (rule.find真本采(采色)) {
		var player = _別人真本采(采色);
	}
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
function _自己初次真本彩(采色) {
	var player = _State2.default.current_player;
	return player.未設本采 && 采色.type == '散采' && !rule.find真本采(采色);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvUGxheWVyLmpzIiwic3JjL1N0YXRlLmpzIiwic3JjL21haW4uanMiLCJzcmMvcnVsZS5qcyIsInNyYy/miZPppqwuanMiLCJzcmMv6YeH6Imy5ZyWLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7SUNBTSxNO0FBQ0wsaUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUNsQixPQUFLLElBQUwsR0FBWSxLQUFaO0FBQ0EsT0FBSyxFQUFMLEdBQVUsU0FBVjtBQUNBLE9BQUssRUFBTCxHQUFVLENBQVY7QUFDQSxPQUFLLENBQUwsR0FBUyxFQUFUO0FBQ0E7Ozs7c0JBRVU7QUFDVixVQUFRLEtBQUssRUFBTCxLQUFZLFNBQXBCO0FBQ0E7Ozs7OztBQUdGLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7Ozs7QUNiQSxJQUFJLFFBQVE7QUFDWCxVQUFTLEVBREU7QUFFWCx1QkFBc0IsQ0FGWDtBQUdYLEtBQUksY0FBSixHQUFxQjtBQUNwQixTQUFPLEtBQUssT0FBTCxDQUFhLEtBQUssb0JBQWxCLENBQVA7QUFDQSxFQUxVO0FBTVgsT0FBTTtBQU5LLENBQVo7a0JBUWUsSzs7Ozs7QUNSZjs7SUFBWSxFOztBQUNaOzs7Ozs7OztBQUVBLElBQUksS0FBSyxHQUFUOztBQUdBLFNBQVMsSUFBVCxHQUFlO0FBQ2QsaUJBQU0sT0FBTixHQUFnQixVQUFVLENBQVYsQ0FBaEI7QUFDQSxVQUFTLElBQVQsQ0FBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxZQUFJO0FBQzNDO0FBQ0EsRUFGRDtBQUdBO0FBQ0QsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCO0FBQzFCLEtBQU0sU0FBUyxRQUFRLGFBQVIsQ0FBZjs7QUFFQSxLQUFJLFVBQVUsRUFBZDtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsS0FBSyxNQUFyQixFQUE2QixHQUE3QixFQUFrQztBQUNqQyxN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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBQbGF5ZXIge1xuXHRjb25zdHJ1Y3RvcihfbmFtZSkge1xuXHRcdHRoaXMubmFtZSA9IF9uYW1lO1xuXHRcdHRoaXMu5pys6YeHID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMu5biW5pW4ID0gMDtcblx0XHR0aGlzLummrCA9IFtdO1xuXHR9XG5cblx0Z2V0IOacquioreacrOmHhygpIHtcblx0XHRyZXR1cm4gKHRoaXMu5pys6YeHID09PSB1bmRlZmluZWQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyOyIsImxldCBzdGF0ZSA9IHtcblx0cGxheWVyczogW10sXG5cdGN1cnJlbnRfcGxheWVyX2luZGV4OiAwLFxuXHRnZXQgY3VycmVudF9wbGF5ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucGxheWVyc1t0aGlzLmN1cnJlbnRfcGxheWVyX2luZGV4XTtcblx0fSxcblx05LiK5Zue6YeH6ImyOiB1bmRlZmluZWRcbn07XG5leHBvcnQgZGVmYXVsdCBzdGF0ZTsiLCJpbXBvcnQgKiBhcyDmiZPppqwgZnJvbSAnLi/miZPppqwnO1xuaW1wb3J0IHN0YXRlIGZyb20nLi9TdGF0ZSc7XG5cbmxldCDnjY7ph5EgPSAxMDA7XG5cblxuZnVuY3Rpb24gaW5pdCgpe1xuXHRzdGF0ZS5wbGF5ZXJzID0gc2V0UGxheWVyKDMpO1xuXHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9Pntcblx0XHRyb3VuZCgpO1xuXHR9KTtcbn1cbmZ1bmN0aW9uIHNldFBsYXllcihudW1iZXIpIHtcblx0Y29uc3QgUGxheWVyID0gcmVxdWlyZSgnLi9QbGF5ZXIuanMnKTtcblxuXHRsZXQgcGxheWVycyA9IFtdO1xuXHRmb3IgKHZhciBpID0gMTsgaSA8PSBudW1iZXI7IGkrKykge1xuXHRcdGNvbnN0IHAgPSBuZXcgUGxheWVyKGBwbGF5ZXItJHtpfWApO1xuXHRcdHBsYXllcnMucHVzaChwKTtcblx0fVxuXHRyZXR1cm4gcGxheWVycztcbn1cblxuZnVuY3Rpb24gcm91bmQoKSB7XG5cdGxldCBkaWNlID0g5omT6aasLnRocm93RGljZTMoKTtcblx0bGV0IHJlc3VsdCA9IOaJk+mmrC5f6YeH6ImyKGRpY2UpO1xuXHRsZXQgcGxheWVyID0gc3RhdGUuY3VycmVudF9wbGF5ZXI7XG5cdHRyeXtcblx0XHTmiZPppqwuX+S4i+mmrCgpO1xuXG5cdFx0aWYgKHBsYXllci7mnKroqK3mnKzph4cpIOaJk+mmrC5zZXTmnKzph4cocmVzdWx0LHBsYXllcik7XG5cblx0XHRzdGF0ZS7kuIrlm57ph4foibIgPSByZXN1bHQ7XG5cdFx05omT6aasLm5leHRQbGF5ZXIoKTtcblx0fVxuXHRjYXRjaChpbmRleCl7XG5cdFx0XG5cdH1cblx0XG5cdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdGNvbnNvbGUubG9nKHN0YXRlKTtcbn1cblxuaW5pdCgpO1xuIiwiaW1wb3J0IHN0YXRlIGZyb20nLi9TdGF0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5k55yf5pys6YeHKOmHh+iJsikge1xuXHRyZXR1cm4gc3RhdGUucGxheWVycy5zb21lKChwKT0+e1xuXHRcdHJldHVybiBwLuacrOmHhyA9PSDph4foibI7XG5cdH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIF/nnJ/mkp4o6YeH6ImyKSB7XG5cdHJldHVybiBzdGF0ZS7kuIrlm57ph4foibIgPT09IOmHh+iJsjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBf5YKN5pKeKOmHh+iJsikge1xuXHRyZXR1cm4gc3RhdGUu5LiK5Zue6YeH6ImyLnBvaW50ID09PSDph4foibIucG9pbnQ7XG59IiwiaW1wb3J0IHN0YXRlIGZyb20nLi9TdGF0ZSc7XG5pbXBvcnQgKiBhcyBydWxlIGZyb20gJy4vcnVsZSc7XG5cbmV4cG9ydFx0ZnVuY3Rpb24gbmV4dFBsYXllcigpIHtcblx0bGV0IGluZGV4ID0gc3RhdGUuY3VycmVudF9wbGF5ZXJfaW5kZXg7XG5cdGluZGV4ID0gKGluZGV4ICsgMSkgJSBzdGF0ZS5wbGF5ZXJzLmxlbmd0aDtcblx0c3RhdGUuY3VycmVudF9wbGF5ZXJfaW5kZXggPSBpbmRleDtcbn1cblxuZXhwb3J0XHRmdW5jdGlvbiBf6YeH6ImyKGRpY2UzKSB7XG5cdGNvbnN0IHRhYmxlID0gcmVxdWlyZSgnLi/ph4foibLlnJYuanNvbicpO1xuXG5cdHJldHVybiB0YWJsZVt0b0tleShkaWNlMyldO1xuXG5cdGZ1bmN0aW9uIHRvS2V5KGRpY2UzKSB7XG5cdFx0bGV0IHNvcnRlZCA9IGRpY2UzLnNvcnQoKTtcblx0XHRyZXR1cm4gYCR7c29ydGVkWzBdfSR7c29ydGVkWzFdfSR7c29ydGVkWzJdfWA7XG5cdH1cbn1cbmV4cG9ydFx0ZnVuY3Rpb24gdGhyb3dEaWNlMygpIHtcblx0cmV0dXJuIFtcblx0XHRNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDEsXG5cdFx0TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxLFxuXHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMVxuXHRdO1xufVxuXG5leHBvcnRcdGZ1bmN0aW9uIHNldOacrOmHhyjph4foibIsIHBsYXllcikge1xuXHRpZiAo6YeH6ImyLnR5cGUgPT09ICfmlaPph4cnIFxuXHRcdCYmICFydWxlLmZpbmTnnJ/mnKzph4co6YeH6ImyKVxuXHQpXG5cdFx0cGxheWVyLuacrOmHhyA9IOmHh+iJsjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF/os57nvbDph4co6YeH6ImyKSB7XG5cdGxldCBwbGF5ZXIgPSBzdGF0ZS5jdXJyZW50X3BsYXllcjtcblx0c3dpdGNoKOmHh+iJsi50eXBlKSB7XG5cdFx0Y2FzZSAn6LOe6YeHJzpcblx0XHRcdFxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAn572w6YeHJzpcblx0XHRcdGJyZWFrO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBf5LiL6aasKOmHh+iJsil7XG5cdGxldCBob3JzZSA9IDA7XG5cdGlmKCBf6Ieq5bex55yf5pys5b2pKOmHh+iJsikgKSB7XG5cdFx0aG9yc2UgPSAzO1xuXHR9ZWxzZSBpZiggX+iHquW3seWIneasoeecn+acrOW9qSjph4foibIpICkge1xuXHRcdGhvcnNlID0gMTtcblx0fWVsc2UgaWYoIHJ1bGUuZmluZOecn+acrOmHhyjph4foibIpICkge1xuXHRcdGxldCBwbGF5ZXIgPSBf5Yil5Lq655yf5pys6YeHKOmHh+iJsik7XG5cdFx0XG5cdH1cbn1cbi8qKlxuICogQHJldHVybnMge2Jvb2x9XG4gKi9cbmZ1bmN0aW9uIF/oh6rlt7HnnJ/mnKzlvako6YeH6ImyKSB7XG5cdGxldCBwbGF5ZXIgPSBzdGF0ZS5jdXJyZW50X3BsYXllcjtcblx0cmV0dXJuIHBsYXllci7mnKzph4cgPT0g6YeH6ImyO1xufVxuLyoqXG4gKiBAcmV0dXJucyB7Ym9vbH1cbiAqL1xuZnVuY3Rpb24gX+iHquW3seWIneasoeecn+acrOW9qSjph4foibIpIHtcblx0bGV0IHBsYXllciA9IHN0YXRlLmN1cnJlbnRfcGxheWVyO1xuXHRyZXR1cm4gKFxuXHRcdHBsYXllci7mnKroqK3mnKzph4dcblx0XHQmJiDph4foibIudHlwZSA9PSAn5pWj6YeHJ1xuXHRcdCYmICFydWxlLmZpbmTnnJ/mnKzph4co6YeH6ImyKVxuXHQpO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBsYXllclxuICogQHJldHVybnMge1BsYXllcn1cbiAqL1xuZnVuY3Rpb24gX+WIpeS6uuecn+acrOmHhyjph4foibIpIHtcblx0cmV0dXJuIHN0YXRlLnBsYXllcnMuZmluZCh4ID0+IHtcblx0XHRyZXR1cm4gKHgu5pys6YeHID09PSDph4foibIpO1xuXHR9KTtcbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCIxMTFcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi6LOe6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5ru/55uG5pifXCIsXG4gICAgICAgIFwi5biWXCI6MTEsXG4gICAgICAgIFwicG9pbnRcIjozXG4gICAgfSxcbiAgICBcIjExMlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLnvbDoibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlsI/lqJjlrZBcIixcbiAgICAgICAgXCLluJZcIjoyLFxuICAgICAgICBcInBvaW50XCI6NFxuICAgIH0sXG4gICAgXCIxMTNcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6JGr6JiGXCIsXG4gICAgICAgIFwi5biWXCI6MixcbiAgICAgICAgXCJwb2ludFwiOjVcbiAgICB9LFxuICAgIFwiMTE0XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuaLkOS4g1wiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjo2XG4gICAgfSxcbiAgICBcIjExNVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLnmb3kuINcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6N1xuICAgIH0sXG4gICAgXCIxMjJcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5bCP5Zi0XCIsXG4gICAgICAgIFwi5biWXCI6MixcbiAgICAgICAgXCJwb2ludFwiOjVcbiAgICB9LFxuICAgIFwiMTIzXCI6e1xuICAgICAgICBcInR5cGVcIjpcIue9sOiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIuWwj+a1ruWcllwiLFxuICAgICAgICBcIuW4llwiOjIsXG4gICAgICAgIFwicG9pbnRcIjo2XG4gICAgfSxcbiAgICBcIjEyNVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmi5DlhatcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6OFxuICAgIH0sXG4gICAgXCIxMjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5ouQ5LmdXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjlcbiAgICB9LFxuICAgIFwiMTMzXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuW3neS4g1wiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjo3XG4gICAgfSxcbiAgICBcIjEzNFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmkq7lhatcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6OFxuICAgIH0sXG4gICAgXCIxMzVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5pKu5LmdXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjlcbiAgICB9LFxuICAgIFwiMTM2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuiznuiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIuaSruWNgVwiLFxuICAgICAgICBcIuW4llwiOjExLFxuICAgICAgICBcInBvaW50XCI6MTBcbiAgICB9LFxuICAgIFwiMTQ0XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuS4geS5nVwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo5XG4gICAgfSxcbiAgICBcIjE0NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmgKXngavpkb1cIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTBcbiAgICB9LFxuICAgIFwiMTU1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWwj+mOl1wiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMVxuICAgIH0sXG4gICAgXCIxNTZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6IWw5puy57i3XCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEyXG4gICAgfSxcbiAgICBcIjE2MVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlpKfogppcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6OFxuICAgIH0sXG4gICAgXCIxNjZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5aSn6Y6XXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEzXG4gICAgfSxcbiAgICBcIjIyMlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmi43mnb/lhZJcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjZcbiAgICB9LFxuICAgIFwiMjIzXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWkvuS4g1wiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjo3XG4gICAgfSxcbiAgICBcIjIyNFwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLlpL7lhatcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6OFxuICAgIH0sXG4gICAgXCIyMjVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5aS+5LmdXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjlcbiAgICB9LFxuICAgIFwiMjI2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWkvuWNgVwiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjoxMFxuICAgIH0sXG4gICAgXCIyMzNcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6bSI5YWrXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjhcbiAgICB9LFxuICAgIFwiMjM0XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWmueS5nVwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjo5XG4gICAgfSxcbiAgICBcIjIzNVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLog6HljYFcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6MTBcbiAgICB9LFxuICAgIFwiMjM2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuiznuiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIumdtOalplwiLFxuICAgICAgICBcIuW4llwiOjExLFxuICAgICAgICBcInBvaW50XCI6MTFcbiAgICB9LFxuICAgIFwiMjQ0XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIumGieWNgVwiLFxuICAgICAgICBcIuW4llwiOjQsXG4gICAgICAgIFwicG9pbnRcIjoxMFxuICAgIH0sXG4gICAgXCIyNDVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5Lmd5LqMXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjExXG4gICAgfSxcbiAgICBcIjI0NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLotaTljYHkuoxcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTJcbiAgICB9LFxuICAgIFwiMjU1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuOEmuinkuWFklwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMlxuICAgIH0sXG4gICAgXCIyNTZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5pqu5a6/XCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEzXG4gICAgfSxcbiAgICBcIjI2NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLnr7Pnr6VcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6MTRcbiAgICB9LFxuICAgIFwiMzMzXCI6e1xuICAgICAgICBcInR5cGVcIjpcIuiznuiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIum0iOihjOWFklwiLFxuICAgICAgICBcIuW4llwiOjExLFxuICAgICAgICBcInBvaW50XCI6OVxuICAgIH0sXG4gICAgXCIzMzRcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6Ju+55yJXCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjEwXG4gICAgfSxcbiAgICBcIjMzNVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLkrKPwqZ+Q5YWSXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjExXG4gICAgfSxcbiAgICBcIjMzNlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmop3lt75cIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTJcbiAgICB9LFxuICAgIFwiMzQ0XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIue0hem2tFwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxMVxuICAgIH0sXG4gICAgXCIzNDVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6Iqx576UXCIsXG4gICAgICAgIFwi5biWXCI6NSxcbiAgICAgICAgXCJwb2ludFwiOjEyXG4gICAgfSxcbiAgICBcIjM0NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLph47pm57poIJcIixcbiAgICAgICAgXCLluJZcIjo1LFxuICAgICAgICBcInBvaW50XCI6MTNcbiAgICB9LFxuICAgIFwiMzU1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIueagem2tFwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxM1xuICAgIH0sXG4gICAgXCIzNTZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6KeS5pCcXCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjE0XG4gICAgfSxcbiAgICBcIjM2NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLpqaLlmLRcIixcbiAgICAgICAgXCLluJZcIjoxLFxuICAgICAgICBcInBvaW50XCI6MTVcbiAgICB9LFxuICAgIFwiNDQ0XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuiznuiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIuWgguWNsFwiLFxuICAgICAgICBcIuW4llwiOjExLFxuICAgICAgICBcInBvaW50XCI6MTJcbiAgICB9LFxuICAgIFwiNDQ1XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIuWFq+S6lFwiLFxuICAgICAgICBcIuW4llwiOjUsXG4gICAgICAgIFwicG9pbnRcIjoxM1xuICAgIH0sXG4gICAgXCI0NDZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5aSn6ZaL6ZaAXCIsXG4gICAgICAgIFwi5biWXCI6NCxcbiAgICAgICAgXCJwb2ludFwiOjE0XG4gICAgfSxcbiAgICBcIjQ1NVwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLmlaPph4dcIixcbiAgICAgICAgXCJuYW1lXCI6XCLmraPoh7pcIixcbiAgICAgICAgXCLluJZcIjo0LFxuICAgICAgICBcInBvaW50XCI6MTRcbiAgICB9LFxuICAgIFwiNDU2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuiznuiJslwiLFxuICAgICAgICBcIm5hbWVcIjpcIummrOi7jVwiLFxuICAgICAgICBcIuW4llwiOjExLFxuICAgICAgICBcInBvaW50XCI6MTVcbiAgICB9LFxuICAgIFwiNDY2XCI6e1xuICAgICAgICBcInR5cGVcIjpcIuaVo+mHh1wiLFxuICAgICAgICBcIm5hbWVcIjpcIui1pOeJm1wiLFxuICAgICAgICBcIuW4llwiOjIsXG4gICAgICAgIFwicG9pbnRcIjoxNlxuICAgIH0sXG4gICAgXCI1NTVcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi6LOe6ImyXCIsXG4gICAgICAgIFwibmFtZVwiOlwi5qGD6Iqx6YeN5LqUXCIsXG4gICAgICAgIFwi5biWXCI6MTEsXG4gICAgICAgIFwicG9pbnRcIjoxNVxuICAgIH0sXG4gICAgXCI1NTZcIjp7XG4gICAgICAgIFwidHlwZVwiOlwi5pWj6YeHXCIsXG4gICAgICAgIFwibmFtZVwiOlwi6buR54mbXCIsXG4gICAgICAgIFwi5biWXCI6MixcbiAgICAgICAgXCJwb2ludFwiOjE2XG4gICAgfSxcbiAgICBcIjU2NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLpu5HljYHkuINcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjE3XG4gICAgfSxcbiAgICBcIjY2NlwiOntcbiAgICAgICAgXCJ0eXBlXCI6XCLos57oibJcIixcbiAgICAgICAgXCJuYW1lXCI6XCLnoqfmsrlcIixcbiAgICAgICAgXCLluJZcIjoxMSxcbiAgICAgICAgXCJwb2ludFwiOjE4XG4gICAgfVxufSJdfQ==
