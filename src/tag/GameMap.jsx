import React from 'react';
import state from '../State';

function processGameMap(state) {
	let game_map = new Array(92);
	for(let i=1;i<92;i++){
		game_map[i] = i;
	}
	state.players.forEach( p => {
		replaceWitdPlayer(p, game_map);
	});

	return game_map;
}
/**
 * @param {String} game_map
 */
function replaceWitdPlayer(player, game_map) {
	for(let h in player.馬) {
		if(h === 'handle') continue;

		let locate = parseInt(h);
		let style = {
			backgroundColor:player.color,
			padding: '3px'
		};
		let tag = (<div style={style}>{player.馬[locate]}</div>);
		game_map[locate] = tag;
	}
}

export default function GameMap() {
	let a = processGameMap( state );
	return (
		<table className="tg">
		<tbody>
		<tr>
			<td className="tg-s6z2">{a[37]}<br/>沙苑監</td>
			<td className="tg-s6z2">{a[38]}</td>
			<td className="tg-s6z2">{a[39]}</td>
			<td className="tg-s6z2">{a[40]}</td>
			<td className="tg-s6z2">{a[41]}</td>
			<td className="tg-s6z2">{a[42]}</td>
			<td className="tg-s6z2">{a[43]}</td>
			<td className="tg-s6z2">{a[44]}</td>
			<td className="tg-s6z2">{a[45]}</td>
			<td className="tg-s6z2" colSpan="3">{a[46]}<br/>函谷關</td>
			<td className="tg-s6z2">{a[47]}</td>
			<td className="tg-s6z2">{a[48]}</td>
			<td className="tg-s6z2">{a[49]}</td>
			<td className="tg-s6z2">{a[50]}</td>
			<td className="tg-s6z2">{a[51]}</td>
			<td className="tg-s6z2">{a[52]}</td>
			<td className="tg-s6z2">{a[53]}</td>
			<td className="tg-s6z2">{a[54]}</td>
			<td className="tg-s6z2">{a[55]}<br/>太僕寺</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[36]}</td>
			<td className="tg-baqh" colSpan="19" rowSpan="8" style={{borderStyle:'none'}}></td>
			<td className="tg-baqh">{a[56]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[35]}</td>
			<td className="tg-baqh">{a[57]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[34]}</td>
			<td className="tg-baqh">{a[58]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[33]}</td>
			<td className="tg-baqh">{a[59]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[32]}</td>
			<td className="tg-baqh">{a[60]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[31]}</td>
			<td className="tg-baqh">{a[61]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[30]}</td>
			<td className="tg-baqh">{a[62]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[29]}</td>
			<td className="tg-baqh">{a[63]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[28]}<br/>汧陽監</td>
			<td className="tg-baqh" colSpan="8" rowSpan="9" style={{borderStyle:'none'}}></td>
			<td className="tg-baqh">{a[1]}<br/>赤岸驛</td>
			<td className="tg-baqh" rowSpan="10" style={{borderStyle:'none'}}></td>
			<td className="tg-baqh">{a[91]}<br/> 尚乘局</td>
			<td className="tg-baqh" colSpan="8" rowSpan="9" style={{borderStyle:'none'}}></td>
			<td className="tg-baqh">{a[64]}<br/>天駟監</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[27]}</td>
			<td className="tg-baqh">{a[2]}</td>
			<td className="tg-baqh">{a[90]}</td>
			<td className="tg-baqh">{a[65]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[26]}</td>
			<td className="tg-baqh">{a[3]}</td>
			<td className="tg-baqh">{a[89]}</td>
			<td className="tg-baqh">{a[66]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[25]}</td>
			<td className="tg-baqh">{a[4]}</td>
			<td className="tg-baqh">{a[88]}</td>
			<td className="tg-baqh">{a[67]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[24]}</td>
			<td className="tg-baqh">{a[5]}</td>
			<td className="tg-baqh">{a[87]}</td>
			<td className="tg-baqh">{a[68]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[23]}</td>
			<td className="tg-baqh">{a[6]}</td>
			<td className="tg-baqh">{a[86]}</td>
			<td className="tg-baqh">{a[69]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[22]}</td>
			<td className="tg-baqh">{a[7]}</td>
			<td className="tg-baqh">{a[85]}</td>
			<td className="tg-baqh">{a[70]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[21]}</td>
			<td className="tg-baqh">{a[8]}</td>
			<td className="tg-baqh">{a[84]}</td>
			<td className="tg-baqh">{a[71]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[20]}</td>
			<td className="tg-baqh">{a[9]}<br/></td>
			<td className="tg-baqh">{a[83]}</td>
			<td className="tg-baqh">{a[72]}</td>
		</tr>
		<tr>
			<td className="tg-baqh">{a[19]}<br/>玉門關</td>
			<td className="tg-baqh">{a[18]}</td>
			<td className="tg-baqh">{a[17]}</td>
			<td className="tg-baqh">{a[16]}</td>
			<td className="tg-baqh">{a[15]}</td>
			<td className="tg-baqh">{a[14]}</td>
			<td className="tg-baqh">{a[13]}</td>
			<td className="tg-baqh">{a[12]}</td>
			<td className="tg-baqh">{a[11]}</td>
			<td className="tg-baqh">{a[10]}<br/>隴西監</td>
			<td className="tg-baqh">{a[82]}<br/>飛龍院</td>
			<td className="tg-baqh">{a[81]}</td>
			<td className="tg-baqh">{a[80]}</td>
			<td className="tg-baqh">{a[79]}</td>
			<td className="tg-baqh">{a[78]}</td>
			<td className="tg-baqh">{a[77]}</td>
			<td className="tg-baqh">{a[76]}</td>
			<td className="tg-baqh">{a[75]}</td>
			<td className="tg-baqh">{a[74]}</td>
			<td className="tg-baqh">{a[73]}<br/>騏驛院</td>
		</tr>
		</tbody>
		</table>
	);
}