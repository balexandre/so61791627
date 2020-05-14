// PRODUCTS MODEL FILE
// ============================================================
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
      'products',
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: { type: DataTypes.STRING(45), allowNull: false },
        description: { type: DataTypes.STRING(45), allowNull: true },
        price: { type: DataTypes.DECIMAL(10,2), allowNull: true },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        timestamps: false,
        tableName: 'products',
      }
    );

    /*
    model.associate = models => {
      model.belongsTo(models.clients, {
        foreignKey: 'client_id',
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    };
    */

    return model;
  };
