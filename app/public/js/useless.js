var parent = "content-holder";

function font_maker() {
    checks = document.getElementsByClassName("checks");
    font_size = document.getElementById("text-size").value;
    font_color = document.getElementById("text-color").value;
    inline = document.getElementById("inline").checked;
    f = document.getElementById("fonts");
    font_family = f.options[f.selectedIndex].value;
    result = "<pre style='white-space:pre-wrap;'>";
    for (var i = 0; i < checks.length; i++) {
        if (checks[i].checked == true) {
            result = result.concat("<" + checks[i].value + ">");
        }
    }
    result = result+"here";
    for (var i = checks.length - 1; i >= 0; i--) {
        if (checks[i].checked == true) {
            result = result.concat("</" + checks[i].value + ">");
        }
    }
    result = result.concat("</pre>");
    element = document.createElement("div");
    element.id = Math.random().toString();
    element.innerHTML = result;
    document.getElementById(parent).after(element);
    document.getElementById(element.id).setAttribute("contenteditable", "true");
    document
        .getElementById(element.id)
        .setAttribute("onclick", `clicked(${element.id})`);
    document.getElementById(element.id).lastElementChild.style.fontSize = `${font_size}px`;
    document.getElementById(element.id).lastElementChild.style.color = font_color;
    document.getElementById(element.id).lastElementChild.style.fontFamily = font_family;
    if (inline) {
        document.getElementById(parent).style.display = "inline-block";
        document.getElementById(element.id).style.display = "inline-block";
    }
    parent = element.id;
}

function supervisor() {
    emptys = document.querySelectorAll('[id^="0."]');
    empty2 = document.getElementById("content-holder").textContent;
    emptys.forEach((element) => {
        if (element.textContent.length == 0) {
            setTimeout(function () {
                if (element.textContent.length == 0){
                    element.remove();
                    parent = document.getElementById("editor").lastElementChild.id;
                    console.log(parent);
                }
                            }, 3000);
        }
        
    });
    
}

function clicked(id) {
    parent = id;
}

function insert_image() {
    image = document.createElement("img");
    image_title = document.getElementById("file_title").value;
    image.src = `images/${image_title}.png`;
    image.id = "img" + Math.random().toString();
    image.setAttribute("onclick", `clicked(${image.id})`);
    image.setAttribute("onerror", `this.src = "http://localhost:8000/images/${image_title}.png"`);
    image.style.width = "91.5%";
    image.style.height = "auto";
    image.style.border = "1px solid black";
    image.style.marginLeft = "3.5%";
    image.style.marginRight = "3.5%";
    image.style.alignItems = "center";
    image.style.borderRadius = "2%";
    document.getElementById(parent).after(image);
    parent = image.id;
}

function insert_link() {
    a_tag = document.createElement("a");
    link = document.getElementById("inserted-url").value;
    text = document.getElementById("inserted-url").value;
    inline = document.getElementById("inline").checked;
    a_tag.href = link;
    a_tag.id = Math.random().toString();
    a_tag.setAttribute("onclick", `clicked(${a_tag.id})`);
    a_tag.textContent = document.getElementById("text-to-display").value;
    document.getElementById(parent).after(a_tag);
    if (inline) {
        document.getElementById(parent).style.display = "inline-block";
        document.getElementById(element.id).style.display = "inline-block";
    }
    parent = a_tag.id;
}

function insert_table() {
    font_size = document.getElementById("text-size").value;
    font_color = document.getElementById("text-color").value;
    f = document.getElementById("fonts");
    font_family = f.options[f.selectedIndex].value;
    rows = parseInt(document.getElementById("rows").value);
    columns = parseInt(document.getElementById("columns").value);
    table = document.createElement("table");
    table.id = Math.random().toString();
    table.setAttribute("onclick", `clicked(${table.id})`);
    table.setAttribute("border", "1px");
    table.setAttribute("contenteditable", "true");
    for (let index = 0; index < rows; index++) {
        tr = document.createElement("tr");
        tr.style.fontSize = `${font_size}px`;
        tr.style.color = font_color;
        tr.style.fontFamily = font_family;
        for (let index2 = 0; index2 < columns; index2++) {
            td = document.createElement("td");
            td.textContent = "-";
            td.style.fontSize = `${font_size}px`;
            td.style.color = font_color;
            td.style.fontFamily = font_family;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    table.style.fontSize = `${font_size}px`;
    table.style.color = font_color;
    table.style.fontFamily = font_family;
    document.getElementById(parent).after(table);
    parent = table.id;
}

function insert_list() {
    rows = parseInt(document.getElementById("rows-list").value);
    list = document.createElement("ol");
    list.id = Math.random().toString();
    list.setAttribute("onclick", `clicked(${list.id})`);
    list.setAttribute("border", "1px");
    list.setAttribute("contenteditable", "true");
    font_size = document.getElementById("text-size").value;
    font_color = document.getElementById("text-color").value;
    f = document.getElementById("fonts");
    font_family = f.options[f.selectedIndex].value;
    for (let index = 0; index < rows; index++) {
        li = document.createElement("li");
        li.textContent = `here${index}`;
        li.style.fontSize = `${font_size}px`;
        li.style.color = font_color;
        li.style.fontFamily = font_family;
        checks = document.getElementsByClassName("checks");
        result = "<pre>";
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked == true) {
                result = result.concat("<" + checks[i].value + ">");
            }
        }
        result = result + `here${index}`;
        for (var i = checks.length - 1; i >= 0; i--) {
            if (checks[i].checked == true) {
                result = result.concat("</" + checks[i].value + ">");
            }
        }
        result = result.concat("</pre>");
        li.innerHTML = result;
        list.appendChild(li);
    }
    list.style.fontSize = `${font_size}px`;
    list.style.color = font_color;
    list.style.fontFamily = font_family;
    document.getElementById(parent).after(list);
    parent = list.id;
}

function get_innerHtml() {
    document.getElementById("innerhtml").value = document.getElementById(
        "holder"
    ).innerHTML;
    innerhtml = document.getElementById("innerhtml").value;
    innerhtml = innerhtml.replace(/&quot;/gi, "'");
    innerhtml = innerhtml.replace(/"true"/gi, '"false"');
    document.getElementById("innerhtml").value = innerhtml;
}

function openNav(id) {
    document.getElementById(id).style.width = "35%";
    if (id == "mySidenav") {
        document.getElementById("mySidenav2").style.width = "0";
        document.getElementById("mySidenav4").style.width = "0";
    }
    if (id == "mySidenav2") {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("mySidenav4").style.width = "0";
    }
    if (id == "mySidenav4") {
        document.getElementById("mySidenav2").style.width = "0";
        document.getElementById("mySidenav").style.width = "0";
    }
}

function closeNav(id) {
    document.getElementById(id).style.width = "0";
}

setInterval(supervisor, 1000);