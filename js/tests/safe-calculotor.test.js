const test = require('tape')
const SafeCalculator = require('../safe-calculator')

test('should not throw when authorized', (t) => {
  // TODO: write a test that fails due to the bug in
  // SafeCalculator.add()
  const safeCalculator = new SafeCalculator({ authorize: () => true })
  safeCalculator.add(1, 2)
  t.end()
})
