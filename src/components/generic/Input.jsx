import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import './generic.css'

// const MODAL_BACKGOUND_ID = "modal-background"

class Input extends Component {

    state = {
        // initialValue: this.props.type!=='file' ? this.props.value : '',
        initialValue: this.props.value ?? "",
        currentValue: this.props.value ?? "",
        currentValueInFileInput: ""
    }

    // inputRef = createRef()

    // componentDidMount() {
    // }

    // componentDidUpdate() {
    //     // this.highlightChanges()
    // }

    // highlightChanges = () => {
    //     const element = this.inputRef.current
    //     const elementStyle = element?.style
    //     if (element)
    //     if (this.inputRef.current.value != this.state.initialValue) { // !==
    //         elementStyle.backgroundColor = 'rgba(255, 200, 0, 0.3)'
    //         elementStyle.borderColor = 'orange'
    //     } else {
    //         elementStyle.backgroundColor = ''
    //         elementStyle.borderColor = ''
    //     }
    // }

    handleChange = (e) => {
        console.log(e.target.value)
        // if (this.props.type !== 'file') {
            this.onInputText(e)
        // } else {
            // this.onInputFile(e)
        // }
    }

    onInputText = (e) => {
        this.setState({ currentValue: e.target.value })
    }

    onInputFile = (e) => {
        // можно использовать в случае, если изображение находится в папке images данного проекта
        const image = "/images/" + e.target.files[0].name;
        // console.log(e.target.value, e.target.files[0])
        this.setState({ currentValue: image, currentValueInFileInput: e.target.value});

        // можно использовать с изображениями, находящимися в любой директории ПК, но назваие будет очень большим
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   const image = e.target.result;
        //   this.setState({ newProductImg: image });
        // };
        // reader.readAsDataURL(e.target.files[0])
    };

    render() {
        // const { id, style, label, name, placeholder, value, onChange, required, type, min, max, autoComplete, accept } = this.props
        // this.highlightChanges()
        let inputClassName = this.state.currentValue !== this.state.initialValue ? "changable " : ""
        inputClassName += this.props.style
        return (
            <div id="custom-input">
                {this.props.type === "file" ?
                    <div className='input-file'>
                        {this.props.alternativeFileInput &&
                            // <br/> &&
                            <input
                                label='или'
                                className={inputClassName}
                                onChange={this.handleChange}
                                value={this.state.currentValue}
                            />
                        }
                        <input
                            // ref={this.inputRef}
                            onChange={this.onInputFile}
                            {...this.props}
                            // className={inputClassName}
                            value={this.state.currentValueInFileInput}
                            style={{ border: 'none' }}
                        />
                    </div>
                    :
                    <input
                        // ref={this.inputRef}
                        onChange={this.handleChange}
                        {...this.props}
                        className={inputClassName}
                        value={this.state.currentValue}
                    />
                }
                <div
                    className="input-clear-btn hint"
                    data-title='Отменить изменения'
                    onClick={() => {
                        // this.inputRef.current.value = this.state.initialValue
                        // this.highlightChanges()
                        this.setState({ currentValue: this.state.initialValue, currentValueInFileInput: "" })
                    }}
                >&#10006;</div>
            </div>
        )
    };
};

export default Input;

// &#10006; or &times;