import React, { Component, createRef } from 'react';
import '../generic.css'
import FormTable from './FormTable';
import Input from '../Input';

class Form extends Component {

    state = {}

    formRef = createRef()

    componentDidMount() {
        // const {children, isHighlightChanges} = this.props
        // if (children && isHighlightChanges)
        //     this.getState(children)
    }

    componentDidUpdate() {
        // this.highlightChanges()
    }

    // getState = (children) => {
    //     if (children?.length > 1) {
    //         console.log(children)
    //         children.forEach(child => child.type === 'input' ? this.setStateFromProps(child) : null)
    //     } else {
    //         this.setStateFromProps(children)
    //     }
    // }

    // setStateFromProps = (child) => {
    //     const name = child?.props?.name
    //     if (name) this.setState({ [name]: child?.props?.value ?? '' })
    // }

    // highlightChanges = () => {
    //     const {children, isHighlightChanges} = this.props
    //     if (children && isHighlightChanges) {
    //         for (let key of Object.keys(this.state)) {
    //             // const elements = document.querySelectorAll('form > table > thead > tr > td > *')
    //             const elements = this.formRef.current
    //             let element = null
    //             for (let item of elements) {
    //                 if (item.name === key) {
    //                     element = item
    //                     break
    //                 }
    //             }
    //             if (element) {
    //                 const elementStyle = element.style
    //                 let child = null
    //                 if (children?.length > 1) {
    //                     child = children.find(item => item.props.name === key)
    //                 } else {
    //                     child = children
    //                 }
    //                 if (child.props.value != this.state[key]) { // !==
    //                     elementStyle.backgroundColor = 'rgba(255, 200, 0, 0.3)'
    //                     elementStyle.borderColor = 'orange'
    //                 } else {
    //                     elementStyle.backgroundColor = ''
    //                     elementStyle.borderColor = ''
    //                 }
    //             }
    //         }
    //     }
    // }

    getFilteredChildren = (children) => {
        const otherFilter = (item, filters) => {
            const res = [].concat(...filters)
            return !res.includes(item)
        }
        const inputFilter = ['input', 'textarea']
        const buttonFilter = ['button']
        // const otherFilter = inputFilter.concat(buttonFilter)
        // console.log(children[0])
        // console.log(children[1])
        const childrenEl = children?.length > 1 ? children : [children]
        const inputs = childrenEl.filter(child => inputFilter.includes(child?.type) || child?.type?.name === "Input")
        const buttons = childrenEl.filter(child => buttonFilter.includes(child?.type))
        const others = childrenEl.filter(child => otherFilter(child?.type, [inputFilter, buttonFilter]) && child?.type?.name !== "Input") // otherFilter(child?.type, [inputFilter, buttonFilter])
        return { inputs, buttons, others }
    }

    rerenderParentCallback = () => {
        // console.log("input updated")
        this.forceUpdate();
    }

    render() {
        const { children, title, handleSubmit, onReset } = this.props
        if (children) {
            const { inputs, buttons, others } = this.getFilteredChildren(children)
            return (
                <form
                    ref={this.formRef}
                    onSubmit={handleSubmit}
                    onReset={onReset}
                    className='form'
                    id='form'
                >
                    <h1>{title}</h1>
                    <FormTable
                        // rerenderParentCallback={this.rerenderParentCallback}
                    >
                        {inputs.map(inputComponent => {
                            const cloned = React.cloneElement(inputComponent, {
                                rerenderParentCallback: this.rerenderParentCallback,
                                key: inputComponent.name
                            })
                            return cloned
                        })}
                    </FormTable>
                    <div className='form-btns'>
                        {buttons}
                        {/* <button
                            type='reset'
                            className='submit-btn'
                        >{'Сбросить'}</button> */}
                    </div>
                    {others}
                </form>
            )
        } else {
            return (<span style={{ color: 'grey' }}>Нет данных для формы</span>)
        }
    };
};

export default Form;