'use strict';

var SelfStore = require('ozp-react-commons/stores/SelfStore');
var $ = require('jquery');

Object.assign = require('object-assign');

var profileBase = Object.freeze({
    "url": "http://localhost:8181/api/profile/2/",
    "organizations": ["Minitrue"],
    "stewarded_organizations": ["Minitrue"],
    "username": "julia",
    "display_name": "Julia Dixon",
    "bio": "",
    "access_control": "http://localhost:8181/api/accessControl/5/"
});

function triggerStore(profile) {
    SelfStore.handleProfileChange($.Deferred().resolve(profile).promise());
}

module.exports = {
    mockAdmin: function (stewardedOrganizations) {
        var profile = Object.assign({}, profileBase, {
            username: 'testAdmin1',
            highestRole: 'APPS_MALL_STEWARD',
            stewardedOrganizations: stewardedOrganizations || []
        });

        triggerStore(profile);

        return profile;
    },

    mockOrgSteward: function (stewardedOrganizations) {
        var profile = Object.assign({}, profileBase, {
            username: 'testOrgSteward1',
            highestRole: 'ORG_STEWARD',
            stewardedOrganizations: stewardedOrganizations || []
        });

        triggerStore(profile);

        return profile;
    },

    mockUser: function () {
        var profile = Object.assign({}, profileBase, {
            username: 'testUser1',
            stewardedOrganizations: []
        });

        triggerStore(profile);

        return profile;
    },

    restore: function () {
        this.mockAdmin();
    },

    init: function() {
        this.mockAdmin();
    },

    getBaseUser: function() {
        return profileBase;
    }
};
