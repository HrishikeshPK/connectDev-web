import { createSlice } from "@reduxjs/toolkit"

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnections: (state, acton) => acton.payload,
        removeConnections: () => null
    }
})

export const { addConnections, removeConnections } = connectionSlice.actions

export default connectionSlice.reducer