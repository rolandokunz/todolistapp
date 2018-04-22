function get_todolist(){

    var todolist = [];

    var todolist_str = localStorage.getItem('newtask');

    if (todolist_str !==null){
        todolist = JSON.parse(todolist_str);
    }

    return todolist;
}

function get_prioritylist(){

    var prioritylist = [];

    var prioritylist_str = localStorage.getItem('priority');

    if (prioritylist_str !==null){
        prioritylist = JSON.parse(prioritylist_str);
    }

    return prioritylist;
}

function add_newtask(){

    var newtask = document.getElementById('newtask').value;
    var priority = document.getElementById('priority').value;
    var todolist = get_todolist();
    var prioritylist = get_prioritylist();

    if(newtask !==""){  
        todolist.push(newtask);
        prioritylist.push(priority);
    } else{
        alert("Remember to add a new task");
    }

    localStorage.setItem('newtask', JSON.stringify(todolist));
    localStorage.setItem('priority', JSON.stringify(prioritylist));
  
    show();
    return false;
}

function clearDefault(a){
    if (a.defaultValue==a.value){
        a.value="";
    }
};

function remove_task(){

    var id = this.getAttribute('id');
    var todolist = get_todolist();
    var prioritylist = get_prioritylist();

    todolist.splice(id,1);
    prioritylist.splice(id,1);

    localStorage.setItem('newtask', JSON.stringify(todolist));
    localStorage.setItem('priority', JSON.stringify(prioritylist));
    
    show();
    return false;
}

function show(){
    
    var todolist = get_todolist();
    var prioritylist = get_prioritylist();
    var normalCounter = 0;
    var importantCounter =0;
    var urgentCounter=0;

    var todoCounter = todolist.length;

    var html = '<tbody>';
    for(var i=0; i<todolist.length; i++){
    
        html += '<tr  id=" ' + i + '" >'
        + '<td style="width:60%;">' + todolist[i] + '</td>'
        + '<td>' + prioritylist[i] + '</td>'
        + '<td> <span class="remove" id=" ' + i + '"> </span>'
        +'</td></tr>';

        if(prioritylist[i]=="normal"){
            normalCounter++;
        } else if(prioritylist[i]=="important"){
            importantCounter++;
        }  else if(prioritylist[i]=="urgent"){
            urgentCounter++;
        }
    };
    html += '</tbody>';

    document.getElementById('newtask').value="";
    document.getElementById('priority').value="normal";

    document.getElementById('todolist').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    for(var i=0; i<buttons.length; i++){
        buttons[i].addEventListener('click', remove_task);
    };

    document.getElementById('todo-counter').innerHTML = todoCounter;
    document.getElementById('normal-counter').innerHTML = normalCounter;
    document.getElementById('important-counter').innerHTML = importantCounter;
    document.getElementById('urgent-counter').innerHTML = urgentCounter;

   if(todolist.length>=2){
    document.getElementById('deleteall').style.display="inline";  
   } else {
    document.getElementById('deleteall').style.display="none";  
   }

}

function delete_all(){

    var deleteAccept = confirm("Delete everything?");

    if(deleteAccept){
        localStorage.clear();
        show();
    }
 
}

function fullDate(){
    var date = new Date();
    return date.toDateString();
}

document.getElementById('add').addEventListener('click', add_newtask);
document.getElementById('deleteall').addEventListener('click', delete_all);


document.getElementById('today-date').innerHTML = fullDate();

show();

