const sum = require("./sum");
const router = require("./routes/order.routes");
const filterArray = require("./test2")


describe("Моя проверка", () => {
  const testCase = [
    { inString1: 22, inString2: 22, expected: 44 },

    { inString1: 11, inString2: 33, expected: 44 },
    { inString1: "11", inString2: "33", expected: "1133" },
  ];


  testCase.forEach(test =>{
    it(`Входящая строка ${test.inString1} waits ${test.expected} `,
    () => {const res= sum(test.inString1, test.inString2 )
           expect(res).toBe(test.expected) }
    
    )
  })
});
