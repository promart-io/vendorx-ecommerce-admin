angular.module('page', ['ngAnimate', 'ui.bootstrap']);
angular.module('page')
.factory('httpRequestInterceptor', function () {
	return {
		request: function (config) {
			config.headers['X-Requested-With'] = 'Fetch';
			return config;
		}
	};
})
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('httpRequestInterceptor');
}])
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'vendorx-ecommerce-admin.Products.Products.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('vendorx-ecommerce-admin.Products.Products.refresh', callback);
		},
		onUoMModified: function(callback) {
			on('vendorx-ecommerce-admin.Products.UoM.modified', callback);
		},
		onCategoriesModified: function(callback) {
			on('vendorx-ecommerce-admin.Products.Categories.modified', callback);
		},
		onCurrenciesModified: function(callback) {
			on('vendorx-ecommerce-admin.Products.Currencies.modified', callback);
		},
		messageEntityModified: function() {
			message('modified');
		},
		messageEntitySelected: function(id) {
			message('selected', id);
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '../../../../../../../../../../services/v3/js/vendorx-ecommerce-admin/api/Products/Products.js';
	var uomidOptionsApi = '../../../../../../../../../../services/v3/js/vendorx-ecommerce-admin/api/Nomenclatures/UoM.js';
	var categoryidOptionsApi = '../../../../../../../../../../services/v3/js/vendorx-ecommerce-admin/api/Nomenclatures/Categories.js';
	var currencyidOptionsApi = '../../../../../../../../../../services/v3/js/vendorx-ecommerce-admin/api/Nomenclatures/Currencies.js';

	$scope.uomidOptions = [];

	$scope.categoryidOptions = [];

	$scope.currencyidOptions = [];

	$scope.dateOptions = {
		startingDay: 1
	};
	$scope.dateFormats = ['yyyy/MM/dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.dateFormat = $scope.dateFormats[0];

	function uomidOptionsLoad() {
		$http.get(uomidOptionsApi)
		.success(function(data) {
			$scope.uomidOptions = data;
		});
	}
	uomidOptionsLoad();

	function categoryidOptionsLoad() {
		$http.get(categoryidOptionsApi)
		.success(function(data) {
			$scope.categoryidOptions = data;
		});
	}
	categoryidOptionsLoad();

	function currencyidOptionsLoad() {
		$http.get(currencyidOptionsApi)
		.success(function(data) {
			$scope.currencyidOptions = data;
		});
	}
	currencyidOptionsLoad();

	$scope.dataPage = 1;
	$scope.dataCount = 0;
	$scope.dataOffset = 0;
	$scope.dataLimit = 10;

	$scope.getPages = function() {
		return new Array($scope.dataPages);
	};

	$scope.nextPage = function() {
		if ($scope.dataPage < $scope.dataPages) {
			$scope.loadPage($scope.dataPage + 1);
		}
	};

	$scope.previousPage = function() {
		if ($scope.dataPage > 1) {
			$scope.loadPage($scope.dataPage - 1);
		}
	};

	$scope.loadPage = function(pageNumber) {
		$scope.dataPage = pageNumber;
		$http.get(api + '/count')
		.success(function(data) {
			$scope.dataCount = data;
			$scope.dataPages = Math.ceil($scope.dataCount / $scope.dataLimit);
			$http.get(api + '?$offset=' + ((pageNumber - 1) * $scope.dataLimit) + '&$limit=' + $scope.dataLimit)
			.success(function(data) {
				$scope.data = data;
			});
		});
	};
	$scope.loadPage($scope.dataPage);

	$scope.openNewDialog = function() {
		$scope.actionType = 'new';
		$scope.entity = {};
		toggleEntityModal();
	};

	$scope.openEditDialog = function(entity) {
		$scope.actionType = 'update';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.openDeleteDialog = function(entity) {
		$scope.actionType = 'delete';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		$scope.loadPage($scope.dataPage);
		toggleEntityModal();
	};

	$scope.create = function() {
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			$scope.loadPage($scope.dataPage);
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$http.put(api + '/' + $scope.entity.Id, JSON.stringify($scope.entity))
		.success(function(data) {
			$scope.loadPage($scope.dataPage);
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.Id)
		.success(function(data) {
			$scope.loadPage($scope.dataPage);
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
	};

	$scope.uomidOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.uomidOptions.length; i ++) {
			if ($scope.uomidOptions[i].Id === optionKey) {
				return $scope.uomidOptions[i].Name;
			}
		}
		return null;
	};

	$scope.categoryidOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.categoryidOptions.length; i ++) {
			if ($scope.categoryidOptions[i].Id === optionKey) {
				return $scope.categoryidOptions[i].Name;
			}
		}
		return null;
	};

	$scope.currencyidOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.currencyidOptions.length; i ++) {
			if ($scope.currencyidOptions[i].Id === optionKey) {
				return $scope.currencyidOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh($scope.loadPage($scope.dataPage));
	$messageHub.onUoMModified(uomidOptionsLoad);
	$messageHub.onCategoriesModified(categoryidOptionsLoad);
	$messageHub.onCurrenciesModified(currencyidOptionsLoad);

	$scope.selectEntity = function(entity) {
		$scope.selectedEntity = entity;
		$messageHub.messageEntitySelected({
			'id': entity.Id		})
	};

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});