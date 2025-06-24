import { useLocation } from "react-router-dom";

const EditNote = () => {

    type notesProp = {
        id: number;
        text: string;
        subject: string;
    };


    const location = useLocation();

    const note : notesProp = location.state;

    console.debug("Here is the Note " + note);
    

    return (
        <div>
            <h1>Edit Note</h1>

            <h1>{note.subject}</h1>
        </div>
    )
}

export default EditNote;