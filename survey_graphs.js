

/* Load the necessary libraries for Google Charts. */
google.charts.load('current', {'packages':['corechart', 'line', 'table']});
google.charts.setOnLoadCallback(drawChart);

/* Called when user hits Submit button. */
function drawChart() {
	username = document.getElementById('username').value;
	if (username == "") {
		return;
	}
	var query1 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1pkfeP8RcJEE0nha_duBzI6L7Yt3EacfqOK3H0RecjxE/edit?usp=sharing/gviz/tq');
	query1.setQuery("SELECT A, X WHERE B = '" + username + "' ORDER BY A");
	query1.send(handleQueryResponse1);

	var query2 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1pkfeP8RcJEE0nha_duBzI6L7Yt3EacfqOK3H0RecjxE/edit?usp=sharing/gviz/tq');
	query2.setQuery("SELECT A, N, O, P, Q, R, S, T, U, V, W WHERE B = '" + username + "' ORDER BY A");
	query2.send(handleQueryResponse2);

	var query3 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1pkfeP8RcJEE0nha_duBzI6L7Yt3EacfqOK3H0RecjxE/edit?usp=sharing/gviz/tq');
	query3.setQuery("SELECT Y, X, M WHERE B = '" + username + "' ORDER BY A");
	query3.send(handleQueryResponse3);
}

/* Update most recent score and generate main graph of Score by Time. */
function handleQueryResponse1(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	var userTable = response.getDataTable();
	if (userTable.getNumberOfRows() == 0) {
		alert('The username you entered does not match any entries.')
	} else {
		var most_recent_score = userTable.getValue(userTable.getNumberOfRows() - 1, 1);
		document.getElementById('most_recent_score_div').innerHTML = most_recent_score.toString();
		
		var dateObj = new Date();
		var day = dateObj.getUTCDate();

		// Only have nudges for 5 days. Remove when have all 31 days
		day = day % 5;
		if (day == 0) {
			day = 5;
		}

		day = day.toString();
		var level = get_range(most_recent_score);
		var msg = nudges_dict[day][level];
		document.getElementById('nudge_div').innerHTML = msg;

		/* $.getJSON('nudges.json', function(data, most_recent_score) {
			console.log(data);
			var msg = data.day.level;
			document.getElementById('most_recent_score_div').innerHTML = msg;
		}); */

		var chart = new google.visualization.LineChart(document.getElementById('agg_chart_div'));
		var options = {
			pointSize : 3,
			vAxis: {
	            viewWindowMode:'explicit',
	            viewWindow: {
	              max:100,
	              min:0
            	}
            }
		}
		chart.draw(userTable, options);
	}
}

/* Generate graph with a line for each emotion's score. */
function handleQueryResponse2(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	var userTable = response.getDataTable();
	if (userTable.getNumberOfRows() == 0) {
		alert('The username you entered does not match any entries.')
	} else {
		var chart = new google.charts.Line(document.getElementById('individual_chart_div'));
		var options = null;
		chart.draw(userTable, options);
	}
}

/* Generate a table for each entry's score and message. */
function handleQueryResponse3(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	var userTable = response.getDataTable();
	if (userTable.getNumberOfRows() == 0) {
		alert('The username you entered does not match any entries.')
	} else {
		var table = new google.visualization.Table(document.getElementById('msg_table_div'));
		var options = null;
		table.draw(userTable, options);
	}
}

/* Returns what range a score is in: low, medium, or high. */
function get_range(score) {
	if (score < 43) {
		return "Low";
	} else if (score < 68) {
		return "Medium";
	} else {
		return "High";
	}
}

var nudges_dict = {
    "0": {
        "": ""
    },
    "1": {
        "High": "\nWho\u2019s got you covered?\n----------------------\n\nDepartment stores sell few umbrellas on sunny days. When the weather\u2019s fine, people rarely plan for when it won\u2019t be.\n\nIn fact the same is often also true of our \u201cemotional weather\u201d. If you\u2019re like me you probably don\u2019t think much about dealing with gloomy days when, for once, you\u2019re going through a better patch.\n\nIt\u2019s okay, it\u2019s human nature. But you know what? Right now, when things are better, it makes a lot of sense to invest in some contingency planning.\n\nA useful way to bounce back from bad times is making sure you have one or two people you can count on, and I expect you know who they are.\n\nI\u2019m sure they\u2019ll do this unreservedly, probably as you would do for them if they needed support. But they\u2019re important to you, so why not reach out to them today?\n\nPerhaps you have no need for their help right now, but you may in the future. And it\u2019s always easier to ask for support from someone who\u2019s known you in good times as well as bad.\n\n* Which one person has been there for you in the past, and probably will be again in the future?\n\n* How will you get in touch with them? E.g. Email, phone calls, visit, greeting card\n\n* When can you schedule this?\n\n+++++++++++++++++++++++++++++++\n\n",
        "Low": "\nLook on the bright side.\n------------------------\n\nPollyanna was the title character of a best-selling 1913 children\u2019s book of the same name. After her father taught her to play \u201cThe Glad Game\u201d she became impossibly optimistic, always seeking the upside of the gloomiest situation.\n\nFor example, expecting to pull a doll from a lucky dip but finding instead a pair of crutches, Pollyanna\u2019s father told her to look on the bright side because, \u201cWe didn\u2019t need to use them!\u201d\n\nAlthough modern-day Pollyannas are derided for being unrealistic, I\u2019d actually encourage you to adopt her mindset today to help change the way you view a current problem.\n\nBegin by making up a \u201cPollyanna\u201d view of the problem that\u2019s as ridiculous as possible. By all means laugh at yourself. But then gradually turn down the optimism control until you reach a point that\u2019s just about realistic and almost certainly more positive than your current one.\n\nTweaking the story is a great way to bounce back.\n\n* What\u2019s one current problem that\u2019s getting you down? E.g. I\u2019m afraid my low mood is going to make it impossible to go to work.\n\n* What would be a ridiculously optimistic way to view this issue? E.g. Great! I\u2019ll hand in my notice and go live by the ocean!\n\n* How could this \u201cPollyanna\u201d view reframe your problem? E.g. Maybe I should ask my boss for a couple of days off to rest and recover.\n\n",
        "Medium": "\nPhone a friend.\n---------------\n\nWhen you have a bad spell it\u2019s common to believe it\u2019s always been this way, so don\u2019t despair if that\u2019s how you feel right now. It\u2019s a normal human reaction.\n\nA helpful way of bouncing back is to recall previous mood-beating achievements, trying to recall what you did right in the past. That might not be easy, so your mission today is to enlist the help of a friend or family member who was around when you successfully fought back from a previous low.\n\nOur minds sometimes protect us from past pain by blotting out unpleasant memories, so it could be that you can\u2019t even really remember what you did that helped.\n\nAnd that\u2019s where others can lend a hand.\n\nReach out to someone whose memories might be more complete than your own.\n\nAsk them to help you work out what made a difference, then plan to do the same kinds of things again soon.\n\n* Who has seen you recover from a low mood in the past?\n\n* How and when can you contact them? E.g. By email this morning, in person tonight.\n\n* (Later.) What \u201cbouncing back\u201d strategies did they help you recall?\n\n"
    },
    "2": {
        "High": "\nCheese?\n-------\n\nIn 1908 the psychologists Yerkes and Dodson explained that we perform better when our stress levels are slightly higher than normal.\n\nThey called this \u201cOptimal Anxiety\u201d, suggesting that although too much stress is bad, just enough anxiety can be good for you. How could you make use of this? Try stepping out of your comfort zone today. Not too far, but just enough to make you very slightly apprehensive. Maybe you feel strong enough right now to try something a little different, so here are three suggestions. How about pulling on an item of clothing you wouldn\u2019t usually wear? Why not visit somewhere you\u2019ve never been before (an art gallery, a cheese shop)? Or take a completely new route and perhaps a different mode of transport for a journey you make every day? Mix it up.\n\nDo something that makes you feel just a little jittery.\n\n* What regular routine can you change in the next day?\n\n* How will you approach it differently?\n\n* In order to ensure you pull this off, what plans might you need to make?\n\n+++++++++++++++++++++++++++++++\n\n",
        "Low": "\nUnlock your cage.\n-----------------\n\nHappily most zoos have changed, so it\u2019s rightly rare to find an animal kept in inhumane conditions these days.\n\nBut it wasn\u2019t always this way of course. Zoos of the past squeezed their animals into tiny cages, subjecting them to day-in, day-out routines that left them bored and hopeless. Just as you probably do, I shudder to think of it.\n\nOddly though, we humans sometimes incarcerate ourselves in imaginary cages of our own making, particularly when we feel low. Not surprisingly this makes us feel even worse.\n\nBy doing the same old thing in the same old way, day after day, we \u201ccage ourselves,\u201d not even varying our surroundings. Please don\u2019t let that happen to you.\n\nToday\u2019s a good day to shake things up just a little. Maybe you don\u2019t really feel like it, so tread lightly, but try to gently change some routines in the next 24 hours.\n\n* What do you do in the same way almost every day? E.g. Always have the same thing for breakfast and eat it in the same place\n\n* How could you change the way you do this one thing? E.g. Have fresh fruit instead of toast, take my breakfast into another room or the garden\n\n* (Later.) What was it like when you tried that?\n\n",
        "Medium": "\nNo more bananas.\n----------------\n\nThe term \u201ccomfort zone\u201d has been in common use since the 1990s, but the idea of behaving in a way that minimizes stress and risk isn\u2019t exactly new.\n\nOf course there are times when staying in your comfort zone makes sense. For example it probably stops you straying down dangerous dark alleys on the wrong side of town.\n\nSometimes, however, stepping out of your comfort zone can mean the difference between a so-so day and a truly memorable one. So let me recommend shaking up tried-and-tested routines a bit today.\n\nA slightly unconventional way to pull this off is to take the last letter of the word that describes whatever you usually do, then decide to do something which begins with that letter instead.\n\nAlways eat a bananA for breakfast? Try an Apricot. Generally watch the newS on TV? Why not try a Sitcom? While it\u2019s sensible not to disrupt behaviors you find genuinely comforting, it can be rewarding to introduce a little novelty now and then.\n\n* Which word describes a routine you could change? E.g. Phone calL, SandwicH\n\n* Think of a new word that begins with the behavior\u2019s last letter. E.g. Letter, Hotdog\n\n* What can you do now to remind yourself to tackle things differently today? E.g. Take out my writing paper, place a reminder in my wallet for lunchtime\n\n"
    },
    "3": {
        "High": "\nDon\u2019t shut yourself away.\n-------------------------\n\nImagine taking a dream vacation to somewhere you\u2019ve always wanted to visit.\n\nEverything\u2019s perfect.\n\nThe weather is superb. The hotel is magnificent. The location is even better than you\u2019d dared hope.\n\nSo what do you do then? Well for some unknown reason, you spend the entire trip cooped up alone in your hotel room.\n\nIt makes no sense, does it? But this is not that different from feeling pretty good, as you do right now, only to bury yourself in electronic media.\n\nThere\u2019s a big, bright world out there waiting to be enjoyed, so why not take a complete break from technology today? Perhaps not for the whole day, but certainly make your break long enough to appreciate the calm stillness.\n\nYou may need to let others know so they don\u2019t worry about your electronic absence, but you\u2019ll almost certainly enjoy it.\n\n* When will you give yourself some time without technology?\n\n* What enjoyable activity can you plan instead?\n\n* Are you concerned about being without technology for a while? If so, record your worries below. Then forget them. I think you\u2019ll be fine.\n\n+++++++++++++++++++++++++++++++\n\n",
        "Low": "\nTake time out from tech.\n------------------------\n\nIn theory, technology should provide the ideal way to stay in touch with the world when your spirits are low. In theory. The reality is that when we feel a bit below par, most of us tend to shy away from tech-initiated contacts just as much as we do face-to-face connections.\n\nDo you recognize this in yourself? The most you may do is check email and social media, but you could find yourself doing so incessantly. In fact, people suffering from low mood can end up feeling even worse because of social comparisons online: the \u201cEveryone on Facebook is Having a Great Time, Except Me\u201d syndrome.\n\nIf you\u2019re not feeling great, by all means pick up the phone to talk to a friend, or text them. But rather than waste hours becoming disillusioned on Facebook, why not take a healthy break from technology instead? Turn off the computer and TV, and go for a walk or curl up with a good book.\n\nOf course, taking a tech break won\u2019t solve all your problems, but at the very least it might stop you from feeling worse. And at best you might even enjoy it.\n\n* Have you noticed yourself getting over-attached to technology, and if so, when? E.g. Repetitively checking Facebook while also watching TV\n\n* When could you take a break from technology? E.g. During the early evening, after dinner\n\n* What could you do to replace this? E.g. Go for a walk around the block\n\n",
        "Medium": "\nTurn off.\n---------\n\nOne advantage of technology is that it can make you feel like you\u2019re never out of touch. If you need something or someone, it or they are only a button click away.\n\nUnfortunately this state of constant connectivity can also leave you worrying that you\u2019d miss something if you were without your electronic devices.\n\nPerhaps instinctively you know that too much tech isn\u2019t good for you, but \u201cFOMO\u201d (Fear Of Missing Out) stops you from pushing the Off button.\n\nI wouldn\u2019t mind betting though, that you do already turn your back on technology every night when you go to sleep. Then when you wake up six or seven hours later, guess what? That\u2019s right, the Internet is still there.\n\nSometime in the next 24 hours, therefore, I\u2019d like to recommend that you unplug a little. Replace your use of technology with something that is better for you, even if only for a while.\n\n* When\u2019s a good moment to switch off electronic devices? E.g. On my commute, two hours before bedtime\n\n* What will you do instead? E.g. Tackle a crossword puzzle*, read a book\n\n* (Later.) How did that feel? Will you do it again?\n\n*Er, not if your commute involves driving, of course.\n\n"
    },
    "4": {
        "High": "\nBe kind.\n--------\n\nFeeling good can be contagious. When your mood is positive you\u2019re likely to \u201cinfect\u201d other people. But even better, there\u2019s a way to \u201cshare the love\u201d which may actually benefit you even more than those to whom you pass it on.\n\nSo what is it? Just be kind to people, and almost certainly you\u2019ll find no shortage of opportunities to help others in this way today.\n\nIn fact the Dalai Lama says: \u201cBe kind whenever possible. It is always possible.\u201d\n\nHere\u2019s an idea then.\n\nAs you go about your business today, imagine the Dalai Lama at your side, dressed in gold and maroon.\n\nWith every person you encounter, how might he suggest you react? What kindness would he encourage you to offer?\n\nHow much good could you do in one single day?\n\n* How can you remind yourself to channel your own inner Dalai Lama?\n\n* What do you think the Dalai Lama would say about your experiment?\n\n* (Later.) How did it feel to be kind to people?\n\n+++++++++++++++++++++++++++++++\n\n",
        "Low": "\nSpell it out.\n-------------\n\nIf you feel low, it\u2019s not unusual to feel uncared-for and unsupported.\n\nOf course you\u2019re almost certainly viewing life through a distorting lens, but even though there are sure to be people who care about you and want to support you, it\u2019s common to feel abandoned when you\u2019re down.\n\nCuriously, the best time to offer kindness to others is just when you feel you\u2019re receiving little yourself. You see, research suggests that we may actually get more out of helping other people than they do out of being helped.\n\nUnfortunately it\u2019s hard to motivate yourself to behave kindly in a world that seems cruel. Maybe you could think of it as a kind of medication, though, and accept that\u2014even when you know it\u2019s good for you\u2014medicine often tastes bitter.\n\nSo look for opportunities to be kind to others today. Why not specifically make a point of thanking someone you notice doing a good job?\n\nSet out to be kind today and - who knows? \u2014 maybe the world will return the compliment.\n\n* Where might you encounter someone doing a good job today? E.g. On my way to work, at the grocery store\n\n* What\u2019s the smallest way in which you could pass on your thanks? E.g. Simply saying \u201cthanks for doing a good job\u201d or even more simply, smiling.\n\n* How would you feel if someone praised you in the same way?\n\n",
        "Medium": "\nMake your own morphine.\n-----------------------\n\nIf you\u2019re like most people, I can\u2019t imagine you keep a supply of morphine and heroin in your medicine cabinet.\n\nBut even if you\u2019d never dream of experimenting with narcotics, scientists suggest you may have already experienced a similar effect\u2014through the simple act of helping someone else.\n\nAltruistic behavior is known to raise the brain\u2019s own form of morphine- and heroin-like biochemicals, known as \u201cendogenous opioids\u201d, producing a happy rush often referred to as the \u201chelper\u2019s high\u201d.\n\nHowever, don\u2019t simply take my word for it, try it for yourself. Why not plan a kindness day for the next 24 hours?\n\nTaking part is simple. Just look for three opportunities to do nice things for people. Let someone go in front of you. Give someone a hug. Hold the door open.\n\nSimple things. Big impact.\n\n* How could you plan to do your three kind things? E.g. One on my journey to work, one at lunchtime, and another on the way home\n\n* On a scale of 0 to 5, how determined are you to do this?\n\n* (Later.) What, briefly, were the three kind things you did?\n\n"
    },
    "5": {
        "High": "\nTell them why they rock your world.\n-----------------------------------\n\nHere\u2019s a quiz question.\n\nWhich one of these four health conditions do you think poses the most risk? High blood pressure, lack of social connections, obesity, or smoking?\n\nRemarkably, it\u2019s the second of these. Feeling lonely and unloved is a greater health threat than high blood pressure, obesity and smoking.\n\nRight now you may feel relatively well-connected to others, but knowing how important it is to your future health, there\u2019s probably no better way to invest in your well-being than to spend a little time nurturing your relationships with those closest to you.\n\nOne simple but powerful way to do so is to tell them exactly why you care so much. Even if they look embarrassed, deep down they\u2019ll love to hear it.\n\n* Who will you remind that you care about them?\n\n* What\u2019s the best way to do this? Clue: how would they do this if the shoe was on the other foot?\n\n* When will you tell them?\n\n",
        "Low": "\nPhotographic memories.\n----------------------\n\nI\u2019m sure we\u2019ve both experienced that thing when you feel less shiny than usual and don\u2019t particularly want much to do with anyone.\n\nThis kind of \u201cretreating to your cave\u201d behavior is actually pretty common when people feel low, so neither of us should feel we\u2019re that unusual.\n\nBut maybe you know that your social connections play an important part in how you feel, so you end up in a kind of Catch-22 situation. You recognize that connecting would probably help you feel better, but you don\u2019t want to connect because you feel bad.\n\nBut wait, there\u2019s good news, because researchers agree that the benefits of connection are actually linked to your subjective view of your relationships with others. So you may be able to \u201ctrick\u201d your brain into feeling more connected without even picking up the phone.\n\nOne way to do that? Just take several minutes to look at photos of those closest to you. Gaze at them fondly, focusing on your warm connection. Try it. It can really work.\n\n* Which people do you wish you were more connected to right now?\n\n* Where can you find photos of them?\n\n* When can you spend five minutes looking at these pictures in real depth?\n\n",
        "Medium": "\nLove the ones you\u2019re with.\n--------------------------\n\nBased on the fact that social connections play an important part in whether we feel good or not, you might think supermarket clerks should be the happiest people in the world.\n\nJust imagine how many people they must come into contact with every day.\n\nSo why do so many checkout operators look glum? Of course the truth is that it\u2019s not the quantity of connections you experience that counts, but their quality.\n\nAnd the relationships that contribute most to your well-being are those that are close, secure and supportive. Fortunately you can boost the strength of these important connections whenever you wish, simply by nurturing your close relationships.\n\nToday\u2019s a great day to do this. Someone somewhere will benefit from knowing you\u2019re thinking of them and caring about them. Let them know, and you\u2019ll feel closer.\n\nA good feeling to have.\n\n* Who might need reminding that you care about them?\n\n* How can you get in touch with them? E.g. Make a phone call, send an email or text, write a letter\n\n* When will you do this?\n\n"
    }
};

