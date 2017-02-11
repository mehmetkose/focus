/** @jsx h */
import preact from 'preact';

const { h, Component, render, options } = preact;

import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
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

render(<App />, document.body);
