# Todo List App

A simple to-do list app using jQuery.

Room for improvement / Challenges
- I do not think the code is optimize because I keep of re-redenring UI for every change in filter. Im not aware of any other easier implementation.
- Code seems cluttered. Tried my best to separate HTML and Javascript but given the time-constraint, I dont think I can make it.
- One of the tricky part was maintaining the state of each todoItems; regardless of which filter I go, the state should not be changed, unless I tick the checkbox.
- I was planning to refactor filter methods [filterByActive, filterByComplete] into one method filterBy(arr, state) but i cant make it work.