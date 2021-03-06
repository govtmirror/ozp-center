'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var NotificationActions = require('../../actions/NotificationActions');

describe('PastNotificationStore', () => {

    var PastNotificationStore = require('../PastNotificationStore');

    it('fetches past notifications when notification is created or expired', (done) => {
        var fetchPastStub = sinon.stub(NotificationActions, 'fetchPast');
        var notificationList = PastNotificationStore.getNotifications();
        var notification = {
            id: 1,
            message: 'TEST'
        };
        NotificationActions.createNotificationCompleted(Math.random(), notification);
        NotificationActions.expireNotificationCompleted(notification);

        expect(fetchPastStub.calledTwice).to.be.ok;
        expect(fetchPastStub.calledWith(undefined)).to.be.ok;

        NotificationActions.fetchPastCompleted();

        setTimeout(() => {
            expect(notificationList).to.not.eql(PastNotificationStore.getNotifications());
            done();
        }, 0)
    });

});
