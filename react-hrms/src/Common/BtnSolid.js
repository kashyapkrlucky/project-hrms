import React from 'react'
import { bgTheme } from '../Utils/Classes'

function BtnSolid({ label, classes = `${bgTheme} hover:${bgTheme}`, ...others }) {
    return (
        <button {...others} className={`rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-sm ` + classes}>{label}
        </button>
    )
}

export default BtnSolid
