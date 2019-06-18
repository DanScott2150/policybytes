- Topic Edit:
    - Discussion Stream edit [Done]
    - Add & Delete key claim / stream item [Done]
    - Reorder key claims & stream items
    - Add rich-text edit form
    - General refactoring, both Components & Redux flow

- Add New Topic
    - Enable functionality

- Research:
    - constructor(props, context): was used in original version of StreamItemEdit.jsx. Why context?
        Also, couple Edit components with constructor function but nothing happening inside it. Needed?
    - mapStateToProps: better understanding

- Bugs:
    - Add New Key Claim (both contributors): Adds blank (non-styled) stream item to stream by default.
    - On live version, can't add stream item for newly-created Key Claim. Have to "save" changes first.
    - Should clear discussion thread when user changes contributor tabs
    - Discussion thread: Top stream item should populate to match the Key Claim by default? Or, when Admin creates a new Key Claim, it auto-generates the first stream item to have the same text.
    - When deleting Stream Item & Key Claim: "Are you sure" modal?
    - Laggy edit screen?
    - Sometimes a react error when trying to delete a key claim? This happened once or twice but then seemed to magically fix itself when I tried to replicate it. Something relating to the StreamData associated with a KeyClaim

5.28:
    - Delete Key Claim functionality.

5.27:
    - Add Key Claim & Add Stream Item functional. Next will look into ability to easily re-order key claims & stream items. Click & drag ideal. Look into: https://www.npmjs.com/package/react-reorder

5.26:
    - Add Key Claim: front-end functionality added, clicking button will populate a new empty box in the key claim panel, as well as a new stream. Doesn't actually work though, need to fix server route for updating PSQL.

5.24:
    - More refactoring & cleaning up for the Edit Key Claim & Edit Stream components. Next enable Add key claim & add stream item.

5.23:
    - Refactoring on TopicEdit component. Split sections into subcomponents. Want to spend more time cleaning up code and double-checking that edit functionality is still working. After that, look into "Add Key Claim" & "Add Stream Item" capabilities.