import React from 'react'
import './user_info.css'

export default function doctorInfo({ doctorInfo = [] }) {
  return (
    <div id='outer-box'>
        <div id='inner-box-info'>
          <ul>
            {doctorInfo.map((doctorInfo) => {
              return (
                <li key={doctorInfo.label}><label id={doctorInfo.label_id}>{doctorInfo.label}</label><span id={doctorInfo.value_id}>{doctorInfo.value}</span></li>
              ) 
            })}
          </ul>
        </div>
    </div>
  )
}