const router = require('express').Router();
const knex = require("knex");

const knexConfig = require("../knexfile")

const db = knex(knexConfig.development)

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

router.get('/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .first()
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort)
      } else {
        res.status(404).json({ message: 'Cohort ID could not be found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

router.post('/', (req, res) => {
  db('cohorts')
    .insert(req.body)
    .then(cohort => {
      const [id] = cohort;
      db('cohorts')
        .where({ id })
        .first()
        .then(cohort => {
          res.status(200).json(cohort)
        })
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

router.put('/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db('cohorts')
          .where({ id: req.params.id })
          .first()
          .then(cohort => {
            res.status(200).json(cohort)
          })
      } else {
        res.status(404).json({ message: 'Cohort ID could not be found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

module.exports = router;