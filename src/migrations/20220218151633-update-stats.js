import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.addColumn('stats',
      'createdAt', {
        type: DataTypes.DATE,
      }, { transaction });
    await queryInterface.addColumn('stats',
      'updatedAt', {
        type: DataTypes.DATE,
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
    await queryInterface.removeColumn('stats', 'createdAt', { transaction });
    await queryInterface.removeColumn('stats', 'updatedAt', { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}
