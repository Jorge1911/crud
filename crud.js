import {
    getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
 } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
 import { app } from "./firebase.js";

const db=getFirestore(app);
const coleccion=collection(db,"alumnos");

let editStatus = false;
let id = "";

const onGetAlumnos= (callback) => onSnapshot(coleccion, callback);


window.addEventListener("DOMContentLoaded", async (e) => {
    
    onGetAlumnos((querySnapshot)=>{
        const divAlumnos=document.querySelector("#lista");
        divAlumnos.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const alumno = doc.data();
            divAlumnos.innerHTML += `
                <tr class="table-dark">
                    <td class="table-dark">${alumno.marca}</td>
                    <td class="table-dark">${alumno.modelo}</td>
                    <td class="table-dark">${alumno.memoria}</td>
                    <td class="table-dark">${alumno.procesador}</td>
                    <td class="table-dark"> ${alumno.ram}</td>
                    <td class="table-dark">${alumno.pixeles}</td>
                    <td class="table-dark"><button class="btn btn-danger btnEliminarAlumno" data-id="${doc.id}"><i class="bi bi-trash"></i></button></td>
                    <td class="table-dark"><button class="btn btn-primary btnEditarAlumno" data-bs-toggle="modal" data-bs-target="#editModal"   data-id="${doc.id}"><i class="bi bi-pencil"></i></button></td>
                    <td class="table-dark"><button class="btn btn-warning btnQRalumno" data-bs-toggle="modal" data-bs-target="#qrModal"   data-id="${doc.id}"><i class="bi bi-qr-code"></i></button></td>
                    </tr>`;
        });
 
        const btnQRAlumno = document.querySelectorAll(".btnQRalumno");
        btnQRAlumno.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    id=btn.dataset.id;
                    console.log(id);
                    const data= await getDoc(doc(db, "alumnos", id));
                    const alumno = data.data();                   
                            const contenedorQR =document.getElementById('aquimero');
                            contenedorQR.innerHTML=""
                            const QR = new QRCode (contenedorQR);
                            QR.makeCode(id);
                            
                        } catch(error){
                            console.log(error);
                        }
                    });
                });
        const btnsDelete = document.querySelectorAll(".btnEliminarAlumno");
        //console.log(btnsDelete);
        btnsDelete.forEach((btn,idx) =>
            btn.addEventListener("click", () => {
                id=btn.dataset.id;
                console.log(btn.dataset.id);
                Swal.fire({
                    title: 'Estás seguro de eliminar este producto?',
                    showDenyButton: true,
                    confirmButtonText: 'Si',
                    denyButtonText: `No`,
                }).then(async(result) => {
                    try {
                        if (result.isConfirmed) {
                            await deleteDoc(doc(db, "alumnos", id));
                            Swal.fire("REGISTRO ELIMINADO!!!");
                        }                         
                    } catch (error) {
                        Swal.fire("ERROR AL ELIMINAR REGISTRO");
                    }
                })       
            })
        );

        const btnsEdit = document.querySelectorAll(".btnEditarAlumno");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    id=btn.dataset.id;
                    console.log(id);
                    const data= await getDoc(doc(db, "alumnos", id));
                    const alumno = data.data();
                    document.querySelector("#emarca").value=alumno.marca;
                    document.querySelector("#emodelo").value=alumno.modelo;
                    document.querySelector("#ememoria").value=alumno.memoria;
                    document.querySelector("#eprocesador").value=alumno.procesador;
                    document.querySelector("#eram").value=alumno.ram;
                    document.querySelector("#epixeles").value=alumno.pixeles;
                    editStatus = true;
                    id = data.id;
                } catch (error) {
                    console.log(error);
                }
            });
        });

    });
    
});

const btnAgregarAlumno=document.querySelector("#btnGuardarAlumno");
btnAgregarAlumno.addEventListener("click",()=>{
    const marca=document.querySelector("#marca").value;
    const modelo=document.querySelector("#modelo").value;
    const memoria=document.querySelector("#memoria").value;
    const procesador=document.querySelector("#procesador").value;
    const ram=document.querySelector("#ram").value;
    const pixeles=document.querySelector("#pixeles").value;
    

    if(marca=="" || modelo=="" || memoria=="" || procesador=="" || ram==""|| pixeles==""){
        Swal.fire("falta llenar Campos");
        return;
    }

    const alumno={ marca, modelo, memoria,procesador,ram,pixeles};

    if (!editStatus) {
        addDoc(coleccion, alumno);        
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
    } 

    Swal.fire({
        icon: 'success',
        title: 'EXITO',
        text: 'Se guardo correctamente!'
    })
    document.querySelector("#formAddAlumno").reset();
});


const btnGuardarAlumno=document.querySelector("#btneditAlumno");
btnGuardarAlumno.addEventListener("click",()=>{
    const marca=document.querySelector("#emarca").value;
    const modelo=document.querySelector("#emodelo").value;
    const memoria=document.querySelector("#ememoria").value;
    const procesador=document.querySelector("#eprocesador").value;
    const ram=document.querySelector("#eram").value;
    const pixeles=document.querySelector("#epixeles").value;

    if(marca=="" || modelo=="" || memoria=="" || procesador=="" || ram=="" || pixeles==""){
        Swal.fire("falta llenar Campos");
        return;
    }

    const alumno={ marca, modelo, memoria,procesador,ram,pixeles};

    if (editStatus) {
        updateDoc(doc(db, "alumnos", id), alumno);
        editStatus = false;
        id = "";
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }

    Swal.fire({
        icon: 'success',
        title: 'EXITO',
        text: 'Se guardo correctamente!'
    })
    document.querySelector("#formEditAlumno").reset();
});
