import React, {useId, useState} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    labelClassname,
    ...props
}, ref){
    const id = useId()

    return (
        <div className='w-full'>
            {label && <label 
            className={`inline-block mb-1 pl-3 ${labelClassname}`} 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 border focus: duration-200 w-full ${className} placeholder:text-[#417e6a71]`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input