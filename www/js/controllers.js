angular.module('starter.controllers', [])

.controller('AppCtrl', function(connectAppUrl,$ionicLoading,$scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup,data, $ionicHistory,$rootScope,$state,$http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $rootScope.$on('$ionicSideMenuClose', function (e, side) {
    if (side == 'left') {
      $timeout(function () {
        $ionicHistory.nextViewOptions({
          historyRoot: false,
          disableAnimate: false,
          expire: null
        });
      }, 100);
    }
  });
  $scope.loginData = {};

	//$location.path('/app/dashboard'); tanglin

  $location.path('/app/login');

  //--------------------------------------------
  $scope.login = function(user) {

    if(typeof(user)=='undefined' || user.username == '' || user.password == ''){
      $scope.showAlert('请输入用户名或密码');
      return false;
    }
    //用户登录 tanglin
    var url = connectAppUrl.connectUrl() + "/appLogin/appUserLoginIn";

    var hfUser = {'username':user.username ,'password': user.password};

    console.log(hfUser);

    $http.post(url,hfUser)
      .success(function(data, status, headers, config){

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        $timeout(function() {
          $ionicLoading.hide();
          if (data && data.suc == '1') {
            $state.go('app.tabs.first');
          }else if(data && data.suc == '0'){
            $ionicPopup.alert({
              title: '输入错误',
              template: data.msg,
              okText: '确定'
            });
          }else {
            $ionicPopup.alert({
              title: '系统错误',
              template: '请联系管理员！',
              okText: '确定'
            });
          }
        }, 1000);

        console.log(data);

      })
      .error(function(data, status, headers, config){

        $ionicPopup.alert({
          title: '网络错误',
          template: '请检查网络连接，确保网络通畅！',
          okText: '确定'
        });

      });


    /*     $http({
     method: "POST",
     url: url,
     contentType : 'application/json',
     dataType : "JSON",
     data: JSON.stringify({
     'username':user.username ,
     'password': user.password
     })
     })
     .success(function(data, status, headers, config) {

     console.log(data);
     // $scope.list = data.pageInfo.list;

     })
     .error(function(data, status, headers, config) {
     console.log(data);
     $ionicPopup.alert({
     title: '网络错误',
     template: '请检查网络连接，确保网络通畅！',
     okText: '确定'
     });
     });*/

    		if(user.username=='admin' && user.password=='111111'){
     //$location.path('/app/dashboard');  tanglin

     //将原来的跳转dash页面改为跳转tabs页面
     $state.go('app.tabs.first');


     }else{
     $scope.showAlert('错误的用户名或密码。');
     }

  };
  //--------------------------------------------
  $scope.logout = function() {   $ionicHistory.clearCache().then(function(){ $location.path('/app') })   };
  //--------------------------------------------
   // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: '警告',
		 template: msg
	   });
	 };
  //--------------------------------------------
	$scope.data = data.all();
})

.controller('DataCtrl', function($scope , data) {
    $scope.data = data.all();
})

 // .controller('DataDetailCtrl', function($scope, $stateParams , data) {
 // 	$scope.dataDetail = data.get($stateParams.dataId);
 // })
	.controller('DataDetailCtrl', function($scope, data) {
		$scope.dataDetail = data.get('0');
	})
	.controller('RunDetailCtrl', function($scope, data) {
		$scope.dataDetail = data.get('1');
	})
	.controller('WeightDetailCtrl', function($scope, data) {
		$scope.dataDetail = data.get('2');
	})
.controller('DashCtrl', function($scope, $stateParams , data) {
	$scope.data = data.all();
})
.controller('SleepCtrl', function($scope, $stateParams , data) {
	$scope.data = data.all();
})
	.controller('MedicineCtrl', function($scope, $stateParams , data) {
		$scope.data = data.all();
	})

  /*新增tabCtrl tanglin*/
  .controller('tabCtrl', function($scope, $location) {
    $scope.badges = {
      carts: "105",
      contact: 0
    };

    $scope.num = "100";
    //$location.path('/app/login');

  }).controller('healthInquiryCtrl', function($ionicTabsDelegate,$scope,$location,$state,$ionicTabsDelegate) {

 //$state.go('app.tabs.healthinquiry.healthnews');

   //$location.path('/app/tabs/healthinquiry/healthnews');

  //$state.go('app.tabs.healthinquiry.healthnews');

  //$scope.selectTabWithIndex = function(index) {
  //  $ionicTabsDelegate.select(index);
  //}

  $scope.showView = function(idx){



    console.log(idx);

    $state.go('app.tabs.healthinquiry.' + idx);

    // $ionicTabsDelegate.select(idx)

  };

 // $ionicTabsDelegate.select(0);



}).controller('aCtrl', function($scope,$location,$state,$ionicTabsDelegate,Chats,$stateParams,$http,$ionicPopup,connectAppUrl) {

    //$location.path('/app/tabs/healthinquiry/healthnews');

    //$state.go('app.tabs.healthinquiry.healthnews');

    //分页查询最新健康资讯
    var url = connectAppUrl.connectUrl() + "/healthNews/pageInfo";

    $scope.list = []; //预先定义对象数组，存放gethotnews传递的eroor值

    function getHotNews() {
      $http({
        method: "post",
        url: url
/*        data: JSON.stringify({
          'status': 2,
          'areaId': areaId,
          'pageVo': $scope.pageVo
        })*/
      })
        .success(function(data, status, headers, config) {
          //debugger;
/*          if (data.code == "1002") {
            $scope.completeWorks = [];
            $scope.hasMore = false;
            return;
          } else if (data.code == "1003") {
            var popup = $ionicPopup.alert({
              title: '提示',
              template: '您还未登录，请先登录系统！'
            });
            $timeout(function() {
              popup.close();
              window.location.href = "self_dl.html";
            }, 1000);
          } else if (data.code == "1000") {
            $scope.times = 1;
            $scope.completeWorks = data.data.rows;
            $scope.condition = null;
            $scope.searchCondition = null;
          } else {
            $ionicPopup.alert({
              title: '系统错误',
              template: '请联系管理员！',
              okText: '确定'
            });
          }
          if (data.data.pages == 1 || data.data.pages == 0) {
            $scope.hasMore = false;
          }*/
          console.log(data);
          $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          //debugger;
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

    console.log($ionicTabsDelegate.selectedIndex());

    getHotNews();



    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };



   // $scope.chat = Chats.get($stateParams.chatId);

/*    $scope.showView = function(){





      $state.go('app.tabs.healthinquiry.healthnews');







    };*/

  })



  .controller('bCtrl', function(connectAppUrl,commonFactory,$scope,$location,$state,$ionicTabsDelegate,$http,$ionicPopup,$sce) {



    var url = connectAppUrl.connectUrl() + "/medEncy/keyWord";

    //$state.go('detail',{'back':'app.tabs.healthinquiry.medency'});

    $scope.$on('$ionicView.beforeEnter',function(){

      commonFactory.backUrl($location.url());//保存当前页面的url

    });


    $scope.list = [];
    //获取百科
    function getKeyWord() {
      $http({
        method: "post",
        url: url,

      })
        .success(function(data, status, headers, config) {

          console.log(data);

          var totalHtml = "";

          if (data && data.suc == '1') {

            for (var i = 0; i < data.obj.list.length; i++) {

              if (i % 3 == 0) {

                var html = "<div class=\"button-bar\" style=\"border-bottom: 1px solid #ddd\">";

              }
              html +=  "<a class=\"button button-clear button-dark imgList\"  href='#/app/tabs/medcategory/"+ data.obj.list[i].id+"'>";
              html+="<img src='img/e6bc787ba1bc2008634983b786a4e269.jpg'>";
              html+='<p>'+data.obj.list[i].typeName +"</p></a>";

              if(i % 3 == 2){

                html += "</div>";

                totalHtml += html;

              }


              $scope.list = data.obj.list;



            }

            $scope.info = $sce.trustAsHtml(totalHtml);

          }else {
            $ionicPopup.alert({
              title: '系统错误',
              template: '请联系管理员！',
              okText: '确定'
            });
          }

        })
        .error(function(data, status, headers, config) {
          //debugger;
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

   getKeyWord();

  console.log($ionicTabsDelegate.selectedIndex());

/*  $scope.showView = function(){







      $state.go('app.tabs.healthinquiry.medency');





  };*/

})
  //刷新   lyf
  .controller('InfoCtrl', function($rootScope, $timeout, $interval, $scope, $http, services) {
    var vm = $scope.vm = {
      moredata: false,
      messages: [],
      pagination: {
        perPage: 5,
        currentPage: 1
      },
      init: function () {
        services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
          vm.messages = data;
        })
      },
      show: function (message) {
        if (message.static) {
          message.static = false;
        } else {
          message.static = true;
        }
      },
      doRefresh: function () {
        $timeout(function () {
          $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
      },
      loadMore: function () {
        vm.pagination.currentPage += 1;
        services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
          vm.messages = vm.messages.concat(data);
          if (data.length == 0) {
            vm.moredata = true;
          };
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }
    }
    vm.init();
  })



.controller('cCtrl', function($scope,$location,$state,$ionicTabsDelegate) {

  //$location.path('/app/tabs/healthinquiry/healthnews');

  //$state.go('app.tabs.healthinquiry.healthnews');

  console.log($ionicTabsDelegate.selectedIndex());

 $scope.showView = function(){

    $state.go('app.tabs.healthinquiry.healthchannel');

  };

}).controller('dCtrl', function(connectAppUrl,$scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate,$http,$ionicPopup,$sce) {

  console.log(Chats.get($stateParams.chatId));
  $scope.chat = Chats.get($stateParams.chatId);
  var id = $stateParams.chatId;//新闻详情id
  console.log(id);

    //分页查询最新健康资讯
    var url = connectAppUrl.connectUrl() + "/healthNews/view";

    var url1 = connectAppUrl.connectUrl() + "/hotNews/pageInfo";

    $scope.list = []; //预先定义对象数组，存放gethotnews传递的eroor值

    function getHotNews() {
      $http({
        method: "get",
        url: url,
        params:{"id":id,"rows":5}

      })
        .success(function(data, status, headers, config) {
          console.log(data);
          //$scope.detail = data;
          $scope.list = data.pageInfo.list;

/*          angular.forEach(data.pageInfo.list, function(data,index,array){

            if(data.id == id ){

              var originUrl = data.originUrl, origin = data.origin, releaseDate = data.releaseDate, views = data.views, title = data.title, html = "";
              if (origin != null && origin != "") {
                if (originUrl != null && originUrl != "") {
                  if (originUrl.indexOf("http") == 0) {
                    html += "【来源：<a href='"+originUrl+"' target='_blank'>" + origin + "</a>】&nbsp;&nbsp;";
                  } else {
                    html += "【来源：<a href='http://"+originUrl+"' target='_blank'>" + origin + "</a>】&nbsp;&nbsp;";
                  }
                } else {
                  html += "【来源：" + origin + "】&nbsp;&nbsp;";
                }
              }
              html += "【发布日期：" + releaseDate + "】";
              html += "&nbsp;&nbsp;【阅读次数：" + views + "】";


              $scope.headtitle = data.title;
              $scope.info = $sce.trustAsHtml(html);
              $scope.detail = $sce.trustAsHtml(data.content);
              return;

            }


          });*/


          angular.forEach(data.pageInfo.list, function(data,index,array){



              var originUrl = data.originUrl, origin = data.origin, releaseDate = data.releaseDate, views = data.views, title = data.title, html = "";
              if (origin != null && origin != "") {
                if (originUrl != null && originUrl != "") {
                  if (originUrl.indexOf("http") == 0) {
                    html += "【来源：<a href='"+originUrl+"' target='_blank'>" + origin + "</a>】&nbsp;&nbsp;";
                  } else {
                    html += "【来源：<a href='http://"+originUrl+"' target='_blank'>" + origin + "</a>】&nbsp;&nbsp;";
                  }
                } else {
                  html += "【来源：" + origin + "】&nbsp;&nbsp;";
                }
              }
              html += "【发布日期：" + releaseDate + "】";
              html += "&nbsp;&nbsp;【阅读次数：" + views + "】";


              $scope.headtitle = data.title;
              $scope.info = $sce.trustAsHtml(html);
              $scope.detail = $sce.trustAsHtml(data.content);





          });

        })
        .error(function(data, status, headers, config) {
          //debugger;
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

   getHotNews();

 // $state.go('detail',{'back':'tab.home'});
  $scope.back = function() {

    $ionicViewSwitcher.nextDirection('back');
    //$state.go($stateParams.back);
    //app.tabs.healthinquiry.healthnews

    $state.go('app.tabs.healthinquiry.healthnews');
  };

  $scope.goBack = function() {
    $ionicNavBarDelegate.back();
    $state.go('app.tabs.healthinquiry.healthnews');

  };


})
/* 医疗百科-百科分类列表*/
  .controller('categoryCtrl', function(getParamService,connectAppUrl,commonFactory,$ionicHistory,$location,$scope,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate,$http,$ionicPopup,$sce) {



    $scope.$on('$ionicView.beforeEnter',function(){


      commonFactory.clearUrl();

      commonFactory.backUrl($location.url());//保存当前页面的url

    });


    console.log($stateParams.keyWord);
    console.log($stateParams.typeName);
    //getParamService.setValue($stateParams.typeName);
    $scope.typeName = $stateParams.typeName;
    //获取每个分类下的列表
    function getCateList(){




      var url = connectAppUrl.connectUrl() + '/medEncy/list';
      var vo = {
        'keyWord': $stateParams.keyWord
      };
      /*        data: JSON.stringify({
       'status': 2,
       'areaId': areaId,
       'pageVo': $scope.pageVo
       })*/

      /*      transFn = function(vo) {
       return $.param(vo);
       };

       console.log(transFn(vo));*/

      postCfg = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: keyWord=$stateParams.keyWord
      };

      $http.post(url, JSON.stringify(vo))
        .success(function(data){

          console.log(data);

          if (data && data.suc == '1') {

            $scope.list = data.obj.list;

          }else {
            $ionicPopup.alert({
              title: '系统错误',
              template: '请联系管理员！',
              okText: '确定'
            });
          }

        }).error(function(data){


      });


    };

   getCateList();



    $scope.chat = Chats.get($stateParams.chatId);

/*    $ionicHistory.nextViewOptions({
      disableBack: true
    });*/

    // $state.go('detail',{'back':'tab.home'});
    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');

      console.log($ionicHistory.viewHistory());
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews


        //$state.go($stateParams.back);

     //  $state.go('app.tabs.healthinquiry.medency');

      $ionicHistory.forwardView();
    };

    $scope.goBack = function() {

     // $ionicNavBarDelegate.back();
      console.log($ionicHistory.viewHistory());



     // $location.path('/app/tabs/healthinquiry/medency').replace();

      $location.url('/app/tabs/healthinquiry/medency').search("");
     // $location.path('/app/tabs/healthinquiry/medency').replace();
    // $state.go('app.tabs.healthinquiry.medency');
    // debugger;showView
   // commonFactory.goBack();

    };
  })

  .controller('categoryDetailCtrl', function(connectAppUrl,commonFactory,$ionicHistory,$scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate,$http,$ionicPopup,$sce) {

    var id = $stateParams.id;//列表详情id
    console.log(id);
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    var param = "";

    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews


      //$state.go($stateParams.back);

      //$location.path('/app/tabs/medcategory/不孕不育');

      if(param == ""){

        $state.go('app.tabs.healthinquiry.medency');

      }else{

        $state.go('app.tabs.medcategory',{keyWord:param});

      }



      //commonFactory.goBack();
    // $ionicHistory.goBack(-1);medcategory
    };



    //分页查询最新健康资讯
    var url = connectAppUrl.connectUrl() + "/medEncy/detail";

    $scope.list = []; //预先定义对象数组，存放gethotnews传递的eroor值

    function getDetail() {
      $http({
        method: "post",
        url: url,
        data:{'id':id}
      })
        .success(function(data, status, headers, config) {
          console.log(data);
          //$scope.detail = data;

          if (data && data.suc == '1') {


           // console.log(data.obj);

            param = data.obj.keyWord;


                var originUrl = data.obj.originUrl, origin = data.obj.origin, releaseDate = data.obj.releaseDate, views = data.obj.views, title = data.obj.title, html = "";
                if (origin != null && origin != "") {
                  if (originUrl != null && originUrl != "") {
                    if (originUrl.indexOf("http") == 0) {
                      html += "【来源：<a href='"+originUrl+"' target='_blank'>" + origin + "</a>】&nbsp;&nbsp;";
                    } else {
                      html += "【来源：<a href='http://"+originUrl+"' target='_blank'>" + origin + "</a>】&nbsp;&nbsp;";
                    }
                  } else {
                    html += "【来源：" + origin + "】&nbsp;&nbsp;";
                  }
                }
                html += "【发布日期：" + releaseDate + "】";
                html += "&nbsp;&nbsp;【阅读次数：" + views + "】";


                $scope.headtitle = data.obj.title;
                $scope.info = $sce.trustAsHtml(html);
                $scope.detail = $sce.trustAsHtml(data.obj.content);


          }else {
            $ionicPopup.alert({
              title: '系统错误',
              template: '请联系管理员！',
              okText: '确定'
            });
          }

        })
        .error(function(data, status, headers, config) {
          //debugger;
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

    getDetail();


  })



  /* 养生频道-信息详情列表*/
  .controller('healChanDetailCtrl', function($scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate) {

    console.log(Chats.get($stateParams.chatId));
    $scope.chat = Chats.get($stateParams.chatId);

    // $state.go('detail',{'back':'tab.home'});
    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews

      $state.go('app.tabs.healthinquiry.healthchannel');
    };

  })

  .controller('healChanDetailCtrl11', function($scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate) {

    console.log(Chats.get($stateParams.chatId));
    $scope.chat = Chats.get($stateParams.chatId);

    // $state.go('detail',{'back':'tab.home'});
    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews

      $state.go('app.tabs.healthinquiry.healthchannel');
    };

  })

  .controller('healChanDetailCtrl12', function($scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate) {

    console.log(Chats.get($stateParams.chatId));
    $scope.chat = Chats.get($stateParams.chatId);

    // $state.go('detail',{'back':'tab.home'});
    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews

      $state.go('app.tabs.healthinquiry.healthchannel');
    };

  })



  .controller('healChanDetailCtrl13', function($scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate) {

    console.log(Chats.get($stateParams.chatId));
    $scope.chat = Chats.get($stateParams.chatId);

    // $state.go('detail',{'back':'tab.home'});
    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews

      $state.go('app.tabs.healthinquiry.healthchannel');
    };

  })

  .controller('healChanDetailCtrl14', function($scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate) {

    console.log(Chats.get($stateParams.chatId));
    $scope.chat = Chats.get($stateParams.chatId);

    // $state.go('detail',{'back':'tab.home'});
    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews

      $state.go('app.tabs.healthinquiry.healthchannel');
    };

  })

  .controller('healChanDetailCtrl15', function($scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate) {

    console.log(Chats.get($stateParams.chatId));
    $scope.chat = Chats.get($stateParams.chatId);

    // $state.go('detail',{'back':'tab.home'});
    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews

      $state.go('app.tabs.healthinquiry.healthchannel');
    };

  })

  .controller('healChanDetailCtrl16', function($scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate) {

    console.log(Chats.get($stateParams.chatId));
    $scope.chat = Chats.get($stateParams.chatId);

    // $state.go('detail',{'back':'tab.home'});
    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews

      $state.go('app.tabs.healthinquiry.healthchannel');
    };

  })

  .controller('healChanDetailCtrl17', function($scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate) {

    console.log(Chats.get($stateParams.chatId));
    $scope.chat = Chats.get($stateParams.chatId);

    // $state.go('detail',{'back':'tab.home'});
    $scope.back = function() {

      $ionicViewSwitcher.nextDirection('back');
      //$state.go($stateParams.back);
      //app.tabs.healthinquiry.healthnews

      $state.go('app.tabs.healthinquiry.healthchannel');
    };

  })

  /*健康管家-心率监测*/
  .controller('heartrateCtrl', function($ionicViewSwitcher,$scope,$location,$state) {


    $scope.back = function(){

     // $ionicViewSwitcher.nextDirection('back');


      $state.go("app.tabs.housekeeper");


    }

    $scope.avgRate = {

      avg:66

    };

    //ui-sref="app.tabs.heartrate.date"




   //debugger;
   $state.go("app.tabs.heartrate.sub.date");

  })



  /*健康管家-心率监测-显示所有数据*/
  .controller('heartrateAllCtrl', function(connectAppUrl,$ionicPopup,$scope,$location,$state,$stateParams,$ionicActionSheet,$timeout,$http, $ionicViewSwitcher) {


    $scope.back = function(){

     // $ionicViewSwitcher.nextDirection('back');


      $state.go("app.tabs.heartrate.sub.date");


    }

    $scope.items = [];

    $scope.delItems = []; //设置初始删除数组

    //加载天血压数据
    queryIndexRecord(1,"心跳","次/分");

    //获取除血压之外对的其他身体指标
    function queryIndexRecord(id,indexName,unit){
      // var reservation = $("#reservation").val();
      var personId = id;

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppPageHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'timeWay': "date",
          'residentId': id,
          'indexName': indexName
        }
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){

            $scope.items = $scope.items.concat(data.obj.list);

          }else{
            //makePEmptypie();
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }


    $scope.data = {
      showDelete: false
    };

    $scope.active = {

      isActive:false

    };

    $scope.flag = false;

/*    $scope.addRate = function() {
      alert('Edit Item: ' + 1);
    };*/

    $scope.edit = function(item) {
      alert('Edit Item: ' + item.id);
    };
    $scope.share = function(item) {
      alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };


    //批量删除心跳某条数据
    function delIndexRecord(list){

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/delAppHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data:list
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){


            for(var i = 0;i < $scope.delItems.length;i++){

              $scope.items.splice($scope.items.indexOf($scope.delItems[i]), 1);

            }

            $scope.delItems = [];//将数组内容重置为空


            $ionicPopup.alert({
              title: '操作提示',
              template: '删除成功',
              okText: '确定'
            });



            $timeout( function() {
              //simulate async response
             // $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

              //Stop the ion-refresher from spinning

           //  $state.go('app.tabs.allheartrate',{},{reload:true}); //再次刷新页面内容




              $scope.data = {

                showDelete: false

              };

              $scope.$broadcast('scroll.refreshComplete');

            }, 2000);

          }else{

            $ionicPopup.alert({
              title: '操作提示',
              template: '删除失败',
              okText: '确定'
            });

            $scope.delItems = [];//将数组内容重置为空

          }


          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {

          $scope.delItems = [];//将数组内容重置为空
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

    $scope.removeClass = function(){

      for(var i=0;i< $scope.items.length;i++){

        if($scope.items[i].isActive && $scope.items[i].isActive == true){

         // $scope.delItems.push($scope.items[i]);

          document.getElementById( "allRateBackButton" + $scope.items[i].id).style.color = "#111";

          document.getElementById( "allRateBackButton" + $scope.items[i].id).setAttribute("ng-class", "{true: 'ion-ios-checkmark', false: 'ion-ios-circle-outline'}["+false+"]");

          document.getElementById( "allRateBackButton" + $scope.items[i].id).setAttribute("class", "button icon button-icon ion-ios-circle-outline"); //将点击的状态换为圆形

          $scope.items[i].isActive = false;

          console.log( document.getElementById( "allRateBackButton" + $scope.items[i].id).getAttribute("ng-class"));



        }

      }

    }


    $scope.onItemDelete = function(item,flag) {

      //$scope.items.splice($scope.items.indexOf(item), 1);

      //$scope.delItems.push(item);

      //$parent.active.isActive = !$parent.active.isActive;


      if(flag){

        document.getElementById( "allRateBackButton" + item.id).style.color = "#387ef5";

        item.isActive = true;

      }else{

        document.getElementById( "allRateBackButton" + item.id).style.color = "#111";

        item.isActive = false;

      }





      //alert(item.id);


    };

     $scope.save = function(){



       var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: '删除'},
         ],
         /*        destructiveText: '全部删除',
          destructiveText: '删除',*/
         titleText: '当前操作',
         cancelText: '取消',
         cancel: function() {
           $scope.data = {

            showDelete: false

            };
         },
         buttonClicked: function(index,object) {

           $scope.delItems = [];

           for(var i=0;i< $scope.items.length;i++){

             if($scope.items[i].isActive && $scope.items[i].isActive == true){

               console.log($scope.items[i]);

               $scope.delItems.push($scope.items[i]);

             }

           }

           console.log($scope.delItems);

           if($scope.delItems.length <= 0){

             $scope.data = {

               showDelete: false

             };

             return true;

           }



          delIndexRecord($scope.delItems);



           /*          $timeout(function() {

            $scope.data = {
            showDelete: false
            };

            }, 2000);*/

           /*          $scope.data = {
            showDelete: false
            };*/

           return true;
         },

       });



     }

  })


  /*健康管家-心率监测-添加心率数据*/
  .controller('heartrateAddCtrl', function(connectAppUrl,$http,$scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate,$ionicActionSheet,$timeout,ionicTimePicker,ionicDatePicker,$ionicPopup) {

     $scope.back = function(){

       //$ionicViewSwitcher.nextDirection('back');


       $state.go("app.tabs.heartrate.date");


    }

    //增加一条心跳数据
    function insertIndexRecord(residentId,indexCode,recordTime,indexValue){

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/insertAppHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'residentId': residentId,
          'indexCode': indexCode,
          'recordTime':recordTime,
          'indexValue':indexValue
        }
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){

            $ionicPopup.alert({
              title: '操作提示',
              template: '保存成功',
              okText: '确定'
            });

          }else{
            $ionicPopup.alert({
              title: '操作提示',
              template: '保存失败',
              okText: '确定'
            });
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }


   //设置时间

    $scope.currentTime = epochParser(new Date().getHours() * 60 * 60 + new Date().getMinutes() * 60); //设置当前时间

    $scope.currentTimeNum = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000;//设置初始时间毫秒数为0

    var time = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
          console.log('选择的时间：' + epochParser(val));
          $scope.currentTime = epochParser(val);
          $scope.currentTimeNum = val * 1000;
        }
      },
      inputTime: ((new Date()).getHours() * 60 * 60 + (new Date().getMinutes() * 60)),   //Optional
      format: 24,         //Optional
      step: 1,           //Optional
      setLabel: '确定',  //Optional
      closeLabel: '取消',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
    };

    $scope.setTime = function(){

      ionicTimePicker.openTimePicker(time);

    };

    //设置日期

    var dateNum = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000;

    $scope.currentDate = new Date(new Date().getTime() - dateNum); //设置当前日期,去除时分秒,时间只保留年月日 例：2016-09-07 00:00:00

   var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
    var monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val);
        $scope.datepickerObject.inputDate = val;
      }
    };
    var datepickerObject = {
      titleLabel: '日期选择',  //Optionalvar
      todayLabel: '今天',  //Optional
      closeLabel: '取消',  //Optional
      setLabel: '确定',  //Optional
      setButtonType: 'button-calm',  //Optional
      todayButtonType: 'button-calm',  //Optional
      closeButtonType: 'button-calm',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: false,    //Optional
      //disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'modal', //Optional
      modalHeaderColor: 'bar-calm', //Optional
      modalFooterColor: 'bar-calm', //Optional
      from: new Date(),   //Optional
      to: new Date(2018, 12, 31), //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };

    var date = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.currentDate = new Date(val);

      },
      setLabel: '确定',
      todayLabel: '今天',
      closeLabel: '取消',
      mondayFirst: false,
      inputDate: new Date(),
      weeksList:  ["日", "一", "二", "三", "四", "五", "六"],
      monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      templateType: 'popup',
      showTodayButton: true,
      modalHeaderColor: 'bar-calm', //Optional
      modalFooterColor: 'bar-calm', //Optional
      dateFormat: 'yyyy-MM-dd',
      from: new Date(2012, 1, 1),
      to: new Date(2099, 12, 31),
/*      inputDate: new Date(),
      mondayFirst: true,
      disableWeekdays: [],
      closeOnSelect: false,
      templateType: 'popup'*/
    };
   // ionicDatePicker.openDatePicker(ipObj1);


    $scope.setDate = function(){

      ionicDatePicker.openDatePicker(date);

    };

  //  ionicTimePicker.openTimePicker(ipObj1);

    //ng-click="openTimePicker1()"



//时间插件
    $scope.vipTimePickerObject = {
      inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
      step: 10,  //Optional
      format: 24,  //Optional
      titleLabel: '时间选择',  //Optional
      setLabel: '确定',  //Optional
      closeLabel: '取消',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        timePickerCallback(val);
      }
    };
    function timePickerCallback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        $scope.vipTimePickerObject.inputEpochTime = val;
        $scope.selectedTime = epochParser(val);
        console.log('选择的时间：' + epochParser(val));
      }
    }

    function prependZero(param) {
      if (String(param).length < 2) {
        return "0" + String(param);
      }
      return param;
    }

    function epochParser(val) {
      if (val === null) {
        return "00:00";
      } else {
        var hours = parseInt(val / 3600);
        var minutes = (val / 60) % 60;
        return (prependZero(hours) + ":" + prependZero(minutes));
      }
    }

    //设置初始心率
    $scope.initRate = '60';

    $scope.rate={rate:"60"};

    $scope.save = function(){

      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '保存'},
        ],
        titleText: '当前操作',
        cancelText: '取消',
        cancel: function() {
          /*          $scope.data = {
           showDelete: false
           };*/
        },
        buttonClicked: function(index,object) {



          console.log($scope.currentDate);

          var timeNum = $scope.currentDate.getTime() + $scope.currentTimeNum;

          console.log(new Date(timeNum));

          console.log($scope.rate.rate);

          insertIndexRecord(1,'000004',new Date(timeNum),$scope.rate.rate);

          return true;
        },

      });

      $timeout(function() {



      }, 2000);

    };







  })

  /*健康管家-心率监测-显示日数据*/
  .controller('dateHeartRateCtrl', function(connectAppUrl,$scope,$location,$state,$stateParams,$timeout,$http,$ionicPopup) {


    //加载天血压数据
    queryIndexRecord(1,"心跳","次/分");

    $scope.avgRate.avg = 60;

    //获取除血压之外对的其他身体指标
    function queryIndexRecord(id,indexName,unit){
     // var reservation = $("#reservation").val();
      var personId = id;

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppHfIndexRecord',
        //contentType: 'application/json',
       // dataType: "JSON",
        data: {
          'timeWay': "date",
          'residentId': id,
          'indexName': indexName
        }
      })


       .success(function(data, status, headers, config) {

         if(data.suc == "1"){
           var data5  = data.obj.indexValue;
           var titleName = [];//身体指标类型   如血压
           titleName.push(indexName);
           var totalData = [];//指标的数据
           var timeData =[];
           var count = 0;
           for(var i = 0;i < data5.length;i++){

             var indexValue = data5[i].value;

             totalData.push(indexValue);

             timeData.push(data5[i].measureTime);

             count += parseInt(indexValue);

           }

           if(data5.length > 0){
             $scope.avgRate.avg = parseInt(count / data5.length);
           }

           makeIndexRecordLine(titleName,totalData,indexName,timeData,unit);

         }else{
           //makePEmptypie();
         }
       // $scope.list = data.pageInfo.list;

       })
       .error(function(data, status, headers, config) {
       console.log(data);
       $ionicPopup.alert({
       title: '网络错误',
       template: '请检查网络连接，确保网络通畅！',
       okText: '确定'
       });
       });
    }

    //画指标参数的折线图
    function makeIndexRecordLine(titleName,totalData,indexName,timeData,unit){
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:"测试"
        },
        grid: {
          left: '6%',
          right: '15%',
          //y2: 40,
          containLabel: true
        },
        toolbox: {
          show:false,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [1,2,3,4,5]
        },
        yAxis: {
          type: 'value',
          name: unit,
          boundaryGap: [0.01, 0.01],
          precision: 2
        },
        dataZoom : [ {
          show : true,
          start : 80,
          end : 100
        }],
        series: [
          {
            name:'测试',
            type:'line',
            data:[1,2,3,4,5],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      };

      var myChart = echarts.init(document.getElementById('dateRateChart'));
      console.log(option);
      //debugger;
      myChart.setOption(option);
    }

  })

  /*健康管家-心率监测-显示周数据*/
  .controller('weekHeartRateCtrl', function(connectAppUrl,$scope,$location,$state,$stateParams,$timeout,$http,$ionicPopup) {


    //加载周血压数据
   queryIndexRecord(1,"心跳","次/分");

    $scope.avgRate.avg = 60;

    //获取除血压之外对的其他身体指标
    function queryIndexRecord(id,indexName,unit){

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'timeWay': "week",
          'residentId': id,
          'indexName': indexName
        }
      })


        .success(function(data, status, headers, config) {

          if(data.suc == "1"){
            var data5  = data.obj.indexValue;
            var titleName = [];//身体指标类型   如血压
            titleName.push(indexName);
            var totalData = [];//指标的数据
            var timeData =[];
            var count = 0;
            for(var i = 0;i < data5.length;i++){

              var indexValue = data5[i].value;

              totalData.push(indexValue);

              timeData.push(data5[i].measureTime);

              count += parseInt(indexValue);

            }

            if(data5.length > 0){
              $scope.avgRate.avg = parseInt(count / data5.length);
            }

            makeIndexRecordLine(titleName,totalData,indexName,timeData,unit);

          }else{
            //makePEmptypie();
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

    //画指标参数的折线图
    function makeIndexRecordLine(titleName,totalData,indexName,timeData,unit){
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:titleName
        },
        grid: {
          left: '8%',
          right: '8%',
         // y2: 40,
          containLabel: true
        },
        toolbox: {
          show:false,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timeData
        },
        yAxis: {
          type: 'value',
          name: unit,
          boundaryGap: [0.01, 0.01],
          precision: 2
        },
        dataZoom : [ {
          show : true,
          start : 50,
          end : 100
        }],
        series: [
          {
            name:titleName,
            type:'line',
            data:totalData,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      };

      var myChart = echarts.init(document.getElementById('weekRateChart'));
      console.log(option);
      //debugger;
      myChart.setOption(option);
    }

  })  /*健康管家-心率监测-显示月数据*/
  .controller('monthHeartRateCtrl', function(connectAppUrl,$scope,$location,$state,$stateParams,$timeout,$http,$ionicPopup) {


    //加载月血压数据
    queryIndexRecord(1,"心跳","次/分");

    $scope.avgRate.avg = 60;

    //获取除血压之外对的其他身体指标
    function queryIndexRecord(id,indexName,unit){
      // var reservation = $("#reservation").val();
      var personId = id;

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'timeWay': "month",
          'residentId': id,
          'indexName': indexName
        }
      })


        .success(function(data, status, headers, config) {

          if(data.suc == "1"){
            var data5  = data.obj.indexValue;
            var titleName = [];//身体指标类型   如血压
            titleName.push(indexName);
            var totalData = [];//指标的数据
            var timeData =[];
            var count = 0;
            for(var i = 0;i < data5.length;i++){

              var indexValue = data5[i].value;

              totalData.push(indexValue);

              timeData.push(data5[i].measureTime);

              count += parseInt(indexValue);

            }

            if(data5.length > 0){
              $scope.avgRate.avg = parseInt(count / data5.length);
            }

            makeIndexRecordLine(titleName,totalData,indexName,timeData,unit);

          }else{
            //makePEmptypie();
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

    //画指标参数的折线图
    function makeIndexRecordLine(titleName,totalData,indexName,timeData,unit){
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:titleName
        },
        grid: {
          left: '8%',
          right: '8%',
         // y2: 40,
          containLabel: true
        },
        toolbox: {
          show:false,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timeData
        },
        yAxis: {
          type: 'value',
          name: unit,
          boundaryGap: [0.01, 0.01],
          precision: 2
        },
        dataZoom : [ {
          show : true,
          start : 50,
          end : 100
        }],
/*        grid:{
          left:'13%',
          right:'13%'

        },*/
        series: [
          {
            name:titleName,
            type:'line',
            data:totalData,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      };

      var myChart = echarts.init(document.getElementById('monthRateChart'));
      console.log(option);
     // debugger;
      myChart.setOption(option);
    }

  })


  /*健康管家-心率监测-显示年数据*/
  .controller('yearHeartRateCtrl', function(connectAppUrl,$scope,$location,$state,$stateParams,$timeout,$http,$ionicPopup) {


    //加载天血压数据
    queryIndexRecord(1,"心跳","次/分");

    $scope.avgRate.avg = 60;

    //获取除血压之外对的其他身体指标
    function queryIndexRecord(id,indexName,unit){
      // var reservation = $("#reservation").val();
      var personId = id;

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'timeWay': "year",
          'residentId': id,
          'indexName': indexName
        }
      })


        .success(function(data, status, headers, config) {

          if(data.suc == "1"){
            var data5  = data.obj.indexValue;
            var titleName = [];//身体指标类型   如血压
            titleName.push(indexName);
            var totalData = [];//指标的数据
            var timeData =[];
            var count = 0;
            for(var i = 0;i < data5.length;i++){

              var indexValue = data5[i].value;

              totalData.push(indexValue);

              timeData.push(data5[i].measureTime);

              count += parseInt(indexValue);

            }

            if(data5.length > 0){
              $scope.avgRate.avg = parseInt(count / data5.length);
            }

            makeIndexRecordLine(titleName,totalData,indexName,timeData,unit);

          }else{
            //makePEmptypie();
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

    //画指标参数的折线图
    function makeIndexRecordLine(titleName,totalData,indexName,timeData,unit){
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:titleName
        },
        toolbox: {
          show:false,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timeData
        },
        yAxis: {
          type: 'value',
          name: unit,
          boundaryGap: [0.01, 0.01],
          precision: 2
        },
        dataZoom : [ {
          show : true,
          start : 50,
          end : 100
        }],
        grid:{
          left:'8%',
          right:'8%',
          containLabel: true

        },
        series: [
          {
            name:titleName,
            type:'line',
            data:totalData,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      };

      var myChart = echarts.init(document.getElementById('yearRateChart'));
      console.log(option);
     // debugger;
      myChart.setOption(option);
    }

  })
  /*健康管家-体重监测*/
  .controller('weightCtrl', function(connectAppUrl,$ionicViewSwitcher,$scope,$location,$state,$http) {

    //设置平均体重初始值0kg
    $scope.avgWeight = {

      avg:0,
      bmi:0

    };

    //默认设置天为点击状态
    $scope.flag0 = true;
    $scope.flag1 = false;
    $scope.flag2 = false;
    $scope.flag3 = false;

    //根据传递的id值请求不同的图表
    $scope.showChart = function(id){

      switch(id){

        case 0:
          queryIndexRecord(1,"体重",'date');
          break;
        case 1:
          queryIndexRecord(1,"体重",'week');
          break;
        case 2:
          queryIndexRecord(1,"体重",'month');
          break;
        default:
          queryIndexRecord(1,"体重",'year');
          break;

      }

    };




    //根据所选时间，查询体重数值
    queryIndexRecord(1,"体重",'date');

    //获取除血压之外对的其他身体指标
    function queryIndexRecord(id,indexName,timeWay){


      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppPersonAndRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'timeWay': timeWay,
          'residentId': id,
          'indexName': indexName
        }
      })


        .success(function(data, status, headers, config) {

          if(data.suc == "1"){

            console.log(data);

            var data5 = data.obj.indexValue; //身体指标

            var data6 = data.obj.person; //基本信息数据

            var array = [];

            //如果没有身高
            if(ObjectUtil.isEmpty(data6.height)){

              var titleName = [];//身体指标类型   如血压
              titleName.push(indexName);
              var totalData = [];//指标的数据
              var timeData =[];
              var count = 0;
              for(var i = 0;i < data5.length;i++){

                var indexValue = data5[i].value;

                totalData.push(indexValue);

                timeData.push(data5[i].measureTime);

                count += parseInt(indexValue);

              }

              if(data5.length > 0){
                $scope.avgWeight.avg = parseInt(count / data5.length);
              }

              array.push({
                name:titleName,
                type:'line',
                data:totalData,
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                    {type: 'average', name: '平均值'}
                  ]
                }
              });

              $scope.info = '无身高和性别信息，无法计算标准体重和BMI</br>请到个人中心设置</br>';


              makeIndexRecordLine(titleName,timeData,array);


            }else{

              var titleName = [];//身体指标类型   如血压
              titleName.push(indexName);
              titleName.push('BMI');
              var totalData = [];//指标的数据
              var bdata = [];//bmi数据
              var timeData =[];
              var count = 0; //体重总计
              var bcount = 0;//bmi总计
              for(var i = 0;i < data5.length;i++){

                var indexValue = data5[i].value;

                var bmi = (Number(indexValue) / (Number(data6.height) / 100 * (Number(data6.height) / 100))).toFixed(2);

                totalData.push(indexValue);

                bdata.push(bmi);

                timeData.push(data5[i].measureTime);

                count += parseInt(indexValue);

                bcount += Number(bmi);



              }

              if(data5.length > 0){
                $scope.avgWeight.bmi = (bcount / data5.length).toFixed(2);
                $scope.avgWeight.avg = (count / data5.length).toFixed(1);
              }

              if(!ObjectUtil.isEmpty(data6.sex)){

                var sbw = ''

                if(data6.sex == '1'){

                  sbw = ((data6.height - 80) * 0.7).toFixed(1);

                }else {

                  sbw = ((data6.height - 70) * 0.6).toFixed(1);

                }

                $scope.info = '标准体重：' + sbw + 'KG';

              }else{

                 $scope.info = '无身高和性别信息，无法计算标准体重和BMI</br>请到个人中心设置</br>';

              }

              array.push({
                name:indexName,
                type:'line',
                data:totalData,
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                    {type: 'average', name: '平均值'}
                  ]
                }
              },{
                name:'BMI',
                type:'line',
                data:bdata,
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                    {type: 'average', name: '平均值'}
                  ]
                }
              });


              makeIndexRecordLine(titleName,timeData,array);




            }


          }else{
            //makePEmptypie();
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }



    //画指标参数的折线图
    function makeIndexRecordLine(titleName,timeData,array){
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:titleName
        },
        toolbox: {
          show:false,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timeData
        },
        yAxis: {
          type: 'value',
          //name: unit,
          boundaryGap: [0.01, 0.01],
          precision: 2
        },
        dataZoom : [ {
          show : true,
          start : 50,
          end : 100
        }],
        grid:{
          left:'8%',
          right:'8%',
          containLabel: true

        },
        series:array
      };

      var myChart = echarts.init(document.getElementById('weightChart'));
      console.log(option);
      // debugger;
      myChart.setOption(option);
    }





  })

  /*健康管家-体重监测-显示所有数据*/
  .controller('weightAllCtrl', function(connectAppUrl,$ionicPopup,$scope,$location,$state,$stateParams,$ionicActionSheet,$timeout,$http, $ionicViewSwitcher) {


    $scope.items = [];

    $scope.delItems = []; //设置初始删除数组

    //加载天血压数据
    queryIndexRecord(1,"体重","KG");

    //获取除血压之外对的其他身体指标
    function queryIndexRecord(id,indexName,unit){
      // var reservation = $("#reservation").val();
      var personId = id;

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppPageHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'timeWay': "date",
          'residentId': id,
          'indexName': indexName
        }
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){

            $scope.items = $scope.items.concat(data.obj.list);

          }else{
            //makePEmptypie();
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }


    $scope.data = {
      showDelete: false
    };

    $scope.active = {

      isActive:false

    };

    $scope.flag = false;

    /*    $scope.addRate = function() {
     alert('Edit Item: ' + 1);
     };*/

    $scope.edit = function(item) {
      alert('Edit Item: ' + item.id);
    };
    $scope.share = function(item) {
      alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };


    //批量删除心跳某条数据
    function delIndexRecord(list){

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/delAppHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data:list
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){


            for(var i = 0;i < $scope.delItems.length;i++){

              $scope.items.splice($scope.items.indexOf($scope.delItems[i]), 1);

            }

            $scope.delItems = [];//将数组内容重置为空


            $ionicPopup.alert({
              title: '操作提示',
              template: '删除成功',
              okText: '确定'
            });



            $timeout( function() {
              //simulate async response
              // $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

              //Stop the ion-refresher from spinning

              //  $state.go('app.tabs.allheartrate',{},{reload:true}); //再次刷新页面内容




              $scope.data = {

                showDelete: false

              };

              $scope.$broadcast('scroll.refreshComplete');

            }, 2000);

          }else{

            $ionicPopup.alert({
              title: '操作提示',
              template: '删除失败',
              okText: '确定'
            });

            $scope.delItems = [];//将数组内容重置为空

          }


          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {

          $scope.delItems = [];//将数组内容重置为空
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

    $scope.removeClass = function(){

      for(var i=0;i< $scope.items.length;i++){

        if($scope.items[i].isActive && $scope.items[i].isActive == true){

          // $scope.delItems.push($scope.items[i]);

          document.getElementById( "allRateBackButton" + $scope.items[i].id).style.color = "#111";

          document.getElementById( "allRateBackButton" + $scope.items[i].id).setAttribute("ng-class", "{true: 'ion-ios-checkmark', false: 'ion-ios-circle-outline'}["+false+"]");

          document.getElementById( "allRateBackButton" + $scope.items[i].id).setAttribute("class", "button icon button-icon ion-ios-circle-outline"); //将点击的状态换为圆形

          $scope.items[i].isActive = false;

          console.log( document.getElementById( "allRateBackButton" + $scope.items[i].id).getAttribute("ng-class"));



        }

      }

    }


    $scope.onItemDelete = function(item,flag) {


      if(flag){

        document.getElementById( "allRateBackButton" + item.id).style.color = "#387ef5";

        item.isActive = true;

      }else{

        document.getElementById( "allRateBackButton" + item.id).style.color = "#111";

        item.isActive = false;

      }





      //alert(item.id);


    };

    $scope.save = function(){



      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '删除'},
        ],
        /*        destructiveText: '全部删除',
         destructiveText: '删除',*/
        titleText: '当前操作',
        cancelText: '取消',
        cancel: function() {
          $scope.data = {

            showDelete: false

          };
        },
        buttonClicked: function(index,object) {

          $scope.delItems = [];

          for(var i=0;i< $scope.items.length;i++){

            if($scope.items[i].isActive && $scope.items[i].isActive == true){

              console.log($scope.items[i]);

              $scope.delItems.push($scope.items[i]);

            }

          }

          console.log($scope.delItems);

          if($scope.delItems.length <= 0){

            $scope.data = {

              showDelete: false

            };

            return true;

          }



          delIndexRecord($scope.delItems);



          /*          $timeout(function() {

           $scope.data = {
           showDelete: false
           };

           }, 2000);*/

          /*          $scope.data = {
           showDelete: false
           };*/

          return true;
        },

      });



    }

  })


  /*健康管家-体重监测-添加体重数据*/
  .controller('weightAddCtrl', function(connectAppUrl,$http,$scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate,$ionicActionSheet,$timeout,ionicTimePicker,ionicDatePicker,$ionicPopup) {


    //增加一条体重数据
    function insertIndexRecord(residentId,indexCode,recordTime,indexValue){

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/insertAppHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'residentId': residentId,
          'indexCode': indexCode,
          'recordTime':recordTime,
          'indexValue':indexValue
        }
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){

            $ionicPopup.alert({
              title: '操作提示',
              template: '保存成功',
              okText: '确定'
            });

          }else{
            $ionicPopup.alert({
              title: '操作提示',
              template: '保存失败',
              okText: '确定'
            });
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }


    //设置时间

    $scope.currentTime = epochParser(new Date().getHours() * 60 * 60 + new Date().getMinutes() * 60); //设置当前时间

    $scope.currentTimeNum = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000;//设置初始时间毫秒数为0

    var time = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
          console.log('选择的时间：' + epochParser(val));
          $scope.currentTime = epochParser(val);
          $scope.currentTimeNum = val * 1000;
        }
      },
      inputTime: ((new Date()).getHours() * 60 * 60 + (new Date().getMinutes() * 60)),   //Optional
      format: 24,         //Optional
      step: 1,           //Optional
      setLabel: '确定',  //Optional
      closeLabel: '取消',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
    };

    $scope.setTime = function(){

      ionicTimePicker.openTimePicker(time);

    };

    //设置日期

    var dateNum = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000;

    $scope.currentDate = new Date(new Date().getTime() - dateNum); //设置当前日期,去除时分秒,时间只保留年月日 例：2016-09-07 00:00:00

    var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
    var monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val);
        $scope.datepickerObject.inputDate = val;
      }
    };
    var datepickerObject = {
      titleLabel: '日期选择',  //Optionalvar
      todayLabel: '今天',  //Optional
      closeLabel: '取消',  //Optional
      setLabel: '确定',  //Optional
      setButtonType: 'button-calm',  //Optional
      todayButtonType: 'button-calm',  //Optional
      closeButtonType: 'button-calm',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: false,    //Optional
      //disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'modal', //Optional
      modalHeaderColor: 'bar-calm', //Optional
      modalFooterColor: 'bar-calm', //Optional
      from: new Date(),   //Optional
      to: new Date(2018, 12, 31), //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };

    var date = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.currentDate = new Date(val);

      },
      setLabel: '确定',
      todayLabel: '今天',
      closeLabel: '取消',
      mondayFirst: false,
      inputDate: new Date(),
      weeksList:  ["日", "一", "二", "三", "四", "五", "六"],
      monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      templateType: 'popup',
      showTodayButton: true,
      modalHeaderColor: 'bar-calm', //Optional
      modalFooterColor: 'bar-calm', //Optional
      dateFormat: 'yyyy-MM-dd',
      from: new Date(2012, 1, 1),
      to: new Date(2099, 12, 31),
      /*      inputDate: new Date(),
       mondayFirst: true,
       disableWeekdays: [],
       closeOnSelect: false,
       templateType: 'popup'*/
    };
    // ionicDatePicker.openDatePicker(ipObj1);


    $scope.setDate = function(){

      ionicDatePicker.openDatePicker(date);

    };

    //  ionicTimePicker.openTimePicker(ipObj1);

    //ng-click="openTimePicker1()"



//时间插件
    $scope.vipTimePickerObject = {
      inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
      step: 10,  //Optional
      format: 24,  //Optional
      titleLabel: '时间选择',  //Optional
      setLabel: '确定',  //Optional
      closeLabel: '取消',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        timePickerCallback(val);
      }
    };
    function timePickerCallback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        $scope.vipTimePickerObject.inputEpochTime = val;
        $scope.selectedTime = epochParser(val);
        console.log('选择的时间：' + epochParser(val));
      }
    }

    function prependZero(param) {
      if (String(param).length < 2) {
        return "0" + String(param);
      }
      return param;
    }

    function epochParser(val) {
      if (val === null) {
        return "00:00";
      } else {
        var hours = parseInt(val / 3600);
        var minutes = (val / 60) % 60;
        return (prependZero(hours) + ":" + prependZero(minutes));
      }
    }

    //设置初始心率
    $scope.initRate = '60';

    $scope.rate={rate:"60"};

    $scope.save = function(){

      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '保存'},
        ],
        titleText: '当前操作',
        cancelText: '取消',
        cancel: function() {
          /*          $scope.data = {
           showDelete: false
           };*/
        },
        buttonClicked: function(index,object) {



          console.log($scope.currentDate);

          var timeNum = $scope.currentDate.getTime() + $scope.currentTimeNum;

          console.log(new Date(timeNum));

          console.log($scope.rate.rate);

          insertIndexRecord(1,'000005',new Date(timeNum),$scope.rate.rate);

          return true;
        },

      });

      $timeout(function() {



      }, 2000);

    };







  })

  /*健康管家-体重监测*/
  .controller('bodyfatCtrl', function(connectAppUrl,$ionicViewSwitcher,$scope,$http) {

    //设置平均体脂初始值0%
    $scope.avgRate = {

      avg:0

    };

    $scope.info = '';

    //默认设置天为点击状态
    $scope.flag0 = true;
    $scope.flag1 = false;
    $scope.flag2 = false;
    $scope.flag3 = false;

    //默认进来加载天体脂率数据
    queryPerson(1,"体脂率","%",'date');

    //根据传递的id值请求不同的图表
    $scope.showChart = function(id){

      switch(id){

        case 0:
          queryPerson(1,"体脂率","%",'date');
          break;
        case 1:
          queryPerson(1,"体脂率","%",'week');
          break;
        case 2:
          queryPerson(1,"体脂率","%",'month');
          break;
        default:
          queryPerson(1,"体脂率","%",'year');
          break;

      }

    };


    function queryPerson(residentId,indexName,unit,timeWay){

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppPerson',
        data: {
          'residentId': residentId,
        }
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){

            console.log(data);

            if(ObjectUtil.isEmpty(data.obj.height) || ObjectUtil.isEmpty(data.obj.sex) || ObjectUtil.isEmpty(data.obj.birthAge)){

             $scope.info = '无身高、性别、出生日期等信息，无法计算体脂率<br/>' +
                         '请到个人中心设置<br/>';

              makeIndexRecordLine('体脂率',[],'体脂率',[],'%');

              return;

            }

            queryIndexRecord(residentId,indexName,unit,timeWay);

          }else{

            $scope.info = '';

            makeIndexRecordLine('体脂率',[],'体脂率',[],'%');


          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {

          $scope.canClick = true;

          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });

        });


    };

    //获取除血压之外对的其他身体指标
    function queryIndexRecord(id,indexName,unit,timeWay){

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppHfIndexRecord',
        data: {
          'timeWay': timeWay,
          'residentId': id,
          'indexName': indexName
        }
      })


        .success(function(data, status, headers, config) {

          if(data.suc == "1"){
            var data5  = data.obj.indexValue;
            var titleName = [];//身体指标类型   如血压
            titleName.push(indexName);
            var totalData = [];//指标的数据
            var timeData =[];
            var count = 0;
            for(var i = 0;i < data5.length;i++){

              var indexValue = Number(data5[i].value);

              totalData.push(indexValue);

              timeData.push(data5[i].measureTime);

              count += parseInt(indexValue);

            }

            if(data5.length > 0){
              $scope.avgRate.avg = parseInt(count / data5.length);
            }

            makeIndexRecordLine(titleName,totalData,indexName,timeData,unit);

          }else{
            //makePEmptypie();
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

    //画指标参数的折线图
    function makeIndexRecordLine(titleName,totalData,indexName,timeData,unit){
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:titleName
        },
        toolbox: {
          show:false,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timeData
        },
        yAxis: {
          type: 'value',
          name: unit,
          boundaryGap: [0.01, 0.01],
          precision: 2
        },
        dataZoom : [ {
          show : true,
          start : 50,
          end : 100
        }],
        grid:{
          left:'8%',
          right:'8%',
          containLabel: true

        },
        series: [
          {
            name:titleName,
            type:'line',
            data:totalData,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      };

      var myChart = echarts.init(document.getElementById('weightChart'));
      console.log(option);
      // debugger;
      myChart.setOption(option);
    }




  })

  /*健康管家-体脂监测-显示所有数据*/
  .controller('bodyfatAllCtrl', function(connectAppUrl,$ionicPopup,$scope,$location,$state,$stateParams,$ionicActionSheet,$timeout,$http, $ionicViewSwitcher) {


    $scope.items = [];

    $scope.delItems = []; //设置初始删除数组

    //加载天血压数据
    queryIndexRecord(1,"体脂率","%");

    //获取除血压之外对的其他身体指标
    function queryIndexRecord(id,indexName,unit){
      // var reservation = $("#reservation").val();
      var personId = id;

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppPageHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'timeWay': "date",
          'residentId': id,
          'indexName': indexName
        }
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){

            $scope.items = $scope.items.concat(data.obj.list);

          }else{
            //makePEmptypie();
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }


    $scope.data = {
      showDelete: false
    };

    $scope.active = {

      isActive:false

    };

    $scope.flag = false;

    /*    $scope.addRate = function() {
     alert('Edit Item: ' + 1);
     };*/

    $scope.edit = function(item) {
      alert('Edit Item: ' + item.id);
    };
    $scope.share = function(item) {
      alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };


    //批量删除心跳某条数据
    function delIndexRecord(list){

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/delAppHfIndexRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data:list
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){


            for(var i = 0;i < $scope.delItems.length;i++){

              $scope.items.splice($scope.items.indexOf($scope.delItems[i]), 1);

            }

            $scope.delItems = [];//将数组内容重置为空


            $ionicPopup.alert({
              title: '操作提示',
              template: '删除成功',
              okText: '确定'
            });



            $timeout( function() {
              //simulate async response
              // $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

              //Stop the ion-refresher from spinning

              //  $state.go('app.tabs.allheartrate',{},{reload:true}); //再次刷新页面内容




              $scope.data = {

                showDelete: false

              };

              $scope.$broadcast('scroll.refreshComplete');

            }, 2000);

          }else{

            $ionicPopup.alert({
              title: '操作提示',
              template: '删除失败',
              okText: '确定'
            });

            $scope.delItems = [];//将数组内容重置为空

          }


          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {

          $scope.delItems = [];//将数组内容重置为空
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }

    $scope.removeClass = function(){

      for(var i=0;i< $scope.items.length;i++){

        if($scope.items[i].isActive && $scope.items[i].isActive == true){

          // $scope.delItems.push($scope.items[i]);

          document.getElementById( "allRateBackButton" + $scope.items[i].id).style.color = "#111";

          document.getElementById( "allRateBackButton" + $scope.items[i].id).setAttribute("ng-class", "{true: 'ion-ios-checkmark', false: 'ion-ios-circle-outline'}["+false+"]");

          document.getElementById( "allRateBackButton" + $scope.items[i].id).setAttribute("class", "button icon button-icon ion-ios-circle-outline"); //将点击的状态换为圆形

          $scope.items[i].isActive = false;

          console.log( document.getElementById( "allRateBackButton" + $scope.items[i].id).getAttribute("ng-class"));



        }

      }

    }


    $scope.onItemDelete = function(item,flag) {


      if(flag){

        document.getElementById( "allRateBackButton" + item.id).style.color = "#387ef5";

        item.isActive = true;

      }else{

        document.getElementById( "allRateBackButton" + item.id).style.color = "#111";

        item.isActive = false;

      }





      //alert(item.id);


    };

    $scope.save = function(){



      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '删除'},
        ],
        /*        destructiveText: '全部删除',
         destructiveText: '删除',*/
        titleText: '当前操作',
        cancelText: '取消',
        cancel: function() {
          $scope.data = {

            showDelete: false

          };
        },
        buttonClicked: function(index,object) {

          $scope.delItems = [];

          for(var i=0;i< $scope.items.length;i++){

            if($scope.items[i].isActive && $scope.items[i].isActive == true){

              console.log($scope.items[i]);

              $scope.delItems.push($scope.items[i]);

            }

          }

          console.log($scope.delItems);

          if($scope.delItems.length <= 0){

            $scope.data = {

              showDelete: false

            };

            return true;

          }



          delIndexRecord($scope.delItems);



          /*          $timeout(function() {

           $scope.data = {
           showDelete: false
           };

           }, 2000);*/

          /*          $scope.data = {
           showDelete: false
           };*/

          return true;
        },

      });



    }

  })


  /*健康管家-体脂监测-添加体脂数据*/
  .controller('bodyfatAddCtrl', function(connectAppUrl,$http,$scope,$location,$state,$ionicTabsDelegate,$stateParams,Chats,$ionicViewSwitcher,$ionicNavBarDelegate,$ionicActionSheet,$timeout,ionicTimePicker,ionicDatePicker,$ionicPopup) {


    $scope.canClick = true; //点击体重按钮会触发queryPerson方法



    //当点击体重时候，进人员校验
    $scope.checkPerson = function(canClick){

      if(canClick){

        queryPerson(1);

      }

    };

    //设置初始体脂率
    $scope.initRate = '60';

    $scope.rate={rate:null,bodyFat:null};

    //设置人员初始信息
    $scope.person = {

      age:null,
      sex:null,
      height:null

    };

    //当体重输入框发生改变的时候，自动计算体脂率的值
    $scope.weightChange = function(person,canClick){


      if(!canClick){

        countBodyFat(person);

      }

    }

    //计算体脂率值
    var countBodyFat = function(person){

      console.log(person);

      if(ObjectUtil.isEmpty($scope.rate.rate)){

        $scope.rate.bodyFat = '';

        return;

      }

      var bmi = Number($scope.rate.rate) / (Number(person.height) / 100 * (Number(person.height) / 100));

      //年龄暂时以人口表中年龄代替
      if(person.sex == '1'){

        $scope.rate.bodyFat = (1.2 * bmi + 0.23 * Number(person.age) - 5.4 - 10.8 * 1).toFixed(1);

      }else{

        $scope.rate.bodyFat = (1.2 * bmi + 0.23 * Number(person.age) - 5.4 - 10.8 * 0).toFixed(1);

      }

    }




    //将体重输入框设置为只读状态
    $scope.weightRead = true;



    var queryPerson = function(residentId){


      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/queryAppPerson',
        data: {
          'residentId': residentId,
        }
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){

            if(ObjectUtil.isEmpty(data.obj.height) || ObjectUtil.isEmpty(data.obj.sex) || ObjectUtil.isEmpty(data.obj.birthAge)){

              $ionicPopup.alert({
                title: '未设置性别或者身高或者出生日期',
                template: '请到个人中心设置！',
                okText: '确定'
              });

              $scope.canClick = true;

              return;

            }

            $scope.weightRead = false;//验证通过，改为可输入状态

            $scope.canClick = false; //点击体重按钮不会触发queryPerson方法

            $scope.person = {

              age:data.obj.birthAge,
              sex:data.obj.sex,
              height:data.obj.height

            };





          }else{

            $scope.canClick = true;

             $ionicPopup.alert({
             title: '系统错误',
             template: '请耐心等待！',
             okText: '确定'
             });



          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {

          $scope.canClick = true;

          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });

        });


    }






    //增加一条体脂数据
    function insertIndexRecord(connectAppUrl,residentId,recordTime,indexValue,bodyFat){

      $http({
        method: "post",
        url: connectAppUrl.connectUrl() + '/healthNurse/insertAppBodyFatRecord',
        //contentType: 'application/json',
        // dataType: "JSON",
        data: {
          'residentId': residentId,
          'recordTime':recordTime,
          'indexValue':indexValue,
          'bodyFat':bodyFat
        }
      })
        .success(function(data, status, headers, config) {

          if(data.suc == "1"){

            $ionicPopup.alert({
              title: '操作提示',
              template: '保存成功',
              okText: '确定'
            });

          }else{
            $ionicPopup.alert({
              title: '操作提示',
              template: '保存失败',
              okText: '确定'
            });
          }
          // $scope.list = data.pageInfo.list;

        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $ionicPopup.alert({
            title: '网络错误',
            template: '请检查网络连接，确保网络通畅！',
            okText: '确定'
          });
        });
    }


    //设置时间

    $scope.currentTime = epochParser(new Date().getHours() * 60 * 60 + new Date().getMinutes() * 60); //设置当前时间

    $scope.currentTimeNum = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000;//设置初始时间毫秒数为0

    var time = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
          console.log('选择的时间：' + epochParser(val));
          $scope.currentTime = epochParser(val);
          $scope.currentTimeNum = val * 1000;
        }
      },
      inputTime: ((new Date()).getHours() * 60 * 60 + (new Date().getMinutes() * 60)),   //Optional
      format: 24,         //Optional
      step: 1,           //Optional
      setLabel: '确定',  //Optional
      closeLabel: '取消',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
    };

    $scope.setTime = function(){

      ionicTimePicker.openTimePicker(time);

    };

    //设置日期

    var dateNum = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000;

    $scope.currentDate = new Date(new Date().getTime() - dateNum); //设置当前日期,去除时分秒,时间只保留年月日 例：2016-09-07 00:00:00

    var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
    var monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val);
        $scope.datepickerObject.inputDate = val;
      }
    };
    var datepickerObject = {
      titleLabel: '日期选择',  //Optionalvar
      todayLabel: '今天',  //Optional
      closeLabel: '取消',  //Optional
      setLabel: '确定',  //Optional
      setButtonType: 'button-calm',  //Optional
      todayButtonType: 'button-calm',  //Optional
      closeButtonType: 'button-calm',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: false,    //Optional
      //disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'modal', //Optional
      modalHeaderColor: 'bar-calm', //Optional
      modalFooterColor: 'bar-calm', //Optional
      from: new Date(),   //Optional
      to: new Date(2018, 12, 31), //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };

    var date = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.currentDate = new Date(val);

      },
      setLabel: '确定',
      todayLabel: '今天',
      closeLabel: '取消',
      mondayFirst: false,
      inputDate: new Date(),
      weeksList:  ["日", "一", "二", "三", "四", "五", "六"],
      monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      templateType: 'popup',
      showTodayButton: true,
      modalHeaderColor: 'bar-calm', //Optional
      modalFooterColor: 'bar-calm', //Optional
      dateFormat: 'yyyy-MM-dd',
      from: new Date(2012, 1, 1),
      to: new Date(2099, 12, 31),
      /*      inputDate: new Date(),
       mondayFirst: true,
       disableWeekdays: [],
       closeOnSelect: false,
       templateType: 'popup'*/
    };
    // ionicDatePicker.openDatePicker(ipObj1);


    $scope.setDate = function(){

      ionicDatePicker.openDatePicker(date);

    };

    //  ionicTimePicker.openTimePicker(ipObj1);

    //ng-click="openTimePicker1()"



//时间插件
    $scope.vipTimePickerObject = {
      inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
      step: 10,  //Optional
      format: 24,  //Optional
      titleLabel: '时间选择',  //Optional
      setLabel: '确定',  //Optional
      closeLabel: '取消',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        timePickerCallback(val);
      }
    };
    function timePickerCallback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        $scope.vipTimePickerObject.inputEpochTime = val;
        $scope.selectedTime = epochParser(val);
        console.log('选择的时间：' + epochParser(val));
      }
    }

    function prependZero(param) {
      if (String(param).length < 2) {
        return "0" + String(param);
      }
      return param;
    }

    function epochParser(val) {
      if (val === null) {
        return "00:00";
      } else {
        var hours = parseInt(val / 3600);
        var minutes = (val / 60) % 60;
        return (prependZero(hours) + ":" + prependZero(minutes));
      }
    }

    //设置初始体脂率
    $scope.initRate = '60';

    $scope.rate={rate:null,bodyFat:null};

    $scope.save = function(){

      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '保存'},
        ],
        titleText: '当前操作',
        cancelText: '取消',
        cancel: function() {
          /*          $scope.data = {
           showDelete: false
           };*/
        },
        buttonClicked: function(index,object) {



          console.log($scope.currentDate);

          var timeNum = $scope.currentDate.getTime() + $scope.currentTimeNum;

          console.log(new Date(timeNum));

          console.log($scope.rate.rate);

         // console.log(queryPerson(1,timeNum));


          if(ObjectUtil.isEmpty($scope.rate.rate) || ObjectUtil.isEmpty($scope.rate.bodyFat)){

            $ionicPopup.alert({
              title: '未设置体重',
              template: '请输入体重！',
              okText: '确定'
            });

          }else if($scope.canClick){

            $ionicPopup.alert({
              title: '未设置性别或者身高或者出生日期',
              template: '请到个人中心设置！',
              okText: '确定'
            });

          }else if(!ObjectUtil.isNum($scope.rate.rate) || !ObjectUtil.isNum($scope.rate.bodyFat) ){

            $ionicPopup.alert({
              title: '输入不合法',
              template: '请输入数字！',
              okText: '确定'
            });

          }else{

            insertIndexRecord(1,new Date(timeNum),$scope.rate.rate,$scope.rate.bodyFat);

          }



          return true;
        },

      });

      $timeout(function() {



      }, 2000);

    };

  });
