import mountElement from './mountElement'
import updateElementNode from './updateElementNode'
import updateTextNode from './updateTextNode'
import createElement from './createElement'

export default function diff(newVirtualDOM, container, oldDOM) {
const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
const oldComponent = oldVirtualDOM && oldVirtualDOM.component
if(!oldDOM) {
  mountElement(newVirtualDOM, container)
} else if(oldVirtualDOM.type !== newVirtualDOM.type && typeof newVirtualDOM.type !== 'function') {
  const newElement = createElement(virtualDOM)
  oldDOM.parentNode.replaceChild(newElement, oldDOM)
} else if(typeof newVirtualDOM.type === 'function') {
  // 更新的是组件
  diffComponent(newVirtualDOM, oldComponent, oldDOM, container)
} else if(oldVirtualDOM && oldVirtualDOM.type === newVirtualDOM.type) {
    if(newVirtualDOM.type === 'text') {
      // 文本节点
      updateTextNode(newVirtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 其他节点
      updateElementNode(oldDOM, newVirtualDOM, oldVirtualDOM)
    }

    newVirtualDOM.children.forEach((item, index) => {
      diff(item, oldDOM, oldDOM.childNodes[index])
    })

    let oldChildNodes = oldDOM.childNodes
    if(oldChildNodes.length > newVirtualDOM.children.length) {
      for(let i = oldChildNodes.length - 1; i > newVirtualDOM.children.length - 1; i--) {
        oldDOM.removeChild(oldChildNodes[i])
      }
    }
  }
}
