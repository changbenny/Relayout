// vertical
const app = h('vertical', { background: 'red' }, [
  h('vertical', { width: 100, height: 100, background: 'black' }),
  h('vertical', { width: 150, height: 120, background: 'black' }),
  h('vertical', { width: 120, height: 100, background: 'black' }),
])
layout(app)


// horizontal
const app = h('horizontal', { background: 'red' }, [
  h('vertical', { width: 100, height: 100, background: 'black' }),
  h('vertical', { width: 150, height: 120, background: 'black' }),
  h('vertical', { width: 120, height: 100, background: 'black' }),
])
layout(app)

// flexbox
const app = h('flexbox', { background: 'red' }, [
  h('vertical', { width: 100, height: 100, background: 'black' }),
  h('vertical', { width: 150, height: 120, background: 'black' }),
  h('vertical', { width: 120, height: 100, background: 'black' }),
])
layout(app)