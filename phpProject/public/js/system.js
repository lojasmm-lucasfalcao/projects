var app = angular.module('system',[]);

app.controller('systemController',systemController)


systemController.$inject = ['$scope', '$http', '$rootScope', '$location', '$window'];

function systemController($scope, $http, $rootScope, $location, $window) {
    var $injector = angular.injector();
    var vm = $scope;
    vm.registerProduct = registerProduct;
    vm.deleteProduct = deleteProduct;
    vm.updateProduct = updateProduct;
    vm.getProduct = getProduct;
    vm.editProduct = editProduct;
    iniciarController();

    function iniciarController(){
        vm.productModel={
            product : "",
            cod : "",
            price : "",
            amount : "",
            type_product: "",
            taxes : ""
        }
       getProducts(); 
        vm.edit = false;
    }

    function registerProduct(){
        const params = vm.productModel;
        vm.registerProd = $http({
            method: 'GET',
            url: '/products/add',
            params: params
        }).then(function successCallback(response) {
            iniciarController();
        });
    }

    function getProducts(){
            vm.registerProd = $http({
                method: 'GET',
                url: '/products/getProducts',
                params: ''
            }).then(function successCallback(response) {
                vm.products = response.data['PRODUCTS'];
            });
    }

    function deleteProduct(id){
        vm.deleteProd = $http({
            method: 'GET',
            url: '/products/delete',
            params: {cod:id}
        }).then(function successCallback(response) {
            swal("Sucess!", response.data.MESSAGE, "success");
            getProducts();
        });

    }

    function getProduct(id){
        vm.getProd = $http({
            method: 'GET',
            url: '/products/getProduct',
            params: {cod:id, edit:vm.edit}
        }).then(function successCallback(response) {
            if(vm.edit == true){
            response.data['PRODUCT'][0]['amount'] = parseInt(response.data['PRODUCT'][0]['amount']);    
            vm.productModel = response.data['PRODUCT'][0];

            }else{
                vm.products = response.data['PRODUCT'];
            }
        });
    }

    function editProduct(id){
        vm.edit = true;
        getProduct(id);
    }

    function updateProduct(){
        delete vm.productModel['created_at'];
        delete vm.productModel['updated_at'];
        const params = vm.productModel;
        vm.updateProd = $http({
            method: 'GET',
            url: '/products/update',
            params: params
        }).then(function successCallback(response) {
            console.log("response",response);
            swal("Sucess!", response.data.MESSAGE, "success");
           iniciarController();
        });

    }


}