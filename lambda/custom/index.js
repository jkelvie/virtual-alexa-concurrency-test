/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const cookbook = require('./alexa-cookbook.js');



//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================


const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
	  
    const request = handlerInput.requestEnvelope;
    const speechOutput = "Hi"

	if (request.instance !== request.context.System.device.deviceId) {
		throw Error("This should not happen - device IDs do not match");
	}
	//console.log("Request: " + JSON.stringify(request, null, 2));
	console.log(`[index][handler]: deviceId = ${request.context.System.device.deviceId} From: ${request.instance}`);
    return handlerInput.responseBuilder
      .speak(speechOutput)
	  .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler
  )
  .lambda();

