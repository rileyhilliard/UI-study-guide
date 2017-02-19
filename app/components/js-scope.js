import Ember from 'ember';

export default Ember.Component.extend({
  objectLiteral() {
    console.info('-- OBJECT LITERAL --');

    // Object Literal
    const Bro = {
      first: "bro",
      last: "dozer",
      full(){ return this.capitize(`${this.first} ${this.last}`); },
      capitize(str) {
        return str
          .toLowerCase()
          .split(' ')
          .map((word) => {
            let splitWord = word.split('');
            splitWord[0] = splitWord[0].toUpperCase();
            return splitWord.join('');
          })
          .join(' ');
      }
    };

    // Adding a new method
    Bro.reversed = function() {
      return this.capitize(this.full().split('').reverse().join(''));
    };

    console.log(Bro.full());
    console.log(Bro.reversed());
  },

  jsLegacyClass() {
    console.info('-- ES5 CLASS PATTERN --');
    function Person(user) {
      // assign all properties from 'user' onto 'this'
      Object.assign(this, user);
    }

    Person.prototype = {
      tagline: 'is one sick individual!',
      // NOTE: 'this.first' is not in scope
      badSubTitle: `${this.first} ${this.tagline}`,
      goodSubtitle() {
        return `${this.first} ${this.tagline}`;
      },
      full() {
        return `${this.first} ${this.last}`;
      },
    };

    // NOTE: if this was assugned above the prototype object assignment, it would
    // be overridden by the assignment @ Person.prototype = {};
    Person.prototype.formattedTitle = function() {
      const bad =  `bad  scope: ${this.title} - ${this.badSubTitle}`;
      const good = `good scope: ${this.title} - ${this.goodSubtitle()}`;
      return `${bad}\n${good}`;
    };

    const Bro = new Person({
      first: "Bro",
      last: "Dozer",
      title: "Gnarologist",
    });

    // NOTE: stop the console here with a 'debugger;' and investigate the properties
    // on 'Bro'. Notice that at the top-level, Bro only has first and last name properties,
    // and the methods, .full(), and .formattedTitle() are one level up in the Object/Class
    // Prototype.
    console.log(Bro.full());
    console.log(Bro.formattedTitle());
  },

  ES6Class() {
    console.info('-- ES6 CLASS PATTERN --');
    class Animal {
      constructor(config) {
        Object.assign(this, config, {
          isLiving: true,
          type: "I'm an unknown type",
          subType: "I'm an unknown subtype",
          name: "I don't have a name...yet. Try giving me a name me with .setName()",
          legs: "I have no idea how many legs I have :(",
          sound: "Do I even make sounds?",
          tail: undefined,
          ears: undefined,
          eating: undefined,
          drinking: undefined,
          flippers: undefined,
        });
      }

      eat(time) {
        this.setAction('eating', time);
        console.log(`${this.name} started eating.`);
      }

      drink(time) {
        if(this.flippers) {
          console.log(`${this.name}: I\'m not sure I drink, I live in the water!`);
          return;
        }

        this.setAction('drinking', time);
        console.log(`${this.name} started drinking.`);
      }

      setAction(action, time=false) {
        const duration = time || Math.random() * 15000;
        const key = `_${action}`;
        this[action] = true;
        this[action] = clearTimeout[key];
        this[key] = setTimeout(() => {
          this[action] = false;
          console.log(`${this.name} is finished ${action}.`);
        }, duration);
      }

      // These are methods, accessed like [Instance].makeNoise()
      makeNoise() {
        return `${this.sound} ${this.sound}!`;
      }

      setName(name) {
        this.name = name;
        console.log(`I'm now called ${name}!`);
      }

      // NOTE: 'get' allows this to be accessed like a property:
      // [Instance].eat, rather than [Instance].eat()
      get description() {
        const dontDefault = 'I don\'t have';
        const type = `I am a ${this.sex} ${this.type} from the ${this.subtype} family.`;
        const nameAndSound = `My name is ${this.name} and I make sounds like "${this.makeNoise()}"`;
        const breed = this.breed ? `I am a ${this.breed} breed.` : '';
        const legs = 'I have ' + (this.legs ? `${this.legs} legs` : `${this.flippers} flippers (and a tail too!)`);
        const tail = this.tail ? `I have a ${this.tail} tail` : `${dontDefault} a tail`;
        const ears = this.ears ? `${this.ears} ears.` : `${dontDefault} ears.`;

        return console.log(`Hey there!\n${nameAndSound}\n${type}\n${breed}\n${legs}\n${tail} and ${ears}`);
      }
    }


    class Dolphin extends Animal {
      constructor(config) {
        super(...arguments);
        Object.assign(this, config, {
          legs: 0,
          flippers: 2,
          dorselFin: true,
          sound: 'Squee\'ek uh\'k kk\'kkkk squeek eee\'eek!',
          tail: 'flipper',
          type: 'Mammal',
          subtype: 'Whippomorpha',
          ears: 2,
        });
      }
    }

    class Dog extends Animal {
      constructor(config) {
        super(...arguments);
        Object.assign(this, config, {
          breed: undefined,
          legs: 4,
          sound: 'bark',
          type: 'Mammal',
          subtype: 'Canine',
          tail: 'long',   // default
          ears: 'floppy', // default
        });

      }
    }

    class Puggle extends Dog {
      constructor(config) {
        super(...arguments);
        Object.assign(this, config, {
          breed: 'Puggle',
          tail: 'Curley',
          ears: 'Floppy'
        });
      }
    }

    class Frenchie extends Dog {
      constructor(config) {
        super(...arguments);
        Object.assign(this, config, {
          breed: 'French Bulldog',
          tail: 'stubby',
          ears: 'pointed'
        });
      }
    }

    const Ralph = new Frenchie({
      name: 'Ralph',
      sex: 'male',
    });

    Ralph.description;

    console.log('\n ---------------- \n \n');

    const Bella = new Puggle({
      name: 'Bella',
      sex: 'female',
    });

    Bella.description;

    console.log('\n ---------------- \n \n');

    const Flipper = new Dolphin({
      name: 'Flipper',
      sex: 'male',
    });

    Flipper.description;

    console.log('\n -------- ACTIONS -------- \n \n');
    Flipper.eat();
    Flipper.drink();
    Bella.eat();
    Bella.drink();
    Ralph.eat();
    Ralph.drink();
  },

  init() {
    this._super(...arguments);

    this.objectLiteral();
    this.jsLegacyClass();
    this.ES6Class();
  }
});
