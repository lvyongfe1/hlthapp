/**
 * Created by Cxx on 2016/7/6.
 */
/* global ble*/
/* jshint browser: true , devel: true*/

//var ble = cordova.require('com.megster.cordova.ble.central.BLECentralPlugin');

var heartRate = {
  service: '180d',
  measurement: '2a37'
};

var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    console.log("1");
  },
  onDeviceReady: function() {
    app.scan();
  },
  scan: function() {
    app.status("Scanning for Heart Rate Monitor");

    var foundHeartRateMonitor = false;

    function onScan(peripheral) {
      // this is demo code, assume there is only one heart rate monitor
      console.log("Found " + JSON.stringify(peripheral));
      foundHeartRateMonitor = true;

      ble.connect(peripheral.id, app.onConnect, app.onDisconnect);
    }

    function scanFailure(reason) {
      console.log("BLE Scan Failed");
    }
    console.log(window.ble);
    ble.scan([heartRate.service], 5, onScan, scanFailure);

    setTimeout(function() {
      if (!foundHeartRateMonitor) {
        app.status("Did not find a heart rate monitor.");
      }
    }, 5000);
  },
  onConnect: function(peripheral) {
    app.status("Connected to " + peripheral.id);
    ble.startNotification(peripheral.id, heartRate.service, heartRate.measurement, app.onData, app.onError);
  },
  onDisconnect: function(reason) {
    console.log("Disconnected " + reason);
    beatsPerMinute.innerHTML = "...";
    app.status("Disconnected");
  },
  onData: function(buffer) {
    // assuming heart rate measurement is Uint8 format, real code should check the flags
    // See the characteristic specs http://goo.gl/N7S5ZS
    var data = new Uint8Array(buffer);
    beatsPerMinute.innerHTML = data[1];
  },
  onError: function(reason) {
    console.log("There was an error " + reason);
  },
  status: function(message) {
    console.log(message);
  }
};
angular.module('Ble', ['ionic'])
  .controller('bleCtrl',function ($scope, $ionicPopup) {
    // 一个确认对话框
    $scope.showConfirm = function() {
      console.log("clicked");
      var confirmPopup = $ionicPopup.confirm({
        title: '开启蓝牙',
        template: '是否开启蓝牙？',
        okText:'确定',
        cancelText:"取消"
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
          app.initialize();
          //document.addEventListener('deviceready',init,false);
        } else {
          console.log('You are not sure');
        }
      });
    };
  });
