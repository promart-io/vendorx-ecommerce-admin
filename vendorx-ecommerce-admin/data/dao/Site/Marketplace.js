var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'VENDORX_ECOMM_SITE_MARKETPLACE',
	'properties': [
		{
			'name': 'Id',
			'column': 'ENTITY6ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'NAME',
			'type': 'VARCHAR',
		}]
});
exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM VENDORX_ECOMM_SITE_MARKETPLACE");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};