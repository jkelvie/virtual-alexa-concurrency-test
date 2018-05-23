const va = require("virtual-alexa");

describe("concurrency test", () => {
	let alexa = null;
	let alexa2 = null;
	beforeEach(() => {
		alexa = new va.VirtualAlexaBuilder()
	        .handler('index.handler')
	        .interactionModelFile('../../models/en-US.json')
        .create();
    	
		alexa2 = new va.VirtualAlexaBuilder()
	        .handler('index.handler')
	        .interactionModelFile('../../models/en-US.json')
	        .create();

	    alexa.context().device().setID('test-device-id-1');
	    alexa2.context().device().setID('test-device-id-2');
		console.log("Initialized")
	});
	
	test("send many calls", (done) => {
		jest.setTimeout(10000);
		console.log("Calling");
		alexa.filter((request) => {
			request.instance = "test-device-id-1";
		});
		
		alexa2.filter((request) => {
			request.instance = "test-device-id-2";
		});
		keepCalling(alexa, 0);
		keepCalling(alexa2, 0, done);
	});
	
	test("send more calls", (done) => {
		jest.setTimeout(10000);
		console.log("Calling");
		alexa.filter((request) => {
			request.instance = "test-device-id-1";
		});
		
		alexa2.filter((request) => {
			request.instance = "test-device-id-2";
		});
		keepCalling(alexa, 0);
		keepCalling(alexa2, 0, done);
	});
	
	
});

function keepCalling(virtualAlexa, count, done) {
	virtualAlexa.launch().then(() => {
		setTimeout(() => {
			if (count < 10) {
				count++;
				keepCalling(virtualAlexa, count, done);
			} else {
				if (done) {
					done();
				}
			}
		}, 100);
	});
}