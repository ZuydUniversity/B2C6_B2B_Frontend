/**
 * @typedef {Object} Note
 * @property {string} [id] - The unique identifier for the note (optional).
 * @property {string} [description] - The content of the note (optional).
 * @property {Date} [date] - The date the note was created or last updated (optional).
 */

/**
 * Example Note object for reference.
 * @type {Note}
 */
const exampleNote = {
    id: "1",
    description: "This is an example note.",
    date: new Date()
  };
  
  module.exports = {
    /**
     * @typedef {import('./note').Note} Note
     */
    Note: exampleNote
  };
  