const { postRequest } = require('../src/client/js/formHandler');

test('It should send a request to the server', () => {
    expect(
        postRequest({url: 'https://google.com'})
    );
})