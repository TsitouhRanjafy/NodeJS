import { createServer } from 'node:http';
import  assert, { AssertionError }  from 'assert';


function executeTests () {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

    assertStrictEquality(0,1)

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

    assertStrictEquality(0,1,"0 and 1 are not equal!")

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

    assertStrictEquality(1,1)

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

}
executeTests();

function assertStrictEquality (a,b, message = null) {
    try {
        // Output test.
        console.log(`------------ ASSERTING: ${a} === ${b} ------------`)
        // Assert equality of a and b parameters.
        assert.strictEqual(a,b,message);
        // Output confirmation of successful assertion.
        console.log(`------------ CONFIRMED: ${a} === ${b} ------------`)

    } catch (error) {
        if (error instanceof AssertionError) {
            // Output expected AssertionError
            console.log(error)
        } else {
            // Output unexpected Errors.
            console.log(error)
        }
    }

}

const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})