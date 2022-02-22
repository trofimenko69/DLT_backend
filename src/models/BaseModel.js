import _ from 'lodash';
import { Model, DataTypes } from 'sequelize';
import { NotFound } from 'http-errors';

const DateKeys = ['createdAt', 'updatedAt'];

export default class BaseModel extends Model {
  static modelName = 'baseModel';

  static tableName = 'baseModels';

  static associationScopes = {};

  static dateKeys = DateKeys;

  static protectedKeys = [];

  static mutableKeys = [];

  static Settings = {};

  static initialize(sequelize) {
    super.init(this.Schema, {
      modelName: this.modelName,
      tableName: this.tableName,
      ...this.Settings,
      sequelize,
    });
  }

  static async findOneOrFail(where, options = {}) {
    const doc = await this.findOne({ where, ...options });
    if (!doc) {
      throw new NotFound(this.modelName);
    }
    return doc;
  }

  static buildChanges(data) {
    const schemaProtectedKeys = Object.keys(this.Schema).filter((key) => {
      const def = this.Schema[key];
      return def.protected || def.primaryKey;
    });
    const protectedKeys = this.protectedKeys.concat(schemaProtectedKeys);

    const dataKeys = Object.keys(data);
    const changeKeys = _.difference(dataKeys, protectedKeys);
    const changes = _.pick(data, changeKeys);
    return changes;
  }

  static getAttributes(scopes = []) {
    if (!Array.isArray(scopes)) {
      scopes = [scopes];
    }
    const showDates = scopes.indexOf('dates') !== -1;
    const showRefs = scopes.indexOf('refs') !== -1;

    scopes = _.without(scopes, 'dates', 'refs');

    const realAttributes = _.pickBy(this.rawAttributes, (def, key) => {
      const isVirtual = def.type instanceof DataTypes.VIRTUAL;
      const isReference = def.references;
      const isDate = this.dateKeys.indexOf(key) !== -1;
      let matchScopes = true;
      if (def.scopes) {
        const matchedScopes = def.scopes.filter((scope) => scopes.indexOf(scope) !== -1);
        matchScopes = !!matchedScopes.length;
      }

      return !isVirtual && matchScopes && (showDates || !isDate) && (showRefs || !isReference);
    });

    return _.map(realAttributes, (def) => def.field);
  }

  publish(scopes = []) {
    if (!Array.isArray(scopes)) {
      scopes = [scopes];
    }
    const schema = this.constructor.Schema || {};
    const { associations, associationScopes } = this.constructor;

    const showDates = scopes.indexOf('dates') !== -1;
    const showRefs = scopes.indexOf('refs') !== -1;

    scopes = _.without(scopes, 'dates', 'refs');
    let instanceKeys = Object.keys(this.get());

    instanceKeys = _.without(instanceKeys, ...DateKeys);

    if (!showRefs) {
      const foreignKeys = _.map(associations, 'identifier').filter((key) => key);
      instanceKeys = _.without(instanceKeys, ...foreignKeys);
    }

    const associationKeys = _.filter(instanceKeys, (key) => associations[key]);
    const forbiddenAssocKeys = _.filter(associationKeys, (key) => {
      if (!associationScopes[key]) return false;
      return !_.some(associationScopes[key], scopes);
    });
    instanceKeys = _.without(instanceKeys, ...forbiddenAssocKeys);

    let scopedKeys = instanceKeys.filter((key) => {
      const keyDef = schema[key];
      if (!keyDef || !keyDef.scopes) return true;
      const matchedScope = keyDef.scopes.filter((scope) => scopes.indexOf(scope) !== -1);
      return matchedScope.length;
    });

    if (showDates) {
      scopedKeys = scopedKeys.concat(DateKeys);
    }

    const scoped = {};
    scopedKeys
      .filter((key) => this.get(key) !== undefined)
      .forEach((key) => {
        let value = this.get(key);
        if (value instanceof BaseModel) {
          value = value.publish(scopes);
        }
        scoped[key] = value;
      });

    return scoped;
  }
}
