// import createAlterRoot from "./createAlterRoot"
import { addElementToDOM } from "./functions";
import React from "react"
import * as ReactDOMServer from 'react-dom/server';
import Popup from "../components/generic/Popup";

const DEFAULT_PARAMS = {
    duration: 2000,
    title: null,
    text: null,
    type: null
}

function addComponentToElement(container, component) {
    const innerHTML = ReactDOMServer.renderToStaticMarkup(component)
    container.innerHTML = innerHTML
}

function createContainerElement(containerId) {
    const container = Object.assign(document.createElement('div'), { id: containerId })
    // const innerHTML = ReactDOMServer.renderToStaticMarkup(component)
    // container.innerHTML = innerHTML
    // createAlterRoot(container, rootId)
    return container
}

function removeElementFromDOM(rootId, containerId, element) {
    // console.log('CLOSE')
    const tag = '#' + containerId
    if (document.querySelectorAll(tag).length === 1) {
        const root = document.getElementById(rootId)
        if (root) root.remove()
    } else {
        element.remove()
    }
}

function getIcon(type) {
    let icon = null
    const path = '/icons/'
    switch (type) {
        case 'info':
            icon = path + 'info'
            break
        case 'warning':
            icon = path + 'caution'
            break
        case 'error':
            icon = path + 'cancel'
            break
        case 'success':
            icon = path + 'success'
            break
        default:
            break
    }
    if (icon) icon += '.png'
    return icon
}

export default function notification({ title, text, type }, duration) {

    // console.log(title, text, duration, type)

    const params = {
        title: title ?? DEFAULT_PARAMS.title,
        text: text ?? DEFAULT_PARAMS.text,
        duration: duration ?? DEFAULT_PARAMS.duration,
        type: type ?? DEFAULT_PARAMS.type
    }

    const icon = getIcon(params.type)

    const rootId = 'notifications'
    const containerId = 'notification'
    const container = createContainerElement(containerId)

    const notification =
        <div className="notification-content">
            <div className="notification-content-item" >
                <img src={icon} alt={type} />
            </div>
            <div className="notification-content-item">
                {params.text}
            </div>
        </div>

    addComponentToElement(container, notification)
    container.onclick = () => removeElementFromDOM(rootId, containerId, container)

    addElementToDOM(container, rootId)

    if (params.duration)
        setTimeout(() => {
            removeElementFromDOM(rootId, containerId, container)
        }, params.duration)

}

// export function popup(props, component) {

//     const containerId = 'popup-container'
//     const rootId = 'popup-root'
//     const container = createContainer(containerId)

//     const popup =
//         <Popup
//             visible={true}
//             title={props.title}
//             onClose={() => { console.log(1) }} // onClose(rootId, containerId, container)
//         >
//             {component}
//         </Popup>

//     // const innerHTML = ReactDOMServer.renderToStaticMarkup(popup)
//     // container.innerHTML = innerHTML
//     addComponentToElement(container, popup)
//     // container.onclick = () => onClose(rootId, containerId, container)

//     createAlterRoot(container, rootId)

//     // const container = Object.assign(document.createElement('div'), { id: containerId })
//     // const innerHTML = ReactDOMServer.renderToStaticMarkup(popup)
//     // container.innerHTML = innerHTML
//     // container.onclick = () => onClose(container)

//     // createAlterRoot(container, rootId)

// } 