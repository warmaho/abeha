import React from 'react'
import Dropzone from './Dropzone'
import { AppContextProvider } from './context'

export default function App() {
  return (
    <AppContextProvider>
        <div className="container">
            <div className="row justify-content-center fixed-bottom dropzone" >
                <div className="col-md-6 col-sm-12">
                    <Dropzone status={1} />
                </div>
            </div>
            <div className="row mt-4" style={{marginBottom:"210px"}}>
            <div className="col-12">
                <Dropzone status={2} />
            </div>
            </div>
        </div>
    </AppContextProvider>
  )
}
