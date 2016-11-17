 $(document).ready(function ($) {
     
        //Have the Events fill in automatically from the database...
        //save the data.
        // Calendar Initialization
        $('#calendar').fullCalendar({
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

                var $event = $(this).find('a'),
                    eventObject = {
                        title: $event.find('.badge').text(),
                        start: date,
                        className: $event.data('event-class')
                    };

                $('#calendar').fullCalendar('renderEvent', eventObject, true);

                // Remove event from list
                if ($("#events-list li").length > 4) {
                    $(this).remove();
                }

            }
        });


        // Draggable Events
        $("#events-list li").draggable({
            revert: true,
            revertDuration: 50,
            zIndex: 999
        });




    });
