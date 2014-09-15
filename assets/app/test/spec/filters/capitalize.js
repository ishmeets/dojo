'use strict';

describe('filters', function() {
    beforeEach(module('DojoApp.filters'));

    describe('capitalize', function() {
        it('should capitalize the string', inject(function(capitalizeFilter) {
          expect(capitalizeFilter('abc')).toBe('ABC');
        }));
    });
});
