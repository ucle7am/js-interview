const fetchGracePeriodLogicFromMapping = require('./index.js')


describe('grace period utils', () => {
    it('should fetch logic name', () => {
        expect(fetchGracePeriodLogicFromMapping('123', 'base:124,123;test:1234;')).toBe(
            'base'
        )
    })

    it('should fetch logic name without ;', () => {
        expect(fetchGracePeriodLogicFromMapping('123', 'base:124,123;test:1234')).toBe(
            'base'
        )
    })

    it('should fetch logic name with spaces around ids', () => {
        expect(fetchGracePeriodLogicFromMapping('123', 'base:124, 123 ;test:1234')).toBe(
            'base'
        )
    })

    it('should fetch logic name with spaces in logic name', () => {
        expect(fetchGracePeriodLogicFromMapping('123', ' base :124, 123 ; test :1234')).toBe(
            'base'
        )
    })

    it('should fetch logic name with duplicates', () => {
        expect(fetchGracePeriodLogicFromMapping('123', 'base:124,123;test:123;')).toBe(
            'test'
        )
    })

    it('should fetch null', () => {
        expect(fetchGracePeriodLogicFromMapping('1243', 'test1:123;test2:444;')).toBe(
            null
        )
    })

    it('should fetch logic name from string', () => {
        expect(fetchGracePeriodLogicFromMapping('1231', 'test1:123;test2:444;'))
            .toBe(null)
    })
})
describe('some destructive tests', () => {
    it('empty args', () => {
        expect(fetchGracePeriodLogicFromMapping('', '')).toBe(
            null
        )
    })
    it('undefined args', () => {
        expect(fetchGracePeriodLogicFromMapping(undefined, undefined)).toBe(
            null
        )
    })
    it('null args', () => {
        expect(fetchGracePeriodLogicFromMapping(null, null)).toBe(
            null
        )
    })
    it('function args', () => {
        expect(fetchGracePeriodLogicFromMapping(new Function('a,b','return a+b'), ()=> 'OMG')).toBe(
            null
        )
    })
    it('obj args', () => {
        expect(fetchGracePeriodLogicFromMapping({}, {})).toBe(
            null
        )
    })
})
