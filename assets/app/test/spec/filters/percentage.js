'use strict';

describe('filters', function() {
    beforeEach(module('DojoApp.filters'));

    describe('percentage', function() {
        it('should convert the number to percentage', inject(function(percentageFilter) {
            expect(percentageFilter(0.5)).toBe('0.5%');
        }));
    });
});