import React from 'react';
import state from '../State';

export function PlayerList() {
	let players = state.players.map(p => <Player  key={p.name} player={p}/>);
	return (
		<div>{players}</div>
	);
}

const Player = React.createClass({
	propTypes:{
		player: React.propTypes.object.isRequired
	},
	render: function(){
		let player = this.props.player;
		let style = {
			borderColor: player.color
		};
		let right = {
			textAlign: 'right'
		};
		return (
			<div className="aside-List" style={style}>
				<table>
					<tbody>
						<tr>
							<td style={right}>name</td>
							<td>{player.name}</td>
						</tr>
						<tr>
							<td style={right}>本采</td>
							<td>{player.本采 ? player.本采.name : '未設'}</td>
						</tr>
						<tr>
							<td style={right}>帖</td>
							<td>{player.帖數}</td>
						</tr>
						<tr>
							<td style={right}>馬</td>
							<td>{player.馬.handle}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});