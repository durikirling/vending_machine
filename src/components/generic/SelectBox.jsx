import React, { Component } from 'react';
import './generic.css'

class SelectBox extends Component {
    render() {
        return (
            <div>
                {this.props.title}:
                <select
                    id="select-box"
                    className="select-box"
                    // value={this.props.value ?? 'id'}
                    onChange={this.props.onChange}
                >
                    <option
                        value={'select_box_default_value'}
                        className={'select_box_default_value'}
                    >
                        {this.props.defaultName ?? 'Выберите опцию'}
                    </option>
                    {this.props.source.map((option, index) => {
                        return (
                            <option
                                key={'option_' + option.value}
                                value={option.value}
                            >
                                {option.name}
                            </option>
                        )
                    })}
                </select>
            </div>
        )
    };
};

export default SelectBox;