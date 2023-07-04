import React, { Component } from 'react';
import '../generic.css'

const getLabel = (child) => {
    const { label, required, value, name } = child?.props
    const starRequired = required ? <span style={{ color: value === '' ? 'red' : '', fontSize: 18 }}>*</span> : null
    const resultLabel = <span>{label}{starRequired}:</span>
    return resultLabel
}

const FormTable = (props) => {
    return (
        <table className='form-table'>
            <thead>
                {props?.children?.map((child, index) => {
                    return (
                        <tr key={'tr_' + (child.name ?? index)}>
                            <td>{getLabel(child)}</td>
                            <td>{child}</td>
                        </tr>
                    )
                })}
            </thead>
        </table>
    )
}

export default FormTable;

// class FormTable extends Component {

//     render() {
//         return (
//             <table className='form-table'>
//                 <thead>
//                     {this.props?.children?.map((child, index) => {
//                         const { label, required, value, name } = child?.props
//                         const starRequired = required ? <span style={{ color: value === '' ? 'red' : '', fontSize: 18 }}>*</span> : null
//                         const param = <span>{label}{starRequired}:</span>
//                         return (
//                             <tr key={'tr_' + (name ?? index)}>
//                                 <td>{param}</td>
//                                 <td>{child}</td>
//                             </tr>
//                         )
//                     })}
//                 </thead>    
//             </table>
//         )
//     };
// };

// export default FormTable;