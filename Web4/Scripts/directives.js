'use strict';

angular.module('app.directives', [])

    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('sidebarMenu', function(){
        return {
            restrict: 'E',
            templateUrl: "/Views/tpls/layout/sidebar-menu.html",
            controller: 'SidebarMenuController'
           
          
        };
    }).
   directive('sidebarChat', function () {
      return {
          restrict: 'E',         
          templateUrl: "/Views/tpls/layout/sidebar-chat.html"
      };
    }).
   directive('progressStyle', function () {
       //Use an anchor tag to set the progress indicator (likely on a tab interface).
       return {
           restrict: 'A',
           replace: false,
           link: function (scope, elem, attr) {

               var width, activetab;
              
               width = elem.attr("vt-width");
               activetab = elem.attr("vt-showtab");


               scope.$watch('showContact', function (newValue, oldValue) {
                   if (newValue)
                   angular.element('.progress-indicator').css({ 'width': width });
               }, true);

              function changeWidth() {
                   width = scope.showContact = true ? "100%" : "50%";
                      
               }

               $(elem).click(function (e) {
                   e.preventDefault();
                   $('.progress-indicator').css({ 'width': width });
                 
                 
               })
              
           }
       }
   }).
	directive('sidebarProfile', function () {
	    return {
	        restrict: 'E',
	        replace: true,
	        templateUrl: "/Views/tpls/layout/sidebar-profile.html",
	        scope:{
                content: '='
	        }
	    };
	}).
    directive('footerChat', function () {
        return {
            restrict: 'E',
            replace: true,
            controller: 'FooterChatCtrl',
            templateUrl: "/Views/tpls/layout/footer-chat.html",
        };
    })
    .directive('checkPostal', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attr, ngModel) {
                ngModel.$validators.postalcode = function(val) {
                    var regexp = /^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ] ?[0-9][ABCEFGHJKLMNPRSTVWXYZ][0-9]$/i;
                    if (val) {
                        return regexp.test(val);
                    }
                    else {
                        return true;
                    }
                };
            }
        };
    }).
     directive('footerBottomTest', function () {
         return {
             restrict: 'E',
             replace: true,
             templateUrl: "/Views/tpls/layout/footer.html",
             scope: {
                 content: '='
             }
         };
     }).
    directive('pageTitle', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "/Views/tpls/layout/page-title.html",
            link: function (scope, el, attr) {
                scope.title = attr.title;
                scope.description = attr.description;
            }
        };
    }).
    directive('horizontalMenu', function () {
        return {
            restrict: 'E',          
            templateUrl: "/Views/tpls/layout/horizontal-menu.html",
            scope: {
                content: '='
            }
         
        }
    }).
    directive('userInfoNavbar', function () {
        return {
            restrict: 'E',            
            templateUrl: "/Views/tpls/layout/user-info-navbar.html"
        };
    }).
	directive('siteFooter', function () {
	    return {
	        restrict: 'E',
	        templateUrl: "/Views/tpls/layout/footer.html",
	        scope: {
	            content: '='
	        }
	  
	    };
	}).
    directive('sameFooter', function () {
        return {
            restrict: 'E',
            templateUrl: "/Views/tpls/layout/footer.html",
            link: function (scope, element, attrs) {
                var date = new Date();
                var year = date.getFullYear();
                scope.datenow = year;
            }

        };
    }).
     directive('sidebarLogo', function () {
         
         return {
             restrict: "E",            
             templateUrl: "/Views/tpls/layout/sidebar-logo.html",
             replace: true,
          
         };
     }).
    directive('menuView', function ($compile) {
    
        var getTemplate = function (accessLevel) {
            var menuItems = '';
            var adminMenuItems = '<li><a href="">Reviews</a></li><li><a href="">Accounts</a></li>';
            var salesMenuItems = '<li><a href="">Reviews</a></li>';
            var genMenuItems = ''; // not allowed to view anything.

            switch (contentType) {
                case '1':
                    template = imageTemplate;
                    break;
                case '2':
                    menuItems = salesMenuItems;
                    break;
                case '':
                    menuItems = genMenuItems;
                    break;
            }



            return template;


        }
        var linker = function (scope, element, attrs) {
            //scope.rootDirectory = 'images/';
            element.html(getTemplate(scope.accessLevel)).show();
            $compile(element.contents())(scope);
        }
        return {
            restrict: "E",
            link: linker,
            scope: {
                content: '='
            }
        };
   
    })
   .directive('myOneMany', function ($parse) {
       return {
           restrict: 'A',
           require: '?ngModel',
           link: function (scope, element, attrs, ngModel, transclude) {

           }
       }
   })
    .directive('xngFocus', function () {
        return function (scope, element, attrs) {
            return scope.$watch(attrs.xngFocus, function (newValue) {
                console.log(newValue);
                return newValue && element[0].focus();
            });
        };
    })

   .directive('salesSummary', function ($timeout) {

       return {
           replace: true,
           restrict: 'E',         
           templateUrl: 'Views/tpls/sales-summary.html',
         
       }      
   })
   
   .directive('myHtmleditor', function ($parse, $compile, $timeout) {
       return {
           restrict: 'A',
           require: '?ngModel',          
           link: function (scope, element, attrs, ngModel, transclude) {

               //When model is compiled, instantiate the HtmlEditor, and seed the content.
                                            
               var saveValue = "";

               //Seed the element which will activate the CodeMirror.
               element.html(saveValue);
               jQuery.UIkit.htmleditor(element);


             
               if (!ngModel) { return; }

               ngModel.$formatters.push(function (value) {
                   if (angular.isUndefined(value) || value === null) {
                       return '';
                   } else if (angular.isObject(value) || angular.isArray(value)) {
                       throw new Error('ui-codemirror cannot use an object or an array as a model');
                   }
                   return value;
               });
               
                ngModel.$render = function () {
                    //Code mirror expects a string so make sure it gets one
                    //Although the formatter have already done this, it can be possible that another formatter returns undefined (for example the required directive)
                    var safeViewValue = ngModel.$viewValue || '';                                    
                    jQuery('.CodeMirror')[0].CodeMirror.setValue(safeViewValue);
                };


               // Keep the ngModel in sync with changes from CodeMirror
               jQuery('.CodeMirror')[0].CodeMirror.on("change", function (instance) {                    
                        var newValue = instance.getValue();
                        if (newValue !== ngModel.$viewValue) {
                            //Update our textarea with / ngModel for saving back to Db.
                            scope.$evalAsync(function () {
                                ngModel.$setViewValue(newValue);
                            });
                        }
                    });

                        
             
               

           }
       }
   }).
    directive('draggable', function () {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                var $el = angular.element(el);

                if (!jQuery.isFunction(jQuery.fn.draggable))
                    return false;

                var revertflag = false;
                if (el.attr("dropafter") != 'true')
                    revertflag = true;

                $el.draggable({
                    revert: revertflag,
                    zIndex: 999
                    }
                );
            }
        }
    }).
directive('dropzone', function(){
    return {
        restrict: 'AC',
        link: function(scope, el, attr)
        {
            var $el = angular.element(el);

            if( ! jQuery.isFunction(jQuery.fn.dropzone))
                return false;

            $el.dropzone();
        }
    }
}).
    directive('timepicker', function () {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                if (!jQuery.isFunction(jQuery.fn.timepicker))
                    return false;

                var $this = angular.element(el),
					opts = {
					    template: attrDefault($this, 'template', false),
					    showSeconds: attrDefault($this, 'showSeconds', false),
					    defaultTime: attrDefault($this, 'defaultTime', 'current'),
					    showMeridian: attrDefault($this, 'showMeridian', true),
					    minuteStep: attrDefault($this, 'minuteStep', 15),
					    secondStep: attrDefault($this, 'secondStep', 15)
					},
					$n = $this.next(),
					$p = $this.prev();

                $this.timepicker(opts);

                if ($n.is('.input-group-addon') && $n.has('a')) {
                    $n.on('click', function (ev) {
                        ev.preventDefault();

                        $this.timepicker('showWidget');
                    });
                }

                if ($p.is('.input-group-addon') && $p.has('a')) {
                    $p.on('click', function (ev) {
                        ev.preventDefault();

                        $this.timepicker('showWidget');
                    });
                }
            }
        }
    }).

    directive('schedulerCalendar', function(){
        return {

           restrict: 'AC',
           replace: true,
           link: function (scope, el, attr) {

                if (!jQuery.isFunction(jQuery.fn.datepicker))
                    return false;

                  var $this = angular.element(el),
                                   opts = {
                                       format: attrDefault($this, 'format', 'mm/dd/yyyy'),
                                       startDate: attrDefault($this, 'startDate', scope.startDate),
                                       endDate: attrDefault($this, 'endDate', scope.endDate),
                                       daysOfWeekDisabled: attrDefault($this, 'disabledDays', ''),
                                       startView: attrDefault($this, 'startView', 0)
                                   },
                $n = $this.next(),
                $p = $this.prev();

              

                $this.datepicker(opts);
                $this.datepicker('show');

                  if ($n.is('.input-group-addon') && $n.has('a')) {
                      $n.on('click', function (ev) {
                          ev.preventDefault();

                          $this.datepicker('show');
                      });
                  }

                  if ($p.is('.input-group-addon') && $p.has('a')) {
                      $p.on('click', function (ev) {
                          ev.preventDefault();

                          $this.datepicker('show');
                      });
                  }

                
                  var colors = ['red', 'blue', 'primary', 'success', 'warning', 'info', 'danger', 'purple', 'black', 'gray'];

                  jQuery("#add_event_form").on('submit', function (ev) {

                      ev.preventDefault();
                      var $event = $(this).find('.form-control'),
                          event_name = $event.val().trim();

                      if (event_name.length >= 3) {
                          var color = colors[Math.floor(Math.random() * colors.length)];

                          // Create Event Entry
                          jQuery("#events-list").append(
                              '<li>\
					<a href="" data-event-class="event-color-' + color + '">\
						<span class="badge badge-' + color + ' badge-roundless upper">' + event_name + '</span>\
					</a>\
				</li>');

                          // Reset draggable
                         jQuery("#events-list li").draggable({
                              revert: true,
                              revertDuration: 50,
                              zIndex: 999
                          });

                          // Reset input
                          $event.val('').focus();
                      }
                      else {
                          $event.focus();
                      }
                  });


                  jQuery("#calendar").fullCalendar({
                      header: {
                          left: 'title',
                          center: '',
                          right: 'month,agendaWeek,agendaDay prev,next'
                      },
                      buttonIcons: {
                          prev: 'prev fa-angle-left',
                          next: 'next fa-angle-right',
                      },
                      defaultDate: '2014-09-12',
                      editable: true,
                      eventLimit: true,
                      events: [
                          {
                              title: 'All Day Event',
                              start: '2014-09-01'
                          },
                          {
                              title: 'Long Event',
                              start: '2014-09-07',
                              end: '2014-09-10'
                          },
                          {
                              id: 999,
                              title: 'Repeating Event',
                              start: '2014-09-09T16:00:00'
                          },
                          {
                              id: 999,
                              title: 'Repeating Event',
                              start: '2014-09-16T16:00:00'
                          },
                          {
                              title: 'Conference',
                              start: '2014-09-11',
                              end: '2014-09-13'
                          },
                          {
                              title: 'Meeting',
                              start: '2014-09-12T10:30:00',
                              end: '2014-09-12T12:30:00'
                          },
                          {
                              title: 'Lunch',
                              start: '2014-09-12T12:00:00'
                          },
                          {
                              title: 'Meeting',
                              start: '2014-09-12T14:30:00'
                          },
                          {
                              title: 'Happy Hour',
                              start: '2014-09-12T17:30:00'
                          },
                          {
                              title: 'Dinner',
                              start: '2014-09-12T20:00:00'
                          },
                          {
                              title: 'Birthday Party',
                              start: '2014-09-13T07:00:00'
                          },
                          {
                              title: 'Click for Google',
                              url: 'http://google.com/',
                              start: '2014-09-28'
                          }
                      ],
                      droppable: true,
                      drop: function (date) {

                          var $event = jQuery(this).find('a'),
                              eventObject = {
                                  title: $event.find('.badge').text(),
                                  start: date,
                                  className: $event.data('event-class')
                              };

                          jQuery('#calendar').fullCalendar('renderEvent', eventObject, true);

                          // Remove event from list
                          if (jQuery("#events-list li").length > 4) {
                              jQuery(this).remove();
                          }

                      }
                  });


            },
           templateUrl: '/Views/tpls/extra/calendar.html'
        }

    }).
  
	directive('salesCalendar', ['$timeout', 'SchedulerFactory', function($timeout, SchedulerFactory) {
	    return {
	        restrict: 'A',
	        link: function (scope, el, attr) {

	            var colors = ['red', 'blue', 'primary', 'success', 'warning', 'info', 'danger', 'purple', 'black', 'gray'];
	            var $eventform = angular.element(document.querySelector("#add_event_form"));
	            var $events_li = angular.element(document.querySelector("#events-list > li"));
	            var $eventsList = angular.element(document.querySelector("#events-list"));
	            var $calendar = angular.element(document.querySelector("#calendar"));
	            

	            var defaultDate = new Date(); // Today's date.
	        

	            
	                 
	                   $timeout(function () {

	                      angular.element($calendar).fullCalendar({
	                          header: {
	                              left: 'title',
	                              center: '',
	                              right: 'month,agendaWeek,agendaDay prev,next'
	                          },
	                          minTime: "06:00:00",
	                          maxTime: "21:00:00",
	                          buttonIcons: {
	                              prev: 'prev fa-angle-left',
	                              next: 'next fa-angle-right',
	                          },
	                          defaultView: 'agendaDay',
	                          defaultDate: defaultDate,
	                          editable: true,
	                          eventLimit: true,
	                          eventResize: function (calEvent, delta, revertFunc) {

	                              var startevent = new Date(calEvent.start);
	                              var endevent = new Date(calEvent.end);
	                              var $event = angular.element(this).find('a'),
                                     eventObject = {
                                         id: calEvent.id,
                                         title: calEvent.title,
                                         start: startevent,
                                         end: endevent,
                                         className: calEvent.className[0]
                                     };
	                              scope.updateEventItem(eventObject);


	                          },
	                          eventDrop: function (calEvent, delta, revertFunc) {

	                              var startevent = new Date(calEvent.start);
	                              var endevent = new Date(calEvent.end);

	                              var $event = angular.element(this).find('a'),
                                     eventObject = {
                                         id: calEvent.id,
                                         title: calEvent.title,
                                         start: startevent,
                                         end: endevent,
                                         className: calEvent.className[0]
                                     };
	                              scope.updateEventItem(eventObject);


	                          },
	                          events: scope.eventItems,
	                          droppable: true,
	                          eventDblClick: function (calEvent, jsEvent, view) {
	                              angular.element($calendar).fullCalendar('removeEvents', calEvent.id);
	                              scope.deleteEventItem(calEvent.id);
	                          },
	                          drop: function (date) {

	                              var day = new Date(date);
	                              var endevent = new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 4, day.getMinutes(), day.getSeconds(), 0);

	                              var $event = angular.element(this).find('a'),
                                      eventObject = {
                                          id: $event.data("event-id"),
                                          customerid: $event.data("customer-id"),
                                          customername: $event.data("customer-name"),
                                          title: $event.find('.badge').text(),
                                          start: date,
                                          end: endevent,
                                          className: $event.data('event-class'),
                                          userGenerated: $event.data('user-generated')


                                      };


	                              var customerName = null, customerID = null, eventtypes = [];

	                              if (!eventObject.userGenerated) {
	                                  customerName = eventObject.title.substring(eventObject.title.indexOf(":") + 1);
	                                  customerID = eventObject.title.substring(0, eventObject.title.indexOf(":") - 1);
	                                  eventtypes = ["Travel Time", "Breakfast Meal", "Lunch Meal"];
	                              }

	                              var saveitem = {
	                                  "ID": eventObject.id,
	                                  "UserID": scope.SID,
	                                  "Customer_ID": customerID,
	                                  "Customer_Name": customerName != eventtypes[0] && customerName != eventtypes[1] && customerName != eventtypes[2] ? customerName : '',
	                                  "Title": customerName != eventtypes[0] && customerName != eventtypes[1] && customerName != eventtypes[2] ? "Client Visit w/ " + customerID + ":" + customerName : customerName,
	                                  "Start_Time": eventObject.start,
	                                  "End_Time": eventObject.end,
	                                  "className": eventObject.className
	                              };
	                              var response = customerName != eventtypes[0] && customerName != eventtypes[1] && customerName != eventtypes[2] ? SchedulerFactory.schedulers.update({ id: item.id }, saveitem, function () {
	                                  angular.element($calendar).fullCalendar('renderEvent', eventObject, true);
	                              }) : SchedulerFactory.schedulers.create(saveitem, function () {
	                                  eventObject.id = response.ID;
	                                  angular.element($calendar).fullCalendar('renderEvent', eventObject, true);
	                              });





	                              //TODO :  IF IT HAS AN ID AFTER THE DROP, THEN UPDATE IT -- DON'T CREATE! A NEW ONE.




	                          }


	                      });

	                  });

	              
	        },	        
            templateUrl: '/Views/tpls/extra/sales-calendar.html'
	    }
	}]).
	directive('daterange', function () {
	    return {
	        restrict: 'AC',
	        link: function (scope, el, attr) {
	            if (!jQuery.isFunction(jQuery.fn.daterangepicker))
	                return false;

	            var $this = angular.element(el);

	            // Change the range as you desire
	            var ranges = {
	                'Today': [moment(), moment()],
	                'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
	                'Last 7 Days': [moment().subtract('days', 6), moment()],
	                'Last 30 Days': [moment().subtract('days', 29), moment()],
	                'This Month': [moment().startOf('month'), moment().endOf('month')],
	                'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
	            };

	            var opts = {
	                format: attrDefault($this, 'format', 'MM/DD/YYYY'),
	                timePicker: attrDefault($this, 'timePicker', false),
	                timePickerIncrement: attrDefault($this, 'timePickerIncrement', false),
	                separator: attrDefault($this, 'separator', ' - '),
	            },
					min_date = attrDefault($this, 'minDate', ''),
					max_date = attrDefault($this, 'maxDate', ''),
					start_date = attrDefault($this, 'startDate', ''),
					end_date = attrDefault($this, 'endDate', '');

	            if ($this.hasClass('add-ranges')) {
	                opts['ranges'] = ranges;
	            }

	            if (min_date.length) {
	                opts['minDate'] = min_date;
	            }

	            if (max_date.length) {
	                opts['maxDate'] = max_date;
	            }

	            if (start_date.length) {
	                opts['startDate'] = start_date;
	            }

	            if (end_date.length) {
	                opts['endDate'] = end_date;
	            }


	            $this.daterangepicker(opts, function (start, end) {
	                var drp = $this.data('daterangepicker');

	                if ($this.is('[data-callback]')) {
	                    //daterange_callback(start, end);
	                    callback_test(start, end);
	                }

	                if ($this.hasClass('daterange-inline')) {
	                    $this.find('span').html(start.format(drp.format) + drp.separator + end.format(drp.format));
	                }
	            });

	            if (typeof opts['ranges'] == 'object') {
	                $this.data('daterangepicker').container.removeClass('show-calendar');
	            }
	        }
	    }
	}).
    directive('scheduler-byweek', function () {
        return {
            restrict: "AE",
            scope: {
                noOfDays: '=',
                startingDay: '='
            },
            link: function (scope, element, attrs) {

                var date = new Date();
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                var isLeapYear = (date.getFullYear() / 4).toString().indexOf(".") <= 0 ? true : false; //the year can be evenly divided by 4
                var feb = isLeapYear ? "28" : "29"; // If its a leapyear, number of days changes.
                var numDays = ["31", feb, "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];


                scope.today = days[date.getDay()];
                scope.currentMonth = months[date.getMonth()];
                scope.currentYear = date.getFullYear();
                
                scope.daysToDisplay = [];

                for (var i = 1; i <= scope.noOfDays; i++) {
                   scope.daysToDisplay.push(days[i]);
                }

            },
            templateUrl: '/Views/tpls/'

        }
    })
    .directive('focusOn', function() {
    return function(scope, elem, attr) {
        scope.$on(attr.focusOn, function(e) {
            elem[0].focus();
        });
    };
    })
.directive("atTextareatoggle", [
  function () {
      return {
          restrict: "AC",
          compile: function (element, attribute, transclude) {
              var attribute;
              var model;
              attribute = element.attr("at-field");
              model = element.attr("at-model");
              if (!attribute && !model) {
                  throw "at-field specified without at-model" + element.html();
              }
              return element.html("<p class='blockquote blockquote-purple' data-original-title='Tooltip on top' data-placement='top' data-toggle='tooltip' ng-hide='" + model + ".editing' ng-click='editItem(" + model + ")'>{{" + model + "." + attribute + "}}</p><textarea  class='form-control input-unstyled ng-pristine ng-valid ng-touched' ng-show='" + model + ".editing' ng-model='" + model + "." + attribute + "' ng-blur='doneEditing(" + model + ")' autofocus >{{" + model + "." + attribute + "}}</textarea>");

          }
      }
  }
])
   

.directive("atInputtoggle", [
  function () {
      return {
          restrict: "AC",
          compile: function (element, attribute, transclude) {
              var attribute;
              var model;
              attribute = element.attr("at-field");
              model = element.attr("at-model");
              if (!attribute && !model) {
                  throw "at-field specified without at-model" + element.html();
              }
              return element.html("<span class='form-control' ng-hide='" + model + ".editing' ng-click='editItem(" + model + ")'>{{" + model + "." + attribute + "}}</span><input ng-show='" + model + ".editing' ng-model='" + model + "." + attribute + "' ng-blur='doneEditing(" + model + ")' autofocus />");

          }
      }
  }
    ])

.directive('autofocus', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link : function($scope, $element) {
            $timeout(function() {
                $element[0].focus();
            });
        }
    }
}])
    .directive('ngEnter', function () {       
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);                       
                    });
                    event.preventDefault();
                }
            });
        };
    })
.directive("salesDataSwipe", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            swipeModel: '=',
            displayBy: '=',
            
        },
        link: function (scope, element, attrs) {
            scope.model = scope.swipeModel;            
            scope.title = new Date().getFullYear();
            scope.displayvalue = scope.displayBy;
            scope.currentIndex = 0; // the default.

            scope.currentRange = scope.displayvalue == '4' ? scope.currentIndex + 4 : scope.currentIndex + 1;

            scope.swipeLeft = function () {
                scope.direction = 'left';
                scope.currentIndex = (scope.currentIndex < scope.model.length) ? ++scope.currentIndex : 0;
            };
            scope.swipeRight = function () {
                scope.direction = 'right';
                scope.currentIndex = (scope.currentIndex > 0) ? --scope.currentIndex : scope.model.length;

            };
            scope.clickRight = function () {
                scope.direction = 'right';
                if (scope.displayvalue != '1') {
                    scope.currentIndex = (scope.currentIndex >= (scope.model.length + 1) / 4) ? --scope.currentIndex : (scope.model.length + 1) / 4;
                    scope.currentRange = (scope.currentIndex * scope.displayvalue);
                } else {
                    scope.currentIndex = (scope.currentIndex > 0) ? --scope.currentIndex : scope.model.length-1;
                }
            };
            scope.clickLeft = function () {
                scope.direction = 'left';
                if (scope.displayvalue != '1') {
                    scope.currentIndex = ((scope.currentIndex + 1) * scope.displayvalue < scope.model.length) ? ++scope.currentIndex : 0;
                    scope.currentRange = ((scope.currentIndex + 1) * scope.displayvalue);
                } else {
                    scope.currentIndex = (scope.currentIndex < scope.model.length-1) ? ++scope.currentIndex : 0;
                }
            };

         
            scope.toggle4Up = function () {
                //First reset currentIndex to one b3fore performing any adjustments
                scope.currentIndex = 0;
                scope.displayvalue = scope.displayvalue == '4' ? '1' : '4';
                scope.currentRange = scope.displayvalue == '4' ? scope.currentIndex + 4 : scope.currentIndex + 1;

            }
            scope.isCurrentRange = function (index) {
                 if (scope.displayvalue == '1') {
                     return index === scope.currentIndex;
                } else {                   
                    return index < scope.currentRange;
                 }
                 
            };

            scope.setCurrentSlideIndex = function (index) {
                scope.direction = (index > scope.currentIndex) ? 'left' : 'right';
                scope.currentIndex = index;

            };

            scope.isCurrentSlideIndex = function (index) {

                return scope.currentIndex === index;

            };


        },
     
        templateUrl: '/Views/tpls/sales/sales-data-swipe.html',
    };

    
})

    .directive('RequestVerificationToken', ['$http', function ($http) {
        return function (scope, element, attrs) {
            $http.defaults.headers.common['RequestVerificationToken'] = attrs.RequestVerificationToken || "no request verification token";
        };
    }]);

