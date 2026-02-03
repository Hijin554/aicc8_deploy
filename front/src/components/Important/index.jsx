import React from 'react'
import Navbar from '../Common/Navbar'
import ItemPanel from '../Common/ItemPanel'

function index() {
  return (
    <div className="page_section">


      <Navbar />
      <ItemPanel pageTitle="Important Items" filterCompleted="all" filteredImportant={true} />

    </div>
  )
}

export default index