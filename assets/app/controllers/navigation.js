'use strict';

angular.module('DojoApp.controllers')
    .controller('NavigationController', ['$scope', '$http', '$routeParams', '$resource', '$q', '$filter', 'spinnerService', '$window', '$location', '$log', '$modal', 'configuration', 'csrfToken', 'errorException', 'messageBus', 'userInfo', 'websocket', '$timeout', '$rootScope', function(
                                          $scope,   $http,   $routeParams,   $resource,   $q,   $filter,   spinnerService,   $window,   $location,   $log,   $modal,   configuration,   csrfToken,   errorException,   messageBus,   userInfo,   websocket,   $timeout,   $rootScope) {

        // -------------------------------------------
        // Scope Variables
        // -------------------------------------------

        $scope.userIsLoggedIn  = false;
        $scope.email           = '';

        $scope.chatIsVisible   = true;
        $scope.availableAgents = [];
        $scope.chatHistory     = [];
        $scope.currentChat     = null;
        $scope.chatMessage     = '';
        $scope.userType        = null;

        // -------------------------------------------
        // Private
        // -------------------------------------------

        var getChat = function(chatId) {
            return $filter('filter')($scope.chatHistory, {'id': chatId})[0];
        };

        var loadChatHistory = function() {
            websocket.socket.get('/chat/history', function(data) {
                $scope.chatHistory = data.history;
                $scope.$apply();
            });
        };

        var loadAvailableAgents = function() {
            websocket.socket.get('/chat/onlineAgents', function(data) {
                $scope.availableAgents = data.agents;
                $scope.$apply();
            });
        };

        var loadPreviousMessages = function(chatId) {
            var priorToId, chatRoom = getChat(chatId);

            if ($scope.currentChat.messages && $scope.currentChat.messages.length > 0) {
                priorToId = $scope.currentChat.messages[0].id;
            }

            websocket.socket.get('/chat/messages', {'chatroom_id': chatId, 'prior_to_id': priorToId}, function(data) {
                chatRoom.messages = data.messages.concat(chatRoom.messages || []);
                $scope.$apply();
            });
        };

        var sendChatRequest = function(agentId) {
            websocket.socket.get('/chat/request', {'agent_id': agentId}, function(data) {
                if (!getChat(data.chatRoomId)) {
                    $scope.chatHistory.push(data.chatRoom);
                }

                $scope.selectChat(data.chatRoom.id);
            });
            $scope.availableAgents = [];
        };

        var sendChatMessage = function(chatId, message) {
            websocket.socket.get('/chat/message', {'chat_id': chatId, 'content': message});
        };

        var websocketSubscribe = function() {
            loadChatHistory();

            console.log('subscribing');
            websocket.socket.on('user', function(data) { console.log('User', data); });

            // listen to all websocket messageBus
            websocket.socket.on('message', function(msg) {
                console.log('message', msg);

                if (!msg.type) {
                    return console.log('Received non-type based message: ', data);
                }

                switch (msg.type) {
                    // personal communication channel
                    case 'chat' :
                        handleChatMessage(msg);
                        break;

                }
            });
        };

        var handleChatMessage = function(msg) {
            var chatRoom;

            console.log('control', msg);

            if (msg.subtype === 'message') {
                chatRoom = getChat(msg.message.chat_id);

                if (chatRoom.messages) {
                    chatRoom.messages.push(msg.message);
                } else {
                    chatRoom.messages = [msg.message];
                }
            } else if (msg.subtype === 'control') {
                chatRoom = getChat(msg.chatRoom.id);

                if (msg.chatRoom) {
                    if (!chatRoom) {
                        msg.chatRoom.messages = [];
                        $scope.chatHistory.push(msg.chatRoom);
                    } else {
                        chatRoom.status = msg.chatRoom.status;
                    }

                    $scope.selectChat(msg.chatRoom.id);
                }
            } else if (msg.subtype === 'request') {
                chatRoom = getChat(data.chatRoom.id);

                if (!chatRoom) {
                    $scope.chatHistory.push(msg.chatRoom);
                }

                $scope.currentChat = chatRoom;
            }

            $scope.$apply();
        };

        // -------------------------------------------
        // Scope Functions
        // -------------------------------------------

        $scope.showAvailableAgents = function($event) {
            loadAvailableAgents();
        };

        $scope.requestChat = function(agentId) {
            sendChatRequest(agentId);
        };

        $scope.acceptChat = function(chatId) {
            websocket.socket.get('/chat/accept', {'chat_id': chatId});
        };

        $scope.rejectChat = function(chatId) {
            websocket.socket.get('/chat/reject', {'chat_id': chatId});
        };

        $scope.selectChat = function(chatId) {

            console.log('fire select chat!');

            $scope.currentChat = $filter('filter')($scope.chatHistory, {'id': chatId})[0];

            loadPreviousMessages(chatId);
        };

        $scope.sendMessage = function() {
            sendChatMessage($scope.currentChat.id, $scope.chatMessage);
            $scope.chatMessage = '';
        };

        $scope.$on('userLogin', function($event, data) {
            $scope.userIsLoggedIn = data.logged_in;
            $scope.userType = data.user_type;
        });

        // -------------------------------------------
        // Bootstrap
        // -------------------------------------------

    }]);