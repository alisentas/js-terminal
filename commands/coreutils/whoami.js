var whoami = {
	definition: "whoami - print effective userid",
    version: "1.0.0",
	options: {
		"help": [false],
		"version": [false],
	},
    acceptArguments: false,
	action: function(arguments, options){
        if(options["help"]){
            write("Print the user name associated with the current effective user ID.<br /><br />--help     display this help and exit<br />--version  output version information and exit<br /><br />");
        }else if(options["version"]){
            write(this.version);
        }else{
            write(logname);
        }
	}
}

commands["whoami"] = whoami;
