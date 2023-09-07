import React, { useEffect } from 'react'

function CustomGrid({ gHeaders = [], list }) {

    const getWidth = (w, i) => {
        return { width: w, justifyContent: (i === gHeaders.length - 1) ? 'end' : 'start' }
    }
    const dividerCls = 'divide-y divide-gray-200 ';
    const rowCls = 'flex flex-row py-1 h-10 justify-between items-center gap-1 '
    useEffect(() => {

    }, [gHeaders]);
    return (
        <section className={'flex flex-col ' + dividerCls}>
            <div className={rowCls + 'text-xs text-slate-500 uppercase'}>
                {
                    gHeaders.map((h, i) => (
                        <div key={i} style={getWidth(h.width)}>{h.name}</div>
                    ))
                }
            </div>
            <div className={'flex flex-col ' + dividerCls}>
                {
                    list?.map((item, index) => (
                        <div key={index} className={rowCls + "text-sm capitalize"}>
                            {
                                gHeaders.map((h, j) => (
                                    <div key={j} className='flex flex-row' style={getWidth(h.width, j)}>{item[h.key]}</div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default CustomGrid