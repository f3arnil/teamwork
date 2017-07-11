
import React, { Component } from 'react'

class ParallaxComponent extends Component {
    constructor() {
        super()

        this.state = {
            bgPositionFirst: 'center 0px',
            bgPositionSecond: 'center 0px',
            interval: null,
        }
        this.paralaxEffect = this.paralaxEffect.bind(this)
        this.calculateParams = this.calculateParams.bind(this)
    }
    componentDidMount() {
        window.addEventListener('scroll', this.paralaxEffect)
    }
    componentWillUnmount() {
        clearInterval(this.state.interval)
        window.removeEventListener('scroll', this.paralaxEffect)
    }
    paralaxEffect() {
        clearInterval(this.state.interval)
        const interval = setTimeout(
            this.calculateParams,
            300
        )
        this.setState({
            interval,
        })
    }
    calculateParams() {
        const windowScrTop = document.documentElement.scrollTop
            || document.body.scrollTop

        const bgPositionFirst = `center ${windowScrTop * 0.1}px`
        const bgPositionSecond = `center ${windowScrTop * 0.2}px`

        this.setState({
            bgPositionFirst,
            bgPositionSecond,
        })
    }
    shouldComponentUpdate(nextProps, nexState) {
        const shouldUpdate = (
            this.state.bgPositionFirst !== nexState.bgPositionFirst
            && this.state.bgPositionSecond !== nexState.bgPositionSecond
        )

        return shouldUpdate
    }
    render() {
        const {
            bgPositionFirst,
            bgPositionSecond,
        } = this.state

        const bgStyleFirst = {
            backgroundPosition: bgPositionFirst,
        }
        const bgStyleSecond = {
            backgroundPosition: bgPositionSecond,
        }

        return (
            <div className="parallaxComponent">
                {
                    React.Children.only(this.props.children)
                }
                <div className="backParalax">
                    <div
                        className="layer1"
                        style={ bgStyleFirst }
                    />
                    <div
                        className="layer2"
                        style={ bgStyleSecond }
                    />
                </div>
            </div>
        )
    }
}

export default ParallaxComponent
