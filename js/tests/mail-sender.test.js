const sender = require('../mail-sender')
const test = require('tape')
const { SendMailRequest } = require('../mail-sender')

const user = { email: 'beige@team.com' }
const subject = 'New notification'
const message = 'Hello!'

test('send v1', (t) => {
  // TODO: write a test that fails due to the bug in
  // MailSender.sendV1
  const mockHttpClient = {
    post: (url, request) => {
        t.equal(url, 'https://api.mailsender.com/v3/')
        t.equal(request.recipient, user.email)
        t.equal(request.subject, subject)
        t.equal(request.body, message)
    },
  };
  const mailSender = new sender.MailSender(mockHttpClient);
  mailSender.sendV1(user, message)
  t.end()
})

test('send v2', (t) => {
  // TODO: write a test that fails due to the bug in
  // MailSender.sendV2
  const mockHttpClient = {
    post: (url, request) => {
      t.equal(Object.keys(request).length, 3)
      return { code: 503 }
    },
  };
  const mailSender = new sender.MailSender(mockHttpClient);
  mailSender.sendV2(user, message)
  t.end()
})
