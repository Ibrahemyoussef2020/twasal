"use client";

const Textarea = ({setText}) => {
  
  return (
    <textarea
      onChange={(e)=>  setText(e.target.value)} 
      className="outline-none py-2 pr-3 pl-2 resize-none w-full text-xl" name="upload" id="upload" placeholder='سجل أفكارك...'>

    </textarea>
  )
}

export default Textarea