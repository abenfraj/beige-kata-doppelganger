const test = require('tape')
const DiscountApplier = require('../discount-applier')

const users = ['Alice', 'Bob', 'Charlie'];

test('apply v1', (t) => {
  // TODO: write a test that fails due to the bug in
  // DiscountApplier.applyV1
  const userArray = [];
  const discountApplier = new DiscountApplier({ notify: (user, message) => {
      userArray.push(user);
    }
  });
  discountApplier.applyV1(10, users)
  t.assert(userArray.every((user, index) => user === users[index]))
  t.end()
})

test('apply v2', (t) => {
  // TODO: write a test that fails due to the bug in
  // DiscountApplier.applyV2
  const userArray = [];
  const discountApplier = new DiscountApplier({ notify: (user, message) => {
      userArray.push(user);
    }
  });
  discountApplier.applyV2(10, users)
  t.assert(userArray.every((user, index) => user === users[index]))
  t.end()
})