import { FC, useState } from "react";
import './rating.css';
import { AngryFaceIcon, LaughingFaceIcon, SendIcon, SlightlyAngryFaceIcon, SlightlySmilingFaceIcon, SmilingFaceWithHeartIcon } from "../../../assets/icons";

interface RatingProps {
}

const Rating:FC<RatingProps> = (props): JSX.Element => {
    const [selectedRate, setSelectedRate] = useState('')

    return(
        <div className="rating_container">
            <header> Rate your conversation with the us </header>
            <div className="rating_box">
                <div className="rating_icon_container">
                    <div onClick={() => setSelectedRate("angry")} className={`rating_icon_box ${selectedRate === "angry" && "selected_rating"} `}>
                        <AngryFaceIcon style={"rating_icon"} />
                    </div>
                    <div onClick={() => setSelectedRate("slightlyangry")} className={`rating_icon_box ${selectedRate === "slightlyangry" && "selected_rating"} `}>
                        <SlightlyAngryFaceIcon style={"rating_icon"} />
                    </div>
                    <div onClick={() => setSelectedRate("slightlysmiling")} className={`rating_icon_box ${selectedRate === "slightlysmiling" && "selected_rating"} `}>
                        <SlightlySmilingFaceIcon style={"rating_icon"} />
                    </div>
                    <div onClick={() => setSelectedRate("laughingface")} className={`rating_icon_box ${selectedRate === "laughingface" && "selected_rating"} `}>
                        <LaughingFaceIcon style={"rating_icon"} />
                    </div>
                    <div onClick={() => setSelectedRate("smilingfacewithheart")} className={`rating_icon_box ${selectedRate === "smilingfacewithheart" && "selected_rating"} `}>
                        <SmilingFaceWithHeartIcon style={"rating_icon"} />
                    </div>
                </div>
                {selectedRate.length > 0 &&
                <div className="rating_form">
                    <input type="text" className="rating_input" />
                    <div className="rating_button">
                        <SendIcon style="" />
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Rating;