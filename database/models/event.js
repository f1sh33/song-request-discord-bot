const { DataTypes, Model } = require('sequelize');

module.exports = class Events extends Model {
     static init(sequelize) {
         return super.init({
            eventID: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            authorID: {type: DataTypes.STRING},
            phase: {type: DataTypes.INTEGER},
            queue: {type: DataTypes.INTEGER}
         }, {
             tableName: 'events',
             timestamps: true,
             sequelize: sequelize
         });
     }
}