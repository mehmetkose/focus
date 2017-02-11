/** @jsx h */
import Preact from 'preact';

const { h, render, Component, hooks, options } = Preact;

class App extends Component {
	render() {
		return (
			<h1>Hello World !</h1>
		);
	}
}

render(<App/>, document.getElementById('app'));
