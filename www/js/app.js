// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in login.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers' , 'starter.services','ngChart','Ble','ionic-timepicker','ionic-datepicker'])


  //设置全局连接appUrl
  .service('connectAppUrl',function(){

     this.connectUrl = function(){

      return "http://192.168.100.169:7777/nhfpc";//远程调用接口

    }


  })

.run(function($ionicPlatform , $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

     $rootScope.authStatus = true;
	 //stateChange event
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		  $rootScope.authStatus = toState.authStatus;
		  if($rootScope.authStatus){

		  }
    });

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		console.log("URL : "+toState.url);
		if(toState.url=='/dashboard'){
			console.log("match : "+toState.url);
			$timeout(function(){
				angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
			},1000);
		}
	});

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
    console.log("URL : "+toState.url);
    console.log("URL1 : "+toState);

  });



})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

//--------------------------------------

 .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signin.html'
      }
    },
	authStatus: false
  })



/*   //将登陆页面作为首屏页面
    .state('app', {
      url: '/login',
      abstract: true,
      templateUrl:'templates/tab-signin.html'
    })*/

    // Each tab has its own nav history stack:








 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signup.html'
      }
   },
	authStatus: false
  })
//--------------------------------------


  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
		controller: 'DashCtrl'
      }
     },
	 //authStatus: true
    //将authStatus改为false    tanglin

  })


    .state('app.data', {
      url: '/data',
      views: {
        'menuContent': {
          templateUrl: 'templates/data.html',
          controller: 'DataCtrl'
        }
      }
    })

  .state('app.dataDetail', {
    url: '/data/0',
    views: {
      'menuContent': {
        templateUrl: 'templates/data-detail0.html',
        controller: 'DataDetailCtrl'
      }
    }
  })
      .state('app.runDetail', {
          url: '/data/1',
          views: {
              'menuContent': {
                  templateUrl: 'templates/data-detail1.html',
                  controller: 'RunDetailCtrl'
              }
          }
      })
      .state('app.weightDetail', {
          url: '/data/2',
          views: {
              'menuContent': {
                  templateUrl: 'templates/data-detail2.html',
                  controller: 'WeightDetailCtrl'
              }
          }
      })
      .state('app.sleep', {
          url: '/sleep',
          views: {
              'menuContent': {
                  templateUrl: 'templates/sleep.html',
                  controller: 'SleepCtrl'
              }
          }
      })
      .state('app.medicine', {
          url: '/medicine',
          views: {
              'menuContent': {
                  templateUrl: 'templates/medicine.html',
                  controller: 'MedicineCtrl'
              }
          }
      }).       //;

   //新增底部ion-tab导航页面 tanglin
    state('app.tabs',{
      url:'/tabs',
      abstract: true,

      views:{

        'menuContent': {
          templateUrl: 'templates/tabs.html',
          controller: 'tabCtrl'
        }


      }

  }).

  /*  首页*/
  state('app.tabs.first',{
    url:'/first',

    views:{

      'tab-first': {
        templateUrl: 'templates/tab-first.html',
       // controller: 'tabCtrl'
      }


    }

  }).

    /*健康管家*/
  state('app.tabs.housekeeper',{
    url:'/housekeeper',
    cache:false,
    views:{

      'tab-housekeeper': {
        templateUrl: 'templates/tab-housekeeper.html',
       // controller: 'housekeeperCtrl'
      }


    }

  }).

  /*健康管家-心率监测*/
  state('app.tabs.heartrate',{
    url:'/heartrate',
    cache: false,
    views:{

      'tab-housekeeper': {
        templateUrl: 'templates/housekeeper-heartrate.html',
        controller: 'heartrateCtrl'
      }


    }

  }).

  /*健康管家-心率监测-sub模板*/
  state('app.tabs.heartrate.sub',{
    url:'/sub',
    templateUrl: 'templates/housekeeper-heartrate-subtemp.html',
    cache:false,
    abstract:true
/*    controller:['$scope', '$state',
    function ($scope, $state) {


        $state.go('app.tabs.heartrate.sub.date');

    }
  ]*/

  }).
  /*健康管家-心率监测-日*/
  state('app.tabs.heartrate.sub.date',{
    url:'/date',
    cache: false,
    views:{

      'heartrate-chart': {
        templateUrl: 'templates/housekeeper-heartrate-datechart.html',
        controller: 'dateHeartRateCtrl'
      }


    }

  }).

  /*健康管家-心率监测-周*/
  state('app.tabs.heartrate.sub.week',{
    url:'/week',

    views:{

      'heartrate-chart': {
        templateUrl: 'templates/housekeeper-heartrate-weekchart.html',
        controller: 'weekHeartRateCtrl'
      }


    }

  }).

  /*健康管家-心率监测-月*/
  state('app.tabs.heartrate.sub.month',{
    url:'/month',

    views:{

      'heartrate-chart': {
        templateUrl: 'templates/housekeeper-heartrate-monthchart.html',
        controller: 'monthHeartRateCtrl'
      }


    }

  }).

  /*健康管家-心率监测-年*/
  state('app.tabs.heartrate.sub.year',{
    url:'/year',

    views:{

      'heartrate-chart': {
        templateUrl: 'templates/housekeeper-heartrate-yearchart.html',
        controller: 'yearHeartRateCtrl'
      }


    }

  }).

  /*健康管家-心率监测-显示所有数据*/
  state('app.tabs.allheartrate',{
    url:'/heartrate/all',
    cache:false,
    views:{

      'tab-housekeeper': {
        templateUrl: 'templates/housekeeper-heartrate-all.html',
        controller: 'heartrateAllCtrl'
      }


    }

  }).

  /*健康管家-心率监测-添加心率数据*/
  state('app.tabs.addheartrate',{
    url:'/heartrate/add',
    cache:false,
    views:{

      'tab-housekeeper': {
        templateUrl: 'templates/housekeeper-heartrate-add.html',
        controller: 'heartrateAddCtrl'
      }


    }

  }).

  /*健康管家-体脂监测*/
  state('app.tabs.bodyfat',{
    url:'/bodyfat',
    views:{
      'tab-housekeeper': {
        templateUrl: 'templates/housekeeper-bodyfat.html',
        controller: 'bodyfatCtrl'
      }
    }
  }).
  /*健康管家-体脂监测-显示所有数据*/
  state('app.tabs.allbodyfat',{
    url:'/bodyfat/all',
    views:{

      'tab-housekeeper': {
        templateUrl: 'templates/housekeeper-bodyfat-all.html',
        controller: 'bodyfatAllCtrl'
      }


    }

  }).

  /*健康管家-体脂监测-添加体脂数据*/
  state('app.tabs.addbodyfat',{
    url:'/bodyfat/add',
    views:{

      'tab-housekeeper': {
        templateUrl: 'templates/housekeeper-bodyfat-add.html',
        controller: 'bodyfatAddCtrl'
      }


    }

  }).

  /*健康管家-体重监测*/
  state('app.tabs.weight',{
    url:'/weight',
    views:{
      'tab-housekeeper': {
        templateUrl: 'templates/housekeeper-weight.html',
        controller: 'weightCtrl'
      }
    }
  }).
  /*健康管家-体重监测-显示所有数据*/
  state('app.tabs.allweight',{
    url:'/weight/all',
    views:{

      'tab-housekeeper': {
        templateUrl: 'templates/housekeeper-weight-all.html',
        controller: 'weightAllCtrl'
      }


    }

  }).

  /*健康管家-体重监测-添加体重数据*/
  state('app.tabs.addweight',{
    url:'/weight/add',
    views:{

      'tab-housekeeper': {
        templateUrl: 'templates/housekeeper-weight-add.html',
        controller: 'weightAddCtrl'
      }


    }

  }).

   /* 寻医问诊*/

  state('app.tabs.searchvisits',{
    url:'/searchvisits',

    views:{

      'tab-searchvisits': {
         templateUrl: 'templates/tab-search.html',
        // controller: 'tabCtrl'
      }


    }

  }).

  /* 健康资讯*/

  state('app.tabs.healthinquiry',{
    url:'/healthinquiry',
    abstract: true,
   // templateUrl: 'templates/tab-healthinquiry.html',
   // controller: 'healthInquiryCtrl'
    //cache:false,
    views:{

      'tab-healthinquiry': {
        templateUrl: 'templates/tab-healthinquiry.html',
        controller: 'healthInquiryCtrl'
      }


    }

  }).

  /* 健康新闻*/
  state('app.tabs.healthinquiry.healthnews',{
    url:'/healthnews',
    cache:false,
    views:{

      'healthinquiry-healthnews': {
        templateUrl: 'templates/healthinquiry-healthnews.html',
        controller: 'aCtrl'
      }


    }

  }).

    state('app.tabs.detail', {
      url: '/detail/:chatId',
      views: {
        'tab-healthinquiry': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'dCtrl'
        }
      }
    }).

  /* 医疗百科*/
  state('app.tabs.healthinquiry.medency',{
    url:'/medency',
   // cache:false,
    views:{

      'healthinquiry-medency': {
        templateUrl: 'templates/healthinquiry-medency.html',
        controller: 'bCtrl'
      }


    }

  }).



  /* 医疗百科-百科分类列表*/
  state('app.tabs.medcategory',{

    url:'/medcategory/:keyWord/:typeName',
    //cache:false,
    //params:{'keyWord':null},
    views:{

      'tab-healthinquiry': {
        templateUrl: 'templates/medency-category.html',
        controller: 'categoryCtrl'
      }


    }

  }).
  /* 医疗百科-列表详情*/
  state('app.tabs.medcategorydetail',{
    url:'/medcatedetail/:id',
    //cache:false,
    views:{

      'tab-healthinquiry': {
        templateUrl: 'templates/medency-category-detail.html',
        controller: 'categoryDetailCtrl'
      }


    }

  })
    /* 养生频道*/
    .state('app.tabs.healthinquiry.healthchannel',{
      url:'/healthchannel',
      views:{
        'healthinquiry-healthchannel': {
          templateUrl: 'templates/healthinquiry-healthchannel.html',
          controller: 'cCtrl'
        }
      }
    })

    /* 养生频道-信息详情*/
    .state('app.tabs.healthchandetail',{
      url:'/healchandetail',
      views:{
        'tab-healthinquiry': {
          templateUrl: 'templates/healthchannel-detail.html',
          controller: 'healChanDetailCtrl'
        }
      }
    })

    .state('app.tabs.healthchandetail11',{
      url:'/healchandetail11',
      views:{
        'tab-healthinquiry': {
          templateUrl: 'templates/healthchannel-detail11.html',
          controller: 'healChanDetailCtrl11'
        }
      }
    })
    .state('app.tabs.healthchandetail12',{
      url:'/healchandetail12',
      views:{
        'tab-healthinquiry': {
          templateUrl: 'templates/healthchannel-detail12.html',
          controller: 'healChanDetailCtrl12'
        }
      }
    })

    .state('app.tabs.healthchandetail13',{
      url:'/healchandetail13',
      views:{
        'tab-healthinquiry': {
          templateUrl: 'templates/healthchannel-detail13.html',
          controller: 'healChanDetailCtrl13'
        }
      }
    })

    .state('app.tabs.healthchandetail14',{
      url:'/healchandetail14',
      views:{
        'tab-healthinquiry': {
          templateUrl: 'templates/healthchannel-detail14.html',
          controller: 'healChanDetailCtrl14'
        }
      }
    })

    .state('app.tabs.healthchandetail15',{
      url:'/healchandetail15',
      views:{
        'tab-healthinquiry': {
          templateUrl: 'templates/healthchannel-detail15.html',
          controller: 'healChanDetailCtrl15'
        }
      }
    })

    .state('app.tabs.healthchandetail16',{
      url:'/healchandetail16',
      views:{
        'tab-healthinquiry': {
          templateUrl: 'templates/healthchannel-detail16.html',
          controller: 'healChanDetailCtrl16'
        }
      }
    })

    .state('app.tabs.healthchandetail17',{
      url:'/healchandetail17',
      views:{
        'tab-healthinquiry': {
          templateUrl: 'templates/healthchannel-detail17.html',
          controller: 'healChanDetailCtrl17'
        }
      }
    })

    /*用户中心  lyf  */
    .state('app.tabs.usercenter',{
      url:'/usercenter',
      cache:false,
      views:{

        'tab-usercenter': {
          templateUrl: 'templates/tab-account.html',
          //controller: 'tabCtrl'
        }
      }
    });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})

  .factory('pageCache',function($cacheFactory){
    return $cacheFactory('page');
  })
  .factory('commonFactory',function(pageCache,$location){
    return{
      backUrl:function(url){
        pageCache.put('url',url);//这个用来保存页面
      },

      clearUrl:function(){

        pageCache.put('url','');

      },

      goBack:function(){
    // debugger;
        console.log(pageCache.get('url'));
        $location.path(pageCache.get('url'));//这个用来跳转页面
      }
    }
  }).
//ios andriod统一将导航tab放在底部 tanglin
  config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(5);

    // note that you can also chain configs
    $ionicConfigProvider.tabs.position("bottom");
  });
