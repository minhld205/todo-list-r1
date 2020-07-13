function openIndexedDB(todoIndex) {
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  var openDB = indexedDB.open("TodoListDb", 1);

  openDB.onupgradeneeded = function() {
    let db = {}
    db.result = openDB.result
    db.store = db.result.createObjectStore("TodoListStore", {keyPath: "id"})
    if (todoIndex) {
      db.index = db.store.createIndex("ContentIndex", todoIndex)
    }
  };

  return openDB;
}

function getStoreIndexedDB(openDB) {
  let db = {};
  db.result = openDB.result;
  db.tx = db.result.transaction("TodoListStore", "readwrite");
  db.store = db.tx.objectStore("TodoListStore");
  db.index = db.store.index("ContentIndex");
  return db;
}

function getAllStoreIndexedDB(callback) {
  let openDB = openIndexedDB()
  openDB.onsuccess = function() {
    let db = getStoreIndexedDB(openDB)
    let getData = db.store.getAll()
    getData.onsuccess = function(evt) {
      callback(getData.result)
    };
  }
  return true;
}

function saveIndexedDB(todoId, filedata, todoIndex) {
  var openDB = openIndexedDB();
  openDB.onsuccess = function() {
    var db = getStoreIndexedDB(openDB);
    db.store.put({id: todoId, data: filedata});
  }
  return true;
}

function findIndexedDB(todoSearchKey, callback) {
  return loadIndexedDB(null, callback, todoSearchKey);
}

function loadIndexedDB(todoId, callback, todoSearchKey) {
  var openDB = openIndexedDB();

  openDB.onsuccess = function() {
    var db = getStoreIndexedDB(openDB);

    var getData;
    if (todoId) {
      getData = db.store.get(todoId);
    } else {
      getData = db.index.get(todoSearchKey);
    }

    getData.onsuccess = function() {
      callback(getData.result);
    };

    db.tx.oncomplete = function() {
      db.result.close();
    };
  }

  return true;
}

const IndexedDB = () => {
  if (typeof window !== "undefined") {
    var todoIndex = ["data.title", "data.status"];
    openIndexedDB(todoIndex)
    return { getAllStoreIndexedDB, saveIndexedDB, loadIndexedDB, findIndexedDB }
  }
  return null;
}

export default IndexedDB
