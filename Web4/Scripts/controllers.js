'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', [])

    // Path: /
    
    .controller('HomeController', ['$scope', '$rootScope', '$location', '$window', 'SchedulerFactory','CustomersNonFactory', function ($scope, $rootScope, $location, $window, SchedulerFactory, CustomersNonFactory) {
        $scope.$root.title = "Sales Portal";
        $scope.description = "Hello there";


     
        if ($rootScope.SID != null) {
            
            $scope.nonCustomers = CustomersNonFactory.show({ "id": $rootScope.SID });
            $scope.calendarDraggable = SchedulerFactory.schedulerdraggable.show({ "id": $rootScope.SID });
            $scope.SID = $rootScope.SID;

            var getItems = SchedulerFactory.schedulerlist.query({ "id": $rootScope.SID });

            $scope.showCalendarTab = true

            $scope.eventItems = function reworkEvents(getItems) {

                var eventitems = [];
                for (var i = 0; i < items.length; i++) {
                    eventitems.push(
                        {
                            "id": items[i].ID,
                            "title": items[i].Title,
                            "start": items[i].Start_Time,
                            "end": items[i].End_Time,
                            "className": items[i].className
                        });

                }
                return eventitems;
            }

         
            $scope.defaultDate = $rootScope.datenow;
          
            $scope.colors = ['red', 'blue', 'primary', 'success', 'warning', 'info', 'danger', 'purple', 'black', 'gray', 'turquoise'];

            $scope.usereventitem = {}; // User self added event list item.

            $scope.deleteEventItem = function (id) {
                var di = SchedulerFactory.schedulers.delete({"id": id});
            }
            $scope.updateEventItem = function (item) {
                var customerName = item.title.substring(item.title.indexOf(": "));
                var eventtypes = ["Travel Time", "Breakfast Meal", "Lunch Meal"];

                var classname = item.className;
                console.log(item);

                var updateitem = {
                   "ID": item.id,
                   "UserID": $rootScope.SID,
                   "Customer_ID": item.customerid,
                   "Customer_Name": item.customername, // customerName != eventtypes[0] && customerName != eventtypes[1] && customerName != eventtypes[2] ? "Client Visit w/ " + customerID + ":" + customerName : customerName,
                   "Title": item.title,
                   "Start_Time": item.start,
                   "End_Time": item.end,
                   "className": item.className
                    
                };
                if (!item.userGenerated) {
                    var result = SchedulerFactory.schedulers.update({ id: item.id}, updateitem);
                } else {
                    var response = SchedulerFactory.schedulers.create(saveitem);
                    
                }
            }
            $scope.updateDropEventItem = function (item) {
                
                var customerName = null,customerID = null,eventtypes = [];

                if (!item.userGenerated) {
                    customerName = item.title.substring(item.title.indexOf(":") + 1);
                    customerID = item.title.substring(0, item.title.indexOf(":") - 1);
                    eventtypes = ["Travel Time", "Breakfast Meal", "Lunch Meal"];
                } 
                
                var saveitem = {
                    "ID": item.id,
                    "UserID": $rootScope.SID,
                    "Customer_ID": customerID,
                    "Customer_Name": customerName != eventtypes[0] && customerName != eventtypes[1] && customerName !=eventtypes[2] ? customerName : '',
                    "Title": customerName != eventtypes[0] && customerName != eventtypes[1] && customerName !=eventtypes[2] ? "Client Visit w/ " + customerID + ":" + customerName : customerName,
                    "Start_Time": item.start,
                    "End_Time": item.end,
                    "className": item.className
                };
                var response = customerName != eventtypes[0] && customerName != eventtypes[1] && customerName != eventtypes[2] ? SchedulerFactory.schedulers.update({ id: item.id }, saveitem) : SchedulerFactory.schedulers.create(saveitem);
                
            };


            $scope.addSalesItem = function () {

                //Why isnt this reading the new value??
                var event_name = $scope.usereventitem.eventname;

                if (event_name.length >= 3) {

                    var color = $scope.colors[Math.floor(Math.random() * $scope.colors.length)];

                    // Create Event Entry
                    angular.element("#events-list").append(
                            '<li class="draggable">\
					<a href="" data-event-class="event-color-' + color + '" data-user-generated="true">\
						<span class="badge badge-' + color + ' upper">' + event_name + '</span>\
					</a>\
				</li>'
                        );

                    // Reset draggable
                    angular.element("#events-list li.draggable").draggable({
                        revert: true,
                        revertDuration: 50,
                        zIndex: 999
                    });

                    // Reset input
                    angular.element('.form-control').trigger('focus');

                }
                else {
                    angular.element('.form-control').focus();
                }

            };
        }

      

         /*
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
           
        });
        */
    }]).
    	controller('SidebarMenuController', ['$scope', '$rootScope', '$menuItems', '$timeout', '$location', '$state', '$layout', function ($scope, $rootScope, $menuItems, $timeout, $location, $state, $layout) {

    	    // Menu Items
    	    var $sidebarMenuItems = $menuItems.instantiate();

            
    	    //GOING TO CHANGE THIS TO DELIVER DIFFERENT MENU ITEMS, DEPENDING ON
    	    //THE USERS LEVEL.  THIS IS ADMIN LEVEL -- all ITEMS.
            if ($rootScope.userLevel1)
                $scope.menuItems = $sidebarMenuItems.prepareSidebarMenu().getAll();

            if ($rootScope.userLevel3)
                $scope.menuItems = $sidebarMenuItems.prepareSalesMenu().getAll();

    	    // Set Active Menu Item
    	    $sidebarMenuItems.setActive($location.path());
    	    $scope.layoutOptions.sidebar.isMenuOpenMobile = true;

    	    $rootScope.$on('$stateChangeSuccess', function () {
    	       
    	        $sidebarMenuItems.setActive($state.current.name);
    	    });

    	    // Trigger menu setup
    	    public_vars.$sidebarMenu = public_vars.$body.find('.sidebar-menu');
    	    $timeout(setup_sidebar_menu, 1);

    	    ps_init(); // perfect scrollbar for sidebar


    	}]).

         controller('ChatCtrl', function($scope, $element)
        {
            var $chat = jQuery($element),
                $chat_conv = $chat.find('.chat-conversation');

            $chat.find('.chat-inner').perfectScrollbar(); // perfect scrollbar for chat container

            // Chat Conversation Window (sample)
            $chat.on('click', '.chat-group a', function(ev)
            {
                ev.preventDefault();

                $chat_conv.toggleClass('is-open');

                if($chat_conv.is(':visible'))
                {
                    $chat.find('.chat-inner').perfectScrollbar('update');
                    $chat_conv.find('textarea').autosize();
                }
            });

            $chat_conv.on('click', '.conversation-close', function(ev)
            {
                ev.preventDefault();
                $chat_conv.removeClass('is-open');
            });
        })
    // Path: /about
    .controller('AboutCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = "Optik K&R Data Management Studio";
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])
    //Path : /ContactLenses
    .controller('ContactLensesCtrl', ['$scope', '$location', 'ContactLensesFactory', function ($scope,$location,ContactLensesFactory) {

        $scope.$root.title = "Optik K&R Data Manager";
        $scope.Greeting = "Retail Manager for Contact Lenses";
        $scope.contactlenses = ContactLensesFactory.query();
        
    }])
     //Path : /WebInfo
    .controller('WebInfoController', ['$scope', '$location', 'WebInfoFactory', '$filter', "$rootScope", function ($scope, $location, WebInfoFactory, $filter, $rootScope) {


        $scope.$root.title = "Retail manager Promotions";
        $scope.Greeting = "Retail Manager :";

       $scope.toggleLang = function (lg) {           
            $scope.layoutOptions.lang = lg;            
        }

        $scope.createWebInfo = function () {
            $rootScope.layoutOptions.isCreate = true;
            $scope.layoutOptions.lang = "E";
            $location.path('/webinfo/edit/');
        };

        // callback for ng-click 'createNewWebInfo':
        $scope.createNewWebInfo = function () {
            WebInfoFactory.create($scope.webinfo);
            $location.path('/webinfo/edit');
            $scope.webinfo = WebInfoFactory.query();
            $scope.filteredList = $scope.webinfo;
        }

        $scope.editInfo = function (Id) {
            $rootScope.layoutOptions.isCreate = false;
            $location.path('/webinfo/edit/' + Id);
        };

        $scope.deleteInfo = function (Id) {
            WebInfoFactory.delete({ id: Id });
            $scope.webinfo = WebInfoFactory.query();
            $scope.filteredList = $scope.webinfo;
        };

        $scope.clearFilter = function () {
            $scope.query = {};
        };

        $scope.config = {
            itemsPerPage: 6,
            maxPages: 10,
            fillLastPage: "yes"
        };


        $scope.webinfo = WebInfoFactory.query();
        $scope.filteredList = $scope.webinfo;
        $scope.length = $scope.webinfo.length;

        $scope.updateFilteredList = function () {
            $scope.filteredList = $filter("filter")($scope.webinfo, $scope.query);
        };


    }])
      //Path : /WebInfo
    .controller('WebPageController', ['$scope', '$location', 'WebPageFactory', '$filter', "$rootScope", function ($scope, $location, WebPageFactory, $filter, $rootScope) {


        $scope.$root.title = "Retail manager Promotions";
        $scope.Greeting = "Retail Manager :";


        $scope.createPage = function () {
            $rootScope.layoutOptions.isCreate = true;
            $location.path('/webpage/edit/');
        };

        $scope.editPage = function (Id) {
            $rootScope.layoutOptions.isCreate = false;
            $location.path('/webpage/edit/' + Id);
        };

        $scope.deletePage = function (Id) {
            WebPageFactory.delete({ id: Id });
            $scope.webpage = WebPageFactory.query();
            $scope.filteredList = $scope.webpage;
        };

        $scope.clearFilter = function () {
            $scope.query = {};
        };

        $scope.config = {
            itemsPerPage: 6,
            maxPages: 10,
            fillLastPage: "yes"
        };

        

        $scope.webpage = WebPageFactory.query();
        $scope.filteredList = $scope.webpage;
        $scope.length = $scope.webpage.length;

        $scope.updateFilteredList = function () {
            $scope.filteredList = $filter("filter")($scope.webpage, $scope.query);
        };


    }])
    .controller('MileageReportController', ['$scope', '$location', '$rootScope','ReportMileageFactory', '$filter', function ($scope, $location, $rootScope,ReportMileageFactory,$filter) {

        $scope.$root.title = "Reports :  Mileage Report";
        $scope.Greeting = "Reports Manager";

        $scope.config = {
            itemsPerPage: 10,
            maxPages: 6,
            fillLastPage: "no"
        };

        $scope.data = {};
         
        $scope.selectedMonth = "";
    
        $scope.filterMonth = function (month) {
            $scope.filteredList = ReportMileageFactory.show({ "id": month });
        }

        $scope.updateData = function (salespersons) {
            $scope.filteredList = ReportMileageFactory.show({ "id": salespersons });           
        }


    }])
   
    //Path : /RetailPromos
    .controller('PromosController', ['$scope', '$location', 'PromosFactory', '$filter', "$rootScope", function ($scope, $location, PromosFactory, $filter, $rootScope) {


        $scope.$root.title = "Retail manager Promotions";
        $scope.Greeting = "Retail Manager :";


        $scope.createPromo = function () {
            $rootScope.layoutOptions.isCreate = true;
            $location.path('/promos/edit/');
        };

        $scope.editPromo = function (Id) {
            $rootScope.layoutOptions.isCreate = false;
            $location.path('/promos/edit/' + Id);
        };

        $scope.deletePromo = function (Id) {
            PromosFactory.delete({ id: Id });
            $scope.reviews = PromosFactory.query();
            $scope.filteredList = $scope.promos;
        };

        $scope.clearFilter = function () {
            $scope.query = {};
        };

        $scope.config = {
            itemsPerPage: 6,
            maxPages: 10,
            fillLastPage: "yes"
        };


        $scope.promos = PromosFactory.query();
        $scope.filteredList = $scope.promos;

        $scope.updateFilteredList = function () {
            $scope.filteredList = $filter("filter")($scope.promos, $scope.query);
        };


    }])
    .controller('PromosDetailController', ['$stateParams', '$scope', 'PromosFactory', '$location', '$rootScope', function ($stateParams, $scope, PromosFactory, $location, $rootScope) {


        if ($stateParams.id != '')
            $scope.promo = PromosFactory.show({ id: $stateParams.id });

        $scope.updatePromo = function () {
            PromosFactory.update({ id: $stateParams.id }, $scope.promo);

            $scope.promos = PromosFactory.query();
            $location.path('/promos');
        };
        $scope.cancel = function () {

            $location.path('/promos');
        };
        // callback for ng-click 'createNewUser':
        $scope.createNewPromo = function () {
            PromosFactory.create($scope.promo);


            $location.path('/promos');
            $scope.promos = PromosFactory.query();
            $scope.filteredList = $scope.promos;
        }


    }])
     
      .controller('WebInfoDetailController', ['$stateParams', '$scope', 'WebInfoFactory', '$location', '$rootScope', function ($stateParams, $scope, WebInfoFactory, $location, $rootScope) {

         
          
          if ($stateParams.id != '') {
              $scope.webinfo = WebInfoFactory.show({ id: $stateParams.id });
              $scope.layoutOptions.lang = 'E';
          }

          $scope.updateInfo = function () {
              WebInfoFactory.update({ id: $stateParams.id }, $scope.webinfo);
              $scope.webinfo = WebInfoFactory.query();
              $location.path('/webinfo/edit');
          };
          //Return to listing page.
          $scope.cancel = function () {
              $location.path('/webinfo');
          };

          // callback for ng-click 'createNewWebInfo':
          $scope.createNewWebInfo = function () {
              WebInfoFactory.create($scope.webinfo);
              $location.path('/webinfo/edit');
              $scope.webinfo = WebInfoFactory.query();
              $scope.filteredList = $scope.webinfo;
          }

          $scope.toggleLang = function (lang) {
              $scope.layoutOptions.lang = lang;
              
          }



      }])

    // Path : /RetailReviews
    .controller('ReviewsController', ['$scope', '$location','ReviewsFactory','$filter',"$rootScope",function ($scope,$location,ReviewsFactory,$filter,$rootScope) {

       
        $scope.$root.title = "Optik K&R Data Management Studio";
        $scope.Greeting = "Retail Manager :";


        $scope.createReview = function () {
            $rootScope.layoutOptions.isCreate = true;
            $location.path('/review/edit/');
        };

        $scope.editReview = function (Id) {
            $rootScope.layoutOptions.isCreate = false;
            $location.path('/review/edit/'+Id);
        };

        $scope.deleteReview = function (Id) {
            ReviewsFactory.delete({ id: Id });
            $scope.reviews = ReviewsFactory.query();
            $scope.filteredList = $scope.reviews;
        };

        $scope.clearFilter = function () {           
            $scope.query = {};
        };

        $scope.config = {
            itemsPerPage: 8,
            maxPages: 10,
            fillLastPage: "no"
        };
      
        
        $scope.reviews = ReviewsFactory.query();
        $scope.filteredList = $scope.reviews;

        $scope.updateFilteredList = function () {
            $scope.filteredList = $filter("filter")($scope.reviews, $scope.query);
        };

   
    }])

      
   .controller('PriorMileageController', ['$scope', '$location', 'MileageFactory', 'MileageDataFactory', '$filter', "$rootScope", '$stateParams', '$modal', '$http', function ($scope, $location, MileageFactory, MileageDataFactory, $filter, $rootScope, $stateParams, $modal, $http) {
   
       //exec [Customers.Get.Special.Pricing] 'max55'


       //  Check if LocalStorage has any old records, save to new array.
       var modal_size = 400;
       var unsubmittedDays = [];
       $scope.showPrior = false;
       var todaysDate = new Date().toDateString();
       var counter = 0;
       for (var i = 0; i <localStorage.length; i++) {
           if (localStorage.key(i) != todaysDate) {
               unsubmittedDays[counter] = localStorage.key(i);
               counter++;
           } 
       }
        
       showPrevious();
        //Display the panel if there are records to show.
       //Create nested json by combining the date value with the data.
       function showPrevious() {
           $scope.previousDays = [];
           if (unsubmittedDays.length > 0) {
               $scope.showPrior = true;
               $scope.DailyTotal = 0;
               for (var i = 0; i < unsubmittedDays.length; i++) {

                   //Combine day + data.
                   var day = new Object();
                   day.datevalue = unsubmittedDays[i];
                   day.datedata = MileageFactory.data(unsubmittedDays[i]);
                 
                   
                   //Calculate daily total.
                   var total = 0;
                   for (var x = 0; x < day.datedata.length; x++) {
                       total = total + (day.datedata[x].endingmileage - day.datedata[x].startingmileage);
                   }
                   day.mileageresult = total;
                   day.DailyTotal = total;
                   $scope.previousDays.push(day);
               }
           }
       };
   
     
       $scope.insertItemAfter = function(p,d,idx){

       var blank = {
               "User_Id": $rootScope.SID,
               "timestamp": d.datevalue,
               "startingmileage": 0,
               "endingmileage": 0,
               "mileageresult": 0,
               "clientid": $scope.selected
           };
          
           for (i = 0; i < $scope.previousDays.length; i++) {
               if ($scope.previousDays[i].datevalue == d.datevalue) {
                   //That's the ticket.
                   // splice(position, numberOfItemsToRemove, item)
                  // $scope.previousDays[i].datedata.splice(idx-1,0,blank);
                   $scope.previousDays[i].datedata.push(blank);
               }


           }
          
         
         
       };
    
       $scope.updatePrior = function (p, d) {
           //p = current item, d = all the items...
         
           MileageFactory.replace(d.datedata, d.datevalue);
           showPrevious(); // call after update.
           $rootScope.currentModal = $modal.open({
               templateUrl: "SuccessModal",
               size: modal_size,
               backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop


           });
       };
      
       $scope.submitMileage = function (m) {

           var currentUser = $rootScope.globals.currentUser.username;
           var counter = 0;
           if (localStorage.length > 0) {
               for (var i = 0; i < localStorage.length; i++) {
                   if (localStorage.key(i) == m) {
                       var recordToSave = MileageFactory.data(localStorage.key(i));
                       for (var x = 0; x < recordToSave.length; x++) {
                           MileageDataFactory.create(recordToSave[x]);
                       }
                       MileageFactory.removeFactory(m);
                       showPrevious();
                   }
               }
           }
       };

   }])
   .controller('MileageController', ['$scope', '$location', 'MileageFactory', 'MileageDataFactory', '$filter', "$rootScope", '$stateParams', '$modal', '$http', function ($scope, $location, MileageFactory, MileageDataFactory, $filter, $rootScope, $stateParams, $modal, $http) {
   

       var modal_size = 400;


       var date = new Date();
             
       var timestamp = function () {
           var timestamp = date.toDateString() + " : " + date.toTimeString();
           return timestamp.substr(0, timestamp.indexOf("G"));
       };      
       var datatitle = function () {
           return date.toDateString();
       };


   
       $scope.todaysMileage = MileageFactory.data(datatitle());
       mileageTotal();
       $scope.datatitle = datatitle();

       $scope.mileage = {};
   
       $scope.recalcMileage = function (mileage) {

           var sm = mileage.startingmileage;
           var em = mileage.endingmileage;
           var result = (Number(em) - Number(sm));
           $scope.mileage = {
               "User_Id": $rootScope.SID,
               "timestamp": timestamp(),
               "startingmileage": mileage.startingmileage,
               "endingmileage": mileage.endingmileage,
               "mileageresult": result,
               "clientid": $scope.selected
           };
       };
   
     

       $scope.selected = '';
       $scope.created = false;
       $scope.customers = $rootScope.customers;
      
       $scope.state = closed;
       var closed, opened;
       opened = 'show';
       closed = 'hide';

       $scope.lookupClient = function () {
           var filtered;
           filtered = $filter('filter')($scope.customers, $scope.query);
           return $scope.state = filtered.length > 0 ? opened : 'hide';
       };

       $scope.select = function (item) {
           $scope.selected = item.Customer_ID;
           $scope.query = "";
           return $scope.state = closed;
           
       };

       $scope.clear = function () {
           $scope.selected = "";
           return $scope.state = closed;

       };
     
       $scope.newMileageItem = function (mileage) {
           var sm = mileage.startingmileage;
           var em = mileage.endingmileage;

           if (Number(em) > Number(sm)) {
               var rm = (em - sm);
               $scope.todays = {
                   "User_Id": $rootScope.SID,
                   "timestamp": timestamp(),
                   "startingmileage": sm,
                   "endingmileage": em,
                   "mileageresult": rm,
                   "clientid": $scope.selected
               }
               $scope.todaysMileage.push($scope.todays);
               MileageFactory.add($scope.todaysMileage, datatitle());
               $scope.mileage = {};
               $scope.mileage.startingmileage = em;
               $scope.selected = "";
               mileageTotal();
           } else {
               alert("Please make sure ending odometer (" + em + ") is larger than starting odometer (" + sm + ")");
           }

       };
       $scope.remMileageItem = function (m) {

           $scope.newMileage = [];
           $scope.todaysMileage.forEach(function (element, index, array) {
               if (element !== m) {
                   $scope.newMileage.push(element);
               }
           });
           $scope.todaysMileage = $scope.newMileage;
           MileageFactory.replace($scope.todaysMileage, datatitle());
           mileageTotal();
       };

       /*

       $scope.submitAll = function (datetime) {

           var currentUser = $rootScope.globals.currentUser.username;
           var counter = 0;
           for (var i = 0; i < localStorage.length; i++) {
               if (localStorage.key(i) != "" && localStorage.key(i) == datetime){
                   var recordToSave = MileageFactory.data(localStorage.key(i));
                   for (var x = 0; x < recordToSave.length; x++) {
                       MileageDataFactory.create(recordToSave[x]);
                   }
                   MileageFactory.removeFactory(p);
                   $scope.todaysMileage = {};
               }
           }

       }
       */
       $scope.submitMileage = function (m) {

           var currentUser = $rootScope.globals.currentUser.username;
           var counter = 0;
           if (localStorage.length > 0) {
               for (var i = 0; i < localStorage.length; i++) {
                   if (localStorage.key(i) == m) {
                       var recordToSave = MileageFactory.data(localStorage.key(i));
                       for (var x = 0; x < recordToSave.length; x++) {
                           MileageDataFactory.create(recordToSave[x]);
                       }
                       MileageFactory.removeFactory(m);
                       $scope.todaysMileage = {};
                   }
               }
           }
       };


       $scope.updateToday = function () {
           MileageFactory.replace($scope.todaysMileage, datatitle());
           $rootScope.currentModal = $modal.open({
               templateUrl: "SuccessModal",
               size: modal_size,
               backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop


           });
       };
   
     

       function mileageTotal() {
           var total = 0;
           $scope.todaysMileage.forEach(function (element, index, array) {
               total = total + element.mileageresult;
           });
           $scope.DailyTotal = total;
       };

      
     
   }])
   .controller('CustomerInfoController', ['$scope', '$location', 'CustomerOrderReturnsFactory', 'CustomerInfoFactory', 'CustomerPricingFactory', '$filter', "$rootScope", '$stateParams', '$modal', '$http', '$timeout', function ($scope, $location, CustomerOrderReturnsFactory, CustomerInfoFactory, CustomerPricingFactory, $filter, $rootScope, $stateParams, $modal, $http, $timeout) {


       //Defaults
       $scope.CustomerName = "";
       $scope.salesitems = [];
     
       var date = new Date();
       var opened = "show";
       var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
       var isLeapYear = (date.getFullYear() / 4).toString().indexOf(".") <= 0 ? true : false; //the year can be evenly divided by 4

       var feb = isLeapYear ? "28" : "29"; // If its a leapyear, number of days changes.
       var numDays = ["31", feb, "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
       $scope.now = new Date(date.getYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
       $scope.Date = $scope.now; // Default date is now.
       $scope.currentMonth = months[date.getMonth()] + " " + date.getFullYear();
       var StartDate = "01." + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "." + date.getFullYear();
       var EndDate = numDays[date.getMonth()] + "." + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "." + date.getFullYear();

     
      
       $scope.lookupClient = function () {
           var filtered;
           filtered = $filter('filter')($rootScope.customers, $rootScope.query);
           return $scope.state = filtered.length > 0 ? opened : 'hide';
          
           
       };

       //Default will be this month i guess.
   
      
        
      

       $scope.selectItem = function (item) {

           $scope.selected = item.Customer_ID;
           
           var items = CustomerInfoFactory.show({ "id": item.Customer_ID, "Startdate": StartDate, "Enddate": EndDate }, function () {
                 
                   $timeout(function() {
                           var $ = jQuery;
                           var xenonPalette = ['#68b828', '#7c38bc', '#0e62c7', '#fcd036', '#4fcdfc', '#00b19d'];
                           var donut_data = [];
                 
                           for (var i=0; i<items.length; i++){
                               donut_data[i] = {
                                        region: items[i].Product_Type_Name,                   
                                        val :  items[i].MonthTotal
                               }
                           }
                           var doughnut1_data_source = donut_data, timer;
                           $("#doughnut-1").dxPieChart({
                               dataSource: doughnut1_data_source,
                               tooltip: {
                                   enabled: true,
                                   format: "dollars",
                                   customizeText: function () {
                                       return this.argumentText + "<br/>" + this.valueText;
                                   }
                               },
                               size: {
                                   height: 230
                               },
                               legend: {
                                   visible: false
                               },
                               series: [{
                                   type: "doughnut",
                                   argumentField: "region"
                               }],
                               palette: xenonPalette
                           });
                 
                 
                       });
                       
            });
          
           //Bring the same data... ? wtf is going on.
         
           $scope.salesitems = items;
          // $scope.salesitems = [{"$id":"1","Qty":1,"MonthTotal":0.0000,"MoDate":3,"Product_Type_Id":5,"Product_Type_Name":"Rx Frame"}];
          
         
         

         
        
          $scope.query = "";
          $scope.state = closed;
           //Lookup the Sales Data
       };



       $scope.clear = function () {
           $scope.selected = "";
           return $scope.state = closed;

       };

    


   }])

    .controller('ProspectsController', ['$scope', '$location', '$stateParams', 'CustomersSalesEntryFactory', 'CustomerContactsFactory', "$rootScope", '$modal', '$http', function ($scope, $location, $stateParams, CustomerSalesEntryFactory, CustomerContactsFactory, $rootScope, $modal, $http) {
        

      
        $scope.generateCustomerID = function (prospect) {
            if (prospect.Customer_Name != "") {
                $scope.prospect.Customer_ID = prospect.Customer_Name.substring(0, 3)
            }
            if (prospect.PostalCode != "") {
                var item = $scope.prospect.Customer_ID + prospect.PostalCode.substring(0, 3);
                $scope.prospect.Customer_ID = item.toUpperCase();
            }
        }
       
        $scope.showContact = false;
        $scope.prospect = {showContact: false, Country: 'Canada'};
        $scope.contact = {};
        
        $scope.addProspect = function (prospect) {
            var modal_size = '500';
            if ($scope.myForm.$valid) {
               
                CustomerSalesEntryFactory.create($scope.prospect, function () {
                
                    $scope.showContact = true;
                    $scope.prospect.showContact = true;
                    $scope.contact.Customer_ID = $scope.prospect.Customer_ID;

          
                }, function () {
            
                    $rootScope.currentModal = $modal.open({
                        templateUrl: "FailureModal",
                        size: modal_size,
                        backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
                    });
                  
                });
                

            }
        };
        $scope.addContact = function (contact) {
            var modal_size = 500;
            if ($scope.contactForm.$valid) {

                var massagedata = {
                    "Customer_ID": $scope.contact.Customer_ID,
                    "Name": $scope.contact.Name,
                    "Title": $scope.contact.Title != "" && $scope.contact.Title != undefined ? $scope.contact.Title : "",
                    "Email": $scope.contact.Email != "" && $scope.contact.Email != undefined ? $scope.contact.Email : "",
                    "Fax": $scope.contact.Fax != "" && $scope.contact.Fax != undefined ? $scope.contact.Fax : "",
                    "Notes": "",
                    "Pager": $scope.contact.Pager != "" && $scope.contact.Pager != undefined ? $scope.contact.Pager : "",
                    "Phone": $scope.contact.Phone != "" && $scope.contact.Phone != undefined ? $scope.contact.Phone : "",
                    "Web_Language": "",
                    "Web_Login": "",
                    "Web_Password": "",
                    "Created": new Date(),
                    "Last_Activity": new Date()
               

                };
                
            
               CustomerContactsFactory.create(massagedata, function () {
                    $rootScope.currentModal = $modal.open({
                        templateUrl: "SuccessModal",
                        size: modal_size,
                        backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
                    });

                }, function () {
                    $rootScope.currentModal = $modal.open({
                        templateUrl: "FailureModal",
                        size: modal_size,
                        backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
                    });
                });
            
            }

        }


        $scope.professions = [
            {
                Profession_ID: "AOQ",
                Profession_Name: "Former AOO Member"
            },
            {
                Profession_ID: "BUY",
                Profession_Name: "Buying Group"
            },
            {
                Profession_ID: "DUP",
                Profession_Name: "Duplicate Account"
            },
            {
                Profession_ID: "EDG",
                Profession_Name: "Edging Lab"
            },
            {
                Profession_ID: "GEN",
                Profession_Name: "General Public Non-Dispensing"
            },
            {
                Profession_ID: "INT",
                Profession_Name: "Internal Account Non-Dispensing"
            },
            {
                Profession_ID: "MD",
                Profession_Name: "Medical Doctor Dispensing"
            },
            {
                Profession_ID: "MDN",
                Profession_Name: "MD Non-Dispensing"
            },
            {
                Profession_ID: "N",
                Profession_Name: "Business Closed"
            },
             {
                 Profession_ID: "N/A",
                 Profession_Name: "Unknown - Dispensing"
             },
                {
                    Profession_ID: "OD",
                    Profession_Name: "Ophthalmology Dispenser"
                },
                {
                    Profession_ID: "OOD",
                    Profession_Name: "Opthalmology Doctor"
                },
                {
                    Profession_ID: "OODN",
                    Profession_Name: "Opthalmologist Non-Dispensing"
                },
                {
                    Profession_ID: "OP",
                    Profession_Name: "Optician"
                },
                {
                    Profession_ID: "STU",
                    Profession_Name: "Student Non-Dispensing"
                },
                {
                    Profession_ID: "SUP",
                    Profession_Name: "Supplier Non-Dispensing"
                },
                {
                    Profession_ID: "TEST",
                    Profession_Name: "Test Account"
                },
                {
                    Profession_ID: "WEB",
                    Profession_Name: "Internet Provider"
                }];


        $scope.provinces = [{
            id: "AB",
            province: "Alberta"
        }, {
            id: "BC",
            province: "British Columbia"
        }, {
            id: "MB",
            province: "Manitoba"
        }, {
            id: "NB",
            province: "New Brunswick"
        }, {
            id: "NL",
            province: "Newfoundland"
        },{
                id: "NS",
                province: "Nova Scotia"
        }, {
            id: "NT",
            province: "North West Territories"

            },{
                id: "ON",
                province: "Ontario"
            },{
                id: "PEI",
                province: "Prince Edward Island"

            }, {
                id: "QC",
                province: "Quebec"
            },
            {
                id: "SK",
                province: "Saskatchewan"
            },
            {
                id: "YT",
                province: "Yukon"
            }




        ];
    
    
    }])

   .controller('CustomersController', ['$scope', '$location', 'SchedulerFactory','CustomerOrderReturnsFactory','CustomersFactory', 'CustomerInfoFactory', 'CustomerContactsFactory',
       'CustomerPricingFactory', 'CustomerTopTenItemsFactory', 'NotesFactory', 'CustomerGlobalFactory', '$filter', "$rootScope", '$stateParams', '$modal', '$http', '$timeout', 
       function ($scope, $location, SchedulerFactory, CustomerOrderReturnsFactory, CustomersFactory, CustomerInfoFactory, CustomerContactsFactory, CustomerPricingFactory,
           CustomerTopTenItemsFactory, NotesFactory, CustomerGlobalFactory, $filter, $rootScope, $stateParams, $modal, $http, $timeout) {

       /*
       
       angular.forEach(arraynamehere, function (value, key) {
           //spit out the key value pairs here.

       })
       **/
       function formatCurrency(value) {
           return '$' + value.toFixed(2);
       }

       $scope.config = {
           itemsPerPage: 15,
           maxPages: 10,
           fillLastPage: "no",
           sortContext: "global"
       };
    

          // $scope.customers = CustomersFactory.query();
       $scope.customers = $rootScope.customers;
       $scope.filteredList = $rootScope.customers;
      
     
       $scope.updateFilteredList = function () {
           $scope.GotNotes = {};
           $scope.showNotes = false;
           $scope.filteredList = $filter("filter")($scope.customers, $scope.query);

           /*var CustomerID = $scope.filteredList[0].Customer_ID;
           if (CustomerID != null) {
               $scope.filteredNotes = NotesFactory.query({ id: CustomerID });
           }
           */
       };


       $scope.contact = {};
       $scope.modalInstance = {};
       $scope.addContact = function () {
           modal_size = 'sm';

           $scope.modalInstance = $modal.open({
               templateUrl: "ContactAddModal",
               size: modal_size,
               animation: false,
               scope: $scope,
               resolve: {
                   customercontact: function () {
                       return $scope.customercontact;
                   }
               },
               backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
           });
           $scope.cancel = function () {
               $scope.modalInstance.cancel();
           }

           $scope.submitContact = function (contactForm) {

               var modal_size = 'sm';
                 
               if (contactForm.$valid) {

                   var massagedata = {
                       "Customer_ID": $scope.CustomerID,
                       "Name": contactForm.Name,
                       "Title":contactForm.Title != "" && contactForm.Title != undefined ? contactForm.Title : "",
                       "Email":contactForm.Email != "" && contactForm.Email != undefined ? contactForm.Email : "",
                       "Fax": contactForm.Fax != "" && contactForm.Fax != undefined ? contactForm.Fax : "",
                       "Notes": "",
                       "Pager": contactForm.Pager != "" && contactForm.Pager != undefined ? contactForm.Pager : "",
                       "Phone": contactForm.Phone != "" && contactForm.Phone != undefined ? contactForm.Phone : "",
                       "Web_Language": "",
                       "Web_Login": "",
                       "Web_Password": "",
                       "Last_Activity": new Date(),
                       "Created": new Date()

                   };
                   
                   CustomerContactsFactory.create(massagedata, function () {
                      // angular.element('.message-entry').html("Record added.");
                       //refresh the elements.
                       var customercontacts = CustomerContactsFactory.query({ id: $scope.CustomerID }, function () {
                           if (customercontacts != null) {
                               $scope.customercontacts = customercontacts;
                               $scope.modalInstance.close();
                           };
                       });
                       
                   }, function () {
                       angular.element('.message-entry').html('Record was not added; something went wrong.  Duplicate, or error.');
                   });
                   

               }

           }

       };

  
     
    
       $scope.followUp = function () {

           //check for existence.
         
                //When you click, save this item to the database.
                var itemsaved = SchedulerFactory.schedulers.create({
                    "UserID": $scope.SID,
                    "Customer_ID": $scope.CustomerID,
                    "Customer_Name": $scope.customer.Customer_Name
                });
                $scope.calendarItemExists = true;
                            
       };


       $scope.addItem = function (item) {
           //to add an item, popup a modal for the user to enter a new record.
         item.open = true;
         var modal_size = 800;
         $rootScope.currentModal = $modal.open({
                   templateUrl: "AddItemModal",
                   size: modal_size,
                   backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
          });            
       }

       //Indicates a row click.
       $scope.setNotes = function (item) {
               //First clear out any existing results.
            $scope.GotNotes = {};
            $scope.selectedId = "";
            $scope.CustomerID = item.Customer_ID;
            var CustomerID = item.Customer_ID;
               if (CustomerID != null) {
                   $scope.GotNotes = NotesFactory.query({ id: CustomerID });
                   $scope.showNotes = true;
                   
                   $scope.selectedId = CustomerID;
                   $scope.notes.Date = item.Date;
                  
               }
            //on row click, highlight the row.
       }
      
       var modal_size = 400;
       $scope.customer = {};
       $scope.TheNotes = {};
       $scope.customercontacts = {};
       $scope.SearchBy = "CustomerID"; // Default search.
       $scope.showCustomerID = false;
       $scope.userid = $rootScope.SID;
       
       var date = new Date();
       $scope.now = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
       $scope.Date = $scope.now; // Default date is now.

       $scope.initNotes = function () {

           if ($scope.customer.Customer_ID != "") {
               var notes = NotesFactory.query({ id: $scope.customer.Customer_ID }, function () {
                   if (notes != null) {
                       $scope.TheNotes = notes;
                       
                   }
               })
           }
       }

       $scope.editItem = function (note) {
           note.editing = true;
       }
           
       $scope.doneEditing = function (note) {
           note.editing = false;
           NotesFactory.update({ id: note.Id }, {
               "ID": note.Id,
               "Customer_ID": $scope.Customer_ID,
               "Date": $filter('date')(note.Date, "MM/dd/yyyy HH:mm:ss"),
               "User_ID": $scope.userid,
               "Category": note.Category,
               "Note1": note.Note,
               "km": note.km
           }
       );        

       };
     
       $scope.newnote = {"Note1":"","Category": "Visit","Date":$scope.now,"km":"0"};

       $scope.submitNote = function (newnote) {


           if (newnote.Note1 != null) {

               if (newnote.km == null)
                   newnote.km = 0;
               newnote.User_ID = $scope.userid;
               newnote.Customer_ID = $scope.CustomerID;

               if (newnote.Customer_ID == null) {

                   newnote.Customer_ID = $scope.customer.Customer_ID
               }

               NotesFactory.create(newnote, function () {
                   newnote.Note1 = ""; //reset defaults.
                   newnote.km = "0"; //Reset defaults.
                   $scope.initNotes();
                   $rootScope.currentModal = $modal.open({
                       templateUrl: "SuccessModal",
                       size: modal_size,
                       backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop


                   });
                   $scope.showNotes = false;
               });
           } else {
               var modal_size = 400;
               $rootScope.currentModal = $modal.open({
                   templateUrl: "FailureModal",
                   size: modal_size,
                   backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
               });
           }


       };


    

       $scope.setDatePrevious = function () {
           var thisdate = new Date($scope.newnote.Date);
           var previous = new Date();
           $scope.newnote.Date = new Date(date.getFullYear(), date.getMonth(), thisdate.getDate() - 1, 0, 0, 0, 0);

       };

      
       $scope.setDateNow = function () {
           $scope.newnote.Date = $scope.now;

       };

       $scope.RadioChange = function (s) {
           $scope.SearchBy = s;
       };



       $rootScope.toggleYear = function () {
           $rootScope.viewingMonths = $rootScope.viewingYear == date.getFullYear() ? $rootScope.chartdata_prior.length - 1 : $rootScope.chartdata_current.length - 1;
           $rootScope.viewingYear = $rootScope.viewingYear == date.getFullYear() ? date.getFullYear() - 1 : date.getFullYear();
           //Whenever we do toggle, we will default the view to 1 up.
           $rootScope.currentIndex = 0;     // reset the index
           $rootScope.displayvalue = '1'; // reset to display only 1 at a time.
           $rootScope.currentRange = 1;     //range is one.
          
       };
       
       $rootScope.toggle4Up = function () {
           //First reset currentIndex to one b3fore performing any adjustments
           $rootScope.currentIndex = 0;
           $rootScope.displayvalue = $rootScope.displayvalue == '4' ? '1' : '4';
           $rootScope.currentRange = $rootScope.displayvalue == '4' ? $rootScope.currentIndex + 4 : $rootScope.currentIndex + 1;
          
       }

      


        $rootScope.setCurrentSlideIndex = function (index) {
           $rootScope.direction = (index > $rootScope.currentIndex) ? 'left' : 'right';
           $rootScope.currentIndex = index;
          
       };

       $rootScope.isCurrentSlideIndex = function (index) {
         
           return $rootScope.currentIndex === index;
         
       };
  
     

       $scope.topTenItems = function (selectedId) {


           $rootScope.TopTenItems = CustomerTopTenItemsFactory.show({ "id": selectedId }, function () {

               $timeout(function () {
                   var $ = jQuery;
                   var xenonPalette = ['#68b828', '#7c38bc', '#0e62c7', '#fcd036', '#4fcdfc', '#00b19d', '#ff6b6b','#6e6eff','#63d6ff', '#f76fff'];
                   var donut_data = [];

                   for (var i = 0; i < $rootScope.TopTenItems.length; i++) {
                       donut_data[i] = {
                           region: $rootScope.TopTenItems[i].Item_Name,
                           val: $rootScope.TopTenItems[i].MonthTotal
                       }
                   }
                   var doughnut2_data_source = donut_data, timer;
                   $("#doughnut-2").dxPieChart({
                       dataSource: doughnut2_data_source,
                       tooltip: {
                           enabled: true,
                           format: "dollars",
                           customizeText: function () {
                               return this.argumentText + "<br/>" + this.valueText;
                           }
                       },
                       size: {
                           height: 330
                       },
                       legend: {
                           visible: true
                       },
                       series: [{
                           type: "doughnut",
                           argumentField: "region"
                       }],
                       palette: xenonPalette
                   });


               });

               var modal_size = "1000";
               $rootScope.currentModal = $modal.open({
                   templateUrl: "CustomerTopTen",
                   size: modal_size,
                   backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop,
                   resolve: {
                       modal_items: function () {
                           return $rootScope.TopTenItems;
                       }
                   }
               });
           });

       }

       $scope.specialPricing = function (selectedId) {
           $rootScope.SpecialPricing = CustomerPricingFactory.show({ "id": selectedId }, function () {
               var modal_size = "1000";
               $rootScope.currentModal = $modal.open({
                   templateUrl: "CustomerPricing",
                   size: modal_size,
                   backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop,
                   resolve: {
                       modal_items: function () {
                           return $rootScope.SpecialPricing;
                       }
                   }
               });
           });

       }

       $scope.salesDataFull = function (selectedId) {
          
           var date = new Date();
           var opened = "show";
           var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
           var isLeapYear = (date.getFullYear() / 4).toString().indexOf(".") <= 0 ? true : false; //the year can be evenly divided by 4
           var feb = isLeapYear ? "28" : "29"; // If its a leapyear, number of days changes.
           var numDays = ["31", feb, "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

           $scope.currentMonth = months[date.getMonth()] + " " + date.getFullYear();
           var StartDate = "01." + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "." + date.getFullYear();
          //var EndDate = numDays[date.getMonth()] + "." + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "." + date.getFullYear();
           var EndDate = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "." + numDays[date.getMonth()] + "." + date.getFullYear();
           $scope.currentYear = date.getFullYear();
           $scope.previousYear = (date.getFullYear() - 1);
         
        
           //Grab more data than just "this" month. overwrite the start date.
           var startYear = date.getMonth() - 11 < 0 ? date.getFullYear() - 1 : date.getFullYear();
           var startMonth = date.getMonth() - 11 < 0 ? 12 + (date.getMonth() - 11) +1: date.getMonth() + 1;

         //var StartDate = "01." + (startMonth < 10 ? "0" + startMonth : startMonth) + "." + startYear;
          var StartDate = (startMonth < 10 ? "0" + startMonth : startMonth) + "." + "01." + startYear;
      
           function calcTotal(data) {
               var total = 0;
         
               for (var i = 0; i < data.length; i++) {
                   total = total + data[i].MonthTotal;
               }
               return total;
           }

           $rootScope.salesItems = CustomerInfoFactory.show({ "id": selectedId, "Startdate": StartDate, "Enddate": EndDate }, function () {

               var modal_size = "1000";
               $rootScope.currentModal = $modal.open({
                   templateUrl: "CustomerSalesFull",
                   size: modal_size,
                   backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop,
                   resolve: {
                       chartitems: function () {

                           return $rootScope.salesItems;
                       },
                   }
               });
           });


       }

       $scope.salesSnapshot = function (selectedId) {

          
           var date = new Date();
           var opened = "show";
           var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
           var isLeapYear = (date.getFullYear() / 4).toString().indexOf(".") <= 0 ? true : false; //the year can be evenly divided by 4
           var feb = isLeapYear ? "28" : "29"; // If its a leapyear, number of days changes.
           var numDays = ["31", feb, "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
        
           $scope.currentMonth = months[date.getMonth()] + " " + date.getFullYear();
         //  var StartDate = "01." + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "." + date.getFullYear();
           //var EndDate = numDays[date.getMonth()] + "." + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "." + date.getFullYear();

           var EndDate = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "." + numDays[date.getMonth()] + "." + date.getFullYear();

           $scope.currentYear = date.getFullYear();
           $scope.previousYear = (date.getFullYear() - 1);
         
        
           //Grab more data than just "this" month. overwrite the start date.
           var startYear = date.getMonth() - 11 < 0 ? date.getFullYear() - 1 : date.getFullYear();
           var startMonth = date.getMonth() - 11 < 0 ? 12 + (date.getMonth() - 11) +1: date.getMonth() + 1;

           //var StartDate = "01." + (startMonth < 10 ? "0" + startMonth : startMonth) + "." + startYear;
           var StartDate = (startMonth < 10 ? "0" + startMonth : startMonth) + "." + "01." + startYear;

           function returnCurrentYear(year){
               return year.YearDate == date.getFullYear();
           }
           function returnPriorYear(year) {
               return year.YearDate == date.getFullYear() - 1;
           }

         
           function filterYearItems(filters, year) {
               return year.filter(function (val) {
                   for (var i = 0; i < filters.length; i++)
                       if (val[[filters[i][0]]] != filters[i][1]) {
                           return false;
                       } else {
                           return true;
                       }
                  
               }
               );
           }
      
           function calcTotal(data) {
               var total = 0;
         
               for (var i = 0; i < data.length; i++) {
                   total = total + data[i].MonthTotal;
               }
               return total;
           }

        

         
         $rootScope.chartdata_current = [];
         $rootScope.chartdata_prior = [];
               

      
           var items = CustomerInfoFactory.show({ "id": selectedId, "Startdate": StartDate, "Enddate": EndDate }, function () {

               if (items.length > 0) {
                   // set the button as current year....
                   //Split the two years;
                    var year_current = items.filter(returnCurrentYear);
                    var year_prior = items.filter(returnPriorYear);

                    for (var i = 0; i < 12; i++) {
                        var filters = [["MoDate", i + 1]];
                        var data1 = filterYearItems(filters, year_current);
                        if (data1.length > 0) {
                            var newObj1 = new Object();
                            newObj1.DateTitle = months[i] + " - " + date.getFullYear();
                            newObj1.DateData = data1;
                            newObj1.DateTotal = calcTotal(data1);                            
                            $rootScope.chartdata_current.push(newObj1);
                        }

                    }
                    for (var x = 0; x < 12; x++) {
                        var filters = [["MoDate", x + 1]];
                        var data2 = filterYearItems(filters, year_prior);
                        if (data2.length > 0) {
                            var newObj2 = new Object();
                            newObj2.DateTitle = months[x] + " - " + (date.getFullYear()-1);
                            newObj2.DateData = data2;
                            newObj2.DateTotal = calcTotal(data2);
                            $rootScope.chartdata_prior.push(newObj2);
                        }

                    }
                   $rootScope.setCurrentSlideIndex(0); // default.
                   $rootScope.viewingYear = date.getFullYear(); //default.
                   $rootScope.displayvalue = '1';
                   $rootScope.currentRange = 1;
                   $rootScope.viewingMonths = $rootScope.chartdata_current.length - 1; // default... this year! thanks very much.

                   if (items.length > 0) {
                       //THIS REPRESENTS THE ENTIRE 12 MONTHS.
                       $timeout(function () {
                           var $ = jQuery;
                           var xenonPalette = ['#68b828', '#7c38bc', '#0e62c7', '#fcd036', '#4fcdfc', '#00b19d', '#ff6b6b', '#6e6eff', '#63d6ff', '#f76fff'];
                           var donut_data = [];

                           for (var i = 0; i < items.length; i++) {
                               donut_data[i] = {
                                   region: items[i].Product_Type_Name,
                                   val: items[i].MonthTotal
                               }
                           }
                           var doughnut1_data_source = donut_data, timer;
                           $("#doughnut-1").dxPieChart({
                               dataSource: doughnut1_data_source,
                               tooltip: {
                                   enabled: true,
                                   format: "dollars",
                                   customizeText: function () {
                                       return this.argumentText + "<br/>" + this.valueText;
                                   }
                               },
                               size: {
                                   height: 530
                               },
                               legend: {
                                   visible: true
                               },
                               series: [{
                                   type: "doughnut",
                                   argumentField: "region"
                               }],
                               palette: xenonPalette
                           });


                       });
                   }
               }

                var modal_size = "1000";
                $rootScope.currentModal = $modal.open({
                    templateUrl: "CustomerSales",
                    size: modal_size,
                    backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop,
                    resolve: {
                        title_current: function () {
                            return "2016";
                        },
                        chartdata_current: function () {
                            return $rootScope.chartdata_current; // Assign.
                        },
                        chartdata_prior: function(){
                            return $rootScope.chartdata_prior;
                        },
                        isCurrentSlideIndex: function(){
                            return $rootScope.currentIndex;                            
                        },
                        currentIndex: function(){
                            return $rootScope.currentIndex;
                        }
                    }
                });


           });
         
        
       }
     
       $scope.CustomerID = "";
       $scope.submitQuery = function (item) {

           //Animate the customer section out!.
           $scope.showCustomerID = false;
         

           if ($scope.SearchBy == "CustomerID") {
             
               if (item.customerid != "" && item.customerid != undefined) {
                   var customer = CustomersFactory.show({ id: item.customerid, SearchBy: "CustomerID" }, function () {
                       if (customer[0] != null) {
                           $scope.customer = customer[0];
                            
                           var notes = NotesFactory.query({ id: $scope.customer.Customer_ID }, function () {
                               if (notes != null) {
                                   $scope.TheNotes = notes;
                                   //animate the customer section in.
                                   $scope.showCustomerID = true;
                                   $scope.CustomerID = $scope.customer.Customer_ID
                                   //check if the item exists.

                               }
                           });
                           var customercontacts = CustomerContactsFactory.query({ id: $scope.customer.Customer_ID }, function () {
                               if (customercontacts != null) {
                                   $scope.customercontacts = customercontacts;
                                  
                               };
                           });
                           var items = SchedulerFactory.schedulerexists.show({ "id": $scope.customer.Customer_ID }, function () {
                               $scope.calendarItemExists = items.length > 0 ? true : false;
                           });
                           var orderreturns_3 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 3 }, function () {
                               if (orderreturns_3[0] != null) {
                
                                   $scope.OrderReturns3 = Math.round((orderreturns_3[0].Credits / orderreturns_3[0].TotalLenses)*100);
                               } else {
                                   $scope.OrderReturns3 = 0;
                                   console.log("something went wrong with the order returns information.");
                               }
                           });
                           var orderreturns_6 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 6 }, function () {
                               if (orderreturns_6[0] != null) {

                                   $scope.OrderReturns6 = Math.round((orderreturns_6[0].Credits / orderreturns_6[0].TotalLenses) * 100);
                               } else {
                                   $scope.OrderReturns6 = 0;
                                   console.log("something went wrong with the order returns information.");
                               }
                           });
                           var orderreturns_12 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 12 }, function () {
                               if (orderreturns_12[0] != null) {

                                   $scope.OrderReturns12 = Math.round((orderreturns_12[0].Credits / orderreturns_12[0].TotalLenses) * 100);
                               } else {
                                   $scope.OrderReturns12 = 0;
                                   console.log("something went wrong with the order returns information.");
                               }
                           });
                          
                       } else {
                          
                           $rootScope.currentModal = $modal.open({
                               templateUrl: "Modal",
                               size: modal_size,
                               backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
                           });
                       }
                   })

               }
           }
           if ($scope.SearchBy == "CustomerName") {

               $rootScope.customerlist = []; // Assume empty at start.

               if (item.customerid != "" && item.customerid != undefined) {

                   var customer = CustomersFactory.show({ id: item.customerid, SearchBy: "CustomerName" }, function () {

                       if (customer[0] != null) {
                           $rootScope.customerlist = customer;
                           if (customer.length > 1) {

                             
                             
                               var modal_size = 800;
                               $rootScope.currentModal = $modal.open({
                                   templateUrl: "CustomerSelect",
                                   size: modal_size,
                                   backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop,
                                   resolve: {
                                      
                                       customerlist: function () {
                                          
                                           return $rootScope.customerlist; // Assign.
                                       }
                                   }
                               });
                               $rootScope.selectedCustomer = function (selectedItem) {
                                   $scope.customer = selectedItem;
                                   var notes = NotesFactory.query({ id: $scope.customer.Customer_ID }, function () {
                                       if (notes != null) {
                                           $scope.TheNotes = notes;
                                           //animate the customer section in.
                                           $scope.showCustomerID = true;
                                           $scope.CustomerID = $scope.customer.Customer_ID;
                                           //check if the item exists.
                                         
                                       }
                                   });
                                   var customercontacts = CustomerContactsFactory.query({ id: $scope.customer.Customer_ID }, function () {
                                       if (customercontacts != null) {
                                           $scope.customercontacts = customercontacts;
                                           
                                       };
                                   });
                                   var items = SchedulerFactory.schedulerexists.show({ "id": $scope.customer.Customer_ID }, function () {
                                       $scope.calendarItemExists = items.length > 0 ? true : false;
                                   });

                                   var orderreturns_3 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 3 }, function () {
                                       if (orderreturns_3[0] != null) {

                                           $scope.OrderReturns3 = Math.round((orderreturns_3[0].Credits / orderreturns_3[0].TotalLenses) * 100);
                                       } else {
                                           $scope.OrderReturns3 = 0;
                                           console.log("something went wrong with the order returns information.");
                                       }
                                   });
                                   var orderreturns_6 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 6 }, function () {
                                       if (orderreturns_6[0] != null) {

                                           $scope.OrderReturns6 = Math.round((orderreturns_6[0].Credits / orderreturns_6[0].TotalLenses) * 100);
                                       } else {
                                           $scope.OrderReturns6 = 0;
                                           console.log("something went wrong with the order returns information.");
                                       }
                                   });
                                   var orderreturns_12 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 12 }, function () {
                                       if (orderreturns_12[0] != null) {

                                           $scope.OrderReturns12 = Math.round((orderreturns_12[0].Credits / orderreturns_12[0].TotalLenses) * 100);
                                       } else {
                                           $scope.OrderReturns12 = 0;
                                           console.log("something went wrong with the order returns information.");
                                       }
                                   });

                               };
                            
                             

                           } else {
                               //Present user with a choice and have them select.
                               $scope.customer = customer[0];
                               var notes = NotesFactory.query({ id: $scope.customer.Customer_ID }, function () {
                                   if (notes != null) {
                                       $scope.TheNotes = notes;
                                       //animate the customer section in.
                                       $scope.showCustomerID = true;
                                       $scope.CustomerID = $scope.customer.Customer_ID
                                       //check if the item exists.
                                    
                                   }
                               });
                               var customercontacts = CustomerContactsFactory.query({ id: $scope.customer.Customer_ID }, function () {
                                   if (customercontacts != null) {
                                       $scope.customercontacts = customercontacts;
                                       
                                   };
                               });
                               var items = SchedulerFactory.schedulerexists.show({ "id": $scope.customer.Customer_ID }, function () {
                                   $scope.calendarItemExists = items.length > 0 ? true : false;
                               });

                               var orderreturns_3 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 3 }, function () {
                                   if (orderreturns_3[0] != null) {

                                       $scope.OrderReturns3 = Math.round((orderreturns_3[0].Credits / orderreturns_3[0].TotalLenses) * 100);
                                   } else {
                                       $scope.OrderReturns3 = 0;
                                       console.log("something went wrong with the order returns information.");
                                   }
                               });
                               var orderreturns_6 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 6 }, function () {
                                   if (orderreturns_6[0] != null) {

                                       $scope.OrderReturns6 = Math.round((orderreturns_6[0].Credits / orderreturns_6[0].TotalLenses) * 100);
                                   } else {
                                       $scope.OrderReturns6 = 0;
                                       console.log("something went wrong with the order returns information.");
                                   }
                               });
                               var orderreturns_12 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 12 }, function () {
                                   if (orderreturns_12[0] != null) {

                                       $scope.OrderReturns12 = Math.round((orderreturns_12[0].Credits / orderreturns_12[0].TotalLenses) * 100);
                                   } else {
                                       $scope.OrderReturns12 = 0;
                                       console.log("something went wrong with the order returns information.");
                                   }
                               });
                           }

                       } else {
                           var modal_size = 400;
                           $rootScope.currentModal = $modal.open({
                               templateUrl: "Modal",
                               size: modal_size,
                               backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
                           });
                       }
                   })

               }
           }

           if ($scope.SearchBy == "CustomerPhone") {
               if (item.customerid != "" && item.customerid != undefined) {
                   var customer = CustomersFactory.show({ id: item.customerid, SearchBy: "CustomerPhone" }, function () {
                       if (customer[0] != null) {
                           $scope.customer = customer[0];
                           var notes = NotesFactory.query({ id: $scope.customer.Customer_ID }, function () {
                               if (notes != null) {
                                   $scope.TheNotes = notes;
                                   //animate the customer section in.
                                   $scope.showCustomerID = true;
                                   $scope.CustomerID = $scope.customer.Customer_ID;
                                   //check if the item exists.

                               }
                           });
                           var customercontacts = CustomerContactsFactory.query({ id: $scope.customer.Customer_ID }, function () {
                               if (customercontacts != null) {
                                   $scope.customercontacts = customercontacts;
                                   
                               };
                           });
                           var items = SchedulerFactory.schedulerexists.show({ "id": $scope.customer.Customer_ID }, function () {
                               $scope.calendarItemExists = items.length > 0 ? true : false;
                           });
                           var orderreturns_3 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 3 }, function () {
                               if (orderreturns_3[0] != null) {

                                   $scope.OrderReturns3 = Math.round((orderreturns_3[0].Credits / orderreturns_3[0].TotalLenses) * 100);
                               } else {
                                   console.log("something went wrong with the order returns information.");
                               }
                           });
                           var orderreturns_6 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 6 }, function () {
                               if (orderreturns_6[0] != null) {

                                   $scope.OrderReturns6 = Math.round((orderreturns_6[0].Credits / orderreturns_6[0].TotalLenses) * 100);
                               } else {
                                   console.log("something went wrong with the order returns information.");
                               }
                           });
                           var orderreturns_12 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 12 }, function () {
                               if (orderreturns_12[0] != null) {

                                   $scope.OrderReturns12 = Math.round((orderreturns_12[0].Credits / orderreturns_12[0].TotalLenses) * 100);
                               } else {
                                   console.log("something went wrong with the order returns information.");
                               }
                           });

                       } else {
                           var modal_size = 400;
                           $rootScope.currentModal = $modal.open({
                               templateUrl: "Modal",
                               size: modal_size,
                               backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
                           });
                       }
                   })

               }
           }
           if ($scope.SearchBy == "CustomerGlobal") {

               $rootScope.customerlist = []; // Assume empty at start.

               if (item.customerid != "" && item.customerid != undefined) {

                   var customer = CustomerGlobalFactory.query({ id: item.customerid}, function () {

                       if (customer[0] != null) {
                           $rootScope.customerlist = customer;
                           if (customer.length > 1) {



                               var modal_size = 800;
                               $rootScope.currentModal = $modal.open({
                                   templateUrl: "CustomerSelect",
                                   size: modal_size,
                                   backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop,
                                   resolve: {

                                       customerlist: function () {

                                           return $rootScope.customerlist; // Assign.
                                       }
                                   }
                               });
                               $rootScope.selectedCustomer = function (selectedItem) {
                                   $scope.customer = selectedItem;
                                   var notes = NotesFactory.query({ id: $scope.customer.Customer_ID }, function () {
                                       if (notes != null) {
                                           $scope.TheNotes = notes;
                                           //animate the customer section in.
                                           $scope.showCustomerID = true;
                                           $scope.CustomerID = $scope.customer.Customer_ID;
                                           //check if the item exists.

                                       }
                                   });
                                   var customercontacts = CustomerContactsFactory.query({ id: $scope.customer.Customer_ID }, function () {
                                       if (customercontacts != null) {
                                           $scope.customercontacts = customercontacts;

                                       };
                                   });
                                   var items = SchedulerFactory.schedulerexists.show({ "id": $scope.customer.Customer_ID }, function () {
                                       $scope.calendarItemExists = items.length > 0 ? true : false;
                                   });

                                   var orderreturns_3 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 3 }, function () {
                                       if (orderreturns_3[0] != null) {

                                           $scope.OrderReturns3 = Math.round((orderreturns_3[0].Credits / orderreturns_3[0].TotalLenses) * 100);
                                       } else {
                                           $scope.OrderReturns3 = 0;
                                           console.log("something went wrong with the order returns information.");
                                       }
                                   });
                                   var orderreturns_6 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 6 }, function () {
                                       if (orderreturns_6[0] != null) {

                                           $scope.OrderReturns6 = Math.round((orderreturns_6[0].Credits / orderreturns_6[0].TotalLenses) * 100);
                                       } else {
                                           $scope.OrderReturns6 = 0;
                                           console.log("something went wrong with the order returns information.");
                                       }
                                   });
                                   var orderreturns_12 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 12 }, function () {
                                       if (orderreturns_12[0] != null) {

                                           $scope.OrderReturns12 = Math.round((orderreturns_12[0].Credits / orderreturns_12[0].TotalLenses) * 100);
                                       } else {
                                           $scope.OrderReturns12 = 0;
                                           console.log("something went wrong with the order returns information.");
                                       }
                                   });

                               };



                           } else {
                               //Present user with a choice and have them select.
                               $scope.customer = customer[0];
                               var notes = NotesFactory.query({ id: $scope.customer.Customer_ID }, function () {
                                   if (notes != null) {
                                       $scope.TheNotes = notes;
                                       //animate the customer section in.
                                       $scope.showCustomerID = true;
                                       $scope.CustomerID = $scope.customer.Customer_ID
                                       //check if the item exists.

                                   }
                               });
                               var customercontacts = CustomerContactsFactory.query({ id: $scope.customer.Customer_ID }, function () {
                                   if (customercontacts != null) {
                                       $scope.customercontacts = customercontacts;

                                   };
                               });
                               var items = SchedulerFactory.schedulerexists.show({ "id": $scope.customer.Customer_ID }, function () {
                                   $scope.calendarItemExists = items.length > 0 ? true : false;
                               });

                               var orderreturns_3 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 3 }, function () {
                                   if (orderreturns_3[0] != null) {

                                       $scope.OrderReturns3 = Math.round((orderreturns_3[0].Credits / orderreturns_3[0].TotalLenses) * 100);
                                   } else {
                                       $scope.OrderReturns3 = 0;
                                       console.log("something went wrong with the order returns information.");
                                   }
                               });
                               var orderreturns_6 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 6 }, function () {
                                   if (orderreturns_6[0] != null) {

                                       $scope.OrderReturns6 = Math.round((orderreturns_6[0].Credits / orderreturns_6[0].TotalLenses) * 100);
                                   } else {
                                       $scope.OrderReturns6 = 0;
                                       console.log("something went wrong with the order returns information.");
                                   }
                               });
                               var orderreturns_12 = CustomerOrderReturnsFactory.show({ id: $scope.customer.Customer_ID, Term: 12 }, function () {
                                   if (orderreturns_12[0] != null) {

                                       $scope.OrderReturns12 = Math.round((orderreturns_12[0].Credits / orderreturns_12[0].TotalLenses) * 100);
                                   } else {
                                       $scope.OrderReturns12 = 0;
                                       console.log("something went wrong with the order returns information.");
                                   }
                               });
                           }

                       } else {
                           var modal_size = 400;
                           $rootScope.currentModal = $modal.open({
                               templateUrl: "Modal",
                               size: modal_size,
                               backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
                           });
                       }
                   })

               }
           }

        };

       
     

   }])
     // Path : /RetailReviews
    .controller('ReturnsController', ['$scope', '$location', 'InvoicesFactory', '$filter', "$rootScope", '$stateParams', '$modal', '$http', function ($scope, $location, InvoicesFactory, $filter, $rootScope, $stateParams, $modal, $http) {


        
        $scope.$root.title = "Retail Management Studio for Lens.care";
        $scope.Greeting = "Retail Manager :";
        $scope.editingData = [];       
        $scope.RefundAmt = 0;

        $scope.clearFilter = function () {
            $scope.query = {};
        };

        $scope.config = {
            itemsPerPage: 6,
            maxPages: 10,
            fillLastPage: "yes",
            sortContext: "global"
        };

       

        
       
        $scope.returns = InvoicesFactory.query();
        $scope.filteredList = $scope.returns;
                

        $scope.updateFilteredList = function () {
            $scope.filteredList = $filter("filter")($scope.returns, $scope.query);


        };
        $scope.editQty = function (item) {
            item.editing = true;
         
           
        }
        $scope.doneEditing = function (item) {
            item.editing = false;
        }

        $scope.setRefundAmt = function () {
            
            $scope.RefundAmt = this.refundamt;          
            $scope.InvoiceNo = this.item.Invoice_Number;
        }

        
        //On Double Click, Activate the Amt Input
        $scope.refundItem = function (item) {
            item.editing = true;
        }


        $scope.refundme = function (orderid) {
            //Ajax call the api to refund the amount.
            //we'll build the rma part later.
            var Amount = $scope.RefundAmt;           
           
            $http.get("https://www.lens.care/PGatewayService.svc/Refund/"+$scope.InvoiceNo+"/04/" + Amount).
              success(function (data, status, headers, config) {
                  alert(status);
              }).
              error(function (data, status, headers, config) {
                  alert("An error occured.");
              });

        }
    
    

    }])

      // Path : /RetailReviews
    .controller('InvoicesController', ['$scope', '$location', 'InvoicesFactory', '$filter', "$rootScope", '$stateParams', '$modal', '$http', function ($scope, $location, InvoicesFactory, $filter, $rootScope,$stateParams, $modal, $http) {



     

        // Loading AJAX Content
        $scope.openAjaxModal = function (modal_id, url_location) {
            $rootScope.currentModal = $modal.open({
                templateUrl: modal_id,
                resolve: {
                    ajaxContent: function ($http) {
                        return $http.get(url_location).then(function (response) {
                            $rootScope.modalContent = $sce.trustAsHtml(response.data);
                        }, function (response) {
                            $rootScope.modalContent = $sce.trustAsHtml('<div class="label label-danger">Cannot load ajax content! Please check the given url.</div>');
                        });
                    }
                }
            });

            $rootScope.modalContent = $sce.trustAsHtml('Modal content is loading...');
        }
      

        $scope.$root.title = "Optik K&R Data Management Studio";
        $scope.Greeting = "Retail Manager :";
        $scope.editingData = [];

        $scope.clearFilter = function () {
            $scope.query = {};
        };
       
        $scope.editItem = function (item) {
            item.editing = true;
        }

        $scope.editInvoice = function (InvoiceNo) {
            $rootScope.layoutOptions.isCreate = false;
            $location.path('/invoice/show/' + InvoiceNo);
        };

        $rootScope.openPDF = function (fileUrl) {
          
            window.open(fileUrl, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
            
            // window.open("http://192.168.1.4:8888/Retail/Prescriptions/"+item.File_Name, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes");
        }
       
        $rootScope.print = function (InvoiceNo) {
            //Generate the invoice, then open.
            $http.get("https://lens.care/ViewPDFService.svc/GeneratePDF/" + InvoiceNo).
              success(function (data, status, headers, config) {                 
                  window.open("http://192.168.1.4:8888/Invoices/Invoice-" + InvoiceNo + ".pdf", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes");
              }).
              error(function (data, status, headers, config) {
                  alert("An error occured.");
              });
           
           
        }
               
      


        $scope.openPrescription = function (item) {
            item.open = true;
            var modal_size = 800;
           
            if (item.Doctor_Name != "") {
                $rootScope.IsDoctor = true;
                $rootScope.DoctorPhone = item.Doctor_Phone;
                $rootScope.DoctorName = item.Doctor_Name;
            }

            if (item.File_Name != ""){
                $rootScope.IsFile = true;
                $rootScope.FileName = item.File_Path + item.File_Name;
                
               // window.open("http://192.168.1.4:8888/Retail/Prescriptions/"+item.File_Name, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes");
            }

            //An invoice number contains ALL the orders (items)... Display in overlay.           
            $rootScope.invoiceitems = $filter("filter")($scope.invoices, {"Invoice_Number": item.Invoice_Number});            
            //Open a window and display the Prescription Info...
            $rootScope.currentModal = $modal.open({
                templateUrl: "Prescription-Modal",
                size: modal_size,
                backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
            });            
        }

        $scope.donePrescription = function (item) {
            item.open = false;
        }

        $scope.doneEditing = function (item) {
            item.editing = false;            
            InvoicesFactory.update({ id: item.Invoice_Number }, { 
               "Invoice_Number": item.Invoice_Number,
               "Date": $filter('date')(item.InvoiceDate, "MM/dd/yyyy HH:mm:ss Z"),
               "Patient_ID" : item.Patient_ID,
               "Amount": item.Amount,
               "Link" : item.Link,
               "First_Name": item.First_Name,
               "Last_Name": item.Last_Name,
               "Appt_Street_Number": item.Appt_Street_Number,
               "Street_Name": item.Street_Name,
               "City": item.City,
               "Province": item.Province,
                "Country_Code" : item.Country_Code,
                "Postal_Code": item.Postal_Code,
                "Shipping_Courier": item.Shipping_Courier,
                "Store_for_Future_User": item.Store_for_Future_User,
                "Tracking_Number": item.Tracking_Number,
                "Payment_ID": item.Payment_ID,
                "Email_Address": item.Email_Address,
                "Phone": item.Phone,
                "DiscountType": 0,
                "DiscountValue": 0,
                "Customer_ID" : ""
                }
            );
      
            //If the Tracking number .. send email. (don't forget to add a status cod ein here, so we don't send repeatedly.)
            if (item.Tracking_Number != "") {
             
                $http.get("https://lens.care/ViewPDFService.svc/EmailShipping/"+item.Tracking_Number +"/"+item.Email_Address+"/"+item.First_Name+"/"+item.Last_Name).
                    success(function (data, status, headers, config) {
                        alert("An email has been sent to the client updating their shipping details.");
                    }).error(function (data, status, headers, config) {
                        alert("An error occured.");
                    });
            }
            
        };
 
        $scope.config = {
            itemsPerPage: 6,
            maxPages: 10,
            fillLastPage: "yes",
            sortContext: "global"
        };


   
     
        $scope.invoices = InvoicesFactory.query();
        $scope.filteredList = $scope.invoices;
     
        $scope.updateFilteredList = function () {           
            $scope.filteredList = $filter("filter")($scope.invoices, $scope.query);
         
           
        };

       
    }])

    .controller('ReviewDetailCtrl', ['$stateParams','$scope', 'ReviewsFactory', '$location', '$rootScope',function ($stateParams,$scope, ReviewsFactory, $location,$rootScope) {
           
            
            if ($stateParams.id!='')
                $scope.review = ReviewsFactory.show({ id: $stateParams.id });

            $scope.updateReview = function () {                
                ReviewsFactory.update({ id:$stateParams.id }, $scope.review);                
             
                $scope.reviews = ReviewsFactory.query();
                $location.path('/reviews');
            };        
            $scope.cancel = function () {              
            
                $location.path('/reviews');
            };       
            // callback for ng-click 'createNewUser':
            $scope.createNewReview = function () {
                ReviewsFactory.create($scope.review);
              
               
                $location.path('/reviews');
                $scope.reviews = ReviewsFactory.query();
                $scope.filteredList = $scope.reviews;
            }
       

    }])
    

   
    .controller('CredController', ['$scope', '$location', '$window', 'AuthenticationService', 'CustomersFactory', 'CustomersNonFactory', '$cookies', '$rootScope', function ($scope, $location, $window,AuthenticationService, CustomersFactory, CustomersNonFactory, $cookies, $rootScope) {

    

        AuthenticationService.ClearCredentials();


        $scope.login = function () {

            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                
                if(response[0]) {

                    $scope.success = true;
                    $rootScope.userLoggedIn = true;
                    $scope.dataLoading = false;
                    $rootScope.layoutOptions.sidebar.isCollapsed = false;
                    $rootScope.layoutOptions.sidebar.isVisible = true;

                    AuthenticationService.SetCredentials($scope.username, $scope.password, $cookies);
                    
                    if (response[0].RetailAccess === 1) {
                        $rootScope.userLevel1 = true; //Full menu system.                 
                        $rootScope.SID = 1; // All or = to NONE (no salesperson).
                        $location.path("/home");
                    }
                    if (response[0].RetailAccess === 2) {
                        $rootScope.userLevel2 = true;  // CSR Menu System
                        $location.path("/home");
                    }
                    if (response[0].RetailAccess === 3) {
                        $rootScope.userLevel3 = true;                
                        $rootScope.SID = response[0].UID; //Sales Tab
                        //Lets grab the customer Information and load it into a file for later use.
                        //TODO :  CHANGE THIS TO RETURN ONLY THAT CUSTOMERS CUSTOMERIDS AND ANY WITHOUT.                       
                        $location.path("/home");
                        $rootScope.customers = CustomersFactory.query();

                    }
                   
                
                   

                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                    
                }
            });
           
          
        };
        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        };
       
    }]).
   
    controller('GlassesController',['$scope','$rootScope','$menuItems', '$timeout', '$location','$state','$layout', 'ImageFactory',
    function($scope,$rootScope,$menuItems,$timeout,$location,$state,$layout,ImageFactory)
    {
			
        //https://www.optikkandr.com/cgi/Rx.Orders.exe?4288123.430770;EN;GetPreview;;;05%20-%20Rounded%20Aviator;;;;;;;;;;;;;;;;;;;;;;;;Both%20lenses,%20same%20type;;;;;;;;;;;;;;;;;No;;;;;;;;;;;;;;;;;No;;;;;;;;;;;None;;;;;;;;;;;;;;None;;;;;;;;;;;;;;;;No;No;Yes;No;No;No;;1426113544580;
        //https://www.optikkandr.com/CGI/Rx.Orders.exe?
        //TIMESTAMPE: 5494406.553388;
        // LANGUAGE : EN;
        // GetPreview;;;;02%20-%20Rectangle%20Rounded;;;;;;;;;;;;;;;;;;;;;;;;Both%20lenses,%20same%20type;;;;;;;;;;;;;;;;;No;;;;;;;;;;;;;;;;;No;;;;;;;;;;;None;;;;;;;;;;;;;;None;;;;;;;;;;;;;;;;;No;No;Yes;No;No;;1454003463726;
         // Timestamp ; Language ; Image ; Patient Name ; Rush ; Coupon
        $scope.title = "My Orders : Glasses";
        $scope.description = "Place a New Order";
        $scope.mainImage = "Content/images/Rx.jpg";
        $scope.datenow = new Date();
        $scope.setShape = function()
        {	

            //TO DO : Save these as data-attributes of eaqch shape 
            $scope.xshape 	= 'Rounded%20Aviator';
            $scope.xrx 		= 'Both%20lenses'; // have drop down result.
            $scope.xlog 	= "123"; // same.
            $scope.xlang 	= "EN"; // Set this from a global perspective (... scope pass in)

            ImageFactory.GetImage($scope.xshape, $scope.xrx, $scope.xlog, $scope.xlang, function(response) {
                if(response) {
                    //Update the image.                                    
                    $scope.mainImage = response;
                    $apply(mainImage);
                } else {
                    //$scope.error = response.message;
                    //$scope.dataLoading = false;
                    alert("Service Not Ready Yet");
                }
            });

        };
        //$state.transitionTo('app.orders-glasses');


	 
    }]).
//Outside, global controller.
controller('MainController', ['$scope', '$rootScope', '$location', '$layout', '$layoutToggles', 'CustomersNonFactory', '$pageLoadingBar', '$menuItems', '$window', function ($scope, $rootScope, $location, $layout, $layoutToggles, CustomersNonFactory, $pageLoadingBar, $menuItems,$window)
{
  
    // Define Public Vars
    public_vars.$body = jQuery("body");

    
  //  $scope.$root.isLightLoginPage = false;
   // $scope.$root.isLockscreenPage = false;
  //  $scope.$root.isMainPage = true;
   
    //Evaluate rootscope userlevel.

    $rootScope.userLevel1 = false;
    $rootScope.userLevel2 = false;
    $rootScope.userLevel3 = false;
    $rootScope.userLoggedIn = false;
 
    $scope.title = "Welcome to the home of Optik K&R";
    $scope.description = "Your optical store.";
    $scope.mainImage = "../Content/images/Rx.jpg";
    $scope.mainContent = "Optik K&R is dedicated to providing eye care products and services which reflect a commitment to quality and innovation.  Optik K&R manufactures, and distributes a wide variety of eye care products, in addition to providing numerous laboratory services to ensure that the needs of our clients are always met.  As of August 1st, 2003 we moved to a new 22,500 sq.ft. facility built specifically as a modern manufacturing and distribution centre.";
    $scope.mainAddress = "Optik K&R is located at 425 Midwest Road Toronto, Ontario, Canada M1P 3A6";


    $rootScope.layoutOptions = {
        horizontalMenu: {
            isVisible		: true,
            isFixed			: true,
            minimal			: false,
            clickToExpand	: false,
            isMenuOpenMobile: false
        },
        sidebar: {
            isVisible		: false,
            isCollapsed		: true,
            toggleOthers	: true,
            isFixed			: true,
            isRight			: false,
            isMenuOpenMobile: false,
            // Added in v1.3
            userProfile		: true
        },
        chat: {
            isOpen			: false,
        },
        settingsPane: {
            isOpen			: false, //was false.
            useAnimation	: false
        },
        container: {
            isBoxed			: false
        },
        skins: {
            sidebarMenu		: '',
            horizontalMenu	: '',
            userInfoNavbar	: ''
        },
        pageTitles: true,
        userInfoNavVisible	: false // was false
    };

    $layout.loadOptionsFromCookies(); // remove this line if you don't want to support cookies that remember layout changes
		

    /*
    $scope.updatePsScrollbars = function()
    {
        var $scrollbars = jQuery(".ps-scrollbar:visible");

        $scrollbars.each(function(i, el)
        {
            if(typeof jQuery(el).data('perfectScrollbar') == 'undefined')
            {
                jQuery(el).perfectScrollbar();
            }
            else
            {
                jQuery(el).perfectScrollbar('update');
            }
        })
    };
   */

    // Define Public Vars
    public_vars.$body = jQuery("body");


    // Init Layout Toggles
    $layoutToggles.initToggles();


    // Other methods
    $scope.setFocusOnSearchField = function()
    {
        public_vars.$body.find('.search-form input[name="s"]').focus();
        setTimeout(function(){ public_vars.$body.find('.search-form input[name="s"]').focus() }, 100 );
    };


    // Watch changes to replace checkboxes
    $scope.$watch(function()
    {
        cbr_replace();
    });
    /*
    // Watch sidebar status to remove the psScrollbar
    $rootScope.$watch('layoutOptions.sidebar.isCollapsed', function(newValue, oldValue)
    {
        if(newValue != oldValue)
        {
            if(newValue == true)
            {
                public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('destroy')
            }
            else
            {
                public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar({wheelPropagation: public_vars.wheelPropagation});
            }
        }
    });
    */

    // Page Loading Progress (remove/comment this line to disable it)
    $pageLoadingBar.init();

    $scope.showLoadingBar = showLoadingBar;
   // $scope.hideLoadingBar = hideLoadingBar;
 

    // Set Scroll to 0 When page is changed
    $rootScope.$on('$stateChangeStart', function()
    {
        var obj = {pos: jQuery(window).scrollTop()};
        TweenLite.to(obj, .25, {pos: 0, ease:Power4.easeOut, onUpdate: function()        {
            $(window).scrollTop(obj.pos);
        }});
    });
   
  

    /*
    $scope.isFullscreenSupported = Fullscreen.isSupported();
    $scope.isFullscreen = Fullscreen.isEnabled() ? true : false;

    $scope.goFullscreen = function()
    {
        if (Fullscreen.isEnabled())
            Fullscreen.cancel();
        else
            Fullscreen.all();

        $scope.isFullscreen = Fullscreen.isEnabled() ? true : false;
    }
    */
     $location.path("/login"); //Default to the login page (it will control home).
  
}]).

controller('ChatController', function($scope, $element)
{
    var $chat = jQuery($element),
        $chat_conv = $chat.find('.chat-conversation');

   // $chat.find('.chat-inner').perfectScrollbar(); // perfect scrollbar for chat container


    // Chat Conversation Window (sample)
    $chat.on('click', '.chat-group a', function(ev)
    {
        ev.preventDefault();

        $chat_conv.toggleClass('is-open');

        if($chat_conv.is(':visible'))
        {
            $chat.find('.chat-inner').perfectScrollbar('update');
            $chat_conv.find('textarea').autosize();
        }
    });

    $chat_conv.on('click', '.conversation-close', function(ev)
    {
        ev.preventDefault();

        $chat_conv.removeClass('is-open');
    });
}).
    // Added in v1.3
	controller('FooterChatCtrl', function ($scope, $element) {
	    $scope.isConversationVisible = false;

	    $scope.toggleChatConversation = function () {
	        $scope.isConversationVisible = !$scope.isConversationVisible;

	        if ($scope.isConversationVisible) {
	            setTimeout(function () {
	                var $el = $element.find('.ps-scrollbar');

	                if ($el.hasClass('ps-scroll-down')) {
	                    $el.scrollTop($el.prop('scrollHeight'));
	                }

	                $el.perfectScrollbar({
	                    wheelPropagation: false
	                });

	                $element.find('.form-control').focus();

	            }, 300);
	        }
	    }
	}).
   // Path: /error/404
    controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title});
        });
    }]);
