import React, { Component } from 'react'
import VisibilitySensor from 'react-visibility-sensor'

import { Link } from 'react-router'


const SHOW_ANIMATION_CLASS = 'animated bounceUp'
const INITIAL_CLASS = 'hidden'

class ProjectsItem extends Component {
    constructor() {
        super()
        this.state = {
            animateState: INITIAL_CLASS,
            timeout: null,
        }
    }
    render() {
        const { project } = this.props
        const { animateState } = this.state
        const colorBackSide = `projColor${project.id % 4 + 1}`

        return (
            <VisibilitySensor
                onChange={ this.onVisibilityChange.bind(this) }
                intervalDelay={ 500 }
                partialVisibility={ 'top' }
                minTopValue={ 250 }
                resizeCheck={ true }
                delayedCall={ true }

            >
                <div className={ `item scrollItem` }>
                    <div className="project arrAnim invisLink">
                        <div className="img" style={ { backgroundImage: `url(${project.image})` } }>
                            <img src={ project.image } alt=""/>
                        </div>
                        <div className={ `in ${colorBackSide}` } >
                            <div className="hideCapBl">
                                <h2
                                    className="cap"
                                >
                                    { project.name }
                                </h2>
                                <span>{ project.type }</span>
                            </div>
                            <div className="hideArrBl">
                                <span className="icon-arr-port"></span>
                            </div>
                        </div>
                        <Link
                            to={ `${project.link}${project.id}`}
                        >
                            { project.name }
                        </Link>
                    </div>
                </div>
            </VisibilitySensor>
        )
    }
    onVisibilityChange(isVisible) {
        const { animateState } = this.state

        if (!isVisible) {
            return
        }
        if (animateState === INITIAL_CLASS) {
            this.setState({
                animateState: SHOW_ANIMATION_CLASS,
            }, this.setState(
                {
                    animateState: '',
                }
            ))
        }
        return
    }
}

export default ProjectsItem

export {
    INITIAL_CLASS,
    SHOW_ANIMATION_CLASS,
}
