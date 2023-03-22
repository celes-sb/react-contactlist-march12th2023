import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Contactos = () => {
    const { store, actions } = useContext(Context)
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [lista, setLista] = useState(store.listaContactos)
    const [refresh, setRefresh] = useState(false)
    const [estadoTemporal, setEstadotemporal] = useState({})

    useEffect(() => { //cuando cargo la página me trae toda la lista
        let funcionCarga = async () => {
            // let { respuestaJson, response } = await actions.useFetch("/apis/fake/contact/agenda/agenda_de_antonio", null)
            // console.log(respuestaJson)
            // setLista(respuestaJson)
            actions.funcionCarga()
        }
        funcionCarga() //aquí llamo a la función asíncrono

    }, [refresh])

    useEffect(() => { }, [lista, nombre])

    return (<>
        <div className="container-fluid ms-2">
            <div className="row p-5">
                <div className="col-md-12 d-flex justify-content-end">
                    <button className="btn btn-success">
                        <Link to="/add-contact" style={{ color: 'white' }}>Add a new contact</Link>
                    </button>
                </div>
            </div>
            <div className="row d-flex justify-content-center w-100">
                <div className="col-12 col-md-8 col-lg-6 w-100 border">
                    <ul className="list-group">
                        {store.listaContactos && store.listaContactos.length > 0 ? (
                            store.listaContactos.map((item, index) => {
                                return (
                                    <div key={index} className="row border-bottom py-3">
                                        <div className="col-2">
                                            <img className="img-thumbnail" src="https://cdn140.picsart.com/276225486010201.jpg?type=webp&to=crop&r=256"></img>
                                        </div>
                                        <div className="col-8">
                                            <h3 className="mb-3">{item.full_name}</h3>
                                            <p className="text-secondary"><i className="fa-solid fa-location-arrow"></i><span className="ms-3">{item.address}</span></p>
                                            <p className="text-secondary"><i className="fa-solid fa-at"></i><span className="ms-3">{item.email}</span></p>
                                            <p className="text-secondary"><i className="fa fa-phone-flip"></i><span className="ms-3">{item.phone}</span></p>
                                        </div>
                                        <div className="col-2 d-flex align-items-center justify-content-end">
                                            <button
                                                className="btn btn-lg text-success m-2"
                                                button="button"
                                                onClick={() => {
                                                    console.log(item.full_name);
                                                    const nombrePrompt = prompt("Enter new name:", item["full_name"]);
                                                    const emailPrompt = prompt("Enter new email:", item.email);
                                                    const phonePrompt = prompt("Enter new phone number:", item.phone);
                                                    const addressPrompt = prompt("Enter new address:", item.address);
                                                    let obj = {
                                                        "full_name": nombrePrompt,
                                                        "email": emailPrompt,
                                                        "agenda_slug": "agenda_de_antonio",
                                                        "address": addressPrompt,
                                                        "phone": phonePrompt
                                                    }
                                                    actions.putFetch(item.id, obj);
                                                }}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-lg m-2 text-danger"
                                                type="button"
                                                onClick={async () => {
                                                    actions.deleteContact(index);
                                                    /*if (window.confirm("Are you sure you want to delete this contact?")) {
                                                        actions.useFetch(`/apis/fake/contact/${item.id}`, null, "DELETE");
                                                        const updatedLista = lista.filter((contact) => contact.id !== item.id);
                                                        setLista(updatedLista);
                                                    }*/
                                                }}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>

                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-3">This contact list is empty</div>
                        )}
                    </ul>
                </div>
            </div>
        </div >
    </>)
}

export default Contactos;