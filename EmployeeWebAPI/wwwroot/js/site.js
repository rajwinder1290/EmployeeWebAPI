// Web API URL
let url_address = '/api/Employees';
let edit_status = false;

function displayAllEmployees(options) {
    $.ajax({
        type: "GET",
        url: url_address,
        cache: false,
        success: function (data) {            
            const tableBody = $("#table_employee");
            $(tableBody).empty(); 
            if (data.length == 0) { 
                if (options) {
                    const tr = $("<tr></tr>");
                    tr.append('<td colspan="3" align="center">No Employee information</td>');
                    tr.appendTo(tableBody);
                } else {
                    const tr = $("<tr></tr>");
                    tr.append('<td colspan="5" align="center">No Employee information</td>');
                    tr.appendTo(tableBody);
                }                
            } else {
                $.each(data, function (key, item) {
                    const tr = $("<tr></tr>");
                    tr.append($("<td></td>").text(item.firstName + " " + item.lastName));
                    tr.append($("<td></td>").text(item.designation));
                    tr.append($("<td></td>").text("$" + item.salary));
                    if (options) {
                        tr.append($("<td></td>").append('<button class="btn btn-secondary" data-toggle="modal" data-target="#add_edit_dialog">Edit Record</button>')
                            .on("click", function () {
                                getEmployeeDetails(item.id);                                
                            })
                        );
                        tr.append($("<td></td>").append('<button class="btn btn-danger">Delete Record</button>')
                            .on("click", function () {
                                if (confirm("Are You Sure To Remove This Employee Details?")) {
                                    deleteEmployeeDetails(item.id);
                                }                                
                            })
                        );                    
                    }                    
                    tr.appendTo(tableBody)
                });
            }
        }
    });
}

function saveEmployee() {
    let fn = $('#firstname').val();
    let ln = $('#lastname').val();
    let dgn = $('#designation').val();
    let sal = parseFloat($("#salary").val());

    let employee = {
        firstName: fn,
        lastName: ln,
        designation: dgn,
        salary:sal
    };

    if (edit_status) {
        let empid = parseInt($("#emp_id").val());
        employee["id"] = empid;
        $.ajax({
            type: "PUT",
            url: url_address + "/" + empid,
            data: JSON.stringify(employee),
            contentType: "application/json; charset=utf-8"
        }).done(function (response) {
            $("#output").html("Employee Details is Updated!!!");
            displayAllEmployees(true);
        }).fail(function (xhr, status) {
            $("#output").html("Employee Details is not Updated!!!");
        });
    } else {
        $.ajax({
            type: "POST",
            url: url_address,
            data: JSON.stringify(employee),
            contentType: "application/json; charset=utf-8"
        }).done(function (response) {
            $("#output").html("Employee Details is Saved!!!");
            displayAllEmployees(true);
        }).fail(function (xhr, status) {
            $("#output").html("Employee Details is not Saved!!!");
        });
    }
}

function resetForm() {
    $("#model_title").html("Add Employee Details");
    $('#emp_id').val("");
    $('#firstname').val("");
    $('#lastname').val("");
    $('#designation').val("");
    $('#salary').val("");
    $('#output').html("");
    edit_status = false;
}

function getEmployeeDetails(id) {
    $.ajax({
        type: "GET",
        url: url_address + "/" + id,
        contentType: "application/json"
    }).done(function (employee) {
        $('#emp_id').val(employee.id);
        $('#firstname').val(employee.firstName);
        $('#lastname').val(employee.lastName);
        $('#designation').val(employee.designation);
        $('#salary').val(employee.salary);
        $("#model_title").html("Edit Employee Details");
        edit_status = true;
    });
}

function deleteEmployeeDetails(id) {
    $.ajax({
        type: "DELETE",
        url: url_address + "/" + id,
    }).done(function (response) {
        displayAllEmployees(true);
    });
}