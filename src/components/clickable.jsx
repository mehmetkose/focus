/** @jsx h */
import preact from 'preact';

const { h, Component } = preact;

import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();

export default class Clickable extends Component {
	state = {
		count: 0
	};

	onTap = e => {
		console.log('tap: ', e);
		this.setState({ count: this.state.count+1 });
	};

	render({ }, { count }) {
		return (
			<div class="app">
				<button onTouchTap={this.onTap}>Tap Me!</button>
				<span>{count}</span>
			</div>
		);
	}
}
