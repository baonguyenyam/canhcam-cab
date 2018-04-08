'use strict';

var Link = require('../src/scripts/js/link');

describe('Link View', function() {

    beforeEach(function() {
        this.link = new Link();
    });

    it('Should run a few assertions', function() {
        expect(this.link).toBeDefined();
    });

});