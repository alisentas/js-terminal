var commands = {}
var commandHistory = [""];
var commandHistoryIndex = 0;

function process(input){
	input = input.split(" "); // split the input using space
	// TODO: implement piping
	// Command to be processed
	var command = input[0];

	if(commands[command] == undefined){
		write(command + ": command not found");
	}else{
		// input options, eg: ls -alt --help
		var options = {};
		var arguments = [];
		var i, error = 0;
		for(i = 1; i < input.length; ++i){ // loop over input data other than command, look for options
			if(input[i][0] == "-"){
				// data is an option
				var option;
				if(input[i][1] == "-"){ // if it's a double dash option, we seperate them because single dashed ones can be stacked together
					option = input[i].substr(2, input[i].length).split("=");
					if(commands[command].options[option[0]] != undefined){	// command accepts the option
						if(commands[command].options[option[0]][0] == true){	// if option accepts argument
							var argument;
							if(option.length > 1){
								argument = option[1];
							}else{
								if(input[i + 1] == undefined){
									write(command + ": option requires an argument -- \'" + option[0] + "\'");
									return;
								}
								argument = input[i + 1];
								++i;
							}
							switch(commands[command].options[option[0]][1]){	// switch option argument types
								case "alphanumeric":
									if((/^[A-Za-z0-9]+$/g).test(argument)){
										options.option = argument;
									}else{
										write(command + ": invalid argument: " + argument);
										return;
									}
									break;
								case "alpha":
									if((/^[A-Za-z]+$/g).test(argument)){
										options.option = argument;
									}else{
										write(command + ": invalid argument: " + argument);
										return;
									}
									break;
								case "numeric":
									if((/^[0-9]+$/g).test(argument)){
										options.option = argument;
									}else{
										write(command + ": invalid argument: " + argument);
										return;
									}
									break;
								default:
									options.option = argument;
									break;
							}
						}else{ // option doesn't accept argument
							if(option[1] != undefined){ // if there's an argument
								write(command + ": option\"--" + option[0] + "\" doesn't accept an argument");
								if(commands[command].options["help"] != undefined || commands[command].options["usage"] != undefined){
									write("Try \'" + command + "\' --help\' or \'" + command + " --usage\' for more information.");
									return;
								}
							}else{
								// options without arguments is set to true
								options[option] = true;
							}
						}
					}else{	// command doesn't accept/recognize the function
						write(command + ": unrecognized option\'" + option[0] + "\'");
						return;
					}
				}else{	// if it's a single dash option
					var j;
					for(j = 1; j < input[i].length; ++j){
						option = input[i][j];
						if(commands[command].options[option[0]] != undefined){	// command accepts the option
							if(commands[command].options[option[0]][0] == true){	// if option accepts argument
								var argument;
								if(j == input[i].length - 1){
									if(input[i + 1] == undefined){
										write(command + ": option requires an argument -- \'" + option[0] + "\'");
										return;
									}else{
										argument = input[i + 1];
										++i;
									}
								}else{
									argument = input[i].substr(j + 1, input[i].length);
								}
								switch(commands[command].options[option[0]][1]){	// switch option argument types
									case "alphanumeric":
										if((/^[A-Za-z0-9]+$/g).test("asd8.7")){
											options.option = argument;
										}else{
											write(command + ": invalid argument: " + argument);
											return;
										}
										break;
									case "alpha":
										if((/^[A-Za-z]+$/g).test("asd8.7")){
											options.option = argument;
										}else{
											write(command + ": invalid argument: " + argument);
											return;
										}
										break;
									case "numeric":
										if((/^[0-9]+$/g).test("asd8.7")){
											options.option = argument;
										}else{
											write(command + ": invalid argument: " + argument);
											return;
										}
										break;
									default:
										options.option = argument;
										break;
								}
							}else{
								options.option = true;
							}
						}else{	// command doesn't accept/recognize the function
							write(command + ": unrecognized option \'" + option[0] + "\'");
							return;
						}
					}
				}
			}else{
				arguments.push(input[i]);
			}
		}
		if(!commands[command].acceptArguments && arguments.length > 0){
			write(command + ": extra operand ‘" + arguments[0] + "‘");
			return;
		}
		response = commands[command].action(arguments, options);
	}
}

function write(text){
	$("#terminal").append("<div class=\"line\">" + text + "</div>");
}
function addInputLine(){
		$(".active").append($("#input").text()).removeClass("active");
		$("#input, #cursor").remove();
		$("#terminal").append("<div class=\"line active\">" + logname+"@"+hostname+":"+workingDirectory.path+"$ " + "<div id=\"input\"></div><span id=\"cursor\">.</span></div>");
}

$(document).ready(function(){
	// Add the first line
	addInputLine();

	// Handle input/output
	$(document).keypress(function(e){
		if(e.which != 13 && e.which != 8){
			$("#input").text($("#input").text() + e.key);
		}else if(e.which == 8){
			$("#input").text($("#input").text().substr(0, $("#input").text().length - 1));
		}else{
			input = $("#input").text();
			if(input.length > 0)
				process(input);
			addInputLine();
		}
	});

	// Cursor blinking
	var blink = setInterval(function(){
		if($("#cursor").text() == "."){
			$("#cursor").text("");
		}else{
			$("#cursor").text(".");
		}
	}, 600);
});
