const importToCollectionType = async (uid, item) => {
  try {
    console.log( 'uid', uid, 'item', item );
    await strapi.entityService.create({ data: item }, { model: uid });
    // await strapi.query(uid).create(item);
    return true;
  } catch (error) {
    console.error( { e: error.data.errors } );
    return false;
  }
};

const importToSingleType = async (uid, item) => {
  try {
    const existing = await strapi.query(uid).find({});
    if (existing.length > 0) {
      const { id } = existing[0];
      delete item.created_by;
      await strapi.query(uid).update({ id }, item);
    } else {
      strapi.query(uid).create(item);
    }
    return [true];
  } catch (error) {
    console.error( { e: error.data.errors } );
    return [false];
  }
};

module.exports = {
  importToCollectionType,
  importToSingleType,
};
