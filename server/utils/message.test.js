const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'User';
        let latitude = 12345;
        let longitude = 67890;
        let url = 'https://www.google.com/maps?q=12345,67890';
        let locationMessage = generateLocationMessage(from, latitude, longitude);

        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage).toMatchObject({from, url});
    });
});