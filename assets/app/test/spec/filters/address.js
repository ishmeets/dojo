'use strict';

describe('filters', function() {
    beforeEach(module('DojoApp.filters'));

    describe('Address filter', function() {
        it('should return an formatted address', inject(function(addressFilter) {
            expect(addressFilter({
                'address_number'  : 1,
                'address_street'  : 'Main Street',
                'address_street2' : 'Lorong Tiga',
                'city'            : 'Walnut Creek',
                'state'           : 'CA',
                'zip'             : '94597',
                'country'         : 'USA'
            })).toBe("1 Main Street Lorong Tiga\nWalnut Creek, CA 94597 USA");
        }));

        it('should return empty string', inject(function(addressFilter) {
            expect(addressFilter({
                'addressStreet'  : 'Main Street',
                'addressStreet2' : 'Lorong Tiga',
                'city'           : 'Walnut Creek',
                'zipCode'        : '94597',
                'country'        : 'USA'
            })).toBe('');
        }));
    });
    
});
