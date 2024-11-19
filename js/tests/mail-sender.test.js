const sender = require('../mail-sender')
const test = require('tape')
const sinon = require('sinon')
const { SendMailRequest } = require('../mail-sender')

const user = { email: 'beige@team.com' }
const subject = 'New notification'
const message = 'Hello!'

test('send v1', (t) => {
  // TODO: write a test that fails due to the bug in
  // MailSender.sendV1
  const mockHttpClient = { post: sinon.stub() };
  const mailSender = new sender.MailSender(mockHttpClient);
  mailSender.sendV1(user, message);
  const callArgs = mockHttpClient.post.getCall(0).args;
  t.equal(
      callArgs[1].recipient,
      user.email,
      'Recipient email should match the user email'
  );
  t.equal(callArgs[1].subject, subject, 'Subject should match');
  t.equal(callArgs[1].body, message, 'Message body should match');
  t.end()
})

test('send v2', (t) => {
  // TODO: write a test that fails due to the bug in
  // MailSender.sendV2
  const mockHttpClient = { post: sinon.stub() };
  const firstResponse = { code: 503 };
  const secondResponse = { code: 200 };
  mockHttpClient.post.onFirstCall().returns(firstResponse);
  mockHttpClient.post.onSecondCall().returns(secondResponse);

  const mailSender = new sender.MailSender(mockHttpClient);
  const response = mailSender.sendV2(user, message);

  t.ok(mockHttpClient.post.calledTwice, 'HttpClient.post should be called twice on retry');
  const firstCallArgs = mockHttpClient.post.getCall(0).args;
  const secondCallArgs = mockHttpClient.post.getCall(1).args;

  const [_, firstRequest] = firstCallArgs;
  const [__, secondRequest] = secondCallArgs;

  const expectedRequest = {
      recipient: user.email,
      subject: 'New notification',
      body: message,
  };

  t.deepEqual(
      { ...firstRequest },
      expectedRequest,
      'First call: Request should match the input'
  );
  t.deepEqual(
      { ...secondRequest },
      expectedRequest,
      'Second call: Request should match the input'
  );
  t.equal(response, secondResponse, 'Response should be from the successful retry');

  t.end();
})
