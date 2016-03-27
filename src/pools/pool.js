import _ from 'lodash';

// Creates a pool for `obj`. This provides a convenient API for managing
// things in the game that might be created and destroyed at a rapid pace,
// and might cause big garbage collections. By reusing them, we can reduce
// the number and size of garbage collections.
// An example would be the objects representing bullets.
function Pool(obj) {
  this.obj = obj;
  // The inert pool are things waiting to be used
  this._inertPool = [];
  // The active pool are things that are in-use
  this._activePool = [];
}

Object.assign(Pool.prototype, {
  // Put an object back
  push(obj) {
    let activeIndex = _.indexOf(this._activePool, obj);
    if (activeIndex > -1) {
      this._activePool.splice(activeIndex, 1);
    }
    this._inertPool.push(obj);
    return obj;
  },

  // Retrieve an object
  shift() {
    if (!this._inertPool.length) {
      return this.create();
    } else {
      let shifted = this._inertPool.shift();
      this._activePool.push(shifted);
      return shifted;
    }
  },

  // Add another object to the pool
  create() {
    let newObj = new this.obj();
    this._inertPool.push(newObj);
    return newObj;
  },

  // Create `size` number of objects in this pool
  allocate(size) {
    // Not using `_.times` because it creates a new Array with each invocation
    for (var i = 0; i < size; i++) {
      this.create();
    }
  },

  // Update every active object
  update(delta, frame) {
    if (!this._activePool.length) { return; }

    this._activePool.forEach(o => {
      // First, call individual updates
      o.update(delta, frame);
      // Trash the object if it needs to be trashed
      if (o.isTrash()) {
        o.destroy();
        this.push(o);
      }
    });
  }
});

export default Pool;
