'use strict';

angular.module('decks').controller('DeckController', ['$scope', '$stateParams', '$location', 'DeckService',
	function($scope, $stateParams, $location, DeckService)
	{
		$scope.create = function()
		{
			var deck = new DeckService({
				name: this.name
			});

			deck.$save(function(res)
			{
				$location.path('decks/' + res._id);

				$scope.name = '';
			},
			function(err)
			{
				$scope.error = err.data.message;
			});
		};

		$scope.removeImage = function(img)
		{
			var deck = $scope.deck;

			var index = deck.images.indexOf(img);
			deck.images.splice(index);

			deck.$update(function(res)
			{
				$location.path('decks/' + res._id + '/edit');
			},
			function(err)
			{
				$scope.error = err.data.message;
			});
		}

		$scope.find = function()
		{
			$scope.decks = DeckService.query();
		};

		$scope.findOne = function()
		{
			$scope.deck = DeckService.get({
				deckId: $stateParams.deckId
			});
		};
	}
]);
