/****
OPAL WALLET for ELLA by OSOESE 2018 to be released under MIT license or whatever community thinks best
Light wallet with core functionality api built on meteor / electron to ease of use
This is ALPHA software and is my first meteor electon app use at your own risk until tested for security
****/
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';//need to explore functionallity of check

export const Tokens = new Mongo.Collection('ethereum_price_ticker');//collection for price conversion
export const Wallets = new Mongo.Collection('ella_wallets');//collection for local wallets
//todo need export of local wallets

Meteor.methods({
  //grabs price conversion for ELLA to foregn currency and can be modified for any ETH (or crypto)
  'tokens.insert'(tick, prce) {
    check(tick, String);
    check(prce, String);

    Tokens.update(
        { token: tick },
        {
          token: tick,
          price: prce,
          time: new Date()
        },
        { upsert: true }
        );

    },
    //Wallets insert function creates a local mongo db wallet Address with no private key stored
    'wallets.insert'(address, coin, hash) {
      check(address, String);
      //check(coin, number);
      Wallets.update(
        { public : address },
        {
          public: address,
          qty: coin,
          hash: hash,
          time: new Date()
        },
        { upsert: true }
      );

    },

  /*****maintaining these function to add delete capability down the road
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  /*****a function for checking off tasks in the meteor demo that can be modified
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  *****/
});
