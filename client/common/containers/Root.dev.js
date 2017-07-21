import React, {Component} from 'react'
import DevTools from './DevTools'
import Common from './Common'

class Root extends Component {
    constructor() {
        super()
        this.state = {isMounted: false}
    }

    componentWillMount() {
        this.setState({isMounted: true})
    }

    componentDidMount() {
        // 服务端渲染 该方法不会执行
        this.setState({isMounted: true})
        console.log('Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.')
    }

    render() {
        const {isMounted} = this.state,
            {children} = this.props

        return (
            <div>
                <Common>{children}</Common>
                {isMounted && <DevTools/>}
            </div>
        )
    }
}

export default Root
