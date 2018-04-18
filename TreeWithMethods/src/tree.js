class Tree {
  constructor(val){
    this.val = val; 
    this.children = []; 
  }

  addChild(node){
    this.children.push(node); 
  }

  removeChild(target){
    for (var i = 0; i < this.children.length; i++){
      if (this.children[i].val === target){
        this.children.splice(i, 1); 
      } 
      if (this.children[i].children.length){
        this.children[i].removeChild(target); 
      }
    }
  }

  breadthFirstSearch(target){
    var queue = [this]; 
    while (queue.length){
      var popped = queue.pop(); 
      if (popped.val === target) {
        return true; 
      }

      if (popped.children.length > 0){
        for (var i = 0; i < popped.children.length; i++) {
          queue.push(popped.children[i]); 
        }
      }
    }
    return false; 
  }

  depthFirstSearch(target){
    var found = false; 
    if (this.val === target) {
       found = true; 
       return found; 
    } 
    if (this.children.length) {
      for (var i = 0; i < this.children.length; i++){
        found = this.children[i].depthFirstSearch(target);
        if (found){
          return found; 
        }
      }
    }
    return found; 
  }

  mapInPlace(callback){
    this.val = callback(this.val); 
    if (this.children.length){
      for (var i = 0; i < this.children.length; i++){
        this.children[i].mapInPlace(callback); 
      }
    }
  }
}

var x = new Tree(7);
var y = new Tree(4); 
y.addChild(new Tree(3));
x.addChild(y);
var z = new Tree(6);
z.addChild(new Tree(5));
x.addChild(z); 

console.log(x.depthFirstSearch(5));  
