function Node(value){
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
  this.color = 'RED';
  this.isNil = false;
}

function RBT(){
  
  this.nil = new Node('n');
  this.nil.color = 'BLACK';
  this.nil.isNil = true;
  this.root = this.nil;
 
}


RBT.prototype.leftRotate = function(node){
      var y = node.right;
        node.right = y.left;
        if (!y.left.isNil) {
            y.left.parent = node;
        }
        if (!y.isNil) y.parent = node.parent;
        if (node.parent) {
            if (node == node.parent.left) {
                node.parent.left = y;
            }
            else {
                node.parent.right = y;
            }
        } else {
            this.root = y;
        }

        y.left = node;

        if (!node.isNil) node.parent = y;
    };



RBT.prototype.rightRotate = function(node){
        var y = node.left;

        node.left = y.right;
        if (!y.right.isNil) y.right.parent = node;

        if (!y.isNil) y.parent = node.parent;
        if (node.parent) {
            if (node == node.parent.right)
                node.parent.right = y;
            else
                node.parent.left = y;
        } else {
            this.root = y;
        }


        y.right = node;
        if (!node.isNil) node.parent = y;

};



RBT.prototype.insert = function(value) {
  var node = new Node(value);
  var parent = null;
  var current = this.root;


  while (current.isNil === false) {
    if (value === current.value) {
      return current;
    }
    parent = current;
    if (value < current.value) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  node.parent = parent;

  if (parent) {
    if (node.value < parent.value)
      parent.left = node;
    else
      parent.right = node;

  } else {
    this.root = node;
  }
  node.left = this.nil;
  node.right = this.nil;
  this.insertFixup(node);

};


RBT.prototype.insertFixup = function(node) {

  while (node !== this.root && node.parent.color === 'RED'){

    if (node.parent === node.parent.parent.left){
      var y = node.parent.parent.right;

      if (y.color === 'RED'){
        node.parent.color = 'BLACK';
        y.color = 'BLACK';
        node.parent.parent.color = 'RED';
        node = node.parent.parent;
      }else {
        if (node === node.parent.right){
        node = node.parent;
        this.leftRotate(node);
      }
      node.parent.color = 'BLACK';
      node.parent.parent.color = 'RED';

      this.rightRotate(node.parent.parent);
      }

    }else {
      var y = node.parent.parent.left;
      
      if (y.color === 'RED'){
        node.parent.color = 'BLACK';
        y.color = 'BLACK';
        node.parent.parent.color = 'RED';
        node = node.parent.parent;
      }else {
        if(node === node.parent.left){
          node = node.parent;
          this.rightRotate(node);
        }
        node.parent.color = 'BLACK';
        node.parent.parent.color = 'RED';

        this.leftRotate(node.parent.parent);
      }
    }
  }
  this.root.color = 'BLACK';

};



RBT.prototype.toArray = function(){
  
  var results = [];
  
  (function recurse(node){
    
    if (node === null){
      return;
    }
    if(node.value !== 'n'){
      results.push([node.value,node.color]);
    }
//     results.push([node.value,node.color]);
    recurse(node.left); 
    recurse(node.right); 
  })(this.root);
  
  return results;
};





var test = new RBT();

test.insert(11);
test.insert(2);
test.insert(14);
test.insert(1);
test.insert(7);
test.insert(15);
test.insert(5);
test.insert(8);
test.insert(4);
console.log(test.toArray());





