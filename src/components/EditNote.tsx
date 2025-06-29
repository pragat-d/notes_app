import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditNote = () => {

    type notesProp = {
        id: number;
        text: string;
        subject: string;
    };

    interface messageProp {
        show: boolean
        message: string
        color: string
    }


    const router = useNavigate();


    const location = useLocation();

    const note: notesProp = location.state;

    const [id,setId] = useState(note.id);

    const [subject, setSubject] = useState(note.subject);

    const [text, setText] = useState(note.text);

    const [message, setMessage] = useState<messageProp>({
        show: false,
        message: "",
        color: ""
    });



    const goBack = () => {
        router("/")
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const note = {
            id: id,
            subject: subject,
            text: text
        };

        try {

            const response = await axios.patch("http://localhost:8080/notes/editNote", note, {
                headers: {
                    "Content-Type": "application/json"
                }
            });


            if (response.data === "success") {

                setMessage({
                    show: true,
                    message: "Note Updated",
                    color: "green"
                })

                setTimeout(() => {
                    router("/");
                }, 1500);

            } else {

                e.preventDefault();

                setMessage({
                    show: true,
                    message: "Note Failed to Update",
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
        } catch (error) {

            e.preventDefault();
            console.error("Error while updating note:", error);
            setMessage({
                show: true,
                message: "An error occurred while updating.",
                color: "red"
            });

        }

    }

    return (
        <div>
            <h1>Edit Note</h1>

            <form onSubmit={(e) => handleSubmit(e)}>

                <h2> Title </h2>

                {

                    message.show && (<section style={{ color: message.color, fontWeight: "bold" }}> {message.message} <br /><br /></section>)
                }

                <section>
                    <input type="text" placeholder="subject" value={subject} maxLength={10} onChange={(e) => setSubject(e.target.value)} />
                </section>
                <br></br>

                <h2>Note </h2>
                <section>
                    <textarea rows={10} value={text} placeholder="Type your note (Max : 100 character)" maxLength={100} onChange={(e) => setText(e.target.value)} />
                </section>

                <button type="button" onClick={() => goBack()}>
                    Back
                </button>

                <button type="submit">
                    Submit
                </button>

            </form>
        </div>
    )
}

export default EditNote;