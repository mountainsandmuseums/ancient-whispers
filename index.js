/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require('ask-sdk-core');

const GetHaikuIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'GetHaikuIntent';
  },
  handle(handlerInput) {
    const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'topic');
    let factArr = [];

    if (slotValue === 'Greece') {
      factArr = greece;
    } else if (slotValue === 'Rome') {
      factArr = rome;
    } else if (slotValue === 'Egypt') {
      factArr = egypt;
    } else if (slotValue === 'the_Near_East') { 
      factArr = neareast; 
    } else {
      factArr = all;
    }

    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak(STOP_MESSAGE).getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Archaeo Haiku';
const GET_FACT_MESSAGE = ' ';
const HELP_MESSAGE = 'You can ask for a haiku, or ask specifically about Greece, Rome, or Egypt.';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

/*const greece = [
  'Bull of Marathon, Wild and raging, tamed by strength, Theseus shows his might.',
  'Periphetes, cruel, Club wielded with brutal force, Theseus brings him down.',
  'Tales of bravery, Amazons\' legacy told, Inspiring generations.',
  'Amazon queens lead, Wisdom guides their noble realm, Eternal glory.',
];*/

const greece = require('./greece') 

/*const rome = [
  'Rome\'s mighty embrace, Colosseum\'s grandeur stands, Empire\'s eternal.',
  'Roman aqueducts, Engineering marvels stand, Water\'s ancient flow.',
  'Julia, imperial, Raised to bear Rome\'s burden, Her life, a mosaic.',
  'Julia\'s light fades, Shadowed by her family\'s strife, Tragic princess\' tale.',
];*/

const rome = require('./rome') 

/*const egypt = [
  'Kingdom\'s collapse, Regional rulers emerge, Chaos and rebirth.',
  'Hyksos invaders, Foreign rule disrupts Egypt, Native pride endures.',
  'Amarna\'s embrace, Akhenaten\'s vision blooms, Sun\'s radiant grace.',
];*/

const egypt = require('./egypt') 

const neareast = require('./neareast') 

const all = require('./haiku')


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetHaikuIntentHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
