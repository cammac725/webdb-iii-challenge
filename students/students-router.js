const router = require('express').Router();
const knex = require("knex");

const knexConfig = require("../knexfile")

const db = knex(knexConfig.development)

router.get('/', (req, res) => {
  db('students')
    .then(students => {
      res.status(200).json(students)
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

router.get('/:id', (req, res) => {
  db('students')
    .where({ id: req.params.id })
    .first()
    .then(student => {
      if (student) {
        res.status(200).json(student)
      } else {
        res.status(404).json({ message: 'Student ID could not be found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

router.post('/', (req, res) => {
  db('students')
    .insert(req.body)
    .then(student => {
      const [id] = student;
      db('students')
        .where({ id })
        .first()
        .then(student => {
          res.status(200).json(student)
        })
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

router.put('/:id', (req, res) => {
  db('students')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db('students')
          .where({ id: req.params.id })
          .first()
          .then(student => {
            res.status(200).json(student)
          })
      } else {
        res.status(404).json({ message: 'Student ID could not be found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

router.delete('/:id', (req, res) => {
  db('students')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end()
      } else {
        res.status(404).json({ message: 'Student ID could not be found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

module.exports = router;