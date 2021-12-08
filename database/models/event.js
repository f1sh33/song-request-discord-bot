const { DataTypes, Model } = require('sequelize');

module.exports = class Events extends Model {
     static init(sequelize) {
         return super.init({
            eventID: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            authorID: {type: DataTypes.STRING}
         }, {
             tableName: 'events',
             timestamps: true,
             sequelize: sequelize
         });
     }
}