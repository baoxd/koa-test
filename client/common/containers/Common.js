import React, {Children, Component, cloneElement} from 'react'
// import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Common extends Component {
	constructor() {
		super()
	}

	render() {
		const {children, ...props} = this.props

		return (
			<div>
				<h1>服务端渲染测试</h1>
				<div>
					{Children.map(children, child =>
                        cloneElement(child, {...props})
                    )}
				</div>
			</div>
		)
	}
}

export default connect(state => state)(Common)