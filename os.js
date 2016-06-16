var logname = "terminal"
var hostname = "web";
var workingDirectory = "~";

function Directory(parent, name, path){
    this.parent = parent;
    this.name = name;
    this.path = this.parent.path + this.name + "/";
    this.children = [];
}

function File(name, content, parent){
    this.name = name;
    this.content = content;
    this.parent = parent;
    this.getExtension = function(){
        if(this.name.indexOf(".") >= 0){
            return this.name.split(".").pop();
        }else{
            return undefined;
        }
    }
    this.parent.children.push(this);
}

root = {
    name: "root",
    path: "/",
}

root.parent = root;

filesystem = [root];

filesystem.push(new Directory(root, "home"));
workingDirectory = filesystem[1];

filesystem.push(new File("README.md", "This is a terminal", workingDirectory));
