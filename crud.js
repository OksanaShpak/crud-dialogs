const initCRUD = (collection) => {
  return {
    getTasks: async () => {
      const tasks = await collection.find().toArray();

      return tasks.map(_idToId);
    },
    addTask: async (text) => {
      await collection.insertOne({ text });
    },
  }
}

const _idToId = ({ _id, ...object }) => {
  return { id: _id.toString(), ...object };
}

exports.initCRUD = initCRUD;