angular.module('starter.services', [])

.factory('data', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var data = [{
    id: 0,
    name: '名称',
    deseg: '暴走的香菇',
    sex:'男',
    berth:'1993-02-07',
    height:'175cm',
    face: 'img/150x165/vijay-kumar.png'
  }, {
    id: 1,
    name: '步数',
    deseg: '1574',
    face: 'img/running.png',
    length:'1.2',
    time:'0',
    cal:'78'
  }, {
    id: 2,
	name: '体重',
	deseg: '60.0',
    aim:'65.0',
    fat:'0.0',
    blood:'120-80',
    face: 'img/weighed.png'
  }];

  return {
    all: function() {
      return data;
    },
    remove: function(id) {
      data.splice(data.indexOf(id), 1);
    },
    get: function(dataId) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(dataId)) {
          return data[i];
        }
      }
      return null;
    }
  };
}).factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
}, {
  id: 1,
  name: 'Max Lynx',
  lastText: 'Hey, it\'s me',
  face: 'img/max.png'
}, {
  id: 2,
  name: 'Adam Bradleyson',
  lastText: 'I should buy a boat',
  face: 'img/adam.jpg'
}, {
  id: 3,
  name: 'Perry Governor',
  lastText: 'Look at my mukluks!',
  face: 'img/perry.png'
}, {
  id: 4,
  name: 'Mike Harrington',
  lastText: 'This is wicked good ice cream.',
  face: 'img/mike.png'
}];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
  .service("getParamService",function(){

    var param = null;

  return {

    setValue:function(value){

      param = value;

    },

    getValue:function(){

      return param;

    },

    clearValue:function(){

      param = null;

    }


  }

});
