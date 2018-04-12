// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
let defaultColor = $("#colorPicker").val();

function validateInput(rows,columns) {
    if(rows > 0 && columns > 0) {
        return true;
    } else {
        return false;
    }
}

function showError() {
    alert("Please enter proper input");
}

/* Make Grid function to prepare the pixel cells */
function makeGrid(rows,columns) {
    console.log("Making Grid with "+rows+" rows and "+columns+" columns.");
    let table = $("#pixelCanvas");
    table.html("");
    /* Prepare rows and columns */
    for(let i=0;i<rows;i++) {
        let tr = "", td = "";
        tr += "<tr>";
        for(let j=0;j<columns;j++) {
            td += "<td class='pixel'></td>"
        }
        tr += td;
        tr += "</tr>";
        table.append(tr);
    }
}

/* Function that applies color to clicked/selected pixel block */
function applyColor(pixelBlock) {
    $(pixelBlock).css("background-color",defaultColor);
}

$(function() {
    let sizePickerForm = $("#sizePicker");
    sizePickerForm.on("submit",function(evt) {
        evt.preventDefault();
        let rows, columns, valid = false;
        rows = $("#inputHeight").val();
        columns = $("#inputWeight").val();
        valid = validateInput(rows,columns);
        if(valid) {
            makeGrid(rows,columns);
        } else {
            showError();
        }
    });

    $("#colorPicker").on("change",function() {
        defaultColor = $(this).val();
    });

    $("#pixelCanvas").on("click",".pixel",function(evt) {
        let pixelBlock = evt.target;
        applyColor(pixelBlock);
    });


    /* Multiselection with drag */
    let clicking = false;
    
    $("#pixelCanvas").on("mousedown",".pixel",function() {
        clicking = true;
    });
    
    $(document).mouseup(function(){
        clicking = false;
    });

    $("#pixelCanvas").on("mousemove",".pixel",function(evt) {
        if(clicking == false) return;
        
        // Mouse click + moving logic here
        let pixelBlock = evt.target;
        applyColor(pixelBlock);
    });
    
});