class Vertical {
  constructor() {
    this.width = 0
    this.height = 0
    this.x = 0
    this.y = 0
    this.parent = null
    this.children = []
  }
  size(props) {
    this.width = props.width || 0
    this.height = props.height || 0
  }
  born(par) {
    this.parent = par
  }
  insert(ele) {
    this.height += ele.height
    this.width = Math.max(this.width, ele.width)
    this.children.push(ele)
  }
  position() {
    this.x = this.parent.x
    this.y = this.parent.y + this.parent.height
  }
}

const elements = {
  vertical: Vertical
}

function dom(ele) {
  let node = document.createElement('DIV')
  node.style.position = 'absolute'
  node.style.left = `${ele.x}px`
  node.style.top = `${ele.y}px`
  node.style.width = `${ele.width}px`
  node.style.height = `${ele.height}px`
  return node
}

function render(ele, target) {
  target.appendChild(dom(ele))
  for (let i = 0; i < ele.children.length; i ++) {
    render(ele.children[i], target)
  }
}

function h(name, props, children) {
  let ele = new elements[name]()
  ele.size(props)
  if (children) {
    for (let i = 0; i < children.length; i ++) {
      let child = children[i]
      child.born(ele)
      child.position()
      ele.insert(child)
    }
  }
  return ele
}






const app = h('vertical', {}, [
  h('vertical', { width: 100, height: 100 }),
  h('vertical', { width: 100, height: 100 }),
  h('vertical', { width: 100, height: 100 }),
])
render(app, document.body)