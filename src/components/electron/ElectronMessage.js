// SPECIAL COMPONENT
// this is a special component to integrate with redux
// while also sending & recieving messages from electron
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ElectronSearch from './ElectronSearch';
import { showComponent, hideComponent } from '../../api/redux/actions';

// a place to send & recieve messages to & from electron
class ElectronMessage extends Component {
	componentDidMount() {
		// load up window.api.recieve function
		window.api.receive('fromMain', (data) => {
			if (data.message === 'search' && !this.props.electronSearchData) {
				this.props.showComponent('electronSearch');
			} else if (data.message === 'search') {
				this.props.hideComponent('electronSearch');
			}
		});
	}

	renderElectronSearch = () => {
		if (this.props.electronSearchData && this.props.electronSearchData.visible) {
			return <ElectronSearch />;
		}
	};

	render() {
		return <Fragment>{this.renderElectronSearch()}</Fragment>;
	}
}

const mapStateToProps = (state) => {
	return {
		electronSearchData: state.components.componentList['electronSearch'],
	};
};

export default connect(mapStateToProps, { showComponent, hideComponent })(ElectronMessage);
