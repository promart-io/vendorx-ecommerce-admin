var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'VENDORX_ECOMM_PRODUCTS',
	'properties': [
		{
			'name': 'Id',
			'column': 'ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'NAME',
			'type': 'VARCHAR',
		}, {
			'name': 'Description',
			'column': 'DESCRIPTION',
			'type': 'VARCHAR',
		}, {
			'name': 'SKU',
			'column': 'SKU',
			'type': 'VARCHAR',
		}, {
			'name': 'GTIN',
			'column': 'GTIN',
			'type': 'VARCHAR',
		}, {
			'name': 'Size',
			'column': 'SIZE',
			'type': 'DOUBLE',
		}, {
			'name': 'Color',
			'column': 'COLOR',
			'type': 'VARCHAR',
		}, {
			'name': 'UoMId',
			'column': 'UOMID',
			'type': 'VARCHAR',
		}, {
			'name': 'CategoryId',
			'column': 'CATEGORYID',
			'type': 'INTEGER',
		}, {
			'name': 'Price',
			'column': 'PRICE',
			'type': 'DOUBLE',
		}, {
			'name': 'CurrencyId',
			'column': 'CURRENCYID',
			'type': 'VARCHAR',
		}, {
			'name': 'Heading',
			'column': 'HEADING',
			'type': 'VARCHAR',
		}, {
			'name': 'Subheading',
			'column': 'SUBHEADING',
			'type': 'VARCHAR',
		}, {
			'name': 'Image',
			'column': 'IMAGE',
			'type': 'VARCHAR',
		}, {
			'name': 'PriceRRP',
			'column': 'PRICERRP',
			'type': 'DOUBLE',
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
	var resultSet = query.execute("SELECT COUNT(*) FROM VENDORX_ECOMM_PRODUCTS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};