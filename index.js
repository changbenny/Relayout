class Element {
  constructor(props) {
    this.width = 0
    this.height = 0
    this.x = 0
    this.y = 0
    this.parent = null
    this.children = []
    this.props = props

    this.offsetX = 0
    this.offsetY = 0

    this.fixedWidth = false
    this.fixedHeight = false
    this.size(props)
  }
  size(props) {
    if (props.width) {
      this.fixedWidth = true
      this.width = props.width
    }
    if (props.height) {
      this.fixedHeight = true
      this.height = props.height
    }
  }
  born(par) {
    this.parent = par
  }
  layout() {}
  position() {
    let { x, y } = this.parent ? this.parent.ask(this) : { x: 0, y: 0 }
    this.x = x
    this.y = y
    for (let i = 0; i < this.children.length; i ++) {
      this.children[i].position()
    }
  }
  ask() {}
}

class Vertical extends Element {
  layout() {
    for (let i = 0; i < this.children.length; i ++) {
      let child = this.children[i]
      let { width, height } = child.layout()
      this.height += height
      this.width = Math.max(this.width, width)
    }
    return {
      width: this.width,
      height: this.height,
    }
  }
  ask(ele) {
    this.offsetY += ele.height
    return {
      x: this.x,
      y: this.y + this.offsetY - ele.height
    }
  }
}

class Horizontal extends Element {
  layout() {
    for (let i = 0; i < this.children.length; i ++) {
      let child = this.children[i]
      let { width, height } = child.layout()
      this.width += width
      this.height = Math.max(this.height, height)
    }
    return {
      width: this.width,
      height: this.height,
    }
  }
  ask(ele) {
    this.offsetX += ele.width
    return {
      x: this.x + this.offsetX - ele.width,
      y: this.y,
    }
  }
}

// class Flexbox extends Element {
//   constructor() {
//     this.direction = 'row'
//     this.alignItems = 'flex-start'
//     this.justifyContent = 'flex-start'
//   }
//   insert(ele) {
//     super.insert(ele)
//     if (this.direction === 'column') {
//       this.fixedWidth || (this.width = Math.max(this.width, ele.width))
//       this.fixedHeight || (this.height += ele.height)
//     } else {
//       this.fixedWidth || (this.width += ele.width)
//       this.fixedHeight || (this.height = Math.max(this.height, ele.height))
//     }
//   }
//   layout(ele) {
//     let x = 0
//     let y = 0
//     if (this.direction === 'column') {
      
//     } else {
//       if (this.alignItems === 'flex-start') {
//         x = this.x + this.width
//       } else if (this.alignItems === 'flex-end') {
//         x = this.fixedWidth ? this.x - ele.width : this.x - ele.width
//       } else if (this.alignItems === 'center') {

//       }
//       if (this.justifyContent === 'flex-start') {
//         y = this.y
//       } else if (this.justifyContent === 'flex-end') {
//         y = this.y + this.height - ele.height
//       } else if (this.justifyContent === 'center') {

//       }
//     }
//     return { x, y }
//   }
// }

const elements = {
  vertical: Vertical,
  horizontal: Horizontal,
}

function dom(ele) {
  let node = document.createElement('DIV')
  node.style.position = 'absolute'
  node.style.left = `${ele.x}px`
  node.style.top = `${ele.y}px`
  node.style.width = `${ele.width}px`
  node.style.height = `${ele.height}px`
  for (let p in ele.props) {
    node.style[p] = ele.props[p]
  }
  return node
}

function render(ele, target) {
  target.appendChild(dom(ele))
  console.log(ele)
  for (let i = 0; i < ele.children.length; i ++) {
    render(ele.children[i], target)
  }
}

function layout(ele) {
  ele.layout()
  ele.position()
  // for (let i = 0; i < ele.children.length; i ++) {
  //   let child = ele.children[i]
  //     // child.born(ele)
  //   ele.layout(child)
  //   child.position()
  // }
}

function h(name, props, children = []) {
  let ele = new elements[name](props)
  ele.children = children
  for (let i = 0; i < children.length; i ++) {
    let child = children[i]
    child.parent = ele
  }
  // if (children) {
  //   for (let i = 0; i < children.length; i ++) {
  //     let child = children[i]
  //     // child.born(ele)
  //     ele.layout(child)
  //     child.position()
  //   }
  // }
  return ele
}

const app = h('horizontal', { background: 'red' }, [
  h('vertical', { width: 100, height: 100, background: 'black' }),
  h('vertical', { width: 150, height: 120, background: 'black' }),
  h('vertical', { width: 120, height: 100, background: 'black' }),
])
layout(app)
// console.log(app)
render(app, document.body)