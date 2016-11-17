'use strict';
(function () {
    // Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
    var app = angular.module('app', [

      
        'ngCookies',
        'ngRoute',
        'ngResource',
        'ngTouch',
        'ui.router',
        'ui.bootstrap',       
        'LocalStorageModule',
        'oc.lazyLoad',       
        'app.filters',
        'app.directives',
        'app.controllers',
        'app.factory',
        'app.services'
        
      
    ]).config(['$resourceProvider', '$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
            function ($resourceProvider, $stateProvider, $locationProvider, $httpProvider, $urlRouterProvider, $ocLazyLoadProvider) {

                // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
                // ------------------------------------------------------------------------------------------------------------

             $httpProvider.interceptors.push('authInterceptorService');
            
                $stateProvider
                      .state("default", {

                          url: "/",
                          views: {
                              'bootstrap': {
                                  templateUrl: '/views/index',          //HOME PAGE.
                                  controller: "MainController"
                              }
                            
                          },
                          resolve: {
                                resources: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        ASSETS.icons.meteocons,
                                        ASSETS.maps.vectorMaps,
                                        ASSETS.tables.datatables
                                    ]);
                                }
                              }                              
                      })
                        .state('about', {
                            url: '/about',
                            templateUrl: '/views/about',
                            controller: 'AboutCtrl',
                            resolve: {
                                resources: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        ASSETS.icons.meteocons,
                                        ASSETS.maps.vectorMaps,
                                        ASSETS.tables.datatables
                                    ]);
                                }
                            }
                        })
                       .state('webinfo', {
                           url: '/webinfo',
                           templateUrl: '/views/admin-retail/WebContent/WebInfo',
                           controller: 'WebInfoController',
                           resolve: {
                               resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                   return $ocLazyLoad.load({
                                       files: [
                                         '/Content/js/uikit/vendor/codemirror/codemirror.js',
                                         '/Content/js/uikit/vendor/marked.js',
                                         '/Content/js/wysihtml5/src/bootstrap-wysihtml5.css',
                                         '/Content/js/uikit/vendor/codemirror/codemirror.css',
                                         '/Content/js/uikit/uikit.css',
                                         '/Content/js/uikit/css/addons/uikit.almost-flat.addons.min.css',
                                         '/content/js/wysihtml5/src/bootstrap-wysihtml5.js',
                                         '/Content/js/ckeditor/ckeditor.js',
                                         '/Content/js/ckeditor/adapters/jquery.js'
                                       ]

                                   });
                               }]
                           }

                       })
                    .state('webpage', {
                        url: '/webpage',
                        templateUrl: '/views/admin-retail/WebContent/WebPage',
                        controller: 'WebPageController',
                        resolve: {
                            resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: ['Content/js/datatables/angular-table.js']
                                });
                            }]
                        }

                    })
                        .state('review', {
                            url: '/reviews',
                            templateUrl: '/views/admin-retail/Reviews/Reviews',                           
                            controller: 'ReviewsController',
                            resolve: {
                                resources:['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({                                      
                                        files: ['Content/js/datatables/angular-table.js']
                                    });
                                }]
                            }
                           
                        })
                      .state('promos', {
                          url: '/promos',
                          templateUrl: '/views/admin-retail/Promos/Promos',
                          controller: 'PromosController',
                          resolve: {
                              resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                  return $ocLazyLoad.load({
                                      files: ['/Content/js/datatables/angular-table.js']
                                  });
                              }]
                          }

                      })
                     .state('invoices', {
                         url: '/invoices',
                         templateUrl: '/views/admin-retail/Invoices/Invoices',
                         controller: 'InvoicesController',
                         resolve: {
                             resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                 return $ocLazyLoad.load({
                                     files: ['/Content/js/datatables/angular-table.js']
                                 });
                             }]
                         }

                     })
                      .state('returns', {
                          url: '/returns',
                          templateUrl: '/views/admin-retail/Invoices/Returns',
                          controller: 'ReturnsController',
                          resolve: {
                              resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                  return $ocLazyLoad.load({
                                      files: ['/Content/js/datatables/angular-table.js']
                                  });
                              }]
                          }

                      })
                     .state('customers-snapshot', {
                         url: '/customers-snapshot',
                         templateUrl: '/views/admin-sales/Customers/Customers',
                         controller: 'CustomerInfoController',
                         resolve: {
                             resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                 return $ocLazyLoad.load({
                                     files: ['/Content/js/datatables/angular-table.js',
                                         '/Content/js/devexpress-web-14.1x/js/globalize.min.js',
                                     '/Content/js/devexpress-web-14.1x/js/dx.chartjs.js']
                                 });
                             }]
                         }

                     })
                     .state('customers-list', {
                         url: '/customers-list',
                         templateUrl: '/views/admin-sales/Customers/Customers-List',
                         controller: 'CustomersController',
                         resolve: {
                             resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                 return $ocLazyLoad.load({
                                     files: ['/Content/js/datatables/angular-table.js',
                                            '/Content/js/inputmask/jquery.inputmask.bundle.js'
                                            
                                        
                                            
                                        ]
                                 });
                             }]
                         }

                     })
                   
                        .state('customer-prospects', {
                            url: '/customer-prospects',
                            templateUrl: '/views/admin-sales/Customers/Customer-Prospects',
                            controller: 'ProspectsController',
                            resolve: {
                                resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        files: ['/Content/js/datatables/angular-table.js',
                                                '/Content/fonts/linecons/css/linecons.css']
                                    });
                                }]
                            }

                        })
                      .state('customers-locate', {
                          url: '/customers-find',
                          templateUrl: '/views/admin-sales/Customers/Customers-Locate',
                          controller: 'CustomersController',
                          resolve: {
                            resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: ['/Content/js/datatables/angular-table.js',
                                        '/Content/js/devexpress-web-14.1x/js/globalize.min.js',
                                    '/Content/js/devexpress-web-14.1x/js/dx.chartjs.js'    ]
                                });
                            }]
                        }

                      })
                      .state('sales-mileage', {
                          url: '/sales-mileage',
                          templateUrl: '/views/admin-sales/Customers/Sales-Mileage',
                          controller: 'MileageController',
                          resolve: {
                              resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                  return $ocLazyLoad.load({
                                      files: ['/Content/js/datatables/angular-table.js'



                                      ]
                                  });
                              }]
                          }

                      })
                    .state('reports-mileage', {
                        url: '/admin/reports/mileagereport',
                        controller: 'MileageReportController',
                        templateUrl: '/views/admin/reports/mileagereport',
                        resolve: {
                            resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: ['/Content/js/datatables/angular-table.js']
                                });
                            }]
                        }
                    })
                    .state('customers-edit', {
                        url: '/customers/edit/:id',
                        templateUrl: '/views/admin-sales/Customers/Edit',
                        controller: 'CustomerEditController',
                        resolve: {
                            resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: ['/Content/js/datatables/angular-table.js']
                                });
                            }]
                        }

                    })
                      .state('webinfo-edit', {
                          url: '/webinfo/edit/:id',
                          templateUrl: '/views/admin-retail/WebContent/Edit-WebInfo',
                          controller: 'WebInfoDetailController',
                          resolve: {                                                       
                              resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                  return $ocLazyLoad.load({
                                      files: [                                        
                                        '/Content/js/uikit/vendor/codemirror/codemirror.js',
                                        '/Content/js/uikit/vendor/marked.js',
                                        '/Content/js/wysihtml5/src/bootstrap-wysihtml5.css',
                                        '/Content/js/uikit/vendor/codemirror/codemirror.css',
                                        '/Content/js/uikit/uikit.css',
                                        '/Content/js/uikit/css/addons/uikit.almost-flat.addons.min.css',
                                        '/content/js/wysihtml5/src/bootstrap-wysihtml5.js',                                       
                                        '/Content/js/ckeditor/ckeditor.js',
                                        '/Content/js/ckeditor/adapters/jquery.js'                                    
                                      ]

                                  });                           
                              }]
                          }
                      })
                     .state('webinfo-page', {
                         url: '/webpage/edit/:id',
                         templateUrl: '/views/admin-retail/WebContent/Edit-WebPage',
                         controller: 'WebPageDetailController',
                         resolve: {
                             resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                 return $ocLazyLoad.load({
                                     files: [
                                       '/Content/js/uikit/vendor/codemirror/codemirror.js',
                                       '/Content/js/uikit/vendor/marked.js',
                                       '/Content/js/wysihtml5/src/bootstrap-wysihtml5.css',
                                       '/Content/js/uikit/vendor/codemirror/codemirror.css',
                                       '/Content/js/uikit/uikit.css',
                                       '/Content/js/uikit/css/addons/uikit.almost-flat.addons.min.css',
                                       '/content/js/wysihtml5/src/bootstrap-wysihtml5.js',
                                       '/Content/js/ckeditor/ckeditor.js',
                                       '/Content/js/ckeditor/adapters/jquery.js'
                                     ]

                                 });
                             }]
                         }
                     })
                        .state('promos-edit', {
                            url: '/promos/edit/:id',
                            templateUrl: '/views/admin-retail/promos/edit',
                            controller: 'PromosDetailController'
                        })
                        .state('reviews-edit', {
                            url: '/review/edit/:id',
                            templateUrl: '/views/admin-retail/reviews/edit',
                            controller: 'ReviewDetailCtrl'
                        })
                       .state("login", {
                             url: '/login',
                             controller: "CredController",
                             templateUrl: "/views/login"
                       })
                       .state("logout", {
                            url: '/logout',
                            controller: 'CredController',
                            templateUrl: "/views/login"
                        })
                        .state("contactlenses", {
                            url: '/contactlenses',
                            controller: "ContactLensesCtrl",
                            templateUrl: "/views/contactlenses"
                        })
                        .state("signup", {
                            url: '/login-light',
                            controller: "SignupController",
                            templateUrl: "/views/signup",
                            resolve: {
                                resources: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        ASSETS.forms.jQueryValidate,
                                    ]);
                                },
                            }
                        }).                   
                        state("orders", {
                            url: "/admin/orders",
                            templateUrl: "/views/admin/orders/orders",                          
                        }).
                        state("glasses", {
                            url: "/admin/orders/glasses",
                            templateUrl: "/views/admin/orders/glasses",
                           
                        }).
                        state("lenses", {
                            url: "/admin/orders/lenses",
                            templateUrl: "/views/admin/orders/lenses",
                       
                        }).
                        state("home", {
                            url: "/home",
                            templateUrl: "/views/index",
                            controller: "HomeController",
                            resolve: {
                                resources: ['$ocLazyLoad', '$injector', function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        files: [                                        
                                            '/Content/js/fullcalendar/fullcalendar.css',
                                            '/Content/js/fullcalendar/moment.min.js',
                                            '/Content/js/fullcalendar/fullcalendar.js'
                                            ]
                                    });
                                }]
                            }
                        })

              
                .state('otherwise', {
                    url: '*path',
                    templateUrl: '/views/404',
                    controller: 'Error404Ctrl'
                });
        
             //sss $urlRouterProvider.otherwise({ redirectTo: "/" });
              
              
        
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
               });

            }]);

        // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
        // can be injected here. This is to prevent further system configuration during application run time.
        app.run(['$templateCache', '$rootScope', '$state', '$stateParams', 'AuthenticationService',function ($templateCache, $rootScope, $state, $stateParams,AuthenticationService) {

         //   AuthenticationService.FillAuthData();
         
            // Page Loading Overlay
            public_vars.$pageLoadingOverlay = jQuery('.page-loading-overlay');

            jQuery(window).load(function () {
                public_vars.$pageLoadingOverlay.addClass('loaded');
            })


            // <ui-view> contains a pre-rendered template for the current view
            // caching it will prevent a round-trip to a server at the first page load
            var view = angular.element('#ui-view');
            $templateCache.put(view.data('tmpl-url'), view.html());

            // // Allows to retrieve UI Router state information from inside templates
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                // Sets the layout name, which can be used to display different layouts (header, footer etc.)
                // based on which page the user is located
                $rootScope.layout = toState.layout;
            });


        }]);
   
   
})();
