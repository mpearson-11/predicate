const pathOrTest = require('../../src/path-or');

describe('pathOr', () => {
    var deepObject = {
        a: { b: { c: 'c' } },
        arrayVal: ['arr']
    };

    it('takes a path and an object and returns the value at the path or the default value', function () {
        var obj = {
            a: {
                b: {
                    c: 100,
                    d: 200
                },
                e: {
                    f: [100, 101, 102],
                    g: 'G'
                },
                h: 'H'
            },
            i: 'I',
            j: ['J']
        };
        expect(pathOrTest('Unknown', ['a', 'b', 'c'], obj)).toBe(100);;
        expect(pathOrTest('Unknown', [], obj)).toBe(obj);
        expect(pathOrTest('Unknown', ['a', 'e', 'f', 1], obj)).toBe(101);
        expect(pathOrTest('Unknown', ['j', 0], obj)).toBe('J');
        expect(pathOrTest('Unknown', ['j', 1], obj)).toBe('Unknown');
        expect(pathOrTest('Unknown', ['a', 'b', 'c'], null)).toBe('Unknown');
    });

    it("gets a deep property's value from objects", function () {
        expect(pathOrTest('Unknown', ['a', 'b', 'c'], deepObject)).toEqual('c');
        expect(pathOrTest('Unknown', ['a'], deepObject)).toEqual(deepObject.a);
    });

    it('returns the default value for items not found', function () {
        expect(pathOrTest('Unknown', ['a', 'b', 'foo'], deepObject)).toBe('Unknown');
        expect(pathOrTest('Unknown', ['bar'], deepObject)).toBe('Unknown');
    });
});
