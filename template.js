var command = {
	definition: "Definition",
	version: "1.0.0",
	options: {
		"optionName": ["bool, take arguments?", "string-argument type", "definition"]
	},
	acceptArguments: true,
	action: function(arguments, options){

	}
}

commands["command"] = command;
