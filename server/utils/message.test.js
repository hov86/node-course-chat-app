const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Jen';
        let text = 'Some message';
        let createdAt = new Date().getTime();
        let message = generateMessage(from, text, createdAt);

        expect(message).toMatchObject({from, text, createdAt});
        expect(typeof message.createdAt).toBe('number');
    });
});