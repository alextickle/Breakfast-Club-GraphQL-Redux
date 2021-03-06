const User = require('./models').User;
const Bevent = require('./models').Bevent;
const Message = require('./models').Message;
const GuestList = require('./models').GuestList;
const Place = require('./models').Place;
const models = require('./models');
const moment = require('moment');

const resolvers = {
  Query: {
    user(root, args) {
      return User.find({ where: args });
    },
    message(root, args) {
      return User.find({ where: args });
    },
    users() {
      return User.findAll();
    },
    messages() {
      return Message.findAll();
    },
    places() {
      return Place.findAll();
    },
    events() {
      return Bevent.findAll({
        include: [
          { model: Place, as: 'place_1' },
          { model: Place, as: 'place_2' }
        ]
      });
    },
    currentEvent() {
      return Bevent.findOne({
        limit: 1,
        order: [['date', 'DESC']],
        include: [
          {
            model: GuestList,
            as: 'guestLists',
            include: [{ model: User, as: 'user' }]
          },
          { model: Place, as: 'place_1' },
          { model: Place, as: 'place_2' }
        ]
      });
    },
    event(root, args) {
      return Bevent.find({
        where: args,
        include: [
          {
            model: GuestList,
            as: 'guestLists',
            include: [{ model: User, as: 'user' }]
          },
          { model: Place, as: 'place_1' },
          { model: Place, as: 'place_2' }
        ]
      });
    }
  },
  Mutation: {
    addUser(root, args) {
      return User.create(args);
    },
    addPlace(root, args) {
      return Place.create(args);
    },
    addMessage(root, args) {
      return Message.create({
        content: args.content,
        user_id: args.user_id
      });
    },
    delete(root, args) {
      return models[args.type]
        .destroy({ where: { id: args.id } })
        .then(() => Promise.resolve(args.id))
        .catch(error => Promise.resolve(error));
    },
    login(root, args) {
      return User.findOne({
        where: { email: args.email }
      })
        .then(user => {
          if (user && user.verifyPassword(args.password) && user.active) {
            return Promise.resolve(`${user.email} ${user.admin}`);
          } else {
            return Promise.reject('login failed');
          }
        })
        .catch(error => Promise.reject('login failed'));
    },
    signUp(root, args) {
      return User.create(args)
        .then(user => Promise.resolve(`${user.email} ${user.admin}`))
        .catch(error => Promise.reject('signUp failed'));
    },
    registerVote(root, args) {
      return User.update(
        { voted: true },
        {
          where: { id: args.userId }
        }
      )
        .then(() =>
          GuestList.create({
            vote: args.choice,
            event_id: args.eventId,
            user_id: args.userId
          })
        )
        .then(() =>
          GuestList.find({
            where: {
              event_id: args.eventId,
              user_id: args.userId
            },
            include: [{ model: User, as: 'user' }]
          })
        );
    },
    registerRSVP(root, args) {
      return User.update(
        { rsvp: args.rsvpStatus },
        {
          where: { id: args.userId }
        }
      ).then(() =>
        User.find({
          where: { id: args.userId }
        })
      );
    },
    deactivateUser(root, args) {
      return User.update(
        { active: false },
        {
          where: { email: args.email }
        }
      ).then(() => Promise.resolve(args.email));
    },
    updateUser(root, args) {
      return User.update(
        {
          firstName: args.firstName,
          lastName: args.lastName,
          neighborhood: args.neighborhood
        },
        {
          where: { email: args.email }
        }
      ).then(() =>
        User.find({
          where: { email: args.email }
        })
      );
    },
    updateSpeaker(root, args) {
      return Bevent.update(
        {
          speaker: args.speaker
        },
        {
          where: { id: args.id }
        }
      ).then(() =>
        Bevent.find({
          where: { id: args.id },
          include: [
            { model: Place, as: 'place_1' },
            { model: Place, as: 'place_2' }
          ]
        })
      );
    },
    updatePlace(root, args) {
      return Place.update(
        {
          name: args.name,
          yelp_rating: args.yelp_rating,
          price: args.price,
          address_street: args.address_street,
          phone: args.phone,
          active: args.active
        },
        {
          where: { id: args.id }
        }
      ).then(() =>
        Place.find({
          where: { id: args.id }
        })
      );
    },
    addEvent() {
      let attendeeIds = [];
      let promises = [];
      let eventId;
      let temp;
      return User.findAll({ where: { rsvp: true } })
        .then(attendees => {
          attendees.forEach(attendee => {
            attendeeIds.push(attendee.id);
            temp = User.update(
              { rsvp: false },
              {
                where: { id: attendee.id }
              }
            );
            promises.push(temp);
          });
          return Promise.all(promises);
        })
        .then(() =>
          Bevent.findOne({
            limit: 1,
            order: [['date', 'DESC']]
          })
        )
        .then(bevent => {
          eventId = bevent.id;
          return Bevent.update(
            { vote_status: false },
            { where: { id: bevent.id } }
          );
        })
        .then(() => GuestList.findAll({ where: { event_id: eventId } }))
        .then(guestLists => {
          promises = [];
          attendeeIds.forEach(id => {
            temp = GuestList.update(
              { attended: true },
              { where: { event_id: eventId } }
            );
            promises.push(temp);
          });
          return Promise.all(promises);
        })
        .then(() => Place.findAll())
        .then(places => {
          _places = places;
          let num = _places.length;
          let index1 = Math.floor(Math.random() * num);
          let index2 = index1;
          while (index2 == index1) {
            index2 = Math.floor(Math.random() * num);
          }
          _place_id_1 = _places[index1].id;
          _place_id_2 = _places[index2].id;
        })
        .then(() => {
          let date = moment()
            .hour(8)
            .day(12)
            .minute(0)
            .second(0);
          return Bevent.create({
            place_1_id: _place_id_1,
            place_2_id: _place_id_2,
            date: date,
            winner: null,
            createdAt: Date.now(),
            updatedAt: Date.now()
          });
        })
        .then(bevent => Promise.resolve(bevent.id))
        .catch(error => Promise.reject('addEvent failed'));
    }
  }
};

exports.resolvers = resolvers;
