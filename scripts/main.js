const API_URL = "https://654a39ffe182221f8d52c3d3.mockapi.io/users/"; //Link para traer los datos, si o si poner la barra del final o no toma el ID
const list = document.getElementById("results");

// Funcion que lista los productos que obtiene a traves del parametro arr.

function listProducts(arr) {
    list.innerHTML = "";
    arr.forEach(user => {
        let li = document.createElement("li");
        li.innerHTML =
            `
            <p>ID: ${user.id}</p>
            <p>NAME: ${user.name}</p>
            <p>LASTNAME: ${user.lastname}</p>
            `
        list.appendChild(li);
    });
}

// Funcionalidad para mostrar el boton

document.getElementById("inputDelete").addEventListener("input", function (event) {
    if (document.getElementById("inputDelete").value) {
        document.getElementById("btnDelete").removeAttribute("disabled");
    } else {
        document.getElementById("btnDelete").setAttribute("disabled", "disabled");
    }
});

document.getElementById("inputPutId").addEventListener("input", function (event) {
    if (document.getElementById("inputPutId").value) {
        document.getElementById("btnPut").removeAttribute("disabled");
    } else {
        document.getElementById("btnPut").setAttribute("disabled", "disabled");
    }
});

function btnEvent(event) {
    if (document.getElementById("inputPostNombre").value && document.getElementById("inputPostApellido").value) {
        document.getElementById("btnPost").removeAttribute("disabled");
    } else {
        document.getElementById("btnPost").setAttribute("disabled", "disabled");
    }
};

document.getElementById("inputPostNombre").addEventListener("input", btnEvent);
document.getElementById("inputPostApellido").addEventListener("input", btnEvent);


// metodos GET / POST / PUT / DELETE

//GET
document.getElementById("btnGet1").addEventListener("click", function (event) {
    const ID = document.getElementById("inputGet1Id").value;
    list.innerHTML = "";

    if (ID !== "") {
        fetch(API_URL + ID)
            .then(response => {
                if (response.ok) {
                    document.getElementById("alert-error").classList.add("fade");
                    return response.json();
                } else {
                    document.getElementById("alert-error").classList.remove("fade");
                }
            })
            .then(data => {
                // Paso el user como array
                listProducts([data]);
            })
            .catch(error => console.log(error.message));
    } else {
        fetch(API_URL)
            .then(response => {
                if (response.ok) {
                    document.getElementById("alert-error").classList.add("fade");
                    return response.json();
                } else {
                    document.getElementById("alert-error").classList.remove("fade");
                }
            })
            .then(data => {
                listProducts(data);
            })
            .catch(error => console.log(error.message));
    }
});

//POST
document.getElementById("btnPost").addEventListener("click", function (event) {
    const name = document.getElementById("inputPostNombre").value;
    const lastname = document.getElementById("inputPostApellido").value;

    let data = {
        "name": name,
        "lastname": lastname
    };

    let miInicializador = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    fetch(API_URL, miInicializador)
        .then(response => {
            if (response.ok){
                document.getElementById("alert-error").classList.add("fade");
            } else {
                document.getElementById("alert-error").classList.remove("fade");
            }
            fetch(API_URL)
                .then(response => response.json())
                .then(data => {
                    listProducts(data);
                })
                .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));

});

//PUT
document.getElementById("btnSendChanges").addEventListener("click", function (event) {
    const ID = document.getElementById("inputPutId").value;
    const name = document.getElementById("inputPutNombre").value;
    const lastname = document.getElementById("inputPutApellido").value;

    let data = {
        "name": name,
        "lastname": lastname
    };

    let miInicializador = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };


    fetch(API_URL + ID, miInicializador)
        .then(response => {
            fetch(API_URL)
                .then(response => response.json())
                .then(data => {
                    listProducts(data);
                })
                .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));

    // Borrar string de los inputs
    document.getElementById("inputPutNombre").value = "";
    document.getElementById("inputPutApellido").value = "";

});

//DELETE
document.getElementById("btnDelete").addEventListener("click", function (event) {
    const userID = document.getElementById("inputDelete").value;
    if (!userID) {
        console.error("Debe ingresar un id existente");
        return;
    }

    const requestOptions = {
        method: 'DELETE',
    };

    fetch(API_URL + userID, requestOptions)
        .then(response => {
            if (response.ok){
                document.getElementById("alert-error").classList.add("fade");
            } else {
                document.getElementById("alert-error").classList.remove("fade");
            }
            fetch(API_URL)
                .then(response => {
                    if (response.ok){
                        return response.json()
                    }
                })
                .then(data => {
                    listProducts(data);
                })
                .catch(error => console.log(error.message));
        })
})
