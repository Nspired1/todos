# A Simple Todo List

## Summary

This is a simple Todo List app made with React on the frontend with Express and Node on the backend using a hosted MongoDB with Atlas to store data. Minimal styling was done with Bootstrap, Font Awesome, and some CSS.

## State management

Because this is a single page app, a state management library like Context or Redux is not needed. Data can be managed by passing state down to child components with as properties (props). For editing a todo, data is passed back up to the parent component through functions and variables.

## Notes

Some of the code is verbose due to explicitly writing out the fetch calls, this.props.task, etc instead of using axios or destructuring to make concepts and ideas clear.
