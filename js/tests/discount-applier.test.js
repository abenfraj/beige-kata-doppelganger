const test = require('tape')
const sinon = require('sinon')
const DiscountApplier = require('../discount-applier')

const users = ['Alice', 'Bob', 'Charlie'];

test('apply v1', (t) => {
  // TODO: write a test that fails due to the bug in
  // DiscountApplier.applyV1
  const notifySpy = sinon.spy();

  const discountApplier = new DiscountApplier({
    notify: notifySpy,
  });

  discountApplier.applyV1(10, users)
  t.equals(notifySpy.callCount, users.length, "notify should be called for each user")

  t.end()
})

test('apply v2', (t) => {
  // TODO: write a test that fails due to the bug in
  // DiscountApplier.applyV2
  const userArray = [];
  const notifySpy = sinon.spy();
  const discountApplier = new DiscountApplier({
    notify: notifySpy,
  });
  discountApplier.applyV2(10, users)
  const notifiedUsers = notifySpy.getCalls().map((call) => call.args[0]);
  t.deepEqual(notifiedUsers, users, "notify should be called with the correct users in the same order")
  t.end()
})