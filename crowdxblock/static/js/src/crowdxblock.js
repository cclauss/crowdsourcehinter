
//my coding attemps start here i guess
    /*this.url = this.el.data('url');
    Logger.listen('problem_graded', this.el.data('child-id'), this.capture_problem);
    this.render();*/
    /*function capture_problem(event_type, data, element) {
      var answers, response,
        _this = this;
      answers = data[0];
      response = data[1];*/ //use this snippet for actual code? maybe?


//**FOR CHECKING ANSWER CORRECT/NOT**
//check for event problem_check
//Check for success == "incorrect" or success == "correct" to determine? I think?

function CrowdXBlock(runtime, element){
    var WrongAnswer = [];
    var HintUsed = [];
    $("#pair0").hide();
    $("#pair3").hide();
    $("#pair2").hide();
    $("#pair1").hide();
    $("#answer").hide();
    $(".problem").hide();
    $("#feedback").hide();

    function seehint(result){//use html to show these results somewhere i guess
        $('.HintsToUse', element).text(result.HintsToUse); //text(result.self.hints?)
    }

    function getfeedback(result){
        $("#answer").show();
        $(".problem").show();
	$("#feedback").show();
	$.each(result, function(index, value) {
	console.log( index + ": " + value );
        if($("#submit"+value).length == 0){
	    $('.hintansarea').append("<p id=\"submit" + value + "\" class=\"hintsarea\"> </p>");
	    $('#submit'+value).append("For your incorrect answer of:" + " " + value + " <p id=\"hintstoshow" + value + "\"> The following hints exist: </p><p> <input id=\"" + index + "\" type=\"button\" class=\"submitbutton\" value=\"Submit a hint for this problem\">");
        }$('#hintstoshow'+value).append("<p>" + index + "<input data-value=\"" + value + "\" id=\"" + index + "\" type=\"button\" class=\"hintbutton\" value=\"Upvote this Hint\"></p>");
	});
};

    $(document).on('click', '.hintbutton', function(){ //upvote
	console.log("the first id" + this.id);
	id = this.id;
	console.log($(this).attr('id'));
	$.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'rate_hint'),
            data: JSON.stringify({"rating": 1, "ansnum": $(this).attr('id'), "value": $(this).attr('data-value')}),
            success: finish
        });})
    $(document).on('click', '.submitbutton', function(){ //upvote
	console.log("submitbutton hit");
	id = this.id;
        value = $('#'+id).attr('data-value');
	console.log("this id " + $(this).attr('id'));
	$('#submit' + value).append("<p><input type=\"text\" name=\"studentinput\" id=\"" + id + "\" class=\"math\" size=\"40\"><<input id=\"submit\" type=\"button\" class=\"button\" value=\"Submit Hint\"> </p>");})
    $(document).on('click', '#submit', function(){
        console.log("the other id thing" + this.id);
        console.log("thisthing" + $(".math").attr('id'));
	$.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'give_hint'),
            data: JSON.stringify({"submission": $('.math').val(), "id": $(".math").attr('id')}), //give hin for first incorrect answer
            success: finish
        });
	$("#answer").val('');})

    $('#caus', element).click(function(eventObject) {
	console.debug("ca working");
	$.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'clear_states'),
            data: JSON.stringify({"hello": "world"}), //give hin for first incorrect answer
            success: clearstates
        });
	$("#studentsubmit").val('');
	$("#answer").val('');})
    function finish(){
	$('.Thankyou', element).text("Thankyou for your help!");
	$('.correct', element).hide();
        $( ".hintansarea" ).empty();
    }
    function clearstates(){
	$('.Thankyou', element).text();
	$('.correct', element).hide();
        $( ".hintansarea" ).empty();
        $("#answer").hide();
        $(".problem").hide();
    }

    function checkreply(result){
	
	if(result.correct == 1){ 
        console.debug("yay");
	$('.correct', element).show();
	$('.correct', element).text("You're correct! Please choose the best hint, or provide us with one of your own!");
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'get_feedback'),
            data: JSON.stringify({"hello": "world"}), 
            success: getfeedback
        });
        }else{
	console.debug("nay");
	seehint(result)
        }
    }
    $('#studentanswer', element).click(function(eventObject) { //for test //when answer is incorrect        /*response.search(/class="correct/) === -1*/
	console.debug($('#studentsubmit').val()); //currently data is passed to python and then returned whether it is correct or not
        $.ajax({                                  //that probably will be changed once i use response.search or something?
            type: "POST",                         //if/when that is changed, remove checkreply and uncomment the else statement below
            url: runtime.handlerUrl(element, 'get_hint'),
            data: JSON.stringify({"submittedanswer": $('#studentsubmit').val()}), //return student's incorrect answer here
            success: checkreply
        });
        $("#studentsubmit").val('');
     /* } else { //answer is correct
	$('.correct', element).text("You're correct! Please choose the best hint, or provide us with one of your own!");
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'get_feedback'),
            data: JSON.stringify({"hello": "world"}), 
            success: getfeedback
        });
      };*/
    }
)}
