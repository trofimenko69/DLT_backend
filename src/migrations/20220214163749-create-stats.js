import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable('stats', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      cryptocurrency: {
        type: DataTypes.BIGINT,
      },
      dollars: {
        type: DataTypes.BIGINT,
      },
      popularity: {
        type: DataTypes.INTEGER,
      },
      mainPcLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      serverLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      minerLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      instructionsLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      passiveLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      activeLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    }, { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

export async function down(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable('stats', { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}
