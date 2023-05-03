import { BsCircle, BsXLg } from "react-icons/bs"

const Box = (props) => {
    return (
        <div className="bg-zinc-800 h-38 w-38 rounded-lg flex justify-center items-center"
        onClick={props.onClick}>
            {props.boxValue == 1 ? <BsCircle className="text-5xl h-12"/> : <div className="h-12"></div>}
            {props.boxValue == 2 ? <BsXLg className="text-5xl h-12"/> : <div className="h-12"></div> }
        </div>
    )
}

export default Box