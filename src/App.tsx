import React, { FC } from 'react';
import './styles.css';

const initialState = [3, 2, 1];

interface AddButtonProps {
	onClick: any;
}

const AddButton: FC<AddButtonProps> = ({ onClick = () => {} }): any => {
	<button onClick={onClick}>+</button>;
};

class List extends React.PureComponent<any, any> {
	render() {
		return (
			<ul>
				{this.props.list.map((n: any, idx: any) => (
					<li key={idx}>{n}</li>
				))}
			</ul>
		);
	}
}

interface AppProps {}

interface AppState {
	list: number[];
	page: number;
}

const limit = 10;

export default class App extends React.Component<AppProps, AppState> {
	state = {
		items: [...initialState],
	};

	_addItems() {
		this.state.items.unshift(this.state.items.length + 1);
		this.forceUpdate();
	}

	_getPosts() {
		const { page } = this.state;
		return fetch(
			'https://jsonplaceholder.typicode.com/posts/?_start=${page}&_limit=${limit}',
		).then((result) => result.json());
	}

	_putItems(items) {
		this.state.items = items;
	}

	render() {
		this._getPosts().then(this.putItems);
		return (
			<div>
				<div>rendered at {Date.now()}</div>
				<div>with list {this.state.items.join(',')}</div>
				<List list={this.state.items} />
				<AddButton onClick={this._addItems} />
			</div>
		);
	}
}
