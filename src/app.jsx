/** @jsx h */
import preact from 'preact';

const { h, Component, render, options } = preact;

import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();

function coords(e) {
	let t = e.touches && e.touches[0] || e;
	return { x: t.pageX, y: t.pageY };
}

const EVENTS = [['mousemove','mouseup'], ['touchmove','touchend']]

class Dragable extends Component {
	state = {
		x: 0,
		y: 0
	};
	start = e => {
		let [move,end] = this.evt = EVENTS[e.type==='touchstart'?1:0];
		addEventListener(move, this.move);
		addEventListener(end, this.end);
	};
	move = e => {
		let c = coords(e);
		if (!this.down) {
			this.down = c;
			return;
		}
		this.offset = {
			x: c.x - this.down.x,
			y: c.y - this.down.y
		};
    this.base.style.transform = `translate(${this.offset.x}px, ${this.offset.y}px)`;
  };
  end = e => {
		let [move,end] = this.evt;
		removeEventListener(move, this.move);
		removeEventListener(end, this.end);
		if (this.offset) {
			this.setState({
				x: this.state.x + this.offset.x,
				y: this.state.y + this.offset.y
			});
		}
		this.down = this.offset = null;
	};
	// this is just for the demo: shows when we have re-rendered:
	componentDidUpdate() {
		this.base.setAttribute('updated', true);
		setTimeout( () => this.base.removeAttribute('updated'), 150);
	}
	render({ }, { x, y }) {
  	return (
    	<div class="foo" style={{
				left: x,
				top: y,
				transform: ''
			}} onMouseDown={this.start} onTouchStart={this.start}>
      	Drag Me
				<pre>({x}, {y})</pre>
      </div>
    );
  }
}




class Clickable extends Component {
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

class App extends Component {
	render() {
		return(
			<div>
				<Clickable/>
				<br />
				<Dragable/>
			</div>
		)
	}
}

render(<App />, document.body);
