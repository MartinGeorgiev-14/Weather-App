

export function createNode(element) {
    return document.createElement(element);
}

export function append(parent, el) {
    return parent.append(el);
}

//Removing all child elements
export function removeChildNodes(element){
    while(element.firstChild)
    {  
        element.removeChild(element.firstChild);
    }
}
//Removing all child exept first
export function removeNodesExeptFirstChild(parent, child)
{   
    for (var i = child.length - 1; i > 0; i--) {
        parent.removeChild(child[i]);
      }
}

export function setIdAttribute(elem, value){
    elem.setAttribute("id", value);
}

export function setInnerHTML(elem, value){
    elem.innerHTML = value;
}

export function setSrcAttribute(elem, location){
    elem.setAttribute("src", location);
}

export function setClassAttribute(elem, value){
    elem.setAttribute("class", value);
}

export function addClassAttribute(elem, value){
    elem.classList.add(value);
}

export function removeClassAttribute(elem, value){
    elem.classList.remove(value)
}