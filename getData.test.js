const axios = require("axios")




const getData = async ()=>{
    try {
        const response = await axios.get(`http://localhost:5000/api/detailOrder`)
        const userIds = response.data
        return 
        
    } catch (error) {
        
    }
}


jest.mock("axios")

describe(`getData`, ()=>{
    let response =""
    test(`asdf`, ()=>{
        axios.post.mockReturnValue(response)
    })
})