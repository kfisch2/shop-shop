export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

// when this function is called, we open the connection to the db and connect to the object store taht we pass in as storeName,
// then we perform a transaction using method and object values to carry it out
// we wrap the whole thing in a promsie, make it easier to work with IndexedDB async nature
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open the connection to the db 'shop-shop' with the version of 1
    const request = window.indexedDB.open("shop-shop", 1);

    // create variables to hold reference to the databse, transaction (tx), and object store
    let db, tx, store;

    // if version has changed or this is first time used, run this method and create three object stores
    // onupgradeneeded only runs if this is the first time a user has used the machine
    request.onupgradeneeded = function(e) {
      //create object store for each type of data and set primary key index to _id
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    //handle any errors
    request.onerror = function(e) {
      console.log('there was an error with connecting')
    }

    // on database open success
    request.onsuccess = function(e) {
      //save reference of the db to db variable
      db = request.result;
      // open transaction to do whatever we pass into storeName
      tx = db.transaction(storeName, 'readwrite');
      // save reference to that object store
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e)
      }


      // transaction functions
      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result)
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
      }

      // when the transaction is complete, close the connection
      tx.oncomplete = function() {
        db.close();
      }
    }
  });
}
