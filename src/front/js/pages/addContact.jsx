import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const AddContact = () => {
    const { store, actions } = useContext(Context)
    const [data, setData] = useState({})

    useEffect(() => { }, [data.full_name, data.phone, data.email])

    return (
        <div className="container-fluid d-flex flex-column align-items-center p-5 w-100">
            <div className="row pb-3 text-center">
                <h1>Add new contact information</h1>
            </div>
            <div className="row pb-3 w-100">Full Name
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter full name"
                    name="full_name"
                    value={data.full_name}
                    onChange={(e) => setData({ ...data, full_name: e.target.value })}
                />
            </div>
            <div className="row pb-3 w-100">Address
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter address"
                    name="address"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                />
            </div>
            <div className="row pb-3 w-100">Phone Number
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter phone number"
                    name="phone"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
            </div>
            <div className="row pb-3 w-100">Email
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
            </div>
            <div className="row w-100 pb-3">
                <button
                    className="btn btn-sm mt-3 pb-2 btn-primary"
                    type="button"
                    onClick={() => {
                        actions.addContact(data);
                    }}
                >
                    Save
                </button>
            </div>
            <div className="row w-100 text-center">
                <br />
                <Link to="/">Return to contact list</Link>
                <br />
            </div>
            <button onClick={async () => {
                let { respuestaJson, response } = await actions.useFetch("/apis/fake/contact/",
                    {
                        full_name: data.full_name,
                        email: data.email,
                        agenda_slug: "agenda_de_antonio",
                        address: "47568 NW 34ST, 33434 FL, USA",
                        phone: data.phone
                    },
                    "POST"
                )
                if (!response.ok) {
                    alert("No se registró el contacto")
                    return
                }
                console.log("Contacto creado: \n", respuestaJson)
            }}>Boton con fetch</button>
        </div>)
}


export default AddContact;