var app = angular.module("GoChatApp", []);
app.controller("MainController", function($scope, $http) {

    $scope.username = ""
    $scope.chatLines = []
    $scope.typedInput = ""


    $scope.getNewData = function()
    {
        $http.get("/chat").then(function (response) {
            $scope.chatLines.splice(0, 0, response.data + "<br>");
            if($scope.chatLines.length > 200)
                $scope.chatLines.splice($scope.chatLines.length-1, 1);
            $( "#chat" ).html($scope.chatLines);
            $scope.getNewData()
        });
    }

    $scope.sendMsg = function() {
        var data = $.param({
            body: $scope.username + ": " + $scope.typedInput
        });
        $http({
            method: 'POST',
            url: '/chat',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }}).then(function(result) {
            console.log(result);
        }, function(error) {
            console.log(error);
        });
        $scope.typedInput = ""
    };

    $( "#chat" ).html($scope.chatLines);

    while ($scope.username == "") {
        $scope.username = prompt("Please enter your name", "");
    }
    $scope.username = "<b>" + $scope.username + "</b>"
    $scope.getNewData()
});