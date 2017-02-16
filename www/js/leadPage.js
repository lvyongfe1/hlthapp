/**
 * Created by cxx on 2016/6/27.
 */
var app=angular.module('lead', ['ionic']);
/*首页滑动条开始页*/
app.controller('SlideController', function($scope,$http) {
    $scope.myActiveSlide = 0;
});