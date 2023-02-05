import React, { Component } from 'react';

class FormTable extends Component {
    render() {
        // console.log('rerender')
        const source = this.props.source ?? []
        return (
            <table>
                <thead>
                    {source.map((item, index) => {
                        let array = []
                        for (let key in item) {
                            array.push(item[key])
                        }
                        return (
                            <tr key={'tr_'+index}>
                                {array.map((el, i) => {
                                    // console.log(el)
                                    return (
                                        <td key={'td_'+i}>{el}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </thead>
            </table>
        )
    };
};

export default FormTable;