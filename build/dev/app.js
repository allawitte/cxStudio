'use strict';
(function() {
    var app = angular.module("myApp", ["firebase", 'ui.mask'])
        .factory('Log', LogFactory)
        .factory('dbc', dbcFactory);
    app.constant('FIREBASE_URL', "https://cxstudio.firebaseio.com/")

    app.controller("MainCtrl", function($scope, $firebaseArray, $firebaseObject, Log) {
        self = this;
        self.passNum = '';
        self.passValue = '';
        self.disable = false;
        self.pass = false;
        self.try = '';
        var origArr = [];
        //var ref = new Firebase(FIREBASE_URL);
        Log.logins.$loaded().then(function(result) {
            origArr = result;
            self.passValue = origArr['checkNumber'];
            self.try = origArr['try'];
            //for testing purpose I make an original amount of tryes 0
            self.try = 0;

        });
        //send data to server
        self.log = function() {
            if (self.passValue == self.passNum) self.pass = true;
            else {
                self.try++;
                if (self.try == 2) self.desable = true;
                origArr.$save().then(function(ref) {
                    origArr['try'] = self.try;
                });
            }
            self.passNum = '';
        }
    });

    function dbcFactory(FIREBASE_URL) {
        var obj = {};

        var reference = new Firebase(FIREBASE_URL);

        obj.getRef = function() {
            return reference;
        };



        return obj;

    } //end of factory
    function LogFactory(dbc, FIREBASE_URL, $firebaseObject, $firebaseArray) {
        console.log(dbc);
        var obj = {};
        //obj.exclists = $firebaseArray(new Firebase(FIREBASE_URL + '/exclists'));

        obj.logins = $firebaseObject(dbc.getRef());
        //console.log("objExlist: ", obj.Exlist);
        return obj;

    };



})();
