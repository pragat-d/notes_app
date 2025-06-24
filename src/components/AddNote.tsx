import axios from "axios";
import { useState } from "react";

const AddNote = () => {

    interface messageProp {
        show: boolean
        message: string
        color: string
    }

    const [subject, setSubject] = useState<string>("");

    const [noteText, setNoteText] = useState<string>("");

    const [message, setMessage] = useState<messageProp>({
        show: false,
        message: "",
        color: ""
    });

    const addNote = async () => {

        const notes = {
            subject: subject,
            text: noteText
        };



        try {
            const response = await axios.post("http://localhost:8080/notes/addNote", notes, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.data === "success") {

                setMessage({
                    show: true,
                    message: "Note Added",
                    color: "green"
                })

            } else {

                setMessage({
                    show: true,
                    message: "Note Failed to Add",
                    color: "red"
                })

            }

            setTimeout(() => {
                setMessage(
                    {
                        show: false,
                        message: "",
                        color: ""
                    }
                )
            }, 3000);
            console.log(response)
        } catch (error) {
            console.log("Error adding Note :  ", error);
        }

        setSubject("");
        setNoteText("");

    }




    return (

        <div>
            <h1>Notes</h1>
            <form onSubmit={(e) => { e.preventDefault(); addNote(); }} >
                <section>
                    <input type="text" placeholder="subject" value={subject} maxLength={10} onChange={(e) => setSubject(e.target.value)} />
                </section>
                <br></br>
                <section>
                    <textarea value={noteText} placeholder="Type your note (Max : 100 character)" maxLength={100} onChange={(e) => setNoteText(e.target.value)} />
                </section>
                <br></br>


                {

                    message.show && (<section style={{ color: message.color, fontWeight: "bold" }}> {message.message} <br /><br /></section>)
                }


                <div>
                    <button type="submit" >
                        Add Note
                    </button>
                </div>
            </form>
        </div>

    )

}

export default AddNote;