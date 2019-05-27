- Topic Edit:
    - Discussion Stream edit [Done]
    - Add key claim / stream item
    - Reorder key claims & stream items
    - General refactoring, both Components & Redux flow

- Add New Topic
    - Enable functionality

- Research:
    - constructor(props, context): was used in original version of StreamItemEdit.jsx. Why context?
        Also, couple Edit components with constructor function but nothing happening inside it. Needed?
    - mapStateToProps: better understanding

5.27:
    - Add Key Claim & Add Stream Item functional. Next will look into ability to easily re-order key claims & stream items. Click & drag ideal. Look into: https://www.npmjs.com/package/react-reorder

5.26:
    - Add Key Claim: front-end functionality added, clicking button will populate a new empty box in the key claim panel, as well as a new stream. Doesn't actually work though, need to fix server route for updating PSQL.

5.24:
    - More refactoring & cleaning up for the Edit Key Claim & Edit Stream components. Next enable Add key claim & add stream item.

5.23:
    - Refactoring on TopicEdit component. Split sections into subcomponents. Want to spend more time cleaning up code and double-checking that edit functionality is still working. After that, look into "Add Key Claim" & "Add Stream Item" capabilities.