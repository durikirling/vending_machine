import React, { Component } from 'react';

class Form extends Component {
    render() {
        // console.log('rerender')
        const source = this.props.source ?? []
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    {/* <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label> */}
                    {source.map((item, index) => {
                        return (
                            <label key={'tr_' + index}>
                                {item.name}
                                <input type="text" value={item.value} onChange={this.props.handleChange} />
                            </label>
                        )
                    })}
                    <input type="submit" value="Submit" />
                </form>

                {/* <table>
                    <thead>
                        {source.map((item, index) => {
                            let array = []
                            for (let key in item) {
                                array.push(item[key])
                            }
                            return (
                                <tr key={'tr_' + index}>
                                    {array.map((el, i) => {
                                        // console.log(el)
                                        return (
                                            <td key={'td_' + i}>{el}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </thead>
                </table> */}
            </div>
        )
    };
};

export default Form;