document.addEventListener("DOMContentLoaded", function(event) {
  var treeContainer = document.getElementById('treeContainer');
  var counter = 1;
  bfs(document);
  function bfs(root) {
    var queue = [];
    var container = treeContainer;
    root.containerId = 'treeContainer';

    queue.push(root);

    while(queue.length != 0) {
      var l = queue.shift();
      container = document.getElementById(l.containerId);
      if(l.childElementCount == 0)
        addLeaf(container, l);
      else {
        var containerId = addCTree(container, l);
      }

      for(var i = 0; i < l.childElementCount; i++) {
        if(l.children[i] == treeContainer) {
          continue;
        }
        if(!l.children[i].visited) {
          l.children[i].visited = true;
          l.children[i].containerId = containerId;
          queue.push(l.children[i]);
        }
      }
    }
  }

  function addCTree(container, node) {
    var isRoot = node.parentNode == null;
    var name = (isRoot) ? 'ROOT' : node.tagName;

    var ul = document.createElement('ul');
    var span = document.createElement('span');

    var id = "container" + counter++;
    ul.className = "node-container";
    span.className = 'x' + name.toLowerCase();
    ul.setAttribute("id", id);
    span.innerHTML  = name;

    if (isRoot) {
      container.appendChild(span);
      container.appendChild(ul);
    } else {
        var li = document.createElement('li');
        li.appendChild(span);
        li.appendChild(ul);
        container.appendChild(li);
    }
    return id;
  }
  
  function addLeaf(container, node){
    var li = document.createElement('li');
    li.innerHTML = '<span class="'  + 'x' + node.tagName.toLowerCase() + '">'+ node.tagName + '</span>';
    container.appendChild(li);
  }
});
