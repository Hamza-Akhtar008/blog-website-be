module.exports = {
    async up(db, client) {
      await db.createCollection("trends");
    },
  
    async down(db, client) {
      await db.collection("trends").drop();
    },
  };
  