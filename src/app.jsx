/** @jsx h */
import preact from 'preact';

const { h, Component, render, options } = preact;

import Dragable from "./components/dragable";
import Clickable from "./components/clickable";

class App extends Component {
	render() {
		return(
			<div>
				<Dragable />
				<br />
				<Clickable />
			</div>
		)
	}
}

render(<App />, document.body);
