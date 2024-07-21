import React, {useId, useState} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    labelColor,
    ...props
}, ref){
    const id = useId()

    return (
        <div className='w-full'>
            {label && <label 
            className={`inline-block mb-1 pl-3 ${labelColor} font-semibold`} 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-green-100 text-black outline-none focus:bg-gray-50 border-b-2 border-white focus:border-emerald-700 duration-200 w-full ${className} placeholder:text-[#417e6a71]`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input