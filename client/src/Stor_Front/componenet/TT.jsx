import React, { useContext } from 'react'
import { categorieContexte } from './Categorie'

export default function TT() {
    const data=useContext(categorieContexte);
    // console.log("dial ",data);
  return (
    <div>TT</div>
  )
}
