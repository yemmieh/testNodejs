const axios = require('axios');
const { TestScheduler } = require('jest')
const functions = require('../functions')

// describe('POST@/posts', () => {
//     it('should be able to create request',async (req, res) =>{
//         const result = await axios.post('http://localhost:3000/posts/',{
//             title:"jest title",
//             description:"jest description"
//         })
//         console.log('result', result)
//     })
// })

test('add 2 = 2 equal 4',()=>{
    expect(functions.add(2,2)).toBe(4);
})