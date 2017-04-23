/** @jsx h */
import preact from 'preact';

const { h, Component } = preact;

function coords(e) {
	let t = e.touches && e.touches[0] || e;
	return { x: t.pageX, y: t.pageY };
}

const EVENTS = [['mousemove','mouseup'], ['touchmove','touchend']]

export default class Dragable extends Component {
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
