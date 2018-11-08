const expect = require('expect');

// Import isRealString
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-sting values', () => {
        let response = isRealString(98);
        expect(response).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let response = isRealString('     ');
        expect(response).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        let response = isRealString('   John  ');

        expect(response).toBe(true);
    });
});


