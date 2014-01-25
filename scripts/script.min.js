(function()
{
    var $body = null;
    var $brandWrapper = null;
    var $summaryWrapper = null;
    var $navigationBarContainer = null;
    var $navigationBar = null;

    $(window).bind("ready", function(event)
    {
        $html = $("html");
        $body = $("body");
        $brandWrapper = $("#brandWrapper");
        $summaryWrapper = $("#summaryWrapper");
        $cardContainer = $("#cardContainer");
        $cardWrapper = $("#cardWrapper");
        $navigationBarContainer = $("#navigationBarContainer");
        $navigationBar = $("#navigationBar");

        updateGreetings();

        $html.removeClass("no-ready");

        $navigationBarContainer.height($navigationBar.outerHeight(true));

        runLoveTicker();

        $body.scrollspy();

        $(window).resize(function()
        {
            $navigationBarContainer.height($navigationBar.outerHeight(true));

            updateNavigationPosition();
            updateScrollSpy();

            if($body.hasClass("fixedNavigation"))
            {
                updateNavigationBarLayout();
            }
        });

        $(window).scroll(function()
        {
            updateNavigationPosition();
        });

        $("#contactDrawerHandle").click(function(event)
        {
            event.preventDefault();

            if($cardContainer.hasClass("collapsed"))
            {
                $cardContainer.removeClass("collapsed");

                var $cardWrapperClone = $cardWrapper.clone();
                $cardWrapperClone.width($cardWrapper.width());

                $body.append($cardWrapperClone);

                var cardWrapperHeight = $cardWrapperClone.outerHeight(true);

                $cardWrapperClone.remove();


                $cardWrapper.height(0);

                $cardWrapper.animate({
                    height: cardWrapperHeight
                },
                250,
                "swing",
                function()
                {
                    $cardWrapper.css("height", "");
                });
            }
            else
            {
                $cardWrapper.height($cardWrapper.height());

                $cardWrapper.animate({
                    height: 0
                },
                250,
                "swing",
                function()
                {
                    $cardContainer.addClass("collapsed");

                    $cardWrapper.css("height", "");
                });
            }

            return false;
        });
    });


    function runLoveTicker()
    {
        var loves = ["Mitali.",
            "Computers.",
            "Internet.",
            "Mobile Apps.",
            "Temple Run.",
            "Dribbble.",
            "Speaker Deck.",
            "iPad.",
			"Mitali.",
            "Trance.",
            "Tiesto.",
            "Armin Van Buuren.",
            "Kaju Katli.",
            "Mangoes.",
            "Mornings.",
			"Mitali.",
            "Walking.",
            "Music.",
            "Coding.",
            "Flash.",
            "JavaScript.",
            "Handicrafts.",
            "Magenta.",
			"Mitali.",
            "Rain.",
            "Winters.",
            "Gardens.",
            "Debugging.",
            "Animated Movies.",
            "Cooking.",
            "Beaches.",
            "Mountains.",
            "7Up.",
			"Mitali.",
            "Origami.",
            "Reading.",
            "Mobiles.",
            "Suterfeni."];

        var $loveElement = $("#myLove");

        var loveTicketUpdateInterval = setInterval(function()
        {
            $loveElement.fadeOut("slow", function()
            {
                var randomLove = loves[Math.floor(Math.random() * loves.length)];
                $loveElement.html(randomLove);
                $loveElement.fadeIn("slow");
            });
        }, 2500);
    }

    function updateNavigationPosition()
    {
        var scrollOffset = $navigationBarContainer.offset().top;

        if ($(window).scrollTop() > scrollOffset)
        {
            $body.addClass("fixedNavigation");

            updateNavigationBarLayout();
        }
        else
        {
            $body.removeClass("fixedNavigation");

            resetNavigationBarLayout();
        }
    }

    function updateNavigationBarLayout()
    {
        var navigationBarContainerOffset = $navigationBarContainer.offset();
        var navigationBarContainerWidth = $navigationBarContainer.width();

        $navigationBar.css("left", navigationBarContainerOffset.left);
        $navigationBar.css("width", navigationBarContainerWidth);
    }

    function resetNavigationBarLayout()
    {
        $navigationBar.css("left", "");
        $navigationBar.css("width", "");
    }

    function updateScrollSpy()
    {
        $body.scrollspy('refresh');
    }

    function updateGreetings()
    {
        var greetings = ["Hello", "Hola", "Namastey", "Hi", "Namaskar", "Ciao", "Bonjour", "Howdy"];
        var randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

        var now = new Date();
        var hourNow = now.getHours();
        var minuteNow = now.getMinutes();

        var timedGreeting = "";

        if(hourNow < 12)
        {
            if(hourNow > 5)
            {
                timedGreeting = "Good Morning";
            }
        }
        else if(hourNow < 13)
        {
            timedGreeting = "Good Noon";
        }
        else if(hourNow < 18)
        {
            timedGreeting = "Good Afternoon";
        }
        else if(hourNow < 20)
        {
            timedGreeting = "Good Evening";
        }
        else if(hourNow < 21 && minuteNow < 30)
        {
            timedGreeting = "Good Evening";
        }
        else
        {
            timedGreeting = "";
        }


        var $greetings = $("#greetings");
        $greetings.text(randomGreeting + ", " + timedGreeting);
    }

})();