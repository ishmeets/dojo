'use strict';

describe('filters', function() {
    beforeEach(module('DojoApp.filters'));

    describe('ucwords', function() {
        it('should ucwords the string', inject(function(ucwordsFilter) {
          expect(ucwordsFilter('abc')).toBe('Abc');
        }));
    });
});