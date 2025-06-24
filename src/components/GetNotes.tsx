import axios from "axios"
import { useEffect, useState } from "react"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";

const GetNotes = () => {

    const router = useNavigate();

    interface notesProp {
        id: number
        subject: string
        text: string
    }

    const [notes, setNotes] = useState<notesProp[] | null>([]);


    const getNotes = async () => {

        const response = await axios.get("http://localhost:8080/notes/getAllNotes")

        setNotes(response.data)

    }

    useEffect(() => {
        getNotes();
    }, []);


    const editNote = (note : notesProp) => {

        router("/editNote",{state: note})

    }




    return (
        <div>
            <h1>Notes</h1>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-around" }}>
                {
                    notes?.map((note) => (
                        <section key={note.id} style={{
                            width: "200px",
                            backgroundColor: "lightyellow",
                            padding: "1rem",
                            borderRadius: "8px",
                            boxShadow: "0 0 5px rgba(1,1,0,0.5)"
                        }}>


                            <section style={{ display: "flex", justifyContent: "space-between", width:"100%" }}>
                                <button onClick={() => editNote(note)}> <CiEdit /></button>

                                <p style={{ fontWeight: "bold", margin:0 }}>{note.subject}</p>

                                <button> <MdDelete /></button>
                            </section>

                            <p>{note.text}</p>

                        </section>
                    ))
                }
            </div>

        </div>
    )

}

export default GetNotes